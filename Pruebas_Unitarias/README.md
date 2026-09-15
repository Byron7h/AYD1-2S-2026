# Pruebas-Unitarias: Guia General de Ejemplos

Esta carpeta concentra material practico de testing para backend en Node.js y Python,
ademas de un bloque de refactorizacion para mejorar testabilidad.

## Temas principales de la carpeta

- Pruebas unitarias.
- Pruebas de integracion sobre endpoints HTTP.
- Uso de test doubles: mock, stub y fake.
- Cobertura de codigo (coverage) e interpretacion de resultados.
- Refactorizacion orientada a testabilidad.

## Estructura y que se ve en cada carpeta

### Ejemplo_Node

Que abarca:

- API simple con Express.
- Unitarias con Jest.
- Integracion HTTP con Supertest.
- Coverage con reporte HTML.
- Guion completo de clase para exposicion.

Enlaces de referencia:

- Guia del ejemplo: [Ejemplo_Node/README.md](Ejemplo_Node/README.md)
- Configuracion de Jest: [Ejemplo_Node/jest.config.cjs](Ejemplo_Node/jest.config.cjs)
- CI de ejemplo: [Ejemplo_Node/ci/github-actions-tests.yml](Ejemplo_Node/ci/github-actions-tests.yml)
- Reporte HTML de coverage: [Ejemplo_Node/coverage/lcov-report/index.html](Ejemplo_Node/coverage/lcov-report/index.html)

### Ejemplo-Python

Que abarca:

- API simple con FastAPI.
- Unitarias con pytest.
- Integracion HTTP con FastAPI TestClient.
- Coverage con pytest-cov.
- Configuracion para imports estables de src en pruebas.

Enlaces de referencia:

- Guia del ejemplo: [Ejemplo-Python/README.md](Ejemplo-Python/README.md)
- Dependencias Python: [Ejemplo-Python/requirements.txt](Ejemplo-Python/requirements.txt)
- Configuracion de pytest: [Ejemplo-Python/pytest.ini](Ejemplo-Python/pytest.ini)
- Soporte de imports para tests: [Ejemplo-Python/tests/conftest.py](Ejemplo-Python/tests/conftest.py)

### Refactorizacion

Que abarca:

- Comparativa de codigo antes y despues de refactor.
- Problemas de acoplamiento que dificultan pruebas.
- Inyeccion de dependencias para habilitar test unitario.
- Ejemplo de prueba que valida resultado e interacciones.

Enlaces de referencia:

- Guia del bloque: [Refactorizacion/README.md](Refactorizacion/README.md)
- Version antes (no testeable): [Refactorizacion/antes/orderService.js](Refactorizacion/antes/orderService.js)
- Version despues (testeable): [Refactorizacion/despues/orderService.js](Refactorizacion/despues/orderService.js)
- Prueba unitaria del refactor: [Refactorizacion/despues/orderService.test.js](Refactorizacion/despues/orderService.test.js)

### Implementacion-proyecto

Que abarca:

- Ejemplos completos de pruebas unitarias en el contexto del proyecto del laboratorio.
- Documentacion detallada con casos reales de uso.
- Tests de AuthService y AppointmentService.
- Demostracion de tecnicas avanzadas: mocks, stubs y fakes.

Enlaces de referencia:

- Documentacion completa: [Implementacion-proyecto/Documentacion-pruebas.md](Implementacion-proyecto/Documentacion-pruebas.md)
- Tests de LoginEP: [Implementacion-proyecto/loginEP.test.js](Implementacion-proyecto/loginEP.test.js)
- Tests de Programar Cita: [Implementacion-proyecto/programarCita.test.js](Implementacion-proyecto/programarCita.test.js)
- Tests de Registrar Tratamiento: [Implementacion-proyecto/registrarTratamiento.test.js](Implementacion-proyecto/registrarTratamiento.test.js)
- Capturas de ejecucion: [Implementacion-proyecto/imgs/](Implementacion-proyecto/imgs/)

## Que tecnologias se usan en esta clase

- Node.js, Express, Jest, Supertest.
- Python 3.10+, FastAPI, pytest, pytest-cov.
- GitHub Actions para ejecucion automatica de pruebas.

## Resultado de aprendizaje esperado

Al finalizar este bloque, el estudiante deberia poder:

- Separar logica de negocio de infraestructura.
- Escribir pruebas unitarias con doubles adecuados.
- Escribir pruebas de integracion para contratos HTTP.
- Interpretar un reporte de coverage y detectar huecos de prueba.
- Refactorizar codigo para hacerlo mas testeable.

### Implementacion-proyecto

Carpeta con ejemplos de como documentar pruebas unitarias utilizando los ejemplos vistos en clase. Además de ejemplos de Pruebas unitarias en el contexto de su proyecto del laboratorio

Enlaces de referencia:

- Cómo documentar Pruebas Unitarias: [Implementacion-proyecto/Documentacion-pruebas.md](Implementacion-proyecto/Documentacion-pruebas.md)
- Tests de LoginEP: [Implementacion-proyecto/loginEP.test.js](Implementacion-proyecto/loginEP.test.js)
- Tests de Programar Cita: [Implementacion-proyecto/programarCita.test.js](Implementacion-proyecto/programarCita.test.js)
- Tests de Registrar Tratamiento: [Implementacion-proyecto/registrarTratamiento.test.js](Implementacion-proyecto/registrarTratamiento.test.js)
- Capturas de ejecucion: [Implementacion-proyecto/imgs/](Implementacion-proyecto/imgs/)

## Video de Ejemplo

- Video Ejemplo (Pruebas Unitarias e Integracion): [https://drive.google.com/drive/folders/10lnHa-AMrlNmAP2U9qZzAwogDNZq0GWP?usp=sharing](https://drive.google.com/drive/folders/10lnHa-AMrlNmAP2U9qZzAwogDNZq0GWP?usp=sharing)

Desglose del contenido del video:

| Tiempo | Contenido |
|---|---|
| 00:00 | **Introduccion y temas que se abarcan.** |
| 1:15 | **[Node] Explicacion del codigo a testear con inyeccion de dependencias.**<br>- (2:00) Librerias del proyecto.<br>- (3:00) Recorrido de src/authService.js.<br>- (4:40) Recorrido de src/appointmentService.js.<br>- (6:40) Recorrido de src/app.js. |
| 8:50 | **[Node] Pruebas unitarias.**<br>- (10:10) Estructura de una prueba.<br>- (10:40) Que es un Mock.<br>- (15:40) Que es un Fake.<br>- (18:15) Que es un Stub.<br>- (21:30) Ejecucion de pruebas unitarias.<br>- (23:40) Fallo intencional de una prueba.<br>- (25:35) Cobertura de codigo.<br>- (27:00) Reporte HTML de coverage.<br>- (28:30) Como interpretar reportes para detectar codigo sin testear.<br>- (28:50) Vista rapida de integracion de pruebas en despliegue automatico. |
| 32:00 | **[Node] Pruebas de integracion.**<br>- (33:00) Estructura de la prueba de integracion.<br>- (35:50) Ejecucion de pruebas de integracion. |
| 36:40 | **[Python] Pruebas unitarias y de integracion.**<br>- (37:00) Explicacion del codigo (misma app que Node).<br>- (39:40) Ejecucion de pruebas y reporte de cobertura. |
| 40:00 | **Bonus: refactorizacion de codigo con IA (CodeX)**.<br>- (40:50) Como usar la IA integrada en VS Code para refactorizar codigo. |