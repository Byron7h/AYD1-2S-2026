# Etapa 1: build de React/Vite
# Esta imagen trae Node para instalar dependencias y compilar.
FROM node:20-alpine AS builder

# Directorio de trabajo dentro del contenedor.
# Equivale a hacer "cd /app" para instrucciones siguientes.
WORKDIR /app

# Copiamos solo archivos de dependencias para cache eficiente.
COPY package*.json ./
# Instalacion limpia reproducible basada en package-lock.json.
RUN npm ci

# Ahora copiamos el resto del proyecto.
COPY . .
# Vite genera archivos estaticos optimizados en /app/dist.
RUN npm run build

# Etapa 2: runtime con Nginx
# Segunda etapa sin Node: mas liviana y segura para produccion.
FROM nginx:alpine AS production

# Traemos solo el build final desde la etapa builder.
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazamos config por defecto para exponer frontend
# y proxyear /api al servicio backend.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto HTTP de Nginx
EXPOSE 80

# Nginx en foreground para mantener vivo el contenedor
CMD ["nginx", "-g", "daemon off;"]
