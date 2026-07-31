# Patterns

How the pieces behave together. Components are nouns; these are the verbs.

---

## Navigation

**Operator (console)** — persistent left rail at `pane` tier, sticky page header
at `veil`, content solid. Below `md` (840px) the rail collapses to a hamburger
that opens it as a `side="end"` sheet.

**Consumer** — bottom `TabBar` at `pane` tier, safe-area padded, max five items.
Anything beyond five goes behind "More"; a six-item tab bar has no item anyone
can hit reliably.

**Driver** — one screen at a time, one primary action per screen. A driver is
holding a phone in one hand and a bag in the other. No tab bar; a single large
bottom action.

The active item is `aria-current="page"`, always. The accent tint alone is not
enough — colour is not available to everyone.

## Layering

```
scrim → shell        modal, sheet, palette          blocks the page
(none) → shell       popover, menu, toast            dismissible, non-blocking
```

| Ask | Layer |
|---|---|
| A decision that blocks progress | **Modal** + scrim |
| A form or detail beside the work | **Sheet** `side="end"` |
| A choice on a phone | **Sheet** `side="bottom"` |
| A short list of actions | **Popover** + `Menu` |
| Confirmation of something that happened | **Toast** |
| Naming a thing under the cursor | **Tooltip** |

Never open a modal from a modal. If a flow needs two decisions, it needs one
modal with two steps.

Never a `shell` inside a `shell` — see the [stacking rule](06-liquid-glass.md).

## Destructive actions

Confirm only when the action is **irreversible or expensive**. A confirm on
everything trains people to click through confirms, which is worse than none.

When you do confirm:

- Name the specific thing. *"Refund order #4KP7T2M?"* not *"Are you sure?"*
- State the consequence in the body, including who else notices.
- The confirming button says the action — **"Refund ₦8,400"**, not "OK".
- The cancel is the safe default and takes focus.
- Prefer **undo** to confirm where the system can offer it. A toast with Undo
  beats a modal for anything reversible within a few seconds.

## Loading

| Wait | Show |
|---|---|
| < 300ms | Nothing. A flash of spinner is worse than a pause. |
| 300ms – 2s | Skeleton in the shape of the content |
| > 2s | Skeleton + a line saying what is happening |
| Unknown / background | Inline spinner beside the affected control |

Skeletons match the **shape** of the real content — a 52% wide bar where a title
goes. A generic grey box moves everything on arrival, which is the flicker
skeletons exist to prevent.

Never replace a loaded screen with a spinner on refresh. Keep the stale content,
mark it stale.

## Empty, error, offline

Every list has four states and all four are designed: **loading, empty, error,
loaded**. The empty state is the one that gets skipped and the one a new user
sees first.

- **Empty** — say what goes here and give the action that puts something there.
- **Empty after filtering** — different copy. *"No orders match those filters"*
  plus a way to clear them. Never the same screen as never-had-any.
- **Error** — what happened, in plain words, plus retry. No status codes, no
  stack traces. This is a platform rule, not a suggestion.
- **Offline** — the platform is offline-first. Show what is cached, mark it
  stale, and queue writes. Never a blank screen with a cloud icon.

## Forms

- One column. Two columns make people read in a Z and miss fields.
- Group related fields; separate groups with `--wj-section-gap`.
- Validate on **blur**, not on every keystroke. Validating as someone types
  tells them they are wrong before they have finished being right.
- Re-validate on submit and move focus to the first error.
- Mark **optional**, not required.
- Keep the submit button enabled. A disabled submit with no explanation is a
  dead end; let them press it and tell them what is missing.
- Never lose input. If a submit fails, the values stay.

## Tables at volume

The console routinely shows thousands of orders.

- Sticky header (`veil`), sticky first column on wide tables.
- Virtualise past ~200 rows. Glass rows in a virtualised list would be hundreds
  of blur regions — another reason data surfaces are solid.
- Filters live in a toolbar above, and **the applied set is visible as chips**.
  A filtered table that looks like an empty table is a support ticket.
- Row click opens the detail sheet; it does not navigate away. Operators lose
  their place otherwise.
- Bulk selection puts a `veil`-tier action bar over the table footer, showing
  the count and only the actions valid for the whole selection.
- Sort is a column header affordance, and it persists per view.

## Realtime

The platform pushes over SSE with an outbox and a Dexie cache.

- Arriving rows animate in with `.wj-fluid`; **rows never reorder under a
  pointer**. Hold the order until the pointer leaves or the user re-sorts.
- A changed value flashes its cell background to `accent-subtle` for one
  `dur-slow` and settles. Never a bounce.
- A queued write shows a quiet pending state on the affected row, not a global
  spinner.
- Conflicts surface as a `warning` alert on the row with both values, never as
  a silent overwrite.

## Keyboard

- `⌘K` / `Ctrl+K` — command palette, from anywhere.
- `Esc` — close the topmost layer. Native `<dialog>` gives this free.
- `/` — focus the current view's search.
- Arrow keys move within a composite widget (tabs, segmented, palette, table
  rows); Tab moves between widgets. A table where Tab visits every cell is a
  table nobody keyboards through.
- Every interactive element is reachable, and focus is visible on all of them.
