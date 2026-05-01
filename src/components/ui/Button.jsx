import { Link } from 'react-router-dom';
import { cx } from '../../utils/helpers';
import { Icon } from './Icon';

export function Button({ to, href, variant = 'primary', size = 'md', icon, className = '', type = 'button', children, ...props }) {
  const classes = cx('pm-button', `pm-button--${variant}`, `pm-button--${size}`, className);
  const hasLabel = children !== undefined && children !== null && children !== '';
  const content = (
    <>
      {icon ? <Icon name={icon} className="pm-button__icon" /> : null}
      {hasLabel ? <span>{children}</span> : null}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}
