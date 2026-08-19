# Product Backlog: historias de usuario y trabajo asociado

> El Product Backlog es una lista ordenada y evolutiva de todo el trabajo necesario para desarrollar y mejorar un producto. Puede incluir historias de usuario, tareas técnicas, pruebas, documentación, despliegue y otros elementos necesarios para entregar valor.
>
> En este documento se presentan principalmente las historias de usuario del proyecto SaludPlus. Las tareas derivadas de cada historia se gestionan en el tablero Kanban, mientras que la estimación, las dependencias y los criterios de aceptación se consultan en este Product Backlog.
>
> El proyecto se organizó en dos fases. La Fase 1 contiene las funcionalidades iniciales y la Fase 2 amplía historias existentes y agrega nuevas funcionalidades. La nomenclatura `[EXT - HUxxx]` indica que una historia extiende una historia creada anteriormente.

Este documento contiene las historias de usuario para el desarrollo de la plataforma SaludPlus, organizadas por fases.  
Cada historia describe una funcionalidad desde la perspectiva del usuario final y está priorizada según su importancia dentro del proyecto, dicha priorización se hizo al inicio de cada fase. Las prioridades están indicadas con cuadros de colores:  

🟥 **Alta:** Funcionalidades críticas que deben implementarse primero, ya que en base a estas se desarrollaran otras más adelante.  
🟨 **Media:** Funcionalidades importantes, pero que pueden desarrollarse después de las críticas.  
🟦 **Baja:** Funcionalidades opcionales que agregan valor, pero no están contempladas como obligatorias en la primera fase del proyecto. 

## Estimación del tamaño (T-Shirt Size)

> La estimación representa el tamaño relativo de una historia de usuario, no una cantidad exacta de horas. Las tallas permiten comparar la complejidad y comunicar el nivel de esfuerzo esperado.

Para estimar el tamaño de las historias de usuario, se utilizó el método T-Shirt Size.  

- Durante la Fase 1, cada miembro del equipo etiquetó las actividades del backlog de cada historia con las categorías XS, S, M, L y XL basándose en la complijidad, siendo la etiqueta "XS" la de menor complejidad y "XL" la de mayor complejidad. El tamaño final de cada historia se asignó basado en la opinión conjunta del equipo, consolidando las estimaciones individuales en una única etiqueta.
- Durante la Fase 2, el equipo asignó una talla de forma global a cada una de las nuevas historias, considerando desde un pricipio el peso indivividual de las actividades del backlog. Del mismo modo, el tamaño final de cada historia se asignó basado en la opinión conjunta del equipo, consolidando las estimaciones individuales en una única etiqueta.

> **XS:** Historia de baja complejidad y rápida implementación.  
> **S:** Historia sencilla, con pocos criterios de aceptación.  
> **M:** Historia de complejidad media, que puede requerir integración con otras funcionalidades.  
> **L:** Historia compleja, que involucra varios módulos o dependencias.  
> **XL:** Historia muy compleja, que podría dividirse en varias historias más pequeñas.  

---

# 1. Fase 1

## 🟥 [1] Registro de Paciente

**Como** paciente nuevo  
**Quiero** registrarme en la plataforma  
**Para** poder acceder a todas las funcionalidades de la plataforma

### Criterios de Aceptación

- El formulario debe permitir ingresar nombre, apellido, DPI, género, dirección, teléfono, fecha de nacimiento, fotografía (opcional), correo electrónico y contraseña.
- La contraseña debe tener al menos 8 caracteres, con una letra minúscula, una mayúscula y un número.
- El sistema debe guardar los datos del paciente de manera segura (contraseña encriptada).
- Se debe verificar que no exista un paciente con el DPI y correo electrónico ingresado.
- Si algún dato es incorrecto, se debe mostrar un mensaje de error detallado.
- Una vez llenado el formulario, el usuario debe pasar a esperar ser aprobado por un administrador, mientras eso sucede no debe poder ingresar al sistema.
- Se le debe notificar al paciente que su cuenta está pendiente de aprobación.

### Tamaño: XS

### Dependencias

- [25] Base de datos

---

## 🟥 [2] Autenticación Paciente

**Como** paciente  
**Quiero** quiero iniciar sesión en la plataforma  
**Para** poder acceder a mi cuenta

### Criterios de Aceptación

- Si el usuario no ha sido aprobado, debe ver un mensaje que indique "Su cuenta está pendiente de aprobación" y no podrá acceder a la plataforma.
- Si el usuario ingresa credenciales incorrectas, se debe mostrar un mensaje de error con la información del problema, como "Correo o contraseña incorrectos".
- Debe haber un enlace para registrarse si aún no se está registrado.

### Tamaño: XS

### Dependencias

- [1] Registro de Paciente
- [20] Aceptar Paciente

---

## 🟥 [3] Página Principal de Paciente

**Como** paciente  
**Quiero** ver una lista de médicos registrados en la plataforma  
**Para** poder elegir a uno para mi atención médica

### Criterios de Aceptación

- Se deben mostrar los nombres completos de los médicos, su especialidad, la dirección de su clínica y su foto.
- Se debe mostrar un botón para hacer cita con dicho doctor que redirija a los horarios de dicho médico

### Tamaño: S

### Dependencias

- [2] Autenticación Paciente

---

## 🟦 [4] Buscar médico por Especialidad

**Como** paciente  
**Quiero** buscar médicos según su especialidad  
**Para** poder encontrar un médico especializado en lo que necesito

### Criterios de Aceptación

