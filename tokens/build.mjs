#!/usr/bin/env node
/**
 * Token build. One source, four consumers.
 *
 *   node build.mjs           write every output
 *   node build.mjs --check    contrast + gamut audit, non-zero exit on failure
 *
 * Outputs land in ./dist:
 *   wj.tokens.json        W3C Design Tokens (DTCG) — the published, portable spec
 *   wj-tokens.css         CSS custom properties, themed + registered
 *   wj-tokens.ts          typed TS object, for logic that needs a value in JS
 *   wj-tokens.native.ts   React Native / Skia friendly (numbers, no var(), no oklch)
 *   figma.variables.json  Figma Variables import shape, collections + modes
 *
 * The CSS file is the one the product loads. The others exist so that a
 * designer, a native engineer, and a chart library are all reading the same
 * numbers as the stylesheet — the usual way a design system rots is three
 * copies of "the brand blue" drifting apart.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as T from './source.mjs';
import { palette, FAMILIES, audit, LADDER } from './palette.mjs';

const AQUA_H = FAMILIES.aqua.hue;
const AQUA_C = FAMILIES.aqua.chroma;
import { contrast, bestInk, over, hexToOklch, css as oklchCss } from './color.mjs';

const DIR = dirname(fileURLToPath(import.meta.url));
const DIST = join(DIR, 'dist');
const out = (name, body) => {
  mkdirSync(DIST, { recursive: true });
  writeFileSync(join(DIST, name), body);
  console.log(`  ✓ dist/${name}  ${(body.length / 1024).toFixed(1)}kb`);
};

/* ------------------------------------------------------------------ *
 * Generated easing: a sampled damped spring
 * ------------------------------------------------------------------ */

/**
 * A cubic bézier cannot overshoot its endpoint, so the "settles into place"
 * feel that makes glass read as a physical object has to be sampled from an
 * actual spring and emitted as a `linear()` stop list.
 */
function springEasing({ stiffness, damping, mass, samples }) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;

  const at = (t) =>
    zeta < 1
      ? 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
      : 1 - Math.exp(-w0 * t) * (1 + w0 * t);

  // Run until the spring is within 0.1% of rest for a full sample window.
  let settle = 0.1;
  for (let t = 0; t < 4; t += 0.005) {
    if (Math.abs(at(t) - 1) < 0.001) { settle = t; break; }
  }

  const stops = [];
  for (let i = 0; i <= samples; i++) {
    const p = i / samples;
    const v = at(p * settle);
    stops.push(i === 0 ? '0' : i === samples ? '1' : `${v.toFixed(4)} ${(p * 100).toFixed(1)}%`);
  }
  return { css: `linear(${stops.join(', ')})`, settleMs: Math.round(settle * 1000) };
}

const fluid = springEasing(T.spring);

/* ------------------------------------------------------------------ *
 * DTCG
 * ------------------------------------------------------------------ */

const dtcgColor = (v, d) => ({ $type: 'color', $value: v, ...(d ? { $description: d } : {}) });
const dtcgDim = (v, d) => ({ $type: 'dimension', $value: v, ...(d ? { $description: d } : {}) });

