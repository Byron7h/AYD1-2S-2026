# Aplicacion de ejemplo con Docker

Esta carpeta contiene una aplicacion sencilla de pedidos con backend y frontend para estudiar Docker, sus componentes y su uso en un proyecto real.

La aplicacion permite consultar productos, crear ordenes y procesar pagos mediante distintos medios.

## Contenido de Docker

Docker permite construir y ejecutar la aplicacion con un entorno reproducible, evitando diferencias entre maquinas de desarrollo.

Material de referencia:

- [Guia de Docker](GUIA_DOCKER.md): conceptos, Dockerfiles, imagenes, contenedores, Compose y comandos.
- [Docker Compose](docker-compose.yml): orquesta los servicios backend y frontend.
- [Dockerfile multi-stage del backend](backend/Dockerfile): construye una imagen optimizada para produccion.
- [Dockerfile single-stage del backend](backend/Dockerfile.single): muestra una alternativa mas simple para aprendizaje y comparacion.
- [Dockerfile del frontend](frontend/Dockerfile): construye y sirve el frontend con Nginx.
- [`.dockerignore` del backend](backend/.dockerignore) y [`.dockerignore` del frontend](frontend/.dockerignore): excluyen archivos del contexto de construccion.

## Ejecucion local

Requiere Node.js, npm y una base de datos accesible mediante `DATABASE_URL`.

```bash
copy .env.example .env
```

Completa `DATABASE_URL` en `.env` y ejecuta el backend y el frontend en terminales separadas:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Las notificaciones por email estan simuladas directamente en el backend. No se
realiza ninguna conexion SMTP ni se requiere configurar un proveedor de correo.

## Ejecucion con Docker Compose

Desde esta carpeta:

```bash
copy .env.example .env
docker compose up --build
```

Completa `DATABASE_URL` en `.env` antes de iniciar los servicios.

Servicios disponibles:

- Backend: [http://localhost:3000/health](http://localhost:3000/health)
- Frontend: [http://localhost:5173](http://localhost:5173)

Para detener los servicios:

```bash
docker compose down
```

## Endpoints principales

| Metodo | Endpoint | Uso |
|---|---|---|
| GET | `/health` | Verificar que el backend esta activo |
| GET | `/products` | Listar productos |
| POST | `/products` | Crear producto |
| GET | `/orders` | Listar ordenes con filtros opcionales |
| POST | `/orders` | Crear orden |
| POST | `/orders/:orderId/payment` | Procesar el pago de una orden |

## Video de apoyo

- [Video de ejemplo sobre Docker](https://drive.google.com/drive/folders/1avflzeWsLA2qTuLtxIK5o2xP_fH-otT3?usp=sharing)

Desglose del contenido del video:

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
