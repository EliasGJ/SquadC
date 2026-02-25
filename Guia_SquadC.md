# Punto de Partida SquadC

Este proyecto corresponde al equipo SquadC y contiene la base para la gestión de datos, estadísticas, seguridad, exportación y notificaciones.

## Endpoints principales

### Autenticación
- **POST /register**
  - Registra un usuario.
  - Body ejemplo:
    ```json
    {"name":"Nuevo","email":"nuevo@correo.com","password":"1234","role":"alumno"}
    ```
- **POST /login**
  - Devuelve un token JWT para autenticación.
  - Body ejemplo:
    ```json
    {"email":"nuevo@correo.com","password":"1234"}
    ```

### Rutas protegidas (requieren header Authorization: Bearer <token>)
- **GET /protegido**
  - Verifica acceso con token.
- **GET /export/csv**
  - Descarga resultados en CSV.
- **GET /export/pdf**
  - Descarga resultados en PDF.
- **GET /stats/score**
  - Devuelve media y desviación estándar de resultados.
- **GET /stats/failed**
  - Devuelve preguntas más falladas.
- **POST /notifications**
  - Crea una notificación.
  - Body ejemplo:
    ```json
    {"message":"Tienes un nuevo examen"}
    ```
- **GET /notifications**
  - Consulta notificaciones del usuario.

## Ejemplos de prueba en PowerShell

1. **Registrar usuario:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/register" -Method Post -ContentType "application/json" -Body '{"name":"Nuevo","email":"nuevo@correo.com","password":"1234","role":"alumno"}'
   ```
2. **Login y obtener token:**
   ```powershell
   $response = Invoke-RestMethod -Uri "http://localhost:3000/login" -Method Post -ContentType "application/json" -Body '{"email":"nuevo@correo.com","password":"1234"}'
   $response.token
   ```
3. **Usar token en endpoints protegidos:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/protegido" -Headers @{Authorization="Bearer TU_TOKEN_AQUI"}
   ```
   (Reemplaza TU_TOKEN_AQUI por el token obtenido)

4. **Exportar CSV:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3000/export/csv" -Headers @{Authorization="Bearer TU_TOKEN_AQUI"} -OutFile results.csv
   ```
5. **Exportar PDF:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3000/export/pdf" -Headers @{Authorization="Bearer TU_TOKEN_AQUI"} -OutFile results.pdf
   ```
6. **Crear notificación:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/notifications" -Method Post -Headers @{Authorization="Bearer TU_TOKEN_AQUI"} -ContentType "application/json" -Body '{"message":"Tienes un nuevo examen"}'
   ```
7. **Consultar notificaciones:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/notifications" -Headers @{Authorization="Bearer TU_TOKEN_AQUI"}
   ```
8. **Estadísticas de preguntas más falladas:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/stats/failed" -Headers @{Authorization="Bearer TU_TOKEN_AQUI"}
   ```

## Notas
- Todos los endpoints funcionan con datos simulados.
- Cambia TU_TOKEN_AQUI por el token real obtenido en el login.
- Ejecuta el backend con `node backend/app.js` antes de probar.

---

## Estado de avance por historias de usuario y tareas clave (Squad C)

### US04, US05: Asignar test y definir tiempo de disponibilidad
- **Falta:** Integrar con los datos reales de clases, tests y alumnos (depende de otros squads).
- **Tenemos:** Seguridad y endpoints listos para proteger y gestionar asignaciones cuando estén disponibles los datos.

### US06: Consultar resultados de los alumnos
- **Falta:** Conectar con resultados reales de exámenes/alumnos (depende de integración con otros squads).
- **Tenemos:** Endpoints de exportación y estadísticas funcionando con datos simulados.

### US13: Estadísticas automáticas
- **Falta:** Estadísticas sobre datos reales de la base de datos.
- **Tenemos:** Cálculo de media, desviación y preguntas más falladas con datos simulados.

### US15: Notificaciones
- **Falta:** Integrar notificaciones con eventos reales (por ejemplo, asignación de exámenes reales).
- **Tenemos:** Endpoints para crear y consultar notificaciones funcionando.

### US16: Exportar resultados
- **Falta:** Exportar resultados reales de la base de datos.
- **Tenemos:** Exportación a CSV y PDF de datos simulados.

### Seguridad (tarea transversal)
- **Falta:** Integrar roles y permisos con usuarios reales de la base de datos.
- **Tenemos:** Hash de contraseñas, autenticación JWT y protección de rutas funcionando.

---

**Resumen:**
- Todo lo que Squad C puede avanzar de forma autónoma está hecho y probado.
- El siguiente paso es la integración con los datos reales de los otros equipos (clases, tests, alumnos, resultados).