- El paciente debe poder buscar médicos por especialidad ingresando el nombre de la especialidad o seleccionando desde un combo box.
- El sistema debe mostrar los médicos que coincidan con la especialidad ingresada.
- Los datos mostrados deben ser: nombre completo del médico, especialidad, dirección de su clínica y fotografía.
- Se debe mostrar un botón para hacer cita con dicho doctor que redirija a los horarios de dicho médico
- Si no se encuentra ningún médico para esa especialidad, debe mostrar el mensaje "No se encontraron médicos para esta especialidad".

### Tamaño: S

### Dependencias

- [3] Página Principal de Paciente

---

## 🟥 [5] Ver Horarios del médico y hacer cita

**Como** paciente  
**Quiero** ver los horarios disponibles de un médico  
**Para** poder programar una cita en un horario que me convenga

### Criterios de Aceptación

- Se debe mostrar los días y horarios del médico registrados en sistema en formato de texto “Lunes: 7:00-18:00 …“
- El paciente debe seleccionar una fecha y ver los horarios ocupados y disponibles del médico.
- Si el médico no está disponible ese día, se debe mostrar el mensaje "El médico no tiene disponibilidad para esta fecha".

### Tamaño: S

### Dependencias

- [2] Autenticación Paciente
- [11] Registro de Médico
- [16] Establecer y actualizar Horarios de Médicos

---

## 🟥 [6] Programar cita

**Como** paciente  
**Quiero** poder programar una cita con un médico  
**Para** recibir atención médica

### Criterios de Aceptación

- El paciente debe poder seleccionar la fecha, hora y motivo de la cita.
- El sistema debe verificar que la fecha esté dentro de los días en los que el médico atiende.
- El sistema debe validar que el horario esté disponible.
- Si la fecha o el horario no son válidos, se debe mostrar un mensaje como "La fecha seleccionada no está dentro de los horarios del médico" o "El horario seleccionado no está disponible".
- El paciente no podrá tener más de una cita programada con el mismo médico.

### Tamaño: M

### Dependencias

- [2] Autenticación Paciente
- [16] Establecer y actualizar Horarios de Médicos

---

## 🟥 [7] Lista de Citas Activas (Paciente)

**Como** paciente  
**Quiero** ver todas mis citas activas  
**Para** estar al tanto de mis próximas consultas

### Criterios de Aceptación

- El paciente debe poder visualizar la fecha, hora, nombre del médico, dirección de la clínica y motivo de cada una de las citas que ha realizado dentro de la plataforma y en las cuales aún no ha sido atendido
- El paciente debe poder presionar un botón para cancelar la cita

### Tamaño: XS

### Dependencias

-  [6] Programar cita

---

## 🟨 [8] Cancelar Cita (Paciente)

**Como** paciente  
**Quiero** quiero cancelar una cita  
**Para**  liberarla en caso de que no pueda asistir

### Criterios de Aceptación

- El paciente debe poder cancelar citas desde la vista "Lista de Citas Activas".
- Al intentar cancelar una cita, debe aparecer un mensaje de confirmación: "¿Está seguro de cancelar esta cita?".
- Si el paciente cancela, la cita debe desaparecer de la lista de citas activas.

### Tamaño: XS

### Dependencias

-  [7] Lista de Citas Activas

---

## 🟨 [9] Historial de Citas

**Como** paciente  
**Quiero** ver el historial de todas mis citas  
**Para** tener un registro de mis visitas médicas pasadas

### Criterios de Aceptación

- El paciente debe poder ver el historial de citas con los médicos atendidos, canceladas por él o por el paciente.
- Se debe mostrar la fecha, el nombre del médico, la dirección de la clínica, el motivo de la cita y el estado (Programada, Atendida, Cancelada por el medico, Cancelada por el paciente) y el tratamiento que se proporcionó si ya se ha atendido
- Si no tiene citas en el historial, debe ver el mensaje "No tiene citas previas registradas".

### Tamaño: XS

### Dependencias

- [6] Programar cita
- [8] Cancelar Cita (Paciente)

---

## 🟦 [10] Ver y Actualizar Perfil (Paciente)

**Como** paciente  
**Quiero** ver y actualizar mis datos de perfil  
**Para** mantener mi información actualizada

### Criterios de Aceptación

- El paciente puede ver y modificar sus datos, pero no podrá modificar su correo electrónico ni su DPI.

### Tamaño: XS

### Dependencias

- [2] Autenticación Paciente

---

## 🟥 [11] Registro de Médico

**Como** médico  
**Quiero** registrarme en la plataforma  
**Para** poder ofrecer mis servicios médicos a los pacientes

### Criterios de Aceptación

- El formulario debe permitir ingresar nombre, apellido, DPI, fecha de nacimiento, género, dirección, teléfono, fotografía (obligatoria), número colegiado, especialidad, dirección de la clínica, correo electrónico y contraseña.
- La contraseña debe tener al menos 8 caracteres, con una letra minúscula, una mayúscula y un número.
- El sistema debe guardar los datos del paciente de manera segura (contraseña encriptada).
- La fotografía del médico debe ser obligatoria para hacer el registro.
- Se debe verificar que no exista un medico con el DPI, correo electrónico o numero de colegiado ingresado
- La especialidad del medico debe seleccionarse de las especialidades que maneja el hospital
- Si algún dato es incorrecto, se debe mostrar un mensaje de error detallado.
- El sistema debe guardar la contraseña de manera segura (encriptada).
- Una vez llenado el formulario el medico debe pasar a esperar ser aprobado por un administrador, mientras eso sucede no debe poder ingresar al sistema
- Se le debe notificar al medico que su cuenta está pendiente de aprobación por medio de una alerta o mensaje en la pantalla

### Tamaño: XS

### Dependencias

- [25] Base de datos

---

## 🟥 [12] Autenticación medico

**Como** médico  
**Quiero** iniciar sesión en la plataforma  
**Para** gestionar mis citas y pacientes

### Criterios de Aceptación

