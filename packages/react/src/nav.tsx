'use client';

import * as React from 'react';
import { cx } from './glass';

/* -------------------------------------------------------------------------- *
 * Sidebar / rail
 * -------------------------------------------------------------------------- */

export function Nav({ className, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cx('wj-nav', className)} {...rest} />;
}

export type NavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  icon?: React.ReactNode;
  /** A count, a status dot, anything trailing. */
  trailing?: React.ReactNode;
};

export function NavItem({ active, icon, trailing, className, children, ...rest }: NavItemProps) {
  return (
    <a
      className={cx('wj-nav__item', className)}
      // `aria-current="page"` rather than a class alone: it is what tells a
      // screen reader which of twelve links is the one you are looking at.
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {icon && <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {trailing}
    </a>
  );
}

export function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="wj-nav__group wj-eyebrow">{label}</div>
      {children}
    </>
  );
}

/* -------------------------------------------------------------------------- *
 * Tabs
 * -------------------------------------------------------------------------- */

export type TabsProps<T extends string> = {
  value: T;
  onValueChange: (v: T) => void;
  tabs: Array<{ value: T; label: React.ReactNode; count?: number }>;
  label: string;
  className?: string;
};

export function Tabs<T extends string>({ value, onValueChange, tabs, label, className }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className={cx('wj-tabs', className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          tabIndex={t.value === value ? 0 : -1}
          className="wj-tabs__tab"
          onClick={() => onValueChange(t.value)}
        >
          {t.label}
          {t.count != null && (
            <span className="wj-badge" style={{ marginInlineStart: 'var(--wj-space-3)' }}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Tab bar — consumer surfaces
 * -------------------------------------------------------------------------- */

export type TabBarItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

/**
 * The bottom tab bar. Pane tier, glass, floating over the scrolling content —
 * this is the single most visible piece of Liquid Glass on the consumer
 * surfaces, so it is also the one that has to survive scrolling over a photo.
 */
export function TabBar({ items, active, className }: { items: TabBarItem[]; active: string; className?: string }) {
  return (
    <nav className={cx('wj-glass wj-tabbar', className)} data-tier="pane" aria-label="Main">
      {items.map((i) => {
        const Tag = (i.href ? 'a' : 'button') as React.ElementType;
        return (
          <Tag
            key={i.key}
            className="wj-tabbar__item"
            href={i.href}
            type={i.href ? undefined : 'button'}
            onClick={i.onClick}
            aria-current={i.key === active ? 'page' : undefined}
          >
            <span aria-hidden="true" style={{ display: 'inline-flex' }}>{i.icon}</span>
            {i.label}
          </Tag>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- *
 * Breadcrumbs
 * -------------------------------------------------------------------------- */

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="wj-crumbs" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((c, i) => (
          <li key={i} className="wj-row" style={{ gap: 'var(--wj-space-3)' }}>
            {i > 0 && (
              <span className="wj-crumbs__sep" aria-hidden="true">
                /
              </span>
            )}
            {c.href && i < items.length - 1 ? (
              <a href={c.href}>{c.label}</a>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
