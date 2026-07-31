import * as React from 'react';
import { WORDMARK_PATHS, MARK_PATHS, WORDMARK_VIEWBOX, MARK_VIEWBOX, WORDMARK_RATIO, MARK_RATIO } from './logo-paths';

/**
 * The Wash Junkie marks.
 *
 * Both render with `fill: currentColor` rather than the teal baked into the
 * source artwork. One file therefore serves every context: brand teal on a
 * white card, white on a photograph, `--wj-fg-default` in a monochrome print.
 * A second coloured asset would be a second thing to keep in sync.
 *
 * Sized by HEIGHT, never width — a logo is specified by how tall it sits on the
 * line, and the width follows from the artwork's own ratio.
 *
 * The mark stays Wash Junkie teal even inside a business-accented console. See
 * docs/13-white-label.md: the accent is the tenant's, the mark is ours.
 */

export type LogoProps = {
  /** Rendered height in px. Width is derived. */
  height?: number;
  className?: string;
  /**
   * Accessible name. Omit when the logo sits next to the words "Wash Junkie"
   * already — a decorative duplicate makes a screen reader say it twice.
   */
  title?: string;
  style?: React.CSSProperties;
};

export function WashJunkieLogo({ height = 28, className, title, style }: LogoProps) {
  return (
    <svg
      className={className}
      width={Math.round(height * WORDMARK_RATIO)}
      height={height}
      viewBox={WORDMARK_VIEWBOX}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={style}
    >
      {title ? <title>{title}</title> : null}
      {WORDMARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** The splash mark alone — favicons, tight headers, avatar-sized slots. */
export function WashJunkieMark({ height = 20, className, title, style }: LogoProps) {
  return (
    <svg
      className={className}
      width={Math.round(height * MARK_RATIO)}
      height={height}
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={style}
    >
      {title ? <title>{title}</title> : null}
      {MARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Minimum clear space around either mark, in px, for a given height.
 *  Equal to the height of the splash mark's droplet — a ratio that scales,
 *  rather than a fixed 16px that suffocates a 12px favicon and gets lost at 96. */
export const clearSpace = (height: number) => Math.round(height * 0.45);
