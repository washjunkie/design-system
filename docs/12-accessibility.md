# Accessibility

Target: **WCAG 2.2 AA**, with AAA text contrast wherever the token layer can
give it for free.

Most of this is enforced by the build or by types. What follows is what those
enforcements are, and what is left for a human.

---

## Enforced by the build

```bash
node tokens/build.mjs --check     # non-zero exit on any failure
```

| Check | Threshold |
|---|---|
| Every ramp's step 11 on steps 1 and 3 | 4.5:1 |
| Every ramp's step 12 on step 1 | 7:1 |
| Best ink on every step 9 | 4.5:1 |
| `fg-default` on `surface-default` and `bg-canvas` | 7:1 |
| `fg-muted` on `surface-default` | 4.5:1 |
| `accent-on-solid` on `accent-solid` | 4.5:1 |
| Each status `-fg` on its `-subtle` | 4.5:1 |
| **`fg-default` on every glass tier over pure black and pure white** | 4.5:1 |
| **`fg-muted` on every glass tier over pure black and pure white** | 3:1 |

The last two are why the glass alphas are what they are. They are also why there
is no "don't put glass over photos" caveat anywhere in this system — the worst
case is the tested case.

## Enforced by the type system

- `IconButton` requires `label`. An icon button with no accessible name is an
  unlabelled control, and the compiler is a better reviewer than a checklist.
- `Switch` requires `label`.
- `Field` cannot render a control without wiring `id`, `aria-describedby`, and
  `aria-invalid` — the children function receives them.
- `Avatar` requires `name`, and renders it to screen readers rather than the
  initials.

---

## Colour is never the only signal

The rule most likely to be broken, and the one that matters most here.

```tsx
<Badge tone="warning" dot>Awaiting pickup</Badge>   ✓ colour + dot + word
<span style={{color:'orange'}}>●</span>            ✗
```

Two reasons, and the second is the one people forget:

1. Roughly 8% of men have a colour vision deficiency.
2. **The driver app is used in direct sunlight.** On a phone at midday, a
   colour distinction is simply not there for anyone.

Same rule for charts: differentiate by shape, label, or pattern as well as hue.

---

## Focus

One ring, everywhere: 2px `--wj-focus-ring`, 2px offset, drawn **outside** the
element so a glass surface's own rounding never clips it.

Never `outline: none` without an equivalent replacement. `:focus-visible` — not
`:focus` — so a mouse click doesn't leave a ring behind.

Focus order follows DOM order. Native `<dialog>` handles trap, restore, and
inerting the background; that is most of why the layer components are built on
it rather than on portals.

---

## Motion and transparency

| Preference | Response |
|---|---|
| `prefers-reduced-motion` | Transitions → 1ms. Enters → 90ms opacity, **not** instant. Transforms removed. Skeleton sweep stops. |
| `prefers-reduced-transparency` | Blur off entirely; opaque floor + real border. The specular rim stays — it is what still communicates layering. |
| `forced-colors` | `CanvasText` borders replace the material, so layer boundaries survive when colour is stripped. |

Nothing about the layout moves when any of these engage. A reduced-motion user
gets the same page, not a different one.

`prefers-reduced-transparency` is a genuine accessibility need — vestibular and
low-vision users lose text against a moving backdrop — not a nice-to-have.

---

## Targets and reach

- **44px minimum** on touch. The kit forces icon buttons up under
  `@media (pointer: coarse)` regardless of visual size.
- 32px is allowed only for pointer-only dense console toolbars.
- Rows are targets: `--wj-row-height` is 56px on consumer surfaces.
- Adjacent targets need 8px between them, or a mis-tap is a wrong action.
- Driver app: 48px, bottom half of the screen.

---

## Live regions and announcements

- `ToastProvider` renders its live region from first render. A live region
  created at the same moment as its content is frequently not announced at all.
- `Alert` with `tone="danger"` is `role="alert"` (assertive). Everything else is
  `role="status"` (polite). Backwards, this either interrupts constantly or
  swallows the one message that mattered.
- Field errors carry `role="alert"` so they are heard on failed submit.
- Skeletons are `aria-hidden`. Announcing placeholders reads "blank blank blank".
- Loading buttons set `aria-busy`. The spinner is visible feedback; `aria-busy`
  is what is heard.

---

## Language and structure

- One `<h1>` per page; heading levels don't skip. `.wj-title` is a **style**,
  not a level — pick the tag by structure.
- Landmarks: `<nav>` (labelled if more than one), `<main>`, `<aside>`.
- Every input has a real `<label>`; placeholder is not a label.
- Copy at a plain reading level. No technical text to users — ever. This is a
  platform-wide rule and it is an accessibility rule as much as a tone one.

---

## Reviewing a screen

Before it ships:

1. Tab through it. Everything reachable? Ring visible everywhere? Order sane?
2. Open every layer with the keyboard, close each with Escape.
3. Turn on reduced motion **and** reduced transparency. Still usable? Nothing
   moved?
4. Zoom to 200%. Nothing clipped, nothing horizontally scrolling except the
   containers designed to.
5. Screenshot in greyscale. Can you still tell the statuses apart?
6. `node tokens/build.mjs --check`.
