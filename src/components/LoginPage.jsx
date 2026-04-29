import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';
  const pageTitle = isSignup ? 'Create your account' : 'Welcome back';
  const buttonText = isSignup ? 'Sign up' : 'Sign in';
  const toggleText = isSignup ? 'Already have an account?' : "Don't have an account?";
  const toggleLink = isSignup ? '/login' : '/signup';
  const toggleLinkText = isSignup ? 'Sign in' : 'Sign up';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For now, just simulate authentication and redirect to onboarding
      // In production, this would call your backend API
      if (!email || !password || (isSignup && !name)) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, just redirect to onboarding
      // In production, you'd get a JWT token and store it
      localStorage.setItem('user', JSON.stringify({ email, name: name || email }));
      navigate('/onboarding/step-1');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pm-page pm-page--public pm-login-page">
      <div className="pm-page__glow pm-page__glow--one" />
      <div className="pm-page__glow pm-page__glow--two" />
      <div className="pm-page__grain" />

      <div className="pm-login-container">
        <div className="pm-login-card">
          <div className="pm-login-card__header">
            <Link to="/" className="pm-login-logo">
              <span className="pm-logo-text">ProMatch</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="pm-login-form">
            <h1 className="pm-login-form__title">{pageTitle}</h1>
            <p className="pm-login-form__subtitle">
              {isSignup
                ? 'Join 2,400+ ambitious builders discovering serious matches'
                : 'Get back to discovering your next co-founder'}
            </p>

            {error && <div className="pm-login-form__error">{error}</div>}

            {isSignup && (
              <div className="pm-login-form__group">
                <label htmlFor="name" className="pm-login-form__label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="pm-login-form__input"
                  placeholder="Alex Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            <div className="pm-login-form__group">
              <label htmlFor="email" className="pm-login-form__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="pm-login-form__input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="pm-login-form__group">
              <label htmlFor="password" className="pm-login-form__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="pm-login-form__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="pm-login-form__button"
              disabled={loading}
            >
              {loading ? 'Loading...' : buttonText}
            </button>

            {!isSignup && (
              <Link to="#" className="pm-login-form__forgot">
                Forgot password?
              </Link>
            )}
          </form>

          <div className="pm-login-card__footer">
            <p>
              {toggleText}{' '}
              <Link to={toggleLink} className="pm-login-card__toggle">
                {toggleLinkText}
              </Link>
            </p>
          </div>

          <div className="pm-login-card__divider">Or continue with</div>

          <div className="pm-login-card__oauth">
            <button type="button" className="pm-oauth-button pm-oauth-button--google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Google
            </button>
            <button type="button" className="pm-oauth-button pm-oauth-button--github">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 0 0-3.159 19.5" />
              </svg>
              GitHub
            </button>
          </div>
        </div>

        <div className="pm-login-content">
          <div className="pm-login-content__section">
            <h2>Why ProMatch?</h2>
            <ul className="pm-login-content__list">
              <li>AI-powered matching based on skills and intent</li>
              <li>Direct access to vetted professionals and founders</li>
              <li>Real-time messaging and video calls</li>
              <li>Join 2,400+ builders in 38 cities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
