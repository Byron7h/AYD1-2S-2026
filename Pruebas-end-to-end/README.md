# Pruebas End-to-End con Cypress - Clase8-SOLID

Este directorio contiene un ejemplo completo de pruebas E2E con Cypress sobre la app de Clase8-SOLID (frontend + backend).

## Tabla de Contenidos
1. [Objetivo](#objetivo)
2. [Que Es una Prueba End-to-End (E2E)](#que-es-una-prueba-end-to-end-e2e)
3. [Que Es Cypress](#que-es-cypress)
4. [Comandos Basicos de Cypress](#comandos-basicos-de-cypress)
5. [Prerequisitos](#prerequisitos)
6. [Instalacion de Cypress](#instalacion-de-cypress)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Archivos de Configuracion](#archivos-de-configuracion)
9. [Comandos para Ejecutar](#comandos-para-ejecutar)
10. [Las 5 Pruebas Explicadas](#las-5-pruebas-explicadas)
11. [Como Interpretar Resultados](#como-interpretar-resultados)
12. [Cambios en Frontend para Testeo](#cambios-en-frontend-para-testeo)
13. [Implementacion Proyecto](#implementacion-proyecto)
14. [Troubleshooting](#troubleshooting)

---

## Objetivo

Aprender Cypress de menos a mas:

1. Verificar que la app carga.
2. Crear un producto desde la UI.
3. Ejecutar un flujo real (producto + orden).
4. Probar validaciones y errores de negocio.

---

## Que Es una Prueba End-to-End (E2E)

Una prueba End-to-End valida un flujo completo del sistema desde la perspectiva del usuario final, atravesando interfaz, API y base de datos.

Ejemplo de flujo E2E en clase:

1. Abrir la app en el navegador.
2. Ir a la pestaña Productos.
3. Crear un producto.
4. Ir a la pestaña Ordenes.
5. Crear una orden con ese producto.
6. Validar que la orden aparece y que la app responde correctamente.

Ventaja de E2E frente a pruebas unitarias:

- Unitarias: validan funciones aisladas.
- E2E: valida que todo el flujo real funciona de punta a punta.

---

## Que Es Cypress

Cypress es un framework de pruebas automatizadas moderno que te permite simular un usuario real interactuando con tu aplicacion web. A diferencia de otras herramientas, Cypress:

- Abre un navegador real (Chrome, Edge, Firefox) y automatiza acciones como clics, escritura y navegacion.
- Se ejecuta en tiempo real: ves exactamente como se comporta la app mientras se prueba.
- Es estable: maneja esperas, reintentos y sincronizacion automaticamente.
- Facilita depuracion: puedes pausar, retroceder e inspeccionar elementos en cada paso.

Aclaraciones importantes:

- Cypress usa Node.js para ejecutarse, pero no es exclusivo de proyectos Node.
- Lo que prueba es la aplicacion web en el navegador.
- Las pruebas se escriben en JavaScript, pero aplican a cualquier SPA web moderna.

Comparacion rapida:

- Unitarias: prueban funciones aisladas.
- Integracion: prueban modulos trabajando juntos.
- E2E: prueban el flujo completo UI -> API -> BD -> UI.

---

## Comandos Basicos de Cypress

| Comando | Para que sirve | Ejemplo directo |
|---|---|---|
| `cy.visit()` | Navegar a una pagina de la app | `cy.visit("/")` |
| `cy.get()` | Buscar elementos por selector CSS | `cy.get('[data-cy="tab-products"]')` |
| `cy.contains()` | Buscar un texto visible en pantalla | `cy.contains("SOLID Orders")` |
| `cy.click()` | Simular clic del usuario | `cy.getByDataCy("create-order").click()` |
| `cy.type()` | Escribir texto en un campo | `cy.getByDataCy("order-email").type("demo@correo.com")` |
| `cy.select()` | Seleccionar una opcion de un dropdown | `cy.getByDataCy("order-product").select("2")` |
| `cy.should()` | Verificar que algo se cumpla (por ejemplo, que un elemento se vea o que un texto exista) | `cy.getByDataCy("error-message").should("be.visible")` |
| `cy.then()` | Trabajar con el resultado del paso anterior | `cy.get(...).then(($el) => { ... })` |

### Comando personalizado usado en el proyecto

En [cypress/support/commands.js](cypress/support/commands.js) existe:

```javascript
Cypress.Commands.add("getByDataCy", (value) => {
  return cy.get(`[data-cy="${value}"]`);
});
```

Ejemplo de uso:

```javascript
cy.getByDataCy("tab-products").click();
cy.getByDataCy("product-name").type("Producto Demo");
```

Por que es importante:

- Hace los tests mas legibles.
- Evita fragilidad por cambios de CSS.
- Estandariza selectores en toda la suite.

---

## Prerequisitos

Antes de empezar necesitas:

1. Node.js 18+ instalado.

```bash
node --version
```

2. Proyecto Clase8-SOLID corriendo:
- Backend en `http://localhost:3000`
- Frontend en `http://localhost:5173`

```bash
# Terminal 1: Backend
cd Clase8-SOLID/backend
npm install
npx prisma db push
npm run dev

# Terminal 2: Frontend
cd Clase8-SOLID/frontend
npm install
npm run dev
```

3. Carpeta de pruebas separada:
- Trabajar desde `Pruebas-end-to-end`.

---

## Instalacion de Cypress

### Paso 1: Instalar dependencias

```bash
cd Pruebas-end-to-end
npm install
```

Que pasa aqui:

- Descarga `cypress@13.17.0` (definido en `package.json`).
- Crea `node_modules` con dependencias.
- Tamano aproximado de descarga: ~400 MB (normal en Cypress).

Que se genera despues de instalar:

```text
node_modules/
|-- cypress/
|-- .bin/cypress
|-- ...
package-lock.json
```

### Paso 2: Abrir Cypress con interfaz visual

```bash
npm run cy:open
npm run cy:open:chrome
npm run cy:open:edge
```

Que significa `--browser chrome`:

- `cypress open` usa Electron por defecto.
- `cypress open --browser chrome` fuerza Chrome.
- Tambien puedes usar Edge o Firefox.

Sintaxis general:

```bash
npx cypress open --browser [navegador]
```

### Paso 3: Usar Launchpad

Cuando se abre Cypress:

1. Clic en E2E Testing.
2. Elegir navegador.
3. Ver lista de archivos `.cy.js`.
4. Clic en una spec para ejecutar.

Launchpad es la interfaz grafica donde puedes:

- Ver todos los tests.
- Ejecutar uno o todos.
- Revisar tiempos de ejecucion.
- Depurar paso a paso.

---

## Estructura del Proyecto

```text
Pruebas-end-to-end/
|-- cypress.config.js
|-- package.json
|-- README.md
|-- cypress/
|   |-- e2e/
|   |   |-- 01-primera-prueba.cy.js
|   |   |-- 02-productos.cy.js
|   |   |-- 03-ordenes.cy.js
|   |   |-- 04-validaciones.cy.js
|   |   |-- 05-comandos-basicos-demo.cy.js
|   |-- support/
|       |-- e2e.js
|       |-- commands.js
```

---

## Archivos de Configuracion

### 1) cypress.config.js - Reglas del juego

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
});
```

Por que importa esta configuracion:

- `baseUrl`: conecta tests con la app.
- `specPattern`: define donde busca tests.
- `supportFile`: centraliza preparacion global.
- `defaultCommandTimeout`: evita fallos prematuros.
- `retries`: da resiliencia en CI/CD.

### 2) cypress/support/e2e.js - Preparacion global

```javascript
import "./commands";
```

Se ejecuta antes de cada prueba. Aqui se cargan comandos compartidos y futuras configuraciones globales.

### 3) cypress/support/commands.js - Comandos personalizados

```javascript
Cypress.Commands.add("getByDataCy", (value) => {
  return cy.get(`[data-cy="${value}"]`);
});
```

Por que importa:

- Reduce repeticion.
- Mejora legibilidad.
- Mantiene selectores consistentes.

---

## Comandos para Ejecutar

Todos los scripts estan en [package.json](package.json):

### Ejecutar toda la suite

```bash
npm run test:e2e
npm run cy:headed
npm run test:e2e:edge
```

### Ejecutar tests individuales (demo en clase)

```bash
npm run demo:01
npm run demo:02
npm run demo:03
npm run demo:04
npm run demo:05
```

### Interfaz visual

```bash
npm run cy:open
npm run cy:open:chrome
npm run cy:open:edge
```

---

## Las 5 Pruebas Explicadas

1. [cypress/e2e/01-primera-prueba.cy.js](cypress/e2e/01-primera-prueba.cy.js)
   - Smoke test: verifica carga de app y elementos base.

2. [cypress/e2e/02-productos.cy.js](cypress/e2e/02-productos.cy.js)
   - CRUD basico: crear producto desde UI.

3. [cypress/e2e/03-ordenes.cy.js](cypress/e2e/03-ordenes.cy.js)
   - Flujo E2E completo: crear producto y luego orden.

4. [cypress/e2e/04-validaciones.cy.js](cypress/e2e/04-validaciones.cy.js)
   - Casos negativos: validaciones y stock insuficiente.

5. [cypress/e2e/05-comandos-basicos-demo.cy.js](cypress/e2e/05-comandos-basicos-demo.cy.js)
   - Demo concentrada de comandos basicos.

---

## Como Interpretar Resultados

Lectura rapida de Cypress:

- `Passed`: pruebas exitosas.
- `Failed`: pruebas que fallaron.
- `Test body`: pasos ejecutados en orden.
- `fetch GET/POST`: llamadas de red durante la prueba.

Cuando una prueba falla:

1. Revisa el paso exacto donde fallo.
2. Verifica el selector esperado.
3. Revisa consola y network en el navegador de Cypress.

Ejemplo tipico de error:

- `Timed out retrying... element not found`
- Significa que Cypress espero y no encontro el elemento en pantalla.

---

## Cambios en Frontend para Testeo

Para hacer pruebas estables, se agregaron atributos `data-cy`.

### Antes y despues de un componente

Antes (sin Cypress):

```jsx
<button onClick={createProduct}>Agregar producto</button>
```

Despues (con Cypress):

```jsx
<button data-cy="create-product" onClick={createProduct}>Agregar producto</button>
```

### Atributos data-cy usados en el flujo

- `tab-orders`
- `tab-products`
- `product-name`
- `product-price`
- `product-stock`
- `create-product`
- `order-email`
- `order-product`
- `order-qty`
- `create-order`
- `products-table`
- `orders-table`
- `error-message`
- `close-error`
- `refresh-data`

Estos atributos hacen que los tests no dependan de cambios visuales (CSS o texto).

---

## Implementacion Proyecto

En [Implementacion-proyecto](Implementacion-proyecto) se muestra una forma mas formal de documentar pruebas E2E en el contexto del proyecto.

Archivos recomendados:

- [Implementacion-proyecto/Documentacion-pruebas-E2E.md](Implementacion-proyecto/Documentacion-pruebas-E2E.md)
- [Implementacion-proyecto/frontend.cy.js](Implementacion-proyecto/frontend.cy.js)

Ahi puedes ver:

- Casos de prueba documentados.
- Flujo funcional cubierto por pruebas.
- Evidencia de implementacion para reporte tecnico.

---

## Troubleshooting

Error: `Cannot find module 'cypress'`

```bash
cd Pruebas-end-to-end
npm install
```

Error: Electron inestable al abrir Cypress

```bash
npm run cy:open:chrome
```

Error: `Timed out retrying... element not found`

1. Verifica que frontend esta en `http://localhost:5173`.
2. Verifica nombre exacto del `data-cy`.
3. Confirma que el elemento este visible en ese momento del flujo.