function buildDTCG() {
  const colour = {};
  for (const [name, meta] of Object.entries(FAMILIES)) {
    colour[name] = { $description: `${meta.label} — 12-step ramp, hue ${meta.hue}°` };
    palette.light[name].forEach((hex, i) => {
      colour[name][i + 1] = dtcgColor(hex);
      colour[name][`${i + 1}-dark`] = dtcgColor(palette.dark[name][i]);
    });
  }

  const sem = {};
  for (const [role, value] of Object.entries(T.semantic.light)) {
    sem[role] = dtcgColor(value, `light: ${value} · dark: ${T.semantic.dark[role]}`);
  }

  return {
    $schema: 'https://tr.designtokens.org/format/',
    $description:
      'Wash Junkie design tokens. Primitive layer is theme-independent; the semantic layer is what product code consumes.',
    wj: {
      brand: {
        mark: dtcgColor(T.brand.mark, 'The logo teal. Never a button fill — see docs/03-color.md.'),
      },
      colour,
      semantic: sem,
      space: Object.fromEntries(Object.entries(T.space).map(([k, v]) => [k, dtcgDim(v)])),
      radius: {
        operator: Object.fromEntries(Object.entries(T.radius.operator).map(([k, v]) => [k, dtcgDim(v)])),
        consumer: Object.fromEntries(Object.entries(T.radius.consumer).map(([k, v]) => [k, dtcgDim(v)])),
        full: dtcgDim(T.radius.full),
      },
      size: {
        touch: dtcgDim(T.size.touch),
        control: Object.fromEntries(Object.entries(T.size.control).map(([k, v]) => [k, dtcgDim(v)])),
        icon: Object.fromEntries(Object.entries(T.size.icon).map(([k, v]) => [k, dtcgDim(v)])),
        container: Object.fromEntries(Object.entries(T.size.container).map(([k, v]) => [k, dtcgDim(v)])),
      },
      breakpoint: Object.fromEntries(Object.entries(T.breakpoint).map(([k, v]) => [k, dtcgDim(v)])),
      font: {
        family: Object.fromEntries(
          Object.entries(T.font).map(([k, v]) => [k, { $type: 'fontFamily', $value: v }])
        ),
        size: Object.fromEntries(Object.entries(T.fontSize).map(([k, v]) => [k, dtcgDim(v)])),
        weight: Object.fromEntries(
          Object.entries(T.fontWeight).map(([k, v]) => [k, { $type: 'fontWeight', $value: Number(v) }])
        ),
        lineHeight: Object.fromEntries(
          Object.entries(T.lineHeight).map(([k, v]) => [k, { $type: 'number', $value: Number(v) }])
        ),
        letterSpacing: Object.fromEntries(
          Object.entries(T.letterSpacing).map(([k, v]) => [k, dtcgDim(v)])
        ),
      },
      duration: Object.fromEntries(
        Object.entries(T.duration).map(([k, v]) => [k, { $type: 'duration', $value: v }])
      ),
      easing: {
        ...Object.fromEntries(
          Object.entries(T.easing).map(([k, v]) => [k, { $type: 'cubicBezier', $value: v }])
        ),
        fluid: {
          $type: 'cubicBezier',
          $value: fluid.css,
          $description: `Sampled damped spring (k=${T.spring.stiffness}, c=${T.spring.damping}); settles in ~${fluid.settleMs}ms.`,
        },
      },
      glass: Object.fromEntries(
        Object.entries(T.glass).map(([tier, g]) => [
          tier,
          {
            blur: dtcgDim(g.blur),
            saturate: { $type: 'number', $value: parseFloat(g.saturate) / 100 },
            'alpha-light': { $type: 'number', $value: g.alphaLight },
            'alpha-dark': { $type: 'number', $value: g.alphaDark },
            'edge-strength': { $type: 'number', $value: g.edge },
          },
        ])
      ),
      shadow: {
        light: Object.fromEntries(
          Object.entries(T.shadow.light).map(([k, v]) => [k, { $type: 'shadow', $value: v }])
        ),
        dark: Object.fromEntries(
          Object.entries(T.shadow.dark).map(([k, v]) => [k, { $type: 'shadow', $value: v }])
        ),
      },
      zIndex: Object.fromEntries(
        Object.entries(T.zIndex).map(([k, v]) => [k, { $type: 'number', $value: Number(v) }])
      ),
    },
  };
}

/* ------------------------------------------------------------------ *
 * CSS
 * ------------------------------------------------------------------ */

