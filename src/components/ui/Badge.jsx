import { cx } from '../../utils/helpers';

export function Badge({ tone = 'muted', className = '', children }) {
  return <span className={cx('pm-badge', `pm-badge--${tone}`, className)}>{children}</span>;
}
