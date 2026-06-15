import { Link } from 'react-router-dom';
import { FormError } from './FormError';
import {
  EmailIcon,
  PasswordIcon,
  UserIcon,
  GoogleOAuthIcon,
  LinkedInLogo,
  SpinnerIcon,
  EyeIcon,
  EyeOffIcon,
} from './AuthIcons';

function AuthInputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  disabled,
  error,
  icon: Icon,
  inputRef,
  trailing,
}) {
  return (
    <div className={`pm-auth-form__field ${error ? 'has-error' : ''}`}>
      <div className="pm-auth-form__flex-column">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={`pm-auth-form__input-form ${error ? 'is-invalid' : ''}`}>
        {Icon ? <Icon /> : null}
        <input
          ref={inputRef}
          id={id}
          type={type}
          className="pm-auth-form__input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={!!error}
        />
        {trailing}
      </div>
      {error ? <span className="pm-auth-form__field-error">{error}</span> : null}
    </div>
  );
}

export function AuthCredentialForm({
  isSignup,
  isOrg,
  roleConfig,
  pageTitle,
  pageSubtitle,
  email,
  password,
  name,
  rememberMe,
  showPassword,
  loading,
  error,
  shakeKey,
  fieldErrors,
  getVisibleError,
  emailRef,
  submitLabel,
  signupHref,
  loginHref,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onRememberChange,
  onTogglePassword,
  onSubmit,
  onOAuth,
  markTouched,
}) {
  const emailLabel = isOrg ? 'Work email' : 'Email';
  const togglePrompt = isSignup
    ? 'Already have an account?'
    : (isOrg ? 'New organization?' : "Don't have an account?");
  const toggleLabel = isSignup ? 'Sign In' : (isOrg ? 'Apply for access' : 'Sign Up');
  const toggleHref = isSignup ? loginHref : signupHref;

  return (
    <form className="pm-auth-form" onSubmit={onSubmit} noValidate>
      <div className="pm-auth-form__intro">
        <span className="pm-auth-form__badge">
          {roleConfig.icon} {roleConfig.label}
        </span>
        <h1 className="pm-auth-form__title">{pageTitle}</h1>
        {pageSubtitle ? <p className="pm-auth-form__subtitle">{pageSubtitle}</p> : null}
      </div>

      <FormError message={error} shakeKey={shakeKey} className="pm-auth-form__error" />

      {isSignup ? (
        <AuthInputField
          id="name"
          label="Full name"
          value={name}
          onChange={onNameChange}
          onBlur={markTouched('name')}
          placeholder="Alex Kumar"
          autoComplete="name"
          disabled={loading}
          error={getVisibleError('name')}
          icon={UserIcon}
        />
      ) : null}

      <AuthInputField
        id="email"
        label={emailLabel}
        type="email"
        value={email}
        onChange={onEmailChange}
        onBlur={markTouched('email')}
        placeholder={roleConfig.emailPlaceholder || 'Enter your Email'}
        autoComplete="email"
        disabled={loading}
        error={getVisibleError('email')}
        icon={EmailIcon}
        inputRef={emailRef}
      />

      <AuthInputField
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={onPasswordChange}
        onBlur={markTouched('password')}
        placeholder="Enter your Password"
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        disabled={loading}
        error={getVisibleError('password')}
        icon={PasswordIcon}
        trailing={
          <button
            type="button"
            className="pm-auth-form__eye"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />

      {!isSignup ? (
        <div className="pm-auth-form__flex-row">
          <label className="pm-auth-form__remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={onRememberChange}
            />
            <span>Remember me</span>
          </label>
          <button type="button" className="pm-auth-form__link" onClick={(event) => event.preventDefault()}>
            Forgot password?
          </button>
        </div>
      ) : null}

      <button type="submit" className="pm-auth-form__submit" disabled={loading}>
        {loading ? (
          <>
            <SpinnerIcon />
            <span>{isSignup ? 'Creating account…' : 'Signing in…'}</span>
          </>
        ) : (
          submitLabel
        )}
      </button>

      <p className="pm-auth-form__toggle">
        {togglePrompt}{' '}
        <Link to={toggleHref} className="pm-auth-form__link">
          {toggleLabel}
        </Link>
      </p>

      <p className="pm-auth-form__line">Or With</p>

      <div className="pm-auth-form__oauth-row">
        <button
          type="button"
          className="pm-auth-form__oauth-btn"
          onClick={() => onOAuth('google')}
          disabled={loading}
        >
          <GoogleOAuthIcon />
          Google
        </button>
        <button
          type="button"
          className="pm-auth-form__oauth-btn pm-auth-form__oauth-btn--linkedin"
          onClick={() => onOAuth('linkedin')}
          disabled={loading}
        >
          <LinkedInLogo />
          LinkedIn
        </button>
      </div>
    </form>
  );
}
