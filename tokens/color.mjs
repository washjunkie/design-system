/**
 * Colour maths for the Wash Junkie design system.
 *
 * Everything in the palette is authored in OKLCH and converted down to sRGB
 * hex only at the end, because OKLCH is perceptually uniform: stepping
 * lightness by an equal amount produces an equal *apparent* step, which is what
 * makes a twelve-step ramp read as evenly spaced instead of bunching in the
 * midtones the way an HSL ramp does.
 *
 * No dependencies on purpose — the build has to run anywhere with a Node
 * binary and nothing else, including a fresh clone with no install step.
 */

/* ---------- sRGB <-> Oklab ---------- */

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const toGamma = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const clamp01 = (n) => Math.min(1, Math.max(0, n));

export function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function rgbToHex([r, g, b]) {
  const h = (c) =>
    Math.round(clamp01(c) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function rgbToOklch([r8, g8, b8]) {
  const r = toLinear(r8);
  const g = toLinear(g8);
  const b = toLinear(b8);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { l: L * 100, c: Math.hypot(A, B), h: H };
}

export function oklchToRgb({ l, c, h }) {
  const L = l / 100;
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    toGamma(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    toGamma(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    toGamma(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

/** True when an OKLCH triplet survives the trip to sRGB without clipping. */
export function inGamut({ l, c, h }) {
  return oklchToRgb({ l, c, h }).every((v) => v >= -0.0005 && v <= 1.0005);
}

/**
 * Pull chroma down until the colour fits inside sRGB, keeping lightness and hue.
 * Binary search rather than a linear walk so a wildly out-of-gamut input costs
 * the same twenty iterations as a nearly-valid one.
 */
export function clampChroma({ l, c, h }) {
  if (inGamut({ l, c, h })) return { l, c, h };
  let lo = 0;
  let hi = c;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut({ l, c: mid, h })) lo = mid;
    else hi = mid;
  }
  return { l, c: lo, h };
}

export const oklchToHex = (o) => rgbToHex(oklchToRgb(clampChroma(o)));
export const hexToOklch = (hex) => rgbToOklch(hexToRgb(hex));

/** CSS `oklch()` string, rounded to the precision a stylesheet actually needs. */
export const css = ({ l, c, h }, alpha) =>
  `oklch(${round(l, 1)}% ${round(c, 4)} ${round(h, 1)}${alpha == null ? '' : ` / ${alpha}`})`;

const round = (n, p) => Number(n.toFixed(p));

/* ---------- Contrast ---------- */

const relLuminance = ([r, g, b]) =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

/** WCAG 2.1 contrast ratio between two hex colours. 1 = identical, 21 = max. */
export function contrast(hexA, hexB) {
  const a = relLuminance(hexToRgb(hexA));
  const b = relLuminance(hexToRgb(hexB));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Whichever of black/white reads better on the given background. */
export const bestInk = (hex) => (contrast(hex, '#ffffff') >= contrast(hex, '#111113') ? '#ffffff' : '#111113');

/**
 * Composite a translucent layer over an opaque backdrop — the maths behind
 * every "what does text on glass actually sit on?" contrast check in the docs.
 */
export function over(fgHex, alpha, bgHex) {
  const f = hexToRgb(fgHex);
  const b = hexToRgb(bgHex);
  return rgbToHex(f.map((v, i) => v * alpha + b[i] * (1 - alpha)));
}

/* ------------------------------------------------------------------ *
 * CLI
 * ------------------------------------------------------------------ *
 *   node tokens/color.mjs '#1d2022' '#fcfcfd'   → contrast ratio + verdicts
 *
 * This exists because the brand guide repeatedly instructs "measure the field
 * before you approve a pairing", and for a while it named the wrong tool:
 * `print.mjs` returns ΔE2000 and CMYK, never a contrast ratio. An instruction
 * to run a command that silently prints nothing is worse than no instruction,
 * because it looks like it was checked.
 */

/* `pathToFileURL`, not string concatenation: this directory has a space in its
   name, so `import.meta.url` is percent-encoded and a hand-built `file://${argv}`
   never matches it. The naive form fails silently — the CLI simply does nothing,
   which is the failure mode this block was added to remove. */
const { pathToFileURL } = await import('node:url');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [a, b] = process.argv.slice(2);
  if (!a || !b) {
    console.log(`\n  usage: node tokens/color.mjs <foreground> <background>\n`);
    console.log(`  e.g.   node tokens/color.mjs '#1d2022' '#fcfcfd'\n`);
    process.exit(1);
  }
  const r = contrast(a, b);
  const verdict = (min, label) => `${r >= min ? '✓' : '✗'} ${label} (${min}:1)`;
  console.log(`\n  ${a} on ${b}`);
  console.log(`  contrast  ${r.toFixed(2)}:1\n`);
  console.log(`    ${verdict(3, 'non-text graphics / large text')}`);
  console.log(`    ${verdict(4.5, 'body text — AA, and the guide\'s distance floor')}`);
  console.log(`    ${verdict(7, 'body text — AAA')}\n`);
  const ink = bestInk(b);
  console.log(`  better ink on this field: ${ink === '#ffffff' ? 'WHITE' : 'INK'} (${contrast(ink, b).toFixed(2)}:1)\n`);
}