function buildCSS() {
  const L = [];
  const p = (k, v) => L.push(`  --wj-${k}: ${v};`);

  L.push(`/* Wash Junkie design tokens — GENERATED by tokens/build.mjs. Do not edit.
 *
 * Load order: this file first, then wj-material.css, then wj-components.css.
 *
 * Theming hooks, all set on <html> (or any subtree — they cascade):
 *   data-wj-theme="light|dark"      omit to follow the OS
 *   data-wj-register="operator|consumer"
 *   data-wj-density="comfortable|compact"
 *   style="--wj-accent-h: 268"      per-business accent, see docs/13-white-label.md
 */\n`);

  /* -------- primitives -------- */
  L.push(':root {');
  L.push('  color-scheme: light dark;\n');

  L.push('  /* Brand — ours, never re-tinted by a business accent. */');
  p('brand-mark', T.brand.mark);
  p('brand-mark-oklch', oklchCss(hexToOklch(T.brand.mark)));
  p('brand-mark-ink', T.brand.markInk);

  L.push('\n  /* Palette ramps */');
  for (const family of Object.keys(FAMILIES)) {
    palette.light[family].forEach((hex, i) => p(`${family}-${i + 1}`, hex));
  }

  L.push('\n  /* Space — 4px grid */');
  for (const [k, v] of Object.entries(T.space)) p(`space-${k}`, v);

  L.push('\n  /* Size */');
  p('touch-target', T.size.touch);
  p('touch-target-dense', T.size.touchDense);
  for (const [k, v] of Object.entries(T.size.control)) p(`control-${k}`, v);
  for (const [k, v] of Object.entries(T.size.icon)) p(`icon-${k}`, v);
  for (const [k, v] of Object.entries(T.size.container)) p(`container-${k}`, v);
  p('radius-full', T.radius.full);

  L.push('\n  /* Type */');
  for (const [k, v] of Object.entries(T.font)) p(`font-${k}`, v);
  for (const [k, v] of Object.entries(T.fontSize)) p(`text-${k}`, v);
  for (const [k, v] of Object.entries(T.fontWeight)) p(`weight-${k}`, v);
  for (const [k, v] of Object.entries(T.lineHeight)) p(`leading-${k}`, v);
  for (const [k, v] of Object.entries(T.letterSpacing)) p(`tracking-${k}`, v);

  L.push('\n  /* Motion */');
  for (const [k, v] of Object.entries(T.duration)) p(`dur-${k}`, v);
  for (const [k, v] of Object.entries(T.easing)) p(`ease-${k.replace(/([A-Z])/g, '-$1').toLowerCase()}`, v);
  L.push(`  /* Sampled damped spring — overshoots ~4%, settles in ~${fluid.settleMs}ms. */`);
  p('ease-fluid', fluid.css);

  L.push('\n  /* Glass material */');
  for (const [tier, g] of Object.entries(T.glass)) {
    p(`glass-${tier}-blur`, g.blur);
    p(`glass-${tier}-saturate`, g.saturate);
    p(`glass-${tier}-alpha`, g.alphaLight);
    p(`glass-${tier}-edge`, g.edge);
  }

  L.push('\n  /* Stacking */');
  for (const [k, v] of Object.entries(T.zIndex)) p(`z-${k}`, v);

  L.push('\n  /* Breakpoints — for JS/container queries; @media needs literals. */');
  for (const [k, v] of Object.entries(T.breakpoint)) p(`bp-${k}`, v);
  L.push('}\n');

  /* -------- themes -------- */
  const themeBlock = (theme) => {
    const S = [];
    const q = (k, v) => S.push(`  --wj-${k}: ${v};`);
    for (const [role, value] of Object.entries(T.semantic[theme])) q(role, value);
    S.push('');
    for (const [k, v] of Object.entries(T.shadow[theme])) q(`shadow-${k}`, v);
    if (theme === 'dark') {
      S.push('\n  /* Dark re-points every ramp reference at the dark ladder. */');
      for (const family of Object.keys(FAMILIES)) {
        palette.dark[family].forEach((hex, i) => q(`${family}-${i + 1}`, hex));
      }
      S.push('');
      for (const [tier, g] of Object.entries(T.glass)) q(`glass-${tier}-alpha`, g.alphaDark);
    }
    return S.join('\n');
  };

  L.push(`/* Light is the default and also the explicit opt-out from the OS setting. */
:root,
[data-wj-theme='light'] {
  color-scheme: light;
${themeBlock('light')}
}

[data-wj-theme='dark'] {
  color-scheme: dark;
${themeBlock('dark')}
}

/* No explicit choice? Follow the OS. Scoped so an explicit data-wj-theme on an
   ancestor still wins — a light-locked marketing page inside a dark OS must
   stay light. */
@media (prefers-color-scheme: dark) {
  :root:not([data-wj-theme='light']) {
    color-scheme: dark;
${themeBlock('dark')}
  }
}\n`);

  /* -------- registers -------- */
  for (const [name, r] of Object.entries(T.register)) {
    const rad = T.radius[name];
    const sel =
      name === 'operator'
        ? `:root,\n[data-wj-register='operator']`
        : `[data-wj-register='consumer']`;
    L.push(`${sel} {`);
    for (const [k, v] of Object.entries(r)) if (k !== 'font') L.push(`  --wj-${k}: ${v};`);
    for (const [k, v] of Object.entries(rad)) L.push(`  --wj-radius-${k}: ${v};`);
    L.push('}\n');
  }

  /* -------- touch -------- */

  /* A media query, not an attribute. A token layer that waits for JavaScript
     is a token layer that is wrong on the first paint — and the first paint is
     the one an operator opening the console at a counter actually sees.

     Two conditions, matching the console's own responsive rule: a phone width
     unconditionally, and a coarse pointer up to tablet. Width alone misses an
     iPad in landscape; pointer alone silently vanishes in every desktop-browser
     check, which is where this gets verified. */
  const touchTokens = (indent) => {
    const out = [];
    for (const [k, v] of Object.entries(T.touch)) out.push(`${indent}--wj-${k}: ${v};`);
    for (const [k, v] of Object.entries(T.radius.touch)) out.push(`${indent}--wj-radius-${k}: ${v};`);
    return out.join('\n');
  };

  L.push(`/* Touch is a third axis, orthogonal to register AND density — see
   \`touch\` in tokens/source.mjs for why a phone is not a third register.
   \`[data-wj-touch='off']\` opts a subtree out (a pointer-only dense toolbar
   embedded in a phone layout); \`[data-wj-touch='on']\` forces it on at any
   width, which is what the showcase's Touch switch does. */
@media (max-width: ${T.breakpoint.sm}), (pointer: coarse) and (max-width: ${T.breakpoint.lg}) {
  :root:not([data-wj-touch='off']) {
${touchTokens('    ')}
  }
}
[data-wj-touch='on'] {
${touchTokens('  ')}
}\n`);

  L.push(`/* Density is orthogonal to register: an operator can compact the console
   without turning it into a different product. It only ever touches rhythm. */
[data-wj-density='compact'] {
  --wj-row-height: 32px;
  --wj-control-height: ${T.size.control.sm};
  --wj-gutter: ${T.space[5]};
  --wj-section-gap: ${T.space[7]};
  --wj-card-padding: ${T.space[5]};
}\n`);

  /* -------- per-business accent -------- */

  /* Each accent role is step N of a ramp. Generated from the same ladder the
     palette uses, so a change to the ramp propagates here instead of leaving
     the derivation silently a step behind. */
  /* `[light, dark]` where the two themes take different steps. The focus ring
     is the one that does: step 9 reads on white, but on a dark surface it is
     too dim to find, so dark takes step 10. */
  const ACCENT_ROLES = [
    ['accent-subtle', 3],
    ['accent-muted', 5],
    ['accent-border', 7],
    ['accent-solid', 9],
    ['accent-solid-hover', 10],
    ['accent-fg', 11],
    ['focus-ring', [9, 10]],
  ];

  const derive = (theme) =>
    ACCENT_ROLES.map(([role, steps]) => {
      const step = Array.isArray(steps) ? (theme === 'dark' ? steps[1] : steps[0]) : steps;
      const i = step - 1;
      const l = LADDER[theme][i];
      const cMul = (theme === 'dark' ? LADDER.chromaDark : LADDER.chroma)[i];
      const chroma =
        cMul === 1
          ? `var(--wj-accent-c, ${AQUA_C})`
          : `calc(var(--wj-accent-c, ${AQUA_C}) * ${cMul})`;
      return `  --wj-${role}: oklch(${l}% ${chroma} var(--wj-accent-h, ${AQUA_H}));`;
    }).join('\n');

  L.push(`/* Per-business accent.

   A business supplies ONE hue. Every accent role is re-derived from it in
   oklch at the palette's own fixed lightness values, so lightness — and
   therefore every contrast guarantee, including the 4.5:1 on accent-on-solid
   that keeps the primary button legible — survives whatever colour they pick.

   Unconditional rather than gated on an attribute: the console sets the hue
   from a stylesheet rule for its named presets, which an attribute selector
   like [style*='--wj-accent-h'] would never match. With defaults supplied,
   the no-accent output resolves to exactly the aqua ramp — same colour,
   expressed as oklch() rather than as the ramp's precomputed hex.

   See docs/13-white-label.md. */
:root,
[data-wj-theme='light'] {
${derive('light')}
}

[data-wj-theme='dark'] {
${derive('dark')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-wj-theme='light']) {
${derive('dark')
  .split('\n')
  .map((s) => `  ${s}`)
  .join('\n')}
  }
}
`);

  return L.join('\n');
}

