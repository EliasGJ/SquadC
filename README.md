# Proyecto SquadC Inicial

Este proyecto corresponde al equipo SquadC y contiene la base para la gestión de datos, estadísticas, seguridad, exportación y notificaciones.

## Estructura
- backend/: Código Node.js/Express
- frontend/: Vistas EJS y CSS
- database/: Scripts SQL
- Guia_SquadC.md: Guía de endpoints y pruebas
- Checklist_SquadC.md: Lista de tareas y puntos pendientes

## Funcionalidades
- Seguridad: hash de contraseñas, autenticación JWT, protección de rutas
- Exportación: resultados en CSV y PDF
- Estadísticas: media, desviación estándar, preguntas más falladas
- Notificaciones: crear y consultar

## Cómo ejecutar
1. Instala dependencias:
   ```
   npm install
   ```
2. Inicia el backend:
   ```
   node backend/app.js
   ```
3. Prueba los endpoints siguiendo la guía (Guia_SquadC.md)

## Notas
- Los endpoints funcionan con datos simulados.
- Actualiza la integración cuando los otros equipos entreguen sus partes.

---