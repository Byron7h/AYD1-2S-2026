# Node.js: Unitarias, Integracion y Cobertura

Este ejemplo es una mini API con dos casos de negocio:
- login de usuario
- programacion de citas

Tecnologias:
- Node.js
- Express
- Jest 29 (unitarias y cobertura)
- Supertest 7 (integracion HTTP)

## Que se ve en este ejemplo

- Pruebas unitarias con mocks, stubs y fakes.
- Pruebas de integracion sobre rutas HTTP.
- Cobertura de codigo con Jest.

## Estructura clave

- Logica de negocio:
  - [src/authService.js](src/authService.js)
  - [src/appointmentService.js](src/appointmentService.js)
- Capa HTTP:
  - [src/app.js](src/app.js)
- Tests unitarios:
  - [tests/unit/authService.test.js](tests/unit/authService.test.js)
  - [tests/unit/appointmentService.test.js](tests/unit/appointmentService.test.js)
- Tests de integracion:
  - [tests/integration/app.test.js](tests/integration/app.test.js)
- CI (opcional):
  - [ci/github-actions-tests.yml](ci/github-actions-tests.yml)

## Como ejecutar

1) Instalar dependencias

```bash
npm install
```

No se instala Jest ni Supertest de forma global. Se instalan desde package.json.

2) Ejecutar pruebas

```bash
npm test
```

Salida esperada (resumen):

```text
PASS  tests/unit/authService.test.js
PASS  tests/unit/appointmentService.test.js
PASS  tests/integration/app.test.js

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
```

3) Cobertura

```bash
npm run test:coverage
```

Salida esperada (resumen):

```text
Statements   : 90.62%
Branches     : 70%
Functions    : 100%
Lines        : 90.62%
```

Reporte HTML en:
- [coverage/lcov-report/index.html](coverage/lcov-report/index.html)

## Que prueba cada test

### Unitarias

- Login exitoso retorna token.
  - Usa: mocks de repo, hash y token.
  - Valida: flujo userRepo -> passwordHasher -> tokenService.
  - Archivo: [tests/unit/authService.test.js](tests/unit/authService.test.js)
  - Salida esperada: token "token-abc".

- Login falla si usuario no existe.
  - Usa: mock de repo que retorna null.
  - Valida: error INVALID_CREDENTIALS.
  - Archivo: [tests/unit/authService.test.js](tests/unit/authService.test.js)
  - Salida esperada: error INVALID_CREDENTIALS.

- Cita futura sin conflicto se guarda.
  - Usa: stub de reloj y fake repo en memoria.
  - Valida: regla de fecha futura y guardado.
  - Archivo: [tests/unit/appointmentService.test.js](tests/unit/appointmentService.test.js)
  - Salida esperada: cita con id y repo con 1 registro.

- Cita en conflicto falla.
  - Usa: fake repo con cita pre-cargada.
  - Valida: error APPOINTMENT_CONFLICT.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Node/tests/unit/appointmentService.test.js](Pruebas-Unitarias/Ejemplo-Node/tests/unit/appointmentService.test.js)
  - Salida esperada: error APPOINTMENT_CONFLICT.

### Integracion

- GET /health responde 200 con { ok: true }.
  - Usa: app real con Express.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Node/tests/integration/app.test.js](Pruebas-Unitarias/Ejemplo-Node/tests/integration/app.test.js)
  - Salida esperada: status 200 y body { ok: true }.

- POST /login traduce error de negocio a HTTP 401.
  - Usa: app real con servicio simulado.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Node/tests/integration/app.test.js](Pruebas-Unitarias/Ejemplo-Node/tests/integration/app.test.js)
  - Salida esperada: status 401 y mensaje "invalid credentials".

## Cuando usar DB real

- Unitarias: no usar DB real. Usar mocks, stubs o fakes.
- Integracion: puedes usar DB real de pruebas, pero aumenta tiempo y complejidad.
- En este ejemplo no hay DB real. Se simula con dobles de prueba.

## Refactor cuando el codigo no es testeable

Ejemplo completo en:
- [Pruebas-Unitarias/Refactorizacion/README.md](Pruebas-Unitarias/Refactorizacion/README.md)

## Tecnologias

- Node.js
- Jest
- Supertest
- Express