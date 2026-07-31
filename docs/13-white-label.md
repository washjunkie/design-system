# White-label

A business owner picks an accent colour and the console re-tints. That is the
whole feature — deliberately.

---

## What re-tints, and what doesn't

| Re-tints | Stays Wash Junkie |
|---|---|
| Primary buttons, links | The logo and mark |
| Selection and active nav | Glass tint and edge |
| Focus ring | Semantic colours (success / warning / danger / info) |
| Charts' primary series | Neutrals and text |
| Progress, switches | Everything on customer-facing surfaces |

**The accent is the tenant's. The mark is ours.** A workspace can be orange; the
Wash Junkie logo in the corner stays teal, because that mark is how someone
knows which product they are in — and because it is the only piece of the screen
that identifies the platform to a support agent looking at a screenshot.

Semantic colours never re-tint either. A business whose accent is red must not
end up with red as "everything is fine".

---

## How it works

The business supplies **one hue**. Everything else is re-derived in OKLCH at the
palette's own fixed lightness values:

```css
[style*='--wj-accent-h'] {
  --wj-accent-solid: oklch(54.0% var(--wj-accent-c, 0.118) var(--wj-accent-h));
  --wj-accent-fg:    oklch(44.0% calc(var(--wj-accent-c, 0.118) * 0.86) var(--wj-accent-h));
  /* …one line per accent role */
}
```

Only the hue travels. Lightness stays pinned to the ramp, so **every contrast
guarantee survives whatever colour they pick** — including the 4.5:1 on
`accent-on-solid` that keeps the primary button legible. Chroma is clamped by
the browser's own gamut mapping.

This is the reason the palette is authored in OKLCH rather than hex. In any
other space, "same lightness, different hue" is not a thing you can express.

```tsx
<WJProvider accent={{ hue: 268 }}>
```

```html
<html style="--wj-accent-h: 268">
```

Dark mode gets its own block; the subtle and border steps have to come from the
dark ladder or an accented surface glows.

## Guardrails

- **Hue only.** Do not let a business set lightness or chroma. Chroma is
  overridable via `--wj-accent-c` for a deliberately muted brand, but it is not
  exposed in the UI.
- **No arbitrary hex.** If the picker takes a hex, convert to OKLCH and keep
  only the hue. A business pasting `#FFFF00` must not get a yellow button with
  white text.
- **Preview both themes.** The picker shows a light and a dark swatch of a real
  primary button, not a colour chip.
- **The mark never re-colours.** `WashJunkieLogo` and `WashJunkieMark` render
  `fill: currentColor`, and every mount sets `color: var(--wj-brand-mark)` — a
  token the `[style*='--wj-accent-h']` block never redefines, so no accent hue
  can reach it. The component takes the colour it is given; the guarantee is
  that the accent derivation cannot give it a different one.

## Customer-facing surfaces

Business accent does **not** apply to the Customer App.

The customer's relationship is with Wash Junkie; they order from several
businesses through one app. Re-tinting the chrome per business would make the
app feel like it changed identity between two orders, and it would dilute the
platform brand with the audience that matters most to it.

Business identity appears there as **logo, name, and photography** — which is
plenty, and is what customers actually recognise.

## Adding a re-tintable role

1. Add the light derivation to the `[style*='--wj-accent-h']` block in
   `tokens/build.mjs`.
2. Add the dark override.
3. Keep the lightness **identical** to the corresponding ramp step. That number
   is the contrast guarantee; changing it silently breaks the audit's promise.
4. `node tokens/build.mjs --check`.
5. Sweep the hue across 0–360 in the showcase and look at it.
