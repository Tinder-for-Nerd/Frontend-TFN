import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';

export default function LoginForm({ mode = 'login' }) {
  const navigate = useNavigate();
  const isSignup = mode === 'signup';
  const [accountType, setAccountType] = useState('student');
  const { error, formState, isSubmitting, submitEmail, submitProvider, updateField } = useAuth(mode);

  const dashboardRoute = accountType === 'professional' ? '/pro/overview' : '/student/home';
  const dashboardLabel = accountType === 'professional' ? 'Professional dashboard' : 'Student dashboard';

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      await submitEmail({ role: accountType });
      navigate(dashboardRoute);
    } catch {
      // Error state is handled by the hook.
    }
  };

  const handleProviderSubmit = async (provider) => {
    try {
      await submitProvider(provider, { role: accountType });
      navigate(dashboardRoute);
    } catch {
      // Error state is handled by the hook.
    }
  };

  return (
    <>
      <div>
        <p className="pm-kicker">Account access</p>
        <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        <p className="pm-muted">Continue with Google or LinkedIn, or use your email to finish the flow.</p>
      </div>

      <div className="pm-auth-tabs" role="tablist" aria-label="Authentication mode">
        <Link className={`pm-auth-tab ${!isSignup ? 'is-active' : ''}`} to="/login" role="tab" aria-selected={!isSignup}>
          Log in
        </Link>
        <Link className={`pm-auth-tab ${isSignup ? 'is-active' : ''}`} to="/signup" role="tab" aria-selected={isSignup}>
          Sign up
        </Link>
      </div>

      <div className="pm-field">
        <span>Choose your dashboard</span>
        <div className="pm-chip-row pm-chip-row--wide" role="group" aria-label="Dashboard type">
          <button
            className={`pm-chip pm-chip--teal ${accountType === 'student' ? 'is-active' : ''}`}
            type="button"
            aria-pressed={accountType === 'student'}
            onClick={() => setAccountType('student')}
          >
            Student
          </button>
          <button
            className={`pm-chip pm-chip--violet ${accountType === 'professional' ? 'is-active' : ''}`}
            type="button"
            aria-pressed={accountType === 'professional'}
            onClick={() => setAccountType('professional')}
          >
            Professional
          </button>
        </div>
        <small>{`You will be sent to the ${dashboardLabel}.`}</small>
      </div>

      <div className="pm-oauth-grid">
        <button className="pm-oauth-button pm-oauth-button--google" type="button" onClick={() => handleProviderSubmit('google')}>
          <span className="pm-oauth-button__mark" aria-hidden="true">
            G
          </span>
          <span>Continue with Google</span>
        </button>
        <button className="pm-oauth-button pm-oauth-button--linkedin" type="button" onClick={() => handleProviderSubmit('linkedin')}>
          <span className="pm-oauth-button__mark" aria-hidden="true">
            in
          </span>
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      <div className="pm-divider">
        <span>or continue with email</span>
      </div>

      <form className="pm-form" onSubmit={handleEmailSubmit}>
        {isSignup ? (
          <label className="pm-field">
            <span>Full name</span>
            <input
              className="pm-input"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={formState.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              required
            />
          </label>
        ) : null}

        <label className="pm-field">
          <span>Email</span>
          <input
            className="pm-input"
            type="email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={formState.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />
        </label>

        <label className="pm-field">
          <span>Password</span>
          <input
            className="pm-input"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            placeholder="Enter your password"
            value={formState.password}
            onChange={(event) => updateField('password', event.target.value)}
            required
          />
        </label>

        {error ? <p className="pm-auth-error">{error}</p> : null}

        <button className="pm-button pm-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : `Continue to ${dashboardLabel}`}
        </button>
      </form>

      <div className="pm-auth-panel__foot">
        <p>
          {isSignup ? 'Already have an account?' : 'New here?'} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Switch to log in' : 'Switch to sign up'}</Link>
        </p>
        <div className="pm-auth-links">
          <a href="#faq">Privacy</a>
          <a href="#faq">Terms</a>
        </div>
      </div>
    </>
  );
}