- Los usuarios deben ingresar su correo electrónico y contraseña.
- Si el usuario no ha sido aprobado, debe ver un mensaje que indique "Su cuenta está pendiente de aprobación" y no podrá acceder a la plataforma.
- Si el usuario ingresa credenciales incorrectas, se debe mostrar un mensaje de error con la información del problema, como "Correo o contraseña incorrectos".
- Debe haber un enlace para registrarse si aún no se está registrado.

### Tamaño: XS

### Dependencias

- [11] Registro de Médico
- [21] Aceptar Médico

---

## 🟥 [13] Página Principal de Médico

**Como** médico  
**Quiero** ver todas las citas pendientes por atender  
**Para** gestionar mi agenda de forma eficiente

### Criterios de Aceptación

- Mostrar las citas pendientes con los detalles de la fecha, hora, nombre del paciente y motivo de la cita. ordenadas por fecha

### Tamaño: S

### Dependencias

- [12] Autenticación Médico

---

## 🟥 [14] Gestión de Citas (Medico)

**Como** médico  
**Quiero** marcar a un paciente como atendido  
**Para** mantener mi agenda actualizada

### Criterios de Aceptación

- El médico debe ver todas las citas pendientes por atender, ordenadas por fecha.
- Debe poder marcar la cita como "Atendida" luego de registrar el tratamiento correspondiente a dicha cita.
- Si el médico marca la cita como atendida, debe desaparecer de la lista de citas pendientes.

### Tamaño: M

### Dependencias

- [13] Página Principal de Médico
- [6] Programar cita

---

## 🟨 [15] Cancelar Cita (Médico)

**Como** médico  
**Quiero** cancelar una cita de un paciente  
**Para** manejar situaciones imprevistas

### Criterios de Aceptación

- El médico debe poder cancelar una cita desde la vista "Gestión de citas".
- Al cancelar la cita, el sistema debe eliminarla de la lista de citas pendientes.
- Se debe enviar un correo electrónico al paciente notificando la cancelación, con la fecha, hora, motivo y disculpas.

### Tamaño: XL

### Dependencias

- [14] Gestión de Citas (Medico)

---

## 🟥 [16] Establecer Horarios y actualizar horarios de Medicos

**Como** médico  
**Quiero** establecer y modificar mis horarios de atención  
**Para** que los pacientes puedan verlos y programar citas en esos horarios

### Criterios de Aceptación

- El médico debe poder establecer su horario de atención, seleccionando el día y horas de entrada y salida.
- El sistema debe guardar los horarios establecidos y permitir al médico actualizarlos en cualquier momento.

### Tamaño: XS

### Dependencias

- [12] Autenticación Médico

---

## 🟨 [17] Historial de Citas (Medico)

**Como** médico  
**Quiero** ver un historial de todas mis citas atendidas y canceladas  
**Para** llevar un registro de mis pacientes y citas pasadas

### Criterios de Aceptación

- El medico debe poder ver las citas pasadas con detalles como fecha, hora, nombre del paciente y estado de la cita.

### Tamaño: XS

### Dependencias

- [14] Gestión de Citas (Médico)
- [15] Cancelar Cita (Médico)

---

## 🟦 [18] Ver y Actualizar Perfil (Medico)

**Como** médico  
**Quiero** ver y actualizar mis datos de perfil  
**Para** mantener mi información actualizada.

### Criterios de Aceptación

- El medico puede ver y modificar sus datos, pero no podrá modificar su correo electrónico, numero de colegiado y su DPI.

### Tamaño: XS

### Dependencias

- [12] Autenticación Médico

---

## 🟥 [19] Autenticación Administrador

**Como** administrador  
**Quiero** quiero iniciar sesión en la plataforma  
**Para** aprobar el ingreso de médicos y pacientes, ver/gestionar los usuarios aprobados y generar reportes

### Criterios de Aceptación

- El administrador debe iniciar sesión con un usuario y contraseña predeterminados.
- Al ingresar la contraseña correcta, debe ser redirigido a la página de autenticación secundaria.
- En la autenticación secundaria el administrador debe poder subir un archivo llamado "auth2.ayd1" el cuan contiene una contraseña encriptada, y el sistema debe validar la contraseña encriptada dentro de este archivo sea la misma que la registrada en el sistema.
- Si la contraseña es incorrecta, el sistema debe mostrar un mensaje de error, como "Contraseña incorrecta en el archivo de autenticación".
- Ambas contraseñas deben ser distintas

### Tamaño: M

### Dependencias

- [25] Base de datos

---

## 🟥 [20] Aceptar Paciente

**Como** administrador  
**Quiero** aprobar o rechazar el registro de los pacientes  
**Para** controlar quién puede acceder al sistema

### Criterios de Aceptación

- El administrador debe ver la lista de pacientes pendientes de aprobación.
- Debe poder aceptar o rechazar a un paciente.
- Si el paciente es aceptado podrá acceder a la plataforma.

### Tamaño: XS

### Dependencias

- [1] Registro de Paciente
- [19] Autenticación Administrador

---

## 🟥 [21] Aceptar Médico

**Como** administrador  
**Quiero** aprobar o rechazar el registro de los médicos  
**Para** controlar quién puede acceder al sistema

### Criterios de Aceptación

- El administrador debe ver la lista de médicos pendientes de aprobación.
- Debe poder aceptar o rechazar a un médico.
- Si el médico es aceptado, recibirá un mensaje de confirmación y podrá acceder a la plataforma.

### Tamaño: XS

### Dependencias

- [11] Registro de Médico
- [19] Autenticación Administrador

---

## 🟨 [22] Ver y dar de baja Pacientes

**Como** administrador  
**Quiero** ver una lista de todos los pacientes aceptados  
**Para** poder gestionarlos y dar de baja a quien sea necesario

