import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cx } from '../../utils/helpers';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast) => {
      const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const nextToast = { tone: 'info', timeout: 3600, ...toast, id };
      setToasts((items) => [nextToast, ...items].slice(0, 4));
      if (nextToast.timeout) {
        window.setTimeout(() => dismiss(id), nextToast.timeout);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ showToast, dismiss }), [dismiss, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pm-toast-region" aria-live="polite" aria-label="Notifications">
        {toasts.map((toast) => (
          <button
            key={toast.id}
            type="button"
            className={cx('pm-toast', `pm-toast--${toast.tone}`)}
            onClick={() => dismiss(toast.id)}
          >
            {toast.title ? <strong>{toast.title}</strong> : null}
            {toast.message ? <span>{toast.message}</span> : null}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
