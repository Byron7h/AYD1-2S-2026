# Requerimientos de Restricción - RR

> Nota: en AYD2, este mismo tipo de artefacto suele denominarse "DR o Drivers de Restricción ", pero en este curso nos referiremos a ellos solamente como requerimientos de restricción.

## Plantilla sugerida para redactar RR 
> | Campo | Contenido esperado |
> | --- | --- |
> | ID | Código único en formato RR-X |
> | Descripción | Límite o condición obligatoria que el sistema debe respetar |
> | Justificación | Motivo técnico, legal, organizacional o de negocio |
> | Categoría | Tecnológica, Legal, Presupuesto, Interfaz u Organizacional |
> | Impacto | Consecuencias directas en diseño, desarrollo u operación |


### Aclaración didáctica
> 1. Un RR no describe una funcionalidad; describe una frontera que no se puede romper.
> 2. Un RR bien escrito es verificable y no ambiguo.
> 3. Si una frase responde a "que debe hacer el sistema", probablemente es RF y no RR.


### Mini ejemplo
> **ID:** RR-25  
> **Descripción:** El backend debe ejecutarse en Java 17 LTS.  
> **Justificación:** Política institucional de soporte tecnológico.  
> **Categoría:** Tecnológica / Organizacional  
> **Impacto:** Restringe frameworks y librerías a versiones compatibles con Java 17.

---

## RESTRICCIONES TECNOLÓGICAS
**RR-1**  
**Descripción:** El sistema debe exponer únicamente APIs REST con respuestas en formato JSON, sin soporte para otros protocolos o formatos. 
**Justificación:** Requerimiento explícito del proyecto para facilitar integración con universidades aliadas y socios comerciales.  
**Impacto:** Limita las opciones de comunicación entre sistemas a HTTP/HTTPS con JSON.

**RR-2**  
**Descripción:** Los Papers deben aceptarse únicamente en formato PDF para garantizar inmutabilidad del contenido.  
**Justificación:** Especificación del enunciado para evitar modificaciones no autorizadas en documentos académicos.  
**Impacto:** Los investigadores no podrán cargar papers en otros formatos como DOCX o LaTeX.

**RR-3**  
**Descripción:** Los Datasets deben aceptarse únicamente en formatos estructurados CSV o JSON.  
**Justificación:** Requerimiento para extraer automáticamente las primeras 5 filas como previsualización.  
**Impacto:** No se aceptarán datasets en formatos binarios como Excel (.xlsx) sin conversión previa.

**RR-4**  
**Descripción:** Para el metadato "Diccionario de Datos" de Datasets deben aceptarse únicamente en formatos PDF, DOCX, XLSX, PPTX y TXT.  
**Justificación:** Estandarización de entrada.  
**Impacto:** No se aceptarán formatos binarios sin conversión previa.

**RR-5**  
**Descripción:** Los Documentos Técnicos deben aceptarse únicamente en formatos PDF o DOCX.  
**Justificación:** Especificación del sistema para estandarizar el almacenamiento de documentación técnica.  
**Impacto:** Limita los formatos aceptados para documentos internos y externos.

**RR-6**  
**Descripción:** El Código Fuente debe proporcionarse como URL a repositorio Git o archivo ZIP comprimido.  
**Justificación:** Facilitar la trazabilidad y versionamiento del código compartido.  
**Impacto:** No se aceptará código fuente en otros formatos o sistemas de control de versiones.

**RR-7**  
**Descripción:** El motor de recomendaciones debe basarse exclusivamente en metadatos (título y tags), sin análisis del contenido interno de archivos.  
**Justificación:** Mantener eficiencia y evitar procesamiento costoso de análisis de texto completo.  
**Impacto:** Las recomendaciones no considerarán el contenido semántico profundo de los documentos.

**RR-8**  
**Descripción:** Todos los endpoints REST deben ser estrictamente de solo lectura (método GET únicamente).  
**Justificación:** Medida de seguridad para evitar modificaciones no autorizadas desde sistemas externos.  
**Impacto:** Las integraciones externas no podrán crear, modificar o eliminar activos mediante APIs.

**RR-9**  
**Descripción:** El sistema debe implementar una bitácora de versiones para todos los activos, registrando cada modificación.  
**Justificación:** Trazabilidad completa de cambios para auditoría y recuperación de versiones anteriores.  
**Impacto:** Aumenta el espacio de almacenamiento requerido y la complejidad del modelo de datos.

**RR-10**  
**Descripción:** El sistema debe integrarse con un proveedor de correo electrónico mediante protocolo SMTP o API equivalente para el envío de notificaciones.  
**Justificación:** Requerimiento explícito de la Fase 3 para enviar alertas y notificaciones de dictamen.  
**Impacto:** Se debe configurar credenciales y parámetros de conexión con un servicio de correo.

