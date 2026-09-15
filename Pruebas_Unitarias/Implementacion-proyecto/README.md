# Documentacion Formal de Pruebas Unitarias

Este directorio contiene la documentacion formal de las pruebas unitarias implementadas en el proyecto.

## Pruebas de Referencia (Ejemplos)

Revisar: [Documentacion-pruebas.md](Documentacion-pruebas.md)

Ahi encontraras la descripcion detallada de cada caso de prueba con:
- Descripción y objetivo
- Entrada y técnicas utilizadas
- Datos de prueba
- Resultado esperado (output Jest esperado)
- Resultado obtenido (captura visual)

**Tests documentados:**
1. AuthService - Login Exitoso
2. AuthService - Login Fallido
3. AppointmentService - Crear Cita
4. AppointmentService - Conflicto de Citas

Estos son ejemplos bases que puedes usar como referencia para documentar tus propias pruebas.

## Pruebas Formales del Proyecto

Archivos de pruebas con refactorización de comentarios según los estándares de referencia:

**1. Pruebas de Autenticación:**
- Archivo: `loginEP.test.js`
- Tests: Login exitoso con credenciales válidas
- Técnicas: Mocks de BD, bcryptjs y JWT
- Estructura: ARRANGE (datos) - ACT (ejecutar) - ASSERT (validar)

**2. Pruebas de Programación de Citas:**
- Archivo: `programarCita.test.js`
- Tests: Registro exitoso, manejo de errores BD
- Técnicas: Mocks de procedimientos almacenados
- Casos: Éxito (affectedRows=1), Error (BD rechaza)

**3. Pruebas de Registro de Tratamiento:**
- Archivo: `registrarTratamiento.test.js`
- Tests: Atender cita exitosamente, validación de datos
- Técnicas: Mocks de BD, validación de entrada
- Estructura: ARRANGE - ACT - ASSERT
