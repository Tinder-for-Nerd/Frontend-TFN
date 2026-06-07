import { useNavigate } from 'react-router-dom';

export function RoleCard({ icon, title, subtitle, tags, href }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="pm-role-card"
      onClick={() => navigate(href)}
    >
      <span className="pm-role-card__icon" aria-hidden="true">{icon}</span>
      <span className="pm-role-card__title">{title}</span>
      <span className="pm-role-card__subtitle">{subtitle}</span>
      {tags?.length ? (
        <span className="pm-role-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="pm-role-card__tag">{tag}</span>
          ))}
        </span>
      ) : null}
    </button>
  );
}
