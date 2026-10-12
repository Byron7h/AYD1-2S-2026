require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { findUserByEmailAndPassword } = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

// Endpoint de salud para validar que el backend esta levantado.
app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: Date.now()
  });
});

// Endpoint simple de login para la demo de CI/CD.
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email y password son obligatorios'
    });
  }

  try {
    console.log(`[LOGIN] Intentando login con email: ${email}`);
    const user = await findUserByEmailAndPassword(email, password);
    console.log(`[LOGIN] Resultado DB:`, user);

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error(`[LOGIN ERROR] ${error.message}`);
    console.error(error);
    return res.status(500).json({
      message: 'Error interno en login',
      error: error.message
    });
  }
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Backend demo escuchando en puerto ${port}`);
  });
}

module.exports = app;
