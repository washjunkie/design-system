# Colour

Six families, twelve steps each, generated in OKLCH from a hue and a chroma
curve. Source: [`tokens/palette.mjs`](../tokens/palette.mjs).

---

## Why OKLCH

Perceptual uniformity. Stepping lightness by an equal amount produces an equal
*apparent* step, so a twelve-step ramp reads as evenly spaced instead of
bunching in the midtones the way an HSL ramp does. It also means a per-business
accent can be re-derived from a single hue while keeping every lightness — and
therefore every contrast guarantee — exactly where it was.

Everything is authored in OKLCH and converted to sRGB hex at build time, with
chroma clamped by binary search so nothing ships out of gamut.

## The step scale

Step numbers mean the same thing **in every family and in both themes**. That
invariance is the whole point: a component written against `--wj-aqua-9` keeps
working when re-tinted to `--wj-sun-9`, and keeps working in dark, without
anyone re-checking contrast.

| Step | Role |
|---|---|
| 1 | App background |
| 2 | Subtle background |
| 3 | Component background — rest |
| 4 | Component background — hover |
| 5 | Component background — active / selected |
| 6 | Border — subtle, decorative separators |
| 7 | Border — default, component outlines |
| 8 | Border — strong, focus rings, hovered outlines |
| **9** | **Solid fill** — the loudest the colour gets |
| 10 | Solid fill — hover |
| 11 | Low-contrast text (passes AA on steps 1–5) |
| 12 | High-contrast text (passes AAA on step 1) |

## The families

| Family | Hue | Job |
|---|---|---|
| **Aqua** | 200° | Brand. Hue lifted straight off the logo artwork. |
| **Tide** | 258° | Depth and night. `info`. The dark end of the consumer register. |
| **Sun** | 72° | Warm counterpoint. `warning`. |
| **Moss** | 155° | `success`. |
| **Ember** | 27° | `danger`. |
| **Iris** | 300° | No semantic role. Exists so the categorical scale has a sixth chromatic hue. |
| **Slate** | 250° | Neutral, cool-leaning so it sits with the brand rather than fighting it. |

Neutrals carry a whisper of hue rather than none. A dead-grey UI looks cheap
next to a saturated brand, and the eye reads the slight tint as intentional.

---

## The one thing to know about the brand teal

**`#2cbec5` is a mark colour. It is not a button colour.**

At 73% lightness it carries white text at **2.26:1** (`node tokens/print.mjs`).
Shipping it as the primary button would put the most-pressed control in the
product below AA.

So there are two teals, and they do different jobs:

| Token | Value | Use |
|---|---|---|
| `--wj-brand-mark` | `#2cbec5` | The logo. Graphic flourishes. Glass tints. Text on dark. **Never re-tinted by a business accent.** |
| `--wj-accent-solid` | `--wj-aqua-9` | Buttons, selection, links, focus. Re-tinted per business. |

This is also why step 9 sits at **54% lightness** rather than the more common
62%. At 62% the brightest families fail white-on-colour:

```
aqua  L62 → #00999f   white 3.47:1  ✗
moss  L62 → #2e9d61   white 3.44:1  ✗
```

54% is the lightest value that clears 4.5:1 for all six families with margin.
`node tokens/build.mjs --check` re-proves it on every build.

---

## Semantic roles

Product code touches **only** this layer.

### Surfaces

| Role | Light | Dark |
|---|---|---|
| `bg-canvas` | slate-1 | slate-1 |
| `surface-default` | white | slate-2 |
| `surface-raised` | white | slate-3 |
| `surface-sunken` | slate-2 | slate-1 |
| `surface-inset` | slate-3 | slate-3 |
| `surface-hover` | slate-3 | slate-4 |
| `surface-active` | slate-4 | slate-5 |
| `surface-selected` | aqua-3 | aqua-4 |

### Text

`fg-default` (AAA on surfaces) · `fg-muted` (AA) · `fg-subtle` (3:1, non-text
and large only) · `fg-disabled` · `fg-on-solid`

### Borders

`border-subtle` (dividers inside a component) · `border-default` (component
outlines) · `border-strong` (hover, emphasis)

### Accent and status