### Criterios de Aceptación

- El Administrador debe poder ver una lista de pacientes aprobados con la opción para darlo de baja.

### Tamaño: XS

### Dependencias

- [20] Aceptar Paciente

---

## 🟨 [23] Ver y dar de baja Médicos

**Como** administrador  
**Quiero** ver una lista de todos los médicos aceptados  
**Para** poder gestionarlos y dar de baja a quien sea necesario

### Criterios de Aceptación

- El Administrador debe poder ver una lista de médicos aprobados con la opción para darlo de baja.

### Tamaño: XS

### Dependencias

- [21] Aceptar Médico

---

## 🟨 [24] Reportes

**Como** administrador  
**Quiero** quiero generar reportes sobre el uso de la plataforma  
**Para** obtener estadísticas útiles para la administración

### Criterios de Aceptación

- El administrador debe poder visualizar un reporte sobre la cantidad de citas atendidas durante los últimos 7 días
- El administrador debe poder visualizar un reporte sobre las especialidades. En el se debe poder visualizar una lista de las 10 especialidades y su cantidad de citas atendidas, ordenadas de forma descendente

### Tamaño: M

### Dependencias

- [14] Gestión de Citas (Médico)

---

## 🟥 [25] Base de datos

**Como** usuario del sistema  
**Quiero** que mi información quede guardada en el sistema  
**Para** poder acceder a mi información y modificarla cuando sea necesario.

### Criterios de Aceptación

- Los datos del usuario (paciente/médico) deben almacenarse correctamente en una base de datos.  
- El usuario podrá actualizar su información personal (nombre, dirección, teléfono, foto).

### Tamaño: XL

### Dependencias

- Sin dependencias

---

## 🟥 [26] Barra de navegación

**Como** usuario del sistema  
**Quiero** acceder a las diferentes funcionalidades del sistema con facilidad  
**Para** poder utilizarlas desde el portal

### Criterios de Aceptación

- El usuario debe de poder acceder a las diferentes funcionalidades del sistema mediante un menu ubicado en su dashboard

### Tamaño: XS

### Dependencias

- [2] Autenticación Paciente
- [12] Autenticación Médico
- [19] Autenticación Administrador

---

## 🟨 [27] Página Principal de Administrador

**Como** administrador  
**Quiero** ver todos los pacientes y médicos aprobados  
**Para** llevar un control del sistema

### Criterios de Aceptación

- El administrador debe poder ver una lista de todos los médicos aprobados
- El administrador debe poder ver una lista de todos los pacientes aprobados

### Tamaño: XS

### Dependencias

- [20] Aceptar Paciente
- [21] Aceptar Médico

---

## 🟨 [28] Dockerizar y subir el sistema a la nube

**Como** usuario  
**Quiero** acceder al sistema a través de internet  
**Para** poder utilizar sus las diferentes funcionalidades donde me encuentre

### Criterios de Aceptación

- El backend, frontend y base de datos deben estar dockerizados.
- El backend, frontend y base de datos deben estar desplegados en la nube.
- Los usuarios deben poder acceder al sistema desde cualquier lugar con internet.
- El sistema debe estar disponible en un dominio público o IP accesible.
- Los contenedores deben mantenerse en ejecución sin interrupciones.

### Tamaño: L

### Dependencias

- Historias con parte funcional: [1] - [24], [26] y [27]

---

## 🟨 [29] Documentación

**Como** dueño del proyecto  
**Quiero** contar con documentación técnica y de usuario  
**Para** lfacilitar futuras modificaciones y mantenimiento del sistema

### Criterios de Aceptación

- Debe existir un documento con los requerimientos funcionales y no funcionales.
- Deben incluirse diagramas de arquitectura del sistema (Casos de uso, Clases, Secuencia, Componentes, Despliegue, Entidad-Relación).
- Debe existir un manual técnico que explique el entorno de desarrollo, dependencias, instalación y configuración del sistema.
- Debe existir un manual de usuario que detalle cómo utilizar el sistema.
- Debe incluirse la herramienta de gestión del proyecto utilizada y capturas del Kanban a lo largo del Sprint.
- Se deben organizar las grabaciones realizadas durante el Sprint para referencia futura.
- El Scrum Master debe evaluar al equipo y agregar una calificación basada en el desempeño.

### Tamaño: XL

### Dependencias

- Se desarrolla progresivamente conforme se completan otras funcionalidades clave.

- Para la documentación técnica, depende de:

    - [28] Dockerizar y subir el sistema a la nube

    - [30] Pruebas Unitarias (para incluir información sobre las pruebas automatizadas).

---

## 🟨 [30] Pruebas Unitarias

**Como**  dueño del producto  
**Quiero**  asegurarme de que las funcionalidades clave del sistema sean validadas con pruebas automatizadas  
**Para** garantizar su correcto funcionamiento antes de ser usadas por los clientes

### Criterios de Aceptación

- Deben implementarse al menos 5 pruebas automatizadas para funcionalidades clave.
- Las pruebas deben ejecutarse automáticamente y generar reportes de éxito o fallo.
- Debe existir un manual técnico que explique el entorno de desarrollo, dependencias, instalación y configuración del sistema.
- Las pruebas deben asegurar que las funcionalidades básicas como el login de usuarios, la programación de citas y la autenticación funcionan correctamente.
- El dueño del producto debe poder acceder a los resultados de las pruebas de manera clara y entendible.

### Tamaño: L

### Dependencias

Prueba 1:

- [1] Registro de Paciente
- [11] Registro de Médico

Prueba 2:

- [6] Programar Cita

Prueba 3:

- [14] Gestión de Citas (Medico)

Prueba 4:

- [6] Programar cita
- [16] Establecer Horarios y actualizar horarios de Médicos

Prueba 5:

