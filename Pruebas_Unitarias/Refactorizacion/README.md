# Ejemplo de Refactorizacion (Node.js)

Este ejemplo muestra un codigo que no es testeable y como refactorizarlo para poder escribir pruebas unitarias.

## Objetivo

- Identificar acoplamiento fuerte a dependencias internas.
- Refactorizar con inyeccion de dependencias.
- Agregar una prueba unitaria de ejemplo.

## Archivos

- Antes (no testeable):
  - [Pruebas-Unitarias/Refactorizacion/antes/orderService.js](Pruebas-Unitarias/Refactorizacion/antes/orderService.js)
- Despues (testeable):
  - [Pruebas-Unitarias/Refactorizacion/despues/orderService.js](Pruebas-Unitarias/Refactorizacion/despues/orderService.js)
  - [Pruebas-Unitarias/Refactorizacion/despues/orderService.test.js](Pruebas-Unitarias/Refactorizacion/despues/orderService.test.js)

## Que cambia con el refactor

Antes:
- El servicio crea su propia DB y su propio gateway de pagos.
- No se pueden reemplazar dependencias en pruebas.

Despues:
- Se inyectan dependencias al construir el servicio.
- Las pruebas pueden usar mocks y stubs.

## Como explicarlo en clase

Mensaje sugerido:

Aqui estamos viendo por que un codigo puede funcionar pero aun asi ser dificil de probar. En la version "antes" el servicio esta acoplado a sus dependencias. En la version "despues" aplicamos inyeccion de dependencias para separar reglas de negocio de infraestructura.

Puntos que puedes remarcar:

- Antes:
  - `new Database()` y `new PaymentGateway()` estan dentro de `placeOrder`.
  - No podemos controlar facilmente esos comportamientos desde pruebas.
- Despues:
  - `orderRepo` y `paymentGateway` llegan como parametros.
  - Podemos usar `jest.fn()` para simular respuestas y validar llamadas.

Frase de cierre:

Refactorizar no solo mejora estilo; mejora testabilidad, mantenimiento y seguridad para cambios futuros.

## Comandos sugeridos (Git + VS Code)

```bash
git checkout -b feature/refactor-testable
# editar archivo con ayuda de Copilot Chat (CodeX)
npm test
```

## Prompt sugerido para CodeX

"Refactoriza este servicio para que sea testeable. Extrae las dependencias internas (DB y paymentGateway) a parametros de construccion. Mantiene la misma logica de negocio y no cambies el contrato de la funcion placeOrder. Agrega un ejemplo de prueba unitaria usando Jest con mocks."

## Nota sobre modelos CodeX en VS Code

Si en tu entorno tienes varios modelos disponibles (por ejemplo variantes GPT-5.x CodeX), puedes usar cualquiera para el ejercicio de refactorizacion. La recomendacion didactica es:

- Modelo principal: para generar la propuesta de refactor.
- Modelo mas ligero: para iterar comentarios, nombres y limpieza.

Lo importante para clase no es el nombre exacto del modelo, sino el proceso:

1. Describir objetivo del refactor.
2. Pedir preservacion de contrato.
3. Solicitar test unitario que demuestre el cambio.

## Resultado esperado (prueba)

```text
PASS  Refactorizacion/despues/orderService.test.js

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```
