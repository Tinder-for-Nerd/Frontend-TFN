import { Link } from 'react-router-dom';
import { cx } from '../../utils/helpers';

export function Brand({ compact = false, className = '', href = '/' }) {
  return (
    <Link className={cx('pm-brand', compact && 'is-compact', className)} to={href} aria-label="ProMatch home">
      <span className="pm-brand__mark" aria-hidden="true">
        PM
      </span>
      <span className="pm-brand__copy">
        <strong>ProMatch</strong>
        <span>Ambitious precision</span>
      </span>
    </Link>
  );
}
