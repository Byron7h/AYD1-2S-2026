# Requerimientos Funcionales - RF

> Nota: en AYD2, este mismo tipo de artefacto suele denominarse "drivers RF o Drivers Requerimientos Funcionales", pero en este curso nos referiremos a ellos solamente como requerimientos funcionales.

## Plantilla sugerida para redactar RF 
> Usa esta plantilla cuando quieras agregar nuevos requerimientos funcionales:
> 
> | Campo | Contenido esperado |
> | --- | --- |
> | ID | Código único en formato RF-X-Y |
> | Descripción | Acción concreta y verificable que debe realizar el sistema |
> | Prioridad | Alta, Media o Baja |
> | Actores involucrados | Rol humano o sistema que participa |

### Recomendaciones de redacción 
> 1. Describe una sola capacidad por RF.
> 2. Evita términos ambiguos como "rápido", "fácil" o "intuitivo" sin medida.

### Mini ejemplo
> **ID:** RF-9-1-1  
> **Descripción:** Se debe permitir al usuario exportar su historial de descargas en formato CSV.  
> **Prioridad:** Media  
> **Actores involucrados:** Usuario, Sistema  


A continuación se muestra un ejemplo de Requerimientos Funcionales para un proyecto:

---

## CU1 ALMACENAMIENTO Y CLASIFICACIÓN

### CU1-1 Subir Activo (Borrador)

**RF-1-1-1**  
**Descripción:** Se debe permitir que los investigadores inicien el proceso para registrar un nuevo activo en el repositorio institucional.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-1-2**  
**Descripción:** Se debe solicitar al investigador seleccionar el tipo de activo a subir (Paper, Dataset, Código Fuente o Documento Técnico).  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-1-3**  
**Descripción:** Se debe permitir al investigador cargar el archivo fuente del activo.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-1-4**  
**Descripción:** Se debe solicitar los metadatos requeridos según el tipo de activo seleccionado y permitir al investigador completarlos.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-1-5**  
**Descripción:** Se debe invocar automáticamente la validación de metadatos según el tipo de activo seleccionado.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-1-6**  
**Descripción:** Se debe guardar el activo en estado "Borrador" asociándolo al investigador creador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-1-7**  
**Descripción:** Se debe confirmar al investigador la creación exitosa del borrador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-2 Validar Metadatos de Tipo de Activo

**RF-1-2-1**  
**Descripción:** Se debe identificar el tipo de activo (Paper, Dataset, Código Fuente o Documento Técnico) basado en la elección del usuario investigador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-2**  
**Descripción:** Se debe validar que todos los campos obligatorios específicos del tipo de activo estén completos y que archivo fuente sea el correcto según el tipo de activo.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-3**  
**Descripción:** Para activos del tipo Documentos Técnicos se debe permitir llenar el campo de confidencialidad (Público/Interno), en el resto de activos este metadato será por defecto Público.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-4**  
**Descripción:** Se debe validar que los Papers tengan un Abstract de mínimo 100 caracteres y mínimo 3 tags.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-5**  
**Descripción:** Para Datasets, el proceso debe obtener una muestra inicial (primeras 5 filas) para verificar estructura y legibilidad.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-6**  
**Descripción:** Se debe validar que el Código Fuente incluya dependencias, lenguaje y framework en el metadato stack tecnológico.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-2-7**  
**Descripción:** Cuando existan inconsistencias, el proceso debe generar un listado de observaciones para que el investigador pueda corregirlas.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-3 Gestionar Borrador (Ver/Modificar/Eliminar)

**RF-1-3-1**  
**Descripción:** Se debe mostrar una lista de los activos asociados al investigador, donde sea visible su nombre, estado y otros datos relevantes, con la opción de ver, "Modificar" o "Eliminar" el activo, y con capacidad de filtrar por estado.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-3-2**  
**Descripción:** Se debe permitir al investigador seleccionar un borrador de su lista de activos.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-3-3**  
**Descripción:** Al gestionar un borrador, el proceso debe mostrar su información actual para facilitar su revisión o actualización.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-3-4**  
**Descripción:** Se debe permitir al investigador editar los metadatos y/o archivo del borrador.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-3-5**  
**Descripción:** Se debe registrar en la bitácora la modificación realizada con la fecha correspondiente.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-3-6**  
**Descripción:** El procedimiento de eliminación debe requerir una confirmación expresa antes de descartar un borrador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-3-7**  
**Descripción:** Una vez confirmada, la organización debe eliminar el borrador junto con cualquier información asociada.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-3-8**  
**Descripción:** Los activos que no se encuentren en estado “Borrador” o “Rechazado” no deben permitir gestión por parte del investigador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-3-9**  
**Descripción:** Si un activo fue rechazado, el investigador debe tener acceso al feedback correspondiente.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-4 Enviar Activo a Revisores

