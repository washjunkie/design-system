# Physical applications

*For anyone putting the brand on an object — a wrap shop, a signwriter, an
embroiderer, a bag manufacturer, a printer, or whoever briefs them. Open it
before the artwork leaves the building, and again when the sample arrives.*

A physical piece is produced in a run and then lives with whoever received it: a
wrap stays on the van until the van is re-wrapped, a bag lives in someone's home
between orders. Neither gets patched on a Tuesday afternoon. **Nothing physical
has been produced yet** ([strategy open decision
#10](01-strategy.md#open-decisions)) — which is the only reason the pages that
follow are still cheap to act on. [Identity
system](03-identity-system.md) governs the marks and their reproduction floors;
[Colour & materials](04-colour-and-materials.md) governs ink, film, thread and
thermal paper. This document is what happens when those two meet an object with
a shape, and it never restates one of their numbers differently.

Three facts decide every piece below.

| Fact | What it forces |
|---|---|
| **A white mark on brand teal is 2.26:1** — not legible | An **ink mark on brand teal** (7.24:1), a **white mark on accent teal `#007e84`** (4.86:1), or a **white mark on ink** (16.38:1). [Full table](03-identity-system.md#which-mark-on-which-field) |
| **Beyond arm's length, only pairings clearing 4.5:1 are approved** | Out go the two people reach for first: teal on white, and white on teal. 4.5:1 is [our own floor for distance work, not a conformance standard](03-identity-system.md#which-mark-on-which-field) — do not cite it as one to a supplier |
| **The provider's brand leads on the provider's premises** | Wash Junkie endorses; it does not take over a shopfront ([co-branding](03-identity-system.md#co-branding-and-partner-lock-ups)). Which artefacts may carry the mark at all is decided per artefact — [03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided), and **one mark per shopfront** |

The line that survives being passed on by phone: *ink on the bright teal, white
on the deep teal, never white on the bright teal.*

---

## Height by viewing distance

"Make it big" is not a spec. The derivation, so the number can be re-made when
the artwork or the distance changes:

1. **Acuity.** The eye resolves about one arcminute: a feature of width `w` is
   at threshold at distance `D` when `w = D × tan(1′)` — **`w = D / 3438`**.
   That is where a stroke can be told from its background, not where it reads.
2. **The margin.** The signwriting trade works to roughly 25mm of cap height per
   3m — `cap = D / 120`; at a stroke of `0.15 × cap` that is `D / 800`, **4.3 ×
   threshold**. That factor is the margin for movement, glare, an unfamiliar
   word, and an observer who is not staring. It is a trade heuristic we have
   adopted, not a standard and not something we have measured — which is why
   step 3 produces starting numbers and the site test produces the answer.
3. **Apply the same stroke target to our artwork** — thinnest sustained strokes
   `0.082 × height` (lock-up) and `0.135 × height` (mark)
   ([geometry](03-identity-system.md#the-geometry-that-governs-reproduction)).

| | Stroke ratio | Height rule | 10m | 20m | 30m | 50m |
|---|---|---|---|---|---|---|
| **Lock-up** | 0.082 × H | **H = D / 66** | 150mm | 305mm | 455mm | 760mm |
| — its width | — | 5.804 × H | 870mm | 1,770mm | 2,640mm | 4,410mm |
| **Mark** | 0.135 × H | **H = D / 108** | 95mm | 185mm | 280mm | 465mm |
| **Set type** (Inter) | 0.15 × cap | **cap = D / 120** | 85mm | 165mm | 250mm | 415mm |

Heights are the rule's own output rounded to the nearest 5mm; widths are then
`5.804 × H` on the rounded height, so the two rows stay consistent. Re-run the
rule rather than interpolating the table.

Read the width row, because it is where the argument ends: a lock-up legible at
30m is **2.64m wide** — longer, on most panel vans, than the unbroken flat run
between the wheel arch and the shut-lines. Measure the actual vehicle before
promising anyone a distance.

> **15–20m is the working design distance for a vehicle side. 50m is unreachable
> — stop trying to buy it and spend the panel on one legible thing.**

This is a **starting point for a site test, not a specification**: the wordmark
is drawn artwork with irregular strokes and tapered terminals, so a rule
calibrated on set type is optimistic for it. **TO SPECIFY:** confirmed heights
from a printed test viewed at the real distance in the real light — the standing
requirement in [04](04-colour-and-materials.md#distance-sun-and-night).

---

## Vehicle livery

A van is the brand's largest surface and its least controlled one: seen moving,
from behind, at an angle, in sun and at night, parked against anything.

### A · A provider's van

The common case, and 06 had no row for it until
[the artefact grant](03-identity-system.md#the-artefact-grant--decided) was
decided. The provider's identity is primary throughout; ours is the **mark
alone**, second, smaller, outside their clear space.

| Panel | Carries | Field and mark |
|---|---|---|
| **Sides** | Provider's identity, sized for 15–20m. Our mark alone, second | Light body → ink **15.98** · ink or dark → white **16.38** · brand teal → **ink 7.24** · accent teal → white **4.86** · any other body colour → ink or white, **measured** to clear 4.5:1 |
| **Rear** | The provider's contact block — one number, one URL, **both theirs**. Our mark alone | Ink on light **15.98** · white on ink **16.38**. Never brand teal, and no teal type (2.21) |
| **Cab doors** | The outlet block alone, wholly the provider's | **No platform mark.** Staged on [09 #1a](09-brand-representation.md#open-decisions-and-to-specify) |
| **Bonnet** | Provider's mark alone, small, or nothing. Never mirrored | Ink on light, white on dark. No platform mark |
| **Cab glass** | Nothing of ours | Unknown field behind perforated film disqualifies both teals |
| **Rear glass** | Small cut vinyl, ink or white, if used at all | Permitted, lowest value |
| **Roof** | Nothing | — |

**The platform's URL does not appear on a provider's van.** The contact a
customer needs is the shop's.

### B · A vehicle Wash Junkie runs itself

The scheme below is the platform's own. It was written before anyone asked whose
van it described, which is the gap [the artefact grant](03-identity-system.md#the-artefact-grant--decided)
closed — see **A** above for a provider's.

| Panel | Carries | Field and mark | Why |
|---|---|---|---|
| **Sides** | The primary identity — one lock-up, sized for 15–20m | Accent teal `#007e84` with a white lock-up (4.86:1), or a light body with an ink lock-up (15.98:1) and brand teal as a supporting band | The only panels long enough for a 5.804 : 1 lock-up. Brand teal is the field **only** with an ink mark |
| **Rear** | Contact — one phone number, one URL, the mark alone | Ink or white, the highest contrast available | The panel with the longest dwell time: the vehicle behind sits with it in traffic, square-on, at a following distance rather than a passing glance. It is the only panel a stranger gets to re-read |
| **Cab doors** | As sides, plus our own contact | As sides | Seen at 2–5m at eye level — the panel a customer stands next to at the kerb. On a **provider's** van this panel carries **no platform mark**: it is the door an unmarked driver steps out of, which would make the same claim the driver's garment is refused for ([09](09-brand-representation.md#decided--option-a)). Staged on [09 #1a](09-brand-representation.md#open-decisions-and-to-specify) |
| **Bonnet** | Mark alone, small — or nothing. **Never mirrored** | Ink on a light bonnet, white on a dark one | Steeply raked, so it foreshortens, and it takes the most UV and stone chips of any panel. Reversed bonnet lettering is an emergency-vehicle convention, not ours, and mirroring an asymmetric mark is [explicit misuse](03-identity-system.md#misuse) — the splash reads as water thrown in one direction |
| **Glass** | Small cut vinyl in ink or white. Never the primary mark | — | Perforated one-way film is part holes by area — the ratio is a property of the product, so **TO SPECIFY** from the actual film — and the graphic's brightness is therefore a mix of ink and whatever is behind the glass. An unknown field disqualifies both teals at once |
| **Roof** | Nothing | — | Never seen, and gloss film up there throws glare into first-floor windows |

### A wrap is not a print

| The body does this | So |
|---|---|
| Curves, swage lines and wheel arches **stretch the film locally** | **The mark needs a flat panel.** Distortion is uneven, so the wordmark's already-irregular strokes go visibly wrong. Fit the mark and its `0.45 × height` clear space inside the largest flat rectangle on the panel |
| Rivets and recesses are **heat-formed** — the installer works the film into each one | Artwork crossing a rivet line gets a dimple and a colour shift where the film thins. Keep the mark off them |
| Doors, flaps and rear leaves have **shut-lines** | **Never cross one.** A split mark misregisters every time the door opens, and permanently once a panel is replaced after a knock. On split rear doors, put the mark wholly on one leaf or on the header above the split |
| Calendered film shrinks back, printed teal inherits the process-ink problem, and gloss reflects the sky along the roofline | **Cast, not calendered**; factory-coloured film rather than printed film for the teal ([04](04-colour-and-materials.md#the-other-colour-systems)); and **matte on anything that must be read**, because the reflection kills legibility before the colour does |

### Contact block

One phone number and one URL — not also an email, a social handle and a QR code.
A van is read in the gap before it or the reader moves on, and nobody chooses
which item to read first: each thing added costs the whole set, because the
reader takes away none of it rather than one of it.

| Rule | Why |
|---|---|
| Set in **Inter**, cap height from the distance table | It is type, so it obeys the type row, not the lock-up row |
| **Ink or white only** — never brand teal | Brand teal on paper is 2.21:1, under the 3:1 non-text floor before you ask it to carry a numeral |
| URL without `https://` or `www.`, number grouped as a person would say it | Four characters of noise at 20m, and the number has to survive being held in memory to the next set of lights |
| **No email address** | Nobody transcribes an email from a moving vehicle, and it dates faster than a number |

### Night

| Rule | Why |
|---|---|
| Night presence comes from **lightness contrast** — paper or white against ink | Retroreflective film only works with a headlamp on it and does nothing for a van parked under a streetlight, so the kerbside case is the unlit one ([04](04-colour-and-materials.md#distance-sun-and-night)) |
| The reflective element is **white or a light neutral**, never the mark's colour | Retroreflective film is a separate product range from wrap film and does not carry our teal — so a reflective element is a neutral one by construction, carrying the rear contact block and the contour marking rather than the mark. **TO SPECIFY:** the film and whether the range holds anything near 200° at all, from a physical sample under a headlamp at 30m, not a datasheet |

> **Rear conspicuity marking is a legal requirement in many markets and belongs
> to that market's regulator, not to this guide.** Confirm it before the wrap is
> designed — it claims a fixed band of the rear panel and the layout has to give
> it up. This guide names no standard it has not verified.

> **PROPOSAL — needs sign-off.** The scheme above is derived from the contrast
> constraint. The constraint is fact; the scheme is not yet a decision. Whether
> driver vehicles are platform-liveried at all, or carry the provider's
> identity, interacts with [strategy open decision
> #8](01-strategy.md#open-decisions).

---

## Outlet signage

The shopfront is the provider's, and so is the sign. Wash Junkie appears as an
endorsement: **the mark alone, second, smaller, outside the provider's own clear
space** — an endorsement should not repeat a name the fascia already carries.
Getting this backwards tells a passer-by the shop is a Wash Junkie branch, which
is a claim the business model does not make. That the provider leads is settled
([03](03-identity-system.md#co-branding-and-partner-lock-ups)); *whether our mark
is on their fascia at all* is [strategy open decision
#8](01-strategy.md#open-decisions), so treat everything below as the geometry
that applies once that is answered.

| Element | Read at | Carries | Notes |
|---|---|---|---|
| **Fascia** | Kerb to fascia — measure it per site | The provider's name; our mark as endorsement | Pavement width and approach angle differ at every address, so height is derived per site from the table above, never standardised |
| **Window vinyl** | 2–5m | Services, hours, the mark | Cut-vinyl floors: lock-up 23mm, mark 22mm. Below that, **print and cut** ([floors](03-identity-system.md#minimum-sizes-for-physical-reproduction)) |
| **A-board** | 2–4m, at an angle, while walking | One offer, one line, type cap ≥ 25mm | Identical on both faces — you cannot know which way someone walks. Weight the base, or the brand spends the afternoon lying in a puddle |
| **Opening-hours plate** | 0.5–1m, at the door | Days, hours, today's exception | Type cap ≥ 10mm (the 1m row, rounded up). Hours in the **outlet's own timezone**, never a numeric date ([Verbal identity](02-verbal-identity.md)). Leave a slot for a handwritten note — a plate that cannot say "closed today" gets one taped over it, and the taped note is what the customer photographs |
| **Second-surface vinyl** | — | Artwork produced **mirrored**, so it reads correctly from the street | A production instruction, not a design variant: the finished shopfront is not mirrored. Write it on the artwork, or someone will "fix" it and the window reads backwards from outside |

| Illumination | What it does to the teal | Verdict |
|---|---|---|
| **None** | The street lamp decides. Under low-pressure sodium the teal reflects almost nothing and goes near-black; under a broad-spectrum white LED it gets back most of what it had ([04](04-colour-and-materials.md#distance-sun-and-night)) | Contrast comes from **lightness** — ink on white, white on ink. Teal is decorative after dark, not structural. **TO SPECIFY:** the lamp type outside each outlet, per [04](04-colour-and-materials.md#distance-sun-and-night) |
| **Face-lit** | Transmitted teal is not reflected teal: lighter, more acid. A face matching the swatch by day will not match the van parked outside it at night | Judge on a **lit sample**, never a swatch. Ties to the lit-signage colour temperature already **TO SPECIFY** in [04](04-colour-and-materials.md#distance-sun-and-night) |
| **Halo / back-lit** | Colour disappears entirely — the sign is a silhouette and shape carries everything | Fine for the provider's name. **Do not halo-light our lock-up**: the halo bleeds into the wordmark's counters, the first thing to close at any size |

---

## Uniforms

These are the uniforms of a business whose product is washing. They get washed,
hot, often, and that chooses the process before anything else does.

**Whose garment it is.** A **driver** carries no platform mark on kit we
specify, supply or catalogue — decided
([09](09-brand-representation.md#decided--option-a)). A provider's **staff
garment** splits — the **apron** may carry the mark, the **polo** carries the
name set in type, because a polo is worn out of the shop
([03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided)): a staff member
in the shop is not the party taking custody at a door. A **field agent** is ours
and leads ([09](09-brand-representation.md#what-they-wear-and-what-they-carry)). What
follows is the process, and it applies to whichever garments end up carrying a
mark at all.

| Process | Detail it holds | What a year of hot washing does | Use it for |
|---|---|---|---|
| **Embroidery**, 40wt polyester | Mark ≥ 22mm, lock-up ≥ 23mm | Nothing — the thread outlasts the garment. Polyester, not rayon: rayon has the better sheen and loses it ([04](04-colour-and-materials.md#the-other-colour-systems)) | Everything worn daily — polo, cap, apron |
| **Screen print**, plastisol | Lock-up ≥ 12mm, mark ≥ 11mm | Cracks and lightens. On polyester the fabric's own dye migrates into the ink under cure heat unless a blocker is specified | Cheap, replaceable items only |
| **Heat transfer / DTF** | The finest detail of the three | Lifts at the edges, then peels — it is an applied layer, not ink in the fabric or thread through it, and repeated hot washing is the exact load that separates a layer from its substrate | **Nothing this company washes.** Which is all of it |

Two rules govern every garment below. **Below 23mm, embroider the mark** — the
lock-up is not embroiderable at chest-badge size, because at 70mm wide it is
12mm tall and its thinnest stroke falls under the satin floor. And **the badge
height is fixed in absolute terms across the size run**: a 4XL polo with a
proportionally larger badge reads as a different garment, and the hoop is set
once anyway.

| Garment | Element | Placement rule |
|---|---|---|
| **Polo, left chest** | Mark — 22mm floor, 25–30mm working | Centred in the panel between the placket edge and the armhole seam, on the wearer's left. **TO SPECIFY:** the absolute drop from the shoulder seam, measured on the smallest garment in the actual size run, then held constant |
| **Polo, back** | Mark above a line of set type — never the lock-up | Design for 5m: a back panel is read across a shop floor or from the kerb as a driver walks away, not at arm's length. At 5m a lock-up would be 440mm wide, the whole back panel; the mark at 46mm over type at 42mm cap fits. It is also the approved pattern — **mark alone beside words already set in type** |
| **Apron, bib** | Mark, centred on the bib, above the pocket line | Below the pocket line it is under someone's hands half the day; on the centre line it sits in the crease the bib takes when tied |
| **Cap** | Mark only, offset onto one front panel, or a side panel | The front of a 5- or 6-panel cap is bisected by a seam and embroidery across a seam distorts. The lock-up's tapers cannot be stitched at cap size at all |
| **Hi-vis** | Mark in ink, in the field **between** the reflective bands | The garment's colour and its bands belong to the safety requirement, not to us. Artwork over a band destroys the band's function and will not adhere. **Never tint a hi-vis to brand teal** — the colour is the point of the garment |

A brand-teal polo with a white logo is the 2.26:1 case, worn in the sun. What
works: **white** or **brand teal** on ink (16.38, 7.24) · **ink** on brand teal
(7.24) · **white** on accent teal (4.86) · **ink** on white (15.98).

Then the problem that actually shows up: **the garment fades faster than the
badge.** Embroidery does not fade; dyed cotton washed hot does, and twelve staff
in twelve differently-faded teals reads as neglect — in a laundry brand, judged
on exactly that. So the daily garment is **ink, white or a dark neutral**, whose
fade nobody can see, and teal goes on the apron or cap, replaced more often.

---

## Laundry bags

The highest-impact object this brand produces, because it is the only one that
lives in the customer's home *between* orders. Its job is to be **left out**,
not put away: a bag that is one large logo gets folded into a cupboard, while a
plain field with a small mark stays by the door and works every day.

| Decision | Specification |
|---|---|
| **Material** | Woven, not non-woven. Non-woven polypropylene is cheap and delaminates — the wrong signal from a business whose promise is care of physical things. Cotton canvas is absorbent, off-white, and its weave breaks fine detail, so mark alone above the tested floor. Woven polyester holds print better and dries faster, but migrates its own dye into a print under heat, so specify a blocker or low-cure ink ([substrates](04-colour-and-materials.md#substrates-the-same-teal-seven-different-colours)) |
| **Size** | **TO SPECIFY:** derived from one order's typical load and the Wash House intake shelf it sits on. Measure both before quoting; do not pick a volume |
| **Print** | Single-colour screen print on the **flat panel before make-up**. Printing a finished bag means printing over a seam, and the seam is where ink cracks first |
| **Placement** | On the face, **above the fold line the bag makes when half full**. A mark low on the panel spends most of its life inside a crease |
| **Colour** | Light ground → ink. Dark ground → white. Brand-teal ground → **ink**. Never white on brand teal |
| **Handles** | Webbing sewn the full height of the panel and bar-tacked, not stitched at the hem. The failure mode is a handle tearing out of a full bag on a doorstep — the worst brand moment available to us |
| **Closure** | Drawstring with a cord lock. A driver has **one free hand**; that is the Driver App's whole design constraint and the bag inherits it. A zip needs two |
| **Order reference** | Replaceable, because the bag outlives the order — a **clear label pocket** sized to the outlet's own label stock plus a clearance each side (**TO SPECIFY:** both the stock and the clearance, from the label actually printed — outlets name their label printer in Settings and the stock is theirs, so there is no single figure to put here), or a **sewn webbing patch** that takes a marker. The patch works because the reference is a **7-character Crockford-base32 code** — digits plus A–Z with the ambiguous `I`, `L`, `O` and `U` removed — so a handwritten or dictated code has no character anyone can mistake, which a free-text name does not give you. **Never print the reference onto the bag**: it is a bag, not an order |
| **A washing machine's worth of life later** | Printed ink cracks and lightens; thread and woven labels do not. Split the artwork by lifespan — **permanent identity is embroidered or a woven label sewn into the seam, and anything screen-printed is a wearing surface** expected to go. Decide which is which before the quote, because a supplier will happily print all of it |

---

## Receipts and dockets

The material argument — one ink, two states, no tints or screens, reversed areas
kept small, and paper that fades from the day it prints — is
[04](04-colour-and-materials.md#thermal-receipts-are-1-bit), and is not repeated
here. What it leaves for this page is the layout, and one number the layout
divides by: at the typical 203dpi a dot is **0.125mm**, a 58mm roll is commonly
384 dots ≈ 48mm of print width, and an 80mm roll commonly 576 dots ≈ 72mm.
**Confirm the dot count on the actual device** — every measurement below divides
by it.

| Rule | Derivation |
|---|---|
| **Mark, not lock-up** | Thermal floors are mark 5.5mm (44 × 89 dots), lock-up 6mm (48 × 278 dots). The lock-up fits a 48mm width with its clear space, barely — but its thin strokes need every dot, so the mark is the default until a test on the real printer says otherwise |
| **3mm cap height minimum** for anything a customer reads | Reading distance ≈ 350mm, so `cap = D / 120` gives 2.9mm. At 3mm the stroke is `0.15 × cap` = 0.45mm ≈ 3.6 dots, comfortably over the 2-dot survival floor ([03](03-identity-system.md#minimum-sizes-for-physical-reproduction)) |
| **2mm cap is the absolute floor**, secondary lines only | At 2mm the stroke is 2.4 dots. One dot of head bleed and it closes |
| **The reference is the largest thing after the total** | It is what a customer quotes on the phone and what a Wash House operator types back in. Everything else on the docket is recoverable from it |
| **Set the reference in a face that distinguishes its own characters** | Crockford removes `I`, `L`, `O` and `U` but keeps `5`/`S` and `2`/`Z`, so the face does the rest. Rendering the receipt as a bitmap lets us choose it — JetBrains Mono, the platform's numeric face ([Typography](../04-typography.md)); the device's built-in font does not, which is a reason to render |
| **The QR is a convenience, never the record** | Outlets turn "Print order QR" on per outlet, so the layout works with it and without it. Module size **≥ 3 dots (0.375mm)** so a module survives head bleed and fading, four modules of quiet zone clear of everything, and **always the human-readable code beside it** — a faded QR is dead while the same faded code still reads. **TO SPECIFY:** the printed size once the tracking URL is fixed; payload length sets the version, which sets the module count, which sets the size. Derived, not chosen |

The console already generates the durable copy: `web/src/lib/receipt-pdf.ts`, A4
portrait, 18mm margins, vector text crisp at any zoom. Two of its decisions are
brand decisions and should stay — money rendered with the **ISO currency code**
(`NGN 1,200`) rather than the symbol, because the base font has no `₦` glyph and
a dropped symbol on a tax document is worse than a verbose one; and the optional
footer **"Powered by Wash Junkie"**, the deferential form of the endorsement and
the right shape for a provider's document.

> **Fixed 2026-07-31.** The PDF set "Wash Junkie" at 20pt above the business
> name at 10pt — and the print-receipt modal carried the same inversion, so a fix
> to one alone would have left the two versions of one record disagreeing. The
> business now leads in both, falling back to the outlet and never to the
> platform. Two colour defects went with it: the file's ink was `#141416` rather
> than the system's `#1d2022`, and its grey measured 4.42:1 on white, under the
> floor [12 · Accessibility](../12-accessibility.md) audits.

---

## Hang tags, care labels and garment tags

Three different objects. Conflating them is the mistake, and one of them is not
ours to touch.

| Object | Belongs to | Lives for | Process |
|---|---|---|---|
| **Order / rack tag** | The platform, printed on the outlet's label printer | The order | **Thermal-transfer resin on synthetic facestock.** Direct thermal will not survive a press, a hot room or a wash — it goes black or goes blank |
| **Hang tag** on a finished garment | The outlet | Until the customer takes it off | One-colour print on card, die-cut |
| **Care label** | The garment's manufacturer | The garment's life | **Never ours.** Do not add to, cover, replace or re-sew a care label — it is the maker's statement about the garment, and altering it moves liability onto whoever altered it |

This is where the mark hits its floor: **mark 4.5mm** applied in any medium and
5.5mm on thermal. The mark's keep-clear box is `2.920H × 1.9H`
([03](03-identity-system.md#clear-space-and-screen-minimums)) — the mark is 2.020
× as wide as it is tall and clear space adds `0.45H` on each of four sides — so a
5mm mark claims **14.6 × 9.5mm** before anything else is on the tag. It is a
landscape box, not a square, which is what catches people out on a tag that is
tall and narrow.

> **On any tag the reference outranks the mark. If both will not fit legibly,
> the mark goes.** A tag exists to attach an order to a garment; one carrying a
> logo and an illegible code has failed at the only job it had.

And from [04](04-colour-and-materials.md#a-single-colour-brand): a tag
separating express from standard, or one route from another, **by colour alone**
dies the moment it is photocopied or printed on a mono label printer, because
five of the eight brand colours sit inside a 0.031 luminance band. Carry a word
or a shape.

---

## Packaging and consumables

| Item | Rule | Why |
|---|---|---|
| **Dry-cleaning garment cover** | Print the mark inside a **solid printed light field** — or print no mark, and one line of one-colour type at the hanger end instead | Clear film has no field of its own, so the mark reads against the garment. A black suit and a white shirt are opposite fields and no single ink works on both. Film printing is coarse and registers poorly: one colour, one hit, no fine reversed type |
| **Tape** | One colour on the tape's own ground. Pitch the repeat so at least one **complete** mark and its clear space appear on the shortest carton in use. **TO SPECIFY** from the actual carton range | A repeat tuned to a long carton produces a half-mark on a short one, on every parcel |
| **Die-cut sticker** | Cut a rounded rectangle or a generous outline offset — **not** the mark's own contour | The splash is five paths with tapered terminals; contour-cutting it leaves slivers that lift with the waste and curl off the backing |
| **Seal sticker** across a bag closure | A security object first: it must **tear rather than peel**, and its printed content is the reference, not the logo | Its job is to show whether the bag was opened. A logo does not do that |
| **Kraft board boxes** | **Ink only.** Teal on kraft needs a white underprint — an extra pass, so budget it or drop it | Kraft is a brown ground under a translucent ink; the teal goes warm and dead ([substrates](04-colour-and-materials.md#substrates-the-same-teal-seven-different-colours)) |

---

## Merchandise

The gate, and it is the only part that lives on this page:

> **An item earns the mark by having a job in the service.** If you cannot name
> the moment in an order's life when someone uses it, it is not merchandise — it
> is landfill with our name on it.

Everything downstream of that test — the catalogue and who each item is for, the
four refusal grounds and the arguments people bring against them, the wash and
load tests, what a supplier confirms before a run, and when each object is handed
over — is [10 · Merchandise](10-merchandise.md), which is the programme in full.
The laundry bag itself is specified [above](#laundry-bags), because it is an
object before it is a programme.

One standing rule sits here with the other physical rules: **nothing durable
carries a phone number.** Put the URL on it and nothing else — a URL survives an
office move; five hundred printed bags do not.

---

## Before any physical order ships

Run all of it. Each line has cost someone money somewhere.

- [ ] **Vector artwork from [`assets/`](../../assets)** — no screenshot, no
      upscaled PNG, nothing the supplier redrew from a JPEG.
- [ ] **Specified by height, not width.** Width follows from the ratio.
- [ ] **Clear space `0.45 × height` genuinely empty** — no rule, seam, fold,
      shut-line, bleed edge or partner logo inside the box.
- [ ] **Minimum size re-run with the supplier's own minimum-feature figures**
      ([03](03-identity-system.md#minimum-sizes-for-physical-reproduction)
      prints typical working values, not specifications).
- [ ] **Spot code for that medium**, with the substrate and finish it was
      matched on. Never a hex in an email.
- [ ] **Contrast pairing is an approved row.** Say it out loud: *ink on the
      bright teal, white on the deep teal, never white on the bright teal.*
- [ ] **1-bit check** — print it mono. Anything that stops distinguishing itself
      also carries a word or a shape.
- [ ] **Distance check** beyond arm's length: pairing clears 4.5:1, height from
      the table above or, better, a site test.
- [ ] **Physical proof on the real substrate** — wet proof, stitch-out, test
      cut, or a test print on the actual roll. A PDF proves nothing about ink on
      kraft.
- [ ] **Proof signed and filed.** That sheet, not a number, is what a reprint is
      judged against.
- [ ] **Customer-facing copy** through [Verbal identity](02-verbal-identity.md)
      — no technical text, no numeric date.

| Gate | Signed by |
|---|---|
| Artwork, colour, contrast, minimum size | Brand owner |
| Fit for purpose — will the bag hold a load, will the tag survive the wash | Operations owner |
| The physical proof | Both, on the proof itself |

**TO SPECIFY:** the named holders of those two roles — today they may be the
same person. Write down who, because "someone approved it" is how an unsigned
proof becomes four thousand bags. And **nobody signs off a physical piece on a
screen**: a screen cannot show ink on kraft, thread on polyester, or a teal
fascia under a sodium lamp.

---

## Open decisions and TO SPECIFY

| | Item | Method / blocked on |
|---|---|---|
| 1 | **Confirmed heights by viewing distance** — lock-up, mark, set type | A printed test at the real distance in the real light. The table above is the starting point, not the answer |
| 2 | ~~Vehicle livery scheme~~ | **Closed 2026-07-31.** Two schemes, because a van has two possible owners and this table only ever described one — see **A · a provider's van** and **B · a vehicle Wash Junkie runs itself** above. The one deletion: the cab-door co-brand pair. Constraints unchanged; what was missing was whose vehicle the fields described |
| 3 | **Rear conspicuity marking** | The market's own requirement. Confirm before layout — it claims a fixed band of the rear panel |
| 4 | **Retroreflective film** | A physical sample, under a headlamp, at 30m |
| 5 | **Lit-signage colour temperature, the face-lit teal, and the street lamp outside each outlet** | A lit sample on site, not a datasheet. Extends the same item in [04](04-colour-and-materials.md#distance-sun-and-night) |
| 6 | **Uniform badge drop measurement** | Measured on the smallest garment in the actual size run, then held constant across it |
| 7 | **Laundry bag size and label-pocket dimensions** | One order's typical load, the Wash House intake shelf, and the outlet's own label stock |
| 8 | **Thermal print widths in dots** for the devices actually in use | Confirm on the printer; every receipt measurement divides by it |
| 9 | **QR printed size** | Derived from the payload, once the tracking URL is fixed |
| 10 | **Receipt hierarchy drift** — `web/src/lib/receipt-pdf.ts:171–180` **and** `web/src/screens/orders.tsx:4610` (styled `orders.css:1152`, 20px/700) | **Not blocked, and never was.** The platform leads on the provider's own receipt in two places, which is wrong under every answer to #8. Delete the platform header, promote the business name into the slot, keep the `showBadge` footer. Two further defects in the same file: `setInk` is `(20,20,22)` = `#141416`, not the guide's ink `#1d2022`; and `setGray` is `#787878` = **4.31:1 on paper**, under the audited 4.5:1 floor |
| 11 | **Named sign-off holders** | Write down who, in this document |
| 12 | **Wrap film's warranted outdoor life for this climate** | The manufacturer's data sheet for the actual product, per [04](04-colour-and-materials.md#the-other-colour-systems) — not a rule of thumb. It sets the re-wrap interval, which is what the livery budget is really made of |
| 13 | **Perforated window film's open ratio** | The product's own figure. It decides how much of the background shows through the graphic, and therefore whether anything but ink or white can go on glass |

Colour codes for every medium — spot, RAL, vinyl, thread — are [04's open
list](04-colour-and-materials.md#spot-colour), and none of them are guessed
here. No Pantone, RAL, thread or vinyl code appears anywhere in this document,
and none should be added until someone has matched it against a physical book
under D50.

---

Related: [Identity system](03-identity-system.md) · [Colour &
materials](04-colour-and-materials.md) · [Strategy](01-strategy.md) · [Verbal
identity](02-verbal-identity.md) · [Brand
representation](09-brand-representation.md) · [Merchandise](10-merchandise.md) ·
[Brand](../02-brand.md) · [Colour](../03-color.md) ·
[Accessibility](../12-accessibility.md) · [White-label](../13-white-label.md)