- [20] Aceptar Paciente
- [21] Aceptar Médico

---



# 2. Fase 2

La Fase 2 se enfocó en ampliar y complementar el sistema ya construido, debido a esto algunas historias de usuario fueron extensiones de historias existentes, por lo que adoptaron la nomenclatura:

> `[ID] [EXT - HU ID_de_la_historia_original ] Nombre_de_la_historia_original`

Esto indica que la historia amplía la funcionalidad de una historia existente, manteniendo la continuidad del diseño original.

## 🟥 [31] [EXT - HU001] Registro de Paciente

**Como** paciente nuevo  
**Quiero** registrarme en la plataforma  
**Para** poder acceder a todas las funcionalidades de la plataforma  

### Criterios de Aceptación

- El formulario debe permitir ingresar nombre, apellido, DPI, género, dirección, teléfono, fecha de nacimiento, fotografía reciente (obligatoria), correo electrónico válido, archivo PDF con DPI y contraseña.  
- La fotografía pasa a ser obligatoria.  
- Se debe validar el formato del correo electrónico.  
- Se debe poder subir un archivo PDF que contenga el DPI del usuario.  

### Tamaño: XS  
### Dependencias  
- [1] Registro de Paciente  
- [57] [EXT - HU025] Base de datos

---

## 🟥 [32] [EXT - HU002] Autenticación Paciente

**Como** paciente  
**Quiero** iniciar sesión en la plataforma  
**Para** poder acceder a mi cuenta  

### Criterios de Aceptación

- Se debe validar el correo del usuario mediante el envío de un token único de autenticación.  
- El token se envía una vez que el paciente ha sido aprobado.
- Se debe mostrar una vista para ingresar el token.  
- Si el token es válido, se accede a la vista principal del paciente. Si es incorrecto, se notifica al usuario.  
- Una vez validado, el token ya no será solicitado en futuros ingresos.  

### Tamaño: M  
### Dependencias  
- [2] Autenticación Paciente  
- [20] Aceptar Paciente  
- [57] [EXT - HU025] Base de datos

---

## 🟥 [33] [EXT - HU009] Historial de Citas

**Como** paciente  
**Quiero** ver el historial de todas mis citas  
**Para** tener un registro de mis visitas médicas pasadas  

### Criterios de Aceptación

- Cada cita atendida debe mostrar opciones para:  
  - Ver Tratamiento  
  - Calificar Atención Médica  
  - Reportar Médico  

### Tamaño: XS
### Dependencias  
- [9] Historial de Citas  
- [7] Lista de Citas Activas (Paciente) 
- [57] [EXT - HU025] Base de datos

---

## 🟦 [34] [EXT - HU010] Ver y Actualizar Perfil (Paciente)

**Como** paciente  
**Quiero** ver y actualizar mis datos de perfil  
**Para** mantener mi información actualizada  

### Criterios de Aceptación

- Se debe incluir el PDF del DPI entre los datos a ver y modificar.  
- No se debe permitir la modificación del correo electrónico.  

### Tamaño: XS  
### Dependencias  
- [10] Ver y Actualizar Perfil (Paciente)  
- [57] [EXT - HU025] Base de datos

---

## 🟨 [35] Visualizar tratamiento recibido (Paciente)

**Como** paciente  
**Quiero** visualizar el tratamiento que me han asignado  
**Para** seguir correctamente las indicaciones médicas posteriores a una cita  

### Criterios de Aceptación

- Desde el historial, el paciente debe poder acceder al detalle de cualquier cita pasada.  
- Se muestra:  
  - Fecha de la cita  
  - Nombre completo del médico  
  - Especialidad  
  - Número de colegiado  
  - Diagnóstico  
  - Medicamentos recetados (nombre, cantidad, duración, y descripción de dosis)  
- Debe haber un botón para imprimir tratamiento o receta médica.  

### Tamaño: S
### Dependencias  
- [33] [EXT - HU009] Historial de Citas  
- [42] Asignación de tratamiento  
- [57] [EXT - HU025] Base de datos

---

## 🟦 [36] Generación de receta médica en PDF (Paciente)

**Como** paciente  
**Quiero** poder descargar la receta médica en PDF  
**Para** presentarla en la farmacia y adquirir mis medicamentos  

### Criterios de Aceptación

- El PDF debe incluir encabezado con nombre de la clínica, fecha y teléfono.  
- El PDF debe incluir una tabla con los medicamentos recetados (nombre, cantidad, tiempo, descripción de dosis).  
- El PDF debe incluir un pie de página con nombre completo del médico, especialidad y número de colegiado (emulando una firma/sello).  

### Tamaño: M  
### Dependencias  

- [35] Visualizar tratamiento recibido (Paciente)
- [57] [EXT - HU025] Base de datos

---

## 🟨 [37] Calificar atención médica

**Como** paciente  
**Quiero** calificar al médico que me atendió  
**Para** dar a conocer la calidad del servicio recibido  

### Criterios de Aceptación

- Solo se puede calificar una cita que haya sido marcada como "Atendida".  
- Se permite calificar con un puntaje de 0 a 5 estrellas.  
- Puede incluir una descripción opcional.  

### Tamaño: XS 

### Dependencias  

- [33] [EXT - HU009] Historial de Citas 
- [57] [EXT - HU025] Base de datos 

---

## 🟨 [38] Reportar médico

**Como** paciente  
**Quiero** reportar a un médico que tuvo una mala conducta  
**Para** que el administrador tome las medidas correspondientes  

### Criterios de Aceptación

- Se debe mostrar un formulario con:  
  - Lista de categorías para el reporte  
  - Campo de explicación  
- Solo se puede reportar si la cita fue "Atendida".  
- El reporte debe ser accesible al administrador, para su revisión.

