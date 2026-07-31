#!/usr/bin/env node
/**
 * Production-colour tool for the brand guide.
 *
 *   node print.mjs                    report on the brand palette
 *   node print.mjs '#00A9B4' '#2CBEC5' compare two colours (ΔE2000)
 *
 * ── Read this before quoting anything it prints ──
 *
 * There is no ICC profile in this repo, so the CMYK numbers below come from the
 * naive algebraic conversion (`k = 1 - max(r,g,b)`, etc.). That conversion knows
 * nothing about ink, paper, dot gain, or GCR. It is a **starting point for a
 * conversation with a printer**, never a specification, and it is not what any
 * press will produce.
 *
 * **This tool cannot tell you whether a colour is inside the CMYK gamut**, and
 * it does not pretend to. An earlier draft reported a round-trip ΔE — convert
 * to CMYK, convert back, measure the drift — as a gamut indicator. That number
 * is worthless: the naive conversion is its own exact inverse, so the round
 * trip is lossless by construction and reports ~0.4 for every colour, including
 * ones no press can hit. Measuring gamut needs a real ICC profile and a
 * rendering intent. Do not re-add it.
 *
 * What the tool does report is only things it can actually prove: total area
 * coverage, 1-bit behaviour, which ink to set type in, and ΔE2000 between any
 * two colours — that last one being the real job, checking a spot-colour
 * candidate read off a physical book.
 *
 * The authoritative workflow is unchanged: get a **wet proof on the actual
 * substrate**, and match a **spot colour** against a physical book under D50.
 */

import { hexToRgb, rgbToHex, hexToOklch, contrast, bestInk } from './color.mjs';
import { palette, BRAND_MARK } from './palette.mjs';

/* ------------------------------------------------------------------ *
 * CMYK — naive, and labelled as such everywhere it surfaces
 * ------------------------------------------------------------------ */

export function toCMYK(hex) {
  const [r, g, b] = hexToRgb(hex);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const f = (v) => Math.round(((1 - v - k) / (1 - k)) * 100);
  return { c: f(r), m: f(g), y: f(b), k: Math.round(k * 100) };
}

/** The exact inverse of `toCMYK`. Useful for showing someone a swatch of what
 *  the naive numbers mean — NOT for measuring gamut loss, because a lossless
 *  round trip measures nothing. See the header. */
export function fromCMYK({ c, m, y, k }) {
  const f = (v) => (1 - v / 100) * (1 - k / 100);
  return rgbToHex([f(c), f(m), f(y)]);
}

/**
 * Colours we should EXPECT four-process ink to struggle with. Not a measurement
 * — a flag that says "this one needs a spot colour and a wet proof before
 * anyone commits to a print run".
 *
 * The rule of thumb it encodes is real and well known: the largest region of
 * sRGB that offset CMYK cannot reach is saturated cyan-through-green at middle
 * and high lightness. Wash Junkie's brand teal sits in the middle of it.
 */
export function printRisk(hex) {
  const { l, c, h } = hexToOklch(hex);
  const inCyanGreen = h >= 150 && h <= 250;
  const chromatic = c >= 0.09;
  const bright = l >= 60;
  if (inCyanGreen && chromatic && bright)
    return { level: 'high', why: 'saturated cyan-green above 60% lightness — the classic out-of-gamut region for offset CMYK' };
  if (chromatic && bright)
    return { level: 'medium', why: 'high chroma at high lightness; expect some flattening' };
  if (c >= 0.14)
    return { level: 'medium', why: 'high chroma; expect some flattening' };
  return { level: 'low', why: 'muted or dark enough that process ink should hold it' };
}

/** Total Area Coverage. Above ~300% on coated stock, ink stops drying and
 *  starts offsetting onto the next sheet. Printers reject artwork over it. */
export const tac = ({ c, m, y, k }) => c + m + y + k;

/* ------------------------------------------------------------------ *
 * ΔE2000
 * ------------------------------------------------------------------ */

const toLinear = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));

/** sRGB → CIE L*a*b* under D65, then adapted to D50 — the illuminant every
 *  print standard measures under. Comparing a screen colour to a swatch book
 *  under D65 is how two colours that "match" on a monitor come back different. */
