# Tablero Kanban

> Kanban es un método visual para gestionar el flujo de trabajo. Cada tarjeta representa una actividad concreta y se mueve entre columnas conforme cambia su estado.

El tablero Kanban fue utilizado para llevar el control y seguimiento de todas las tareas desarrolladas durante el proyecto SaludPlus. Este tablero permitió a los miembros del equipo visualizar el progreso de las actividades y coordinar el flujo de trabajo en cada sprint.

Se utilizó la herramienta Trello para implementar el tablero, organizando las tareas según el modelo Kanban con las siguientes columnas:

- **TO-DO:** Contiene las tareas pendientes por iniciar.
- **BLOCKED:** Contiene las tareas bloqueadas por alguna razón interna o externa.
- **IN PROGRESS:** Reúne las tareas que están actualmente en desarrollo.
- **TEST/QA:** Contiene tareas en proceso de validación o pruebas.
- **DEPLOY:** Contiene tareas listas para desplegarse o ya validadas.

**Backlog:** En el tablero también se encuentra el backlog con el detalle de cada historia de usuario. Las tareas incluidas en el backlog fueron trasladadas a **TO-DO** a medida que se planificaban los sprints. A partir de ahí, se fueron moviendo por las distintas columnas conforme avanzaban en su desarrollo.

> Las tareas derivadas de cada historia de usuario y las personas responsables de realizarlas se encuentran en las tarjetas del tablero. La estimación, las dependencias y los criterios de aceptación de las historias se encuentran en el Product Backlog.

> Para documentar el avance, se puede conservar una captura del tablero en distintos momentos del sprint. En Trello, la captura puede obtenerse con `Ctrl + P` y seleccionando la opción para agregar gráficos; esa impresión puede adjuntarse como evidencia del estado del tablero.

---

## Datos del Tablero

| Información        | Detalle                                   |
|--------------------|--------------------------------------------|
| Herramienta usada  | Trello                                     |
| Enlace al tablero  | [Ver Tablero Trello]()                    |

### Miembros del Equipo

![Miembros del equipo]()

### Etiquetas utilizadas

![Etiquetas del tablero](imgs_kanban/etiquetas.jpg)

---

## Prioridad en Historias de Usuario

> Las etiquetas técnicas, como MYSQL, NODEJS, REACT, DOCKER, NUBE, TEST y DOCU, identifican el área o tipo de trabajo de una tarjeta. No representan la prioridad de la historia.

Para facilitar el orden en el desarrollo, las historias de usuario fueron categorizadas por nivel de prioridad, utilizando un código de colores:

- 🟥 **Rojo:** Prioridad Alta
- 🟨 **Amarillo:** Prioridad Media
- 🟦 **Azul:** Prioridad Baja

---

# Fase 1

## Sprint 1

### Descripción del Sprint Backlog

En este sprint se seleccionaron todas las historias de usuario con **prioridad alta (rojas)**. Estas incluían las tareas necesarias para establecer la base del sistema.

### Historias de Usuario Abordadas

|      |      |      |
|------|------|------|
|  🟥 [1] Registro de Paciente        | 🟥 [2] Autenticación Paciente         |  🟥 [3] Página Principal de Paciente         |
| 🟥 [5] Ver Horarios del médico y hacer cita        | 🟥 [6] Programar cita         |  🟥 [7] Lista de Citas Activas (Paciente)         |
|🟥 [11] Registro de Médico        |  🟥 [12] Autenticación medico         |  🟥 [13] Página Principal de Médico         |
|🟥 [14] Gestión de Citas (Medico)        |🟥 [16] Establecer Horarios y actualizar horarios de Medicos         |  🟥 [19] Autenticación Administrador         |
| 🟥 [20] Aceptar Paciente        | 🟥 [21] Aceptar Médico        | 🟥 [25] Base de datos         |
|🟥 [26] Barra de navegación        |         |         |

### Estado del Tablero

#### Estado Inicial

![Sprint 1 - Tablero Inicial (Parte 1)](imgs_kanban/TRELLO1-0.jpg)  
![Sprint 1 - Tablero Inicial (Parte 2)](imgs_kanban/TRELLO1-1.jpg)

#### Estado Intermedio

![Sprint 1 - Mitad de Sprint (Parte 1)](imgs_kanban/TRELLO2-1.jpg)  
![Sprint 1 - Mitad de Sprint (Parte 2)](imgs_kanban/TRELLO2-2.jpg)

#### Estado Final

