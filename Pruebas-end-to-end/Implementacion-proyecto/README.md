# Pruebas End-to-End - Documentación Formal

Este directorio contiene la documentación formal de las pruebas end-to-end implementadas en el proyecto.

## Pruebas de Referencia (Ejemplos)

Revisar: [Documentacion-pruebas-E2E.md](Documentacion-pruebas-E2E.md)

Ahi encontraras descripción, enlace al código fuente y espacio para capturas de pantalla de las 4 pruebas E2E de los ejemplos base:

1. **Smoke Test** - Verificación de carga y elementos básicos
2. **CRUD Básico** - Crear producto desde UI
3. **Flujo Completo** - Crear producto + orden
4. **Validaciones** - Casos negativos y errores

Estos son ejemplos de cómo documentar tus propias pruebas.

Los ejemplos originales se encuentran en: `../cypress/e2e/`

**Archivos de referencia:**
- `01-primera-prueba.cy.js` - Smoke test
- `02-productos.cy.js` - CRUD simple
- `03-ordenes.cy.js` - Flujo completo
- `04-validaciones.cy.js` - Casos negativos
- `05-comandos-basicos-demo.cy.js` - Demo de comandos Cypress

Puedes usar estos como plantilla para escribir tus propias pruebas E2E.

---

## Pruebas Formales del Proyecto

Archivo: [frontend.cy.js](frontend.cy.js)

Pruebas end-to-end enfocadas al proyecto SaludPlus con refactorización de comentarios:

**Módulo 1: Login**
- Verificación de carga del frontend
- Login exitoso con credenciales válidas
- Login fallido con credenciales incorrectas
- Validación de campos vacíos

**Módulo 2: Registro de Paciente**
- Flujo completo de registro
- Manejo de archivos (foto, documento)
- Mock de API backend
- Validación de respuesta exitosa

---





