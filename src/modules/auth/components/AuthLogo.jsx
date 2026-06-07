import { Link } from 'react-router-dom';

export function AuthLogo({ to = '/' }) {
  return (
    <Link to={to} className="taskly-brand taskly-auth-brand" aria-label="Back to home">
      Tinder for Nerds
    </Link>
  );
}