**RR-11**  
**Descripción:** Las plantillas de correo electrónico deben utilizar formato HTML responsive compatible con los principales clientes de correo (Gmail, Outlook, Apple Mail).  
**Justificación:** Garantizar legibilidad en diferentes dispositivos y clientes de correo.  
**Impacto:** Se debe diseñar plantillas HTML con CSS inline y pruebas de compatibilidad.

---

## RESTRICCIONES NORMATIVAS


**RR-12**  
**Descripción:** Las contraseñas deben cumplir requisitos mínimos de seguridad: mínimo 8 caracteres, mayúsculas, minúsculas y números con un máximo de 25 caracteres.  
**Justificación:** Estándar de seguridad para prevenir accesos no autorizados mediante fuerza bruta DoS o pérdida de datos.  
**Impacto:** Los usuarios deben crear contraseñas complejas, lo cual puede afectar la experiencia inicial.


**RR-13**  
**Descripción:** Los revisores no pueden modificar el contenido de activos, solo cambiar su estado (aprobar/rechazar).  
**Justificación:** Mantener transparencia e integridad del proceso de revisión académica.  
**Impacto:** Los revisores deben rechazar con feedback en lugar de corregir directamente errores encontrados.


**RR-14**  
**Descripción:** Los administradores deben proporcionar justificación obligatoria al retirar publicaciones.  
**Justificación:** Trazabilidad y rendición de cuentas para acciones administrativas críticas.  
**Impacto:** Aumenta el tiempo requerido para retirar contenido, pero mejora la auditoría.


**RR-15**  
**Descripción:** Los usuarios normales deben registrarse y autenticarse antes de buscar o visualizar documentos.  
**Justificación:** Control de acceso y trazabilidad de quién accede al capital intelectual.  
**Impacto:** No se permite acceso anónimo, lo cual puede reducir la audiencia potencial.

**RR-16**  
**Descripción:** Los usuarios normales solo pueden acceder a activos con doble condición: estado "Publicado" y confidencialidad "Público".  
**Justificación:** Proteger información interna o en proceso de la empresa.  
**Impacto:** Los documentos internos son completamente invisibles para usuarios externos, incluso por URL directa.

**RR-17**  
**Descripción:** Las notificaciones solo deben enviarse a usuarios que cumplan con el nivel de confidencialidad requerido por cada activo.  
**Justificación:** Cumplimiento con políticas de confidencialidad y seguridad de información definidas en etapas previas del proyecto.  
**Impacto:** Se debe validar permisos antes de cada envío de alerta.

**RR-18**  
**Descripción:** Los usuarios deben poder darse de baja de suscripciones en cualquier momento sin requerir aprobación administrativa.  
**Justificación:** Cumplimiento con buenas prácticas de gestión de notificaciones y experiencia de usuario.  
**Impacto:** La eliminación de suscripciones debe ser inmediata y sin validaciones adicionales.


---

## RESTRICCIONES OPERATIVAS

**RR-19**  
**Descripción:** El sistema debe dimensionarse para soportar hasta 10,000 usuarios concurrentes desde el día uno.  
**Justificación:** Expectativa de crecimiento masivo tras integración con socios estratégicos.  
**Impacto:** Requiere infraestructura escalable desde el inicio, aumentando costos iniciales de desarrollo y hosting.


**RR-20**  
**Descripción:** Los investigadores no pueden publicar directamente activos; deben enviarlos obligatoriamente a revisión.  
**Justificación:** Control de calidad y validación científica/técnica antes de publicación.  
**Impacto:** Aumenta el tiempo desde creación hasta publicación, requiriendo disponibilidad de revisores.


**RR-21**  
**Descripción:** Los investigadores solo pueden modificar o eliminar activos que no estén en espera de revisión o publicados.  
**Justificación:** Una vez en revisión, el activo entra en un proceso formal que no debe ser interrumpido por modificaciones.  
**Impacto:** Los investigadores pierden control sobre sus activos una vez enviados o publicados.

**RR-22**  
**Descripción:** El sistema debe registrar en tiempo real cada interacción: descargas, visitas únicas y citas bibliográficas.  
**Justificación:** Medición del retorno de inversión del capital intelectual para la gerencia.  
**Impacto:** Aumenta la carga de escritura en la base de datos y requiere procesamiento asíncrono eficiente.


**RR-23**  
**Descripción:** El sistema debe validar la estructura de archivos al momento de la carga, rechazando aquellos que no cumplan parámetros obligatorios.  
**Justificación:** Prevenir entrada de datos incompletos o incorrectos al flujo de revisión.  
**Impacto:** Los usuarios deben corregir errores inmediatamente, no pudiendo "guardar y continuar después".

**RR-24**  
**Descripción:** Los activos retirados deben conservarse en la base de datos para auditoría, pero invisibles para todos excepto administradores.  
**Justificación:** Cumplimiento con políticas de retención de datos y auditoría.
**Impacto:** Los activos retirados ocupan espacio permanente y requieren gestión de ciclo de vida de datos.


