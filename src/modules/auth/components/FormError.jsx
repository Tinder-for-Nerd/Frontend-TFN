import { AlertIcon } from './AuthIcons';

export function FormError({ message, shakeKey = 0 }) {
  if (!message) return null;

  return (
    <div
      key={shakeKey}
      className="pm-login-form__error"
      role="alert"
      aria-live="polite"
    >
      <AlertIcon />
      <span>{message}</span>
    </div>
  );
}
