import { AlertIcon } from './AuthIcons';

export function FormError({ message, shakeKey = 0, className = 'pm-login-form__error' }) {
  if (!message) return null;

  return (
    <div
      key={shakeKey}
      className={className}
      role="alert"
      aria-live="polite"
    >
      <AlertIcon />
      <span>{message}</span>
    </div>
  );
}
