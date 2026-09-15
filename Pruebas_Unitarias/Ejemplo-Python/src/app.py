from fastapi import FastAPI, HTTPException


def build_app(auth_service):
    # build_app crea la aplicacion FastAPI inyectando dependencias.
    # Igual que en Node, esta inyeccion facilita sustituir servicios en pruebas.
    app = FastAPI()

    @app.get("/health")
    def health():
        # Endpoint simple usado en pruebas de integracion.
        return {"ok": True}

    @app.post("/login")
    def login(payload: dict):
        # Capa HTTP: recibe datos, delega la regla de negocio al servicio
        # y traduce errores de dominio a codigos HTTP.
        try:
            # Delegar autenticacion a la capa de servicio.
            token = auth_service.login(payload["email"], payload["password"])
            return {"token": token}
        except ValueError as exc:
            # Mapear errores de dominio a respuestas HTTP.
            if str(exc) == "INVALID_CREDENTIALS":
                raise HTTPException(status_code=401, detail="invalid credentials")
            raise HTTPException(status_code=500, detail="internal error")

    return app
