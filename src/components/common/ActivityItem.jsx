import { cx } from '../../utils/helpers';
import { Icon } from '../ui';

export function ActivityItem({ icon, title, meta, unread = false }) {
  return (
    <div className={cx('pm-activity-item', unread && 'is-unread')}>
      <span className="pm-activity-item__icon">
        <Icon name={icon} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{meta}</p>
      </div>
    </div>
  );
}
