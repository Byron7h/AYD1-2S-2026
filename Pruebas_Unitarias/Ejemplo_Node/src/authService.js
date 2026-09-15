function buildAuthService({ userRepo, passwordHasher, tokenService }) {
  return {
    // Caso de uso: autenticar usuario y devolver token.
    // Este servicio NO sabe de DB real ni JWT real; usa dependencias inyectadas.
    // Eso permite testearlo en aislamiento con mocks.
    async login({ email, password }) {
      // Paso 1: buscar usuario por correo (normalmente en DB).
      const user = await userRepo.findByEmail(email);
      if (!user) {
        // Caso falla: no existe usuario.
        throw new Error("INVALID_CREDENTIALS");
      }

      // Paso 2: comparar password plano contra hash almacenado.
      const isValid = await passwordHasher.compare(password, user.passwordHash);
      if (!isValid) {
        // Caso falla: password no coincide.
        throw new Error("INVALID_CREDENTIALS");
      }

      // Paso 3: generar token con datos minimos del usuario.
      return tokenService.sign({ userId: user.id, role: user.role });
    }
  };
}

module.exports = { buildAuthService };
