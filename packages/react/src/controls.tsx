'use client';

import * as React from 'react';
import { cx } from './glass';

/* -------------------------------------------------------------------------- *
 * Button
 * -------------------------------------------------------------------------- */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'subtle'
  | 'danger'
  | 'danger-ghost'
  | 'glass';
export type ControlSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ControlSize;
  full?: boolean;
  loading?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', full, loading, iconStart, iconEnd, className, children, disabled, type, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      // Buttons inside a form default to `submit` in HTML, which is how a
      // "Cancel" next to a text input ends up submitting the form on Enter.
      type={type ?? 'button'}
      className={cx('wj-btn', className)}
      data-variant={variant}
      data-size={size}
      data-full={full ? 'true' : undefined}
      data-loading={loading ? 'true' : undefined}
      disabled={disabled || loading}
      // `aria-busy` is what actually tells a screen reader the control is
      // working; the spinner is only visible feedback.
      aria-busy={loading || undefined}
      {...rest}
    >
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </button>
  );
});

export type IconButtonProps = Omit<ButtonProps, 'iconStart' | 'iconEnd' | 'full'> & {
  /** Required. An icon button with no accessible name is an unlabelled control. */
  label: string;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', size = 'md', label, className, children, type, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cx('wj-btn', className)}
      data-variant={variant}
      data-size={size}
      data-icon-only="true"
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  );
});

/* -------------------------------------------------------------------------- *
 * Switch
 * -------------------------------------------------------------------------- */

export type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
  /** Renders the label visibly beside the switch instead of only to AT. */
  showLabel?: boolean;
};

export function Switch({ checked, onCheckedChange, label, showLabel, className, ...rest }: SwitchProps) {
  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={showLabel ? undefined : label}
      className={cx('wj-switch', className)}
      onClick={() => onCheckedChange(!checked)}
      {...rest}
    />
  );
  if (!showLabel) return control;
  return (
    <label className="wj-row" style={{ gap: 'var(--wj-space-5)', cursor: 'pointer' }}>
      {control}
      <span className="wj-label">{label}</span>
    </label>
  );
}

/* -------------------------------------------------------------------------- *
 * Segmented control
 * -------------------------------------------------------------------------- */

export type SegmentedProps<T extends string> = {
  value: T;
  onValueChange: (next: T) => void;
  options: Array<{ value: T; label: React.ReactNode }>;
  /** Announced to screen readers as the group's purpose, e.g. "Time range". */
  label: string;
  className?: string;
};

export function Segmented<T extends string>({ value, onValueChange, options, label, className }: SegmentedProps<T>) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  // Arrow keys move between segments; that is the expected behaviour for a
  // tablist-shaped control and the only way to use it without a mouse.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = options.findIndex((o) => o.value === value);
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + options.length) % options.length;
    onValueChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={cx('wj-segmented', className)} onKeyDown={onKeyDown}>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => { refs.current[i] = el; }}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          className="wj-segmented__item"
          onClick={() => onValueChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Chip
 * -------------------------------------------------------------------------- */

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  onRemove?: () => void;
};

export function Chip({ selected, onRemove, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cx('wj-chip', className)}
      aria-pressed={selected}
      {...rest}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          tabIndex={-1}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{ display: 'inline-flex', opacity: 0.6 }}
        >
          ×
        </span>
      )}
    </button>
  );
}
