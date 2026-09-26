# Laboratorio AYD1 - Seccion A (2S-2026)

Repositorio del laboratorio de Analisis y Diseno de Sistemas 1 del Segundo Semestre de 2026.

Este espacio esta organizado para ir agregando contenido de diferentes clases. La estructura esta pensada para que cada carpeta represente un bloque tematico o una clase.

## Estructura actual del repositorio

### Scrumban

Tema general:

- Material de apoyo para organizar un proyecto utilizando Product Backlog, Sprint Backlog, tablero Kanban y eventos Scrum.
- Ejemplo de historias de usuario organizadas en dos fases.
- Ejemplo de planificacion de cuatro sprints.
- Ejemplos de evidencias y capturas del tablero Kanban.
- Guia para documentar eventos Scrum sin depender de grabaciones privadas.

Enlaces de referencia:

- Vista general del bloque: [Scrumban/README.md](Scrumban/README.md)
- Product Backlog: [Scrumban/historias_usuario.md](Scrumban/historias_usuario.md)
- Sprint Backlog: [Scrumban/sprint_backlog.md](Scrumban/sprint_backlog.md)
- Tablero Kanban: [Scrumban/tablero_kanban.md](Scrumban/tablero_kanban.md)
- Eventos Scrum: [Scrumban/scrum_meetings.md](Scrumban/scrum_meetings.md)
- Capturas del tablero de la Fase 1: [Scrumban/imgs_kanban/](Scrumban/imgs_kanban/)
- Evidencias de los tableros de la Fase 2: [Scrumban/tableros_f2/](Scrumban/tableros_f2/)


### Requerimientos

Tema general:

- Guia de apoyo para comprender la clasificacion de requerimientos del proyecto.
- Explicacion de requerimientos funcionales (RF) y no funcionales (RNF).
- Desglose de RNF en requerimientos de restriccion (RR) y de calidad (EAC).
- Enlaces directos a los documentos de ejemplo de la carpeta Requerimientos.

Enlaces de referencia:

- Vista general del bloque: [Requerimientos/README.md](Requerimientos/README.md)
- Requerimientos funcionales (RF): [Requerimientos/RFs-requerimientos-funcionales.md](Requerimientos/RFs-requerimientos-funcionales.md)
- Requerimientos de restriccion (RR): [Requerimientos/RRs-requerimientos-restriccion.md](Requerimientos/RRs-requerimientos-restriccion.md)
- Requerimientos de calidad (EAC): [Requerimientos/EACs-requerimientos-calidad.md](Requerimientos/EACs-requerimientos-calidad.md)


### Casos_de_uso

Tema general:

- Material de apoyo para modelar casos de uso del negocio y del sistema.
- Ejemplos organizados en dos carpetas, correspondientes a dos enunciados diferentes.
- Documentación del recorrido desde el core del negocio hasta los requerimientos.
- Ejemplos de diagramas, descripciones textuales y matrices de trazabilidad.

Enlaces de referencia:

- Vista general del bloque: [Casos_de_uso/README.md](Casos_de_uso/README.md)
- Ejemplo de casos de uso: [Casos_de_uso/Ejemplo_Casos_de_Uso/README.md](Casos_de_uso/Ejemplo_Casos_de_Uso/README.md)
- Ejemplo del core a los requerimientos: [Casos_de_uso/Ejemplo_Core_Requerimientos/README.md](Casos_de_uso/Ejemplo_Core_Requerimientos/README.md)

Desglose del contenido de las carpetas:

### `Casos_de_uso/Ejemplo_Casos_de_Uso/`

Ejemplo de casos de uso que parte del core y llega hasta las descripciones textuales. **Esto es lo que deben hacer en su proyecto**

- [README del ejemplo](Casos_de_uso/Ejemplo_Casos_de_Uso/README.md): presenta el objetivo del ejemplo y el flujo recomendado para desarrollarlo.
- [Core del negocio](Casos_de_uso/Ejemplo_Casos_de_Uso/0.1-core.md): define el alcance general del negocio en un único caso de uso e identifica sus actores principales.
- [Primera descomposición](Casos_de_uso/Ejemplo_Casos_de_Uso/0.2-primera-descomposicion.md): divide el core en procesos generales del negocio y muestra sus relaciones con los actores.
- [Casos de uso expandidos](Casos_de_uso/Ejemplo_Casos_de_Uso/0.3-cun-expandidos.md): detalla los procesos anteriores y muestra relaciones `include`, `extend` y generalización.
- [Descripciones textuales y plantilla](Casos_de_uso/Ejemplo_Casos_de_Uso/0.3-descripciones-textuales.md): documenta actores, propósito, flujos, excepciones y condiciones posteriores; también incluye una plantilla vacía reutilizable.
- [Diagramas SVG](Casos_de_uso/Ejemplo_Casos_de_Uso/imgs/): contiene las imágenes de los diagramas para visualizarlos sin instalar una extensión adicional.