/* ------------------------------------------------------------------ *
 * TypeScript
 * ------------------------------------------------------------------ */

const banner = `/* GENERATED by tokens/build.mjs — do not edit. */\n`;

function buildTS() {
  const obj = {
    brand: T.brand,
    palette,
    semantic: T.semantic,
    space: T.space,
    radius: T.radius,
    size: T.size,
    breakpoint: T.breakpoint,
    font: T.font,
    fontSize: T.fontSize,
    fontWeight: T.fontWeight,
    lineHeight: T.lineHeight,
    letterSpacing: T.letterSpacing,
    duration: T.duration,
    easing: { ...T.easing, fluid: fluid.css },
    glass: T.glass,
    shadow: T.shadow,
    zIndex: T.zIndex,
    register: T.register,
  };
  return `${banner}
export const tokens = ${JSON.stringify(obj, null, 2)} as const;

export type Tokens = typeof tokens;
export type ColourFamily = keyof typeof tokens.palette.light;
export type SemanticRole = keyof typeof tokens.semantic.light;
export type GlassTier = keyof typeof tokens.glass;
export type Register = keyof typeof tokens.register;

/** CSS variable reference for a semantic role: cssVar('fg-muted') → 'var(--wj-fg-muted)' */
export const cssVar = (role: SemanticRole | (string & {})) => \`var(--wj-\${role})\`;

/** Resolved hex for a role in a given theme — for canvas, charts, and
 *  anywhere a CSS variable cannot be read (SVG export, PDF, e-mail). */
export const resolve = (role: SemanticRole, theme: 'light' | 'dark' = 'light') =>
  tokens.semantic[theme][role];

export default tokens;
`;
}