**RF-1-4-1**  
**Descripción:** Se debe permitir al investigador seleccionar un borrador con opción de "Enviar a Revisión" para enviar a revisión desde la lista de activos relacionados al investigador.  
**Prioridad:** Alta
**Actores involucrados:** Investigador

**RF-1-4-2**  
**Descripción:** Una vez enviado, el activo debe ingresar al estado “En Revisión” como parte del flujo.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-4-3**  
**Descripción:** Desde ese momento, el borrador debe quedar congelado para evitar cambios durante la evaluación.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-4-4**  
**Descripción:** Se debe notificar a los revisores disponibles sobre el nuevo activo pendiente de revisión.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-4-5**  
**Descripción:** Se debe confirmar al investigador que el activo fue enviado a revisión exitosamente.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-5 Revisión/Aprobación de Activo

**RF-1-5-1**  
**Descripción:** Se debe permitir al revisor acceder a su lista de activos pendientes de revisión.  
**Prioridad:** Alta
**Actores involucrados:** Revisor

**RF-1-5-2**  
**Descripción:** Se debe garantizar que los revisores conozcan el contenido completo del activo y su información descriptiva.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-5-3**  
**Descripción:** Se debe permitir al revisor aprobar el activo para publicación.  
**Prioridad:** Alta
**Actores involucrados:** Revisor

**RF-1-5-4**  
**Descripción:** Se debe cambiar automáticamente el estado del activo a "Publicado" al ser aprobado.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-5-5**  
**Descripción:** Se debe indexar automáticamente el activo aprobado para búsqueda.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-5-6**  
**Descripción:** Se debe registrar los detalles de la aprobación en la bitácora de cambios.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-5-7**  
**Descripción:** Se debe notificar al investigador sobre la aprobación de su activo.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-6 Rechazar Activo

**RF-1-6-1**  
**Descripción:** El revisor debe poder emitir un rechazo cuando determine que un activo no cumple los criterios de calidad.  
**Prioridad:** Alta
**Actores involucrados:** Revisor

**RF-1-6-2**  
**Descripción:** Se debe solicitar al revisor ingresar feedback obligatorio explicando el motivo del rechazo.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-6-3**  
**Descripción:** Se debe cambiar el estado del activo de "En Revisión" a "Borrador".  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-6-4**  
**Descripción:** Se debe registrar los detalles del rechazo y el feedback en la bitácora de cambios.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-6-5**  
**Descripción:** Se debe notificar al investigador con los comentarios del revisor.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-6-6**  
**Descripción:** Se debe hacer el activo disponible nuevamente para edición por el investigador.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU1-7 Registrar Cambio

**RF-1-7-1**  
**Descripción:** Toda acción que afecte un activo debe quedar asociada al identificador único del mismo.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-2**  
**Descripción:** Se debe dejar constancia del responsable de cada cambio registrado.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-3**  
**Descripción:** Cada modificación debe incluir la fecha y hora exacta en que ocurrió.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-4**  
**Descripción:** El registro debe especificar el tipo de cambio realizado (carga, modificación, eliminación, aprobación, rechazo o retiro).  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-5**  
**Descripción:** El procedimiento debe guardar el estado previo y posterior del activo.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-6**  
**Descripción:** Los cambios derivados de rechazos o retiros deben guardar el feedback asociado.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-1-7-7**  
**Descripción:** Se debe guardar el registro completo para auditoría.  
**Prioridad:** Media
**Actores involucrados:** Sistema

---

### CU1-8 Retirar Publicación

