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
import { AuthCredentialForm } from '../components/AuthCredentialForm';
import { StudentVisualPanel } from '../components/StudentVisualPanel';
import { ProfessionalVisualPanel } from '../components/ProfessionalVisualPanel';
import { OrganizationVisualStrip } from '../components/OrganizationVisualPanel';
import '../../../styles/login.css';

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
    : 'Sign In';

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
      const providerLabel = provider === 'apple' ? 'Apple' : provider === 'linkedin' ? 'LinkedIn' : 'Google';
      handleAuthFailure(`${providerLabel} sign-in failed. Try email instead.`);
    } finally {
      setLoading(false);
    }
  };

  const signupHref = roleConfig.signupHref;
  const loginHref = roleConfig.toggleLogin;

  const formCard = (
    <div className="pm-login-card pm-login-card--uiverse">
      <motion.div
        key={shakeKey}
        animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AuthCredentialForm
          isSignup={isSignup}
          isOrg={isOrg}
          roleConfig={roleConfig}
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
          email={email}
          password={password}
          name={name}
          rememberMe={rememberMe}
          showPassword={showPassword}
          loading={loading}
          error={error}
          shakeKey={shakeKey}
          fieldErrors={fieldErrors}
          getVisibleError={getVisibleError}
          emailRef={emailRef}
          submitLabel={submitLabel}
          signupHref={signupHref}
          loginHref={loginHref}
          onEmailChange={(event) => setEmail(event.target.value)}
          onPasswordChange={(event) => setPassword(event.target.value)}
          onNameChange={(event) => setName(event.target.value)}
          onRememberChange={(event) => setRememberMe(event.target.checked)}
          onTogglePassword={() => setShowPassword((value) => !value)}
          onSubmit={handleSubmit}
          onOAuth={handleOAuth}
          markTouched={markTouched}
        />
      </motion.div>

      <p className="pm-login-card__back-link">
        <Link to="/login" className="taskly-workspace-link">← Back to role select</Link>
      </p>
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
