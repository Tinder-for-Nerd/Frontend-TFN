import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/* ── tiny SVG icon helpers ── */
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="pm-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* Google logo (colored) */
const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* GitHub logo */
const GitHubLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ── feature icons for right panel ── */
const featureIcons = {
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  access: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const features = [
  { icon: 'ai',     text: 'AI-powered matching on skills & intent' },
  { icon: 'access', text: 'Access vetted professionals & founders' },
  { icon: 'chat',   text: 'Real-time messaging and video calls' },
  { icon: 'globe',  text: '2,400+ builders across 38 cities' },
];

/* ── helpers ── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function LoginPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [name, setName]                 = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [touched, setTouched]           = useState({});
  const emailRef = useRef(null);

  const isSignup      = mode === 'signup';
  const pageTitle     = isSignup ? 'Create your account' : 'Welcome back';
  const buttonText    = isSignup ? 'Create account' : 'Sign in';
  const toggleText    = isSignup ? 'Already have an account?' : "Don't have an account?";
  const toggleLink    = isSignup ? '/login' : '/signup';
  const toggleLinkText = isSignup ? 'Sign in' : 'Sign up';

  // Inline validation
  const emailError    = touched.email && email && !isValidEmail(email) ? 'Enter a valid email address' : '';
  const passwordError = touched.password && password.length > 0 && password.length < 6 ? 'At least 6 characters' : '';
  const canSubmit     = email && password && (isSignup ? name : true) && !emailError && !passwordError;

  useEffect(() => { emailRef.current?.focus(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setTouched({ email: true, password: true, name: true });
      setError('Please fill in all fields correctly');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      localStorage.setItem('user', JSON.stringify({ email, name: name || email }));
      navigate('/onboarding/step-1');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markTouched = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  return (
    <div className="pm-page pm-page--public pm-login-page">
      <div className="pm-page__glow pm-page__glow--one" />
      <div className="pm-page__glow pm-page__glow--two" />
      <div className="pm-page__grain" />

      <div className="pm-login-container">
        {/* ── LEFT: Form card ── */}
        <div className="pm-login-card">
          <div className="pm-login-card__header">
            <Link to="/" className="pm-login-logo" aria-label="Back to home">
              <span className="pm-login-logo__mark">P</span>
              <span className="pm-login-logo__text">ProMatch</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="pm-login-form" noValidate>
            <div className="pm-login-form__intro">
              <h1 className="pm-login-form__title">{pageTitle}</h1>
              <p className="pm-login-form__subtitle">
                {isSignup
                  ? 'Join 2,400+ builders discovering serious matches'
                  : 'Get back to discovering your next co-founder'}
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="pm-login-form__error" role="alert">
                <AlertIcon />
                <span>{error}</span>
              </div>
            )}

            {/* Name (signup only) */}
            {isSignup && (
              <div className="pm-login-form__group">
                <label htmlFor="name" className="pm-login-form__label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="pm-login-form__input"
                  placeholder="Alex Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={markTouched('name')}
                  disabled={loading}
                />
              </div>
            )}

            {/* Email */}
            <div className={`pm-login-form__group ${emailError ? 'has-error' : ''}`}>
              <label htmlFor="email" className="pm-login-form__label">Email</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                autoComplete="email"
                className={`pm-login-form__input ${emailError ? 'is-invalid' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={markTouched('email')}
                disabled={loading}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && <span id="email-error" className="pm-login-form__field-error">{emailError}</span>}
            </div>

            {/* Password */}
            <div className={`pm-login-form__group ${passwordError ? 'has-error' : ''}`}>
              <div className="pm-login-form__label-row">
                <label htmlFor="password" className="pm-login-form__label">Password</label>
                {!isSignup && (
                  <Link to="#" className="pm-login-form__forgot">Forgot password?</Link>
                )}
              </div>
              <div className="pm-login-form__input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className={`pm-login-form__input ${passwordError ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={markTouched('password')}
                  disabled={loading}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="pm-login-form__eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {passwordError && <span id="password-error" className="pm-login-form__field-error">{passwordError}</span>}
            </div>

            {/* Remember me */}
            {!isSignup && (
              <label className="pm-login-form__remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="pm-login-form__checkbox-mark" />
                <span>Remember me</span>
              </label>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="pm-login-form__button"
              disabled={loading || !canSubmit}
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  <span>Signing in…</span>
                </>
              ) : (
                buttonText
              )}
            </button>

            {/* Security reassurance */}
            <p className="pm-login-form__secure">
              <LockIcon />
              <span>Your data is encrypted and secure</span>
            </p>
          </form>

          {/* Divider */}
          <div className="pm-login-card__divider">
            <span>Or continue with</span>
          </div>

          {/* OAuth */}
          <div className="pm-login-card__oauth">
            <button type="button" className="pm-oauth-button">
              <GoogleLogo />
              <span>Google</span>
            </button>
            <button type="button" className="pm-oauth-button">
              <GitHubLogo />
              <span>GitHub</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="pm-login-card__footer">
            <p>
              {toggleText}{' '}
              <Link to={toggleLink} className="pm-login-card__toggle">
                {toggleLinkText}
              </Link>
            </p>
          </div>
        </div>

        {/* ── RIGHT: Value prop panel ── */}
        <div className="pm-login-content">
          <div className="pm-login-content__section">
            <h2>Why ProMatch?</h2>
            <p className="pm-login-content__lede">
              The fastest path from idea to team.
            </p>
            <ul className="pm-login-content__list">
              {features.map((f) => (
                <li key={f.icon}>
                  <span className="pm-login-feature-icon">{featureIcons[f.icon]}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pm-login-content__stat">
            <span className="pm-login-content__stat-number">94%</span>
            <span className="pm-login-content__stat-label">of users find a collaborator within 7 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