**RF-1-8-1**  
**Descripción:** Se debe permitir al administrador buscar y seleccionar un activo publicado para retirarlo.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

**RF-1-8-2**  
**Descripción:** Se debe solicitar al administrador ingresar justificación obligatoria del retiro.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-8-3**  
**Descripción:** Tras el retiro, el activo debe ser reclasificado como Retirado.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-8-4**  
**Descripción:** Los activos retirados deben dejar de mostrarse públicamente, manteniendo acceso solo para administradores.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-8-5**  
**Descripción:** Se debe conservar todos los datos del activo para auditoría.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-1-8-6**  
**Descripción:** El proceso de retiro debe documentarse junto con su justificación.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

## BÚSQUEDA Y RECOMENDACIONES

### CU2-1 Buscar Activo

**RF-2-1-1**  
**Descripción:** Se debe proporcionar una interfaz de búsqueda accesible para todos los usuarios autenticados.  
**Prioridad:** Alta
**Actores involucrados:** Investigador, Usuario, Revisor, Administrador

**RF-2-1-2**  
**Descripción:** Se debe permitir al usuario ingresar términos de búsqueda por título o tags.  
**Prioridad:** Alta
**Actores involucrados:** Investigador, Usuario, Revisor, Administrador

**RF-2-1-3**  
**Descripción:** El proceso de consulta debe considerar coincidencias relevantes basadas en título y tags.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-1-4**  
**Descripción:** Se debe ordenar los resultados de búsqueda por relevancia.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-1-5**  
**Descripción:** Se debe conservar un registro de cada búsqueda realizada para analítica interna.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-1-6**  
**Descripción:** Los resultados deben mostrar información esencial que permita identificar el activo de forma rápida (ej. Título, tags y abstract).  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-1-7**  
**Descripción:** Cuando no existan coincidencias, debe informarse al usuario y sugerirle alternativas.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU2-2 Ver Activo

**RF-2-2-1**  
**Descripción:** Se debe permitir al usuario seleccionar un activo desde los resultados de búsqueda o recomendaciones.  
**Prioridad:** Alta
**Actores involucrados:** Investigador, Usuario, Revisor, Administrador

**RF-2-2-2**  
**Descripción:** Se debe mostrar todos los metadatos del activo (título, abstract, tags, autores, etc.).  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-2-3**  
**Descripción:** Se debe mostrar el contenido de los documentos presentes en el activo según el tipo: previsualización (primera página) o acceso completo (documento completo).  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-2-4**  
**Descripción:** Se debe registrar cada visita única en métricas con usuario, activo y fecha/hora.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU2-3 Descargar Activo

**RF-2-3-1**  
**Descripción:** Se debe proporcionar una opción de descarga visible mientras el usuario visualiza un activo.  
**Prioridad:** Alta
**Actores involucrados:** Investigador, Usuario, Revisor, Administrador

**RF-2-3-2**  
**Descripción:** Se debe preparar el archivo fuente del activo para descarga y debe iniciar su descarga al dispositivo del usuario.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-2-3-3**  
**Descripción:** Toda descarga debe quedar registrada para análisis de uso incluyendo usuario, activo, fecha/hora y tipo de archivo.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU2-4 Recomendar Activos

**RF-2-4-1**  
**Descripción:** Se debe identificar el contexto de búsqueda del usuario basándose en los resultados de la búsqueda actual.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-2-4-2**  
**Descripción:** Se debe buscar coincidencias terminológicas en títulos y tags basándose en los títulos y tags activos presentes en los resultados de la búsqueda actual.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-2-4-3**  
**Descripción:** Las recomendaciones deben respetar las políticas de acceso (solo administradores pueden ver activos retirados).  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-2-4-4**  
**Descripción:** Se debe ordenar las recomendaciones por relevancia basándose en mayor coincidencia de términos.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-2-4-5**  
**Descripción:** Se debe mostrar la lista de activos recomendados bajo una sección nombrada como "Activos relacionados" o "Activos similares".  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-2-4-6**  
**Descripción:** Se debe mostrar recomendaciones generales si no hay suficientes coincidencias.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

---

## CONEXIÓN CON OTROS SISTEMAS

### CU3-1 Llamar Endpoint Público

