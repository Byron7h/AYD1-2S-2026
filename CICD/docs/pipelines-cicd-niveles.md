# Pipelines CI/CD por Niveles

Este documento unifica los pipelines de la demo de clase.

Objetivo de uso en proyecto:

- Nivel 1 es la version que deben implementar en el proyecto base (solo runner GitHub).
- Nivel 2 es la version de despliegue real en la nube (backend + frontend).

## Nivel 1 - Backend solo runner GitHub (version del proyecto)

Descripcion breve:

- Build de imagen Docker del backend.
- Ejecucion de pruebas unitarias.
- Deploy temporal en el runner de GitHub para demostrar el flujo completo.
- No queda publicado en internet al terminar el job.

```yaml
name: Backend CI/CD  # Nombre del workflow

on:
  push:
    branches: [main]  # Se ejecuta cuando hay push a main

jobs:
  build:
    runs-on: ubuntu-latest  # Usa una VM Ubuntu temporal

    steps:
      - name: "📥 Checkout del codigo"
        uses: actions/checkout@v4  # Descarga el repo

      - name: "🟢 Configurar Node.js 22"
        uses: actions/setup-node@v4
        with:
          node-version: 22  # Instala Node 22

      - name: "📦 Instalar dependencias del backend"
        run: |
          cd CICD/backend
          npm ci  # Instala dependencias exactas (más rápido y seguro)

      - name: "🐳 Build de imagen Docker del backend"
        run: docker build -t cicd-demo-backend ./CICD/backend
        # Construye una imagen Docker usando el Dockerfile

  test:
    runs-on: ubuntu-latest
    needs: build  # Solo corre si build fue exitoso

    steps:
      - name: "📥 Checkout del codigo"
        uses: actions/checkout@v4

      - name: "🟢 Configurar Node.js 22"
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: "🧪 Ejecutar pruebas Jest"
        run: |
          cd CICD/backend
          npm install  # Instala dependencias
          npm test     # Ejecuta pruebas

  deploy:
    runs-on: ubuntu-latest
    needs: test  # Solo corre si tests pasan

    steps:
      - name: "📥 Checkout del codigo"
        uses: actions/checkout@v4

      - name: "🟢 Configurar Node.js 22"
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: "🚀 Deploy temporal en runner"
        run: |
          cd CICD/backend
          npm install --omit=dev  # Solo dependencias de producción
          npm start &             # Corre el servidor en segundo plano
          sleep 3                 # Espera que levante
          curl http://localhost:3000/health  # Verifica que responde
          echo "✅ Backend corriendo en el runner"

    # Este deploy NO es real, solo prueba que el backend funciona
```

## Nivel 2 - Despliegue real en la nube

Descripcion general:

- Backend en Cloud Run con imagen en Artifact Registry.
- Frontend en Firebase Hosting.
- Se usa para demostracion avanzada de CI/CD completo en produccion.

### Nivel 2A - Backend en nube (Cloud Run + Artifact Registry)

Descripcion breve:

- Build de imagen Docker.
- Pruebas unitarias.
- Push de imagen a Artifact Registry.
- Deploy en Cloud Run con variables de entorno.

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main]  # Se ejecuta al hacer push a main

jobs:
  build:
    runs-on: ubuntu-latest  # VM temporal Ubuntu

    steps:
      - name: "📥 Checkout del codigo"
        uses: actions/checkout@v4  # Clona el repo

      - name: "🟢 Configurar Node.js 22"
        uses: actions/setup-node@v4
        with:
          node-version: 22  # Instala Node

      - name: "📦 Instalar dependencias"
        run: |
          cd CICD/backend
          npm ci  # Instalación reproducible

      - name: "🐳 Build Docker"
        run: docker build -t cicd-demo-backend ./CICD/backend
        # Construye imagen Docker

  test:
    runs-on: ubuntu-latest
    needs: build  # Depende del build

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: "🧪 Ejecutar pruebas"
        run: |
          cd CICD/backend
          npm install
          npm test

  deploy:
    runs-on: ubuntu-latest
    needs: test  # Solo si tests pasan

    env:
      GCP_REGION: us-central1  # Región en GCP
      AR_REPO: cicd-demo       # Nombre del repositorio

    steps:
      - uses: actions/checkout@v4

      - name: "🔐 Autenticación GCP"
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
          # Usa JSON de Service Account

      - name: "🛠️ Configurar gcloud"
        uses: google-github-actions/setup-gcloud@v2
        # Instala CLI de GCP

      - name: "📦 Crear Artifact Registry"
        run: |
          gcloud artifacts repositories describe "$AR_REPO" \
            --location="$GCP_REGION" \
            --project="${{ secrets.GCP_PROJECT_ID }}" \
          || gcloud artifacts repositories create "$AR_REPO" \
            --repository-format=docker \
            --location="$GCP_REGION" \
            --project="${{ secrets.GCP_PROJECT_ID }}" \
            --description="Docker repository"
        # Si no existe, lo crea

      - name: "🐳 Build y Push"
        run: |
          gcloud auth configure-docker "$GCP_REGION-docker.pkg.dev" --quiet
          IMAGE_URI="$GCP_REGION-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/$AR_REPO/cicd-demo-backend:latest"
          docker build -t "$IMAGE_URI" ./CICD/backend
          docker push "$IMAGE_URI"
        # Construye y sube imagen

      - name: "☁️ Deploy Cloud Run"
        run: |
          IMAGE_URI="$GCP_REGION-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/$AR_REPO/cicd-demo-backend:latest"
          gcloud run deploy cicd-demo-backend \
            --image "$IMAGE_URI" \
            --platform managed \
            --region "$GCP_REGION" \
            --allow-unauthenticated \
            --set-env-vars DATABASE_URL=${{ secrets.DATABASE_URL }},PORT=3000
        # Despliega backend en Cloud Run
```

### Nivel 2B - Frontend en nube (Firebase Hosting)

Descripcion breve:

- Valida variable `VITE_API_URL_PROD`.
- Compila frontend con Vite.
- Publica en Firebase Hosting (canal live).

```yaml
name: Frontend Deploy  # Nombre del workflow

on:
  push:
    branches: [main]  # Se ejecuta al hacer push a main

jobs:
  build-deploy:
    runs-on: ubuntu-latest  # VM temporal

    steps:
      - name: "📥 Checkout del codigo"
        uses: actions/checkout@v4
        # Clona el repositorio

      - name: "🟢 Configurar Node.js 22"
        uses: actions/setup-node@v4
        with:
          node-version: 22
        # Prepara entorno Node

      - name: "🔎 Validar variable VITE_API_URL_PROD"
        run: |
          if [ -z "${{ vars.VITE_API_URL_PROD }}" ]; then
            echo "❌ Falta configurar Repository Variable: VITE_API_URL_PROD"
            exit 1
          fi
        # Verifica que la variable exista

      - name: "🏗️ Build del frontend"
        env:
          VITE_API_URL: ${{ vars.VITE_API_URL_PROD }}
        run: |
          cd CICD/frontend
          npm ci
          npm run build
        # Genera archivos estáticos (dist/)

      - name: "🔥 Deploy a Firebase Hosting"
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.GCP_PROJECT_ID }}
          channelId: live
          entryPoint: CICD/frontend
        # Sube los archivos a Firebase Hosting
```

## Nota de organizacion recomendada

- Mantener este MD como documento de clase (explicacion + referencia).
- Mantener los workflows finales ejecutables en la carpeta `.github/workflows`.
