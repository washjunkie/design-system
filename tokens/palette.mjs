/**
 * The Wash Junkie palette recipe.
 *
 * Every colour family is a twelve-step ramp generated from a hue and a chroma
 * curve. The step *numbers mean the same thing in every family and in both
 * themes* — step 3 is always "the subtle background you can put behind a row",
 * step 9 is always "the solid fill", step 11 is always "text that passes on
 * step 1". That invariance is the whole point: a component written against
 * `--wj-aqua-9` keeps working when it's re-tinted to `--wj-sun-9`, and keeps
 * working in dark mode, without anyone re-checking contrast by eye.
 *
 * The scale follows the Radix step semantics because they are well-tested and
 * because operators reading dense tables benefit far more from a predictable
 * ramp than from a bespoke one.
 *
 *   1  app background
 *   2  subtle background
 *   3  component background — rest
 *   4  component background — hover
 *   5  component background — active/selected
 *   6  border — subtle / decorative separators
 *   7  border — default, component outlines
 *   8  border — strong, focus rings, hovered outlines
 *   9  SOLID fill — the loudest the colour gets, buttons and badges
 *   10 solid fill — hover
 *   11 low-contrast text on 1-5
 *   12 high-contrast text
 */

import { oklchToHex, hexToOklch, contrast, bestInk } from './color.mjs';

/* Lightness tracks, tuned once and reused by every family so that step N sits
   at the same perceived lightness across the palette. */
/* Step 9 sits at 54% rather than the more common 62% for one reason: white
   text on it has to clear 4.5:1 in *every* family. At 62% the brightest hues
   (aqua at 3.47:1, moss at 3.44:1) fail, which would mean the primary button —
   the single most-pressed control in the product — shipping below AA. 54% is
   the lightest value that clears it for all six families with margin.
   `tokens/build.mjs --check` re-proves this on every build. */
const L_LIGHT = [99.3, 97.7, 95.3, 92.9, 90.1, 86.6, 82.0, 74.5, 54.0, 49.5, 44.0, 22.5];
/* Dark's ground dropped from 15.5% to 12.4% in the 2026-08-19 refinement, and
   steps 2–7 were re-spaced from the new floor so the perceptual step stays even.

   The reason is the material, not taste. Liquid Glass reads as glass because a
   blurred, saturated backdrop is VISIBLY lighter than the ground behind it —
   that difference is the whole illusion. At 15.5% the ground sat close enough
   to a `pane` over it that the panel edge did the work the material was
   supposed to do, and the console read as flat cards with a blur filter. The
   deeper ground widens that separation without touching a single alpha.

   Steps 8–10 are UNCHANGED and must stay so: 9 is the solid fill whose 4.5:1
   against white is the palette's load-bearing guarantee, and 8 and 10 are the
   focus ring and its hover. Everything the refinement moves is either a
   background (further from text, so contrast only improves) or a text step
   (moved away from the ground, same direction). */
const L_DARK = [12.4, 16.2, 20.6, 24.0, 27.4, 32.0, 38.4, 48.0, 54.0, 59.5, 77.0, 94.5];

/* Chroma multiplier per step. Colour is barely present in the backgrounds,
   peaks at the solid fill, and eases off again in the text steps so that
   coloured text reads as text rather than as decoration. */
/* Chroma lifted at the background steps (1–7) in the same refinement. A
   surface tinted with the family it belongs to reads as part of the brand;
   the same surface at near-zero chroma reads as grey with a coloured border
   stuck on it. The peak (step 9) and the text steps are untouched — coloured
   text has to read as text, not as decoration, and that was already right. */
const C_CURVE = [0.09, 0.15, 0.25, 0.33, 0.41, 0.49, 0.61, 0.78, 1.0, 0.99, 0.86, 0.42];
const C_CURVE_DARK = [0.15, 0.23, 0.35, 0.45, 0.53, 0.61, 0.71, 0.84, 1.0, 0.98, 0.74, 0.30];

/**
 * Families. `chroma` is the peak chroma at step 9; the curve scales it.
 * Neutrals get a whisper of hue rather than none — a dead-grey UI looks
 * cheap next to a saturated brand, and the eye reads the tint as intentional.
 */
export const FAMILIES = {
  /** Brand. Hue lifted straight off the logo artwork (#2cbec5). */
  aqua: { hue: 199.9, chroma: 0.118, label: 'Aqua' },
  /** Depth and night. The dark end of the consumer register. */
  tide: { hue: 258, chroma: 0.155, label: 'Tide' },
  /** Warm counterpoint. Also carries `warning`. */
  sun: { hue: 72, chroma: 0.155, label: 'Sun' },
  /** Success. */
  moss: { hue: 155, chroma: 0.135, label: 'Moss' },
  /** Danger. */
  ember: { hue: 27, chroma: 0.175, label: 'Ember' },
  /** Neutral. Cool-leaning so it sits with the brand rather than fighting it. */
  slate: { hue: 250, chroma: 0.016, label: 'Slate' },
};

/**
 * The ladders, exported so the per-business accent derivation in `build.mjs`
 * can be generated from the same numbers rather than transcribing them.
 * They were hard-coded once and went stale the first time the ramp moved —
 * the CSS still said 62% after step 9 dropped to 54%, which quietly put every
 * re-tinted console back below AA. Generated, they cannot drift again.
 */
export const LADDER = { light: L_LIGHT, dark: L_DARK, chroma: C_CURVE, chromaDark: C_CURVE_DARK };

export function ramp(family, theme) {
  const { hue, chroma } = FAMILIES[family];
  const L = theme === 'dark' ? L_DARK : L_LIGHT;
  const C = theme === 'dark' ? C_CURVE_DARK : C_CURVE;
  return L.map((l, i) => oklchToHex({ l, c: chroma * C[i], h: hue }));
}

/** Every ramp, both themes: `palette.light.aqua[8]` is aqua step 9. */
export const palette = {
  light: Object.fromEntries(Object.keys(FAMILIES).map((f) => [f, ramp(f, 'light')])),
  dark: Object.fromEntries(Object.keys(FAMILIES).map((f) => [f, ramp(f, 'dark')])),
};

/**
 * The literal logo teal. It is deliberately NOT step 9 of the aqua ramp: at
 * 73% lightness it carries white text at about 2:1, so using it as a button
 * fill would fail every contrast rule we have. It stays a *mark* colour — the
 * logo, graphic flourishes, glass tints, and text on dark surfaces — while
 * aqua-9 does the interactive work. See docs/03-color.md.
 */
export const BRAND_MARK = '#2cbec5';
export const BRAND_MARK_OKLCH = hexToOklch(BRAND_MARK);

/** Contrast report used by the docs and by `build.mjs --check`. */
export function audit() {
  const rows = [];
  for (const theme of ['light', 'dark']) {
    for (const family of Object.keys(FAMILIES)) {
      const r = palette[theme][family];
      rows.push(
        { theme, family, pair: '11 on 1', ratio: contrast(r[10], r[0]) },
        { theme, family, pair: '11 on 3', ratio: contrast(r[10], r[2]) },
        { theme, family, pair: '12 on 1', ratio: contrast(r[11], r[0]) },
        { theme, family, pair: 'ink on 9', ratio: contrast(bestInk(r[8]), r[8]) },
      );
    }
  }
  return rows;
}
