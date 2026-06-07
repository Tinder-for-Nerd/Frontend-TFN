import { EyeIcon, EyeOffIcon } from './AuthIcons';

export function PasswordField({
  id = 'password',
  label = 'Password',
  value,
  onChange,
  onBlur,
  error,
  showForgot = false,
  showPassword,
  onToggleShow,
  disabled = false,
  autoComplete = 'current-password',
}) {
  return (
    <div className={`pm-login-form__group ${error ? 'has-error' : ''}`}>
      <div className="pm-login-form__label-row">
        <label htmlFor={id} className="pm-login-form__label">{label}</label>
        {showForgot ? (
          <a href="#forgot" className="pm-login-form__forgot" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        ) : null}
      </div>
      <div className="pm-login-form__input-wrap">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={`pm-login-form__input ${error ? 'is-invalid' : ''}`}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="pm-login-form__eye"
          onClick={onToggleShow}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error ? (
        <span id={`${id}-error`} className="pm-login-form__field-error">{error}</span>
      ) : null}
    </div>
  );
}