Each of `accent`, `success`, `warning`, `danger`, `info` exposes
`-subtle` (background), `-border`, `-solid` (fill), `-fg` (text on subtle).

### Category — colour that labels a kind, not a state

`category-1` … `category-7`, each exposing the same four roles. Use it whenever
you need several colours that are simply **different from each other**: a chart
with four series, a legend, the role chips on an identity row.

| | Hue | |
|---|---|---|
| `category-1` | aqua | |
| `category-2` | sun | |
| `category-3` | tide | |
| `category-4` | moss | |
| `category-5` | ember | |
| `category-6` | iris | |
| `category-7` | slate | near-neutral — the "other" bucket, not a sixth colour |

Ordered so **adjacent indices are far apart in hue** — a categorical palette is
read by comparison, so putting aqua next to tide would defeat the point. Assign
from 1 upward and the separation comes for free.

⚠️ **This is what you reach for instead of bending a status colour.** `danger`
for "the red one" is the rule below being broken, and before this scale existed
it was the only way to get a sixth colour without hard-coding a hex. Both
happened.

ℹ️ Six of the seven are the semantic families, so a category can share a hue
with a tone — `category-5` and `danger` are both ember. That only matters if a
kind and a state appear in one column, which by construction they don't. **Iris
was added for this scale**: the platform console has six identity facets and
five semantic hues plus a neutral could dress only five of them, so the sixth
lived as a hard-coded `oklch(52% 0.17 300)` in a product stylesheet, outside
every check on this page.

⚠️ **`category-7` is slate — near-neutral, and it is the "other" bucket rather
than a seventh colour.** A grey chip in a row of coloured ones reads as
*unclassified*. Do not hand it a real category because you ran out.

### Glass

`glass-tint` · `glass-floor` · `glass-edge` · `glass-edge-low` ·
`glass-hairline` · `glass-sheen` · `scrim-ink`

On dark, `glass-edge` is doing almost all the work of separating one layer from
the next — the blur alone gives you nothing there. It is far more load-bearing
in dark than in light, which is why it reads as a hairline of light rather than
a wash.

---

## Rules

**Never hard-code a hex.** Not in CSS, not in a chart config, not in an email
template. `tokens/dist/wj-tokens.ts` exports `resolve(role, theme)` for the
places a CSS variable cannot be read.

**Never use a raw ramp step in a component.** `--wj-aqua-9` in a component is a
bug waiting for the next theme change. If you want a ramp because you need
*several distinct colours*, that is what `category-1…6` is for.

**Status is never colour alone.** Colour + dot + word, every time. See
[Accessibility](12-accessibility.md).

**Semantic colours mean their semantics.** `danger` is destructive or failed.
It is not "the red one". A red "Export" button teaches operators to ignore red.

**Direction is not the same as good.** Revenue up is good; refunds up is not.
`<Stat upIsGood={false}>` colours the delta by meaning, not by arrow. A
dashboard that paints every increase green quietly lies to the operator.

---

## Off the screen

Colour for print, vinyl, thread, and thermal receipts is the
[brand guide's](00-brand-guide/04-colour-and-materials.md) job, not this page's.
Two findings from it are worth knowing here because they explain the palette:

- **The brand teal sits in the hardest region for process ink** — saturated
  cyan-green above 60% lightness is the largest part of sRGB that offset CMYK
  cannot reach. Anything where the teal is the hero needs a spot colour.
- **A white mark on brand teal is 2.26:1** — below the 3:1 floor for non-text
  graphics. On the deeper `--wj-accent-solid` it is 4.86:1. Same reason the logo
  teal is not a button colour, hitting a different medium.

```bash
node tokens/print.mjs                     # production colour report
node tokens/print.mjs '#2cbec5' '#00A5B5' # ΔE2000 against a spot candidate
```

## Verifying

```bash
node tokens/build.mjs --check
```

Runs, and fails the build on:

- every ramp's steps 11 and 12 against steps 1 and 3 (4.5:1 / 7:1)
- best ink on every step 9 (4.5:1)
- every semantic pairing that carries text
- **body text on every glass tier composited over pure black and pure white**

That last one is the check that catches the failure mode people actually ship.
