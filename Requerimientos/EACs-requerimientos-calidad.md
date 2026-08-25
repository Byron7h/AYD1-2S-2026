# Requerimientos de Calidad - EAC (Escenarios de Atributos de Calidad)

> Nota: en AYD2, este mismo tipo de artefacto suele denominarse "drivers EAC o Drivers de Escenario de Atributos de Calidad", pero en este curso nos referiremos a ellos solamente como Requerimientos de Calidad.


## Plantilla sugerida para redactar EAC
> 
> | Campo | Contenido esperado |
> | --- | --- |
> | ID | Código único en formato EAC-X |
> | Atributo de calidad | Uno de los atributos priorizados (ej. rendimiento, seguridad, disponibilidad) |
> | Escenario crudo | Situación real que origina el requisito de calidad |
> | Estímulo | Evento que dispara el comportamiento esperado |
> | Fuente del estímulo | Actor o sistema que provoca el evento |
> | Entorno | Condiciones bajo las cuales ocurre |
> | Artefacto | Componente afectado |
> | Respuesta esperada | Reacción que debe tener el sistema |
> | Medida de la respuesta | Umbral numérico verificable |
> | Objetivo de negocio | Valor para el negocio o para el usuario |

### Aclaración didáctica
> 
> 1. Un EAC no reemplaza un RF; complementa el "que" con el "que tan bien".
> 2. La medida de respuesta siempre debe incluir un número, porcentaje o tiempo.
> 3. Si no se puede probar en una prueba objetiva, debe reescribirse.

### Mini ejemplo
> 
> **ID:** EAC-15  
> **Atributo de calidad:** Rendimiento  
> **Escenario crudo:** En inscripción de cursos, miles de estudiantes consultan horarios al mismo tiempo.  
> **Estímulo:** Solicitud de consulta de horario.  
> **Fuente del estímulo:** Estudiante.  
> **Entorno:** Pico de demanda en hora de inscripción.  
> **Artefacto:** API de horarios y base de datos académica.  
> **Respuesta esperada:** El sistema entrega resultados sin timeout.  
> **Medida de la respuesta:** 95% de consultas en <= 2 segundos con 3,000 usuarios concurrentes.  
> **Objetivo de negocio:** Evitar saturación y reducir abandono durante el proceso de inscripción.

---

## EFICIENCIA

### **EAC-1: Escalabilidad a 10,000 Usuarios Concurrentes**

| Campo                                 | Contenido                                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Escenario crudo                       | Un investigador o socio externo realiza una búsqueda simultáneamente cuando otros 9,999 usuarios están consumiendo activos intensivamente (descargas masivas, consultas API).                          |
| Objetivos de negocio correspondientes | Garantizar ROI del capital intelectual disponible 24/7; cumplir SLA de uptime con socios estratégicos.                                                                                                 |
| Atributos de calidad relevantes       | Desempeño, Escalabilidad, Disponibilidad.                                                                                                                                                              |
| Estímulo                              | Solicitud de búsqueda semántica o consumo de endpoint público con filtros complejos.                                                                                                                   |
| Fuente de estímulo                    | Usuario, Investigador, Socio Externo.                                                                                                                                                                  |
| Entorno                               | Pico de tráfico agresivo (9,999 usuarios activos), operación crítica en múltiples zonas horarias.                                                                                                      |
| Artefacto                             | Motor de búsqueda distribuido, API Gateway, balanceador de carga, clúster de base de datos.                                                                                                            |
| Respuesta                             | Resultados de búsqueda o payload de API entregados correctamente sin timeouts.                                                                                                                         |
| Medida de la respuesta                | Tiempo de respuesta <2 segundos para búsquedas y <1 segundo para API en el 99% de las solicitudes.                                                                                                     |
| Preguntas                             | ¿Los administradores tienen prioridad de recursos sobre usuarios regulares en picos? ¿Qué ocurre al usuario 10,001 - se rechaza con error 503 o se encola con mensaje de espera?                       |
| Problemas                             | ¿La infraestructura de BD soporta pooling de 10,000 conexiones? ¿El caché distribuido está dimensionado para evitar dog-pile effect? ¿El balanceador de carga mantiene sticky sessions o es stateless? |