### Tamaño: XS  
### Dependencias  
- [33] [EXT - HU009] Historial de Citas  
- [22] Ver y dar de baja Pacientes  
- [57] [EXT - HU025] Base de datos

---

## 🟥 [39] [EXT - HU011] Registro de Médico

**Como** médico  
**Quiero** registrarme en la plataforma  
**Para** poder ofrecer mis servicios a los pacientes  

### Criterios de Aceptación

- El formulario debe permitir ingresar:  
  - Nombre completo  
  - DPI  
  - Fecha de nacimiento  
  - Género  
  - Dirección  
  - Teléfono  
  - Fotografía (obligatoria)  
  - Número de colegiado  
  - Especialidad  
  - Dirección de la clínica  
  - Correo electrónico  
  - Archivo PDF con CV  
  - Contraseña  

### Tamaño: XS
### Dependencias  
- [11] Registro de Médico  
- [57] [EXT - HU025] Base de datos

---

## 🟥 [40] [EXT - HU012] Autenticación Médico

**Como** médico  
**Quiero** iniciar sesión en la plataforma  
**Para** gestionar mis citas y pacientes  

### Criterios de Aceptación

- Se debe validar el correo mediante un token único de autenticación.  
- El token se envía una vez que el médico ha sido aprobado. (Primero se valida si está autorizado y luego se hace el proceso del token).
- Se le debe proporcionar un espacio al usuario para ingresar el token
- Si el token es correcto, se accede a la vista principal. Si es incorrecto, se debe notificar al médico.  
- Una vez validado, no se solicitará el token nuevamente.  

### Tamaño: M  
### Dependencias  
- [12] Autenticación Médico  
- [21] Aceptar Médico  
- [57] [EXT - HU025] Base de datos

---

## 🟥 [41] [EXT - HU014] Gestión de Citas (Médico)

**Como** médico  
**Quiero** marcar a un paciente como atendido  
**Para** mantener mi agenda actualizada  

### Criterios de Aceptación

- El médico debe ver todas las citas pendientes por atender, ordenadas por fecha.  
- Debe poder marcar la cita como "Atendida" luego de registrar el tratamiento correspondiente.  
- El botón "Marcar como Atendido" debe dirigir a una nueva vista donde se registrará el tratamiento.  

### Tamaño: XS
### Dependencias  
- [14] Gestión de Citas (Médico)  
- [42] Asignación de tratamiento  

---

## 🟥 [42] Asignación de tratamiento (Médico)

**Como** médico  
**Quiero** asignarle un tratamiento a mi paciente al marcar su cita como atendida  
**Para** dejar registrada la prescripción correspondiente al diagnóstico  

### Criterios de Aceptación

- Solo el médico asociado a la cita puede asignar tratamiento.  
- El médico debe poder ingresar un diagnóstico mediante texto.  
- Debe poder seleccionar medicamentos desde una lista.  
- Para cada medicamento, debe indicar cantidad, tiempo y dosis.  
- Al guardar el tratamiento, la cita se marca automáticamente como atendida.  

### Tamaño: L  
### Dependencias  
- [6] Programar cita  
- [41] [EXT - HU014] Gestión de Citas (Médico)  
- [57] [EXT - HU025] Base de datos

---

## 🟨 [43] [EXT - HU015] Cancelar Cita (Médico)

**Como** médico  
**Quiero** cancelar una cita de un paciente  
**Para** manejar situaciones imprevistas  

### Criterios de Aceptación

- El médico debe poder cancelar una cita desde "Gestión de Citas".  
- Al cancelar la cita, el sistema elimina la cita de la lista de pendientes.  
- Se debe registrar un motivo de cancelación.  
- Se debe enviar un correo electrónico al paciente notificando la cancelación, Este correo debe incluir:  
  - Fecha y hora de la cita cancelada  
  - Nombre del médico  
  - Motivo de cancelación  
  - Mensaje de disculpas  

### Tamaño: M  
### Dependencias  
- [15] Cancelar Cita (Médico)
- [57] [EXT - HU025] Base de datos

---

## 🟦 [44] [EXT - HU016] Establecer y Actualizar Horarios de Médicos

**Como** médico  
**Quiero** establecer y modificar mis horarios de atención  
**Para** que los pacientes puedan programar citas  

### Criterios de Aceptación

- El médico debe poder establecer su horario de atención, seleccionando el día y horas de entrada y salida.  
- El sistema guarda los horarios establecidos.  
- El médico puede actualizar sus horarios en cualquier momento.  

### Tamaño: XS 
### Dependencias  
- [16] Establecer y actualizar Horarios de Médicos  

---

## 🟨 [45] Calificar Paciente

**Como** médico  
**Quiero** calificar al paciente que he atendido  
**Para** registrar su comportamiento y ayudar a mantener el orden  

### Criterios de Aceptación

- La calificación va de 0 a 5 estrellas.  
- Puede incluir un comentario opcional.  
- Solo se puede calificar citas "Atendidas".  

### Tamaño: XS  
### Dependencias  
- [41] [EXT - HU014] Gestión de Citas (Médico)  
- [57] [EXT - HU025] Base de datos

---

## 🟨 [46] Reportar Paciente

**Como** médico  
**Quiero** reportar a un paciente por mala conducta  
**Para** que el administrador tome las medidas correspondientes  

### Criterios de Aceptación

- Solo puede hacerse para citas "Atendidas".  
- Se presenta un formulario con:  
  - Lista de categorías  
  - Campo de explicación  
- El reporte debe ser accesible al administrador,  para su revisión.

### Tamaño: XS  
### Dependencias  
- [41] [EXT - HU014] Gestión de Citas (Médico)  
- [22] Ver y dar de baja Pacientes  
- [57] [EXT - HU025] Base de datos

