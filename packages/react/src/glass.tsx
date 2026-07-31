'use client';

import * as React from 'react';

export type GlassTier = 'solid' | 'veil' | 'pane' | 'shell';
export type GlassTint = 'none' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export type GlassSurfaceProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * How far above the page this surface floats.
   *
   *   solid  data — tables, forms, long text. Not glass.
   *   veil   inline chrome that scrolls with content
   *   pane   persistent structure — nav, header, tab bar
   *   shell  a layer that arrived — modal, sheet, popover, palette
   *
   * Choosing a tier is choosing an elevation, not choosing an intensity. If
   * you want a card to "look nicer", the answer is not a higher tier.
   */
  tier?: GlassTier;
  tint?: GlassTint;
  /** Adds the calming underlay for glass sitting over photography or video. */
  overMedia?: boolean;
  /** Reacts to hover and press in the material — lifts, rim brightens. */
  interactive?: boolean;
  /** Sticks to the top of its scroll container with paint containment. */
  sticky?: boolean;
  as?: React.ElementType;
};

/**
 * The one component that knows how to be made of glass. Everything else in the
 * kit that floats — Modal, Sheet, Popover, Toast, CommandPalette — is this with
 * positioning on top.
 */
export const GlassSurface = React.forwardRef<HTMLElement, GlassSurfaceProps>(function GlassSurface(
  { tier = 'pane', tint = 'none', overMedia, interactive, sticky, as: Tag = 'div', className, children, ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cx('wj-glass', interactive && 'wj-glass-interactive', className)}
      data-tier={tier}
      data-tint={tint === 'none' ? undefined : tint}
      data-over={overMedia ? 'media' : undefined}
      data-sticky={sticky ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/** Local `clsx`. The kit ships no runtime dependencies — every consuming app
 *  already has its own, and a design system that drags one in causes a
 *  duplicate before it causes a convenience. */
export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');
