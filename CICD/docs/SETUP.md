# SETUP de la demo CI/CD

## 1) Correr el proyecto localmente

Variables de entorno:

- Backend: copiar `CICD/backend/.env.example` a `.env` y definir `DATABASE_URL` y `PORT`
- Frontend: copiar `CICD/frontend/.env.example` a `.env` y definir `VITE_API_URL`

Opcion A (comandos npm):

1. Backend:
   - `cd CICD/backend`
   - `npm install`
   - `npm start`
2. Frontend (en otra terminal):
   - `cd CICD/frontend`
   - `npm install`
   - `npm run dev`

Verificacion:

- Abrir `http://localhost:3000/health`
- Debe responder un JSON con `status: "ok"` y `timestamp`

## 2) Nivel 1 - Pipeline basico en el runner

- No requiere configuracion extra de secrets
- Hacer push a `main`
- Revisar ejecucion en GitHub Actions

Comportamiento esperado:

- Se ejecuta Build -> Test -> Deploy
- El backend corre temporalmente dentro del runner
- Al terminar el job, ese backend desaparece (no queda publico en internet)

## 3) Nivel 2 - Deploy real a GCP Cloud Run

Paso a paso:

1. Habilitar APIs en GCP:
   - Cloud Run API
   - Artifact Registry API
   - Cloud Resource Manager API
   - Firebase Management API
   - Firebase Hosting API
2. Crear Service Account con permisos:
   - Cloud Run Admin
   - Artifact Registry Admin
   - Storage Admin
   - Service Account User
3. Descargar el JSON de la key de esa Service Account
4. Agregar secrets en GitHub:
   - `GCP_PROJECT_ID`
   - `GCP_SA_KEY`
   - `DATABASE_URL`
5. En `.github/workflows/backend-ci-cd.yml`:
   - Comentar el bloque Nivel 1 del job `deploy`
   - Descomentar el bloque Nivel 2
6. Hacer push a `main` y validar deploy en Cloud Run

### Explicación Técnica: ¿Dónde se guardan las imágenes Docker? (Para compañeros)

En el Nivel 2, usamos **Artifact Registry (GAR)**, no Docker Hub:

**¿Qué es GAR?**
- Registry privado de Google Cloud Platform
- URL: `REGION-docker.pkg.dev/PROJECT_ID/REPO/nombre-imagen:tag`
- Las imágenes se almacenan en servidores de Google (seguros y rápidos para Cloud Run)

**¿Docker Hub vs GAR?**

| Aspecto | Docker Hub | GAR |
|--------|-----------|-----|
| Proveedor | Docker, público | Google Cloud, privado |
| URL | `docker.io/usuario/imagen` | `us-central1-docker.pkg.dev/proyecto/repo/imagen` |
| Acceso | Público por defecto | Privado (requiere auth GCP) |
| Mejor para | Prototipos, públicos | Producción en Google Cloud |
| Costo | Gratis (límites) | Pago (almacenamiento + transferencia) |

**En nuestro workflow (Nivel 2):**
```bash
docker build -t us-central1-docker.pkg.dev/mi-proyecto/cicd-demo/cicd-demo-backend:latest ./CICD/backend
docker push us-central1-docker.pkg.dev/mi-proyecto/cicd-demo/cicd-demo-backend:latest
```
→ Construye la imagen y la guarda en GAR (privado).
→ Cloud Run la descarga y la ejecuta.

*Nota: Las "Layers" que viste son las capas de la imagen Docker (cada `RUN`, `COPY` en el Dockerfile es una capa).*

---

### Explicación Técnica: Autenticación Git - Device Flow (Para compañeros)

**Tu pregunta:** "¿Por qué me cambió de token hardcodeado a un login automático?"

**Respuesta corta:** Git Credential Manager cambió el flujo de autenticación por seguridad. Ahora usa **Device Flow Auth** en lugar de tokens visibles.

**Comparación:**

