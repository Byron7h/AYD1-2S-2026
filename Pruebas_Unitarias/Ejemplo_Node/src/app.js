const express = require("express");

function buildApp({ authService }) {
  // buildApp crea una app Express inyectando servicios.
  // En pruebas, esto permite reemplazar authService por mocks facilmente.
  const app = express();
  app.use(express.json());

  // Endpoint de salud para verificar que API responde.
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // Endpoint de login: recibe email/password y delega autenticacion al servicio.
  app.post("/login", async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      // Traduccion de errores de negocio a codigos HTTP.
      if (error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({ message: "invalid credentials" });
      }
      // Cualquier otro error se trata como error interno.
      return res.status(500).json({ message: "internal error" });
    }
  });

  return app;
}

module.exports = { buildApp };
