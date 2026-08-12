# Iconography

Code: [`packages/react/src/icons.tsx`](../packages/react/src/icons.tsx).

---

## The spec

| | |
|---|---|
| Grid | 24 × 24 |
| Stroke | 1.75px, uniform |
| Caps / joins | round |
| Minimum interior radius | 2px |
| Live area | 22 × 22 (1px optical margin) |
| Fill | **none** — stroked only |
| Colour | `currentColor` |

Stroked and never filled is the load-bearing decision. It means one file works
at every size, and it means an icon inherits its context: the same glyph sits on
a glass pane, inside a solid button, and in a danger-toned menu item without
three variants.

## Where icons come from

**Generic icons come from [Lucide](https://lucide.dev).** It is drawn to a
compatible spec (24px grid, 2px stroke — set `strokeWidth={1.75}` to match), it
is maintained, and it has the chevrons and bells we have no reason to draw
ourselves.

**What ships here is the set Lucide has no reason to draw:** the things that are
specifically laundry.

`washer` · `dryer` · `basket` · `folded` · `hanger` · `iron` · `droplet` ·
`van` · `route` · `outlet` · `washHouse` · `washCredit` · `order`

```tsx
import { IconWasher, laundryIcons } from '@washjunkie/ui';

<IconWasher size={20} />
<IconWasher size={20} title="Wash floor" />   // meaningful on its own
```

## Sizes

| Token | px | Use |
|---|---|---|
| `--wj-icon-xs` | 14 | Inline with caption text |
| `--wj-icon-sm` | 16 | Inline with body, dense buttons |
| `--wj-icon-md` | 18 | **Default.** Nav, buttons, table cells |
| `--wj-icon-lg` | 20 | Consumer register default |
| `--wj-icon-xl` | 24 | Tab bar, section headers |
| `--wj-icon-2xl` | 32 | Empty states, feature cards |

Do not scale below 14px. At 12px a 1.75px stroke is 15% of the glyph and the
interior detail closes up.

---

## Accessibility

**Decorative icons get no label.** An icon next to the word "Orders" is
decorative — labelling it makes a screen reader say "Orders Orders".

```tsx
<IconOrder />                        // aria-hidden by default
```

**Meaningful icons get one.** An icon that carries information on its own —
an icon-only button, a status glyph — must be labelled.

```tsx
<IconButton label="Filter orders"><IconFilter /></IconButton>
<IconWasher title="In wash" />
```

`IconButton` requires `label` at the type level, because an icon button with no
accessible name is an unlabelled control and the compiler is a better reviewer
than a checklist.

**Never an icon alone for status.** Colour + dot + word. See
[Accessibility](12-accessibility.md).

---

## Drawing a new one

1. Check Lucide first. Genuinely — most new needs are already there.
2. 24 × 24 artboard, 1px margin, snap to a 2px grid.
3. 1.75px stroke, round caps and joins, **expand nothing to outlines**.
4. Optical weight, not mathematical. A circle at 22px looks heavier than a
   square at 22px; shrink it until it doesn't.
5. Test at 16px. If interior detail closes up, remove detail — don't thin the
   stroke, because that breaks the set's uniformity.
6. Test in `forced-colors` mode. A shape that only reads because of its fill
   disappears there.
7. Add it to `laundryIcons` so it is discoverable, and to the showcase.

One concept, one icon. If `washer` and `washHouse` start being used
interchangeably, that is a naming problem in the domain, not an icon problem —
fix it in the [vault](https://github.com/washjunkie/wiki) first.
