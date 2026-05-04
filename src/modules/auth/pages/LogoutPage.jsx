import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => navigate('/login', { replace: true }), 800);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F7F9FF', fontFamily: 'var(--font-display, sans-serif)' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #007f6c', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 24 }} />
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111A3E' }}>Signing you out...</h1>
      <p style={{ opacity: 0.6, marginTop: 8, color: '#44475E' }}>See you again soon!</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
