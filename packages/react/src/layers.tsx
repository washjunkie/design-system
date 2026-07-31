'use client';

import * as React from 'react';
import { cx } from './glass';

/**
 * Every floating layer in the system.
 *
 * Modal and Sheet are built on the native <dialog> element rather than a
 * portal-plus-div, because `showModal()` gives us the four things that are
 * tedious and easy to get wrong by hand: a focus trap, Escape-to-close,
 * inert background content, and the top layer — which means no z-index
 * arithmetic against whatever else is on screen.
 */

/* -------------------------------------------------------------------------- *
 * Shared dialog behaviour
 * -------------------------------------------------------------------------- */

function useNativeDialog(open: boolean, onClose: () => void) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fires for Escape and for form method="dialog" as well as our own close,
    // so routing all of them through one handler keeps React's state in sync
    // with what the browser has already done to the DOM.
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener('cancel', onCancel);
    return () => el.removeEventListener('cancel', onCancel);
  }, [onClose]);

  return ref;
}

/** Click-outside for a native dialog: the backdrop is part of the dialog's own
 *  box, so a click whose target *is* the dialog element landed on the backdrop. */
const backdropClick = (onClose: () => void) => (e: React.MouseEvent<HTMLDialogElement>) => {
  if (e.target === e.currentTarget) onClose();
};

