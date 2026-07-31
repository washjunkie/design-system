# Digital & social

*For whoever is making a post, an ad, an email, a store listing or a deck — open
it before the artboard is sized, and again the first time a platform crops
something you thought was safe.*

Every surface here is one Wash Junkie **owns or rents but does not build** — a
profile someone else designs the chrome for, an inbox that rewrites our HTML, a
store listing reviewed by a stranger. The product's own surfaces are
[Surfaces](../11-surfaces.md); this is everything pointing at them. Two facts
govern the page. **The frame is not ours**: platforms crop, recompress and overlay
their own UI without telling anyone, so every measurement here is a proportion or
a method for re-deriving one. And **a static export cannot degrade** — the
material switches itself off under `prefers-reduced-transparency`
([Liquid Glass](../06-liquid-glass.md#degrading)); a JPEG in a feed cannot.

---

## Profiles

**The avatar is the mark, never the lock-up** — every avatar slot is square and
cropped to a circle, and 5.804 : 1 does not fit in one
([Identity system](03-identity-system.md#favicon-and-app-icon)). That crop is
looser than an app icon's mask and one number covers both: the mark's keep-clear
box is 2.920H × 1.9H, diagonal **3.4834 × H**, so it fits the inscribed circle
while H ≤ **0.287 × the side**. Use **mark height = 0.25 × the avatar side,
centred** — the app-icon number, with the clear-space box landing at 0.871 of the
circle's diameter. One asset, both slots.

Two ceilings, so they don't get confused: **0.287** is the clear-space box
against the avatar's full inscribed circle; the identity system's **0.27** is the
tighter frame — the mark's own bounding box against Android's 0.61 circle. 0.25
clears both, which is why one asset serves both slots.

**The field matters more than the mark**, because the disc sits directly on the
platform's feed background with nothing of ours between (`tokens/color.mjs`):

| Avatar field | On a white feed | On a dark feed |
|---|---|---|
| Brand teal `#2cbec5` | **2.26 ✗** | 9.28 |
| Paper `#fcfcfd` | **1.03 ✗** | 20.48 |
| Ink `#1d2022` | 16.38 | **1.28 ✗** |
| **Accent teal `#007e84`** | **4.86 ✓** | **4.32 ✓** |

Measured against the worst case at each end — pure white `#ffffff` and pure black
`#000000` — because a feed background is the platform's to change and neither
column may be assumed to be our paper or our ink.

**Accent teal is the only field that survives both**, and a white mark on it is
4.86:1 — the reversed default
([Identity system](03-identity-system.md#which-mark-on-which-field)). A brand-teal
disc with a white mark is the 2.26:1 case, on the asset beside every single thing
we post. At feed size the avatar is not a mark at all: the mark's floor is **16px
tall** ([Brand](../02-brand.md#minimum-sizes)), which at 0.25 × side needs the
avatar to render at **64px** — larger than a feed row is likely to give it.
Assume we are under the floor until someone measures otherwise, and design for
what that means: below 64px the avatar does **field recognition only**, which is
the argument for one field held forever and against a campaign tint. **TO
SPECIFY:** the rendered avatar size per platform and per surface, measured in the
same pass as the crop set below. The 64px threshold is derived; the shortfall is
assumed.

**No mark in the cover image.** The avatar already carries it, overlapping the
cover at a different offset on every platform, and two marks in one field of view
is the stutter the co-branding rules prevent
([Identity system](03-identity-system.md#co-branding-and-partner-lock-ups)). A
cover is imagery plus at most one line, composed for the intersection of the
crops — `retained width = target aspect ÷ source aspect`
([Art direction](05-art-direction.md)). **TO SPECIFY:** the per-platform crop set,
measured by uploading a numbered grid to a real profile.

---

## Post templates

Six formats, one grid, specified as **layout logic** rather than pixels because
the delivery size changes and the logic does not.

**The mark's size sets the margin.** Take a 1080px square delivered to a 390pt
phone with the feed image inset to roughly **360pt** — a **3× reduction** — so a
lock-up clearing its 18px screen floor needs **54px in the artboard — 0.05 × the
shorter frame edge**, and its clear space at `0.45 × height` is then
`0.0225 × edge`, which *is* the post's margin. The 360pt inset is an assumption,
not a measurement, and it is the only soft number in the chain: recompute when the
crop set lands. The rule is the 18px floor, not the 0.05. Then **one
message per post** — if it needs a conjunction, it needs two — and **one glass
panel at most**, because the two-tier cap ([Principles](../01-principles.md)) is a
legibility rule before a performance one and a still gives the eye no motion cue
to recover depth from.

| Format | Leads with | Message gets | Mark | Imagery & glass |
|---|---|---|---|---|
| **Announcement** | The claim, as type | ~⅔ of the frame | Lock-up, corner, at the margin | Flat field or a low aqua step. No glass — nothing to refract |
| **Feature** | A screenshot of the shipped surface | ~⅓, a caption band | Lock-up, opposite the screenshot | Screenshot as backdrop; one `veil` band for the caption |
| **Provider spotlight** | Their name, their photograph | ~¼, bottom | **Mark alone**, small — we endorse, they lead | Photograph full-bleed, one `veil` band. Their logo only with written permission, their name in the first line, and never a hint that we did the work |
| **Customer story** | One quoted sentence, set large | ~½ | Mark alone | Photograph or flat field, with a signed release for anyone in frame ([Art direction](05-art-direction.md#briefing-and-delivery)). Never a screenshot — see [below](#what-not-to-do) |
| **Hiring** | The role and the location | ~½ | Lock-up | Flat field. A hiring post is a document, not a mood |
| **Service update** | The status, in words | The whole frame | Lock-up | **No imagery, no glass, never colour alone** — colour + dot + word ([Accessibility](../12-accessibility.md)) |

---

## Glass in a static image

The material is a live `backdrop-filter`; an export is a flat approximation. Being
straight about which parts are which is the difference between an image reading as
the product and one reading as a box at 60% opacity.

| Property | Survives export? | Why |
|---|---|---|
| **Refraction** (blur) | **Yes, exactly** | Nothing moves behind a still, so a baked blur of the real backdrop is indistinguishable from a live one |
| **Saturation** | **Yes** | Applied *with* the blur, not after, or the backdrop goes to grey mush at wide radii |
| **Depth** (shadow) | **Yes** | Already static |
| **Specularity** (the rim) | **Only if drawn** | A masked gradient, brightest at the lit edge. An even 1px stroke all round is the one thing that makes an export look fake |
| The alpha floors | **No** | Derived over pure black *and* pure white so the product needs no caveat. In an export you chose the backdrop — measure the worst pixel rather than trust the tier |
| Reduced transparency, and anything backdrop-dependent | **No** | There is no `prefers-reduced-transparency` in a JPEG, so the export *is* the degraded case; and scroll transitions, `over="media"` switching and state-driven tints all collapse to the one frame you picked |

**Faking it well**, in order:

1. Blur a **copy of the real backdrop layer**, never a flat average of it — the
   average is exactly what a translucent div looks like.
2. **Scale the blur to the artboard.** The tiers are CSS px at 1× — `veil` 14,
   `pane` 24, `shell` 40 ([Liquid Glass](../06-liquid-glass.md#tiers)) — so at the
   3× feed reduction that is **42 / 72 / 120px** in a 1080 artboard. Saturation and
   alpha come off the same table.
3. Draw the rim as a gradient, **≥ 3px in a 1080 artboard**: a 1px rim is a third of
   a device pixel after the reduction, and JPEG 4:2:0 chroma subsampling eats a teal
   hairline before anything else. **Upload PNG** whenever the frame carries a rim or
   the mark — the platform re-encodes regardless, and a clean source stops the loss
   compounding.
4. Run the greyscale check on the export
   ([Accessibility](../12-accessibility.md#reviewing-a-screen)), reading the **worst
   pixel** under the type. And **never** put the lock-up on tinted glass, in an
   export as on screen ([Identity system](03-identity-system.md#misuse)).

---

## Stories and reels

The frame is 9:16 and the platform owns the top and bottom of it. As proportions,
so they survive the next redesign:

| Region | Proportion of frame height | Derivation |
|---|---|---|
| Survives a **1:1** re-share to the feed | central **56.25%** | 9 ÷ 16 |
| Survives a **4:5** re-share | central **70.3%** | 0.5625 ÷ 0.8 |
| Bottom band, absolute floor | **6.3%** | One 44pt touch target ([Space & layout](../05-space-and-layout.md#touch-targets)) at the 1080 ÷ 390pt delivery scale — a story is full-bleed, so it takes the whole 390pt device width where a feed image takes the inset 360pt. Reply field, CTA sticker and safe-area inset make it several times this in practice |

**Neither the mark nor the message goes in a platform band.** Anything
load-bearing lives in the central 56.25%, so a story is designed as a square with
atmosphere above and below it, not as a tall poster. **TO SPECIFY:** the real
chrome per platform — mask the live UI over the frame, screenshot on a device with
a notch and one without, record as a proportion of frame height, and **date the
entry**. Nothing announces that a platform has moved its chrome, so an undated
pixel value is a number with no way to tell whether it still holds.

---

## Paid media

Paid is the only surface in this guide that reaches people who never asked for
it and cannot check what it says — three of the four audiences' products do not
exist yet ([Surfaces](../11-surfaces.md)), so there is nothing for a reader to
open and verify. Every rule below follows from that.

> **The test: shrink the export until the lock-up in it measures 18px tall.** If
> the headline is unreadable there, it is too long, too small, or both. Ten
> seconds, and it settles every argument about ad copy length.

| Rule | Because |
|---|---|
| **One claim**, not one claim and a feature list | A scroll past is the default outcome, and it is one claim long. A second claim is read by nobody who did not already stop for the first |
| **The first frame is the ad** | Whatever the scroll does not stop for is the whole ad. Never open on a logo sting — the mark's one permitted motion is a single reveal along its own direction of travel ([Art direction](05-art-direction.md)) |
| **Every spoken claim also exists as type**, captions burned in | Assume sound-off, and do not trust auto-captions with "Wash House", "Wash Credit" or a seven-character Crockford base32 order reference — the reference is the *shared* vocabulary between operator, driver and customer ([Verbal identity](02-verbal-identity.md#writing-rules)), so a mangled one is worse than none |
| **Provider ads carry a number; consumer ads carry a name and a time** | The two registers, in paid ([Brand](../02-brand.md#voice)) |
| **No ⚠ proof point, and never "we'll wash your clothes"** | ⚠ marks a proof point whose surface is on the roadmap rather than shipped ([Verbal identity](02-verbal-identity.md#message-architecture)); paid reaches people who cannot check. The second is false in an ad exactly as it is false in a toast — Wash Junkie does not wash anything |
| **No status family used decoratively** | Ember means failed, Moss means done. An urgency badge in Ember teaches operators to ignore red ([Colour](../03-color.md#rules)) |

---

## Email

**Transactional.** Built, in `api/src/services/mail/templates.ts`; these
constraints are learned, not theoretical. **The logo is a hosted PNG** served by
the web app at `/wordmark.png`, rendered 34px tall by 197px wide from the
artwork's own 325.06 : 56.01 ratio, because **Gmail strips inline SVG and data
URIs** and a remote raster is the only logo format that renders everywhere. Four
live consequences: **`currentColor` is gone**, so one rendering must work on every
background a client might paint; **the file is a deployment coupling**, so
renaming or moving it breaks the logo in every email ever sent, including ones
already in inboxes; **many clients block remote images**, which is why the alt
text is styled to read as the brand rather than as a broken-image label; and **it
is a 3.25× asset** — 640 × 110 for a 197 × 34 slot — which is correct, not waste.

**Dark mode: a logo relying on a white background disappears.** The template sets
`<meta name="color-scheme" content="light only">`, a *request* several clients
ignore.

| Rule | Because |
|---|---|
| Every boundary is a **border**, never a background difference | Inversion flattens two near-whites into two near-blacks and the card edge vanishes. The template's 1px card border is what holds it |
| The logo carries **its own opaque field**, or a colour clearing 3:1 against white *and* near-black | Only accent teal `#007e84` does — 4.86 and 4.32. The avatar finding, in a different medium |
| A one-time **link** never appears in the subject or the preheader | Both surface in notification popups and travel verbatim on forward. Already enforced (`linkHero`, with the reason written into the code); keep it. The verification **code** is the deliberate exception — it is in both, because reading it from the notification without opening the mail is the point |

**Marketing** mail follows a decision we made rather than an action the recipient
took, so it needs recorded, revocable consent and a working unsubscribe — and a
transactional mail carries neither. **A transactional email never carries a
marketing message:** one promotional line in a password reset reclassifies the
whole send, which then inherits marketing's consent obligations and its complaint
rate. Treat that as a hard constraint on copy, **not as a legal opinion** — which
consent regime binds a Nigeria-first platform sending across borders has not been
through counsel, exactly as the Wash Credit wording has not
([Verbal identity](02-verbal-identity.md)). **TO SPECIFY:** whether marketing
shares the transactional sending domain. It must not — a spam complaint against a
marketing send must not be able to take password resets down with it.

---

## App store

**Icon** — the safe-zone geometry is
[Identity system](03-identity-system.md#favicon-and-app-icon) and is not
re-derived here: mark height **0.25 × the icon side**, centred, covering iOS's
superellipse, Android's 0.61 circle and PWA `maskable`'s 0.8 circle at once.
Three live checks against what actually ships.

`public/icon-512.png` is a **brand-teal rounded square with a white mark on a
white plate** — the 2.26:1 case the identity system names explicitly. Measured off
the file: the mark is **0.385 × the side tall** and its ink reaches a circle of
**0.850 × the side**, against `maskable`'s 0.80 — so a launcher mask clips it.
`src/app/manifest.ts` declares that one file for both `any` and `maskable`.
Second, the corners are **pre-rounded at ~0.18 × the side over white**, in
`icon-512`, `icon-192` and `src/app/apple-icon.png` alike; iOS applies its own
superellipse on top, and rounding twice leaves the pale halo the identity system
warns about.

> **Method**, so these can be re-measured when the icons are rebuilt: threshold
> the PNG on the white ink, discard the four corner components left outside the
> rounding, take the bounding box of the rest and the maximum radius of ink from
> the centre.

Third, the manifest's `theme_color` is brand teal, making it a **field** the OS
paints status-bar glyphs on, and white glyphs on it would be 2.26:1. Its relative
luminance is **0.414** (`tokens/color.mjs`) — mid-scale, which is exactly where
different OS versions make different choices about glyph colour. **TO SPECIFY:**
which glyph colour each OS actually picks on this value, read off a device rather
than reasoned about.

**Screenshots** — the real product, never a mock-up; a drawn console becomes the
thing everyone compares the shipped one to
([Art direction](05-art-direction.md#what-not-to-shoot)). Seeded data only, and
caption what the screen *does*, not what it is called.

| Copy surface | Formula | Constraint |
|---|---|---|
| Name | `Wash Junkie` | Nothing appended; stores truncate mid-word |
| Subtitle | The audience's one-line from the message architecture | **Blocked on [strategy #1](01-strategy.md#open-decisions)** — the positioning is a proposal |
| First two lines of the description | The paragraph — the whole claim | Stores truncate before "more"; everything after is a bonus |
| Remainder, then keywords | Three proof points, one per paragraph; then domain nouns from the [glossary](02-verbal-identity.md#domain-glossary) | No ⚠ item — the surface is not shipped — and never "laundromat" |

**TO SPECIFY:** each store's character limits, read on submission day. And
[strategy #6](01-strategy.md#open-decisions) — "junkie" in expansion markets is a
store-review question, and store review is where it surfaces.

---

## Link previews

| | |
|---|---|
| Ratio | **1.91 : 1** — the platforms' own card convention, not a Wash Junkie choice; confirm it against each scraper's current spec when the image below is produced. Compose so the essentials survive a **1:1** centre crop, which retains **52.4%** of the width |
| Mark size | Assume the smallest card you meet is **200px wide**, so 104.7px tall. The lock-up's 18px floor is **0.17 × the frame height** there; the mark's 16px floor is **0.15**. About a fifth of the card — far larger than instinct |
| Glass | **None.** A blur reads as a smudge at 105px tall. Solid panel, solid type |
| Caching | Platforms scrape once and cache. The URL is permanent, exactly like the email logo |

**There is no fallback today**: `src/app/layout.tsx` exports `title`,
`description` and `manifest` only, so a link to the console previews as bare text.
Ship **one static default image** covering every route — and **no route generates
a preview image from its own content**, because a business name, a customer name
or an order reference rendered into an OG image leaks exactly what a screenshot
leaks, to everyone in the group chat it lands in.

---

## Decks and documents

| | Pitch deck | Provider proposal | One-pager |
|---|---|---|---|
| Read | In a room, at distance | At a counter, alone | Skimmed, then filed |
| Register | Consumer type scale, operator honesty | **Operator** throughout | Operator |
| Density | One idea per slide | One section per decision | One page, no continuation |
| Numbers | Rounded in prose | Exact, tabular, from the money formatter | Exact |

**The distance rule applies to a projected slide.** Anything read beyond arm's
length uses a pairing clearing 4.5:1
([Identity system](03-identity-system.md#which-mark-on-which-field)), ruling out
the two combinations a deck reaches for first — teal type on white, and white type
on brand teal. A teal title slide takes an **ink** mark.

**Density:** the title is the idea and the body only supports it. If the title
needs a conjunction it is two slides; if it needs a table it is a document. **The
paid-media thumbnail test is the same test here** — shrink until the lock-up reads
18px, and if the point is gone, so is the back row. Type is `--wj-font-display`
for titles, Inter for body, JetBrains Mono for anything in a column
([Typography](../04-typography.md)). **TO SPECIFY:** the templates; none exist.

---

## What not to do

| Don't | Because |
|---|---|
| **Post a screenshot containing real customer data** | The console shows a customer's full name, address, phone and order history, and an order reference is the *shared* vocabulary between operator, driver and customer — a real one in a public post is a lookup key. Screenshots come from seeded data, and one gets reviewed by someone who did not take it |
| **Blur real data instead of replacing it** | Blurring is obscuring, not redaction, and the fields *around* the blur are rarely checked |
| **Forget the console re-tints per business** | A screenshot from a real tenant carries their accent ([White-label](../13-white-label.md)). It identifies them with every name in frame removed |
| **Engagement bait** — "tag a laundry owner", "comment for the link" | It buys a feed of people who will never open the console, and it is the opposite of *specific beats soothing* ([Verbal identity](02-verbal-identity.md)) |
| **Hijack an unrelated moment** — a holiday, a trend, a news story with no proof point | "Unhurried" is the first of the six *proposed* personality attributes and is not signed off ([Strategy](01-strategy.md#personality)), but the rule stands without it: a post with no proof point behind it is one more claim reaching people who cannot check it |
| **Announce an outage only on social** | Providers live in the console, which keeps working from cached data and carries its own outage copy — a provider mid-shift is not reading a feed. Social can only ever mirror the canonical notice; it is never the notice. **No canonical outage surface exists yet** — see [9](#open-decisions-and-to-specify) |
| **Post an unshipped surface as if it ships**, or re-tint the avatar for a campaign | Customer App, Driver App and Agent Console are planned ([Surfaces](../11-surfaces.md)); and below 64px the avatar's field *is* the identification, so changing it is changing the logo |
| **Use a provider's logo without written permission** | Theirs, not ours. A spotlight is not a licence |

---

## Open decisions and TO SPECIFY

| | Item | Method / blocked on |
|---|---|---|
| 1 | **`public/icon-512.png` is a white mark on brand teal at 0.385 × the side** — ink reaching a 0.850 circle — and is declared `maskable`. `icon-192` and `apple-icon.png` match it, and all three carry pre-rounded corners over white | Rebuild at 0.25 × side on an approved field ([Identity system](03-identity-system.md#favicon-and-app-icon)); re-check the ink circle against `maskable`'s 0.8; ship full-bleed with square corners so iOS rounds once |
| 2 | **No Open Graph image or metadata exists** | Produce one static default; add `openGraph` to `src/app/layout.tsx` |
| 3 | **Per-platform cover, story and reel chrome** | Mask the live UI, record as proportions of frame height, re-measure each season |
| 4 | **Store character limits and listing copy** | Blocked on [strategy #1](01-strategy.md#open-decisions); limits read on submission day |
| 5 | **Marketing sending domain** | Must be separate from transactional. Owner's call, then DNS |
| 6 | **Deck, proposal and one-pager templates** | None exist as files |
| 7 | **The email template hard-codes hexes** (`#157d82`, `#14767b`, `#e6f7f8`) that near-miss `--wj-aqua-9` `#007e84` and `--wj-aqua-2` `#eefafa` | Contrast is fine — 4.90 and 5.37 — the rule is not. Read them from `tokens/dist/wj-tokens.ts` `resolve()` at build time ([Colour](../03-color.md#rules)) |
| 8 | **`wordmark.png` and `mark.png` ship with an opaque white plate** (zero transparent pixels) | Right for the email's white card, wrong anywhere a dark surface is possible. Decide whether a plate-free second asset is worth keeping in sync |
| 9 | **There is no canonical outage surface** — no status page, and the console's own outage copy is the only notice a provider sees | Owner's call: a status page, an in-console banner promoted to the canonical notice, or both. Until it exists, the "never announce an outage only on social" rule has nothing to point at |
| 10 | **The rendered avatar size per platform and per surface** | Unmeasured. The 64px threshold is derived from the mark's 16px floor at 0.25 × side; whether any feed reaches it is not. Measure with the crop set (3) |

---

Related: [Brand](../02-brand.md) · [Colour](../03-color.md) ·
[Liquid Glass](../06-liquid-glass.md) · [Surfaces](../11-surfaces.md) ·
[Strategy](01-strategy.md) · [Verbal identity](02-verbal-identity.md) ·
[Identity system](03-identity-system.md) · [Art direction](05-art-direction.md) ·
[Physical applications](06-physical-applications.md) ·
[Usage & legal](08-usage-and-legal.md).
