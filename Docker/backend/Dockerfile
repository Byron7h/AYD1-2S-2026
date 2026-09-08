# Etapa 1: builder --------------------------------------------------

# Aqui se instala todo (incluyendo herramientas de build)
# y se compila TypeScript a JavaScript.
FROM node:20-alpine AS builder

# Prisma requiere OpenSSL en Alpine para generar/usar su engine.
RUN apk add --no-cache openssl

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos manifiestos primero para aprovechar cache de dependencias
COPY package*.json tsconfig.json ./

# Prisma schema necesario para generar cliente
COPY prisma ./prisma/

# Instalamos dependencias y generamos cliente Prisma
RUN npm ci && npx prisma generate

# Copiamos codigo fuente y compilamos
COPY src ./src
RUN npm run build

# Quitamos dependencias de desarrollo para reutilizar node_modules en runtime.
RUN npm prune --omit=dev

# Etapa 2: runtime final --------------------------------------------------

# Solo se copia lo necesario para ejecutar la app.
FROM node:20-alpine AS production

# Prisma requiere OpenSSL tambien en runtime.
RUN apk add --no-cache openssl
WORKDIR /app

# Manifest para trazabilidad de imagen final
COPY package*.json ./

# Copiamos artefactos minimos desde builder
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/

# Puerto que expone la API
EXPOSE 3000

# Comando de inicio del contenedor
CMD ["node", "dist/index.js"]
