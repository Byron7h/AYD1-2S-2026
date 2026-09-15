import { jest } from "@jest/globals";
import request from "supertest";

// ============================================
// CONFIGURACIÓN INICIAL - MOCKS
// ============================================

// Mockeamos el módulo de base de datos para simular procedimientos almacenados
// Técnica: Unstable mockModule (necesario para ES Modules)
// Por qué: Evita conexión a BD real durante tests
jest.unstable_mockModule("../db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

let db;
let app;

beforeAll(async () => {
  db = await import("../db.js");
  app = (await import("../app.js")).default;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/paciente/registrar/cita", () => {
  
  it("Registrar una cita exitosamente cuando todos los datos son válidos", async () => {
    // ============ ARRANGE ============
    // Descripción: Paciente registra una cita con información completa
    // Técnica: Mock de BD devuelve affectedRows = 1 (éxito)
    // Por qué: Simula que el procedimiento almacenado se ejecutó correctamente
    
    db.default.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const citaData = {
      fecha: "Wed Apr 02 2025 08:00:00 GMT-0600 (Central Standard Time)",
      hora: "Wed Apr 02 2025 08:00:00 GMT-0600 (Central Standard Time)",
      motivo: "Consulta general",
      idPaciente: 3417285091672,
      idDoctor: 3790458162304,
    };

    // ============ ACT ============
    const response = await request(app)
      .post("/api/paciente/registrar/cita")
      .send(citaData);

    // ============ ASSERT ============
    // Validamos: status HTTP 201 (creado), mensaje exitoso, y que el procedimiento se llamó correctamente
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cita Registrada Exitosamente!");
    expect(db.default.query).toHaveBeenCalledWith(
      "CALL ProgramarCita(?, ?, ?, ?, ?)",
      [
        3417285091672,
        3790458162304,
        "2025-04-02",
        "Wed Apr 02 2025 08:00:00 GMT-0600 (Central Standard Time)",
        "Consulta general",
      ]
    );
  });

  it("Registrar una cita falla cuando la BD retorna error", async () => {
    // ============ ARRANGE ============
    // Descripción: La BD rechaza el registro de cita
    // Técnica: Mock rechaza la promesa con error
    // Por qué: Simula error de BD (datos duplicados, BD no disponible, etc)
    
    db.default.query.mockRejectedValueOnce(
      new Error("Error en la base de datos")
    );

    const citaData = {
      fecha: "Wed Apr 02 2025 21:00:00 GMT-0600 (Central Standard Time)",
      hora: "Wed Apr 02 2025 21:00:00 GMT-0600 (Central Standard Time)",
      motivo: "Consulta general",
      idPaciente: 3417285091672,
      idDoctor: 3790458162304,
    };

    // ============ ACT ============
    const response = await request(app)
      .post("/api/paciente/registrar/cita")
      .send(citaData);

    // ============ ASSERT ============
    // Validamos: status HTTP 500 (error servidor) y mensaje de error
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error al registrar Cita");
  });
});