![Sprint 1 - Final de Sprint (Parte 1)](imgs_kanban/TRELLO3-1.jpg)  
![Sprint 1 - Final de Sprint (Parte 2)](imgs_kanban/TRELLO3-2.jpg)

---

## Sprint 2

### Descripción del Sprint Backlog

En este sprint se agregaron 3 nuevas historias de usuario enfocadas en la documentación, pruebas y deslpliegue del sistema. Se abordaron aquellas etiquetadas como **prioridad media (amarillas)** y **prioridad baja (azules)**.

### Historias de Usuario Abordadas

|      |      |      |
|------|------|------|
|  🟦 [4] Buscar médico por Especialidad        | 🟨 [8] Cancelar Cita (Paciente)         |  🟨 [9] Historial de Citas         |
| 🟦 [10] Ver y Actualizar Perfil (Paciente)        | 🟨 [15] Cancelar Cita (Médico)         | 🟨 [17] Historial de Citas (Medico) (Paciente)         |
|🟦 [18] Ver y Actualizar Perfil (Medico)        |   🟨 [22] Ver y dar de baja Pacientes         |  🟨 [23] Ver y dar de baja Médicos         |
|🟨 [24] Reportes        | 🟨 [27] Página Principal de Administrador         |  🟨 [28] Dockerizar y subir el sistema a la nube         |
| 🟨 [29] Documentación        | 🟨 [30] Pruebas Unitarias        |         |

### Estado del Tablero

#### Estado Inicial

![Sprint 2 - Tablero Inicial (Parte 1)](imgs_kanban/TRELLO4-1.jpg)  
![Sprint 2 - Tablero Inicial (Parte 2)](imgs_kanban/TRELLO4-2.jpg)  
![Sprint 2 - Tablero Inicial (Parte 3)](imgs_kanban/TRELLO4-3.jpg)  
![Sprint 2 - Tablero Inicial (Parte 4)](imgs_kanban/TRELLO4-4.jpg)  

#### Estado Intermedio

![Sprint 2 - Mitad de Sprint (Parte 1)](imgs_kanban/TRELLO5-1.jpg)  
![Sprint 2 - Mitad de Sprint (Parte 2)](imgs_kanban/TRELLO5-2.jpg)  
![Sprint 2 - Mitad de Sprint (Parte 3)](imgs_kanban/TRELLO5-3.jpg)  
![Sprint 2 - Mitad de Sprint (Parte 4)](imgs_kanban/TRELLO5-4.jpg)  

#### Estado Final

![Sprint 2 - Final de Sprint (Parte 1)](imgs_kanban/TRELLO6-1.jpg)  
![Sprint 2 - Final de Sprint (Parte 2)](imgs_kanban/TRELLO6-2.jpg)  
![Sprint 2 - Final de Sprint (Parte 3)](imgs_kanban/TRELLO6-3.jpg)  
![Sprint 2 - Final de Sprint (Parte 4)](imgs_kanban/TRELLO6-4.jpg)  


---

# Fase 2

Durante la Fase 2 se desarrollaron funcionalidades complementarias y finales del sistema:  
- Reportes y calificaciones  
- Gestión de horarios, tratamientos y cancelaciones  
- Funcionalidades de administración  
- Despliegue y pruebas finales del sistema  

Además, en esta fase se documentaron tableros Kanban para todos los eventos Scrum (Sprint Planning, Daily Scrums y Sprint Retrospective), correspondientes a los dos sprints de esta etapa.
Cada sprint incluyó un Sprint Planning, 6 Daily Scrum y un Sprint Retrospective, todos con registro del estado del tablero.

---

## Sprint 3

### Descripción del Sprint Backlog

Durante el Sprint 3 se implementaron funcionalidades críticas para el funcionamiento del sistema, incluyendo el registro y autenticación de usuarios, la gestión de citas, asignación de tratamientos, y validación mediante tokens. Estas funcionalidades fueron clasificadas como **prioridad alta (🟥)**.  
También se abordaron tareas de **prioridad media (🟨)** relacionadas con visualización de tratamientos, calificación y reporte de médicos y pacientes, así como la integración de reportes administrativos básicos y la estructura extendida de la base de datos.

### Historias de Usuario Abordadas

