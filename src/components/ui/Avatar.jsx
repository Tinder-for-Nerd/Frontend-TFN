import { cx } from '../../utils/helpers';

export function Avatar({ name, initials, src, size = 'md', tone = 'violet', online = false, className = '' }) {
  return (
    <span className={cx('pm-avatar', `pm-avatar--${size}`, `pm-avatar--${tone}`, className)}>
      {src ? (
        <img src={src} alt={name} className="pm-avatar__img" />
      ) : (
        <span>{initials}</span>
      )}
      {online ? <span className="pm-avatar__dot" aria-hidden="true" /> : null}
    </span>
  );
}
