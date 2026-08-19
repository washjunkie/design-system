# Touch

---

## A third axis, not a third register

The system's claim is *two registers, one system* — and a register says **who is
reading**: an operator on their four-hundredth order today, or a customer on
their first. That is the axis that lets one token set run an eight-hour console
and a consumer app that has to feel good in four seconds.

**A phone does not change who is reading.** It changes what the hand can reach
and how far the screen sits from the face. That is the same *kind* of fact as
density, so it rides the same kind of axis — orthogonal, overlaying whichever
register is active.

The Service Provider Console stays `operator` on a phone. It does not become a
consumer app that happens to have an operator's data in it.

```
register   operator | consumer     who is reading
density    comfortable | compact   how tight the rhythm is
touch      auto | on | off         what the hand can reach
```

## It is a media query

```css
@media (max-width: 600px), (pointer: coarse) and (max-width: 1080px) {
  :root:not([data-wj-touch='off']) { … }
}
[data-wj-touch='on'] { … }
```

Applied automatically, **not** by an attribute the app sets on mount. A token
layer that waits for JavaScript is a token layer that is wrong on the first
paint — and the first paint is the one an operator opening the console at a
counter actually sees.

Two conditions, matching the console's own responsive rule. Width alone misses
an iPad in landscape; `pointer: coarse` alone silently vanishes in every
desktop-browser check, which is where this gets verified.

`[data-wj-touch='on']` forces it at any width — that is what the showcase's
**Touch** switch does. `[data-wj-touch='off']` opts a subtree out, for a
pointer-only dense toolbar embedded in a phone layout.

## What moves

| Token | Operator | + touch | Why |
|---|---|---|---|
| `--wj-text-body` | 15px | **17px** | Longer reading distance. 16px is also the floor below which iOS Safari zooms on focus and never zooms back. |
| `--wj-text-title` | 20px | **24px** | |
| `--wj-text-display` | 30px | **38px** | |
| `--wj-weight-title` | 600 | **800** | The single biggest contributor to "bolder" — far more than size. |
| `--wj-tracking-title` | −0.015em | **−0.03em** | Tracking scales inversely with size and weight. |
| `--wj-row-height` | 38px | **52px** | Clears the 44px floor with room. |
| `--wj-control-height` | 34px | **48px** | |
| `--wj-section-gap` | 32px | **20px** | Sections sit *closer*, not further apart — only one is on screen at a time, so a big gap is just scrolling. |
| `--wj-motion-scale` | 0.85 | **1** | See below. |
| radius ladder | 4…28 | **8…38** | [Spaced for concentricity](05-space-and-layout.md#the-touch-ladder-is-spaced-for-this). |

**Motion goes back to full speed, and that is not a contradiction.** The operator
register runs at 0.85 because someone repeating an action four hundred times
wants it out of the way. A phone is the opposite case: touch has no hover to
telegraph intent, so the animation *is* the feedback, and clipping it reads as a
dropped frame rather than as briskness.

## What `wj-touch.css` adds

The token half above is generated. This is the part that cannot be a token swap.

**Type leads from the left.** Centred headings are the default failure of a
narrow layout and they cost twice: consecutive headings start at different
x-positions, so the eye re-finds the start of every line instead of running down
one rail — and at this width a centred heading of any length wraps, turning one
ragged edge into two. `.wj-center` opts out, for something with no siblings to
align to (an empty state, a completion screen).

**Interaction answers the finger.** A pointer surface telegraphs intent with
hover, so a press can afford to be quiet. Touch has no such warning: the first
the interface knows of a press is the press. Controls scale to 0.972 and dim
slightly — *scale, not colour*, because a colour change on a control the thumb is
covering is a change nobody can see. The release carries `--wj-ease-fluid`, the
one curve in the system allowed to overshoot, which is what gives the control
mass rather than making it a sprite that changed size. Rows dip instead of
scaling; a scaled row visibly detaches from its neighbours in a list.

**Glass behaves like a physical layer.** Sheets rise from the edge they are
anchored to and settle. The grab handle earns its space here and only here — it
is the affordance that says a layer can be thrown away, and there is no
equivalent gesture with a mouse.

**Scrollers contain their overscroll.** Without `overscroll-behavior-x: contain`
a horizontal scroller at its end hands the gesture to the page, so a flick
through status chips scrolls the whole screen instead. It is the single most
common way a phone layout feels broken while every element in it is correct.

**No hover, anywhere.** A `:hover` rule on a touch surface latches on tap and
sits there until something else is tapped. Every treatment is `:active` or
`:focus-visible`.

## Reduced motion

Someone who has asked for less motion has asked for it on a phone too, and this
is the layer that adds the most. Sheet animation goes; **the press response
stays**, dimming instead of scaling — it is feedback rather than decoration, and
removing it leaves a control that gives no sign it was touched.

## Related

- [Space & layout](05-space-and-layout.md) — concentric rounding, the ladder
- [Motion](07-motion.md) — the easings this leans on
- [Typography](04-typography.md) — the roles the tokens above resize
- [Surfaces](11-surfaces.md) — which surface gets what
