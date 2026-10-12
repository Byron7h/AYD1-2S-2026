const request = require('supertest');

const mockQuery = jest.fn();

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    query: mockQuery
  }))
}));

const app = require('../src/app');

describe('Backend demo CI/CD', () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  test('GET /health retorna 200 y status ok', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok' });
    expect(typeof response.body.timestamp).toBe('number');
  });

  test('POST /login con body vacio retorna 400', async () => {
    const response = await request(app).post('/login').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/obligatorios/i);
  });

  test('POST /login con credenciales incorrectas retorna 401', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .post('/login')
      .send({ email: 'demo@correo.com', password: 'mala' });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/incorrectas/i);
  });
});
