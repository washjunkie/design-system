# Identity system

*For anyone reproducing the marks outside the product — a printer, a signwriter,
an embroiderer, an agency, a partner. Open it before the artwork goes to a
supplier, and again when the quote comes back saying "we can't hold that detail".*

Screen behaviour is specified in [Brand](../02-brand.md) and audited by a build
that fails. This document never restates a screen number differently; it extends
the same artwork into the physical world, where the limit is a stitch, a kerf, or
a weeded sliver of vinyl rather than a pixel.

Artwork: [`assets/wj-wordmark.svg`](../../assets/wj-wordmark.svg) ·
[`assets/wj-mark.svg`](../../assets/wj-mark.svg) · code:
[`packages/react/src/logo.tsx`](../../packages/react/src/logo.tsx).

---

## The two marks

| | Lock-up | Mark |
|---|---|---|
| What it is | Splash mark + the `wash junkie` wordmark | The splash alone |
| Ratio | **325.06 : 56.01** — width = 5.804 × height | **100.78 : 49.9** — width = 2.020 × height |
| Construction | 14 filled paths | 5 filled paths |
| Role | The default | Favicons, tight headers, avatar slots, the collapsed nav rail |

The wordmark is **drawn artwork**, set lowercase in a hand-made, rounded,
slightly irregular letterform. There is no capital `W` in the file and no font
that produces it.

Both files are **solid paths — no gradients, no strokes, no effects, no
transparency**. That one decision is what makes everything downstream cheap: the
same asset cuts on a plotter, stitches on an embroidery head, thresholds to
1-bit for a receipt printer, and survives `forced-colors` without a variant.

The source SVGs carry `fill:#2cbec5` in a `<style>` block; the React components
override it to `currentColor`, which is why one asset serves teal on a card,
white on a photograph, and `--wj-fg-default` in a monochrome print. A supplier
opening the raw file sees teal — the file's default, not an instruction.

**Size by height, never width.** The components enforce it by having no `width`
prop; a supplier should be given a height too.