---

### **EAC-2: Tiempo de Carga del Dashboard de Métricas**

| Campo                                 | Contenido                                                                                                                                                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escenario crudo                       | Gerencia solicita dashboard de análisis de uso con datos del último trimestre cuando hay +5,000 activos y millones de eventos registrados.                                                                                        |
| Objetivos de negocio correspondientes | Medir retorno de inversión del capital intelectual; identificar autores influyentes y tendencias para planificación estratégica.                                                                                                  |
| Atributos de calidad relevantes       | Desempeño, Usabilidad.                                                                                                                                                                                                            |
| Estímulo                              | Solicitud de visualización de dashboard ejecutivo con agregaciones complejas.                                                                                                                                                     |
| Fuente de estímulo                    | Gerencia, Administrador.                                                                                                                                                                                                          |
| Entorno                               | Operación normal con alta volumetría de datos de monitoreo en tiempo real.                                                                                                                                                        |
| Artefacto                             | Módulo de analítica, base de datos time-series, motor de agregación.                                                                                                                                                              |
| Respuesta                             | Dashboard completamente renderizado con gráficos, tablas y alertas operativas.                                                                                                                                                    |
| Medida de la respuesta                | Carga completa <4 segundos incluso consultando datos en tiempo real.                                                                                                                                                              |
| Preguntas                             | ¿Las métricas son calculadas on-the-fly o precalculadas en materialized views? ¿Qué componentes del dashboard son prioritarios si hay que hacer trade-offs de performance?                                                        |
| Problemas                             | Consultas agregadas costosas (COUNT, SUM, GROUP BY) sobre millones de filas de logs; generación de gráficos con series temporales de alta cardinalidad; saturación de CPU si múltiples administradores consultan simultáneamente. |

---

### **EAC-3: Respuesta de Búsqueda por Coincidencia de Título y Tags**

| Campo                                 | Contenido                                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escenario crudo                       | Usuario realiza búsqueda semántica por "Machine Learning" después de que 200 investigadores subieron activos con "Deep Learning" como tag en las últimas 48 horas.                    |
| Objetivos de negocio correspondientes | Descubrimiento inteligente de información; maximizar reutilización del capital intelectual proactivamente.                                                                            |
| Atributos de calidad relevantes       | Desempeño, Usabilidad.                                                                                                                                                                |
| Estímulo                              | Consulta de búsqueda con términos conceptuales que requieren expansión semántica.                                                                                                     |
| Fuente de estímulo                    | Usuario, Investigador.                                                                                                                                                                |
| Entorno                               | Operación normal con índice semántico recientemente actualizado con nuevos términos.                                                                                                  |
| Artefacto                             | Motor de búsqueda semántica, índice invertido de títulos y tags, caché de resultados.                                                                                                 |
| Respuesta                             | Lista de resultados ordenados por relevancia con sección de recomendaciones inteligentes.                                                                                             |
| Medida de la respuesta                | 95% de búsquedas con resultado <4 segundos.                                                                                                                                           |
| Preguntas                             | ¿Cómo se mide el 5% restante? ¿Hay degradación progresiva o son casos atípicos? ¿La semántica incluye stemming para español/inglés técnico?                                           |
| Problemas                             | Índice semántico mal configurado causa falsos positivos; consultas con operadores lógicos (AND/OR) mal optimizadas generan full table scans; falta de caché de resultados frecuentes. |

---

## CONFIABILIDAD

### **EAC-4: Uptime 99.9%**

