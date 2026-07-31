# Art direction

*For a photographer, illustrator, film-maker or agency making images for Wash
Junkie — open it while the brief is being written, not when the selects come
back.*

[Brand](../02-brand.md) sets how the mark behaves on imagery and
[Liquid Glass](../06-liquid-glass.md) sets what the material does over it. Their
contrast and composite figures are audited by `node tokens/build.mjs --check`,
which exits non-zero when one fails, and this page never restates one of their
numbers differently — every figure below is either quoted from them or derived
here in the open. What follows is upstream of them: what is in the frame, how
it is lit and cropped, and what gets drawn when there is nothing to photograph.

---

## The subject is the work, and the people doing it

**Wash Junkie does not wash anything**
([Strategy](01-strategy.md#what-wash-junkie-is-not)). One fact, and it decides
the whole subject matter: the product is a record of work other people do, so the
photography is of those people and that work — never of laundry as an ownerless
object on a seamless.

| Shoot | Why it earns its place |
|---|---|
| **Hands at intake**, sorting a customer's bag onto the counter | The moment a pile of clothes becomes an order. This is the most literal picture of the product there is |
| **The counter at opening**, before the first customer of the day | An outlet is a shopfront. Empty and ready says more about a business than a queue does |
| **A Wash House floor mid-cycle** — machines loaded, drums turning, tags on a rail | The Wash House is the production facility, and the distinction between it and the outlet is most of why this platform exists |
| **A loaded van**, back doors open, bags going in | The driver leg. Movement is one leg of a job, not the job |
| **A driver at a gate**, one hand on a bag, phone in the other | The Driver App's real operating condition: outdoors, one free hand, bright sun ([Surfaces](../11-surfaces.md)). **Wardrobe: the provider's garment or unbranded clothing — never platform kit**, because a driver carries no mark of ours ([09](09-brand-representation.md#decided--option-a)). A stock shot of a courier in platform livery is the wrong frame, not just the wrong logo |
| **An owner with the console open** on a laptop propped between a price list and a kettle | Where the software actually lives. Never a boardroom, never a standing desk |
| **A rack of finished orders**, tagged and bagged | The record made physical — what the customer is trusting |
| **A field agent and an owner over a tablet**, mid-registration | The Agent Console's condition: in the shop, with the owner watching |

**Shoot named places.** The seed data's outlets are Ikeja, Lekki and Yaba —
real Lagos locations, and the brand's specificity comes from them. *A photograph
of a named Lagos street is specific; a pattern is a shortcut*
([Strategy](01-strategy.md#5--locally-specific-not-locally-trapped)).

**Nigeria-first is not Nigeria-forever.** The Country → State → City data and
multi-currency work are already done, so a second market is near-term. Be
**specific in the frame and general in the structure**: the shot list above is
the same list in any city, and only the locations change. A library built that
way gains a country without the first one looking like the exception.

**Everyone in frame is a real person at a real business**, which means a signed
model release and the owner's permission before the shutter, not after.
**TO SPECIFY:** the release form and licence duration — legal, not design
([08 · Usage & legal](08-usage-and-legal.md)).

## What not to shoot

| Don't | Because |
|---|---|
| **Stock-library smiling models** in a laundrette | What we are displacing is the exercise book — free, trusted, and never selling to anyone ([Strategy](01-strategy.md#the-competitive-frame)). A hired smile in a laundrette is a stranger with a pitch, which is the one thing the book never is. Whether a provider clocks a model who has plainly never carried a full bag is an assumption, and flagged as one ([Strategy](01-strategy.md#the-provider-specifically)); that the frame is doing no work either way is not |
| **Folded towels on a seamless white**, or an overhead flat-lay of colour-coordinated clothes | A product shot for a product we do not sell. We sell the record, not the washing — and it puts the garment at the centre when the person and the record are the subject |
| **Anything that could be any laundry anywhere** — no signage, no street, no currency, no faces | Interchangeable imagery is what a directory looks like. If the frame would work for a competitor in another country, it is doing nothing for this brand |
| **The staged "diverse team pointing at a laptop"** | Nobody points at a laptop. The screen in those images is always fake, and the paying audience is inside the real Service Provider Console eight hours a day — it is the one surface they know better than we do |
| **Pan-African visual shorthand** — generic prints, generic markets — as a stand-in for a real location | Specificity is the asset. A pattern is what you reach for when you have not been to the place |
| **Suds, bubbles, splashing water, machine drums as heroes** in anything permanent | Roadmap Phase 5 extends to home cleaning and car wash. Strategy's proposed recommendation keeps permanent assets free of laundry-specific imagery so the exit stays cheap ([Strategy](01-strategy.md#recommendation)). Editorial photography may show a washing machine; a permanent asset may not |
| **Anything that implies we did the work** — a caption reading "our Wash House", "our team collected" | False, and the verbal identity rules it out in words for the same reason ([Verbal identity](02-verbal-identity.md)) |
| **A screen in shot showing anything but the real product** | A mocked-up console in a photograph becomes the thing everyone compares the real one to |

## Light, and where the teal comes from

**Warm ambient light is the base. The teal is an object in the scene, not a
grade** — a screen showing the console, a bag, a van panel, a uniform. A spot
area someone could point at, which is how a mark should behave.

| ✓ Do | ✗ Don't |
|---|---|
| Let the room's own light lead — daylight through a shopfront, a Wash House's overheads, late-afternoon sun off a van | Push the whole midtone toward 200°. Brand teal is hue **199.9 at 0.116 chroma**; a frame graded into the mark's own hue leaves nothing for the mark to separate from |
| Keep skin warm and neutral | Teal-and-orange the grade. It is a film-trailer look, and it makes every image read as an advert for something else |
| Hold the black point at or near ink `#1d2022` (luminance **0.014**) | Crush to pure black. In print a photograph's shadows are the rich-black risk, not the brand colours ([Colour & materials](04-colour-and-materials.md#tac-and-the-300-rule)) |
| Hold specular highlights **below** paper `#fcfcfd` (luminance **0.974**) | Let highlights clip. A reversed white mark and a blown highlight are the same value, and the mark dissolves into it |
| Shoot exteriors early or late | Shoot midday exteriors by accident. Midday is a legitimate subject — it is the Driver App's operating condition — but shoot it on purpose, for that |

**The teal is a mid-grey.** Its relative luminance is **0.414**, against ink at
0.014 and paper at 0.974
([Colour & materials](04-colour-and-materials.md#a-single-colour-brand)) — a teal
bag against a mid-tone wall disappears in greyscale and goes solid black in
1-bit. So it may be the *note* in a frame, never the only thing separating the
subject from the background. **Run the greyscale test on every select**, the test
a screen gets before it ships
([Accessibility](../12-accessibility.md#reviewing-a-screen)): if the subject is
gone once desaturated, the frame carries its structure in hue alone and fails in
print, on a sunlit phone, and for the ~8% of men with a colour vision deficiency.

## Composition, because these images sit under glass

Every hero image is a **backdrop for chrome and type**, not a finished picture.

**Leave a landing zone** — one region of low local contrast, large enough for the
type block plus its clear space, which for the lock-up is `0.45 × height` on all
four sides ([Brand](../02-brand.md#clear-space)). Busy everywhere means the mark
and the headline have nowhere to go, and the fix at that point is a scrim: a
composition problem paid for by the image.

**Keep the subject out of the chrome bands.** Marketing runs a top bar
transitioning `veil` → `pane` on scroll; the Customer App carries a bottom
`TabBar` at `pane`; the order-tracking hero puts a `shell` card over the map
([Surfaces](../11-surfaces.md)). Faces and hands do not go where those sit. Since
the heights belong to the layout and not to this page, the method is: mask the
real bars over the frame at every crop in the set before the shot is signed off.

**Compose for the narrowest crop, not the widest.** With height held,
`retained width = target aspect ÷ source aspect`. A 3:2 original re-cropped to a
4:5 mobile hero retains `0.8 ÷ 1.5` = **53% of the frame width**, so anything
that must survive lives in the central 53% and the rest is atmosphere you have
agreed to lose. A full-bleed hero also holds from
`xs` 380 to `2xl` 1600 CSS px — a **4.2× span**
([Space & layout](../05-space-and-layout.md#breakpoints)) — so a frame whose
subject reads at one size only fails at the other. The social ratios are already
specified, by the same arithmetic taken on whichever axis the crop squeezes: a
9:16 story keeps its central **56.25%** of frame height through a 1:1 re-share
and **70.3%** through a 4:5, and a 1.91:1 link preview keeps **52.4%** of its
width through a 1:1 centre crop
([Digital & social](07-digital-and-social.md#stories-and-reels)). **TO SPECIFY:**
the marketing surface's own crop set, which follows a layout that is not built
yet.

## Images under Liquid Glass

The material has an explicit mode for this — `data-over="media"`, which drops
saturation to 120% and adds a calming underlay. The next sentence is the one
people get backwards: **legibility does not depend on it.** The tier alphas
already clear AA over pure black *and* pure white, which is why this system has
no "don't put glass over photos" caveat
([Liquid Glass](../06-liquid-glass.md#over-media)).

So **do not flatten, dim, or pre-darken imagery for the web.** No "for overlay"
version, no baked-in gradient, no reduced-contrast delivery — the material
handles it, and a flattened original cannot be un-flattened later. What still
bites is the **mark**, which is artwork rather than text and has no alpha behind
it:

| Over media | Rule | Source |
|---|---|---|
| The mark or lock-up | **White, always.** Never brand teal — it is mid-lightness and will vanish against roughly half of any real image | [Brand](../02-brand.md#on-imagery) |
| A busy region behind the mark | Move the mark, or put it on a `veil`-tier surface. **Never add a drop shadow to the artwork** — the paths carry no effects, and a shadow breaks every reproduction minimum at once | [Brand](../02-brand.md#on-imagery) · [Identity system](03-identity-system.md#misuse) |
| Tinted glass | The lock-up never goes on it. Neutral or reversed only | [Identity system](03-identity-system.md#misuse) |
| Two glass layers over the same part of one image | Don't. The marketing surface has an unbounded glass budget, but each tier over a large photograph is another full-size blur region, and depth stops reading when layers overlap on a backdrop that is already busy | [Liquid Glass](../06-liquid-glass.md#performance) |
| `scrim` | It is the dimmed plane behind a `shell`, at α .32 light / .55 dark. It is not a general-purpose image darkener, and reaching for it to rescue a headline means the headline is in the wrong place | [Liquid Glass](../06-liquid-glass.md#tiers) |
| A blur reveal on scroll | Never animate `blur()`. Animate the layer's transform and opacity | [Motion](../07-motion.md) |

## Illustration

**Illustrate what cannot be photographed. Photograph everything else.**

| Illustration | Photography |
|---|---|
| Empty states on a full page — no orders yet, no drivers added | Anything that exists today at a real outlet |
| Onboarding and first-run, where the data is not there to shoot | A person, a place, a machine, a van |
| Process and explanation — an order moving through stages, a driver's leg, how Wash Credit draws down, anything future-tense | A screenshot of the real product, which beats a drawing of it every time |

An empty state *inside a card* keeps the 32px `--wj-icon-2xl` icon it already has
([Iconography](../08-iconography.md#sizes)). Illustration is for the full-page
case, where a 32px glyph in the middle of a viewport looks like a mistake.

**The style is the icon spec, scaled up by drawing more — not by drawing
thicker.** Same 24-grid geometry, round caps and joins, **no fill**, and
`currentColor`, so an illustration inherits its context the way an icon does
([Iconography](../08-iconography.md#the-spec)). The trap is the stroke: the icon
set is `1.75 ÷ 24` = **0.073 of the grid**, and holding that ratio at a 96px
illustration gives a 7px stroke — a cartoon, and the end of the family
resemblance the ratio was meant to preserve. So:

- **Hold the stroke's rendered weight roughly where the icon set holds it** —
  around 1.75px at the size it actually renders — and buy scale with more
  geometry: a second object, a horizon, a piece of the room. An illustration
  should look like an icon set given room to finish a sentence. Same floors: 2px
  minimum interior radius, nothing under 14px.
- **If the set takes a second, lighter weight for recessive detail**, set it once
  and hold the ratio across every drawing. **TO SPECIFY:** the pair, decided on
  the first three illustrations and recorded in the artwork file — an
  inconsistent second weight is worse than none.
- **One flat tint behind it at most**, from a low aqua step (`--wj-aqua-2` or
  `-3`), the watermark treatment
  ([Identity system](03-identity-system.md#the-mark-as-a-graphic-device)). Never
  the brand colour at low opacity — alpha composites unpredictably over the glass
  tiers and screens blotchy in print.
- **Never use the status families decoratively.** Moss means done and Ember means
  wrong, on a poster as much as on a screen
  ([Colour & materials](04-colour-and-materials.md#what-the-families-mean-off-the-screen)),
  and no illustration carries a status without the word beside it.
- **No faces in the icon style.** A stroked character with a face is a mascot,
  and whether this brand has one is a strategy decision, not a drawing one.

> **Needs a decision:** whether Wash Junkie has a mascot or character at all —
> [strategy open decision #11](01-strategy.md#open-decisions). Until it is
> answered the rule above is the safe reading and the one in force:
> illustrations carry no faces. It changes the illustration set only; the marks
> are unaffected either way.

## The splash as a motif

The mark is a droplet-and-swoosh reading as **water in motion** — not a machine,
a shirt or a hanger, which is why it carries all three Phase 5 verticals without
a redraw ([Strategy](01-strategy.md#does-wash-stretch)). The three devices —
**crop**, **watermark** and **pattern** — carry their geometry in
[Identity system](03-identity-system.md#the-mark-as-a-graphic-device); use that
section for the numbers. The art direction around them:

- **The gesture is drawn, not photographed.** Never pair the mark with real
  water, splash photography, bubbles, or a ripple filter. Two different waters in
  one frame and neither is the brand's — and suds are laundry-specific, which is
  what permanent assets are staying clear of.
- **A motif is a rhythm, not a texture, and a crop is a gesture, not a second
  logo.** The rules that make that true — fixed orientation and one size for a
  pattern, artboard-edge cropping only, and the watermark's exclusions (never
  behind data or long-form text, never in the Driver App) — are specified once,
  with their numbers, in
  [Identity system](03-identity-system.md#the-mark-as-a-graphic-device). Brief
  against that section; nothing here overrides it.
- **A splash-derived section divider** — a hairline carrying the swoosh's curve —
  is a **PROPOSAL and needs sign-off**, and must not be confused with the
  co-branding divider, which is a straight hairline and never brand teal
  ([Identity system](03-identity-system.md#the-divider)).

## Motion in marketing

| Carries over | Does not |
|---|---|
| **`--wj-ease-glass`, `cubic-bezier(0.32, 0.72, 0, 1)`** — fast departure, long glide, dead stop. The signature ([Motion](../07-motion.md#easings)) | The operator register's `0.85×` motion scale. Marketing is `consumer`, full speed |
| **Growth over fade.** A layer that fades in place is a picture of a layer; one that grows out of the control that summoned it is an object | The `--wj-dur-slowest` 640ms ceiling. A hero or a full-surface film may run longer — it is being watched, not operated |
| **Exits are faster than entrances.** Something arriving deserves to be watched; something leaving is already decided | The "exactly one thing overshoots" rule. That is a console rule, and a console that boings gets its animations turned off. A film may be more expressive |
| **Never animate `blur()`**, and **nothing loops forever except progress** — a decorative loop on a landing page is the same distraction, on a page someone is deciding on | — |
| **`prefers-reduced-motion` is honoured**, collapsing to a 90ms opacity change rather than to nothing. A marketing page is not exempt; it is where people decide whether to trust the product ([Surfaces](../11-surfaces.md)) | — |

**The product moves the way the product moves.** A demo reel animating the
console faster, smoother or bouncier than the shipped one is a promise the
first-run experience pays for. Record the real thing at real speed — 0.85× in the
operator register is a deliberate choice, not something to fix in post.

**The mark itself barely moves.** Never rotate it as a spinner — the brand then
means "waiting" ([Identity system](03-identity-system.md#misuse)) — never morph
the wordmark's letterforms, and never simulate liquid on the splash. The one
motion it may take is a **reveal along its own direction of travel**, once, at
`ease-glass`. **TO SPECIFY:** that reveal as an asset; none exists.

## Briefing and delivery

**What a photographer or illustrator is sent:** this page, the shot list, the
named locations, the crop set, vector artwork from [`assets/`](../../assets) —
never a screenshot or an upscaled PNG — and the contrast rule in the one line
that survives being passed on by phone: *ink on the bright teal, white on the
deep teal, never white on the bright teal.* What comes back:

| Deliverable | Why |
|---|---|
| Graded stills in sRGB **and** the ungraded originals | The crop set will change, a grade for print is not a grade for screen, and the print path starts at [Colour & materials](04-colour-and-materials.md) |
| No burnt-in logo, caption, or watermark | The mark is placed in layout, at its own clear space, in white, over a region chosen for it |
| No pre-darkened "for web" version | The glass tiers do not need one, and a flattened original cannot be recovered |
| Illustration as **stroked vector**, expanded to outlines nowhere | Same reason the icons are stroked: one file at every size, and it survives `forced-colors` |
| Signed releases for every person and business in frame | The businesses in frame are customers or prospects, so the release protects the relationship as much as the photograph. Licence duration is the clause everyone forgets and the one that expires ([Usage & legal](08-usage-and-legal.md)) |

## Open decisions and TO SPECIFY

| | Item | Method / blocked on |
|---|---|---|
| 1 | **The delivered crop set** | The social ratios exist already ([07 · Digital & social](07-digital-and-social.md#stories-and-reels)); what is missing is the marketing surface's own crops, which follow a layout nobody has built. Record them here when it is |
| 2 | **Model and business release forms**, and licence duration | Legal, not design. [08 · Usage & legal](08-usage-and-legal.md) |
| 3 | **The illustration set's second stroke weight**, if it takes one | Decide on the first three drawings; record the pair in the artwork file |
| 4 | **A splash-derived section divider** | Proposal above. Needs sign-off, and must stay visibly distinct from the co-branding divider |
| 5 | **The mark's reveal animation** | No asset exists. Build it at `ease-glass`, one direction, once |
| 6 | **How laundry-specific editorial photography may be** | Depends on [strategy open decision #4](01-strategy.md#open-decisions), brand architecture for Phase 5. Permanent assets stay clear either way |
| 7 | **Whether a mascot or character exists at all** | [Strategy open decision #11](01-strategy.md#open-decisions). Owner's call; the no-faces rule above stands in until then |

---

Related: [Brand](../02-brand.md) · [Liquid Glass](../06-liquid-glass.md) ·
[Motion](../07-motion.md) · [Iconography](../08-iconography.md) ·
[Surfaces](../11-surfaces.md) · [Strategy](01-strategy.md) ·
[Identity system](03-identity-system.md) ·
[Colour & materials](04-colour-and-materials.md).
