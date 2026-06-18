import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cx } from '../../utils/helpers';
import { Button } from './Button';

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  className = '',
}) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="pm-modal" role="presentation" onMouseDown={onClose}>
      <section
        className={cx('pm-modal__panel', className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="pm-modal__header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close modal" onClick={onClose}>
            <X size={18} />
          </Button>
        </header>
        <div className="pm-modal__body">{children}</div>
        {footer ? <footer className="pm-modal__footer">{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  );
}
