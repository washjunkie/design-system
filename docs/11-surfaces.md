# Surfaces

How the one system expresses itself on each of the five. Platform context lives
in the [vault](https://github.com/washjunkie/wiki) — `Platform.md`
and `Surfaces.md` are canonical for what each surface *is*; this page is only
about how it *looks and behaves*.

---

## At a glance

| Surface | Register | Density | Primary nav | Glass budget |
|---|---|---|---|---|
| Service Provider Console | operator | either | left rail (`pane`) | 2 tiers |
| Customer App | consumer | comfortable | bottom `TabBar` (`pane`) | 2 tiers |
| Driver App | consumer | comfortable | none — one screen | 1 tier |
| Agent Console | operator | comfortable | left rail (`pane`) | 2 tiers |
| Marketing / public | consumer | comfortable | top bar (`veil` → `pane`) | unbounded |

---

## Service Provider Console — `web/`

**Live today.** Next.js 16, React 19, Tailwind 4, `@base-ui/react`. The
reference implementation.

- `data-wj-register="operator"`, density user-selectable.
- **On a phone it stays `operator` and picks up the [touch axis](16-touch.md)** —
  bigger type at 800 weight, 52px rows, softer radii, motion back to full speed.
  It does not switch to `consumer`: the register is about who is reading, and
  that is the same person holding a phone.
- Rail `pane`, page header `veil`, everything below solid.
- Detail views are `side="end"` sheets, not routes — operators keep their place
  in the list.
- `⌘K` palette everywhere.
- Business accent applies. Wash Junkie chrome does not re-tint. See
  [White-label](13-white-label.md).
- Adoption path: [Adoption](15-adoption.md).

## Customer App — planned

Mobile + web. The surface where Liquid Glass does the most work, because there
is imagery to refract.

- `data-wj-register="consumer"`.
- Bottom `TabBar` at `pane` over scrolling content — the signature moment.
- Order tracking is the hero screen: a `shell` card over the map, timeline
  inside, driver contact pinned to the bottom above the safe area.
- Big type, generous space, full-speed motion.
- Business accent does **not** apply — the customer's relationship is with Wash
  Junkie, and per-business tinting would dilute that. Business identity shows as
  logo and name, not as chrome colour.

## Driver App — planned

The hardest environment in the platform: bright sun, one free hand, a moving
vehicle, patchy signal.

- `consumer` register, but **one action per screen**, sized `xl`.
- Minimum 48px targets. Bottom half of the screen only — thumbs don't reach
  the top.
- **Glass is capped at one tier**, and never behind a primary action. In direct
  sunlight, contrast is the whole game.
- Status is word-first, colour second. Assume the colour is unreadable.
- Every screen works from cache. Every write queues.
- Never a destructive action behind a single tap.

## Agent Console — planned

Field agents registering businesses. Operator register, laptop-shaped, but often
on a tablet in a shop.

- Same chrome as the Service Provider Console.
- Long multi-step forms — one column, visible progress, autosave, resumable.
- Neutral chrome throughout. An agent works across many businesses; tinting the
  console to whichever one they last opened would be actively confusing.

## Marketing / public

The only place the expression runs free.

- `consumer` register.
- Full-bleed imagery, `over="media"` glass, generous display type.
- Top bar transitions `veil` → `pane` on scroll.
- Still bound by [Accessibility](12-accessibility.md). A marketing page that
  fails contrast fails for the people most likely to be evaluating whether to
  trust the product.

---

## Two rules that hold everywhere

**The register is set once, at the root.** A component never decides its own
register. If a screen needs consumer type inside the console — a preview of the
customer-facing view, say — scope `data-wj-register="consumer"` to that
container and let the cascade work.

**Business accent is console-only.** Operator surfaces re-tint; customer-facing
surfaces do not. See [White-label](13-white-label.md).
