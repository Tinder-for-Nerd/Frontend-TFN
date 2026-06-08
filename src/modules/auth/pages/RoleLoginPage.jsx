import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import {
  getRoleByPath,
  getDashboardForRole,
  validateLoginForm,
} from '../authConfig';
import { AuthShell } from '../components/AuthShell';
import { AuthLogo } from '../components/AuthLogo';
import { AuthDivider } from '../components/AuthDivider';
import { FormError } from '../components/FormError';
import { OAuthButtonGroup } from '../components/OAuthButton';
import { PasswordField } from '../components/PasswordField';
import { StudentVisualPanel } from '../components/StudentVisualPanel';
import { ProfessionalVisualPanel } from '../components/ProfessionalVisualPanel';
import { OrganizationVisualStrip } from '../components/OrganizationVisualPanel';
import { LockIcon, SpinnerIcon } from '../components/AuthIcons';
import '../../../styles/login.css';

const formItem = {
  hidden: { opacity: 0, y: 16 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function RoleLoginPage({ mode = 'login' }) {
  const { rolePath } = useParams();
  const roleConfig = getRoleByPath(rolePath);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const emailRef = useRef(null);

  const isSignup = mode === 'signup';
  const isOrg = roleConfig.id === 'org';

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardForRole(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const pageTitle = isSignup ? roleConfig.signupTitle : roleConfig.loginTitle;
  const pageSubtitle = isSignup ? roleConfig.signupSubtitle : roleConfig.loginSubtitle;
  const submitLabel = isSignup
    ? (isOrg ? 'Apply for access' : 'Create account')
    : 'Sign in';

  useEffect(() => {
    emailRef.current?.focus();
  }, [roleConfig.id]);

  const markTouched = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const getVisibleError = (field) => (touched[field] ? fieldErrors[field] : '');

  const completeAuth = async ({ firstLogin = false } = {}) => {
    const destination = firstLogin
      ? roleConfig.onboarding
      : (location.state?.from?.pathname || roleConfig.dashboard);

    login({
      email,
      name: name || email.split('@')[0],
      role: roleConfig.id,
      firstLogin,
    });

    navigate(destination, { replace: true });
  };

  const handleAuthFailure = (message) => {
    setError(message);
    setShakeKey((key) => key + 1);
  };

  const runMockAuth = async (options = {}) => {
    setLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (email.toLowerCase().includes('fail')) {
        handleAuthFailure('Incorrect password. Try again or reset it.');
        return;
      }

      if (email.toLowerCase().includes('missing')) {
        handleAuthFailure('No account found. Would you like to sign up?');
        return;
      }

      await completeAuth({ firstLogin: options.firstLogin ?? isSignup });
    } catch (err) {
      handleAuthFailure(err.message || 'Connection issue. Check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateLoginForm({ email, password, name, isSignup });
    setFieldErrors(errors);
    setTouched({ email: true, password: true, name: true });

    if (Object.keys(errors).length > 0) {
      handleAuthFailure('Please fill in all fields correctly');
      return;
    }

    await runMockAuth({ firstLogin: isSignup });
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      login({
        email: email || `${provider}.user@promatch.dev`,
        name: name || `${provider} User`,
        role: roleConfig.id,
        firstLogin: isSignup,
      });
      const destination = isSignup
        ? roleConfig.onboarding
        : (location.state?.from?.pathname || roleConfig.dashboard);
      navigate(destination, { replace: true });
    } catch (err) {
      handleAuthFailure(`${provider === 'linkedin' ? 'LinkedIn' : 'Google'} sign-in failed. Try email instead.`);
    } finally {
      setLoading(false);
    }
  };

  const oauthLayout = roleConfig.oauthOrder.length === 1 ? 'stack' : 'grid';
  const dividerLabel = isOrg ? 'or use work email' : 'Or continue with';
  const signupHref = roleConfig.signupHref;
  const loginHref = roleConfig.toggleLogin;

  const formCard = (
    <div className={`pm-login-card ${isOrg ? 'pm-login-card--org' : ''}`}>
      <div className="pm-login-card__header">
        <AuthLogo to="/" />
        {isOrg ? (
          <span className="pm-login-card__badge">{roleConfig.icon} Organization</span>
        ) : (
          <span className="pm-login-card__badge">{roleConfig.icon} {roleConfig.label}</span>
        )}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="pm-login-form"
        noValidate
        key={shakeKey}
        animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="pm-login-form__intro" custom={0} variants={formItem} initial="hidden" animate="show">
          <h1 className="pm-login-form__title">{pageTitle}</h1>
          <p className="pm-login-form__subtitle">{pageSubtitle}</p>
          {!isOrg ? <p className="pm-login-form__tagline">{roleConfig.tagline}</p> : null}
        </motion.div>

        <FormError message={error} shakeKey={shakeKey} />

        <motion.div custom={1} variants={formItem} initial="hidden" animate="show">
          <OAuthButtonGroup
            providers={roleConfig.oauthOrder}
            onProviderClick={handleOAuth}
            disabled={loading}
            layout={oauthLayout}
          />
        </motion.div>

        <motion.div custom={2} variants={formItem} initial="hidden" animate="show">
          <AuthDivider label={dividerLabel} />
        </motion.div>

        {isSignup ? (
          <motion.div className={`pm-login-form__group ${getVisibleError('name') ? 'has-error' : ''}`} custom={3} variants={formItem} initial="hidden" animate="show">
            <label htmlFor="name" className="pm-login-form__label">Full name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className={`pm-login-form__input ${getVisibleError('name') ? 'is-invalid' : ''}`}
              placeholder="Alex Kumar"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={markTouched('name')}
              disabled={loading}
            />
            {getVisibleError('name') ? (
              <span className="pm-login-form__field-error">{getVisibleError('name')}</span>
            ) : null}
          </motion.div>
        ) : null}

        <motion.div className={`pm-login-form__group ${getVisibleError('email') ? 'has-error' : ''}`} custom={4} variants={formItem} initial="hidden" animate="show">
          <label htmlFor="email" className="pm-login-form__label">{isOrg ? 'Work email' : 'Email'}</label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            autoComplete="email"
            className={`pm-login-form__input ${getVisibleError('email') ? 'is-invalid' : ''}`}
            placeholder={roleConfig.emailPlaceholder || 'you@example.com'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={markTouched('email')}
            disabled={loading}
            aria-invalid={!!getVisibleError('email')}
          />
          {getVisibleError('email') ? (
            <span className="pm-login-form__field-error">{getVisibleError('email')}</span>
          ) : null}
        </motion.div>

        <motion.div custom={5} variants={formItem} initial="hidden" animate="show">
          <PasswordField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={markTouched('password')}
            error={getVisibleError('password')}
            showForgot={!isSignup}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword((value) => !value)}
            disabled={loading}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </motion.div>

        {!isSignup ? (
          <motion.label className="pm-login-form__remember" custom={6} variants={formItem} initial="hidden" animate="show">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span className="pm-login-form__checkbox-mark" />
            <span>Remember me</span>
          </motion.label>
        ) : null}

        <motion.button
          type="submit"
          className="pm-login-form__button"
          disabled={loading}
          custom={7}
          variants={formItem}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            <>
              <SpinnerIcon />
              <span>{isSignup ? 'Creating account…' : 'Signing in…'}</span>
            </>
          ) : (
            submitLabel
          )}
        </motion.button>

        <p className="pm-login-form__secure">
          <LockIcon />
          <span>Your data is encrypted and secure</span>
        </p>
      </motion.form>

      <div className="pm-login-card__footer">
        <p>
          {isSignup ? 'Already have an account?' : (isOrg ? 'New organization?' : "Don't have an account?")}{' '}
          <Link to={isSignup ? loginHref : signupHref} className="taskly-workspace-link">
            {isSignup ? 'Sign in' : roleConfig.signupLink}
          </Link>
        </p>
        <p className="pm-login-card__back-link">
          <Link to="/login" className="taskly-workspace-link">← Back to role select</Link>
        </p>
      </div>
    </div>
  );

  return (
    <AuthShell>
      <section className={`taskly-auth-hero ${isOrg ? 'taskly-auth-hero--org' : ''}`}>
        <div className={`taskly-auth-hero__inner ${isOrg ? 'taskly-auth-hero__inner--org' : ''}`}>
          {formCard}
          {!isOrg ? (
            roleConfig.id === 'student' ? <StudentVisualPanel /> : <ProfessionalVisualPanel />
          ) : null}
        </div>
        {isOrg ? <OrganizationVisualStrip /> : null}
      </section>
    </AuthShell>
  );
}