| Método | Token en URL | Device Flow (Ahora) |
|--------|-------------|-----------------|
| Cómo funciona | `https://token@github.com/repo` | GitHub abre navegador + pide permisos |
| Seguridad | ⚠️ Token visible en historial | ✅ Token guardado internamente |
| Permisos | Todos incluidos | ✅ Aceptas cada scope que necesitas |
| Gestión | Manual (lo guarda tú) | Automática (lo gestiona GCM) |
| Facilidad | Más pasos iniciales | ✅ Transparente después del login |

**¿Qué pasó en tu caso?**
1. Tenías un PAT antiguo guardado en Git Credential Manager
2. Al intentar push con workflows, GitHub rechazó el token (no tenía scope `workflow`)
3. Git Credential Manager olvidó el token viejo (o lo borraste)
4. Al hacer `git push` de nuevo, GCM inició Device Flow: te pidió código de autorización
5. Autenticaste en GitHub y aceptaste permisos (incluyendo `workflow`)
6. ✅ Ahora Git tiene un token fresco con todos los permisos

**Ventajas:**
- 🔒 Más seguro: no ves ni escribes el token
- 📋 Transparente: GitHub te muestra qué permisos das
- 🔄 Automático: GCM lo renueva si vence

**Para explicar a compañeros:**
"No cambiamos a tokens manualmente. Git usa Device Flow Auth: es un flujo de OAuth 2.0 que es más seguro. En lugar de copiar/pegar tokens, autenticamos en el navegador y GitHub nos da un token seguro. Git lo gestiona automáticamente detrás de cámaras."

---

## 4) Deploy del frontend en Firebase Hosting

1. Crear proyecto en Firebase Console (o usar el mismo proyecto de GCP)
2. Habilitar Firebase Hosting
3. Crear Service Account con permisos de Firebase Hosting
4. Agregar secrets en GitHub:
   - `FIREBASE_SERVICE_ACCOUNT`
   - `GCP_PROJECT_ID`
5. Agregar Repository Variable en GitHub:
   - `VITE_API_URL_PROD` = URL publica de Cloud Run
6. Hacer push a `main`

## 5) Demo en vivo - instrucciones exactas

CAMBIO A REALIZAR:
  Archivo : CICD/frontend/src/LoginPage.jsx
  Buscar  : backgroundColor: '#2563EB'
  Cambiar : backgroundColor: '#16A34A'
  (azul -> verde)

  O tambien cambiar el titulo:
  Buscar  : "CI/CD Demo"
  Cambiar : "CI/CD Demo v2.0"

COMANDOS:
  git add .
  git commit -m "feat: cambio visual para demo CI/CD"
  git push origin main

VER EL PIPELINE:
  https://github.com/TU_USUARIO/TU_REPO/actions

### Demo opcional: forzar falla de pruebas unitarias (backend)

Objetivo: mostrar que un cambio "pequeño" en backend puede romper tests y frenar el pipeline antes del deploy.

CAMBIO A REALIZAR (intencional):
   Archivo : CICD/backend/src/app.js
   Buscar  : `return res.status(401).json({`
   Cambiar : `return res.status(200).json({`
   (dentro del bloque `if (!user)` en el endpoint `/login`)

Qué test rompe:
   Archivo : CICD/backend/tests/app.test.js
   Caso    : `POST /login con credenciales incorrectas retorna 401`

COMANDOS PARA DEMO DE FALLA:
   git add CICD/backend/src/app.js
   git commit -m "demo: cambio intencional para romper unit tests"
   git push origin main

Resultado esperado:
   - Job de tests falla en GitHub Actions
   - El deploy no se ejecuta (por `needs: test`)

REVERTIR DESPUES DE LA DEMO:
   Archivo : CICD/backend/src/app.js
   Restaurar: `return res.status(401).json({`

COMANDOS PARA CORREGIR:
   git add CICD/backend/src/app.js
   git commit -m "fix: restaurar status 401 en login incorrecto"
   git push origin main
