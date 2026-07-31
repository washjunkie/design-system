'use client';

import * as React from 'react';
import { cx } from './glass';

/**
 * Field owns the wiring that gets forgotten by hand: a real <label for>, an
 * `aria-describedby` that points at the help text AND the error, and
 * `aria-invalid` on the control. Wrapping an input in Field is how it becomes
 * accessible without anyone remembering to make it so.
 */
export type FieldProps = {
  label: React.ReactNode;
  help?: React.ReactNode;
  error?: React.ReactNode;
  optional?: boolean;
  id?: string;
  className?: string;
  children: (props: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }) => React.ReactNode;
};

export function Field({ label, help, error, optional, id: idProp, className, children }: FieldProps) {
  const auto = React.useId();
  const id = idProp ?? auto;
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('wj-field', className)}>
      <label className="wj-field__label" htmlFor={id} data-optional={optional ? 'true' : undefined}>
        {label}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {help && !error && (
        <p id={helpId} className="wj-field__help">
          {help}
        </p>
      )}
      {/* `role="alert"` so the message is announced when it appears after a
          failed submit, not only when focus happens to land on the input. */}
      {error && (
        <p id={errorId} className="wj-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cx('wj-input', className)} {...rest} />;
  }
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cx('wj-textarea', className)} {...rest} />;
  }
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select ref={ref} className={cx('wj-select', className)} {...rest}>
        {children}
      </select>
    );
  }
);

export type InputGroupProps = {
  start?: React.ReactNode;
  end?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function InputGroup({ start, end, children, className }: InputGroupProps) {
  return (
    <div className={cx('wj-input-group', className)}>
      {start && (
        <span className="wj-input-group__affix" data-side="start" aria-hidden="true">
          {start}
        </span>
      )}
      {children}
      {end && (
        <span className="wj-input-group__affix" data-side="end" aria-hidden="true">
          {end}
        </span>
      )}
    </div>
  );
}

export type CheckProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  help?: React.ReactNode;
};

export function Checkbox({ label, help, className, ...rest }: CheckProps) {
  return (
    <label className={cx('wj-check', className)}>
      <input type="checkbox" {...rest} />
      <span>
        <span className="wj-check__text">{label}</span>
        {help && <span className="wj-check__help">{help}</span>}
      </span>
    </label>
  );
}

export function Radio({ label, help, className, ...rest }: CheckProps) {
  return (
    <label className={cx('wj-check', className)}>
      <input type="radio" {...rest} />
      <span>
        <span className="wj-check__text">{label}</span>
        {help && <span className="wj-check__help">{help}</span>}
      </span>
    </label>
  );
}
