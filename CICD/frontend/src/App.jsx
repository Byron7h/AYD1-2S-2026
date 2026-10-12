import { useState } from 'react';
import LoginPage from './LoginPage';

export default function App() {
  const [userEmail, setUserEmail] = useState('');

  if (userEmail) {
    return (
      <main style={styles.main}>
        <section style={styles.card}>
          <h1 style={styles.title}>Bienvenid@</h1>
          <p style={styles.text}>Inicio de sesion exitoso para: {userEmail}</p>
        </section>
      </main>
    );
  }

  return <LoginPage onLoginSuccess={setUserEmail} />;
}

const styles = {
  main: {
    minHeight: '100vh',
    margin: 0,
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 14px 40px rgba(2, 6, 23, 0.15)'
  },
  title: {
    marginTop: 0,
    marginBottom: '12px',
    color: '#0F172A'
  },
  text: {
    margin: 0,
    color: '#1E293B'
  }
};