function buildNative() {
  const px = (v) => (typeof v === 'string' && v.endsWith('px') ? parseFloat(v) : v);
  const mapPx = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, px(v)]));
  const ms = (v) => parseFloat(v);

  const obj = {
    palette,
    semantic: T.semantic,
    space: mapPx(T.space),
    radius: { operator: mapPx(T.radius.operator), consumer: mapPx(T.radius.consumer), full: 999 },
    size: {
      touch: px(T.size.touch),
      control: mapPx(T.size.control),
      icon: mapPx(T.size.icon),
    },
    fontSize: mapPx(T.fontSize),
    lineHeight: Object.fromEntries(Object.entries(T.lineHeight).map(([k, v]) => [k, Number(v)])),
    fontWeight: Object.fromEntries(Object.entries(T.fontWeight).map(([k, v]) => [k, v])),
    duration: Object.fromEntries(Object.entries(T.duration).map(([k, v]) => [k, ms(v)])),
    glass: Object.fromEntries(
      Object.entries(T.glass).map(([k, g]) => [
        k,
        { blur: px(g.blur), alphaLight: g.alphaLight, alphaDark: g.alphaDark, edge: g.edge },
      ])
    ),
    zIndex: Object.fromEntries(Object.entries(T.zIndex).map(([k, v]) => [k, Number(v)])),
  };

  return `${banner}/**
 * React Native / native-target token export.
 *
 * Differences from the web build, all forced by the platform:
 *  - dimensions are unitless numbers (RN density-independent pixels)
 *  - durations are numbers in ms
 *  - colours are hex, never oklch() — RN's colour parser has no oklch
 *  - there is no cascade, so both themes ship and you pick one at runtime
 *
 * Glass maps to the platform material, not to a CSS filter:
 *   iOS      UIVisualEffectView / SwiftUI .glassEffect / expo-blur intensity
 *   Android  RenderEffect.createBlurEffect (API 31+), tinted Surface below that
 * \`blur\` is the design intent in dp; \`expo-blur\` intensity ≈ blur * 3, capped
 * at 100. Below API 31, fall back to the opaque \`glass-floor\` surface.
 */

export const tokens = ${JSON.stringify(obj, null, 2)} as const;

export type Theme = 'light' | 'dark';

export const t = (theme: Theme) => ({
  ...tokens,
  colour: tokens.semantic[theme],
  ramp: tokens.palette[theme],
});

export default tokens;
`;
}

