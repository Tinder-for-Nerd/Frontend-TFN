import { cx } from '../../utils/helpers';

export function Chip({ tone = 'muted', active = false, onClick, className = '', children }) {
  return (
    <button className={cx('pm-chip', `pm-chip--${tone}`, active && 'is-active', className)} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
