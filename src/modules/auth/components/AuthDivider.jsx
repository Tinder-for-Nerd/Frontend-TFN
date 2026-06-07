export function AuthDivider({ label = 'Or continue with' }) {
  return (
    <div className="pm-login-card__divider">
      <span>{label}</span>
    </div>
  );
}
