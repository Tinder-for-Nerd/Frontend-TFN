export function SectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="pm-section-header">
      <div className="pm-section-header__content">
        {eyebrow ? <p className="pm-kicker">{eyebrow}</p> : null}
        {title ? <h2>{title}</h2> : null}
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="pm-section-header__actions">{actions}</div> : null}
    </div>
  );
}
