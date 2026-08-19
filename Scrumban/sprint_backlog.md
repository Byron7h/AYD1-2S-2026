## Product Backlog (Historias de Usuario)

> El Sprint Backlog contiene las historias de usuario seleccionadas para cada sprint. Las tareas derivadas de cada historia y el responsable de cada tarea se encuentran en las tarjetas del tablero Kanban. La estimación, las dependencias y los criterios de aceptación se encuentran en el Product Backlog.

# Fase 1

## Sprint 1

### Sprint Goal

> Construir la base funcional del sistema mediante el registro y autenticación de pacientes, médicos y administradores, junto con la gestión inicial de citas, horarios, navegación y base de datos.

### Descripción del Sprint Backlog

En este sprint se seleccionaron todas las historias de usuario con **prioridad alta (rojas)**. Estas incluían las tareas necesarias para establecer la base del sistema.

### Historias de Usuario Abordadas

|      |      |      |
|------|------|------|
|  🟥 [1] Registro de Paciente        | 🟥 [2] Autenticación Paciente         |  🟥 [3] Página Principal de Paciente         |
| 🟥 [5] Ver Horarios del médico y hacer cita        | 🟥 [6] Programar cita         |  🟥 [7] Lista de Citas Activas (Paciente)         |
|🟥 [11] Registro de Médico        |  🟥 [12] Autenticación medico         | 🟥 [13] Página Principal de Médico         |
|🟥 [14] Gestión de Citas (Medico)        |🟥 [16] Establecer Horarios y actualizar horarios de Medicos         |  🟥 [19] Autenticación Administrador         |
| 🟥 [20] Aceptar Paciente        | 🟥 [21] Aceptar Médico        | 🟥 [25] Base de datos         |
|🟥 [26] Barra de navegación        |         |         |

## Sprint 2

### Sprint Goal

> Completar funcionalidades complementarias del sistema y avanzar en la calidad, documentación y disponibilidad de la solución mediante nuevas historias de usuario, pruebas y despliegue.

### Descripción del Sprint Backlog

En este sprint se agregaron 3 nuevas historias de usuario enfocadas en la documentación, pruebas y deslpliegue del sistema. Se abordaron aquellas etiquetadas como **prioridad media (amarillas)** y **prioridad baja (azules)**.

### Historias de Usuario Abordadas

|      |      |      |
|------|------|------|
|  🟦 [4] Buscar médico por Especialidad        | 🟨 [8] Cancelar Cita (Paciente)         |  🟨 [9] Historial de Citas         |
| 🟦 [10] Ver y Actualizar Perfil (Paciente)        | 🟨 [15] Cancelar Cita (Médico)         | 🟨 [17] Historial de Citas (Medico) (Paciente)         |
|🟦 [18] Ver y Actualizar Perfil (Medico)        |   🟨 [22] Ver y dar de baja Pacientes         |  🟨 [23] Ver y dar de baja Médicos         |
|🟨 [24] Reportes        | 🟨 [27] Página Principal de Administrador         | 🟨 [28] Dockerizar y subir el sistema a la nube         |
| 🟨 [29] Documentación        | 🟨 [30] Pruebas Unitarias        |         |

# Fase 2

> La Fase 2 amplía algunas historias de la Fase 1 y agrega nuevas funcionalidades. Las historias con la nomenclatura `[EXT - HUxxx]` mantienen la relación con una historia anterior.

## Sprint 3

### Sprint Goal

> Ampliar las funcionalidades centrales de SaludPlus con autenticación reforzada, gestión de tratamientos, historial, calificaciones, reportes y soporte de base de datos.

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

## Sprint 4

### Sprint Goal

> Completar las funcionalidades de perfil, administración, reportes y documentación, y preparar el sistema para pruebas, despliegue en la nube y automatización de integración y entrega.

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
| 🟦        | [61] | Integración de CI/CD para Backend                                     |
