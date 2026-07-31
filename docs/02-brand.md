# Brand

Artwork: [`assets/`](../assets) · code:
[`packages/react/src/logo.tsx`](../packages/react/src/logo.tsx).

> This page is the **product-facing subset** of the brand — the part the
> interface needs. Strategy, voice in full, art direction, physical
> applications, and usage rights live in the
> [brand guide](00-brand-guide/README.md). Where the two touch, this page wins
> for anything that renders on a screen, because these numbers are audited by a
> build that fails.

---

## The marks

**Lock-up** — the splash mark plus the `wash junkie` wordmark. The default.
Ratio 325.06 : 56.01.

**Mark** — the splash alone. Favicons, tight headers, avatar-sized slots, the
collapsed nav rail. Ratio 100.78 : 49.9.

Both render with `fill: currentColor` rather than the teal baked into the source
files. One asset therefore serves every context: brand teal on a white card,
white on a photograph, `--wj-fg-default` in a monochrome print. A second
coloured asset would be a second thing to keep in sync, and it would drift.

```tsx
<WashJunkieLogo height={28} title="Wash Junkie" />
<WashJunkieMark height={20} />          // decorative next to visible text
```

**Size by height, never width.** A logo is specified by how tall it sits on the
line; the width follows from the artwork's own ratio. Both components enforce
this — there is no `width` prop.

## Clear space

`0.45 × height` on all four sides. A ratio rather than a fixed 16px, which would
suffocate a 12px favicon and vanish at 96px.

```ts
clearSpace(28) // → 13
```

## Minimum sizes

| | Floor | Why |
|---|---|---|
| Lock-up | **18px tall** | Below this the wordmark's counters fill in and it reads as a smudge |
| Mark | **16px tall** | Below this the droplet detaches visually |

Under 18px, use the mark alone. Never shrink the lock-up past it "just for this
one header".

## On imagery

Reversed (white), always. Never brand teal on a photograph — the teal is mid-
lightness and will disappear against roughly half of any real image.

If the image is busy behind the mark, the mark is in the wrong place. Move it,
or put it on a `veil`-tier surface. Do not add a drop shadow to the artwork.

## What not to do

- Don't re-colour the mark to a business's accent. **The accent is the tenant's;
  the mark is ours.** See [White-label](13-white-label.md).
- Don't recreate the wordmark in Outfit, or any other face. It is drawn artwork,
  not set type.
- Don't stretch, skew, rotate, outline, or add effects.
- Don't place the lock-up on a tinted glass surface. Neutral or reversed only.
- Don't pair it with a second logo inside the clear-space box.

The full list, with the reason each rule exists and what it costs to break, is
[Identity system · Misuse](00-brand-guide/03-identity-system.md#misuse).

---

## Voice

The register axis applies to words too.

**Operator surfaces** — precise, calm, unhurried. The reader is at work and has
been for six hours. Say the thing.

> 38 orders in wash · Balance covers about 3 more days · Pickup moved to 2pm

**Consumer surfaces** — warm, plain, reassuring. The reader wants to know their
clothes are fine.

> Your laundry's in the wash · We'll text you when it's on the way · Tunde's
> picking up between 2 and 4

**Both** — never show technical text to a person. This is a standing platform
rule, not a preference specific to this system: no status codes, no `null`, no
stack traces, no "an error occurred". Say what happened and what to do next.

> ✗ Request failed with status 502
> ✓ We couldn't reach the payment service. Your order is saved — try again in a
>   minute.

> ✗ No results
> ✓ No orders match those filters. Try widening the date range.

Numbers get the same care. `₦148,250.00` with tabular figures, never `148250`.
Times are local and relative where a human would say it that way — "4 minutes
ago", "tomorrow, 9–11am".
