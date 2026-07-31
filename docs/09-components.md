# UI kit

Every component is plain CSS against semantic tokens, with a React wrapper that
adds behaviour and types — never appearance. A Kotlin driver app using the same
class names gets the same product.

CSS: [`css/wj-components.css`](../css/wj-components.css) ·
React: [`packages/react/src`](../packages/react/src)

Naming: `wj-<block>__<part>`, variants as **data-attributes** — a variant is a
value of a property ("this button's tone is danger"), and data-attributes are
trivial to drive from a prop without joining strings.

---

## Button

```tsx
<Button variant="primary" size="md">Create order</Button>
<Button variant="danger" loading>Refunding</Button>
<IconButton label="Filter orders"><IconFilter /></IconButton>
```

| Variant | When |
|---|---|
| `primary` | **One per view.** The thing you came here to do. |
| `secondary` | The alternative. Cancel, Back, Export. |
| `ghost` | Tertiary. Toolbars, table row actions, menu triggers. |
| `subtle` | Accent-tinted. A secondary action that is still on-brand. |
| `danger` | Destructive, and confirmed. |
| `danger-ghost` | Destructive, in a menu or row. |
| `glass` | **Only over media.** On a normal card it is a solid button pretending to be interesting. |

Sizes `sm` `md` `lg` `xl`. Icon-only buttons grow to 44px on coarse pointers
regardless of visual size.

`loading` keeps the label in the DOM at zero opacity, so the button does not
change width mid-request and shove the layout around. It also sets `aria-busy`
— the spinner is visible feedback; `aria-busy` is what a screen reader hears.

`type` defaults to `"button"`. HTML defaults it to `submit`, which is how a
"Cancel" beside a text input ends up submitting the form on Enter.

**One primary per view.** Two primaries is a question, not a hierarchy.

---

## Forms

```tsx
<Field label="Customer name" help="As it appears on the receipt.">
  {(p) => <Input {...p} placeholder="Ada Nwosu" />}
</Field>

<Field label="Pickup window" error="That window is fully booked. Try after 2pm.">
  {(p) => <Input {...p} />}
</Field>
```

`Field` owns the wiring that gets forgotten by hand: a real `<label for>`, an
`aria-describedby` pointing at both help text and error, and `aria-invalid` on
the control. Wrapping an input in `Field` is how it becomes accessible without
anyone remembering to make it so.

The error carries `role="alert"` so it is announced when it appears after a
failed submit, not only when focus happens to land on the input.

**Mark optional, not required.** `optional` renders a quiet "optional" suffix.
Most fields are required; asterisking most of a form is noise.

Also: `Textarea` `Select` `InputGroup` (leading/trailing affixes) `Checkbox`
`Radio` `Switch` `Segmented` `Chip`.

`Switch` applies immediately and is for settings. If it needs a Save button, it
is a `Checkbox`.

---

## Status & data

```tsx
<Badge tone="warning" dot>Awaiting pickup</Badge>
<Avatar name="Ada Nwosu" size="lg" />
<Stat label="Refunds" value="4" delta={{value:'↑ 2', direction:'up'}} upIsGood={false} />
```

`Badge` — `dot` for anything whose meaning is carried by colour. Non-negotiable
for order status.

`Stat` — `upIsGood` colours the delta by **meaning**, not by arrow. Revenue up is
good; refunds up is not. A dashboard that paints every increase green quietly
lies to the operator.

`Avatar` — two letters from first and last word. Renders the full name to
screen readers, never just the initials.

---

## Table

**Always solid.** This is the surface the tiering rule exists to protect.

```html
<div class="wj-table-wrap">
  <table class="wj-table">
    <thead><tr><th>Order</th><th data-align="end">Total</th></tr></thead>
    <tbody><tr><td>…</td><td data-numeric="true">₦8,400</td></tr></tbody>
  </table>
</div>
```

- `thead th` is sticky and takes the **veil** tier — the one glass a table gets.
- `data-numeric="true"` → right-aligned, tabular, mono. Money and counts.
- `aria-selected="true"` on `<tr>` for selection, not a class.
- Wrap in `.wj-table-wrap` — it owns the horizontal scroll so the page body
  never scrolls sideways.

---

## Layers

```tsx
<Modal open={open} onClose={close} title="Refund order ZABN7V6?"
       description="₦8,400 goes back to Ada Nwosu's card…"
       footer={<><Button onClick={close}>Keep the order</Button>
                 <Button variant="danger" onClick={refund}>Refund ₦8,400</Button></>} />
```

`Modal`, `Sheet` and `CommandPalette` are built on the native `<dialog>` with
`showModal()`, which gives four things that are tedious and easy to get wrong by
hand: a **focus trap**, **Escape to close**, **inert background**, and the **top
layer** — so no z-index arithmetic against whatever else is on screen.

The scrim is `dialog.wj-glass::backdrop`. It cannot be scrolled past, cannot be
out-stacked, and disappears with the dialog.

`dismissible={false}` when closing costs the user work (unsaved input). Use it
sparingly — a modal you cannot escape is a trap.

`Sheet` — `side="bottom"` for touch (with a grab handle, so the thumb knows it
is draggable before anyone tries), `side="end"` for the console's detail pane.

`Popover` / `Menu` — closes on outside click (captured, so a `stopPropagation`
inside the content cannot strand it open) and on Escape.

`ToastProvider` / `useToast` — the live region exists from first render. A live
region added at the same moment as its content is frequently not announced.
`duration: null` for anything the user must act on.

`CommandPalette` — arrow keys, Enter, `aria-activedescendant`. The cursor resets
whenever the result set changes, so Enter never fires whatever happened to be at
the old index.

---

## Feedback

```tsx
<Alert tone="warning" title="Wash Credit is running low">
  About 3 days left at your current rate. Top up to keep online orders flowing.
</Alert>

<EmptyState title="No orders yet today"
  body="Walk-ins you take at the counter will show up here the moment you log them."
  action={<Button variant="primary">Log a walk-in</Button>} />
```

`Alert` — `danger` gets `role="alert"` (assertive); everything else gets
`role="status"` (polite). Backwards, this either interrupts constantly or
silently swallows the one message that mattered.

`EmptyState` — **always say what to do next.** "No results" alone leaves someone
stuck.

`Skeleton` — `aria-hidden`, always. Announcing placeholders makes a screen
reader read "blank blank blank" while the page loads.

`Progress`, `Spinner` — both carry the right ARIA. A spinner with no
`aria-label` is silence.

---

## Navigation

`Nav` / `NavItem` — `active` sets `aria-current="page"`, which is what tells a
screen reader which of twelve links is the one you are looking at.

`Tabs` — roving tabindex, arrow-key navigation.

`TabBar` — consumer bottom bar, pane tier, safe-area padded. The most visible
piece of Liquid Glass on the consumer surfaces.

`Breadcrumbs` — ordered list in a labelled `<nav>`, last item `aria-current`.

---

## Adding a component

1. **Does a composition already do it?** Most "new components" are a Card with a
   Stack in it.
2. CSS first, in `wj-components.css`, semantic tokens only.
3. React wrapper only if it needs state, focus management, or ARIA wiring.
4. Add it to the showcase — if it is not in the showcase it does not exist.
5. Document when **not** to use it. That paragraph is the one people read.
