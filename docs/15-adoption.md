# Adopting this in `web/`

The Service Provider Console already exists, styles itself with unprefixed
variables (`--bg`, `--surface`, `--text`, `--accent`, `--radius`, `--step`)
across fifteen prototype stylesheets, and is in daily use.

So adoption is **additive**. Nothing in `web/` breaks on day one.

---

## Step 1 — load the tokens and the bridge

In `web/src/app/globals.css`, above the existing prototype imports:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Wash Junkie design system */
@import "../../../../Wash Junkie/Design System/tokens/dist/wj-tokens.css";
@import "../../../../Wash Junkie/Design System/css/wj-bridge.css";
@import "../../../../Wash Junkie/Design System/css/wj-material.css";

/* existing prototype sheets — unchanged */
@import "../styles/prototype/app.css";
…
```

(Or publish the system as a workspace package and import by name. The relative
path is fine to start; it is a sibling directory that already sits in the
workspace.)

Then delete the `:root` token block at the top of `app.css` — lines 1–90-ish,
everything from `/* ---------- Tokens ---------- */` down to the density
override. The bridge now defines all of those names, from the new palette.

Set the register once, on `<html>`, and **write this system's theme and density
attributes alongside the app's own**:

```tsx
<html lang="en"
      data-wj-register="operator"
      data-wj-theme="light"        {/* mirrors the app's data-theme */}
      data-wj-density="comfortable">
```

This is not optional and it is the step most likely to be skipped. Only the
**accent** is bridged. Theme and density are not:

- `wj-tokens.css` keys the dark ladder off `[data-wj-theme='dark']`, and falls
  back to the OS for anything that is not explicitly `[data-wj-theme='light']`.
  An app that writes only `data-theme` gets a palette driven by the operator's
  Mac rather than by their own switch — an app in light mode on a dark-mode OS
  renders light chrome over a dark palette. The bridge does **not** rescue this:
  all it mirrors is `color-scheme`.
- `[data-wj-density='compact']` is what moves `--wj-row-height`,
  `--wj-control-height`, `--wj-gutter`, `--wj-section-gap` and
  `--wj-card-padding`. The bridge's `[data-density='compact']` rule reaches
  exactly one name, `--step`.

So both attributes have to be written in **both** writers — the pre-paint inline
script and the runtime effect — and always as a resolved `light`/`dark`, never
left unset.

**What changes visually:** colours shift slightly — the palette is regenerated
in OKLCH and the accent solid is darker (this is the fix that makes white button
text pass AA). Radii shift by 0–2px. Nothing moves.

**What to check:** dark mode, the accent switcher, and the compact density
toggle — including with the OS set to the *opposite* theme, which is the case
that catches a missing `data-wj-theme`.

## Step 2 — glass on the chrome

One attribute per element. No new components.

```diff
- <aside className="sidebar">
+ <aside className="sidebar wj-glass" data-tier="pane">

- <header className="topbar">
+ <header className="topbar wj-glass" data-tier="veil" data-sticky="true">
```

Remove the old `background` and `border-right` from those rules — the material
provides both, and leaving them means a solid fill sitting on top of the glass.

Do the rail and the header first. They are the two surfaces that make the whole
product read as the new system, and they are the two lowest-risk changes in the
codebase.

**Do not** put glass on the orders table, the customer list, or any form.

## Step 3 — layers

Replace the modal and sheet implementations with the kit's, which are built on
native `<dialog>` and get focus trap, Escape, inert background, and the top
layer for free:

```tsx
import { Modal, Sheet, CommandPalette, ToastProvider } from '@washjunkie/ui';
```

This is the step that deletes the most code.

## Step 4 — components, as screens are touched

Not a migration sprint. When you are already in a file:

| Existing | Replace with |
|---|---|
| `.btn` | `.wj-btn` / `<Button>` |
| `.card` | `.wj-card` / `<Card>` |
| `.chip` | `.wj-chip` / `<Chip>` |
| `.field` `.input` | `<Field>` `<Input>` |
| `.tabs` | `<Tabs>` |
| ad-hoc status spans | `<Badge dot>` |

Each replacement should delete more CSS than it adds. If it doesn't, the
component is missing something — raise it rather than working around it.

## Step 5 — retire the bridge

Every line in `wj-bridge.css` is a line that should eventually be deleted.

```bash
# what still references the old names?
rg -o -- '--(bg|surface|text|accent|border|radius|step|shadow|ok|warn|err)\b' \
   web/src/styles | sort | uniq -c | sort -rn
```

Work the list down. When a name reaches zero, delete its line from the bridge.
When the bridge is empty, delete the file.

---

## Order of work

1. Tokens + bridge, delete `app.css`'s token block — **one commit, whole product,
   low risk**
2. Rail and header to glass — the change everyone sees
3. Modal / Sheet / Toast / Palette — the change that deletes the most code
4. Components opportunistically, forever
5. Bridge shrinks to nothing

## Things that will bite

**CSS import order.** The console already has a source-order trap documented in
the vault: a later import wins. Tokens → bridge → material → prototype sheets →
components. Get this wrong and the bridge silently loses to `app.css`.

**`backdrop-filter` and `overflow`.** A glass element inside a container with
`overflow: hidden` and a `border-radius` can lose its blur in some engines. Put
the glass on the scrolling container, not inside it.

**Tailwind's `dark:` variant.** `globals.css` drives it off
`[data-theme="dark"]`. Widen the `@custom-variant` line to match
`[data-wj-theme="dark"]` too, so it doesn't matter which of the two attributes a
later refactor keeps. (The bridge does not help here — it mirrors `color-scheme`
between the two attributes and nothing else. See step 1.)

**Tailwind's `shadow-*` utilities skip the bridge.** `bg-*` and `text-*` resolve
through `@theme inline` and follow the tokens; `shadow-*` does not — Tailwind
bakes the literal shadow into `--tw-shadow` rather than emitting
`var(--shadow-lg)`. Map the elevation ramp explicitly in the app's `@theme
inline` block or every shadow written in JSX stays Tailwind's generic black in
both themes:

```css
--shadow-xs: var(--wj-shadow-xs);  /* … through --shadow-xl */
```

**`backdrop-filter` makes a containing block.** A glass surface becomes the
containing block for every `position: fixed` descendant. Anything that used
`fixed` to escape that surface's `overflow` — a menu anchored to something in
the nav rail, typically — gets recaptured and clipped the moment the rail
becomes glass. Portal it to `<body>` before applying the material, not after.

**Two glass tiers, maximum.** Once the rail and header are glass, that budget is
spent. A glass card on the dashboard would be the third, and it is what makes
the whole thing look muddy.

**Test it in a browser.** Typecheck and build are not enough — this is a
standing project rule, learned from a hooks-order crash that passed every static
gate. Drive the console with the dev magic-link sign-in.