| Prioridad | ID   | Historia de Usuario                                                 |
|-----------|------|----------------------------------------------------------------------|
| 🟥        | [31] | [EXT - HU001] Registro de Paciente                                   |
| 🟥        | [32] | [EXT - HU002] Autenticación Paciente                                 |
| 🟥        | [33] | [EXT - HU009] Historial de Citas                                     |
| 🟥        | [39] | [EXT - HU011] Registro de Médico                                     |
| 🟥        | [40] | [EXT - HU012] Autenticación Médico                                   |
| 🟥        | [41] | [EXT - HU014] Gestión de Citas (Médico)                              |
| 🟥        | [42] | Asignación de tratamiento (Médico)                                   |
| 🟥        | [48] | [EXT - HU020] Aceptar Paciente/Médico                                |
| 🟥        | [57] | [EXT - HU025] Base de Datos                                          |
| 🟨        | [35] | Visualizar tratamiento recibido (Paciente)                           |
| 🟨        | [37] | Calificar atención médica                                             |
| 🟨        | [38] | Reportar médico                                                       |
| 🟨        | [43] | [EXT - HU015] Cancelar Cita (Médico)                                  |
| 🟨        | [45] | Calificar paciente                                                    |
| 🟨        | [46] | Reportar paciente                                                     |
| 🟨        | [51] | Gestionar Reportes de Médicos                                         |
| 🟨        | [52] | Gestionar Reportes de Pacientes                                       |

---

### Estado del Tablero

#### Sprint Planning  
[Ver tablero - Planning Sprint 3](tableros_f2/sprint3_planning.pdf)

#### Daily Scrum

- [Daily 1](tableros_f2/sprint3_daily1.pdf)  
- [Daily 2](tableros_f2/sprint3_daily2.pdf)  
- [Daily 3](tableros_f2/sprint3_daily3.pdf)  
- [Daily 4](tableros_f2/sprint3_daily4.pdf)  
- [Daily 5](tableros_f2/sprint3_daily5.pdf)  
- [Daily 6](tableros_f2/sprint3_daily6.pdf)

#### Sprint Retrospective  
[Ver tablero - Retrospective Sprint 3](tableros_f2/sprint3_retrospective.pdf)

---

## Sprint 4

### Descripción del Sprint Backlog

El Sprint 4 se centró en funcionalidades complementarias del sistema, así como en tareas relacionadas con el **cierre técnico y administrativo** del proyecto. Se trabajaron historias de **prioridad baja (🟦)** y algunas de **prioridad media (🟨)**.  
Se completaron mejoras de perfil, edición de usuarios, reportes de calificaciones, generación de documentación técnica, pruebas E2E, despliegue en la nube y automatización de CI/CD.

### Historias de Usuario Abordadas

| Prioridad | ID   | Historia de Usuario                                                  |
|-----------|------|-----------------------------------------------------------------------|
| 🟦        | [34] | [EXT - HU010] Ver y Actualizar Perfil (Paciente)                      |
| 🟦        | [36] | Generación de receta médica en PDF (Paciente)                         |
| 🟦        | [44] | [EXT - HU016] Establecer Horarios y actualizar horarios de Médicos    |
| 🟦        | [47] | [EXT - HU018] Ver y Actualizar Perfil (Médico)                        |
| 🟦        | [49] | Ver y Editar Pacientes (Administrador)                                |
| 🟦        | [50] | Ver y Editar Médicos (Administrador)                                  |
| 🟦        | [53] | Visualizar Calificación de Médicos                                    |
| 🟦        | [54] | Visualizar Calificación de Pacientes                                  |
| 🟦        | [55] | [EXT - HU024] Reportes                                                |
| 🟦        | [56] | [EXT - HU026] Barra de navegación                                     |
| 🟦        | [58] | [EXT - HU028] Dockerizar y subir el sistema a la nube                 |
| 🟨        | [59] | [EXT - HU029] Documentación                                            |
| 🟦        | [60] | Pruebas End-to-End (E2E)                                               |
| 🟦        | [61] | Integración de CI/CD para Backend        |

### Estado del Tablero

#### Sprint Planning  
[Ver tablero - Planning Sprint 4](tableros_f2/sprint4_planning.pdf)

#### Daily Scrum

- [Daily 1](tableros_f2/sprint4_daily1.pdf)  
- [Daily 2](tableros_f2/sprint4_daily2.pdf)  
- [Daily 3](tableros_f2/sprint4_daily3.pdf)  
- [Daily 4](tableros_f2/sprint4_daily4.pdf)  
- [Daily 5](tableros_f2/sprint4_daily5.pdf)  
- [Daily 6](tableros_f2/sprint4_daily6.pdf)

#### Sprint Retrospective  
[Ver tablero - Retrospective Sprint 4](tableros_f2/sprint4_retrospective.pdf)
