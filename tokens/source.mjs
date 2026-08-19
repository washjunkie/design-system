/**
 * The authored source of every non-colour token, plus the semantic layer that
 * maps raw palette steps onto roles.
 *
 * Two layers, and the distinction matters:
 *
 *   PRIMITIVE   `--wj-aqua-9`, `--wj-space-6`, `--wj-dur-base`
 *               Raw values. Theme-independent. Never referenced by a component.
 *
 *   SEMANTIC    `--wj-fg-default`, `--wj-surface-raised`, `--wj-accent-solid`
 *               What a thing is *for*. Flips between light and dark, and
 *               between the operator and consumer registers. This is the only
 *               layer components are allowed to touch.
 *
 * A component that reaches past the semantic layer into a primitive is a bug:
 * it will look correct today and wrong the moment a business re-tints the
 * console or a viewer switches to dark.
 */

import { palette, BRAND_MARK } from './palette.mjs';

/* ------------------------------------------------------------------ *
 * Primitives — dimension
 * ------------------------------------------------------------------ */

/** 4px base grid. Named by index, not by t-shirt size, so the scale can grow
 *  in the middle without renaming everything above the insertion point. */
export const space = {
  0: '0px',
  1: '2px',
  2: '4px',
  3: '6px',
  4: '8px',
  5: '12px',
  6: '16px',
  7: '20px',
  8: '24px',
  9: '32px',
  10: '40px',
  11: '48px',
  12: '64px',
  13: '80px',
  14: '96px',
  15: '128px',
};

/** Corner radii. The register swaps which physical value each role gets —
 *  operator surfaces are crisper, consumer surfaces softer. */
