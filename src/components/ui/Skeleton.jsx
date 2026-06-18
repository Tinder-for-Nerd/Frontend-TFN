import { cx } from '../../utils/helpers';

export function Skeleton({ className = '', width, height, rounded = 'md', ...props }) {
  return (
    <span
      className={cx('pm-skeleton-line', `pm-skeleton-line--${rounded}`, className)}
      style={{ width, height, ...props.style }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonCard({ rows = 3, className = '' }) {
  return (
    <div className={cx('pm-skeleton-card', className)} aria-busy="true" aria-live="polite">
      <Skeleton width="46%" height={18} />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} width={index === rows - 1 ? '62%' : '100%'} height={12} />
      ))}
    </div>
  );
}
