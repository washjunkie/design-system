# Principles

Six ideas. Everything else in this system is a consequence of one of them.

---

## 1. Glass is a material, not a decoration

A surface is *made of* glass or it is not. You do not "add some glass" to a card
to make it look current.

The material has four optical properties, and all four must be present or the
illusion collapses into "translucent div":

| Property | What it is | How we do it |
|---|---|---|
| **Refraction** | The backdrop is smeared | `blur()`, 14 → 40px by tier |
| **Saturation** | Glass concentrates colour | `saturate()`, 160 → 190% |
| **Specularity** | Light catches the rim | masked gradient border, brightest at the lit edge |
| **Depth** | It floats, so it casts | wide, soft, offset shadow |

What is **not** on that list is transparency. See principle 3.

## 2. Glass carries the chrome. Data stays solid.

The tier a surface takes is a statement about **how far above the page it
floats**, not about how interesting it is.

```
solid   ← tables, forms, long-form text          the work
veil    ← sticky headers, toolbars, chips        inline chrome
pane    ← nav rail, app header, tab bar          persistent structure
shell   ← modal, sheet, popover, palette         a layer that arrived
```

A hundred rows of 13px text over a blurred backdrop is unreadable, and it is the
screen operators live on for eight hours. This is not a stylistic preference —
the tiering is the thing that makes glass safe to adopt in a data product at
all.

**No more than two glass tiers visible at once**, three in a modal stack. Past
that the depth cues stop reading and everything looks equally far away.

## 3. Transparency is the ingredient that costs the most and buys the least

Real frosted glass is mostly opaque. What tells you it is glass is that the
world behind it is smeared and colour-boosted and that light catches its rim.

So the tiers spend their budget on **blur** and **edge**, and keep alpha above
the level at which body text still clears 4.5:1 over a **pure black or pure
white** backdrop. Not "over approved backdrops" — over the actual worst case,
so there is no caveat for anyone to forget.

Those floors (0.72 light, 0.66 dark) are derived, not guessed.
`tokens/build.mjs --check` re-derives them on every build and fails the build if
a change breaks them.

## 4. Fluid, not bouncy

Glass moves like something with mass in a viscous medium: it leaves quickly,
glides, and stops dead. `cubic-bezier(0.32, 0.72, 0, 1)` — the signature curve.

A layer that **fades** in place is a picture of a layer. A layer that **grows
out of the control that summoned it** is an object. Prefer the second: it keeps
the causal link between what someone pressed and what appeared.

Exactly one thing in the system overshoots — `--wj-ease-fluid`, a sampled
damped spring at about 4% — and it is reserved for the material settling into
place. An operator console that boings is a console someone turns the animations
off in.

## 5. Two registers, one system

The console is used for eight hours. The customer app has four seconds to feel
good. Those are different jobs, and pretending otherwise produces a system that
is too loud for one and too flat for the other.

So there is one explicit axis:

| | Operator | Consumer |
|---|---|---|
| Body | 15px | 17px |
| Radius (md) | 8px | 14px |
| Row height | 38px | 56px |
| Card padding | 16px | 24px |
| Motion | 0.85× | 1× |

Same tokens. Same components. `data-wj-register` switches it, and a component
written against the semantic layer moves between them without changes.

If a component hard-codes 24px, it has quietly opted out of the consumer
surface.

## 6. The token is the contract

Three layers, and reaching past one is a bug:

```
primitive   --wj-aqua-9        raw, theme-independent, never used by a component
semantic    --wj-accent-solid  what it's FOR — flips with theme and register
component   .wj-btn            composed from semantics only
```

A component that reads `--wj-aqua-9` looks right today and wrong the moment the
theme flips or a business re-tints the console. There is no exception worth the
bug.

---

## What this system refuses to do

- **Colour as the only signal.** Every status is a colour *and* a dot *and* a
  word. Colour alone fails ~8% of men and fails everyone holding a phone in
  direct sun — which is the driver app's normal operating condition.
- **Glass on data.** See principle 2.
- **A utility framework.** The layout helpers here are deliberately about a
  dozen. A design system that ships a utility framework loses the ability to
  change its own layout decisions.
- **Runtime dependencies in the React package.** Every consuming app already has
  a class-name joiner. Shipping ours causes a duplicate before it causes a
  convenience.
- **Motion that cannot be turned off.** `prefers-reduced-motion`,
  `prefers-reduced-transparency`, and `forced-colors` are first-class, and all
  three degrade to something that still communicates hierarchy. Nothing about
  the layout may move when they engage.
