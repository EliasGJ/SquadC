
console.log('Iniciando app.js...');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const PDFDocument = require('pdfkit');

const app = express();
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Backend Squad C funcionando. Consulta la documentación para los endpoints disponibles.');
});

const SECRET = 'tu_clave_secreta'; // Cambia esto en producción

// Simulación de usuarios
const users = [
  { id: 1, name: 'Profesor', email: 'prof@correo.com', password: '$2b$10$xxxx', role: 'profesor' },
  { id: 2, name: 'Alumno', email: 'alumno@correo.com', password: '$2b$10$xxxx', role: 'alumno' }
];

// Simulación de resultados
const results = [
  { test_id: 1, user_id: 2, score: 8.5, completed_at: '2026-02-25 10:00' },
  { test_id: 1, user_id: 3, score: 7.0, completed_at: '2026-02-25 11:00' }
];

// Simulación de preguntas falladas
const failedQuestions = [
  { question_id: 1, count: 5 },
  { question_id: 2, count: 8 },
  { question_id: 3, count: 2 }
];

// Simulación de notificaciones
let notifications = [
  { id: 1, user_id: 2, message: 'Nuevo examen disponible', created_at: '2026-02-25 09:00' }
];

// Middleware protección
function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token requerido' });
  try {
    const decoded = jwt.verify(header.split(' ')[1], SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Registro de usuario
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, name, email, password: hash, role });
  res.json({ message: 'Usuario registrado' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Ruta protegida ejemplo
app.get('/protegido', auth, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

// Exportar resultados a CSV
app.get('/export/csv', auth, async (req, res) => {
  const csvWriter = createCsvWriter({
    path: 'results.csv',
    header: [
      { id: 'test_id', title: 'Test ID' },
      { id: 'user_id', title: 'User ID' },
      { id: 'score', title: 'Score' },
      { id: 'completed_at', title: 'Completed At' }
    ]
  });
  await csvWriter.writeRecords(results);
  res.download('results.csv');
});

// Exportar resultados a PDF
app.get('/export/pdf', auth, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=results.pdf');
  doc.pipe(res);
  doc.fontSize(16).text('Resultados de Tests', { align: 'center' });
  doc.moveDown();
  results.forEach(r => {
    doc.text(`Test ID: ${r.test_id} | User ID: ${r.user_id} | Score: ${r.score} | Completed At: ${r.completed_at}`);
  });
  doc.end();
});

// Endpoint estadísticas: media y desviación estándar
app.get('/stats/score', auth, (req, res) => {
  const scores = results.map(r => r.score);
  const media = scores.reduce((a, b) => a + b, 0) / scores.length;
  const desviacion = Math.sqrt(scores.reduce((a, b) => a + Math.pow(b - media, 2), 0) / scores.length);
  res.json({ media, desviacion });
});

// Endpoint preguntas más falladas
app.get('/stats/failed', auth, (req, res) => {
  const ordenadas = failedQuestions.sort((a, b) => b.count - a.count);
  res.json({ preguntas_mas_falladas: ordenadas });
});

// Crear notificación
app.post('/notifications', auth, (req, res) => {
  const { message } = req.body;
  const nueva = {
    id: notifications.length + 1,
    user_id: req.user.id,
    message,
    created_at: new Date().toISOString()
  };
  notifications.push(nueva);
  res.json({ notificacion: nueva });
});

// Consultar notificaciones
app.get('/notifications', auth, (req, res) => {
  const userNotifications = notifications.filter(n => n.user_id === req.user.id);
  res.json({ notificaciones: userNotifications });
});

app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
