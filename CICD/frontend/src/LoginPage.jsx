import { useState } from 'react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'No se pudo iniciar sesion');
        return;
      }

      setMessage(data.message || 'Login exitoso');
      onLoginSuccess(data.user?.email || email);
    } catch (error) {
      setMessage('Error de red al intentar iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.title}>CI/CD DEMOSTRACION CAMBIO</h1>
        <p style={styles.subtitle}>Usa tu cuenta de prueba para validar el flujo completo.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@correo.com"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              style={styles.input}
              required
            />
          </label>

          <button type="submit" style={{ ...styles.button, backgroundColor: '#2563EB' }} disabled={loading}>
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    margin: 0,
    display: 'grid',
    placeItems: 'center',
    background: 'radial-gradient(circle at top left, #BFDBFE 0%, #EFF6FF 45%, #E2E8F0 100%)',
    padding: '16px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#FFFFFF',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 18px 42px rgba(2, 6, 23, 0.16)'
  },
  title: {
    marginTop: 0,
    marginBottom: '8px',
    color: '#1E3A8A'
  },
  subtitle: {
    marginTop: 0,
    marginBottom: '18px',
    color: '#334155'
  },
  form: {
    display: 'grid',
    gap: '12px'
  },
  label: {
    display: 'grid',
    gap: '6px',
    color: '#0F172A',
    fontWeight: 600
  },
  input: {
    border: '1px solid #CBD5E1',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px'
  },
  button: {
    border: 'none',
    borderRadius: '12px',
    color: '#FFFFFF',
    padding: '11px 14px',
    fontWeight: 700,
    cursor: 'pointer'
  },
  message: {
    marginTop: '14px',
    marginBottom: 0,
    color: '#0F172A'
  }
};
