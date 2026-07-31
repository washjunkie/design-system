# Colour & materials

*For anyone specifying colour a screen will not render — a printer, signwriter,
wrap shop, embroiderer, or whoever briefs them. Open it before the quote, not
after the proof.*

[Colour](../03-color.md) governs pixels and is audited by a build that fails. This
page governs ink, paint, vinyl, thread and thermal paper, where the audit is a
press check. It never restates a screen number differently: every value below is
either printed by `node tokens/print.mjs` or computed from the hexes it reports —
run it before you brief a supplier. Where a number is not derivable it is marked
**TO SPECIFY** rather than guessed.

---

## What the families mean off the screen

On screen a family is a job: `info`, `warning`, `success`. On a van or a bag, some
of those jobs do not exist. What each is *for* with no interface around it:

| Family | Hue | Off-screen meaning | Use it as |
|---|---|---|---|
| **Aqua** | 200° | Water, and the brand itself. The only family carrying identity | The mark. Teal fields. The one colour someone should remember |
| **Tide** | 258° | Depth and night — evening pickup, the hours the shop is shut | A field when ink is too heavy and teal too loud |
| **Sun** | 72° | Warmth, daylight, the dry end of the job | A small accent. Never a field — at 72° it goes muddy printed large on anything absorbent |
| **Moss** | 155° | Done. Collected, delivered, complete | Ticks, confirmations, the end of a sequence |
| **Ember** | 27° | Wrong. Late, failed, stop | Almost nothing |
| **Slate** | 250° | The page and the type. Ink is slate-12, paper is slate-1 | Everything that is not colour |

**Moss and Ember keep their semantics off the screen.** Tide and Sun may be
decorative here; those two may not. A customer sees the poster and the app in the
same week, and a red meaning "look at this offer" teaches them red means nothing in
the app — the red "Export" argument from [Colour](../03-color.md), in another
medium. If a piece needs a warm accent, it is Sun. And **Aqua is the only family
with a claim on identity**: a poster led by Tide is a poster nobody attributes to
Wash Junkie.

## The two teals, and why a supplier needs both