---

## 🟦 [47] [EXT - HU018] Ver y Actualizar Perfil (Médico)

**Como** médico  
**Quiero** ver y actualizar mis datos de perfil  
**Para** mantener mi información actualizada  

### Criterios de Aceptación

- Se debe incluir el PDF del CV entre los datos a ver y modificar.  
- No se debe permitir modificar el correo electrónico.  

### Tamaño: XS  
### Dependencias  
- [18] Ver y Actualizar Perfil (Médico)  

---

## 🟥 [48] [EXT - HU020] Aceptar Paciente/Médico

**Como** administrador  
**Quiero** aprobar o rechazar el registro de pacientes y médicos  
**Para** controlar quién accede al sistema  

### Criterios de Aceptación

- El administrador ve una lista de solicitudes pendientes.  
- Puede aceptar o rechazar usuarios.  
- Si el usuario es aceptado, se envía un token por correo al paciente/médico.  
- El administrador debe poder visualizar el DPI o el CV desde un visor PDF en la web.  

### Tamaño: XL  
### Dependencias  
- [31] [EXT - HU001] Registro de Paciente
- [39] [EXT - HU011] Registro de Médico  
- [57] [EXT - HU025] Base de datos

---

## 🟦 [49] Ver y Editar Pacientes (Administrador)

**Como** administrador  
**Quiero** ver una lista de todos los pacientes aceptados  
**Para** mantener actualizada la información y gestionar los usuarios activos  

### Criterios de Aceptación

- Se debe mostrar una tabla/listado con los pacientes aceptados.  
- Se permite editar la información del paciente (excepto el correo electrónico).  

### Tamaño: XS  
### Dependencias  
- [20] Aceptar Paciente  
- [31] [EXT - HU001] Registro de Paciente

---

## 🟦 [50] Ver y Editar Médicos (Administrador)

**Como** administrador  
**Quiero** ver una lista de todos los médicos aceptados  
**Para** mantener actualizada la información y gestionar los usuarios activos  

### Criterios de Aceptación

- Se debe mostrar una tabla/listado con los médicos aceptados.  
- Se permite editar la información del médico (excepto el correo electrónico).  

### Tamaño: XS  
### Dependencias  
- [21] Aceptar Médico  
- [39] [EXT - HU011] Registro de Médico 

---

## 🟨 [51] Gestionar Reportes de Médicos

**Como** administrador  
**Quiero** revisar todos los reportes realizados por pacientes contra médicos  
**Para** tomar decisiones sobre la validez de los reportes y actuar en consecuencia  

### Criterios de Aceptación

- El administrador debe visualizar una lista de reportes hechos contra médicos.  
- Cada reporte debe mostrar:  
  - Categoría  
  - Motivo  
  - Nombre del médico reportado  
  - Nombre del paciente  
  - Estado del reporte (No visto, Rechazado, Médico dado de baja)  
- El administrador podrá:  
  - Rechazar el reporte  
  - Dar de baja al médico  

### Tamaño: S  
### Dependencias  
- [38] Reportar médico  
- [57] [EXT - HU025] Base de datos

---

## 🟨 [52] Gestionar Reportes de Pacientes

**Como** administrador  
**Quiero** revisar todos los reportes realizados por médicos contra pacientes  
**Para** tomar decisiones sobre la validez de los reportes y actuar en consecuencia  

### Criterios de Aceptación

- El administrador debe visualizar una lista de reportes hechos contra pacientes.  
- Cada reporte debe mostrar:  
  - Categoría  
  - Motivo  
  - Nombre del paciente reportado  
  - Nombre del médico  
  - Estado del reporte (No visto, Rechazado, Paciente dado de baja)  
- El administrador podrá:  
  - Rechazar el reporte  
  - Dar de baja al paciente  

### Tamaño: S 
### Dependencias  
- [46] Reportar paciente 
- [57] [EXT - HU025] Base de datos

---

## 🟦 [53] Visualizar Calificación de Médicos

**Como** administrador  
**Quiero** ver un reporte general con las calificaciones promedio de los médicos  
**Para** evaluar su desempeño de forma cuantitativa  

### Criterios de Aceptación

- Se debe mostrar una lista de médicos activos con:  
  - Nombre completo  
  - Especialidad  
  - Calificación promedio (0-5 estrellas)  

### Tamaño: XS  
### Dependencias  
- [37] Calificar atención médica  

---

## 🟦 [54] Visualizar Calificación de Pacientes

**Como** administrador  
**Quiero** ver un reporte general con las calificaciones promedio de los pacientes  
**Para** monitorear la calidad de las interacciones desde el lado del paciente  

### Criterios de Aceptación

- Se debe mostrar una lista de pacientes activos con:  
  - Nombre completo  
  - Calificación promedio (0-5 estrellas)  

### Tamaño: XS  
### Dependencias  
- [45] Calificar paciente  

---

## 🟦 [55] [EXT - HU024] Reportes

**Como** administrador  
**Quiero** generar reportes sobre el uso de la plataforma  
**Para** obtener estadísticas útiles para la administración  

### Criterios de Aceptación

- El administrador debe poder visualizar un reporte con los 5 médicos que más citas han atendido en lo que va del mes. Este debe mostrar:
  - Nombre completo
  - Especialidad
  - Número total de citas atendidas
  - Calificación promedio(si aplica)
- El administrador debe poder visualizar un reporte con los usuarios más reportados (tanto pacientes como médicos). Este debe mostrar:
  - Nombre completo
  - Rol (paciente o médico)
  - Número total de reportes recibidos
  - Calificación promedio (si aplica)
- Todos los reportes deben ser generados automáticamente y mostrarse en tablas ordenadas por su métrica principal (ej. cantidad de citas, cantidad de reportes).