### `Casos_de_uso/Ejemplo_Core_Requerimientos/`

Ejemplo que conecta el core, los casos de uso y los requerimientos mediante matrices de trazabilidad. **Esto es lo que haran en AYD2 pero les puede servir para pasarselo a la IA**

- [README del ejemplo](Casos_de_uso/Ejemplo_Core_Requerimientos/README.md): describe el alcance del ejemplo y el contenido de los recursos incluidos.
- [Ejemplo completo](Casos_de_uso/Ejemplo_Core_Requerimientos/Ejemplo_del_core_hasta_requerimientos.md): muestra el recorrido desde el core y sus procesos hasta los casos expandidos, requerimientos funcionales, requerimientos no funcionales y matrices de trazabilidad.
- [Imágenes exportadas de los diagramas](Casos_de_uso/Ejemplo_Core_Requerimientos/imgs/): permite visualizar los diagramas incluidos en el ejemplo, aunque el código PlantUML no se renderice directamente.


### Docker

Tema general:

- Aplicacion sencilla de pedidos con backend y frontend.
- Ejemplo de Docker para construir imagenes y ejecutar la aplicacion en contenedores.
- La clase utiliza la misma aplicacion para explicar imagenes, contenedores y orquestacion.

Enlaces de referencia:

- Vista general de la clase: [Docker/README.md](Docker/README.md)
- Guia de Docker de la clase: [Docker/GUIA_DOCKER.md](Docker/GUIA_DOCKER.md)
- Orquestacion con Docker Compose: [Docker/docker-compose.yml](Docker/docker-compose.yml)
- Dockerfile backend (multi-stage): [Docker/backend/Dockerfile](Docker/backend/Dockerfile)
- Dockerfile backend (single-stage): [Docker/backend/Dockerfile.single](Docker/backend/Dockerfile.single)
- Dockerfile frontend: [Docker/frontend/Dockerfile](Docker/frontend/Dockerfile)
- Vídeo Ejemplo (ejemplo): [https://drive.google.com/drive/folders/1avflzeWsLA2qTuLtxIK5o2xP_fH-otT3?usp=sharing](https://drive.google.com/drive/folders/1avflzeWsLA2qTuLtxIK5o2xP_fH-otT3?usp=sharing)

Desglose del video (Docker):

| Tiempo | Contenido |
|---|---|
| 0:40 | Demostracion del proyecto ejecutandose en el host. |
| 1:30 | Definicion de conceptos y terminos generales de Docker. |
| 2:00 | Introduccion a Dockerfiles y construccion de imagenes. |
| 7:40 | Uso de Dockerfiles multi-etapa y generacion de imagenes optimizadas. |
| 12:10 | Comparacion entre imagenes de una sola etapa y multi-etapa. |
| 12:45 | Uso de archivo .dockerignore para excluir archivos en la construccion. |
| 15:10 | Creacion y gestion de contenedores. |
| 17:50 | Introduccion a Docker Compose como herramienta de orquestacion. |
| 22:00 | Ejecucion de servicios mediante Docker Compose. |
| 23:40 | Demostracion del proyecto ejecutandose desde contenedores Docker. |


### Ejemplos-SOLID

Tema general:

- Ejemplos cortos por principio SOLID.
- Material de apoyo para explicar casos concretos de diseño.

Enlaces de referencia:

- Guia principal de principios: [Ejemplos-SOLID/README.MD](Ejemplos-SOLID/README.MD)
- SRP: [Ejemplos-SOLID/srp.ts](Ejemplos-SOLID/srp.ts)
- OCP: [Ejemplos-SOLID/open-close-a.ts](Ejemplos-SOLID/open-close-a.ts), [Ejemplos-SOLID/open-close-b.ts](Ejemplos-SOLID/open-close-b.ts)
- LSP: [Ejemplos-SOLID/liskov-a.ts](Ejemplos-SOLID/liskov-a.ts), [Ejemplos-SOLID/liskov-b.ts](Ejemplos-SOLID/liskov-b.ts)
- ISP: [Ejemplos-SOLID/segregation.ts](Ejemplos-SOLID/segregation.ts)
- DIP: [Ejemplos-SOLID/dependency-a.ts](Ejemplos-SOLID/dependency-a.ts), [Ejemplos-SOLID/dependency-b.ts](Ejemplos-SOLID/dependency-b.ts), [Ejemplos-SOLID/dependency-c.ts](Ejemplos-SOLID/dependency-c.ts)

### Pruebas-Unitarias

Tema general:

- Ejemplos practicos de pruebas unitarias e integracion.
- Comparativa de implementacion en Node.js y Python.
- Uso de cobertura para analizar calidad de pruebas.
- Refactorizacion para mejorar testabilidad del codigo.

Enlaces de referencia:

- Vista general del bloque: [Pruebas-Unitarias/README.md](Pruebas-Unitarias/README.md)
- Ejemplo Node (Jest + Supertest): [Pruebas-Unitarias/Ejemplo_Node/README.md](Pruebas-Unitarias/Ejemplo_Node/README.md)
- Ejemplo Python (pytest + FastAPI): [Pruebas-Unitarias/Ejemplo-Python/README.md](Pruebas-Unitarias/Ejemplo-Python/README.md)
- Refactorizacion orientada a testing: [Pruebas-Unitarias/Refactorizacion/README.md](Pruebas-Unitarias/Refactorizacion/README.md)
- Cómo documentar Pruebas unitarias: [Pruebas-Unitarias/Implementacion-proyecto/](Pruebas-Unitarias/Implementacion-proyecto/)
  - [Documentacion-pruebas.md](Pruebas-Unitarias/Implementacion-proyecto/Documentacion-pruebas.md): Tests de AuthService y AppointmentService
- Video Ejemplo (ejemplo): [https://drive.google.com/drive/folders/10lnHa-AMrlNmAP2U9qZzAwogDNZq0GWP?usp=sharing](https://drive.google.com/drive/folders/10lnHa-AMrlNmAP2U9qZzAwogDNZq0GWP?usp=sharing)

Desglose del video (Pruebas Unitarias, Integracion y Coverage):

| Tiempo | Contenido |
|---|---|
| 00:00 | **Introduccion y temas que se abarcan.** |
| 1:15 | **[Node] Explicacion del codigo a testear con inyeccion de dependencias.**<br>- (2:00) Librerias del proyecto.<br>- (3:00) Recorrido de src/authService.js.<br>- (4:40) Recorrido de src/appointmentService.js.<br>- (6:40) Recorrido de src/app.js. |
| 8:50 | **[Node] Pruebas unitarias.**<br>- (10:10) Estructura de una prueba.<br>- (10:40) Que es un Mock.<br>- (15:40) Que es un Fake.<br>- (18:15) Que es un Stub.<br>- (21:30) Ejecucion de pruebas unitarias.<br>- (23:40) Fallo intencional de una prueba.<br>- (25:35) Cobertura de codigo.<br>- (27:00) Reporte HTML de coverage.<br>- (28:30) Como interpretar reportes para detectar codigo sin testear.<br>- (28:50) Vista rapida de integracion de pruebas en despliegue automatico. |
| 32:00 | **[Node] Pruebas de integracion.**<br>- (33:00) Estructura de la prueba de integracion.<br>- (35:50) Ejecucion de pruebas de integracion. |
| 36:40 | **[Python] Pruebas unitarias y de integracion.**<br>- (37:00) Explicacion del codigo (misma app que Node).<br>- (39:40) Ejecucion de pruebas y reporte de cobertura. |
| 40:00 | **Bonus: refactorizacion de codigo con IA (CodeX)**.<br>- (40:50) Como usar la IA integrada en VS Code para refactorizar codigo. |

### Pruebas-end-to-end

Tema general:

- Pruebas End-to-End (E2E) con Cypress.
- Automatizacion de flujos completos de usuarios.
- Pruebas de integracion entre frontend y backend.
- Suite de ejemplos practicos con la app Clase8-SOLID.

Enlaces de referencia:

- Vista general del bloque: [Pruebas-end-to-end/README.md](Pruebas-end-to-end/README.md)
- Configuracion Cypress: [Pruebas-end-to-end/cypress.config.js](Pruebas-end-to-end/cypress.config.js)
- Cómo documentar Pruebas End to End: [Pruebas-end-to-end/Implementacion-proyecto/](Pruebas-end-to-end/Implementacion-proyecto/)
  - [Documentacion-pruebas-E2E.md](Pruebas-end-to-end/Implementacion-proyecto/Documentacion-pruebas-E2E.md): 4 casos de prueba docuemntados
  - Ejemplo de Prueba End to end Enfocada al Proyecto del Laboratorio
- Pruebas E2E ejemplos:
  - [Primera prueba](Pruebas-end-to-end/cypress/e2e/01-primera-prueba.cy.js)
  - [Pruebas de productos](Pruebas-end-to-end/cypress/e2e/02-productos.cy.js)
  - [Pruebas de ordenes](Pruebas-end-to-end/cypress/e2e/03-ordenes.cy.js)
  - [Validaciones](Pruebas-end-to-end/cypress/e2e/04-validaciones.cy.js)
  - [Comandos basicos demo](Pruebas-end-to-end/cypress/e2e/05-comandos-basicos-demo.cy.js)