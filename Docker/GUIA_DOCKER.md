# Guia Docker para Estudiantes

## 1) El problema que resuelve Docker

Sin Docker, cada equipo puede tener versiones distintas de Node, PostgreSQL, sistema operativo o puertos.
Resultado: "en mi maquina funciona".

Docker resuelve eso empaquetando la aplicacion con su entorno para que corra igual en desarrollo, QA y produccion.

## 2) Conceptos base

- Docker Image: plantilla inmutable con sistema base, runtime, dependencias y codigo.
- Docker Container: instancia en ejecucion de una imagen.
- Dockerfile: receta para construir una imagen.
- Docker Compose: archivo YAML para levantar varios contenedores juntos.
- Registry: repositorio de imagenes, por ejemplo Docker Hub o GHCR.

Analogia rapida:
Image : Container = Clase : Objeto

## 3) Componentes de Docker (que es cada uno)

- Docker Client: la CLI `docker` que ejecutas en terminal.
- Docker Engine: el motor que construye imagenes y ejecuta contenedores.
- Docker Daemon (`dockerd`): proceso en background que recibe ordenes del client.
- Docker Host: la maquina donde corre Docker Engine.
- Docker Server: termino comun para el daemon/host que atiende peticiones.
- Docker Registry: servicio remoto para almacenar y distribuir imagenes.

Flujo mental:
Client -> Daemon/Engine -> Image -> Container -> Registry

## 4) Docker vs Maquina Virtual

- VM: incluye sistema operativo completo por instancia.
- Docker: comparte kernel del host y aisla procesos.

Comparacion practica:

- Arranque: VM minutos, contenedor segundos.
- Tamano: VM normalmente GB, contenedor normalmente MB.
- Uso tipico: VM para aislamiento total de OS, Docker para despliegue rapido y portable.

## 5) Dockerfile explicado

### 5.1 Que es un Dockerfile

Un Dockerfile es un archivo de instrucciones para construir una imagen paso a paso.

### 5.2 Instrucciones mas usadas

- FROM: imagen base.
- WORKDIR: directorio de trabajo.
- COPY: copia archivos del host al contenedor.
- ADD: parecido a COPY, puede descomprimir `tar`.
- RUN: ejecuta comandos durante el build.
- CMD: comando por defecto cuando inicia el contenedor.
- ENTRYPOINT: comando fijo principal.
- EXPOSE: documenta puerto de la app.
- ENV: variable disponible en runtime.
- ARG: variable solo disponible durante build.
- USER: usuario para ejecutar procesos.
- VOLUME: punto de montaje para persistencia.

### 5.3 Ejemplo literal: Dockerfile single-stage

Archivo real: [backend/Dockerfile.single](backend/Dockerfile.single)

```Dockerfile
# Demo simple: una sola etapa.
FROM node:20-alpine
WORKDIR /app

# Dependencias primero para aprovechar cache.
COPY package*.json tsconfig.json ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate

# Luego codigo de la app.
COPY src ./src
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
```

### 5.4 Ejemplo literal: Dockerfile multi-stage

Archivo real: [backend/Dockerfile](backend/Dockerfile)

```Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate
COPY src ./src
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 6) Single-stage vs Multi-stage

- Single-stage: mas simple de entender, normalmente imagen mas grande, util para demo inicial.
- Multi-stage: imagen final mas pequena, reduce superficie de ataque, recomendado para produccion.

Demo de comparacion:

```bash
cd backend
docker build -t backend:single -f Dockerfile.single .
docker build -t backend:multi -f Dockerfile .
docker images | findstr solid-backend
```

## 7) .dockerignore

Archivos reales:

- [/backend/.dockerignore](backend/.dockerignore)
- [/frontend/.dockerignore](frontend/.dockerignore)

Que hace:

- reduce contexto de build,
- acelera build,
- evita subir secretos al daemon,
- mejora cache de capas.

Ejemplo tipico:

```dockerignore
node_modules
dist
.env
.git
```

## 8) Comandos basicos de Docker (completos)

### 8.1 Informacion general

```bash
docker --version
docker info
docker help
```

### 8.2 Imagenes

```bash
docker images
docker pull node:20-alpine
docker image inspect node:20-alpine
docker build -t task-api:1.0.0 .
docker build -t task-api:1.0.0 -t task-api:latest .
docker rmi task-api:1.0.0
docker image prune
```

### 8.3 Contenedores

```bash
docker ps
docker ps -a
docker run nginx:alpine
docker run -it nginx:alpine sh
docker run -d --name web -p 8080:80 nginx:alpine
docker stop web
docker start web
docker restart web
docker rm web
docker exec -it web sh
docker logs web
docker logs -f web
docker stats
docker inspect web
```

### 8.4 Redes y volumenes

```bash
docker network ls
docker volume ls
docker volume create db-data
docker run -v db-data:/data alpine
```

### 8.5 docker run con opciones clave

```bash
docker run -d --name solid-backend \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  solid-backend:multi
```

Significado:

- `-d`: background.
- `--name`: nombre del contenedor.
- `-p`: mapeo de puertos host:container.
- `--env-file`: variables.
- `--restart`: politica de reinicio.

## 9) Docker Compose en este proyecto

Archivo: [docker-compose.yml](docker-compose.yml)

Que levanta:

- backend en `localhost:3000`,
- frontend en `localhost:5173`,
- red interna `solid-network`.

Relacion importante para entender diagramas:

- `docker-compose.yml` define servicios.
- cada servicio se construye desde un Dockerfile o usa una imagen.
- al ejecutar compose, cada servicio crea un contenedor.

Comandos:

```bash
docker compose up --build
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose down
docker compose down -v
```

## 10) Registry (Docker Hub y GHCR)

- Docker Hub: publico/privado, comun en demos.
- GHCR: integrado con GitHub Actions.

Docker Hub:

```bash
docker login
docker tag solid-backend:multi TU_USUARIO/solid-backend:1.0.0
docker push TU_USUARIO/solid-backend:1.0.0
docker pull TU_USUARIO/solid-backend:1.0.0
```

GHCR:

```bash
docker login ghcr.io -u TU_USUARIO
docker tag solid-backend:multi ghcr.io/TU_ORG/solid-backend:1.0.0
docker push ghcr.io/TU_ORG/solid-backend:1.0.0
```

## 11) Cuidado con esto (errores frecuentes)

- Si Docker Desktop no esta abierto, comandos docker fallan.
- Si `DATABASE_URL` no esta definida, Prisma falla.
- Dentro de contenedor, `localhost` apunta al mismo contenedor.
- En Compose, frontend debe ir a `backend:3000` dentro de la red Docker.
- Si puertos 3000 o 5173 estan ocupados, compose no levanta.
- Nunca subir `.env` al repositorio.

## 12) Laboratorio paso a paso (demo completa)

1. Abrir Docker Desktop y esperar "Engine running".
1. Ir a la carpeta `Docker` del repositorio.
1. Crear `.env` con `DATABASE_URL`.
1. Ejecutar:

```bash
docker compose up --build
```

1. Validar:

- [Health backend](http://localhost:3000/health)
- [Frontend](http://localhost:5173)

1. Finalizar:

```bash
docker compose down
```
