import { forwardRef } from 'react';
import { cx } from '../../utils/helpers';

export const Input = forwardRef(function Input(
  { label, hint, error, className = '', inputClassName = '', id, ...props },
  ref,
) {
  const inputId = id || props.name;

  return (
    <label className={cx('pm-field', className)} htmlFor={inputId}>
      {label ? <span className="pm-field__label">{label}</span> : null}
      <input
        ref={ref}
        id={inputId}
        className={cx('pm-input', error && 'is-invalid', inputClassName)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="pm-field__error">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="pm-field__hint">
          {hint}
        </span>
      ) : null}
    </label>
  );
});
