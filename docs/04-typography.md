# Typography

---

## The three faces

| Role | Face | Why |
|---|---|---|
| **UI & body** | **Inter** | Chosen for legibility at 12–15px in dense tables, where a characterful face costs real reading speed. Huge x-height, unambiguous `1lI` / `0O`. |
| **Display** | **Outfit** | Rounded geometric, sympathetic to the wordmark's letterforms. Headlines, marketing, empty states, the number on a dashboard tile. |
| **Numeric** | **JetBrains Mono** | Order IDs, money, durations — anything that must align down a column. |

All three are variable, open-licensed, and self-hostable. **Self-host them.** A
`fonts.googleapis.com` request is a third-party dependency on the critical
render path of a tool people open a hundred times a day.

Outfit is the one decision here that is taste rather than derivation. It is
isolated in a single token, so swapping it is a one-line change:

```css
--wj-font-display: 'Outfit', 'Inter Tight', 'Inter', system-ui, sans-serif;
```

Anything that reads as display type in the product goes through
`--wj-font-display`. Nothing names Outfit directly.

---

## Roles, not sizes

This is the part that makes the register axis work.

`wj-title` means *"this is the title of the thing"*. The register decides how big
that is. A component that hard-codes `font-size: 24px` has quietly opted out of
the consumer surface.

| Class | Token | Operator | Consumer | Face |
|---|---|---|---|---|
| `.wj-display` | `--wj-text-display` | 30px | 48px | Outfit |
| `.wj-title-lg` | `--wj-text-title-lg` | 24px | 30px | Outfit |
| `.wj-title` | `--wj-text-title` | 20px | 24px | Outfit |
| `.wj-title-sm` | `--wj-text-title-sm` | 17px | 20px | Outfit |
| `.wj-body` | `--wj-text-body` | 15px | 17px | Inter |
| `.wj-label` | `--wj-text-label` | 13px | 15px | Inter |
| `.wj-caption` | `--wj-text-caption` | 12px | 13px | Inter |
| `.wj-eyebrow` | `--wj-text-2xs` | 11px | 11px | Inter, uppercase |

The raw scale (`--wj-text-xs` … `--wj-text-7xl`) exists for marketing layouts
that genuinely need a specific size. In product code, use the roles.

---

## The details that matter

**Tracking scales inversely with size.** Large display type needs negative
tracking or it reads loose; uppercase micro-type needs positive tracking or it
reads as a smear. The role classes already carry the right value —
`--wj-tracking-tighter` on display, `--wj-tracking-widest` on eyebrows.

**Tabular figures everywhere.** `.wj-root` sets
`font-variant-numeric: tabular-nums` globally, because every figure in this
product is a figure in a column of figures somewhere. Proportional digits make
those columns jitter as data updates — which is exactly when someone is
watching.

**Line length.** Body copy caps at `--wj-container-prose` (68ch). Past ~75
characters the eye loses its place returning to the next line.

**Line height by role.** `1.5` for body, `1.3` for titles, `1.15` for display.
Tight leading on a paragraph is unreadable; loose leading on a headline breaks
it into unrelated lines.

**Weight carries hierarchy before size does.** Reach for `medium` → `semibold`
before jumping a size step. A dense console has limited vertical room, and four
type sizes on one screen is already a lot.

---

## Numerals

```html
<span class="wj-mono">4KP7T2M</span>
<span class="wj-numeric">₦148,250.00</span>
```

`.wj-mono` for identifiers — order refs, machine codes, API keys. Monospace
signals "this is a literal string you might copy".

`.wj-numeric` for quantities in Inter with tabular figures. Money in a table
should be `.wj-numeric` right-aligned, not `.wj-mono` — monospace money in a
long column reads as code rather than as value.

Currency follows the business's country. Never hard-code `₦`; use the platform's
money formatter.
