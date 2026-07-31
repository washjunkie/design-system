# Liquid Glass

The core of the system. Implementation:
[`css/wj-material.css`](../css/wj-material.css) · tokens:
[`tokens/source.mjs`](../tokens/source.mjs).

---

## The material

A surface made of this material has four optical properties, and **all four
must be present**:

```css
.wj-glass {
  background-color: color-mix(in srgb, var(--_floor) calc(var(--_alpha) * 100%), transparent);
  backdrop-filter: blur(var(--_blur)) saturate(var(--_sat));   /* refract + saturate */
  box-shadow: var(--wj-shadow-glass-md);                        /* depth */
}
.wj-glass::before { /* specular rim — masked gradient border */ }
.wj-glass::after  { /* sheen — a single soft highlight at the light source */ }
```

Saturation is applied **with** the blur rather than after it. Blurring first and
boosting second is what stops the backdrop turning to grey mush at wide radii.

---

## Tiers

A tier is an **elevation**, not an intensity. Choosing a higher tier because a
card should "look nicer" is the most common way this system gets misused.

| Tier | Blur | Sat | α light | α dark | Edge | Use |
|---|---|---|---|---|---|---|
| `solid` | — | — | 1 | 1 | 0 | Tables, forms, long-form text |
| `veil` | 14px | 160% | .82 | .78 | .40 | Sticky table headers, toolbars, chips, segmented controls |
| `pane` | 24px | 175% | .78 | .73 | .60 | Nav rail, sidebar, app header, tab bar |
| `shell` | 40px | 190% | .74 | .69 | .85 | Modal, sheet, popover, palette, toast |
| `scrim` | 8px | — | .32 | .55 | — | The dimmed plane behind a Shell |

```html
<aside class="wj-glass" data-tier="pane">…</aside>
```

```tsx
<GlassSurface tier="pane">…</GlassSurface>
```

### Why the alphas are so high

Because glassiness is carried by **blur, saturation, rim and shadow** — not by
being see-through. Apple's own system materials sit far closer to opaque than
most imitations of them do.

Transparency is the one ingredient that costs legibility, and it buys the least.
So the tiers spend their budget on blur (14 → 40px) and edge (0.4 → 0.85), and
keep alpha above the floor at which body text still clears 4.5:1 over a **pure
black or pure white** backdrop.

Those floors — **0.72 light, 0.66 dark** — are derived by sweeping every
backdrop luminance and finding where `fg-default` drops below AA. They are not
design taste, and `build.mjs --check` re-derives them on every build.

The payoff: there is no "don't put glass over photos" caveat for anyone to
forget six months from now.

---

## The stacking rule

> **No more than two glass tiers visible at once. Three in a modal stack.**

Past that the depth cues stop reading and everything looks equally far away.

A worked example — the console's Orders screen:

```
pane    nav rail
veil    page header
solid   the table                 ← two tiers visible. At the cap.
shell   order-detail sheet        ← three, while it is open. The scrim
scrim   dims everything under it     dims the rest, so the count still reads.
```

A popover opening *inside* that sheet would be four. Don't. Put the menu in the
sheet's own solid body instead.

---

## Tints

Glass takes a tint the way real glass does — the colour is *in* the pane, so it
shifts the floor rather than sitting on top as a coloured film.

```html
<div class="wj-glass" data-tier="shell" data-tint="warning">
```

Available: `brand` `accent` `success` `warning` `danger` `info`.

Keep tints quiet. A tinted surface is a **signal** — this is selected, this is a
warning. A product where every pane is tinted has no signal left.

---

## Over media

```html
<nav class="wj-glass" data-tier="pane" data-over="media">
```

Drops saturation to 120% and adds a calming underlay. Legibility does not depend
on it — the tier alphas already clear AA over pure black and white — but over
photography the tier's own saturation lift makes an already-loud backdrop
louder, and a nav bar over a hero image looks unresolved without it.

---

## Motion

The material's own curve:

```css
--wj-ease-glass: cubic-bezier(0.32, 0.72, 0, 1);
```

Fast departure, long glide, dead stop. Use it for anything the material itself
does: opening, morphing, settling.

`--wj-ease-fluid` is a **sampled damped spring** (k=210, c=26), emitted as a
`linear()` stop list because a cubic bézier cannot overshoot. It overshoots
about 4% and settles in ~370ms. It is the only thing in the system that
overshoots, and it is reserved for the material settling into place.

Ready-made:

| Class | Motion |
|---|---|
| `.wj-enter-shell` | rise 8px + scale 0.97 → rest, `ease-glass` |
| `.wj-enter-sheet` | slide from 100% below, `ease-glass` |
| `.wj-enter-settle` | scale 0.94 → 1 on the spring |
| `.wj-fluid` | transition preset for transform/opacity/backdrop |
| `.wj-glass-interactive` | lift + rim brighten on hover, compress on press |

**Never animate `blur()` itself.** The compositor re-reads and re-blurs the
whole backdrop on every frame. Animate transform and opacity on the layer.

---

## Degrading

Three separate reasons the material must be able to switch itself off. All three
land in the same place — an opaque surface with the right colour, spacing,
rounding, and hierarchy — and **nothing about the layout may move.**

| Trigger | What happens |
|---|---|
| `@supports not (backdrop-filter)` | Opaque `glass-floor` + real border. Sheen off. |
| `prefers-reduced-transparency: reduce` | Blur off entirely. **Rim stays** — it is what still communicates layering. |
| `prefers-reduced-motion: reduce` | Transitions → 1ms; enters collapse to a 90ms opacity change, not to nothing. An instant swap loses the causal link between the press and the layer. |
| `forced-colors: active` | Real `CanvasText` borders replace the material, so layer boundaries survive when colour is stripped. |

`prefers-reduced-transparency` is a real accessibility need — vestibular and
low-vision users lose text against a moving backdrop — not a nice-to-have.

---

## Performance

`backdrop-filter` is the most expensive thing in this system. The compositor
re-reads and re-blurs everything behind the element on every frame the backdrop
changes.

- **Cap it.** Two layers on screen, three in a modal stack. This rule is as
  much about frame budget as about visual clarity.
- **Never animate the blur radius.** Animate the layer.
- **Give a scrolling glass header `contain: paint`.** `data-sticky="true"` does
  this — it tells the compositor the blur cannot leak outside the element.
- **No permanent `will-change: backdrop-filter`.** It pins a texture for the
  life of the element.
- **Watch long lists.** A glass row in a 500-row virtualised table is 500 blur
  regions. This is the concrete reason data surfaces are `solid`.

---

## Native surfaces

Glass maps to the **platform material**, not to a CSS filter.

| Platform | Mapping |
|---|---|
| iOS | `UIVisualEffectView` / SwiftUI `.glassEffect` / `expo-blur` |
| Android | `RenderEffect.createBlurEffect` (API 31+); tinted Surface below that |
| React Native | `expo-blur` intensity ≈ `blur × 3`, capped at 100 |

`tokens/dist/wj-tokens.native.ts` ships `blur` as design intent in dp, plus both
theme alphas. Below Android API 31, fall back to the opaque `glass-floor` — the
same place every other degradation lands.
