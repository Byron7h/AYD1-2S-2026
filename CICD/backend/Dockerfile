# Imagen base solicitada para la demo.
FROM node:22-alpine

WORKDIR /app

# Se copia package.json para instalar dependencias de produccion.
COPY package*.json ./
RUN npm install --omit=dev

# Se copia el codigo fuente del backend.
COPY src ./src

# Se crea usuario no root para ejecutar el proceso.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