**RF-3-1-1**  
**Descripción:** Se debe exponer endpoints REST públicos para consulta de activos.  
**Prioridad:** Media
**Actores involucrados:** Otros Sistemas

**RF-3-1-2**  
**Descripción:** Se debe recibir peticiones HTTP GET sin requerir autenticación.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-1-3**  
**Descripción:** Se debe invocar el procesamiento de petición para validar, obtener datos y retornar respuestas en formato JSON con código HTTP apropiado.   
**Prioridad:** Media
**Actores involucrados:** Sistema

---

### CU3-2 Gestionar Petición

**RF-3-2-1**  
**Descripción:** Se debe verificar que el método HTTP de la petición sea GET (solo lectura).  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-2**  
**Descripción:** Se debe identificar el tipo de datos solicitados según el endpoint (papers, datasets, código, documentos).  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-3**  
**Descripción:** Se debe consultar la base de datos filtrando solo activos con estado "Publicado" y confidencialidad "Público".  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-4**  
**Descripción:** Se debe trasladar los datos obtenidos a formato JSON.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-5**  
**Descripción:** Se debe registrar cada petición en logs incluyendo endpoint y timestamp.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-6**  
**Descripción:** Se debe retornar error 405 Method Not Allowed si el método HTTP no es GET.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-3-2-7**  
**Descripción:** Se debe retornar un array JSON con un mensaje explicativo y un código 200 OK si no existen activos que cumplan los criterios.  
**Prioridad:** Media
**Actores involucrados:** Sistema

---

## ANALÍTICA Y MÉTRICAS

### CU4-1 Visualizar Dashboard

**RF-4-1-1**  
**Descripción:** Se debe proporcionar acceso al dashboard de analítica solo a usuarios con rol de Administrador.  
**Prioridad:** Baja
**Actores involucrados:** Administrador

**RF-4-1-2**  
**Descripción:** Se debe consultar las métricas almacenadas en tiempo real.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-4-1-3**  
**Descripción:** Se debe generar visualizaciones de descargas por activo en un gráfico adecuado.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-4-1-4**  
**Descripción:** Se debe generar visualizaciones de visitas únicas por período en un gráfico adecuado.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-4-1-5**  
**Descripción:** Se debe generar visualizaciones de métricas relacionadas con citas bibliográficas.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

**RF-4-1-6**  
**Descripción:** Se debe permitir al administrador filtrar métricas por rango de fechas y tipo de activo.  
**Prioridad:** Baja
**Actores involucrados:** Administrador

**RF-4-1-7**  
**Descripción:** Se debe mostrar mensaje "No hay datos suficientes para generar métricas" si no existen métricas registradas.  
**Prioridad:** Baja
**Actores involucrados:** Sistema

---

## GESTIÓN DE USUARIOS

### CU5-1 Registrar/Modificar Usuario Propio

**RF-5-1-1**  
**Descripción:** Se debe habilitar un proceso de registro público para nuevos usuarios sin necesidad de autenticación previa.  
**Prioridad:** Alta
**Actores involucrados:** Usuario

**RF-5-1-2**  
**Descripción:** El proceso de registro debe solicitar correo electrónico, nombre de usuario y contraseña.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-3**  
**Descripción:** Se debe evitar que se creen cuentas duplicadas con el mismo correo electrónico.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-4**  
**Descripción:** Se debe validar que la contraseña cumpla requisitos de seguridad (mínimo 8 caracteres, máximo 25 caracteres, mayúsculas, minúsculas, números).  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-5**  
**Descripción:** Se debe crear la cuenta con rol "Usuario Normal" por defecto.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-6**  
**Descripción:** Se debe permitir al usuario autenticado acceder a su perfil para modificar sus datos.  
**Prioridad:** Alta
**Actores involucrados:** Usuario

**RF-5-1-7**  
**Descripción:** Se debe validar que el nuevo correo no esté en uso por otro usuario.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-8**  
**Descripción:** Se debe solicitar la contraseña actual antes de permitir cambio de contraseña.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-1-9**  
**Descripción:** Se debe validar que la nueva contraseña cumpla requisitos de seguridad.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

---

### CU5-2 Gestionar Usuarios (Crear por Rol/Modificar/Bloquear/Desbloquear)

