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
- Requerimientos funcionales (RF): [Requerimientos/RFs-requerimientos-funcionales](Requerimientos/RFs-requerimientos-funcionales)
- Requerimientos de restriccion (RR): [Requerimientos/RRs-requerimientos-restriccion](Requerimientos/RRs-requerimientos-restriccion)
- Requerimientos de calidad (EAC): [Requerimientos/EACs-requerimientos-calidad](Requerimientos/EACs-requerimientos-calidad)


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