| Campo                                 | Contenido                                                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escenario crudo                       | Investigador en zona horaria Asia-Pacífico intenta acceder a un dataset crítico a las 3 AM hora de Guatemala durante un mantenimiento planificado. |
| Objetivos de negocio correspondientes | Continuidad operativa innegociable; servir a investigadores globales sin interrupciones; cumplir compromisos de SLA con socios externos.           |
| Atributos de calidad relevantes       | Confiabilidad, Disponibilidad.                                                                                                                     |
| Estímulo                              | Solicitud de acceso al sistema en cualquier momento del día.                                                                                       |
| Fuente de estímulo                    | Investigador, Socio Externo, Usuario.                                                                                                              |
| Entorno                               | Operación 24/7 en múltiples zonas horarias con mantenimientos planificados.                                                                        |
| Artefacto                             | Infraestructura completa (servidores, base de datos, redes, balanceadores).                                                                        |
| Respuesta                             | Sistema disponible y respondiendo en menos de 2 segundos.                                                                                          |
| Medida de la respuesta                | Máximo 43.2 minutos de downtime mensual (8.76 horas/año).                                                                                          |
| Preguntas                             | ¿Los mantenimientos planificados cuentan para el downtime? ¿Qué constituye "tiempo de indisponibilidad"? ¿Hay despliegues zero-downtime?           |
| Problemas                             | Upgrades de base de datos requieren locks; despliegue de nuevas versiones necesita reinicio; picos de tráfico degradan sin caída total.            |

---

### **EAC-5: Indexación Automática Consistente**

| Campo                                 | Contenido                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Escenario crudo                       | Revisor aprueba un paper a las 11:59 PM; un socio externo en Europa consulta la API a la medianoche esperando ver el paper publicado. |
| Objetivos de negocio correspondientes | Velocidad de publicación del conocimiento; disponibilidad inmediata para consumo global y generación de ROI.                          |
| Atributos de calidad relevantes       | Confiabilidad, Desempeño.                                                                                                             |
| Estímulo                              | Aprobación de activo por parte de Revisor.                                                                                            |
| Fuente de estímulo                    | Revisor (acción humana).                                                                                                              |
| Entorno                               | Flujo de publicación automatizado post-aprobación.                                                                                    |
| Artefacto                             | Motor de indexación, cola de procesamiento (queue), service de búsqueda.                                                              |
| Respuesta                             | Activos aparece en resultados de búsqueda y endpoints API.                                                                            |
| Medida de la respuesta                | 99.9% de activos indexados correctamente en <5 segundos.                                                                              |
| Preguntas                             | ¿Qué ocurre con el 0.1% fallido? ¿Hay reintento automático? ¿Cómo se notifica al administrador?                                       |
| Problemas                             | Race condition entre BD e indexador; corrupción del índice; caída del service de cola.                                                |

---

### **EAC-6: Consistencia de Estados de Activos**

| Campo                                 | Contenido                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Escenario crudo                       | Investigador envía activo a revisión; simultáneamente, Administrador lo retira por issues legales. |
| Objetivos de negocio correspondientes | Gobernanza del flujo de trabajo; evitar publicación accidental; integridad del catálogo.           |
| Atributos de calidad relevantes       | Confiabilidad, Seguridad.                                                                          |
| Estímulo                              | Transiciones concurrentes de estado.                                                               |
| Fuente de estímulo                    | Revisor, Administrador.                                                                            |
| Entorno                               | Operación concurrente multi-usuario.                                                               |
| Artefacto                             | Base de datos transaccional, lógica de máquina de estados.                                         |
| Respuesta                             | Estado final único y consistente (Retirado tiene prioridad).                                       |
| Medida de la respuesta                | 0% de activos en estados inconsistentes o duplicados.                                              |
| Preguntas                             | ¿Qué transiciones están permitidas? ¿Hay rollback manual?                                          |
| Problemas                             | Deadlocks; race conditions; lost updates.                                                          |

---

## USABILIDAD

### **EAC-7: Usabilidad de Carga de Activos por Usuarios Nuevos**

