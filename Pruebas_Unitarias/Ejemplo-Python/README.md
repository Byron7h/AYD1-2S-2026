# Python: Unitarias, Integracion y Cobertura

Este ejemplo replica el mismo flujo del ejemplo de Node:
- login de usuario
- programacion de citas

Tecnologias:
- Python 3.10+
- FastAPI
- pytest (unitarias y cobertura)
- httpx (cliente HTTP de TestClient)

## Que se ve en este ejemplo

- Pruebas unitarias con mocks, stubs y fakes usando pytest.
- Pruebas de integracion con FastAPI TestClient.
- Cobertura con pytest-cov.

## Estructura clave

- Logica de negocio:
  - [Pruebas-Unitarias/Ejemplo-Python/src/auth_service.py](Pruebas-Unitarias/Ejemplo-Python/src/auth_service.py)
  - [Pruebas-Unitarias/Ejemplo-Python/src/appointment_service.py](Pruebas-Unitarias/Ejemplo-Python/src/appointment_service.py)
- Capa HTTP:
  - [Pruebas-Unitarias/Ejemplo-Python/src/app.py](Pruebas-Unitarias/Ejemplo-Python/src/app.py)
- Tests unitarios:
  - [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py)
  - [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py)
- Tests de integracion:
  - [Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py](Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py)

## Como ejecutar

1) Crear entorno virtual e instalar dependencias

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2) Ejecutar pruebas

```bash
pytest -q
```

Salida esperada (resumen):

```text
6 passed
```

3) Cobertura

```bash
pytest --cov=src --cov-report=term-missing
```

Salida esperada (resumen):

```text
Name                         Stmts   Miss  Cover
src/__init__.py                  0      0   100%
src/app.py                      16      2    88%
src/appointment_service.py      12      1    92%
src/auth_service.py             13      1    92%
TOTAL                           41      4    90%
```

## Que prueba cada test

### Unitarias

- Login exitoso retorna token.
  - Usa: mocks de repo, hash y token.
  - Valida flujo: user_repo -> password_hasher -> token_service.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py)
  - Salida esperada: token "token-abc".

- Login falla si usuario no existe.
  - Usa: mock de repo que retorna None.
  - Valida error INVALID_CREDENTIALS.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_auth_service.py)
  - Salida esperada: error INVALID_CREDENTIALS.

- Cita futura sin conflicto se guarda.
  - Usa: stub de reloj y fake repo en memoria.
  - Valida: regla de fecha futura y guardado.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py)
  - Salida esperada: cita con id y repo con 1 registro.

- Cita en conflicto falla.
  - Usa: fake repo con cita pre-cargada.
  - Valida: error APPOINTMENT_CONFLICT.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py](Pruebas-Unitarias/Ejemplo-Python/tests/unit/test_appointment_service.py)
  - Salida esperada: error APPOINTMENT_CONFLICT.

### Integracion

- GET /health responde 200 con {"ok": true}.
  - Usa: app real con FastAPI.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py](Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py)
  - Salida esperada: status 200 y body {"ok": true}.

- POST /login traduce error de negocio a HTTP 401.
  - Usa: app real con servicio simulado.
  - Archivo: [Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py](Pruebas-Unitarias/Ejemplo-Python/tests/integration/test_app.py)
  - Salida esperada: status 401 y detail "invalid credentials".

## Cuando usar DB real

- Unitarias: no usar DB real. Usar mocks, stubs o fakes.
- Integracion: puedes usar DB real de pruebas, pero aumenta tiempo y complejidad.
- En este ejemplo no hay DB real. Se simula con dobles de prueba.

## Refactor cuando el codigo no es testeable

Ejemplo completo en:
- [Pruebas-Unitarias/Refactorizacion/README.md](Pruebas-Unitarias/Refactorizacion/README.md)

## Tecnologias

- Python 3.10+
- pytest
- pytest-cov
- FastAPI
- httpx