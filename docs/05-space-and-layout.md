# Space & layout

---

## The grid

4px base. Named by index rather than t-shirt size, so the scale can grow in the
middle without renaming everything above the insertion point.

| Token | px | Typical use |
|---|---|---|
| `--wj-space-1` | 2 | Hairline nudges |
| `--wj-space-2` | 4 | Icon-to-dot |
| `--wj-space-3` | 6 | Inside a badge |
| `--wj-space-4` | 8 | Icon-to-label, tight stacks |
| `--wj-space-5` | 12 | Control padding, related items |
| `--wj-space-6` | 16 | **Default gap.** Card padding (operator) |
| `--wj-space-7` | 20 | Consumer gutter |
| `--wj-space-8` | 24 | Card padding (consumer), modal padding |
| `--wj-space-9` | 32 | Section gap (operator) |
| `--wj-space-10–12` | 40 / 48 / 64 | Section gap (consumer), page rhythm |
| `--wj-space-13–15` | 80 / 96 / 128 | Marketing rhythm |

Prefer `gap` over margins. A stack that owns its own spacing composes; a child
that carries a bottom margin has to be un-styled every time it appears last.

## Register-aware layout tokens

Don't reach for a raw space token where one of these fits — these are what the
register switches.

| Token | Operator | Consumer |
|---|---|---|
| `--wj-gutter` | 16px | 20px |
| `--wj-section-gap` | 32px | 64px |
| `--wj-card-padding` | 16px | 24px |
| `--wj-row-height` | 38px | 56px |
| `--wj-control-height` | 34px | 48px |

Density is orthogonal: `data-wj-density="compact"` tightens rhythm only
(rows to 32px, gutter to 12px). An operator can compact the console without
turning it into a different product.

---

## Radius

| | Operator | Consumer |
|---|---|---|
| `xs` | 4 | 6 |
| `sm` | 6 | 10 |
| `md` | 8 | 14 |
| `lg` | 12 | 18 |
| `xl` | 16 | 24 |
| `2xl` | 20 | 32 |
| `3xl` | 28 | 44 |

**Concentric rounding.** An inner radius equals the outer radius minus the
padding between them.

```
card radius 16, padding 12  →  inner element radius 4
```

Matched radii at different insets read as a mistake — the inner corner looks
too round. This is one of the few places the eye is reliably better than the
spec at spotting an error.

---

## Layout helpers

Deliberately about a dozen. A design system that ships a utility framework loses
the ability to change its own layout decisions.

```html
<div class="wj-stack">              <!-- column, gap 16 -->
<div class="wj-stack" data-gap="sm"><!-- gap 8 -->
<div class="wj-row">                <!-- row, centred, gap 12 -->
<div class="wj-row" data-justify="between">
<span class="wj-spacer">            <!-- flex: 1 -->
<div class="wj-grid">               <!-- grid, gap = gutter -->
<div class="wj-section">            <!-- column, gap = section-gap -->
<div class="wj-container">          <!-- max 1080, centred, gutter padding -->
<hr class="wj-divider">
<span class="wj-sr-only">
```

Anything more specific belongs in the feature, not here.

---

## Breakpoints

| | Width | Shape |
|---|---|---|
| `xs` | 380 | Small phones |
| `sm` | 600 | Phone → large phone |
| `md` | 840 | Tablet portrait. **Nav rail collapses below this.** |
| `lg` | 1080 | Tablet landscape / small laptop |
| `xl` | 1320 | Desktop. Console's design target. |
| `2xl` | 1600 | Wide desktop |

Exposed as `--wj-bp-*` for JS and container queries. `@media` needs literals —
custom properties are not valid in media queries.

**Prefer container queries** for components. A card that has to know the
viewport width is a card that breaks the moment it moves into a sidebar. The
console has three column configurations; viewport queries would need all
three encoded into every component.

---

## Touch targets

| Token | px | When |
|---|---|---|
| `--wj-touch-target` | 44 | Any touch surface. The floor, not a suggestion. |
| `--wj-touch-target-dense` | 32 | Pointer-only dense toolbars in the console |

The kit enforces this: `.wj-btn[data-icon-only]` grows to 44px under
`@media (pointer: coarse)` regardless of its visual size. A 28px icon button is a
28px target no matter how big the icon looks.

Rows are targets too. `--wj-row-height` is 56px on consumer surfaces for exactly
this reason.

## Safe areas

Every fixed bottom element pads with `env(safe-area-inset-bottom)`. The kit does
this for `.wj-tabbar` and `.wj-sheet`. Anything else you fix to the bottom edge
is yours to handle — get it wrong and the primary action sits under the home
indicator.