| Campo                                 | Contenido                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------- |
| Escenario crudo                       | Investigador junior intenta subir su primer dataset sin leer manual.      |
| Objetivos de negocio correspondientes | Velocidad de onboarding; reducción de soporte; minimizar tiempo de carga. |
| Atributos de calidad relevantes       | Usabilidad, Eficiencia.                                                   |
| Estímulo                              | Intento de carga completa por usuario sin experiencia.                    |
| Fuente de estímulo                    | Investigador nuevo.                                                       |
| Entorno                               | Primer acceso al sistema.                                                 |
| Artefacto                             | Formulario con validaciones dinámicas, guía contextual, tooltips.         |
| Respuesta                             | Activo cargado exitosamente y enviado a revisión.                         |
| Medida de la respuesta                | 70% de éxito en primer intento sin ayuda en <7 minutos.                   |
| Preguntas                             | ¿Qué pasa con el 30% restante? ¿Hay tutorial interactivo?                 |
| Problemas                             | Validaciones estrictas; falta de tooltips; formatos mal explicados.       |

---

### **EAC-8: Claridad de Mensajes de Error en Validaciones**

| Campo                                 | Contenido                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Escenario crudo                       | Investigador sube archivo .xlsx en lugar de CSV y recibe mensaje genérico. |
| Objetivos de negocio correspondientes | Reducción de ciclos de revisión; menos tickets; corrección rápida.         |
| Atributos de calidad relevantes       | Usabilidad, Mantenibilidad.                                                |
| Estímulo                              | Intento de carga con formato incorrecto.                                   |
| Fuente de estímulo                    | Sistema de validación automática.                                          |
| Entorno                               | Operación de carga de activo.                                              |
| Artefacto                             | Sistema de mensajes de error, validadores.                                 |
| Respuesta                             | Mensaje específico indicando formato esperado y recibido.                  |
| Medida de la respuesta                | 100% de mensajes específicos con campo y error.                            |
| Preguntas                             | ¿Mensajes bilingües? ¿Errores en JSON para APIs?                           |
| Problemas                             | Internacionalización; mantenimiento de reglas; crecimiento del código.     |

---

### **EAC-9: Comprensibilidad del Dashboard de Métricas**

| Campo                                 | Contenido                                                                |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Escenario crudo                       | Gerente sin background técnico interpreta KPIs para decidir inversiones. |
| Objetivos de negocio correspondientes | Toma de decisiones ágil; democratización de insights.                    |
| Atributos de calidad relevantes       | Usabilidad, Funcionalidad.                                               |
| Estímulo                              | Visualización de dashboard ejecutivo.                                    |
| Fuente de estímulo                    | Módulo de analítica.                                                     |
| Entorno                               | Reunión estratégica sin documentación.                                   |
| Artefacto                             | Visualizaciones, tooltips, resúmenes ejecutivos.                         |
| Respuesta                             | Gerente interpreta métricas sin ambigüedad.                              |
| Medida de la respuesta                | 100% de KPIs comprensibles sin capacitación.                             |
| Preguntas                             | ¿KPIs principales? ¿Personalización? ¿Exportación?                       |
| Problemas                             | Visualización de big data; riesgo de mala interpretación; latencia.      |

---

## FUNCIONALIDAD

### **EAC-10: Soporte de 4 Tipos de Activos con Validaciones Específicas**

| Campo                                 | Contenido                                                            |
| ------------------------------------- | -------------------------------------------------------------------- |
| Escenario crudo                       | Investigador sube dataset con 2 tags en lugar de mínimo 3.           |
| Objetivos de negocio correspondientes | Integridad de datos; calidad del catálogo; motor de recomendaciones. |
| Atributos de calidad relevantes       | Funcionalidad.                                                       |
| Estímulo                              | Carga de activo con validación específica.                           |
| Fuente de estímulo                    | Investigador.                                                        |
| Entorno                               | Operación de carga.                                                  |
| Artefacto                             | Validador de tipo con schema dinámico.                               |
| Respuesta                             | Rechazo o aceptación específica.                                     |
| Medida de la respuesta                | 100% de validación correcta por tipo.                                |
| Preguntas                             | ¿DOI obligatorio? ¿Warnings vs errores?                              |
| Problemas                             | Mantenimiento de validadores; extensibilidad futura.                 |

---

### **EAC-11: APIs REST Estrictamente de Solo Lectura**

