# Wash Junkie · Design System

**Liquid Glass, from the console to the kerb.**

One material language across all five platform surfaces — the Service Provider
Console, the Customer App, the Driver App, the Agent Console, and everything
public-facing. Glass carries the chrome; data stays solid. Every colour, space,
and duration is generated from one source of truth and contrast-audited on every
build.

---

## Look at it first

```bash
python3 -m http.server 4180 --directory "$(pwd)"
# → http://localhost:4180/showcase/
```

The showcase links the **real** stylesheets, not a copy. If something renders
wrong there, it is wrong in the product. It has live switches for theme,
register, density, and business accent.

## Build the tokens

```bash
node tokens/build.mjs           # write every output, then audit
node tokens/build.mjs --check   # audit only — non-zero exit on failure
node tokens/checklinks.mjs      # every relative doc link resolves
node tokens/print.mjs           # production colour: CMYK, TAC, 1-bit, ink choice
node tokens/color.mjs a b       # contrast ratio between two colours, with verdicts
node tokens/geometry.mjs --check  # the logo's feature ratios still match 03
```

---

## The six principles

1. **Glass is a material, not a decoration.** Refraction, saturation,
   specularity, depth. All four, or it is just a translucent div.
2. **Glass carries the chrome. Data stays solid.** Four tiers, and the tier is a
   statement about elevation, not about how interesting something is.
3. **Transparency costs the most and buys the least.** Glassiness comes from
   blur and the specular rim. Alphas stay above the level at which body text
   clears AA over pure black *and* pure white.
4. **Fluid, not bouncy.** `cubic-bezier(0.32, 0.72, 0, 1)`. Exactly one thing in
   the system overshoots.
5. **Two registers, one system.** Operator reads calm and dense; consumer reads
   fresh and generous. Same tokens.
6. **The token is the contract.** Primitive → semantic → component. Reaching
   past a layer is a bug.

Full reasoning: [docs/01-principles.md](docs/01-principles.md).

---

## Documentation

| | |
|---|---|
| [00 · **Brand guide**](docs/00-brand-guide/README.md) | Ten documents on the identity layer — strategy, voice, art direction, everything physical, merchandise, and who may act as the company. A separate document for a separate audience; see its README for why. |
| [01 · Principles](docs/01-principles.md) | The six ideas everything else follows from |
| [02 · Brand](docs/02-brand.md) | Marks, clear space, minimum sizes, voice |
| [03 · Colour](docs/03-color.md) | OKLCH ramps, semantic roles, and why the logo teal is not a button |
| [04 · Typography](docs/04-typography.md) | Inter / Outfit / JetBrains Mono, roles not sizes |
| [05 · Space & layout](docs/05-space-and-layout.md) | 4px grid, radius, breakpoints, touch targets |
| [06 · **Liquid Glass**](docs/06-liquid-glass.md) | The material spec. Start here for the interesting part. |
| [07 · Motion](docs/07-motion.md) | Durations, easings, the sampled spring |
| [08 · Iconography](docs/08-iconography.md) | The spec, the laundry set, when to label |
| [09 · UI kit](docs/09-components.md) | Every component, and when not to use it |
| [10 · Patterns](docs/10-patterns.md) | Navigation, layering, forms, tables at volume, realtime |
| [11 · Surfaces](docs/11-surfaces.md) | How each of the five expresses the system |
| [12 · Accessibility](docs/12-accessibility.md) | What's enforced, what's left to you |
| [13 · White-label](docs/13-white-label.md) | Per-business accent, and its guardrails |
| [14 · Governance](docs/14-governance.md) | Changing things without breaking things |
| [15 · Adoption](docs/15-adoption.md) | Getting this into `web/` without a rewrite |

---

## What's here