### Tamaño: S  
### Dependencias  
- [51] Gestionar Reportes de Médicos  
- [52] Gestionar Reportes de Pacientes  
- [53] Visualizar Calificación de Médicos  
- [54] Visualizar Calificación de Pacientes 
- [57] [EXT - HU025] Base de datos

---

## 🟦 [56] [EXT - HU026] Barra de navegación

**Como** usuario  
**Quiero** acceder fácilmente a las funcionalidades del sistema  
**Para** poder utilizarlas desde el portal  

### Criterios de Aceptación

- Debe existir un menú ubicado en el dashboard del usuario.  
- Desde este menú se puede acceder a las funcionalidades disponibles según el tipo de usuario.  

### Tamaño: XS  
### Dependencias  
- [26] Barra de navegación  

---

## 🟥 [57] [EXT - HU025] Base de datos

**Como** usuario de la aplicación  
**Quiero** que mi información quede guardada en el sistema  
**Para** poder acceder a ella cuando sea necesario  

### Criterios de Aceptación

- Modificar los atributos del paciente para incluir el DIP en PDF
- Modificar los atributos del medico para incluir el CV en PDF
- Incluir un token para los usuarios
- Incluir un atributo que nos diga si el usuario ya hizo la autenticación por token
- Incluir en la base el manejo de medicamentos y su desglose para los tratamientos y enlazarlos a las citas atendidas
  - nombre
  - cantidad
  - tiempo de administración
  - dosis
- Incluir la posibilidad de asociar citas atendidas con los medicamentes mediante tratamientos
- Incluir en la base una tabla para las calificaciones de los médicos, con calificación y descripción, enlazada a médicos
- Incluir en la base una tabla para las calificaciones de los pacientes, con calificación y descripción, enlazada a médicos
- Incluir en la base una tabla para reportes de pacientes y otra para reportes de doctores, esta debe incluir el estado de aprobado (se dio de baja al medico) y rechazado
- Agregar las categorías de las razones del reportar médicos
- Agregar las categorías de razones del reportar paciente

### Tamaño: XL  
### Dependencias  
- [25] Base de datos  

---

## 🟦 [58] [EXT - HU028] Dockerizar y subir el sistema a la nube

**Como** usuario  
**Quiero** acceder al sistema desde internet  
**Para** poder usar sus funcionalidades donde me encuentre  

### Criterios de Aceptación

- El backend, frontend y base de datos deben estar dockerizados.
- El backend, frontend y base de datos deben estar desplegados en la nube.
- Los usuarios deben poder acceder al sistema desde cualquier lugar con internet.
- El sistema debe estar disponible en un dominio público o IP accesible.
- Los contenedores deben mantenerse en ejecución sin interrupciones.

### Tamaño: S  
### Dependencias  
- [57] [EXT - HU025] Base de datos  

---

## 🟨 [59] [EXT - HU029] Documentación

**Como** dueño del proyecto  
**Quiero** contar con documentación técnica y de usuario  
**Para** facilitar futuras modificaciones y mantenimiento del sistema 

### Criterios de Aceptación

- Debe existir un documento con los requerimientos funcionales y no funcionales.
- Deben incluirse diagramas de arquitectura del sistema (Casos de uso, Clases, Secuencia, Componentes, Despliegue, Entidad-Relación).
- Debe existir un manual técnico que explique el entorno de desarrollo, dependencias, instalación y configuración del sistema.
- Debe existir un manual de usuario que detalle cómo utilizar el sistema.
- Debe incluirse la herramienta de gestión del proyecto utilizada y capturas del Kanban a lo largo del Sprint.
- Se deben organizar las grabaciones realizadas durante el Sprint para referencia futura.
- El Scrum Master debe evaluar al equipo y agregar una calificación basada en el desempeño.

### Tamaño: L  
### Dependencias 

- Se desarrolla progresivamente conforme se completan otras funcionalidades clave.

---

## 🟦 [60] Pruebas End-to-End (E2E)

**Como** dueño del producto  
**Quiero** asegurarme de que las funcionalidades clave sean validadas  
**Para** garantizar su correcto funcionamiento  

### Criterios de Aceptación

- Deben implementarse al menos cinco pruebas automatizadas para funcionalidades clave del sistema.
- Se debe utilizar una herramienta adecuada para pruebas E2E (por ejemplo, Cypress, Playwright o Selenium).
- Deben ser de complejidad media. (No tan sencillas)
- Deben abarcar funcionalidades ajenas al login, aunque pueden incluirse algunas del login.
- Debe existir un apartado en la documentación que explique cada una de las pruebas implementadas y muestre su estado de aprobado (Que tenga chequesito) al ejecutarse desde el programa elegido

### Tamaño: XL 
### Dependencias  
- Se desarrolla progresivamente conforme se completan otras funcionalidades clave.

---

## 🟦 [61] Integración de CI/CD para Backend

**Como** dueño del producto  
**Quiero**  contar con un flujo de integración y despliegue continuo para el backend  
**Para** segurarme de que cada cambio pase por validaciones automáticas y se despliegue sin errores al entorno productivo.

### Criterios de Aceptación

- Se debe configurar un pipeline de CI/CD que incluya:
- Ejecución automática de pruebas unitarias
- Construcción del backend y despliegue automático
- El pipeline debe ser ejecutado al hacer push a la rama Main.
- El pipeline debe frenar el despliegue si alguna prueba falla.
- Debe incluir el uso de variables de entorno seguras para credenciales, claves y configuraciones.
- Debe existir un archivo de documentación que explique:
Cómo está estructurado el pipeline.
- Qué comandos deben ejecutarse para desplegar localmente y/o monitorear el estado del despliegue.

### Tamaño: XL  
### Dependencias  
- [30] Pruebas Unitarias