/* ------------------------------------------------------------------ *
 * Figma Variables
 * ------------------------------------------------------------------ */

function buildFigma() {
  const colourVars = [];
  for (const family of Object.keys(FAMILIES)) {
    palette.light[family].forEach((hex, i) => {
      colourVars.push({
        name: `palette/${family}/${i + 1}`,
        type: 'COLOR',
        valuesByMode: { Light: hex, Dark: palette.dark[family][i] },
        scopes: ['ALL_SCOPES'],
      });
    });
  }
  const semanticVars = Object.keys(T.semantic.light).map((role) => ({
    name: `semantic/${role.replace(/-/g, '/')}`,
    type: 'COLOR',
    valuesByMode: { Light: T.semantic.light[role], Dark: T.semantic.dark[role] },
    scopes: ['ALL_SCOPES'],
    description: `Semantic role. Bind fills and strokes to this, never to a palette step.`,
  }));

  const num = (name, v) => ({ name, type: 'FLOAT', valuesByMode: { Value: parseFloat(v) } });

  return {
    $comment:
      'Import with a Figma Variables plugin (e.g. Tokens Studio / Variables Import). Collections map 1:1 to the CSS layers.',
    collections: [
      {
        name: 'WJ Colour',
        modes: ['Light', 'Dark'],
        variables: [
          { name: 'brand/mark', type: 'COLOR', valuesByMode: { Light: T.brand.mark, Dark: T.brand.mark } },
          ...colourVars,
          ...semanticVars,
        ],
      },
      {
        name: 'WJ Dimension',
        modes: ['Value'],
        variables: [
          ...Object.entries(T.space).map(([k, v]) => num(`space/${k}`, v)),
          ...Object.entries(T.fontSize).map(([k, v]) => num(`text/${k}`, v)),
          ...Object.entries(T.size.icon).map(([k, v]) => num(`icon/${k}`, v)),
          ...Object.entries(T.size.control).map(([k, v]) => num(`control/${k}`, v)),
        ],
      },
      {
        name: 'WJ Register',
        modes: ['Operator', 'Consumer'],
        variables: [
          ...Object.keys(T.radius.operator).map((k) => ({
            name: `radius/${k}`,
            type: 'FLOAT',
            valuesByMode: {
              Operator: parseFloat(T.radius.operator[k]),
              Consumer: parseFloat(T.radius.consumer[k]),
            },
          })),
          ...['text-body', 'text-label', 'text-caption', 'text-title', 'row-height', 'gutter', 'card-padding'].map(
            (k) => ({
              name: `layout/${k}`,
              type: 'FLOAT',
              valuesByMode: {
                Operator: parseFloat(T.register.operator[k]),
                Consumer: parseFloat(T.register.consumer[k]),
              },
            })
          ),
        ],
      },
    ],
  };
}

