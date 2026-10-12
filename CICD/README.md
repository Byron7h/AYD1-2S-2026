# Demo CI/CD para Clase (Backend + Frontend)

Este directorio contiene un ejemplo completo para explicar DevOps y CI/CD con GitHub Actions en dos niveles: una version base en runner y una opcion de despliegue real en nube.

## Que es DevOps, CI/CD, pipeline y workflow

- DevOps: forma de trabajo que integra desarrollo y operaciones para entregar software mas rapido, con calidad y de forma repetible.
- CI/CD: practica de automatizar la integracion, pruebas y despliegue para reducir errores manuales y acelerar entregas.
- Pipeline: secuencia de etapas automatizadas (por ejemplo Build -> Test -> Deploy).
- Workflow: archivo YAML de GitHub Actions que define uno o varios jobs de un pipeline.

Resumen corto:

- CI (Continuous Integration): cada cambio de codigo se valida automaticamente.
- CD (Continuous Delivery/Deployment): si todo pasa, el cambio se puede publicar o se publica automaticamente.

## Estructura basica de un workflow YAML

| Parte | Que significa |
|---|---|
| `name` | Nombre visible en la pestaña Actions |
| `on` | Evento que dispara el workflow (`push`, `pull_request`, etc.) |
| `jobs` | Bloques principales del pipeline (build, test, deploy) |
| `runs-on` | Runner donde se ejecuta el job |
| `needs` | Dependencia entre jobs (control de orden) |
| `steps` | Pasos del job |
| `uses` | Reutiliza una action existente |
| `run` | Ejecuta comandos shell |
| `env` | Variables de entorno del job o step |

## Que incluye este ejemplo

- Backend simple con login, pruebas unitarias con Jest y Dockerfile.
- Frontend simple con pantalla de login y Dockerfile.
- Archivo [docker-compose.yml](docker-compose.yml) para correr el ejemplo local con ambos servicios.
- Workflows de GitHub Actions para pipeline base y opcion de nube.

## Estandar de ubicacion de workflows

GitHub Actions busca workflows en la ruta estandar:

- [.github/workflows](../.github/workflows)

En este proyecto:

- [.github/workflows/backend-ci-cd.yml](../.github/workflows/backend-ci-cd.yml)

Todo pipeline que quieran ejecutar en GitHub debe estar en esa carpeta y con un trigger valido (`on: push`, `on: pull_request`, etc.).

Estado actual del repositorio:

- El workflow activo en `.github/workflows` es backend Nivel 1 (runner GitHub), que es el que deben usar para su proyecto.
- Las versiones de nube (Nivel 2) estan documentadas en [docs/pipelines-cicd-niveles.md](docs/pipelines-cicd-niveles.md).

## Niveles del proyecto

### Nivel 1 (el que deben hacer en su proyecto)

Pipeline base en runner GitHub:

- Build: construye la imagen Docker del backend.
- Test: ejecuta pruebas unitarias (Jest).
- Deploy: levanta temporalmente el backend en el runner para comprobar que funciona.

Nota: este deploy es demostrativo y no queda publicado en internet.

Referencia directa del YAML de ambos niveles:

- [docs/pipelines-cicd-niveles.md](docs/pipelines-cicd-niveles.md)

### Nivel 2 (opcion de nube)

Despliegue real:

- Backend: Cloud Run + Artifact Registry.
- Frontend: Firebase Hosting.

Para esta parte, usar guia completa en [docs/GCP_SETUP.md](docs/GCP_SETUP.md).

## Flujo del pipeline (Build, Test, Deploy)

```text
Push a main
  |
  +--> Backend workflow
  |      1) Build  -> Docker image
  |      2) Test   -> Jest
  |      3) Deploy -> Runner temporal (Nivel 1) o Cloud Run (Nivel 2)
```

## Como probar el primer pipeline (Nivel 1)

1. Copiar el pipeline Nivel 1 de [docs/pipelines-cicd-niveles.md](docs/pipelines-cicd-niveles.md) al archivo [.github/workflows/backend-ci-cd.yml](../.github/workflows/backend-ci-cd.yml).
2. Guardar cambios y hacer push a `main`.
3. Revisar ejecucion en GitHub Actions.

Si aparece error de permisos al pushear workflows:

1. Volver a iniciar sesion de GitHub en VS Code/terminal.
2. Aceptar permisos incluyendo `workflow`.
3. Reintentar `git push`.

Resultado esperado de Nivel 1:

- Build pasa.
- Test pasa.
- Deploy temporal en runner pasa.

## Cambio de demostracion importante (falla en test)

Objetivo: mostrar que si falla Test, el Deploy no se ejecuta.

Cambio intencional:

- Archivo: `CICD/backend/src/app.js`
- En `if (!user)` del endpoint `/login`, cambiar:
  - de `return res.status(401).json({`
  - a `return res.status(200).json({`

Comandos de demo:

- `git add CICD/backend/src/app.js`
- `git commit -m "demo: cambio intencional para romper unit tests"`
- `git push origin main`

Resultado esperado:

- Falla el job de test.
- El deploy no corre por la dependencia `needs: test`.

## Documentos de apoyo

- Guia general de setup: [docs/SETUP.md](docs/SETUP.md)
- Setup completo de nube (Nivel 2): [docs/GCP_SETUP.md](docs/GCP_SETUP.md)
- Pipelines listos por nivel (comentados): [docs/pipelines-cicd-niveles.md](docs/pipelines-cicd-niveles.md)

## Estructura resumida de la carpeta

```text
CICD/
|-- backend/
|   |-- Dockerfile
|   |-- src/
|   |-- tests/
|-- frontend/
|   |-- Dockerfile
|   |-- src/
|-- docker-compose.yml
|-- docs/
|   |-- SETUP.md                  # Guia rapida y demo de clase
|   |-- GCP_SETUP.md              # Paso a paso para despliegue en nube
|   |-- pipelines-cicd-niveles.md # YAMLs por nivel (runner y nube)

.github/
|-- workflows/
|   |-- backend-ci-cd.yml         # Workflow activo actual (Nivel 1)
```
