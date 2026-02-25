# Checklist para Completar el Proyecto SquadC

Este archivo te guía punto a punto sobre qué debes introducir y dónde, para completar el proyecto.

---

## 1. Seguridad
- **backend/app.js**
  - Implementa hash de contraseñas con bcrypt.
  - Configura autenticación JWT y protección de rutas.

## 2. Exportación de resultados
- **backend/app.js**
  - Endpoints para exportar resultados en CSV y PDF.
  - Usa csv-writer y pdfkit.

## 3. Estadísticas
- **backend/app.js**
  - Endpoints para media, desviación estándar y preguntas más falladas.
  - Simula datos hasta que estén disponibles los reales.

## 4. Notificaciones
- **backend/app.js**
  - Endpoints para crear y consultar notificaciones.
  - Simula datos hasta que estén disponibles los reales.

## 5. Base de datos
- **database/schema.sql**
  - Esquema inicial de tablas: users, classes, tests, results, notifications.
  - Actualiza cuando los otros equipos definan sus tablas.

## 6. Documentación
- **Guia_SquadC.md**
  - Documenta todos los endpoints, ejemplos de uso y comandos.
  - Añade resumen de lo que falta y lo que está hecho.

## 7. README
- **README.md**
  - Explica la estructura del proyecto y cómo ejecutarlo.

## 8. Subir a GitHub
- Inicializa el repositorio y sube el proyecto.
  - `git init`
  - `git add .`
  - `git commit -m "Proyecto SquadC inicial"`
  - `git remote add origin <URL>`
  - `git push -u origin master`

---

## ¿Qué falta y dónde ponerlo?

1. **Integración con datos reales de clases, tests y alumnos**
   - Falta: Conectar endpoints con la base de datos real cuando los otros equipos entreguen sus tablas y datos.
   - Dónde: backend/app.js (actualizar lógica de endpoints), database/schema.sql (actualizar esquema de tablas).

2. **Resultados reales de exámenes/alumnos**
   - Falta: Obtener y mostrar resultados reales en exportación y estadísticas.
   - Dónde: backend/app.js (modificar endpoints para usar datos reales), database/schema.sql (actualizar tabla results).

3. **Notificaciones vinculadas a eventos reales**
   - Falta: Crear notificaciones automáticas al asignar exámenes o eventos importantes.
   - Dónde: backend/app.js (lógica de notificaciones), integración con endpoints de otros equipos.

4. **Estadísticas sobre datos reales**
   - Falta: Calcular estadísticas con datos reales de la base de datos.
   - Dónde: backend/app.js (modificar endpoints de estadísticas), database/schema.sql (asegurar estructura adecuada).

5. **Validaciones y manejo de errores avanzado**
   - Falta: Validar datos de entrada y mejorar respuestas de error.
   - Dónde: backend/app.js (agregar validaciones y manejo de errores en endpoints).

6. **Documentación de integración y uso colaborativo**
   - Falta: Documentar cómo integrar con otros equipos y cómo usar el proyecto en equipo.
   - Dónde: Guia_SquadC.md y README.md (añadir instrucciones de integración y colaboración).

---

**Actualiza estos puntos cuando los otros equipos entreguen sus partes o cuando avances en la integración.**

---

**Punto de Partida SquadC**
