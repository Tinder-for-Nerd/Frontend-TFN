import { cx } from '../../utils/helpers';

export function Card({ as: Component = 'section', className = '', interactive = false, children, ...props }) {
  return (
    <Component
      className={cx('pm-card', 'pm-ui-card', interactive && 'pm-ui-card--interactive', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={cx('pm-ui-card__header', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className = '', children, ...props }) {
  return (
    <div className={cx('pm-ui-card__body', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={cx('pm-ui-card__footer', className)} {...props}>
      {children}
    </div>
  );
}
