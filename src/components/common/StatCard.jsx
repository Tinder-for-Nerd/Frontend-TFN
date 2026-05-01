import { cx } from '../../utils/helpers';
import { Icon } from '../ui';

export function StatCard({ 
  value, 
  label, 
  detail, 
  spark = [], 
  accent = 'teal', 
  ring, 
  trend,
  className = '' 
}) {
  return (
    <article className={cx('pm-card pm-stat-card', className)}>
      <div className="pm-stat-card__content">
        <p className="pm-stat-card__label">{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <p className="pm-stat-card__value">{value}</p>
          {trend && (
            <div className={cx('pm-stat-trend', trend > 0 ? 'is-up' : 'is-down')}>
              <Icon name={trend > 0 ? 'arrow-up' : 'arrow-down'} size={12} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <p className="pm-stat-card__detail">{detail}</p>
      </div>
      {spark.length > 0 ? (
        <div className="pm-stat-card__visual">
          <div className={`pm-sparkline pm-sparkline--${accent}`}>
            {spark.map((v, i) => (
              <div key={i} style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      ) : null}
      {ring ? (
        <div className="pm-stat-card__visual">
          <div className={`pm-stat-ring pm-stat-ring--${accent}`} style={{ '--value': ring }}>
            <svg viewBox="0 0 36 36">
              <path className="pm-stat-ring__bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="pm-stat-ring__progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>
      ) : null}
    </article>
  );
}
