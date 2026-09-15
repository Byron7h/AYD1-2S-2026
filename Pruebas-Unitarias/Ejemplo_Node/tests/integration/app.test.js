const request = require("supertest");
const { buildApp } = require("../../src/app");

describe("App integration tests", () => {
  test("GET /health returns 200", async () => {
    // Integracion: probamos endpoint HTTP real (ruta + express + respuesta).
    // No necesitamos login real para health check.
    const app = buildApp({
      authService: { login: jest.fn() }
    });

    // Act: llamada HTTP simulada con supertest.
    const res = await request(app).get("/health");

    // Assert: estado y cuerpo esperados.
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  test("POST /login returns token", async () => {
    // Caso exitoso de integracion:
    // endpoint /login + body JSON + authService exitoso.
    const app = buildApp({
      authService: { login: jest.fn().mockResolvedValue("token-demo") }
    });

    const res = await request(app)
      .post("/login")
      .send({ email: "demo@demo.com", password: "123" });

    // Salida esperada en exito: HTTP 200 y token.
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ token: "token-demo" });
  });

  test("POST /login returns 401 for invalid credentials", async () => {
    // Caso de falla de integracion:
    // el servicio retorna error de credenciales y la ruta lo traduce a 401.
    const app = buildApp({
      authService: {
        login: jest.fn().mockRejectedValue(new Error("INVALID_CREDENTIALS"))
      }
    });

    const res = await request(app)
      .post("/login")
      .send({ email: "demo@demo.com", password: "wrong" });

    // Salida esperada en fallo: HTTP 401 con mensaje de negocio.
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "invalid credentials" });
  });
});