/* ------------------------------------------------------------------ *
 * Audit
 * ------------------------------------------------------------------ */

function runAudit() {
  const fails = [];
  const check = (label, ratio, min) => {
    const ok = ratio >= min;
    if (!ok) fails.push(`${label} — ${ratio.toFixed(2)}:1, need ${min}:1`);
    return ok;
  };

  console.log('\nRamp contrast');
  for (const row of audit()) {
    const min = row.pair.startsWith('12') ? 7 : 4.5;
    check(`${row.theme}/${row.family} ${row.pair}`, row.ratio, min);
  }
  console.log(`  ${audit().length} ramp checks`);

  console.log('\nSemantic roles');
  for (const theme of ['light', 'dark']) {
    const s = T.semantic[theme];
    check(`${theme} fg-default on surface-default`, contrast(s['fg-default'], s['surface-default']), 7);
    check(`${theme} fg-default on bg-canvas`, contrast(s['fg-default'], s['bg-canvas']), 7);
    check(`${theme} fg-muted on surface-default`, contrast(s['fg-muted'], s['surface-default']), 4.5);
    check(`${theme} fg-subtle on surface-default`, contrast(s['fg-subtle'], s['surface-default']), 3);
    check(`${theme} accent-on-solid on accent-solid`, contrast(s['accent-on-solid'], s['accent-solid']), 4.5);
    for (const tone of ['success', 'warning', 'danger', 'info']) {
      check(`${theme} ${tone}-fg on ${tone}-subtle`, contrast(s[`${tone}-fg`], s[`${tone}-subtle`]), 4.5);
      check(`${theme} ink on ${tone}-solid`, contrast(bestInk(s[`${tone}-solid`]), s[`${tone}-solid`]), 4.5);
    }
    check(`${theme} border-default on surface-default`, contrast(s['border-default'], s['surface-default']), 1.3);
    /* WCAG 2.2 non-text contrast. A focus ring nobody can find is the same as
       no focus ring, and it is the failure keyboard users hit first. */
    check(`${theme} focus-ring on surface-default`, contrast(s['focus-ring'], s['surface-default']), 3);
    check(`${theme} focus-ring on bg-canvas`, contrast(s['focus-ring'], s['bg-canvas']), 3);
  }

  /* The one that actually bites: text sitting on a glass tier whose backdrop is
     the worst case — the opposite-luminance surface showing through. */
  console.log('\nText on glass (worst-case backdrop)');
  for (const theme of ['light', 'dark']) {
    const s = T.semantic[theme];
    const hostile = theme === 'light' ? '#000000' : '#ffffff';
    for (const tier of ['veil', 'pane', 'shell']) {
      const alpha = theme === 'light' ? T.glass[tier].alphaLight : T.glass[tier].alphaDark;
      const composited = over(s['glass-floor'], alpha, hostile);
      check(
        `${theme} fg-default on ${tier} over ${hostile}`,
        contrast(s['fg-default'], composited),
        4.5
      );
      check(
        `${theme} fg-muted on ${tier} over ${hostile}`,
        contrast(s['fg-muted'], composited),
        3
      );
    }
  }

  if (fails.length) {
    console.log(`\n✗ ${fails.length} failing:`);
    fails.forEach((f) => console.log(`    ${f}`));
  } else {
    console.log('\n✓ every check passes');
  }
  return fails;
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

const args = process.argv.slice(2);

if (args.includes('--check')) {
  const fails = runAudit();
  process.exit(fails.length ? 1 : 0);
}

console.log('Wash Junkie tokens\n');
out('wj.tokens.json', JSON.stringify(buildDTCG(), null, 2));
out('wj-tokens.css', buildCSS());
out('wj-tokens.ts', buildTS());
out('wj-tokens.native.ts', buildNative());
out('figma.variables.json', JSON.stringify(buildFigma(), null, 2));
runAudit();
