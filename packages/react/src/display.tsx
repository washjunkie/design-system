'use client';

import * as React from 'react';
import { cx } from './glass';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

/* -------------------------------------------------------------------------- *
 * Badge
 * -------------------------------------------------------------------------- */

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  variant?: 'subtle' | 'solid';
  /**
   * Adds a coloured dot. Use it for anything whose meaning is carried by the
   * colour — an order status, a driver's availability — so the meaning survives
   * colour blindness, greyscale printing, and direct sunlight.
   */
  dot?: boolean;
};

export function Badge({ tone = 'neutral', variant = 'subtle', dot, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cx('wj-badge', className)}
      data-tone={tone === 'neutral' ? undefined : tone}
      data-variant={variant === 'solid' ? 'solid' : undefined}
      {...rest}
    >
      {dot && <span className="wj-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- *
 * Card
 * -------------------------------------------------------------------------- */

export function Card({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('wj-card', className)} {...rest} />;
}
export function CardHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('wj-card__header', className)} {...rest} />;
}
export function CardBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('wj-card__body', className)} {...rest} />;
}
export function CardFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('wj-card__footer', className)} {...rest} />;
}

/* -------------------------------------------------------------------------- *
 * Stat
 * -------------------------------------------------------------------------- */

export type StatProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: { value: React.ReactNode; direction: 'up' | 'down' | 'flat' };
  /**
   * Whether "up" is good. Revenue up is good; refunds up is not, and colouring
   * both green is how a dashboard quietly lies to an operator.
   */
  upIsGood?: boolean;
  className?: string;
};

export function Stat({ label, value, delta, upIsGood = true, className }: StatProps) {
  const tone =
    !delta || delta.direction === 'flat'
      ? 'flat'
      : (delta.direction === 'up') === upIsGood
        ? 'up'
        : 'down';
  return (
    <div className={cx('wj-stat', className)}>
      <span className="wj-stat__label">{label}</span>
      <span className="wj-stat__value">{value}</span>
      {delta && (
        <span className="wj-stat__delta" data-direction={tone}>
          <span aria-hidden="true">{delta.direction === 'up' ? '↑' : delta.direction === 'down' ? '↓' : '→'}</span>
          {delta.value}
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Avatar
 * -------------------------------------------------------------------------- */

export type AvatarProps = {
  name: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

/** Two letters, from the first and last word — "Ada Lovelace" → AL,
 *  "Sunshine Laundry Ikeja" → SI. Falls back to one letter for a single word. */
export const initials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
  return (first + last).toUpperCase();
};

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span className={cx('wj-avatar', className)} data-size={size === 'md' ? undefined : size} title={name}>
      {src ? <img src={src} alt="" /> : <span aria-hidden="true">{initials(name)}</span>}
      <span className="wj-sr-only">{name}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- *
 * Alert
 * -------------------------------------------------------------------------- */

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: Exclude<Tone, 'neutral' | 'accent'>;
  title?: React.ReactNode;
  icon?: React.ReactNode;
};

export function Alert({ tone = 'info', title, icon, className, children, ...rest }: AlertProps) {
  return (
    <div
      className={cx('wj-alert', className)}
      data-tone={tone}
      // A danger alert is an assertive announcement; the rest can wait for a
      // pause in speech. Getting this backwards either interrupts constantly or
      // silently swallows the one message that mattered.
      role={tone === 'danger' ? 'alert' : 'status'}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <div>
        {title && <div className="wj-alert__title">{title}</div>}
        {children && <div className="wj-alert__body">{children}</div>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Empty state
 * -------------------------------------------------------------------------- */

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Say what to do next. "No results" alone leaves someone stuck. */
  body?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cx('wj-empty', className)}>
      {icon && <div className="wj-empty__icon" aria-hidden="true">{icon}</div>}
      <h3 className="wj-title-sm">{title}</h3>
      {body && <p className="wj-body wj-muted">{body}</p>}
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Loading
 * -------------------------------------------------------------------------- */

export function Skeleton({
  width,
  height = 16,
  radius,
  className,
  style,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & { width?: number | string; height?: number | string; radius?: string }) {
  return (
    <span
      className={cx('wj-skeleton', className)}
      // Skeletons are decorative placeholders. Announcing them makes a screen
      // reader read "blank blank blank" while the page loads.
      aria-hidden="true"
      style={{ display: 'block', width: width ?? '100%', height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}

export function Spinner({ label = 'Loading', className }: { label?: string; className?: string }) {
  return (
    <span role="status" aria-label={label}>
      <span className={cx('wj-spinner', className)} aria-hidden="true" />
    </span>
  );
}

export function Progress({ value, max = 100, label }: { value: number; max?: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className="wj-progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div className="wj-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Divider({ className, ...rest }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cx('wj-divider', className)} {...rest} />;
}