**RF-5-2-1**  
**Descripción:** Se debe permitir al administrador acceder a la gestión de usuarios.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

**RF-5-2-2**  
**Descripción:** Se debe permitir crear usuarios con los roles: Investigador, Revisor, Administrador o Usuario Normal.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

**RF-5-2-3**  
**Descripción:** Se debe validar que el correo no exista previamente al crear un usuario.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-2-4**  
**Descripción:** Se debe validar que la contraseña cumpla requisitos de seguridad en la creación.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-2-5**  
**Descripción:** Se debe permitir al administrador modificar correo, nombre de usuario y rol de cualquier usuario existente.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

**RF-5-2-6**  
**Descripción:** Se debe validar que los nuevos datos (correo y usuario) no estén en uso por otro usuario.  
**Prioridad:** Alta
**Actores involucrados:** Sistema

**RF-5-2-7**  
**Descripción:** Se debe permitir al administrador bloquear un usuario activo, impidiendo futuros inicios de sesión.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

**RF-5-2-8**  
**Descripción:** Se debe permitir al administrador desbloquear un usuario bloqueado, restaurando su acceso.  
**Prioridad:** Alta
**Actores involucrados:** Administrador

---
## SUSCRIPCIONES Y ALERTAS DE CONOCIMIENTO

### CU6-1 Gestionar Suscripciones (Crear/Listar/Eliminar)

**RF-6-1-1**  
**Descripción:** Se debe proporcionar una interfaz de "Mis Suscripciones" accesible desde el perfil de todos los usuarios autenticados.  
**Prioridad:** Media
**Actores involucrados:** Investigador, Usuario, Revisor

**RF-6-1-2**  
**Descripción:** Se debe permitir al usuario crear nuevas suscripciones seleccionando entre tres tipos: Tag, Colección o Autor.  
**Prioridad:** Media
**Actores involucrados:** Investigador, Usuario, Revisor

**RF-6-1-3**  
**Descripción:** Se debe mostrar al usuario un listado de opciones disponibles según el tipo de suscripción seleccionado (listado de tags existentes, colecciones activas o autores con activos publicados).  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-1-4**  
**Descripción:** Se debe validar que no exista una suscripción duplicada para el mismo usuario y criterio antes de crearla.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-1-5**  
**Descripción:** Se debe crear la suscripción asociándola al usuario.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-1-6**  
**Descripción:** Se debe permitir al usuario visualizar todas sus suscripciones activas organizadas por tipo (Tags, Colecciones, Autores).  
**Prioridad:** Media
**Actores involucrados:** Investigador, Usuario, Revisor

**RF-6-1-7**  
**Descripción:** Para cada suscripción listada, se debe mostrar: tipo, criterio específico (nombre del tag/colección/autor) y opción de eliminar.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-1-8**  
**Descripción:** Se debe permitir al usuario eliminar cualquiera de sus suscripciones activas.  
**Prioridad:** Media
**Actores involucrados:** Investigador, Usuario, Revisor


---

### CU6-2 Evaluar y Disparar Alerta (Correo y Plataforma)

**RF-6-2-1**  
**Descripción:** Se debe evaluar automáticamente cuando un activo cambia a estado "Publicado" si existen suscripciones relacionadas con sus criterios (tags, colección o autores).  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-2-2**  
**Descripción:** Se debe enviar alerta únicamente a usuarios suscritos que tengan permisos de acceso según el nivel de confidencialidad del activo.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-2-3**  
**Descripción:** Se debe evitar el envío de alertas duplicadas al mismo usuario sobre el mismo activo.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-2-4**  
**Descripción:** Se debe enviar alerta por correo electrónico que incluya: título del activo, tipo de recurso, autor, tags y colecciones a las que pertenece.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-2-5**  
**Descripción:** Se debe crear notificación visible en la plataforma para el usuario con: título del activo.  
**Prioridad:** Media
**Actores involucrados:** Sistema

**RF-6-2-6**  
**Descripción:** Las notificaciones en plataforma deben permanecer visibles hasta que el usuario las marque como leídas o las elimine.  
**Prioridad:** Media
**Actores involucrados:** Sistema

---