Use the **mark alone** in four cases: below the lock-up's minimum height in any
medium; in a square or round slot (app icon, avatar, social profile, stamp);
beside the words "Wash Junkie" already set in type, because two wordmarks in one
line is a stutter; and on a provider's artefact, where Wash Junkie endorses
rather than leads — on the artefacts [the grant](#the-artefact-grant--decided)
permits. Otherwise, the lock-up.

Never shrink the lock-up past its floor "just for this one header". That is the
decision that produces a smudge on 4,000 printed bags.

## Clear space and screen minimums

**`0.45 × height` on all four sides**, both marks, every medium. A ratio rather
than a fixed distance, which would suffocate a 12px favicon and vanish at 96px.
The figure is not arbitrary: it is the height of the splash mark's droplet, so
the space around the artwork is set by a shape inside it
([`clearSpace()`](../../packages/react/src/logo.tsx)). The keep-clear box is
therefore **6.704H × 1.9H** for the lock-up and **2.920H × 1.9H** for the mark.

For a signwriter: a lock-up 40mm tall is 232mm wide, carries 18mm of clear
space, and needs a panel of at least 268 × 76mm with nothing else in it. Nothing
enters that box — not a rule, not a partner logo, not a fold, not a seam.

| | Screen floor | Why |
|---|---|---|
| Lock-up | **18px tall** | Below this the wordmark's counters fill in and it reads as a smudge |
| Mark | **16px tall** | Below this the droplet detaches visually |

---

## The geometry that governs reproduction

Every physical minimum below derives from two ratios measured off the artwork.
They are the only numbers needed to derive a floor for a process not listed here.

| | Thinnest sustained ink stroke | Tightest true separation |
|---|---|---|
| **Lock-up** | **0.082 × height** | **0.044 × height** |
| **Mark** | **0.135 × height** | **0.046 × height** |

- **Stroke terminals taper to a point** — as fine as 0.037 × height on the
  lock-up. Tips are expected to blunt in any physical process; they are not the
  feature to measure a floor against.
- **Isolated pinch points close first.** Two shapes come within 0.005 × height on
  the lock-up and 0.017 × height on the mark. Those are pinches, not counters —
  drawn to touch, and allowed to merge.

The 18px screen floor lands where this geometry predicts: at 18px the lock-up's
tightest meaningful separation measures 0.8 device pixels, which is why the
counters fill in.

> **Method**, so it can be re-derived when the artwork changes: rasterise the SVG
> at 2400px, threshold on alpha, take a 3-4 chamfer distance transform over ink
> and over background, read the 5th-percentile ridge width in each.
>
> **No script in `tokens/` reproduces this yet** — unlike the colour figures,
> which `tokens/color.mjs` and `tokens/print.mjs` regenerate on demand. Every
> millimetre in this document rests on these two ratios, so committing the
> measurement is [open decision #10](#open-decisions-and-to-specify).

## Minimum sizes for physical reproduction

Screen floors do not transfer. A screen fails by pixel grid; a press fails by ink
spread, a needle by stitch length, a plotter by weeding.

```
minimum height = max(  supplier's minimum positive feature ÷ ink ratio,
                       supplier's minimum separation      ÷ gap ratio )
```

**Reproduction fidelity is not legibility.** Below about 5mm a lock-up is
holdable detail but unreadable at arm's length whatever the press can do, so
there is also an **applied floor — lock-up 5mm, mark 4.5mm, every medium** —
derived from the screen floors at 96dpi (18px = 4.76mm, 16px = 4.23mm), rounded
up. Give the supplier the larger of the two, in bold below.

**The feature figures are typical working values, not specifications.**
**TO SPECIFY:** replace each with the supplier's own for the actual substrate and
re-run the arithmetic. The person running the machine outranks a brand guide.

| Process | What actually limits it | Feature: ink / gap | Lock-up | Mark |
|---|---|---|---|---|
| **Offset litho** | Dot gain closes counters — worse on uncoated, worse again in a reversed knockout | 0.10 / 0.15mm | 3.4 → **5mm** | 3.3 → **4.5mm** |
| **Digital print** (toner or inkjet, ≥600dpi) | Toner scatter and inkjet bleed at the edge of a solid | 0.08 / 0.12mm | 2.7 → **5mm** | 2.6 → **4.5mm** |
| **Thermal receipt** (203dpi) | 1 dot = 0.125mm, 1-bit, and heat bleeds into neighbouring dots — a feature needs 2 dots to survive | 0.25 / 0.25mm | 5.7 → **6mm** (48 × 278 dots) | 5.4 → **5.5mm** (44 × 89 dots) |
| **Laser engraving** | Kerf plus the heat-affected zone either side; output is 1-bit, with no tone to fall back on | 0.20 / 0.30mm | 6.8 → **7mm** | 6.5 → **6.5mm** |
| **Screen print**, textile | Mesh aperture sets the smallest opening emulsion can hold; ink then spreads into the weave | 0.30 / 0.50mm | 11.4 → **12mm** | 10.9 → **11mm** |
| **Embroidery**, 40wt polyester | A satin column below the minimum stops being a satin — it becomes a run, and frays. Tapers cannot be stitched at all | 1.20 / 1.00mm | 22.7 → **23mm** | 21.7 → **22mm** |
| **Vinyl cut**, cast film, hand-weeded | Weeding tears a waste sliver narrower than the web width, and small islands lift with the waste | 1.00 / 1.00mm | 22.7 → **23mm** | 21.7 → **22mm** |
| **Debossing / blind emboss** | No ink at all: the signal is the shadow off the die shoulder, the shoulder needs draft so every feature narrows at the surface, and fibre springback then fills the counters | 1.00 / 1.20mm | 27.3 → **28mm** | 26.1 → **27mm** |

Four consequences worth naming before someone hits them:

- **The lock-up is not embroiderable at chest-badge size.** A 70mm-wide lock-up
  is 12mm tall and its thinnest stroke 0.98mm, under the satin floor. Below 23mm,
  embroider the **mark** — the 18px screen rule, hitting a needle instead of a
  pixel. Finer thread — 60wt — lowers the satin floor, but the lock-up's binding
  constraint is the **separation** figure, not the satin one, so a finer thread
  only moves the floor if the digitiser can hold a tighter gap with it. Ask for
  both numbers, not just the satin minimum, and re-run the arithmetic.
  **TO SPECIFY** with the digitiser, along with whether the tapers are truncated
  or thickened.
- **Below 23mm, do not cut vinyl — print and cut.** Print on white film and cut
  only the outer contour. No internal weeding, so the floor drops to the
  digital-print floor.
- **Thermal artwork ships as a 1-bit bitmap at the device's own resolution**,
  never a scaled greyscale: the driver's threshold chews the tapers differently
  on every firmware. An 80mm head is commonly 576 dots across — confirm it.
- **Deboss the mark, not the lock-up.** A blind deboss has no colour contrast at
  all, so it works from shadow alone at precisely the sizes where the wordmark is
  weakest.

---

## Colour versions

There is no "full colour" version in the usual sense: the artwork is monochrome
by construction. There are four approved renderings of the same paths.

| Version | Value | Where |
|---|---|---|
| **Brand teal** | `#2cbec5` · `--wj-brand-mark` | The default on a light neutral field, at reading distance |
| **Single-colour ink** | `#1d2022` | One-colour print, on a brand-teal field, newsprint, anything read at distance on a light field |
| **Single-colour white** (reversed) | `#ffffff` | On ink, on the deeper accent teal, on photography |
| **1-bit** | Threshold, no dither | Thermal, laser, engraving, `forced-colors`, fax-grade reproduction |

**The 1-bit version is the same artwork.** Solid paths with no gradients and no
strokes threshold exactly — every point is already fully ink or fully not. That
buys four things: no second file to keep in sync and drift; no dither pattern to
go moiré against a 203dpi thermal head; a cut path and a stitch path straight off
the vector; and predictable behaviour in `forced-colors`
([Accessibility](../12-accessibility.md)), where fills are replaced wholesale.

Process build, spot match, vinyl, thread and substrate are
[04 · Colour & materials](04-colour-and-materials.md). Two things belong here:
the teal sits in the hardest region of sRGB for process ink, so anything where
the mark is the hero needs a **spot colour and a wet proof on the real
substrate**; and no spot, vinyl or thread code appears in this guide until
someone has matched one against a physical book under D50.

## Which mark on which field

Contrast of the mark against the field it sits on, measured by
`tokens/color.mjs`.

| Field | Brand teal mark | Ink mark | White mark |
|---|---|---|---|
| Paper `#fcfcfd` | 2.21 ✗ | **15.98** | 1.03 ✗ |
| Brand teal `#2cbec5` | 1.00 ✗ | **7.24** | **2.26 ✗** |
| Accent teal `#007e84` | 2.15 ✗ | 3.37 | **4.86** |
| Ink `#1d2022` | **7.24** | 1.00 ✗ | **16.38** |

**A white mark on brand teal is 2.26:1. It is not legible.** A brand-teal van
with a white wordmark washes out at distance and disappears in direct sun. This
is the most consequential number in the guide, and it constrains livery, signage,
bags, uniforms and app icons. There are exactly three fixes:

1. **Ink mark on the brand-teal field** — 7.24:1. Keeps the teal as the hero.
2. **Move the field to accent teal `#007e84`** when the mark must be white —
   4.86:1. Keeps the reversed lock-up.
3. **Reverse it** — teal or ink mark on a light field.

The same 2.26:1 governs type: **no white body copy on brand teal, ever**
([Colour](../03-color.md)).

Note the other failing cell: the brand-teal mark on paper is **2.21:1**, also
under the 3:1 non-text floor. It is approved anyway, and the reason matters. The
floors in [Accessibility](../12-accessibility.md) govern text and interface
components; a logotype is exempt from them, and at arm's length the mark is doing
recognition, not reading — it is large, it is one shape, and the reader has
context. That exemption is what runs out at distance.

| Field | Mark | Ratio | Approved for |
|---|---|---|---|
| Paper, white, light neutral | Brand teal | 2.21 | Reading distance only — screen, card, bag tag, receipt, letterhead |
| Paper, white, light neutral | Ink | 15.98 | Everything, including distance and one-colour print |
| Brand teal | Ink | 7.24 | Everything. The correct way to use a teal field |
| Accent teal `#007e84` | White | 4.86 | Everything. The reversed default |
| Ink, dark neutral | White | 16.38 | Everything |
| Ink, dark neutral | Brand teal | 7.24 | Everything |
| Photography | White only | — | [Brand](../02-brand.md) · [05 · Art direction](05-art-direction.md) |
| Tinted glass | **None** | — | Neutral or reversed surfaces only ([Liquid Glass](../06-liquid-glass.md)) |

**The distance rule.** Brand teal on paper is 2.21:1, and the logotype exemption
above is what carries it. The exemption assumes the reader can resolve the shape:
past the reading distances in
[06 · Physical applications](06-physical-applications.md#height-by-viewing-distance)
angular size drops, glare and a dirty substrate eat the rest, and a stranger does
not yet know the mark well enough to complete it from a hint.

> **Anything read beyond arm's length — shopfront, van, banner, the back of a
> uniform, a pull-up stand — uses a pairing that clears 4.5:1.** That leaves ink
> on paper, ink on brand teal, white on ink, white on accent teal. It rules out
> the two combinations people reach for first: teal on white, and white on teal.

**4.5:1 is our rule, not a standard.** The accessibility floor for a non-text
graphic is 3:1 ([Accessibility](../12-accessibility.md)), and a logotype is
exempt from even that. We hold distance work to the higher figure deliberately,
because a shopfront is read once, at speed, by someone who is not looking for it,
and there is no hover, no zoom and no second attempt. Do not cite it as a
conformance requirement.

> **PROPOSAL — needs sign-off.** A deep-teal mark in `#007e84` reads 4.74:1 on
> paper and would allow a teal mark at distance on a light field. Not an approved
> version; no artwork exists. See
> [open decisions](#open-decisions-and-to-specify).

---

## Misuse

| Don't | Because |
|---|---|
| **Re-tint the mark to a business's accent** | The accent is the tenant's; the mark is ours. It is the only thing on a screenshot that tells a support agent which product they are looking at. The accent block cannot reach `--wj-brand-mark`, so on screen the tint has no way in ([White-label](../13-white-label.md)) |
| **Recreate the wordmark in Outfit**, or any face | It is drawn artwork, not set type. Outfit has even stroke weights and no tapers, so the counters would be wrong and it would fail at a different size than every number here assumes |
| **Put the lock-up on tinted glass** | The glass tiers carry a teal tint over a moving backdrop. Neutral or reversed only |
| **Set the lock-up white on brand teal** | 2.26:1 |
| **Add a stroke, outline, shadow, glow, bevel or gradient** | The paths carry none. An outline changes both feature ratios, so every minimum size here becomes wrong at once — and no effect survives 1-bit, embroidery, or a cut file |
| **Stretch, skew, rotate or mirror it** | The splash reads as water thrown in one direction, so a mirror is not a variant — it is a different gesture. A stretch also changes both feature ratios, which invalidates every minimum size on this page |
| **Box the lock-up in a teal roundel to make a badge** | It manufactures the 2.26:1 field this document is spent avoiding |
| **Re-space the wordmark away from the splash** | The internal spacing is part of the artwork. There is no spacing token because there is no gap to set |
| **Put a second logo inside the clear-space box** | That box is the definition of the mark standing alone |
| **Use the mark as an icon in an icon set** | Icons are stroke-based on a 24px grid ([Iconography](../08-iconography.md)); the mark is a filled gesture at 2.020 : 1 and will not sit on it |
| **Rotate the mark as a loading spinner** | The brand then means "waiting" — and the system has exactly one thing that overshoots, which is not this ([Motion](../07-motion.md)) |
| **Use a screen minimum for a printed job** | 18px is a pixel-grid floor. A press fails by ink spread, a needle by stitch length |
| **Send a raster to a cutter, engraver or embroiderer** | They need the vector. A traced raster gives a wobbling contour and hundreds of redundant nodes |
| **Add a ™ or ® on your own initiative** | Trademark status is a legal fact, not a design flourish. See [08 · Usage & legal](08-usage-and-legal.md) |

## Co-branding and partner lock-ups

| Context | Leads | Wash Junkie is |
|---|---|---|
| Platform-owned — Customer App, Agent Console, platform marketing, an event stand, **a field agent's own kit** | **Wash Junkie**, first (left, or top when stacked) | The subject |
| A provider's own artefact — shopfront, bag, receipt, staff garment, their vehicle | **The provider** | An endorsement, second and smaller — **and only on the artefacts granted below**, not on the class |
| **A driver** — the person taking custody at the door | **The provider, alone** | **Absent.** Not an endorsement, not smaller — not present. See below |
| A third-party partner of equal standing — payments, a courier, a venue | The party whose audience is being addressed | Whichever side that leaves |

**On a provider's premises the provider's brand leads.** Wash Junkie endorses; it
does not take over a shopfront. The same principle as the in-product white-label
rule, in a different medium.

> Whether the platform mark appears on a provider's artefacts at all **was**
> strategy #8. It is **decided** — see [the artefact grant](#the-artefact-grant--decided)
> below. The geometry in this chapter applies wherever that grant permits a mark.
>
> **The driver row is decided and is not #8's to reopen.** Platform-supplied kit
> carries no platform mark on a driver — the garment would name a party that
> neither did the work nor answers for it
> ([09 · the driver question](09-brand-representation.md#the-driver-question),
> which also carries the scope and the reversal condition). Note what row two
> means alongside it: a provider's **staff garment** is still #8's, because a
> staff member in the shop is not the party taking custody at a door. The word
> *uniform* used to sit in row two and covered both; it does not any more.

### The artefact grant — decided

**Strategy #8, closed 2026-07-31.** The platform mark may appear on a provider's
artefact **per artefact, never per business, and never automatically.** It is a
**grant the provider asks for in writing**
([08](08-usage-and-legal.md#third-party-usage)), not a switch the provider flips.
It goes on the artefacts whose owner can stand behind what they say, and stays
off the two surfaces a customer reads while a stranger is holding their clothes.

| | Artefact |
|---|---|
| **Mark, on request** | Fascia **or** window vinyl — one, not both · the provider's van sides and rear · the apron · the laundry bag's **woven seam label** · the platform's own vehicle and stand |
| **Name set in type only** | The receipt — A4 PDF *and* thermal docket · the staff polo |
| **Nothing of ours** | The laundry bag's **printed face** · the van's cab doors, bonnet, cab glass and roof · the hours plate · the A-board · hi-vis |

**The bag face and the cab doors are a *staged* grant, not a refusal.** They
become available to a business the day that business's customers receive a notice
naming who is coming to the door
([09 #1a](09-brand-representation.md#open-decisions-and-to-specify)). The
condition is per business and checkable in the platform's own database.

**One mark per shopfront.** One instance is an endorsement; four is a franchise
sign. The grant reverses on a countable observable — a customer contacting the
platform believing the shop is a branch of it. **Withdraw the grant rather than
shrink the mark**: a smaller mark makes a quieter version of the same claim.

**Measure the field before approving any pairing.** A van body or a fascia is the
provider's colour, and not in our palette:

```bash
node tokens/color.mjs '#1d2022' '<their body colour>'
```

`print.mjs` returns ΔE2000 and CMYK, **never a contrast ratio** — contrast lives
in `color.mjs`. Anything read beyond arm's length must clear **4.5:1**.

> **Recorded as part of the decision, not as a caveat.** For a *collection*
> customer this is functionally the absent answer until the driver notice ships:
> they see an unmarked driver, an unmarked bag face, an unmarked cab door and a
> line of type on a receipt. The platform's only unconditional customer-facing
> physical surfaces are a fascia they walk past and a van in traffic. Whoever
> signs this is being told so in those words.

### The divider

| Property | Value |
|---|---|
| Form | A single hairline rule — vertical for a side-by-side pair, horizontal for a stack |
| Length | 1.2 × the taller mark's height, optically centred on the pair — it overshoots both marks so it reads as a separator rather than an edge belonging to one of them |
| Weight | 1px on screen; **0.5pt in print, and never below the process's own minimum positive feature** — on the offset figures above, 0.10mm is about 0.28pt, so a 0.25pt hairline is under the floor and will break up. On a cut medium the rule is a cut shape and takes that process's minimum web — 1.0mm for hand-weeded vinyl |
| Colour | `border-default` or its reversed equivalent. **Never brand teal** — a teal rule between two logos reads as part of ours |
| Separation | **0.45 × height each side**, so the two clear-space boxes touch and never overlap. Minimum gap between the marks is 0.9 × height plus the rule |

If the pair will ever be reproduced below the divider's own process floor, drop
the divider and use white space alone. A broken hairline is worse than none.

### Relative size

**Match optical size, not bounding box.** Two wordmarks match on **x-height**; a
wordmark and a symbol match the symbol's **visual mass** against the wordmark's
x-height; two symbols match on **mark height**. Bounding-box matching fails
predictably: a circular badge at the same box height as the lock-up's 5.804 : 1
band carries far more area and dominates it, and so does any partner wordmark
with descenders. Since no ratio works for every partner: set both to the same
height, blur to about 6px or squint, compare mass, adjust the partner in 5% steps
until neither jumps forward, then record the ratio in the artwork file.

### A provider's logo beside ours

- **On a provider's artefact** — the provider leads. Wash Junkie takes the **mark
  alone**, sized against the provider's mark and set second; an endorsement
  should not repeat a name the artefact already carries.
- **On a platform surface** — a provider's logo in the Customer App or on an
  order is **content, not a co-brand**. No divider, no pairing, no size matching;
  it sits in the slot the interface gives it, as a photograph would. Business
  identity there is logo, name and photography
  ([White-label](../13-white-label.md)).

## Favicon and app icon

**Always the mark, never the lock-up.** Every icon slot is square or round, and
5.804 : 1 does not fit in one.

At 16px the mark is at its floor, not at a comfortable size. Ship **hand-tuned
16, 32 and 48px rasters** alongside the SVG; do not let a browser downsample the
vector to get there. Two production notes:

- **`currentColor` does not resolve in a favicon** — there is no inheriting
  context, so the raw asset's own `fill:#2cbec5` renders. Either set an explicit
  fill, or ship an SVG favicon with a `prefers-color-scheme` block inside it.
- **The tab strip is not a field you control.** It is light or dark by OS theme,
  and brand teal reads 2.21:1 on one and 7.24:1 on the other. Give the favicon
  its own opaque field — a paper or ink rounded square — rather than depending on
  the browser's chrome.

| Platform | Mask | Safe zone |
|---|---|---|
| **iOS** | The system applies its own superellipse — a corner radius of roughly a fifth of the side, so the corners are gone | Artwork inside the central **80% square**. Supply full-bleed sRGB with **no alpha** and **no pre-rounded corners** — rounding it twice leaves a pale halo |
| **Android adaptive** | 108dp canvas, only the inner 72dp guaranteed visible, and OEM masks may crop to a **66dp circle** | The guaranteed-visible circle is **0.61 × the side**; the outer sixth each way belongs to the mask and the parallax |
| **PWA `purpose: "maskable"`** | The same idea, looser | A centred circle of **0.8 × the side** |

Those three mask figures are read off the platforms' own icon guidance, not
measured here. **Re-check them when a platform revises its icon spec** — the
0.25 rule below is only as current as the tightest of the three.

One number satisfies all three:

> **Mark height = 0.25 × the icon side**, centred. At 2.020 : 1 that is 0.505 ×
> the side wide and 0.564 across the diagonal, clearing Android's 0.61 circle —
> the tightest of the three. The geometric ceiling is 0.27; past it the mark
> starts to intersect an OEM mask.

**Field choice matters more here than anywhere.** The instinctive app icon is a
brand-teal square with a white mark, which is the 2.26:1 case at exactly the size
where it gets one glance. Use an **ink mark on paper**, or a **white mark on ink
or accent teal**.

## The mark as a graphic device

The splash can work as a large graphic element rather than a logo. It stops being
the logo when it does, so the rules are about keeping the two apart.

**Cropping.** The mark may bleed off the edge of a layout as a background gesture.

- The **mark only** — never crop the lock-up.
- Cropped **by the artboard edge only**, never by a card, a column or a shape
  inside the layout. An internal crop reads as a rendering fault.
- **One axis only**: full height and at least half the width, or full width and
  at least half the height.
- **At least 3 × the height of the largest lock-up in the same layout**, so it
  can never be mistaken for a second logo. With no lock-up present, at least 40%
  of the shorter artboard edge. One per layout.
- **Never** rotated, mirrored, or cropped so hard that what remains closes into a
  blob. Check it at 20mm.

**Watermark.** A **flat tint at full opacity** — `--wj-aqua-2` or `-3`, or the
equivalent in the medium.

- Never the brand colour at low opacity: alpha composites unpredictably over the
  glass tiers, and in print a very light screen of a saturated teal sits in the
  region where a press cannot hold a dot consistently, so it comes out blotchy.
  **TO SPECIFY:** the lightest tint the printer will guarantee on the substrate —
  below it, use a solid step from the ramp instead.
- **Never behind data, a table, a form or long-form text.** Glass carries the
  chrome; data stays solid and legible ([Principles](../01-principles.md)). Text
  over a watermark must still clear its floor in
  [Accessibility](../12-accessibility.md) — measure the worst pixel, not the mean.
- **Never in the Driver App**, used in direct sunlight where every contrast
  margin is already spent.
- Working ceiling: under about 1.5:1 against its field, so it can never be read
  as content.

**Pattern.** The mark repeated as a field element.

- **Consumer-register surfaces only.** An operator console is calm and dense;
  patterned chrome is neither.
- **Fixed orientation, one size.** Rotating instances makes the water fall in
  different directions and the mark stops being a mark; mixed scales read as an
  accident rather than a rhythm.
- **Spacing at least 2 × the mark's width horizontally and 1 × its height
  vertically.** Tighter and it tiles into a mesh, and the mark is gone.
- **Never** behind text, never full-bleed on a working screen, never in the same
  field of view as the lock-up.

---

## Open decisions and TO SPECIFY

| | Item | Method / blocked on |
|---|---|---|
| 1 | **Supplier minimum-feature figures** for every process above | Ask the supplier, substitute, re-run the arithmetic, record the answers here |
| 2 | **Spot-colour match for the teal** | Read a candidate off a physical Pantone Solid Coated book under D50, then `node ../../tokens/print.mjs '#2cbec5' '<candidate>'`. See [04](04-colour-and-materials.md) |
| 3 | **Thread match** (Madeira Polyneon or equivalent) | Matched against the signed spot under D50, on the actual garment colour. No code is guessed here |
| 4 | **Cast vinyl film** (3M or Avery) | Matched against the signed spot on the actual substrate, with a stated weathering expectation |
| 5 | **Hand-tuned 16 / 32 / 48px favicon rasters** | Produce, then add to the asset index in [08](08-usage-and-legal.md) |
| 6 | **Embroidery digitisation** — the stitch file, and whether tapers are truncated or thickened | With the digitiser, at the size the garment actually needs |
| 7 | **A deep-teal `#007e84` mark variant** for distance work on light fields | Proposal above. Needs sign-off and artwork |
| 8 | ~~Whether the platform mark appears on provider artefacts~~ — **the relative size is still unset** | Presence: **closed**, see [the artefact grant](#the-artefact-grant--decided). The size a provider's mark and ours sit at against each other remains open, and is set per artefact by the optical-matching method above |
| 9 | **A category descriptor in the lock-up** | [Strategy open decisions #4 and #5](01-strategy.md#open-decisions). **Settle it before the first physical asset is produced** — every number here is measured off the current artwork |
| 10 | **A committed script for the two feature ratios** | The [method](#the-geometry-that-governs-reproduction) is written down but nothing in `tokens/` runs it, so the ratios cannot be re-derived on demand the way the colour figures can. Add it beside `tokens/print.mjs`, and re-run it on any artwork change |

---

Related: [Brand](../02-brand.md) · [Colour](../03-color.md) ·
[Strategy](01-strategy.md) · [Colour & materials](04-colour-and-materials.md) ·
[Art direction](05-art-direction.md) ·
[Physical applications](06-physical-applications.md) ·
[Usage & legal](08-usage-and-legal.md).
