const { buildAuthService } = require("../../src/authService");

describe("AuthService unit tests", () => {
  test("returns token when credentials are valid (using mocks)", async () => {
    // Caso real: un usuario ingresa correo y password correctos en login.
    // Objetivo: validar SOLO la logica de authService, sin DB real ni JWT real.

    // Arrange (preparacion): se mockean dependencias externas.
    // userRepo simula la consulta a base de datos.
    const userRepo = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 10,
        email: "test@demo.com",
        passwordHash: "hash-123",
        role: "student"
      })
    };

    // passwordHasher simula la verificacion de password encriptado.
    const passwordHasher = {
      compare: jest.fn().mockResolvedValue(true)
    };

    // tokenService simula la generacion de token JWT.
    const tokenService = {
      sign: jest.fn().mockReturnValue("token-abc")
    };

    const authService = buildAuthService({ userRepo, passwordHasher, tokenService });

    // Act (ejecucion): se invoca el caso de uso login.
    const token = await authService.login({
      email: "test@demo.com",
      password: "secret"
    });

    // Assert (verificaciones):
    // 1) salida esperada: token generado
    // 2) validacion de flujo: se llamaron correctamente las dependencias
    expect(token).toBe("token-abc");
    expect(userRepo.findByEmail).toHaveBeenCalledWith("test@demo.com");
    expect(passwordHasher.compare).toHaveBeenCalledWith("secret", "hash-123");
    expect(tokenService.sign).toHaveBeenCalledWith({ userId: 10, role: "student" });
  });

  test("throws INVALID_CREDENTIALS when user does not exist", async () => {
    // Caso de falla: correo no existe en DB.
    // Se mockea userRepo para devolver null y comprobar el error esperado.
    const authService = buildAuthService({
      userRepo: { findByEmail: jest.fn().mockResolvedValue(null) },
      passwordHasher: { compare: jest.fn() },
      tokenService: { sign: jest.fn() }
    });

    // Salida esperada: se rechaza la promesa con INVALID_CREDENTIALS.
    await expect(
      authService.login({ email: "missing@demo.com", password: "123" })
    ).rejects.toThrow("INVALID_CREDENTIALS");
  });
});