| Campo                                 | Contenido                                                  |
| ------------------------------------- | ---------------------------------------------------------- |
| Escenario crudo                       | Socio externo intenta ejecutar DELETE en endpoint público. |
| Objetivos de negocio correspondientes | Seguridad estructural; protección del catálogo.            |
| Atributos de calidad relevantes       | Funcionalidad, Seguridad.                                  |
| Estímulo                              | Método HTTP no permitido.                                  |
| Fuente de estímulo                    | Socio Externo.                                             |
| Entorno                               | Consumo de API REST.                                       |
| Artefacto                             | API Gateway, router HTTP.                                  |
| Respuesta                             | Error 405 Method Not Allowed.                              |
| Medida de la respuesta                | 100% de rechazo != GET.                                    |
| Preguntas                             | ¿HEAD permitido? ¿Logging de IPs?                          |
| Problemas                             | CORS y OPTIONS; separación de APIs públicas e internas.    |

---

### **EAC-12: Filtrado Automático de Visibilidad por Rol**

| Campo                                 | Contenido                                                     |
| ------------------------------------- | ------------------------------------------------------------- |
| Escenario crudo                       | Usuario general intenta acceder por URL a documento interno.  |
| Objetivos de negocio correspondientes | Confidencialidad; cumplimiento de políticas.                  |
| Atributos de calidad relevantes       | Funcionalidad, Seguridad.                                     |
| Estímulo                              | Acceso directo por URL.                                       |
| Fuente de estímulo                    | Usuario General.                                              |
| Entorno                               | Navegación directa.                                           |
| Artefacto                             | Middleware de autorización.                                   |
| Respuesta                             | Error 403 + registro en audit log.                            |
| Medida de la respuesta                | 100% de bloqueo por rol.                                      |
| Preguntas                             | ¿Bloqueo automático tras N intentos?                          |
| Problemas                             | Impacto en performance; caché de permisos; roles jerárquicos. |

---

## MANTENIBILIDAD

### **EAC-13: Extensibilidad de Tipos de Activos sin Modificar Core**

| Campo                                 | Contenido                                                     |
| ------------------------------------- | ------------------------------------------------------------- |
| Escenario crudo                       | En 2026 se decide soportar modelos de ML como nuevo tipo.     |
| Objetivos de negocio correspondientes | Futuro-proof; reducción de costos; adaptación.                |
| Atributos de calidad relevantes       | Mantenibilidad, Flexibilidad.                                 |
| Estímulo                              | Requerimiento de nuevo tipo de activo.                        |
| Fuente de estímulo                    | Product Owner / Gerencia.                                     |
| Entorno                               | Mantenimiento evolutivo.                                      |
| Artefacto                             | Framework de metadatos, validador genérico.                   |
| Respuesta                             | Nuevo tipo funcional sin cambios en core.                     |
| Medida de la respuesta                | Solo configuración; cero cambios en código base.              |
| Preguntas                             | ¿Lenguaje de configuración? ¿Soporte de reglas complejas?     |
| Problemas                             | Metamodelo vs performance; retrocompatibilidad; capacitación. |

---

## PORTABILIDAD

### **EAC-14: Portabilidad con Docker sin Cambios Significativos**

| Campo                                 | Contenido                                                       |
| ------------------------------------- | --------------------------------------------------------------- |
| Escenario crudo                       | DevOps despliega en AWS y Azure sin reescribir configuraciones. |
| Objetivos de negocio correspondientes | Reducir time-to-market; evitar vendor lock-in.                  |
| Atributos de calidad relevantes       | Portabilidad, Mantenibilidad.                                   |
| Estímulo                              | Despliegue en nueva nube.                                       |
| Fuente de estímulo                    | Equipo DevOps.                                                  |
| Entorno                               | Pipeline CI/CD.                                                 |
| Artefacto                             | Docker, docker-compose, Helm charts.                            |
| Respuesta                             | Sistema con mismo comportamiento funcional.                     |
| Medida de la respuesta                | Cero cambios de código; solo variables y secrets.               |
| Preguntas                             | ¿Qué es “significativo”? ¿Persistencia por nube?                |
| Problemas                             | Configuración externa; networking; I/O de volúmenes; secrets.   |