/* -------------------------------------------------------------------------- *
 * Modal
 * -------------------------------------------------------------------------- */

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Closing costs the user work (unsaved input) — require an explicit choice. */
  dismissible?: boolean;
  className?: string;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  dismissible = true,
  className,
}: ModalProps) {
  const ref = useNativeDialog(open, onClose);
  const titleId = React.useId();
  const descId = React.useId();

  return (
    <dialog
      ref={ref}
      className={cx('wj-glass wj-modal wj-enter-shell', className)}
      data-tier="shell"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClick={dismissible ? backdropClick(onClose) : undefined}
      onCancel={dismissible ? undefined : (e) => e.preventDefault()}
    >
      <div className="wj-stack">
        <div className="wj-stack" data-gap="sm">
          <h2 id={titleId} className="wj-title">
            {title}
          </h2>
          {description && (
            <p id={descId} className="wj-body wj-muted">
              {description}
            </p>
          )}
        </div>
        {children}
        {footer && (
          <div className="wj-row" data-justify="between">
            <span className="wj-spacer" />
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

/* -------------------------------------------------------------------------- *
 * Sheet
 * -------------------------------------------------------------------------- */

export type SheetProps = Omit<ModalProps, 'footer'> & {
  /** `bottom` for touch surfaces, `end` for the console's detail pane. */
  side?: 'bottom' | 'end';
};

export function Sheet({ open, onClose, title, description, children, side = 'bottom', className }: SheetProps) {
  const ref = useNativeDialog(open, onClose);
  const titleId = React.useId();

  return (
    <dialog
      ref={ref}
      className={cx('wj-glass wj-sheet wj-enter-sheet', className)}
      data-tier="shell"
      data-side={side === 'end' ? 'end' : undefined}
      aria-labelledby={titleId}
      onClick={backdropClick(onClose)}
    >
      {side === 'bottom' && <div className="wj-sheet__handle" aria-hidden="true" />}
      <div className="wj-stack">
        <div className="wj-stack" data-gap="sm">
          <h2 id={titleId} className="wj-title">
            {title}
          </h2>
          {description && <p className="wj-body wj-muted">{description}</p>}
        </div>
        {children}
      </div>
    </dialog>
  );
}

/* -------------------------------------------------------------------------- *
 * Popover / Menu
 * -------------------------------------------------------------------------- */

export type PopoverProps = {
  trigger: React.ReactElement<{ ref?: React.Ref<HTMLElement>; onClick?: (e: React.MouseEvent) => void; 'aria-expanded'?: boolean; 'aria-haspopup'?: boolean }>;
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
};

export function Popover({ trigger, children, align = 'start', className }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    // `capture` so a stopPropagation inside the popover's own content can't
    // strand it open.
    document.addEventListener('mousedown', onDoc, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} style={{ position: 'relative', display: 'inline-flex' }}>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          setOpen((o) => !o);
        },
        'aria-expanded': open,
        'aria-haspopup': true,
      })}
      {open && (
        <div
          className={cx('wj-glass wj-popover wj-enter-shell', className)}
          data-tier="shell"
          style={{
            top: 'calc(100% + var(--wj-space-3))',
            [align === 'end' ? 'right' : 'left']: 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Menu({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="menu" className={cx('wj-menu', className)} {...rest} />;
}

export function MenuItem({
  tone,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'danger' }) {
  return (
    <button type="button" role="menuitem" className={cx('wj-menu__item', className)} data-tone={tone} {...rest} />
  );
}

export function MenuSeparator() {
  return <div className="wj-menu__sep" role="separator" />;
}

/* -------------------------------------------------------------------------- *
 * Toast
 * -------------------------------------------------------------------------- */

export type ToastData = {
  id: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  /** ms. Null keeps it until dismissed — for anything the user must act on. */
  duration?: number | null;
  action?: { label: string; onClick: () => void };
};

const ToastCtx = React.createContext<((t: Omit<ToastData, 'id'>) => void) | null>(null);
export const useToast = () => {
  const push = React.useContext(ToastCtx);
  if (!push) throw new Error('useToast must be used inside <ToastProvider>');
  return push;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastData[]>([]);
  const seq = React.useRef(0);

  const push = React.useCallback((t: Omit<ToastData, 'id'>) => {
    const id = `t${seq.current++}`;
    setItems((xs) => [...xs, { ...t, id }]);
    const duration = t.duration === undefined ? 5000 : t.duration;
    if (duration !== null) {
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), duration);
    }
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      {/* aria-live on a container that exists from the start: a live region
          added at the same moment as its content is frequently not announced. */}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          insetInlineEnd: 'var(--wj-space-6)',
          bottom: 'calc(var(--wj-space-6) + env(safe-area-inset-bottom))',
          zIndex: 'var(--wj-z-toast)' as unknown as number,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--wj-space-4)',
          pointerEvents: 'none',
        }}
      >
        {items.map((t) => (
          <div
            key={t.id}
            className="wj-glass wj-toast wj-enter-shell"
            data-tier="shell"
            data-tint={t.tone && t.tone !== 'neutral' ? t.tone : undefined}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="wj-stack" data-gap="sm" style={{ flex: 1 }}>
              <strong className="wj-label">{t.title}</strong>
              {t.body && <span className="wj-caption">{t.body}</span>}
            </div>
            {t.action && (
              <button type="button" className="wj-btn" data-variant="ghost" data-size="sm" onClick={t.action.onClick}>
                {t.action.label}
              </button>
            )}
            <button
              type="button"
              className="wj-btn"
              data-variant="ghost"
              data-size="sm"
              data-icon-only="true"
              aria-label="Dismiss"
              onClick={() => setItems((xs) => xs.filter((x) => x.id !== t.id))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* -------------------------------------------------------------------------- *
 * Command palette
 * -------------------------------------------------------------------------- */

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group?: string;
  onSelect: () => void;
};

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Search orders, customers, settings…',
}: {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}) {
  const ref = useNativeDialog(open, onClose);
  const [q, setQ] = React.useState('');
  const [cursor, setCursor] = React.useState(0);

  const results = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items.slice(0, 8);
    return items.filter((i) => `${i.label} ${i.hint ?? ''}`.toLowerCase().includes(needle)).slice(0, 20);
  }, [q, items]);

  // Reset between openings, and whenever the result set changes under the
  // cursor — otherwise Enter fires whatever happens to be at the old index.
  React.useEffect(() => setCursor(0), [q, open]);
  React.useEffect(() => {
    if (!open) setQ('');
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = results[cursor];
      if (hit) {
        hit.onSelect();
        onClose();
      }
    }
  };

  return (
    <dialog
      ref={ref}
      className="wj-glass wj-command wj-enter-shell"
      data-tier="shell"
      aria-label="Command palette"
      onClick={backdropClick(onClose)}
    >
      <input
        className="wj-command__input"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
        role="combobox"
        aria-expanded
        aria-controls="wj-command-list"
        aria-activedescendant={results[cursor] ? `wj-cmd-${results[cursor].id}` : undefined}
      />
      <div className="wj-command__list" id="wj-command-list" role="listbox">
        {results.length === 0 ? (
          <p className="wj-caption" style={{ padding: 'var(--wj-space-6)', textAlign: 'center' }}>
            Nothing matched “{q}”.
          </p>
        ) : (
          results.map((r, i) => (
            <button
              key={r.id}
              id={`wj-cmd-${r.id}`}
              type="button"
              role="option"
              aria-selected={i === cursor}
              className="wj-menu__item"
              style={i === cursor ? { backgroundColor: 'var(--wj-surface-hover)' } : undefined}
              onMouseEnter={() => setCursor(i)}
              onClick={() => {
                r.onSelect();
                onClose();
              }}
            >
              <span style={{ flex: 1 }}>{r.label}</span>
              {r.hint && <span className="wj-caption">{r.hint}</span>}
            </button>
          ))
        )}
      </div>
    </dialog>
  );
}
