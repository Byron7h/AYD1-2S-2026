# GCP Setup - Nivel 2 (Deploy a Cloud Run)

## Objetivo
Configurar Google Cloud Platform y Firebase para hacer deploy automático:
- Backend a Cloud Run (imagen en Artifact Registry)
- Frontend a Firebase Hosting (canal `live`)

---

## Paso 1: Crear un proyecto en GCP

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el **selector de proyecto** (arriba a la izquierda)
3. Haz clic en **"NEW PROJECT"**
4. Completa:
   - **Project name**: `ayd1-cicd-demo` (o el nombre que prefieras)
   - **Organization**: (deja en blanco si no tienes)
5. Haz clic en **"CREATE"**
6. Espera a que se cree (1-2 min)
7. El nuevo proyecto debería aparecer en el selector

**Copiar y guardar tu `PROJECT_ID`:**
- En el selector de proyecto, aparece como: `ayd1-cicd-demo` o similar
- Apunta ese ID: lo necesitarás en GitHub

---

## Paso 2: Habilitar APIs necesarias

1. Ve a [APIs & Services](https://console.cloud.google.com/apis/dashboard)
2. Haz clic en **"ENABLE APIS AND SERVICES"** (botón azul)
3. Busca **`Cloud Run API`**:
   - Haz clic en el resultado
   - Haz clic en **"ENABLE"**
   - Espera a que se habilite (1-2 min)
4. Vuelve a buscar (**ENABLE APIS AND SERVICES** otra vez)
5. Busca **`Artifact Registry API`**:
   - Haz clic en el resultado
   - Haz clic en **"ENABLE"**
   - Espera a que se habilite
6. Busca **`Cloud Resource Manager API`** y habilitala
7. Busca **`Firebase Management API`** y habilitala
8. Busca **`Firebase Hosting API`** y habilitala
9. Busca **`Cloud Run API`** y habilitala

**Verificación:**
- Ve a [APIs & Services -> Enabled APIs](https://console.cloud.google.com/apis/dashboard)
- Deberías ver estas APIs listadas:
   - ✅ Cloud Run API
   - ✅ Artifact Registry API
   - ✅ Cloud Resource Manager API
   - ✅ Firebase Management API
   - ✅ Firebase Hosting API

### Paso 2.1: Vincular el proyecto en Firebase Console

Aunque el proyecto exista en GCP, Firebase Hosting requiere que el proyecto este dado de alta en Firebase.

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **"Add project"**
3. Selecciona **"Use an existing Google Cloud project"**
4. Elige tu proyecto (`GCP_PROJECT_ID`)
5. Completa el asistente y finaliza

Sin este paso, el workflow del frontend puede fallar con `404 Requested entity was not found` al consultar Firebase Project.

### Paso 2.2: Avisos importantes al vincular Firebase con GCP

Cuando agregas Firebase a un proyecto existente de Google Cloud, aplican estas reglas:

1. La vinculacion no se revierte automaticamente (aunque puedes deshabilitar servicios de Firebase manualmente).
2. La facturacion es compartida entre GCP y Firebase.
3. Si el proyecto GCP tiene billing activo, Firebase queda en plan Blaze (pago por uso).
4. Los roles IAM se comparten: quien tenga permisos en GCP tendra alcance equivalente en Firebase.
5. Si eliminas el proyecto de Firebase, eliminas tambien el proyecto de GCP y sus recursos.
6. Cambios en recursos/datos dentro de Firebase impactan el mismo proyecto de GCP.

### Paso 2.3: Uso seguro con creditos de prueba (recomendado)

Si usas creditos gratuitos, es seguro siempre que pongas controles de costo:

1. Crear un presupuesto en Billing (Budget + alertas al 50%, 80% y 100%).
2. Configurar alerta por email para el owner del proyecto.
3. Usar un proyecto dedicado de clase/demo (no mezclar con proyectos personales).
4. Evitar servicios no necesarios durante la practica (solo Cloud Run, Artifact Registry, Firebase Hosting).
5. Al terminar la clase, eliminar recursos de prueba o apagar servicios para evitar consumo.
6. Opcional: poner limites de concurrencia/min instances en Cloud Run para controlar gasto.

---

## Paso 3: Crear Service Accounts

Necesitamos **2 Service Accounts**:
- Una para **backend deploy** (Cloud Run + Artifact Registry)
- Una para **frontend deploy** (Firebase Hosting)

### 3A: Service Account para Backend (github-cicd-deploy)

1. Ve a [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Haz clic en **"CREATE SERVICE ACCOUNT"**
3. Completa:
   - **Service account name**: `github-cicd-deploy`
   - **Service account ID**: auto-generado (no tocar)
   - **Description**: `Para deploys automáticos del backend desde GitHub Actions`
4. Haz clic en **"CREATE AND CONTINUE"**

En la siguiente pantalla ("Grant this service account access to project"):

1. En el campo **"Select a role"**, busca y selecciona **todos estos roles**:
   - **Cloud Run Admin** (para deployer a Cloud Run)
   - **Artifact Registry Admin** (para crear repo y subir imágenes)
   - **Storage Admin** (para acceder a almacenamiento)
   - **Service Account User** (para usar la Service Account)

2. Haz clic en **"CONTINUE"**
3. Haz clic en **"DONE"**

### 3B: Service Account para Firebase (firebase-deploy)

1. Ve a [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) nuevamente
2. Haz clic en **"CREATE SERVICE ACCOUNT"**
3. Completa:
   - **Service account name**: `firebase-deploy`
   - **Service account ID**: auto-generado (no tocar)
   - **Description**: `Para deploys automáticos del frontend a Firebase Hosting`
4. Haz clic en **"CREATE AND CONTINUE"**

En la siguiente pantalla:

1. En el campo **"Select a role"**, busca y selecciona:
   - **Firebase Hosting Admin** (para deployer a Firebase)
   - **Service Account User**

2. Haz clic en **"CONTINUE"**
3. Haz clic en **"DONE"**

---

## Paso 4: Descargar las claves JSON

Necesitamos descargar **2 JSONs** (uno por cada Service Account).

### 4A: JSON de github-cicd-deploy (Backend)

1. Ve a [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Haz clic en **`github-cicd-deploy`**
3. En la pestaña **"KEYS"**, haz clic en **"ADD KEY"** → **"Create new key"**
4. Elige **"JSON"** y haz clic en **"CREATE"**
5. **Se descargará automáticamente** un archivo JSON
   - Nombre algo como: `github-cicd-deploy-xxxxx.json`
6. **Renómbralo** a `backend-key.json` para no confundirlo
7. **Guarda este archivo en un lugar seguro**

### 4B: JSON de firebase-deploy (Frontend)

1. Ve a [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) nuevamente
2. Haz clic en **`firebase-deploy`**
3. En la pestaña **"KEYS"**, haz clic en **"ADD KEY"** → **"Create new key"**
4. Elige **"JSON"** y haz clic en **"CREATE"**
5. **Se descargará automáticamente** un archivo JSON
   - Nombre algo como: `firebase-deploy-xxxxx.json`
6. **Renómbralo** a `firebase-key.json` para no confundirlo
7. **Guarda este archivo en un lugar seguro**

**⚠️ IMPORTANTE:** Estos JSONs contienen credenciales privadas. **NUNCA los subes a Git.**

---

## Paso 5: Agregar secrets en GitHub

1. Ve a tu repositorio en GitHub: `https://github.com/Byron7h/AYD1-2026`
2. Haz clic en **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **"New repository secret"** (botón verde)

### Secrets para Backend

#### Secret 1: `GCP_PROJECT_ID`
- **Name**: `GCP_PROJECT_ID`
- **Secret**: tu ID de proyecto (del Paso 1, ej: `ayd1-cicd-demo`)
- Haz clic en **"Add secret"**

#### Secret 2: `GCP_SA_KEY` (Backend)
- **Name**: `GCP_SA_KEY`
- **Secret**: contenido **completo** del JSON `backend-key.json` (descargado en Paso 4A)
  - Abre el archivo JSON con un editor de texto
  - Copia **TODO** el contenido (incluyendo `{` y `}`)
  - Pégalo en el campo **Secret**
- Haz clic en **"Add secret"**

#### Secret 3: `DATABASE_URL`
- **Name**: `DATABASE_URL`
- **Secret**: tu string de conexión a Neon
  - Ej: `postgresql://user:password@ep-xxxx.us-east-1.neon.tech/dbname`
- Haz clic en **"Add secret"**

### Secrets para Frontend

#### Secret 4: `FIREBASE_SERVICE_ACCOUNT`
- **Name**: `FIREBASE_SERVICE_ACCOUNT`
- **Secret**: contenido **completo** del JSON `firebase-key.json` (descargado en Paso 4B)
  - Abre el archivo JSON con un editor de texto
  - Copia **TODO** el contenido (incluyendo `{` y `}`)
  - Pégalo en el campo **Secret**
- Haz clic en **"Add secret"**

**Verificación:**
- En GitHub, bajo **Secrets**, deberías ver:
  - ✅ `GCP_PROJECT_ID`
  - ✅ `GCP_SA_KEY`
  - ✅ `DATABASE_URL`
  - ✅ `FIREBASE_SERVICE_ACCOUNT`

---

## Paso 6: Verificar workflows activos en el repo

El repo ya quedo configurado con workflows activos:

1. Backend workflow:
   - Usa Artifact Registry (`us-central1-docker.pkg.dev`)
   - Crea el repositorio Docker si no existe
   - Despliega a Cloud Run
2. Frontend workflow:
   - Build con `npm ci`
   - Deploy a Firebase Hosting con `channelId: live`
   - Toma `VITE_API_URL` desde la variable `VITE_API_URL_PROD`

Archivo de referencia:
- `.github/workflows/backend-ci-cd.yml`
- `.github/workflows/frontend-deploy.yml`

---

## Paso 7: Hacer el primer push del Nivel 2

1. En tu terminal (dentro de `AYD1-2026`):
   ```bash
   git add .github/workflows/backend-ci-cd.yml .github/workflows/frontend-deploy.yml
   git commit -m "feat: configurar deploy backend+frontend en produccion"
   git push origin main
   ```

2. Ve a GitHub Actions: `https://github.com/Byron7h/AYD1-2026/actions`
3. Verifica que el workflow se ejecute:
   - ✅ **Build** (debería pasar)
   - ✅ **Test** (debería pasar)
   - ✅ **Deploy** (nuevo job que hace push a Artifact Registry y deploy a Cloud Run)

---

## Paso 9: Verificar que ambos workflows hayan corrido

Después de hacer push (Paso 7):

1. Ve a [GitHub Actions](https://github.com/Byron7h/AYD1-2026/actions)
2. Deberías ver **2 workflows** ejecutándose:
   - ✅ **Backend CI/CD** (build → test → deploy a Cloud Run)
   - ✅ **Frontend Deploy** (build → deploy a Firebase Hosting)

3. Espera a que ambos terminen (verde ✅)

---

## Paso 10: Verificar el deploy en Cloud Run

1. Ve a [Cloud Run](https://console.cloud.google.com/run)
2. Deberías ver un servicio llamado `cicd-demo-backend`
3. Haz clic en él
4. Bajo **"Service details"**, busca la URL:
   - Algo como: `https://cicd-demo-backend-xxxxx-uc.a.run.app`
5. **Abre esa URL en el navegador** y agrega `/health`:
   - `https://cicd-demo-backend-xxxxx-uc.a.run.app/health`
6. Deberías ver: `{"status":"ok","timestamp":1234567890}`

✅ **Backend en producción funcionando**

---

## Paso 11: Verificar el deploy en Firebase Hosting

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto (si tienes varios)
3. En el menú izquierdo, ve a **Hosting**
4. Deberías ver un sitio llamado algo como `ayd1-cicd-demo`
5. Haz clic en él para ver la URL pública
   - Algo como: `https://ayd1-cicd-demo.web.app`
6. **Abre esa URL en el navegador**
7. Deberías ver la pantalla de login del frontend

✅ **Frontend en producción funcionando**

---

## Paso 12: Conectar Frontend ↔ Backend en Producción

1. Ve a GitHub: **Settings -> Secrets and variables -> Actions -> Variables**
2. Crea (o actualiza) la variable:
   - Nombre: `VITE_API_URL_PROD`
   - Valor: URL pública de Cloud Run (ejemplo: `https://cicd-demo-backend-xxxxx-uc.a.run.app`)
3. Haz un push para relanzar workflow:
   ```bash
   git commit --allow-empty -m "chore: relanzar frontend con VITE_API_URL_PROD"
   git push origin main
   ```
4. Espera a que termine `Frontend Deploy`
5. Abre el sitio de Firebase Hosting y prueba el login contra backend

✅ **Flujo completo funcionando en producción**

---

## Troubleshooting

### ❌ Error: "refusing to allow an OAuth App to create or update workflow"
- Ver [SETUP.md - Problema común](./SETUP.md#problema-comun-git-push-rechazado-por-workflows-token-sin-workflow)

### ❌ Error backend: `createOnPush permission` o push de imagen denegado
- El workflow ahora usa Artifact Registry (`*.pkg.dev`) y crea el repo automaticamente.
- Verifica que la Service Account backend tenga **Artifact Registry Admin** + **Cloud Run Admin** + **Service Account User**.

### ❌ Error frontend: `Firebase Hosting API ... disabled`
- Habilita `firebasehosting.googleapis.com` en el proyecto.
- Espera 2-5 minutos y relanza el workflow.

### ❌ Error frontend: `Requested entity was not found` en Firebase project
- Vincula el proyecto GCP en Firebase Console (Paso 2.1).
- Asegura que `GCP_PROJECT_ID` en GitHub Secrets sea exactamente ese project ID.

### ❌ Error frontend: `channelID is currently required`
- En `.github/workflows/frontend-deploy.yml` usa `channelId: live`.
- Verifica que el workflow tenga esa propiedad en el step de `FirebaseExtended/action-hosting-deploy@v0`.

### ❌ Error: "Cloud Run API not enabled"
- Vuelve al Paso 2 y habilita **Cloud Run API**

### ❌ El servicio en Cloud Run falla con "Connection refused"
- Verifica que `DATABASE_URL` esté configurado correctamente en GitHub Secrets
- Verifica que la BD Neon esté accesible desde internet (sin restricciones IP)

### ❌ El frontend no conecta al backend
- Verifica que la variable `VITE_API_URL_PROD` en GitHub tenga la URL correcta de Cloud Run
- Verifica que el backend en Cloud Run esté UP (`/health` devuelve 200)

---

## Resumen

| Paso | Qué hacemos | Resultado |
|------|-----------|-----------|
| 1 | Crear proyecto en GCP | `PROJECT_ID` disponible |
| 2 | Habilitar APIs | Cloud Run + Artifact Registry + Firebase APIs listos |
| 3 | Crear 2 Service Accounts | Backend + Firebase accounts |
| 4 | Descargar 2 JSONs | `backend-key.json` + `firebase-key.json` |
| 5 | Agregar 4 secrets en GitHub | `GCP_PROJECT_ID`, `GCP_SA_KEY`, `DATABASE_URL`, `FIREBASE_SERVICE_ACCOUNT` |
| 6-7 | Verificar workflows + push | CI/CD corre automáticamente |
| 8-9 | Verificar Cloud Run + Firebase | Backend en `cloud.run.app` + Frontend en `.web.app` |
| 10-11 | Configurar `VITE_API_URL_PROD` | Frontend conecta a backend en producción |
| 12 | Push final | ✅ Todo en producción |

---

## Comandos rápidos (para referencia)

```bash
# Ver logs del deploy en Cloud Run
gcloud run logs read cicd-demo-backend --limit 50

# Ver estado del servicio
gcloud run describe cicd-demo-backend --region us-central1

# Ver imágenes en Artifact Registry
gcloud artifacts docker images list us-central1-docker.pkg.dev/TU_PROJECT_ID/cicd-demo

# Eliminar todo (si necesitas empezar de nuevo)
gcloud run delete cicd-demo-backend --region us-central1
```