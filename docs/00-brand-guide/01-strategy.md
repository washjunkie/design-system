# Brand strategy

*For the founder and anyone briefing an agency, naming a surface, or writing a
line of customer-facing copy — open it before the decision, not after the design.*

Facts here come from the vault and from
[`docs/01`–`docs/15`](../01-principles.md). Everything else — positioning,
promise, personality, architecture — is a **proposal**, marked as one, and listed
in [Open decisions](#open-decisions) with what a signature would change.

Two sections are marked **ASSUMPTION** rather than proposal. A proposal needs a
signature; an assumption needs evidence, and there is none yet. No provider has
been interviewed and no competitive research has been commissioned, so this
document names no competitor, quotes no market figure, and makes no claim about
how Nigerian customers behave. Where it describes the world it is describing what
the product's own data and roadmap imply, and it says so.

---

## What Wash Junkie is

A multi-surface platform connecting laundry **service providers** with
**customers**, with **drivers** moving orders between them and **field agents**
onboarding providers. One shared API, one front-end per audience.

The domain is the product: `Business` → `Outlet` → `WashHouse` → `Machine`, plus
`Order`, `Customer`, `Driver`, `Staff`, `Catalog Item` — the API's own names, and
code identifiers rather than copy ([Verbal identity](02-verbal-identity.md#naming)).
An outlet is the shopfront; a **Wash House** is where the work happens. Modelling
those as two different things —
one customer-facing, one production — is most of why this exists; a system built
around a shop and a till has nowhere to put the second one.

## What Wash Junkie is not

**Wash Junkie does not wash anything.** It is the platform under the people who
do — the sharpest fact about this brand, and nearly every rule below is a
consequence of it.

| We are not | Because | So we never |
|---|---|---|
| A laundry | We own no machine, no water bill, no ruined shirt | Say "we washed", "our Wash House", "our team collected". The provider did |
| A delivery company | Drivers move orders; movement is one leg of a job, not the job | Sell speed as the headline. Turnaround is the provider's promise to make, not ours to make on their behalf |
| A directory | Providers run their whole operation here, not just their listing | Frame the console as "your profile". It is where the shop is run |
| A retail POS | The unit of work is a job passing through stages over days, not a basket at a till | Borrow retail vocabulary — baskets, checkouts, SKUs — into operator surfaces |

The commercial consequence, stated plainly: **we promise the record, never the
result.** A damaged garment is between the customer and the provider, and the
brand must never have implied otherwise. What we can promise is that the order
existed, the price was agreed, the driver collected at the time shown, and none
of it is deniable.

> **Needs a decision:** where liability actually sits between platform, provider
> and customer is a legal question, not a brand one. This line is the brand
> position; it must be checked against the provider and customer terms before it
> appears in customer-facing copy, and the two must say the same thing. The
> related mark rule is already written down —
> [Usage & legal](08-usage-and-legal.md).

---

## Positioning

> **PROPOSAL — needs sign-off.** Two statements, because the product faces two
> ways and one sentence cannot carry both without going vague.

**To providers.** For a laundry owner running the business on an exercise book, a
phone, and their own memory, Wash Junkie is the system the whole shop runs on:
intake, the Wash House floor, drivers, customers, and money in one place. Unlike a
general-purpose POS it knows what a wash cycle is, and unlike WhatsApp it does not
lose the order when the chat scrolls.

**To customers.** For people who send their laundry out, Wash Junkie is the one
place every order lives, whichever provider is doing the washing. Unlike calling
the shop, you can see where your clothes are.

## Brand promise

> **PROPOSAL — needs sign-off.**

**Nothing gets lost.**

It reads in both registers. To the provider: no order, no item, and no naira
falls out of the system. To the customer: my clothes come back. And it is a
promise we can keep, because it is about the record rather than the washing.

Test headlines against it. A line that would still be true of a rival losing one
order a week is not on-brand.

## Personality

> **PROPOSAL — needs sign-off.** Six attributes. An attribute with no
> behavioural consequence is decoration, so each carries a DO and a DON'T.

### 1 · Unhurried

- **DO** state the number and stop; the console is an eight-hour surface and the
  reader is mid-shift. "38 orders in wash." "Pickup moved to 2pm."
- **DON'T** manufacture urgency — no countdowns, no red badges on things that are
  not wrong, no exclamation marks in the console. Red means destructive or
  failed, and a red "Export" teaches operators to ignore red
  ([Colour](../03-color.md)).

### 2 · Legible before it is beautiful

- **DO** carry every status as colour **and** a dot **and** a word. Roughly 8% of
  men have a colour vision deficiency, and the driver app's normal operating
  condition is direct sunlight.
- **DON'T** put a white mark on a brand-teal field. It measures **2.26:1**, under
  the 3:1 non-text floor, and it governs every painted, printed, or stitched
  application. See [Identity system](03-identity-system.md).

### 3 · Deferential to the provider

Their customers are theirs. We are plumbing, and plumbing that shouts is a fault.

- **DO** let a business re-tint its console to its own hue, and show its logo,
  name, and photography to its customers.
- **DON'T** re-tint our mark to their accent. *The accent is the tenant's; the
  mark is ours* ([White-label](../13-white-label.md)) — the mark is how someone
  knows which product they are in, and it is the only thing in a support
  screenshot that identifies the platform.

### 4 · Built for the shop floor

- **DO** design for one free hand, a moving vehicle, bright sun, and patchy
  signal. Every screen reads from cache; every write queues.
- **DON'T** ship a flow that needs a good connection, a second device, or a
  desk. If it only works in the office, it does not work.

### 5 · Locally specific, not locally trapped

Nigeria-first is a fact: prices in ₦, seeded outlets in Ikeja, Lekki, and Yaba.
The globalisation work is also already done — a seeded Country → State → City
dataset and multi-currency — so a second country is near-term, not fantasy.

- **DO** use real places and real amounts, formatted by the platform's money
  formatter.
- **DON'T** hard-code `₦`, and don't reach for pan-African visual shorthand as a
  substitute for being specific. A photograph of a named Lagos street is
  specific; a pattern is a shortcut.

### 6 · Honest about money

Wash Credit is a prepaid platform balance, 1 WC = ₦1. Usage draws it down;
hitting zero pauses online order intake. That is a circuit breaker on someone's
livelihood, so it gets warned about like one.

- **DO** state the balance in days of cover, the way a person thinks about it.
  "Balance covers about 3 more days."
- **DON'T** dark-pattern the top-up, hide the drawdown, or let the first warning
  arrive at zero.

## The four audiences

In the order the product was built for them.

| Audience | Where they meet us | What they must believe | What breaks the belief |
|---|---|---|---|
| **Service providers** — owners, managers, staff | Service Provider Console, 8 hours a day. The paying customer | "This is my shop, and I can see all of it" | Hidden state; a screen that fails without signal; a change we made to their pricing |
| **Customers** | Customer App (mobile + web) | "Someone is keeping track, and I can check" | Silence between stages; an app that feels like a different app between two orders |
| **Drivers** | Driver App, on a phone, outdoors, one free hand | "It will tell me the one thing to do next" | A screen with three equal buttons; anything that needs two hands or a good connection |
| **Field agents** | Agent Console, often on a tablet in a shop | "I can finish this registration here, now, with this owner watching" | A long form that loses itself; chrome tinted to whichever business they opened last |

Three of the four are also people a stranger can mistake *for* Wash Junkie, and
only the agent actually is: a driver belongs to the provider, a provider owns
themselves, and the agent is ours. Who may act as the company in front of any of
them — at a counter, on a call, on a stand — is [09 · Brand
representation](09-brand-representation.md).

### The provider, specifically

> **ASSUMPTION — not research.** The picture below is a working hypothesis
> assembled from the product's own shape (three seeded Lagos outlets;
> configurable per-business order channels), not from provider interviews.
> Nobody has sat in one of these shops with a notebook. Treat it as the thing to
> validate first, and correct it here when someone has. Open decision #10.

Picture the owner of a laundry with outlets in Ikeja, Lekki, and Yaba — the shape
of the seed data. Orders arrive across several channels at once — walk-in, phone
and chat apps are the examples the product's own channel config ships with — and
the record is whatever the shop already keeps. Assume the current system works.
That is the problem. What we are assuming they are afraid of:

| The fear | Said out loud as | What must be true |
|---|---|---|
| Losing control | "At least with the book I can see everything" | The board shows the whole day at once. Detail opens as a sheet, not a route, so they never lose their place ([Surfaces](../11-surfaces.md)) |
| Losing their customers' trust | "My customers know me, not an app" | Their name and logo on the order. Business accent never reaches customer-facing surfaces, and their identity there is logo, name, and photography |
| Staff who can't cope | "My people are not computer people" | Dense but calm operator surfaces, status as word plus dot plus colour, and never a line of technical text shown to a person |
| Losing the shop to a bad network | "What happens when the internet goes?" | Cache-first reads and queued writes, everywhere. The console is local-first today, not aspirationally |
| A bill that arrives as a surprise | "What is this going to cost me?" | Wash Credit stated in days of cover, warned early, and never a silent pause |

Note the ordering. Cheaper is not on that list, and should not lead the pitch.

## The competitive frame

> **ASSUMPTION — not a market study.** No competitive research has been
> commissioned, so this names no vendor and cites no share. The claim being made
> is a shape, not a finding: that the thing to beat is **the way it works now**
> rather than a rival platform. It is the frame the brand is being built on, so
> it is the second thing to validate. Open decision #10.

Four alternatives, each of which a provider is already using and none of which is
software we would be replacing:

| The real alternative | Why it wins today | Where it breaks | What that means for us |
|---|---|---|---|
| **The exercise book** | Free, trusted, visible, needs no training, works when the power is out | One book, one place. Cannot tell you last month's revenue by outlet, or which regular has stopped coming | Never mock it. Match its virtues first — visible, offline, no ceremony between opening the app and seeing today |
| **Chat-app order intake** — WhatsApp is the one the product's own channel examples name | The customer already has the app and already uses it | The order lives in a chat that scrolls. No price list, no status, no record to settle a dispute | Capture it rather than fight it. Order channels are per-business and configurable, so a chat app can be a named channel inside the product rather than something we ask anyone to abandon |
| **A generic retail POS** | Real software, real receipts, real reporting | Models a shop selling stock, not a job moving through stages over days. No Wash House floor, no driver leg, no per-garment tracking | The differentiator is domain fit, not feature count. Say *what it knows*, not *how much it does* |
| **Informal arrangements** — the driver who is a friend's nephew, the price agreed on the phone, the discount nobody wrote down | Flexible, personal, and it is how the relationship actually works | Does not survive growth or staff turnover. Every dispute is one person's word | Do not sell surveillance. Sell a record that ends arguments |

If that frame holds, the consequence is: **the switching cost here is trust, not
money.** Nothing is being ripped out — a record that already works is being asked
to move — so a first-run screen that assumes prior software experience is a
positioning failure, not a UX one.

---

## Brand architecture and the multi-vertical problem

Roadmap Phase 5 extends the customer experience beyond laundry to **home
cleaning** and **car wash**, reusing the same order, fulfilment, and driver
spine. The name says "wash". Decide this before the first physical asset is
produced — livery, signage, and app icons are the expensive things to redo.

### Does "wash" stretch?

| Vertical | Does the name carry it? | Verdict |
|---|---|---|
| Laundry | Native | No strain |
| Car wash | Literally the words "car wash" | No strain. Arguably a gift |
| Home cleaning | You *clean* a home. You do not wash it | Real strain. Every home-cleaning headline would be written around the name |

**The mark stretches; the name is what strains.** The mark is a droplet-and-swoosh
reading as water in motion, not a washing machine, a shirt, or a hanger. It
carries all three verticals without a redraw. That is a real asset, worth
protecting.

**Home cleaning may not fit the spine either.** Car wash maps cleanly: an outlet
is a bay, the vehicle arrives, the work happens on site. Home cleaning has no
Wash House, no machine, and arguably no driver leg — the work happens at the
customer's address. If Phase 5 finds it needs a different fulfilment model, a
different brand for it stops being a cost and becomes a fit. **Answer that
product question before the naming one.**

### The options

| | Shape | Works because | Costs |
|---|---|---|---|
| **A · Masterbrand stretch** | One name, one mark, three verticals. The vertical appears as a descriptor in type, never in artwork | One brand to build and defend. The mark already covers all three. **ASSUMPTION, unverified:** *"one app to install, cross-sell is free"* — that holds only if all three verticals share one customer app, which nobody has decided | "Wash" would be inaccurate for home cleaning — a tax this decision **declines to incur**, by scoping to laundry and car wash |
| **B · Endorsed sub-brands** | Distinct names per vertical, each endorsed *by Wash Junkie* | Each vertical gets a name that fits it. The endorsement carries the trust across | It multiplies the **measurement set**, not the artwork: two feature ratios, eight process floors, keep-clear arithmetic, spot/thread/vinyl matches, a stitch file and a cut file — per name, and the first set is not finished once. It also leaves the endorsement with **almost no physical surface to sit on**, since [the artefact grant](03-identity-system.md#the-artefact-grant--decided) already refuses the driver, the bag face and the cab doors |
| **C · Category-neutral parent** | A new parent name; Wash Junkie becomes the laundry vertical beneath it | Honest and extends indefinitely | The most expensive option, and it discards equity already built. Renames the platform, the app-store listings, the console chrome, and probably the domain vocabulary — which is an API migration, not a design exercise |

### Recommendation

> **DECIDED 2026-07-31 — option A, scoped.** **Laundry and car wash run on the
> masterbrand.** Home cleaning is *not* decided here; it is decided with
> [#7](#open-decisions), and the naming question waits on the product one.

Stretch the masterbrand through car wash, which the name fits literally. Nothing
about home cleaning is settled by this, and the row below says so.

**The honest reason the exits stay open is not the guards.** They are open
because **nothing physical has been produced**, **no app-store listing exists**,
and **Wash Credit has no ledger** — all three verified. That is worth stating
plainly, because "we are keeping our options open" is the kind of claim a company
believes long after it has stopped being true.

So the exits are protected by **tripwires, not by good intentions**. Each is
currently unbuilt, each is individually checkable, and after any one of them the
architecture must be **re-taken rather than inherited**:

| Tripwire | Why it closes the exit |
|---|---|
| The **first app-store submission** | A listing identity is the single most-cited irreversibility in any rename |
| The **first physical production run** | You cannot un-print 4,000 bags or un-wrap a fleet ([06](06-physical-applications.md)) |
| The **Wash Credit ledger and top-up rail** going live | Renaming money mid-flight is the worst class of rename — see the correction below |

### What the three rules actually protect

They were offered as protecting the exit to option C. Two of them do not.

| Rule | What it really defends |
|---|---|
| **1 · Nothing laundry-specific in a permanent asset** — no washing machine, shirt or hanger in the favicon, app icon, livery or embroidered mark. Water in motion, nothing narrower | A **vertical** change, not a name change. The mark was never at risk from a rename — this chapter already says it carries all three verticals without a redraw |
| **2 · Vertical signalling lives in type, never artwork** | A **vertical** change. And note this is exactly the substrate an endorsed sub-brand needs, so these two keep **B** cheap as much as C |
| **3 · Platform noun and vertical noun stay separate in copy** — never fused into a compound | The only one of the three that genuinely reduces **C**'s cost |

**Rule 2 is already being violated in three places nobody audits**, so it is a
rule with an owner or it is not a rule: `web/src/app/manifest.ts` and
`web/src/app/layout.tsx` both ship *"Run your laundry business, end-to-end"*, and
`api/src/services/order-notifications.service.ts` falls back to **`"your
laundry"`** in the customer-facing SMS. **Owner: Samuel Ogu**; forced by the
first car-wash surface, which is the day those strings become wrong rather than
merely narrow.

### What actually keeps the exit affordable

Four more, each costing nothing today, each aimed at a cost the first three miss.

**4 · The feature-ratio measurement is now a script — `tokens/geometry.mjs`,
committed 2026-07-31.** Option C destroys the **wordmark** — drawn artwork, 14
filled paths, no font produces it — and [03's two measured
ratios](03-identity-system.md#the-geometry-that-governs-reproduction) are taken
off *that specific artwork*. Every physical minimum in 03, every height in [06's
distance table](06-physical-applications.md#height-by-viewing-distance), and
every lock-up floor in [10's catalogue](10-merchandise.md#the-catalogue) divides
by them, and until now nothing reproduced them: a redraw would have invalidated
the measured spine of the whole physical guide silently, because a stale ratio
still looks like a number.

    node tokens/geometry.mjs --check

It rasterises the artwork and diffs the result against 03's table, exiting
non-zero on drift. It confirms the committed figures to ±0.003 — a redraw
detector, not a third-decimal authority, and 03 records why. **Run it on any
artwork change**, which is precisely the change option C forces.

**5 · Reconcile the durability rule.** [06](06-physical-applications.md) and
[10](10-merchandise.md) both say *nothing durable carries a phone number — put
the URL on it instead*, and the receipt already prints `washjunkie.com/{slug}`.
That instructs putting the platform **domain** on every durable object, which is
the opposite of keeping a rename cheap. Amended: **no permanent asset carries the
platform name or domain — the mark alone on durables**; the URL belongs only on
artefacts cheap to reprint.

**6 · The `wj-` namespace is permanently out of scope of any rename.** So are the
`washjunkie/` Cloudinary folder paths persisted into `order_photos.url`, the
Postgres role and database, and the PM2 process names. None is user-facing.
Written down now, this keeps roughly 2,600 internal references from being dragged
into a job by somebody being thorough.

### Two corrections to this chapter's own cost figures

**Wash Credit is not currently the most expensive rename.** It is ~27 string
sites with **no ledger, no gateway and no charging** behind it — today a
find-and-replace. It becomes the worst class of rename **at the ledger and
top-up rail**, which is why that is a tripwire above rather than a present cost.

**`WashHouse` and `Machine` are not option C's cost.** They are *laundry domain
nouns*, not brand nouns: under C, Wash Junkie becomes the laundry vertical and
`WashHouse` stays correct. Their real rename trigger is generalising the spine to
car wash or home cleaning — which **option A incurs too**. Roughly two thirds of
the domain-migration cost this chapter charged to C belongs to a different
decision.

Related, and worth knowing before anyone assumes the data model is waiting: the
platform has **no vertical discriminator at all**. `businessTypeId` is a single
FK whose seeded values are laundry business models, so Phase 5 needs a schema
change under A, B and C alike.

### When B becomes correct

Stated so it is recognisable rather than a judgement call:

> **B becomes correct on the day home cleaning is planned to ship as its own
> app-store listing rather than a section inside the Customer App.**

That is a product decision, it is binary, it is made by someone who is not the
brand owner, and it lands before any physical asset. Note that rules 1 and 2
above keep B cheap as well as C, so this reopening is not expensive — which is
the point of writing it down.

### Two things to check, not to redesign around

**The word "junkie."** It reads as playful obsessive, which is the intent. The
word also carries a drug sense in English, so it may read that way in a second
market, in an app-store review, or in a procurement process — nobody has checked
which, and this document is not the place to guess. **TO SPECIFY:** run the
check per market against the actual store policy text and any local naming rules
before the first market entry, and record the outcome here. Not a reason to
change anything today.

**"Wash Credit" is the vocabulary most expensive to rename** — it is money, it is
user-facing, and renaming money mid-flight is the worst class of rename. Budget
for it explicitly if option C is ever taken. 1 WC = ₦1 either way.

## Provider vs customer: one brand, two relationships

The brand shows up differently to the two because the *relationship* differs, not
because the styling does. [Two registers](../01-principles.md) is that difference
made mechanical.

| | Provider | Customer |
|---|---|---|
| We are their… | Infrastructure | Guarantee |
| They should feel | In control of their own shop | That someone is keeping track |
| Whose name is loudest | Theirs | Theirs on the order; ours on the app |
| Register | `operator` — 15px body, 8px radius, 38px rows, motion 0.85× | `consumer` — 17px body, 14px radius, 56px rows, full motion |
| Business accent | Re-tints the console to their hue | Never applies |
| Voice | Precise, calm, unhurried | Warm, plain, reassuring |
| The failure mode | A console that is exciting | An app that is merely efficient |

**The accent stops at the console door.** The reasoning — one app, several
businesses, an identity that must not change between two orders — is
[White-label](../13-white-label.md), which is the rule's home. It is a brand
decision rather than a styling default, and the Customer App is not built yet
([Surfaces](../11-surfaces.md)), so it is a decision to hold rather than one
already held for us by the code.

When a new surface's register is unclear, the question is not "does this look like
a dashboard". It is **who owns the relationship on this screen.** The other two
surfaces follow the same logic:

- **Driver App** — `consumer` register, but the brand's job is to be out of the
  way. One action per screen, glass capped at one tier, status word-first on the
  assumption the colour is unreadable. The brand shows up as reliability, not
  warmth.
- **Agent Console** — `operator` register, permanently neutral chrome. An agent
  works across many businesses; tinting to whichever one they last opened would
  be actively confusing and would imply an allegiance they do not have
  ([Surfaces](../11-surfaces.md)).

## Open decisions

Nothing below is settled. The right-hand column is why each cannot be deferred
indefinitely.

| # | Decision | Options | What it changes downstream |
|---|---|---|---|
| 1 | **Positioning statements** | Adopt as proposed · rewrite | Every headline, the app-store description, the sales script, the first-run screens |
| 2 | **Brand promise** | "Nothing gets lost" · alternative | The one line on the homepage, and the standard support is held to |
| 3 | **The six personality attributes** | Adopt · trim · replace | Copy review criteria, tone of every notification, what an agency is briefed against |
| 4 | **Brand architecture — home cleaning only.** Laundry and car wash are **decided 2026-07-31: masterbrand** ([recommendation](#recommendation)). This row is what is left | Reopens with **#7**. The countable event: a home-cleaning fulfilment model that does not use the order/driver spine — or, for B specifically, the day home cleaning is planned as its own app-store listing rather than a section inside the Customer App | The name, the app icon, livery, app-store listings, and possibly the domain vocabulary (`WashHouse`, `Machine`, Wash Credit). **Decide before the first physical asset is produced** |
| 5 | **Category descriptor in the lock-up** — **the top pre-production blocker, owner: Samuel Ogu.** With #4 scoped-decided, this is the only thing between *architecture settled* and a first physical asset: nobody can print a lock-up nobody has specified. [03](03-identity-system.md) owns the geometry, including whether a descriptor sits inside or outside the clear-space box — it is only cheap to change while it is a detached typeset element outside it | None · descriptor line · vertical wordmarks | The identity-system spec and every physical application. Blocked on #4 |
| 6 | **The word "junkie" in expansion markets** | Keep everywhere · check market by market | Naming in a second country, app-store category review. A check, not a redesign |
| 7 | **Home cleaning's fulfilment shape** | Same order/driver spine · separate model | Whether option B becomes a fit rather than a cost. Product decision, brand consequence. Should be answered **before** #4 is finalised |
| 8 | ~~Co-branding on the provider's own artefacts~~ | **Closed 2026-07-31 — per artefact, on written request, never automatic.** | Full record: [03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided). The option set was mis-shaped: this row named three objects (receipt, bag, shopfront) while [03's co-branding table](03-identity-system.md#co-branding-and-partner-lock-ups) placed five in the same class, and one answer across all of them is what produced the ambiguity. The answer is the standing test applied per artefact |
| 9 | **The customer-facing noun for a Business** | "Provider" · "laundry" · "shop" · the business's own name only | Every line of customer copy. "Provider" is internal domain language, and whether a customer would use it is itself unverified |
| 10 | **Validate the provider picture and the competitive frame** | Commission provider interviews · ship and learn · adopt as assumption | The two assumption blocks above are load-bearing: positioning (#1), the fear ordering, "the switching cost is trust", and the art-direction rules that already cite this page. If the picture is wrong, the brand is wrong in the same direction. Cheapest to check while nothing physical has been produced |
| 11 | **Whether a mascot or character exists at all** | Have one · never · defer | The illustration set only, and the marks are unaffected either way. [Art direction](05-art-direction.md#illustration) is holding the line in the meantime — illustrations carry no faces, because a stroked character with a face is a mascot, and that is a brand decision rather than a drawing one |

---

Related: [Brand](../02-brand.md) (marks and voice as specified) ·
[Identity system](03-identity-system.md) (reproduction) ·
[Surfaces](../11-surfaces.md) · [White-label](../13-white-label.md).