export const radius = {
  operator: { xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', '3xl': '28px' },
  consumer: { xs: '6px', sm: '10px', md: '14px', lg: '18px', xl: '24px', '2xl': '32px', '3xl': '44px' },
  /** The touch ladder — see `touch` below. Softer than operator and a shade
   *  crisper than consumer, and the steps are spaced so that CONCENTRIC
   *  nesting lands on a real token rather than between two: an `xl` card at
   *  `--wj-space-5` (12px) of padding leaves 16px, which is `lg`; that `lg`
   *  panel at 8px leaves 14px, near `md`. A ladder whose gaps match the
   *  padding scale is what makes concentricity composable instead of
   *  arithmetic somebody has to redo per component. */
  touch: { xs: '8px', sm: '12px', md: '14px', lg: '16px', xl: '22px', '2xl': '28px', '3xl': '38px' },
  full: '999px',
};

export const size = {
  /** Minimum hit target. 44 on touch surfaces is the accessibility floor;
   *  the operator register may go to 32 for pointer-only dense toolbars. */
  touch: '44px',
  touchDense: '32px',
  control: { sm: '28px', md: '34px', lg: '40px', xl: '48px' },
  icon: { xs: '14px', sm: '16px', md: '18px', lg: '20px', xl: '24px', '2xl': '32px' },
  container: { sm: '640px', md: '820px', lg: '1080px', xl: '1320px', prose: '68ch' },
};

export const breakpoint = {
  xs: '380px',
  sm: '600px',
  md: '840px',
  lg: '1080px',
  xl: '1320px',
  '2xl': '1600px',
};

/** Stacking order. Every floating layer in the system draws from this list —
 *  an ad-hoc `z-index: 9999` anywhere is how overlays start fighting. */
export const zIndex = {
  below: '-1',
  base: '0',
  raised: '10',
  sticky: '100',
  header: '200',
  drawer: '300',
  scrim: '400',
  modal: '500',
  popover: '600',
  toast: '700',
  tooltip: '800',
};

/* ------------------------------------------------------------------ *
 * Primitives — type
 * ------------------------------------------------------------------ */

export const font = {
  /** UI and body. Chosen for legibility at 12–15px in dense tables, where a
   *  characterful face costs real reading speed. */
  sans: "'Inter', 'Inter var', system-ui, -apple-system, 'Segoe UI', sans-serif",
  /** Display. Rounded geometric, sympathetic to the wordmark's letterforms.
   *  Headlines, marketing, empty states, numbers that are the point. */
  display: "'Outfit', 'Inter Tight', 'Inter', system-ui, sans-serif",
  /** Tabular figures for IDs, money, and anything that must align in a column. */
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
};

/** One scale, shared by both registers. Roles below decide who uses what. */
export const fontSize = {
  '3xs': '10px',
  '2xs': '11px',
  xs: '12px',
  sm: '13px',
  md: '15px',
  lg: '17px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '38px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '76px',
};

export const lineHeight = {
  none: '1',
  tight: '1.15',
  snug: '1.3',
  normal: '1.5',
  relaxed: '1.65',
};

export const letterSpacing = {
  /** Large display type needs negative tracking or it reads loose; small caps
   *  labels need positive tracking or they read as a smear. */
  tighter: '-0.03em',
  tight: '-0.015em',
  normal: '0em',
  wide: '0.02em',
  wider: '0.06em',
  widest: '0.12em',
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  /** Titles on a touch surface only. At 26px+ on a phone held at arm's length
   *  700 reads as merely firm; 800 is what makes a heading the first thing the
   *  eye lands on. Deliberately NOT available to body copy — Inter at 800 in a
   *  dense table is a wall, and Outfit is the face that carries it. */
  extrabold: '800',
};

/* ------------------------------------------------------------------ *
 * Primitives — motion
 * ------------------------------------------------------------------ */

export const duration = {
  instant: '0ms',
  /** State echo: hover, press, focus ring. Fast enough to feel like the
   *  pointer caused it rather than the app deciding afterwards. */
  fast: '120ms',
  /** The default. Most enter/exit transitions. */
  base: '180ms',
  /** Something is changing shape or position, not just colour. */
  slow: '260ms',
  /** A layer arriving: sheet, modal, drawer. */
  slower: '420ms',
  /** Full-surface transitions and celebratory moments only. */
  slowest: '640ms',
};

export const easing = {
  /** The signature. Fast departure, long glide, dead stop — the curve that
   *  makes glass read as heavy and lubricated rather than snappy. Use it for
   *  anything the material itself does: opening, morphing, settling. */
  glass: 'cubic-bezier(0.32, 0.72, 0, 1)',
  /** Content entering. Decelerates into place. */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Content leaving. Accelerates away; exits should be quicker than entrances. */
  in: 'cubic-bezier(0.7, 0, 0.84, 0)',
  /** Moving between two on-screen states. */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  /** Linear, for continuous motion only — spinners, progress, marquees. */
  linear: 'linear',
  /* `fluid` is a sampled spring; build.mjs generates it as a linear() list
     because a cubic bézier cannot overshoot. */
};

/** Damped-spring parameters for the generated `--wj-ease-fluid` curve.
 *  Slight overshoot (~4%) — enough to feel elastic, not enough to look bouncy
 *  in an operator console someone stares at for eight hours. */
export const spring = { stiffness: 210, damping: 26, mass: 1, samples: 28 };

/* ------------------------------------------------------------------ *
 * Primitives — the Liquid Glass material
 * ------------------------------------------------------------------ */

/**
 * Four tiers, plus solid. A tier is a *complete* material description: how far
 * it blurs, how much of the backdrop it lets through, how saturated that
 * backdrop becomes, and how hard the specular edge catches.
 *
 * ── The alpha values look high. That is deliberate, and it is the single most
 * important correction to a naive reading of "liquid glass". ──
 *
 * Glassiness is carried by BLUR RADIUS, SATURATION LIFT, the SPECULAR EDGE and
 * the SHADOW — not by how much you can see through it. Real frosted glass is
 * mostly opaque; what tells you it is glass is that the world behind it is
 * smeared, colour-boosted, and that light catches its rim. Apple's own system
 * materials sit far closer to opaque than most imitations of them.
 *
 * Transparency is the one ingredient that costs legibility, and it buys the
 * least. So the tiers spend their budget on blur (14 → 40px) and edge
 * (0.4 → 0.85) while keeping alpha above the level at which body text still
 * clears 4.5:1 over a *pure black or pure white* backdrop — the true worst
 * case, with no "don't put it over photos" caveat for anyone to forget.
 * Those floors (0.72 light / 0.66 dark) are derived, not guessed;
 * `build.mjs --check` re-derives them on every build.
 *
 * The rule that keeps the stack from turning to mush: tiers describe how far a
 * surface floats above the page, and no more than two glass tiers may be
 * visible in one stack. See docs/06-liquid-glass.md.
 */
export const glass = {
  /** Tier 0 — not glass. Data lives here: tables, forms, long text. */
  solid: { blur: '0px', saturate: '100%', alphaLight: 1, alphaDark: 1, edge: 0 },
  /** Tier 1 · Veil — inline chrome that scrolls with content: sticky table
   *  headers, toolbars, floating chips, segmented controls. */
  veil: { blur: '14px', saturate: '160%', alphaLight: 0.82, alphaDark: 0.78, edge: 0.4 },
  /** Tier 2 · Pane — persistent structure: nav rail, sidebar, tab bar,
   *  app header. On screen all day, over anything. */
  pane: { blur: '24px', saturate: '175%', alphaLight: 0.78, alphaDark: 0.73, edge: 0.6 },
  /** Tier 3 · Shell — a layer that arrived: sheets, modals, popovers,
   *  command palette, toasts. The deepest blur in the system. */
  shell: { blur: '40px', saturate: '190%', alphaLight: 0.74, alphaDark: 0.69, edge: 0.85 },
  /** Backdrop — the dimmed, lightly-blurred plane behind a Shell. Not a
   *  surface; nothing is ever drawn directly on it. */
  scrim: { blur: '8px', saturate: '100%', alphaLight: 0.32, alphaDark: 0.55, edge: 0 },
};

/* ------------------------------------------------------------------ *
 * Semantic layer
 * ------------------------------------------------------------------ */

const L = palette.light;
const D = palette.dark;

/**
 * Role → palette step. Written once per theme so the mapping is inspectable:
 * you can read down this list and know exactly what every surface in the
 * product is made of.
 */
export const semantic = {
  light: {
    'bg-canvas': L.slate[0],
    'bg-subtle': L.slate[1],
    'surface-default': '#ffffff',
    'surface-raised': '#ffffff',
    'surface-sunken': L.slate[1],
    'surface-inset': L.slate[2],
    'surface-hover': L.slate[2],
    'surface-active': L.slate[3],
    'surface-selected': L.aqua[2],

    'border-subtle': L.slate[4],
    'border-default': L.slate[5],
    'border-strong': L.slate[6],
    'border-inverse': L.slate[10],

    'fg-default': L.slate[11],
    'fg-muted': L.slate[10],
    'fg-subtle': L.slate[8],
    'fg-disabled': L.slate[7],
    'fg-on-solid': '#ffffff',
    'fg-inverse': '#ffffff',

    'accent-subtle': L.aqua[2],
    'accent-muted': L.aqua[4],
    'accent-border': L.aqua[6],
    'accent-solid': L.aqua[8],
    'accent-solid-hover': L.aqua[9],
    'accent-fg': L.aqua[10],
    'accent-on-solid': '#ffffff',

    'success-subtle': L.moss[2],
    'success-border': L.moss[6],
    'success-solid': L.moss[8],
    'success-fg': L.moss[10],
    'warning-subtle': L.sun[2],
    'warning-border': L.sun[6],
    'warning-solid': L.sun[8],
    'warning-fg': L.sun[10],
    'danger-subtle': L.ember[2],
    'danger-border': L.ember[6],
    'danger-solid': L.ember[8],
    'danger-fg': L.ember[10],
    'info-subtle': L.tide[2],
    'info-border': L.tide[6],
    'info-solid': L.tide[8],
    'info-fg': L.tide[10],

    /** The tone glass takes on when it has no content to sample. */
    'glass-tint': '#ffffff',
    'glass-floor': '#ffffff',
    'glass-edge': 'rgba(255, 255, 255, 0.90)',
    'glass-edge-low': 'rgba(255, 255, 255, 0.45)',
    'glass-hairline': 'rgba(9, 12, 16, 0.10)',
    'glass-sheen': 'rgba(255, 255, 255, 0.35)',
    'scrim-ink': '#0b1013',

    'focus-ring': L.aqua[8],
  },

  dark: {
    'bg-canvas': D.slate[0],
    'bg-subtle': D.slate[1],
    'surface-default': D.slate[1],
    'surface-raised': D.slate[2],
    'surface-sunken': D.slate[0],
    'surface-inset': D.slate[2],
    'surface-hover': D.slate[3],
    'surface-active': D.slate[4],
    'surface-selected': D.aqua[3],

    'border-subtle': D.slate[4],
    'border-default': D.slate[5],
    'border-strong': D.slate[6],
    'border-inverse': D.slate[10],

    'fg-default': D.slate[11],
    'fg-muted': D.slate[10],
    'fg-subtle': D.slate[8],
    'fg-disabled': D.slate[7],
    'fg-on-solid': '#ffffff',
    'fg-inverse': D.slate[0],

    'accent-subtle': D.aqua[2],
    'accent-muted': D.aqua[4],
    'accent-border': D.aqua[6],
    'accent-solid': D.aqua[8],
    'accent-solid-hover': D.aqua[9],
    'accent-fg': D.aqua[10],
    'accent-on-solid': '#ffffff',

    'success-subtle': D.moss[2],
    'success-border': D.moss[6],
    'success-solid': D.moss[8],
    'success-fg': D.moss[10],
    'warning-subtle': D.sun[2],
    'warning-border': D.sun[6],
    'warning-solid': D.sun[8],
    'warning-fg': D.sun[10],
    'danger-subtle': D.ember[2],
    'danger-border': D.ember[6],
    'danger-solid': D.ember[8],
    'danger-fg': D.ember[10],
    'info-subtle': D.tide[2],
    'info-border': D.tide[6],
    'info-solid': D.tide[8],
    'info-fg': D.tide[10],

    'glass-tint': D.slate[3],
    'glass-floor': D.slate[1],
    /* On dark, the specular edge is the *only* thing separating one glass
       layer from the next — the blur alone gives you nothing. It is much more
       load-bearing here than in light, which is why it reads as a hairline of
       light rather than a wash. */
    'glass-edge': 'rgba(255, 255, 255, 0.22)',
    'glass-edge-low': 'rgba(255, 255, 255, 0.08)',
    'glass-hairline': 'rgba(255, 255, 255, 0.07)',
    'glass-sheen': 'rgba(255, 255, 255, 0.06)',
    'scrim-ink': '#000000',

    'focus-ring': D.aqua[9],
  },
};

/**
 * Elevation. Two families, because glass and solid cast light differently:
 * a solid card sits *on* the page, a glass layer floats *above* it and needs a
 * wider, softer, further-offset shadow to sell the gap.
 */
export const shadow = {
  light: {
    xs: '0 1px 1px rgba(11, 16, 19, 0.04)',
    sm: '0 1px 2px rgba(11, 16, 19, 0.06), 0 1px 1px rgba(11, 16, 19, 0.04)',
    md: '0 8px 20px -8px rgba(11, 16, 19, 0.14), 0 2px 4px rgba(11, 16, 19, 0.06)',
    lg: '0 24px 48px -16px rgba(11, 16, 19, 0.18), 0 4px 8px rgba(11, 16, 19, 0.06)',
    xl: '0 40px 80px -24px rgba(11, 16, 19, 0.22), 0 8px 16px rgba(11, 16, 19, 0.07)',
    'glass-sm': '0 2px 8px -2px rgba(11, 16, 19, 0.10), 0 1px 2px rgba(11, 16, 19, 0.05)',
    'glass-md': '0 12px 32px -8px rgba(11, 16, 19, 0.16), 0 2px 8px rgba(11, 16, 19, 0.06)',
    'glass-lg': '0 32px 64px -16px rgba(11, 16, 19, 0.24), 0 8px 20px rgba(11, 16, 19, 0.08)',
  },
  dark: {
    xs: '0 1px 1px rgba(0, 0, 0, 0.40)',
    sm: '0 1px 2px rgba(0, 0, 0, 0.45), 0 1px 1px rgba(0, 0, 0, 0.30)',
    md: '0 8px 20px -8px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.35)',
    lg: '0 24px 48px -16px rgba(0, 0, 0, 0.60), 0 4px 8px rgba(0, 0, 0, 0.35)',
    xl: '0 40px 80px -24px rgba(0, 0, 0, 0.68), 0 8px 16px rgba(0, 0, 0, 0.40)',
    'glass-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.30)',
    'glass-md': '0 12px 32px -8px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.35)',
    'glass-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.65), 0 8px 20px rgba(0, 0, 0, 0.40)',
  },
};

/**
 * The two registers. Same tokens, different expression — this is the axis that
 * lets one system run an eight-hour operator console and a consumer app that
 * has to feel good in four seconds.
 */
export const register = {
  operator: {
    'text-body': fontSize.md,
    'text-label': fontSize.sm,
    'text-caption': fontSize.xs,
    'text-title-sm': fontSize.lg,
    'text-title': fontSize.xl,
    'text-title-lg': fontSize['2xl'],
    'text-display': fontSize['3xl'],
    'leading-body': lineHeight.normal,
    'row-height': '38px',
    'control-height': size.control.md,
    'gutter': space[6],
    'section-gap': space[9],
    'card-padding': space[6],
    'motion-scale': '0.85',
    'glass-max-tier': '3',
    font: font.sans,
  },
  consumer: {
    'text-body': fontSize.lg,
    'text-label': fontSize.md,
    'text-caption': fontSize.sm,
    'text-title-sm': fontSize.xl,
    'text-title': fontSize['2xl'],
    'text-title-lg': fontSize['3xl'],
    'text-display': fontSize['5xl'],
    'leading-body': lineHeight.relaxed,
    'row-height': '56px',
    'control-height': size.control.xl,
    'gutter': space[7],
    'section-gap': space[12],
    'card-padding': space[8],
    'motion-scale': '1',
    'glass-max-tier': '3',
    font: font.sans,
  },
};

/**
 * Touch — a third axis, orthogonal to both register and density.
 *
 * NOT a third register. The system's whole claim is "two registers, one
 * system", and a register is a statement about WHO is reading: an operator
 * doing this for the four-hundredth time today, or a customer doing it once.
 * A phone does not change who is reading. It changes what their hands can
 * reach and how far the screen is from their face — which is the same kind of
 * fact as density, and belongs on the same kind of axis.
 *
 * So this overlays whichever register is active. The console stays
 * `operator` on a phone; it does not become a consumer app with an operator's
 * data in it.
 *
 * Applied automatically by a media query (see build.mjs) rather than by an
 * attribute the app has to remember to set — a token layer that depends on
 * JavaScript having run is a token layer that is wrong on first paint.
 * `[data-wj-touch]` forces it on or off for the showcase and for testing.
 */
export const touch = {
  /* ── Type. Bolder and larger, because the reading distance is longer and
     the glance is shorter. 16px body is also the floor below which iOS Safari
     zooms the whole document on focus and never zooms back out. */
  'text-body': fontSize.lg,          //  15 → 17
  'text-label': fontSize.md,         //  13 → 15
  'text-caption': fontSize.sm,       //  12 → 13
  'text-title-sm': fontSize.xl,      //  17 → 20
  'text-title': fontSize['2xl'],     //  20 → 24
  'text-title-lg': fontSize['3xl'],  //  24 → 30
  'text-display': fontSize['4xl'],   //  30 → 38
  'leading-body': lineHeight.normal,

  /* ── Weight and tracking. The display face gets heavier and tighter; this
     is the single biggest contributor to "bolder", far more than size. */
  'weight-title': fontWeight.extrabold,
  'tracking-title': letterSpacing.tighter,

  /* ── Rhythm. Rows and controls clear the 44px accessibility floor with
     room, and the gutter grows slightly so full-bleed cards still breathe. */
  'row-height': '52px',
  'control-height': size.control.xl,
  gutter: space[6],
  'card-padding': space[6],
  /* Sections sit CLOSER on a phone, not further apart. On a desktop the gap
     separates things the eye takes in together; on a phone only one section is
     on screen at a time, so a 32px gap is just scrolling. */
  'section-gap': space[7],

  /* ── Motion at full speed. The operator register runs at 0.85 because
     someone repeating an action four hundred times wants it out of the way.
     A phone is the opposite case: touch has no hover to telegraph intent, so
     the animation IS the feedback, and clipping it reads as a dropped frame. */
  'motion-scale': '1',

  /* ── Concentric defaults. `--wj-r` is the outer radius a container rounds
     to and `--wj-p` the inset it holds; children read `--wj-r` and get the
     derived inner value. See `wj-touch.css`. */
  r: 'var(--wj-radius-xl)',
  p: space[6],
};

export const brand = {
  /** Never re-tinted, never overridden by a business accent. The mark is ours. */
  mark: BRAND_MARK,
  markInk: '#ffffff',
  wordmarkRatio: 325.06 / 56.01,
  markRatio: 100.78 / 49.9,
};

export { palette };