[Colour](../03-color.md#the-one-thing-to-know-about-the-brand-teal) sets the screen
rule — `#2cbec5` is a mark colour, not a button colour. Physically it bites harder.

| | `#2cbec5` brand mark | `#007e84` accent teal |
|---|---|---|
| White on it | **2.26:1 ✗** | 4.86:1 ✓ |
| Ink on it | 7.24:1 ✓ | 3.37:1 ✓ (graphics only) |
| It, on paper `#fcfcfd` | 2.21:1 | 4.74:1 ✓ |
| Process CMYK | out of gamut | reachable |

Read the third row twice. **The brand teal carries type in neither direction** —
white fails on it, and it fails on white. It is a shape you recognise, not a thing
you read. WCAG's logotype exemption is why the positive lock-up on a white card is
fine on screen and on a page at arm's length; it is not a licence to set a headline
in it. WCAG governs screens and says nothing about a fascia read across a road —
that case is governed by [Height by viewing
distance](06-physical-applications.md#height-by-viewing-distance) and by the
lightness argument at the foot of this page, both of which are stricter.

Three combinations survive every medium: **ink mark on brand teal** (7.24:1),
**white mark on accent teal** (4.86:1), **white mark on ink** (16.38:1). Never a
white mark on brand teal, brand-teal type at any size, or brand teal on accent teal.

## Production colour

| Colour | Hex | OKLCH | CMYK (naive) | TAC | Print risk | 1-bit |
|---|---|---|---|---|---|---|
| Brand mark | `#2cbec5` | 73.2% 0.116 199.9 | C78 M4 Y0 K23 | 105% | **HIGH** — saturated cyan-green above 60% lightness, the classic out-of-gamut region for offset CMYK | → black |
| Accent teal | `#007e84` | 53.9% 0.092 200.7 | C100 M5 Y0 K48 | 153% | low | → black |
| Ink | `#1d2022` | 24.1% 0.006 236.8 | C15 M6 Y0 K87 | 108% | low | → black |
| Paper | `#fcfcfd` | 99.1% | C0 M0 Y0 K1 | 1% | low | → white |

Semantic solids: moss `#00844a` C100 M0 Y44 K48 · sun `#976200` C0 M35 Y100 K41 ·
ember `#bf3631` C0 M72 Y74 K25 · tide `#2d6cc7` C77 M46 Y0 K22.

> **The CMYK column is not a specification. Do not send it to a printer as one.** It
> is a naive algebraic conversion — no ICC profile, no press curve, no paper white,
> no ink limit, no GCR or UCR. A real separation, made by the printer against the
> profile for the actual press, paper and screening, will produce different numbers,
> and should. The column exists so you can see the *shape* of the problem before the
> quote: which colours are heavy and which are at risk. The only number that decides
> anything is the round-trip ΔE against a physical reference.

```bash
node tokens/print.mjs                     # the full report
node tokens/print.mjs '#2cbec5' '#00A5B5' # ΔE2000 against a candidate
```

## Why the teal breaks in process ink

Process builds cyan-green by laying yellow over cyan. Cyan alone is too blue; yellow
pulls the hue toward 200°, but every drop of ink also subtracts light. Chroma and
lightness trade against each other, and brand teal asks for both at once — **73.2%
lightness at 0.116 chroma, hue 199.9** — which is outside what four inks reach.

The separation does not fail loudly. The rendering intent quietly drags the colour
to the nearest point on the gamut boundary and chroma goes first, so it **flattens
to grey-green** — dusty rather than wet — and darkens slightly, sitting heavier on
the page than on screen. It also **drifts**: the boundary is where a small change in
ink density swings the result most, so the colour moves through a run and between
presses, and two batches of the same flyer will not match. It shows worst beside the
real thing — a leaflet handed over next to a wrapped van.

**So anything where the teal is the hero needs a spot colour.** Hero means a large
teal field, the mark as the subject, or a piece seen alongside another medium
carrying the same teal. A small teal element on a white disposable flyer can go
process; expect it duller, and proof it. A two-colour job — spot teal plus ink —
usually costs less than four-colour and looks better, and it is the recommendation
for most Wash Junkie print.

## Spot colour

| System | The question it answers |
|---|---|
| **Pantone Solid Coated / Solid Uncoated** | What ink do we mix? The specification itself |
| **Pantone Color Bridge** | What does that ink degrade to when the job must run process? |

Bridge is the one that prevents an argument: solid ink and its CMYK simulation side
by side on one page, so the compromise is agreed rather than discovered on press.

**The matching process**

1. **Use a physical book**, current, kept in a drawer. Ink fades, and a guide that
   has lived on a sunny desk is not a reference. A hex found on a website is a screen
   approximation of a print approximation and carries no authority.
2. **View under D50** — a 5000K graphic-arts booth, grey surround, no window. Teal
   judged under a warm bulb looks believable and is wrong.
3. **Match against two references** — the on-screen colour on a calibrated display
   *and* a printed proof. A chip matching the screen but not the proof fails on every
   printed piece; the reverse fails wherever a phone is.
4. **Shortlist two or three chips, then measure.** `node tokens/print.mjs '#2cbec5'
   '<candidate>'` gives ΔE2000 — a tiebreaker, not the decision, since the guide's own
   hex is itself an approximation.
5. **Record three codes:** coated, uncoated, and the bridge CMYK build.
6. **Sign a proof on the real substrate and keep it.** That sheet, not a number, is
   what a reprint is judged against.

| Use | System | Code |
|---|---|---|
| Brand teal, coated | Pantone Solid Coated | **TO SPECIFY** — matched against a physical book under D50; record the code here |
| Brand teal, uncoated | Pantone Solid Uncoated | **TO SPECIFY** — the U chip of the same number is the same ink on thirstier paper and reads duller. If it drifts too far, choose a *different* number that looks right rather than accepting the drift |
| Accent teal | Pantone Solid Coated | **TO SPECIFY** — same method |
| Brand teal → process | Pantone Color Bridge Coated | **TO SPECIFY** — record the bridge build and show it before the job runs |
| Ink `#1d2022` | rich black build | **TO SPECIFY** — agreed with the printer against their ink limit |

Do not fill any of those from a website, a PDF, or a supplier's guess.

## The other colour systems

Each is a separate matching exercise. **Match every one to the spot colour, not to
the hex** — a chain of approximations taken off a screen drifts at every link.

| Application | System | Method | Code |
|---|---|---|---|
| Painted signage, powder coating, shopfittings | **RAL Classic** (RAL Design where the steps are too coarse) | Judge a painted sample panel at the finish and size it ships in. The same RAL number in matte and in gloss does not read as the same colour, so the chip settles nothing on its own | **TO SPECIFY** |
| Vehicle wrap, window graphics | **Cast** vinyl — 3M 2080 Series or Avery Dennison Supreme Wrapping Film | Choose from the manufacturer's physical swatch book, outdoors, laid over a curved panel | **TO SPECIFY** |
| Embroidery — uniforms, caps, bag straps | **Madeira Polyneon** or **Isacord** (polyester) | Match against a physical thread card, held on the actual garment colour under D50 | **TO SPECIFY** |
| Screen print — bags, tees, aprons | Pantone-matched **plastisol**, mixed to the spot code | Proof on the real fabric, including the white underbase if the fabric is dark | **TO SPECIFY** |

**Cast, not calendered, on vehicles.** Calendered film is stressed flat during
manufacture and relaxes afterwards, so it shrinks back out of recesses and off
edges, and a neglected-looking van is worse for the brand than no wrap. **TO
SPECIFY:** the film's warranted outdoor life for this climate, from the
manufacturer's own data sheet for the actual product — not a rule of thumb.
**Factory-coloured film beats printed film for the teal**: a
printed-and-laminated wrap is a print process and inherits the gamut problem above,
so keep teal areas solid film even where the layout needs photography. **Polyester
thread, not rayon** — these are uniforms in a laundry business, washed hot and
bleached, and rayon has the better sheen and loses it.

Physical minimums are derived, not guessed. The embroidery floors are **lock-up 23mm,
mark 22mm** at 40wt polyester, from the satin-column limit in [Identity
system](03-identity-system.md#minimum-sizes-for-physical-reproduction) — which is why
the mark carries a chest badge and the lock-up cannot. Screen minimums in
[Brand](../02-brand.md#minimum-sizes) do not transfer: a screen fails by pixel grid, a
needle by stitch length. Note which figure is binding before hoping a finer thread
helps: at both sizes the **separation** limit, not the satin limit, sets the floor
([geometry](03-identity-system.md#the-geometry-that-governs-reproduction)), so 60wt
moves nothing unless the digitiser can hold a tighter gap with it. **TO SPECIFY:**
the digitiser's own satin floor *and* minimum gap on the actual fabric and thread
weight, then re-run the arithmetic — and whether the wordmark's tapered terminals
are truncated or thickened.

## Substrates: the same teal, seven different colours

| Substrate | What the teal does | What to do |
|---|---|---|
| **Coated — gloss or silk art** | The reference. Ink sits on the surface, closest to the chip | Nothing. Specify from the coated book |
| **Uncoated** | Ink soaks in, dot gain rises. Lighter, duller, greyer | Use the uncoated chip and accept it is a different colour. Never ship the coated build on uncoated stock |
| **Kraft / recycled board** | A brown ground under a translucent ink. The teal goes warm and dead | Print **ink**, not teal. If the teal must read it needs a white underprint — an extra pass, so budget for it |
| **Matte vinyl** | Scatters light. Reads lighter, less saturated | Right for vehicles, where glare is the enemy. Expect it to look pale beside a brochure |
| **Gloss vinyl** | Reads deeper and more saturated, and reflects the sky | The reflection, not the colour, is what kills legibility on a van roofline |
| **Cotton canvas** | Absorbent, off-white, and the weave breaks fine detail | Mark alone above the tested minimum; set the wordmark in ink, not teal |
| **Polyester** | Dyed polyester can migrate its own dye into the ink under heat and shift a light print | Specify a blocker or low-cure ink — or embroider, which sidesteps it. This is why uniforms are embroidered |

**The textile rows and kraft are the ones that will bite**, because they are the
[laundry bag](06-physical-applications.md#laundry-bags) — woven cotton or polyester,
one per customer — and the kraft board the packaging is made of. Thermal, the other
high-volume ground, has its own section below; uncoated covers the printed matter,
price lists and dockets. Assume every one of them is single-colour and design for it
rather than discovering it at the quote.

## Thermal receipts are 1-bit

A thermal printer has one ink and two states. No greys, no halftones, no colour,
typically 203dpi — **0.125mm per dot** (25.4 ÷ 203) — and the paper darkens with heat
and age. **Confirm the head's resolution and dot count on the actual device**: every
derived height on this page and in [Physical
applications](06-physical-applications.md#receipts-and-dockets) divides by it. Every
rule follows from that.

- **No teal.** Brand teal thresholds to black (luminance 0.414), accent teal to black
  (0.166). The receipt is ink on paper, full stop.
- **No tints, screens or gradients.** The driver thresholds; a 20% grey becomes a
  dither pattern or a smear, and it will moiré against the head's own grid.
- **Mark, not lock-up**, by default — the thermal floors and the reason are
  [06 · Receipts and dockets](06-physical-applications.md#receipts-and-dockets),
  derived from
  [03](03-identity-system.md#minimum-sizes-for-physical-reproduction).
- **Keep reversed areas small.** A solid black block heats the head, ink spreads,
  counters close up. Check at the *end* of a long receipt, not the top.
- **Assume it fades.** Thermal paper greys with heat, sunlight and time, so contrast
  falls from the day it prints. Nothing that matters may depend on the paper
  surviving — and nothing does: the record is the platform's, the receipt a courtesy
  copy.

The receipt carries the **name set in type only** — `Powered by Wash Junkie`, in
the footer — and never artwork. Decided: [03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided).
The binding reason is measured, not deferential: at the thermal mark's **5.5mm**
floor its keep-clear box is **16.1 × 10.5mm**, a third of a 58mm roll's 48mm
print width, competing with the order reference — and 06's tag rule already
settles that contest in the reference's favour.

## A single-colour brand

The common case, not the fallback — bags, stamps, embroidery on a dark polo, a
photocopied price list, a one-colour screen print. The artwork is already built for
it: both marks are **solid paths, no gradients, no strokes, rendering in
`currentColor`** ([Brand](../02-brand.md)), so single-colour is not a variant anyone
has to draw. One artwork, whatever ink is available.

"Whatever ink is available" means the ink the *medium* offers — one screen, one
needle, one thermal head. It is not an opening to a business's own colour: **the mark
is never re-tinted to a tenant accent**, on a bag any more than on a screen, because
the accent is the tenant's and the mark is ours ([Identity
system](03-identity-system.md), [White-label](../13-white-label.md)). A co-branded
piece runs the two identities as two elements, not as one recoloured mark.

| Ground | Ink |
|---|---|
| White or light paper | **Ink** `#1d2022`. Then spot teal, if the piece is teal-led |
| Kraft, board, dark fabric | **White** |
| Brand-teal field | **Ink**. Never white |
| Accent-teal or ink field | **White** |

The check that catches the mistake before it is expensive is the greyscale test from
[Accessibility](../12-accessibility.md#reviewing-a-screen), carried into the physical
world. Relative luminance:

```
brand teal  0.414        ink  0.014        paper  0.974
accent teal 0.166 · moss 0.170 · tide 0.154 · sun 0.153 · ember 0.139
```

**Five of the eight brand colours sit inside a 0.031 luminance band** — ember 0.139 to
moss 0.170, computed from the hexes above. Moss against
ember is 1.16:1; moss against sun is 1.08:1. In greyscale they are one grey; in 1-bit
they are all black. So any artefact relying on telling two colours apart — a rack tag,
a route label, a status sticker — must carry a word or a shape too, or it stops working
the moment it is photocopied. Same rule as [status is never colour
alone](../12-accessibility.md#colour-is-never-the-only-signal), except here the medium
enforces it rather than a guideline.

## TAC and the 300% rule

**Total area coverage** is C+M+Y+K added together. Push past what the press and paper
absorb and the ink does not dry: it sets off onto the next sheet, cracks on a fold,
blocks in the stack. Every Wash Junkie colour sits under the ceiling usually quoted for
sheetfed coated work — moss, the heaviest, by more than a hundred points:

```
paper 1%   brand teal 105%   ink 108%   tide 145%   accent teal 153%
ember 171%   sun 176%   moss 192%
```

Limits belong to the press and the paper, not to the universe. Sheetfed on coated
stock commonly runs to around 300%; web and uncoated work sit lower. **Ask the printer
for their limit rather than assuming 300%** — and note these totals come from the naive
conversion, so a real ICC separation with GCR will report different ones. Do not quote
them as a promise either.

The risk is never a brand colour. It is a **rich black** somebody built by stacking
four inks, a photograph's shadows, or a teal re-derived from the hex in another
application. Ink `#1d2022` is a near-black, not black: at 108% it is safe as separated
here, but 100% K alone looks washed beside a photograph, and the four-ink rich black
somebody reaches for instead will pass any limit if nobody sets one.
**TO SPECIFY:** the rich-black build, agreed with the printer against their limit.

## Distance, sun, and night

**At distance, lightness carries and hue does not.** Brand teal on paper `#fcfcfd`
measures 2.21:1 — 2.26:1 on pure white, and under the 3:1 floor for non-text graphics
either way. Acceptable as a logotype at reading distance, weakest of the legible
options on a fascia. Anything read across a road is ink on paper, white on ink, or
accent teal on paper (4.74:1), with brand teal supporting rather than being read.

**In direct sun, matte beats gloss on anything that must be read.** Sunlight washes
mid-lightness colour toward white, so brand teal loses more than ink or accent teal
does. This is the driver app's operating condition — a phone at midday in Lagos —
arriving on a shopfront.

**At night the light source decides**, and teal is the colour most exposed by it: a
lamp with little energy near 200° cannot make the teal reflect what is not there.
Low-pressure sodium is close to monochromatic yellow, so teal goes near-black under it;
high-pressure sodium is broader but still yellow-dominant; a broad-spectrum white LED
gives it back most of what it had. A teal-on-ink sign that reads at 4pm can be
black-on-black at 10pm under a sodium lamp. **Contrast after dark comes from lightness —
paper or white against ink — or the sign gets illuminated.** **TO SPECIFY:** the
street's actual lamp type outside each outlet, and the colour temperature for lit
signage, both judged against a lit sample on site rather than a datasheet.

**TO SPECIFY:** confirmed mark and letter heights, from a printed test seen at the real
distance in the real light. The starting numbers are derived in [Height by viewing
distance](06-physical-applications.md#height-by-viewing-distance) — lock-up `H = D/66`,
mark `H = D/108`, set type `cap = D/120` — but the wordmark is drawn artwork with
irregular strokes and tapered terminals, so a rule calibrated on set type reads
optimistic for it. The site test settles it, not the arithmetic.

## What a supplier receives

Vector artwork from [`assets/`](../../assets) — never a screenshot, an upscaled PNG, or
a hex pasted into an email. The spot code for their medium, with the substrate and
finish it was matched on. A signed proof on that substrate, kept for the reprint. And
the contrast rule in one line, because it survives being passed on by phone: *ink on
the bright teal, white on the deep teal, never white on the bright teal.*

---

See also: [Colour](../03-color.md) · [Brand](../02-brand.md) ·
[Identity system](03-identity-system.md) ·
[Physical applications](06-physical-applications.md) ·
[Accessibility](../12-accessibility.md)