function toLab(hex) {
  const [r0, g0, b0] = hexToRgb(hex).map(toLinear);
  // sRGB → XYZ (D65)
  let X = 0.4124564 * r0 + 0.3575761 * g0 + 0.1804375 * b0;
  let Y = 0.2126729 * r0 + 0.7151522 * g0 + 0.072175 * b0;
  let Z = 0.0193339 * r0 + 0.119192 * g0 + 0.9503041 * b0;
  // Bradford chromatic adaptation, D65 → D50
  const [Xa, Ya, Za] = [
    1.0478112 * X + 0.0228866 * Y - 0.050127 * Z,
    0.0295424 * X + 0.9904844 * Y - 0.0170491 * Z,
    -0.0092345 * X + 0.0150436 * Y + 0.7521316 * Z,
  ];
  // D50 white point
  const [Xn, Yn, Zn] = [0.9642, 1.0, 0.8249];
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27) * t / 116 + 16 / 116);
  const [fx, fy, fz] = [f(Xa / Xn), f(Ya / Yn), f(Za / Zn)];
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

/** CIEDE2000. The only ΔE formula whose numbers mean anything perceptually in
 *  the blue-green region — which is precisely where this brand lives. */
export function deltaE2000(hexA, hexB) {
  const A = toLab(hexA);
  const B = toLab(hexB);
  const kL = 1, kC = 1, kH = 1;
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const C1 = Math.hypot(A.a, A.b);
  const C2 = Math.hypot(B.a, B.b);
  const Cbar = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cbar ** 7 / (Cbar ** 7 + 25 ** 7)));

  const a1p = (1 + G) * A.a;
  const a2p = (1 + G) * B.a;
  const C1p = Math.hypot(a1p, A.b);
  const C2p = Math.hypot(a2p, B.b);

  const hp = (b, ap) => {
    if (b === 0 && ap === 0) return 0;
    const h = Math.atan2(b, ap) * deg;
    return h >= 0 ? h : h + 360;
  };
  const h1p = hp(A.b, a1p);
  const h2p = hp(B.b, a2p);

  const dLp = B.L - A.L;
  const dCp = C2p - C1p;

  let dhp = 0;
  if (C1p * C2p !== 0) {
    dhp = h2p - h1p;
    if (dhp > 180) dhp -= 360;
    else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * rad) / 2);

  const Lbar = (A.L + B.L) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp;
  if (C1p * C2p === 0) hbarp = h1p + h2p;
  else if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
  else hbarp = h1p + h2p < 360 ? (h1p + h2p + 360) / 2 : (h1p + h2p - 360) / 2;

  const T =
    1 -
    0.17 * Math.cos((hbarp - 30) * rad) +
    0.24 * Math.cos(2 * hbarp * rad) +
    0.32 * Math.cos((3 * hbarp + 6) * rad) -
    0.2 * Math.cos((4 * hbarp - 63) * rad);

  const dTheta = 30 * Math.exp(-(((hbarp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cbarp ** 7 / (Cbarp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbar - 50) ** 2) / Math.sqrt(20 + (Lbar - 50) ** 2);
  const Sc = 1 + 0.045 * Cbarp;
  const Sh = 1 + 0.015 * Cbarp * T;
  const Rt = -Math.sin(2 * dTheta * rad) * Rc;

  return Math.sqrt(
    (dLp / (kL * Sl)) ** 2 +
      (dCp / (kC * Sc)) ** 2 +
      (dHp / (kH * Sh)) ** 2 +
      Rt * (dCp / (kC * Sc)) * (dHp / (kH * Sh))
  );
}

/** What a ΔE2000 figure means to a human looking at two swatches. */
export function readDeltaE(dE) {
  if (dE < 1) return 'imperceptible — below the just-noticeable difference';
  if (dE < 2) return 'visible only side by side, under good light';
  if (dE < 3.5) return 'noticeable side by side; acceptable for most commercial print';
  if (dE < 5) return 'clearly different side by side; a brand colour should not sit here';
  return 'obviously a different colour';
}

/* ------------------------------------------------------------------ *
 * 1-bit / single-colour reproduction
 * ------------------------------------------------------------------ */

/**
 * Whether a colour survives being thresholded to pure black or white — which is
 * what a thermal receipt printer, a laser engraver, a single-colour screen
 * print, and an embroidery digitiser all do to it.
 *
 * The threshold that matters is relative luminance 0.5, not lightness 50%.
 */
export function oneBit(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return { luminance: Y, becomes: Y >= 0.5 ? 'white' : 'black' };
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

const pad = (s, n) => String(s).padEnd(n);

function reportColour(name, hex) {
  const cmyk = toCMYK(hex);
  const o = hexToOklch(hex);
  const bit = oneBit(hex);
  const risk = printRisk(hex);
  const onWhite = contrast(hex, '#ffffff');
  const onBlack = contrast(hex, '#111113');

  console.log(`\n  ${name}  ${hex}`);
  console.log(`    oklch          ${o.l.toFixed(1)}% ${o.c.toFixed(4)} ${o.h.toFixed(1)}`);
  console.log(
    `    CMYK (naive)   C${pad(cmyk.c, 3)} M${pad(cmyk.m, 3)} Y${pad(cmyk.y, 3)} K${pad(cmyk.k, 3)}  TAC ${tac(cmyk)}%` +
      (tac(cmyk) > 300 ? '  ⚠ over 300% — presses reject this' : '')
  );
  console.log(`    print risk     ${risk.level.toUpperCase()} — ${risk.why}`);
  console.log(
    `    1-bit          luminance ${bit.luminance.toFixed(3)} → ${bit.becomes}` +
      (bit.becomes === 'white' ? '   ⚠ vanishes on white stock' : '')
  );
  console.log(
    `    as a field     white on it ${onWhite.toFixed(2)}:1${onWhite < 3 ? ' ✗' : onWhite < 4.5 ? ' (graphics only)' : ' ✓'}` +
      `   black on it ${onBlack.toFixed(2)}:1${onBlack < 3 ? ' ✗' : onBlack < 4.5 ? ' (graphics only)' : ' ✓'}`
  );
  console.log(`                   → set type on this field in ${bestInk(hex) === '#ffffff' ? 'WHITE' : 'BLACK'}`);
}

const args = process.argv.slice(2);

if (args.length === 2) {
  const [a, b] = args;
  const dE = deltaE2000(a, b);
  console.log(`\n  ${a}  vs  ${b}`);
  console.log(`  ΔE2000  ${dE.toFixed(2)}  — ${readDeltaE(dE)}\n`);
  console.log(`  A ${JSON.stringify(toCMYK(a))}`);
  console.log(`  B ${JSON.stringify(toCMYK(b))}\n`);
  console.log(`  Use this to check a spot-colour candidate from a real Pantone`);
  console.log(`  bridge guide against the brand teal. Numbers you have not read`);
  console.log(`  off a physical book under D50 are not evidence.\n`);
  process.exit(0);
}

console.log('\nWash Junkie · production colour');
console.log('────────────────────────────────────────────────────────────────');
console.log('CMYK below is the NAIVE algebraic conversion. It is a starting');
console.log('point for a conversation with a printer, not a specification.');
console.log('The number that matters is the round-trip ΔE.');

reportColour('Brand mark  ', BRAND_MARK);
reportColour('Accent solid', palette.light.aqua[8]);
reportColour('Ink         ', palette.light.slate[11]);
reportColour('Paper       ', palette.light.slate[0]);

console.log('\n  Semantic solids');
for (const f of ['moss', 'sun', 'ember', 'tide']) {
  const hex = palette.light[f][8];
  const c = toCMYK(hex);
  console.log(
    `    ${pad(f, 7)} ${hex}  C${pad(c.c, 3)} M${pad(c.m, 3)} Y${pad(c.y, 3)} K${pad(c.k, 3)}  TAC ${pad(tac(c) + '%', 5)} risk ${printRisk(hex).level}`
  );
}

/* The finding that changes how anything physical gets made. */
console.log('\n  Mark on a coloured field');
for (const [label, field] of [
  ['brand teal   ', BRAND_MARK],
  ['accent teal  ', palette.light.aqua[8]],
  ['ink          ', palette.light.slate[11]],
]) {
  const w = contrast('#ffffff', field);
  const k = contrast(palette.light.slate[11], field);
  console.log(
    `    ${label} white mark ${w.toFixed(2)}:1 ${w >= 3 ? '✓' : '✗ below the 3:1 non-text floor'}` +
      `   ink mark ${k.toFixed(2)}:1 ${k >= 3 ? '✓' : '✗'}`
  );
}

console.log(`
────────────────────────────────────────────────────────────────
Checking a spot-colour candidate:

  node print.mjs '${BRAND_MARK}' '#00A5B5'

Read the candidate off a physical Pantone bridge guide under D50 —
a hex you found on a website is a screen approximation of a print
approximation and carries no authority.
`);
