from fastapi.testclient import TestClient

from src.app import build_app


class AuthStub:
    def __init__(self, mode="ok"):
        # Stub configurable para simular login exitoso o invalido.
        self.mode = mode

    def login(self, _email, _password):
        if self.mode == "ok":
            return "token-demo"
        raise ValueError("INVALID_CREDENTIALS")


def test_health_returns_200():
    # Arrange: app real de FastAPI con dependencia simulada.
    app = build_app(AuthStub("ok"))
    client = TestClient(app)

    # Act: request HTTP real en memoria (sin abrir puerto externo).
    res = client.get("/health")

    # Assert: contrato HTTP esperado.
    assert res.status_code == 200
    assert res.json() == {"ok": True}


def test_login_returns_401_for_invalid_credentials():
    # Arrange: el stub de auth fuerza escenario de credenciales invalidas.
    app = build_app(AuthStub("invalid"))
    client = TestClient(app)

    # Act: llamada HTTP de login con payload invalido.
    res = client.post("/login", json={"email": "demo@demo.com", "password": "wrong"})

    # Assert: se verifica la traduccion de error de dominio a HTTP 401.
    assert res.status_code == 401
    assert res.json()["detail"] == "invalid credentials"
