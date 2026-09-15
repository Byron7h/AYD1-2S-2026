class AuthService:
    def __init__(self, user_repo, password_hasher, token_service):
        # Dependencias inyectadas para mantener el servicio testeable.
        # Esto evita acoplarse a una DB real o a un proveedor real de tokens.
        self.user_repo = user_repo
        self.password_hasher = password_hasher
        self.token_service = token_service

    def login(self, email, password):
        # Paso 1: buscar usuario (simula acceso a DB via repo inyectado).
        user = self.user_repo.find_by_email(email)
        if not user:
            raise ValueError("INVALID_CREDENTIALS")

        # Paso 2: validar password contra hash almacenado.
        is_valid = self.password_hasher.compare(password, user["password_hash"])
        if not is_valid:
            raise ValueError("INVALID_CREDENTIALS")

        # Paso 3: emitir token con datos minimos del usuario.
        # El servicio solo define el contrato, no la implementacion del token.
        return self.token_service.sign({"user_id": user["id"], "role": user["role"]})
