# Motion

---

## Durations

| Token | ms | For |
|---|---|---|
| `--wj-dur-fast` | 120 | State echo — hover, press, focus ring |
| `--wj-dur-base` | 180 | The default. Most enter/exit. |
| `--wj-dur-slow` | 260 | Something changing shape or position, not just colour |
| `--wj-dur-slower` | 420 | A layer arriving — sheet, modal, drawer |
| `--wj-dur-slowest` | 640 | Full-surface transitions, celebratory moments |

Every duration in the kit is wrapped:

```css
transition-duration: calc(var(--wj-dur-base) * var(--wj-motion-scale, 1));
```

`--wj-motion-scale` is `0.85` in the operator register and `1` in consumer. The
same interaction is slightly quicker for someone doing it for the four-hundredth
time today.

## Easings

| Token | Curve | For |
|---|---|---|
| `--wj-ease-glass` | `cubic-bezier(0.32, 0.72, 0, 1)` | **The signature.** Anything the material does. |
| `--wj-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Content entering |
| `--wj-ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Content leaving |
| `--wj-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Moving between two on-screen states |
| `--wj-ease-fluid` | sampled spring | The material settling into place |
| `--wj-ease-linear` | `linear` | Continuous motion only — spinners, progress |

**Exits are faster than entrances.** Something arriving deserves to be watched;
something leaving is already decided. Enter at `slow`, exit at `base`.

**`--wj-ease-fluid` is generated, not authored.** A cubic bézier cannot
overshoot, so the "settles into place" feel is sampled from an actual damped
spring (k=210, c=26, m=1) and emitted as a `linear()` stop list by
`tokens/build.mjs`. It overshoots ~4% and settles in ~370ms.

It is the **only** thing in the system that overshoots. An operator console that
boings is a console someone turns the animations off in.

---

## What moves, and how

**Prefer growth over fade.** A layer that fades in place is a picture of a layer.
A layer that grows out of the control that summoned it is an object — and it
keeps the causal link between what someone pressed and what appeared.

| Class | Motion |
|---|---|
| `.wj-enter-shell` | rise 8px + scale 0.97 → rest, `ease-glass`, `dur-slow` |
| `.wj-exit-shell` | drop 4px + scale 0.985, `ease-in`, `dur-base` |
| `.wj-enter-sheet` | slide from 100% below, `ease-glass`, `dur-slower` |
| `.wj-enter-settle` | scale 0.94 → 1 on the spring |
| `.wj-fluid` | transition preset: transform, opacity, backdrop, shadow, radius |
| `.wj-fluid-fast` | transition preset: transform, opacity, colours |
| `.wj-glass-interactive` | lift 1px + rim brighten on hover; scale 0.994 on press |

## Rules

**A press must register in under 100ms.** `.wj-btn:active` scales to 0.975
immediately. It does not wait for the network — that is the cheapest possible
way to make a control feel alive, and its absence is the single most common
reason a UI feels dead.

**Never animate `blur()`.** The compositor re-reads and re-blurs the whole
backdrop every frame. Animate the layer's transform and opacity.

**Animate transform and opacity, nothing else.** `width`, `height`, `top`,
`left`, and `box-shadow` all trigger layout or paint. `box-shadow` on hover is
the common offender — if it must animate, use a pseudo-element's opacity.

**Skeletons sweep, they don't pulse.** A pulse reads as something broken and
blinking; a sweep reads as something arriving.

**Nothing loops forever except progress.** Spinners and progress bars loop
because they represent ongoing work. Decorative loops are a distraction in a
tool someone stares at all day.

---

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) { … }
```

Motion collapses to a **90ms opacity change**, not to nothing. An instant swap
loses the causal link between the control pressed and the layer that appeared —
which is a usability regression, not an accessibility win.

Transforms are removed entirely. Skeleton sweep stops.

Honour it in JS too:

```ts
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
```
