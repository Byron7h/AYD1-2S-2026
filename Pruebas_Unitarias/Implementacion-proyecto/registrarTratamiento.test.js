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

describe("POST /api/medico/atender/paciente", () => {
  
  it("Atender una cita exitosamente cuando el médico registra el tratamiento", async () => {
    // ============ ARRANGE ============
    // Descripción: Médico registra tratamiento para paciente
    // Técnica: Mock de BD devuelve affectedRows = 1 (éxito)
    // Por qué: Simula que el procedimiento RegistrarTratamiento se ejecutó correctamente
    
    db.default.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const tratamientoData = {
      citaId: 1,
      id_medico: 3790458162304,
      tratamiento: "Descansar y tomar líquidos",
    };

    // ============ ACT ============
    const response = await request(app)
      .post("/api/medico/atender/paciente")
      .send(tratamientoData);

    // ============ ASSERT ============
    // Validamos: procedimiento llamado con parámetros correctos, status 200, mensaje exitoso
    expect(db.default.query).toHaveBeenCalledWith(
      "call RegistrarTratamiento(?,?,?)",
      [1, 3790458162304, "Descansar y tomar líquidos"]
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Cita atendida exitosamente",
    });
  });

  it("Atender una cita falla cuando citaId es inválido", async () => {
    // ============ ARRANGE ============
    // Descripción: Médico intenta atender con datos inválidos
    // Técnica: Validación de entrada sin llegar a BD
    // Por qué: Simula error de validación (citaId = null es inválido)

    const tratamientoData = {
      citaId: null,
      id_medico: 3790458162304,
        tratamiento: "Descansar y tomar líquidos",
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error al atender la cita",
    });
  });
});