```
tokens/
  color.mjs          OKLCH ↔ sRGB, contrast, gamut clamping. No dependencies.
                     Also the contrast CLI — print.mjs never returns a ratio.
  palette.mjs        The ramp recipe — six families × twelve steps
  source.mjs         Everything non-colour + the semantic mapping
  build.mjs          Compiles to five outputs, then audits
  print.mjs          Production colour: CMYK, TAC, 1-bit, ink choice, ΔE2000
  checklinks.mjs     Every relative link in the docs resolves
  geometry.mjs       Measures the two feature ratios off assets/ and diffs them
                     against 03's table. Every physical minimum divides by them,
                     so a redraw must not pass silently. Needs Chrome.
  dist/              ── generated, never edited by hand ──
    wj.tokens.json         W3C DTCG — the portable spec
    wj-tokens.css          CSS custom properties, themed + registered
    wj-tokens.ts           typed TS object, for logic that needs a value
    wj-tokens.native.ts    React Native / native targets — numbers, hex, no oklch
    figma.variables.json   Figma Variables import shape

css/
  wj-material.css    The Liquid Glass material
  wj-components.css  The UI kit, plain CSS
  wj-bridge.css      Maps the console's existing token names onto this system

packages/react/      Typed React bindings. Behaviour and ARIA, never appearance.

pdf/
  build.mjs          The ten brand-guide chapters → one A4 document
  fonts.mjs          Fetches and inlines the three faces as data URIs
  print.css          Print overrides. Typeset in the system's own tokens.
  verify.mjs         Fails if the built PDF is not the document we think it is
  dist/              ── gitignored: `node pdf/build.mjs` regenerates it ──

showcase/
  index.html         The design system, live. Links the real CSS.
  brand.html         The brand guide, live — contrast computed at render time

assets/              Brand artwork
```

## Using it

```ts
import '@washjunkie/tokens/wj-tokens.css';
import '@washjunkie/ui/wj-material.css';
import '@washjunkie/ui/wj-components.css';
```

Order matters — material and components both read the token variables.

```tsx
import { WJProvider, GlassSurface, Button } from '@washjunkie/ui';

<WJProvider register="operator" theme="system">
  <GlassSurface tier="pane">
    <Button variant="primary">Create order</Button>
  </GlassSurface>
</WJProvider>
```

Theming hooks, all set on `<html>` and all inherited:

```html
<html data-wj-theme="dark"          <!-- omit to follow the OS -->
      data-wj-register="consumer"
      data-wj-density="compact"
      style="--wj-accent-h: 268">   <!-- per-business accent -->
```

Non-React surfaces use the same class names and get the same product.

## In Figma

`tokens/dist/figma.variables.json` imports as three collections:

| Collection | Modes |
|---|---|
| **WJ Colour** | Light · Dark |
| **WJ Dimension** | Value |
| **WJ Register** | Operator · Consumer |

Bind fills and strokes to `semantic/*`, never to `palette/*` — the same rule
that applies in code, for the same reason. Switching the Colour collection's
mode should flip an entire frame to dark with nothing else to change; if it
doesn't, something is bound to a raw ramp step.

---

## The two facts most worth knowing

**`#2cbec5` is a mark colour, not a button colour.** At 73% lightness it carries
white text at 2.26:1. `--wj-brand-mark` is the logo; `--wj-accent-solid`
(aqua-9, 54% lightness, 4.86:1) does the interactive work. This is why the whole
palette's step 9 sits lower than convention. Both figures are `node
tokens/print.mjs` output.

**The glass alphas are high on purpose.** Glassiness is blur, saturation, and
the specular rim — not transparency. The alphas sit above the floor at which
body text still clears 4.5:1 over a *pure black or pure white* backdrop, which
is why there is no "don't put glass over photos" caveat anywhere in this system.
`build.mjs --check` re-derives that floor on every build.

---

Project knowledge lives in the
[vault](https://github.com/washjunkie/wiki) — see
`Decisions/Design System.md`. The vault is canonical for platform decisions;
this repo is canonical for how they look.
