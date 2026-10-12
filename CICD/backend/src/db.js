const { Pool } = require('pg');

// Neon usa PostgreSQL; se toma la URL desde variable de entorno.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

async function findUserByEmailAndPassword(email, password) {
  const query = `
    SELECT id, email
    FROM users
    WHERE email = $1 AND password = $2
    LIMIT 1
  `;

  const result = await pool.query(query, [email, password]);
  return result.rows[0] || null;
}

module.exports = {
  findUserByEmailAndPassword
};
