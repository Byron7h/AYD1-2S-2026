import { jest } from "@jest/globals";
import request from "supertest";

// ============================================
// CONFIGURACIÓN INICIAL - MOCKS
// ============================================

// Mockeamos el módulo de base de datos con execute
// Técnica: estable_mockModule (necesario para ESM)
// Por qué: Necesitamos simular la BD sin conectarnos a la real
jest.unstable_mockModule("../db.js", () => ({
    default: {
        execute: jest.fn(), // Simula procedimiento almacenado
    },
}));

// Mockeamos bcryptjs para comparar contraseñas
// Técnica: Mock normal (ESM tiene problemas con unstable_mockModule)
// Por qué: Devuelve true siempre para pruebas determinísticas
jest.mock('bcryptjs', () => ({
    compare: jest.fn(() => Promise.resolve(true)),
}));

// Mockeamos jsonwebtoken para generar tokens
// Técnica: Mock que devuelve valor fijo
// Por qué: Queremos un token predecible sin generar uno real
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue("mock.jwt.token")
}));

let db, app;
beforeAll(async () => {
    db = (await import("../db.js")).default;
    app = (await import("../app.js")).default;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas de Login API', () => {
    
    it('Debe retornar un JWT cuando las credenciales son correctas', async () => {
        // ============ ARRANGE ============
        // Descripción: Usuario con credenciales válidas hace login
        // Técnica: Mock de BD devuelve usuario existente
        
        const mockUser = {
            dpi: 1,
            id_tipo_usuario: 1,
            hashed_password: "$2a$10$NAwFSxnEJu8jI9Gly9PtzOWEqaJq2z63SIKawZ4Y5AlK33wwlAt0C",
            token_verificado: 1,
            estado_usuario: 2 // Activo
        };

        // Mockeamos que la BD devuelve el usuario
        db.execute.mockResolvedValueOnce([[[mockUser]]]);

        const credentials = {
            correo: "usuario@ejemplo.com",
            contraseña: "PacientePass123"
        };

        // ============ ACT ============
        const response = await request(app)
            .post('/auth/login')
            .send(credentials);

        // ============ ASSERT ============
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data.token).toBeDefined();
        expect(db.execute).toHaveBeenCalled();
    });
});