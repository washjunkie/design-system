# Verbal identity

*For anyone whose words ship — product strings, push, email, support macros, a
landing page. Open it before you write, and whenever two surfaces disagree about
what to call the same thing.*

[Brand](../02-brand.md) sets the voice split — operator versus consumer — and the
rule that no technical text reaches a person. This document is everything after
that: how tone moves by situation, what each audience hears first, what things
are called, and the rules that stop four surfaces drifting into four dialects.

---

## Voice: four things that are always true

Voice does not change. Tone does. A sentence that breaks one of these is the
wrong sentence regardless of surface.

| Principle | What it means | The test |
|---|---|---|
| **Say the thing, then say what happens next** | Every message has a subject and a consequence. A message that only names a state leaves the reader guessing at the action. | Delete the first clause. Does the reader still know what to do? Then the first clause was decoration. |
| **The system takes the blame it earns** | Our fault → "we". Their input → the correction, not an accusation. Nobody's fault → name the condition. | Read it aloud to the person it is about. Does it blame them for something they did not do? |
| **Specific beats soothing** | A name, a number, a time. "Tunde's picking up between 2 and 4" reassures; "your order is being processed" does not. | Count the facts in the sentence. Fewer than one is filler. |
| **Never technical** | Platform rule, not a style preference. No status codes, no `null`, no stack traces, no "an error occurred". | Would this mean anything to someone who has never seen a terminal? |

Two corollaries that keep coming up:

- **We never claim to wash anything.** Wash Junkie is the platform; the provider
  does the work. "We'll collect your laundry" is false; "Tunde's picking up" is
  true. A factual constraint, not modesty.
- **Wash Credit is never described as money.** See the
  [glossary](#domain-glossary). The wording is load-bearing: three invariants —
  never cash-refundable or withdrawable, never transferable between businesses
  or users, redeemable only against Wash Junkie's own services — are what keep
  it a closed-loop contract liability rather than stored value. That analysis is
  **Nigeria/CBN-specific and has not been through counsel**; treat it as a hard
  constraint on copy, not as a legal opinion.

---

## Tone matrix

Rows are situations, columns are audiences, and the cells are actual sentences,
because "be empathetic" is not a specification. Split in two for width; it is one
matrix. Customer App, Driver App and Agent Console are **planned** surfaces
([Surfaces](../11-surfaces.md)) — target register, not shipped strings.

### Service provider · Customer

| Situation | Service Provider Console (operator) | Customer App (consumer) |
|---|---|---|
| **Onboarding** | Add your first outlet. The Wash House comes next, and this outlet can be one. | Pick a laundry near you, say when to collect, and we'll take it from there. |
| **Routine confirmation** | Order #4KP7T2M moved to Washing. | Your laundry's in the wash. |
| **Money** | ₦8,400 recorded against order #4KP7T2M. Nothing left to pay. | ₦8,400 paid to Fresh Fold. Your receipt is on the order. |
| **An error we caused** | We couldn't save that status change. It's queued and goes through when we're back — nothing you typed is lost. | That didn't go through on our side. Your order is saved and you weren't charged. Try again in a minute. |
| **An error they caused** | Order #4KP7T2M already has a delivery driver. Unassign Tunde first, then pick someone else. | We couldn't find that address. Choose your city and we'll narrow it down. |
| **An outage** | Wash Junkie is hard to reach right now. The console is working from your last synced data; new work queues and sends itself. | We're having trouble reaching Wash Junkie. Your order is safe — it'll show as soon as we're back. |
| **A delay** | Pickup for order #4KP7T2M moved to 2pm. The customer hasn't been told yet. | Pickup moved to between 3 and 5. Same driver, same day. |
| **A refund** | Refund ₦8,400 to Amaka Obi? She sees it on her order straight away, and it comes off today's revenue. | Fresh Fold has refunded ₦8,400, sent back the way you paid. |
| **Low Wash Credit** | Wash Credit is at 2,100 — about three days at this week's rate. Online order intake pauses at zero. | **Never.** A customer must never hold or be shown Wash Credit — it is held per business and is never transferable, which is one of the three invariants keeping it out of stored-value territory. |
| **A driver running late** | Tunde is 20 minutes behind on order #4KP7T2M. Two later pickups are affected. | Tunde's about 20 minutes away. He'll call when he's outside. |

### Driver · Field agent

| Situation | Driver App (one action per screen) | Agent Console (operator) |
|---|---|---|
| **Onboarding** | Two pickups waiting. Tap the first one to start. | Register a business step by step. It saves as you go, so you can finish on the shop's wifi tomorrow. |
| **Routine confirmation** | Picked up. Next: 14 Adeola Odeku. | Fresh Fold is registered. The owner gets a sign-in link by email. |
| **Money** | ₦3,200 earned today. | **Never.** An agent never handles a provider's money — funding is owner-only, in the provider's own console. |
| **An error we caused** | That didn't send. It's saved on your phone and goes when you have signal. | That didn't save to Wash Junkie. It's on this device and goes up when you're back on signal. |
| **An error they caused** | Add the bag count before you mark this picked up. | This email already runs a business on Wash Junkie. Ask the owner to add you to it instead. |
| **An outage** | No signal. Everything you do is saved and sends itself later. | Keep going. Nothing you enter will be lost. |
| **A delay** | Running behind? Tell the outlet. *(one button, no typing)* | — |
| **A refund** | — Refunds need `orders:refund`, a console permission. A driver never sees one. | — |
| **Low Wash Credit** | — Drivers are paid in naira, never in credit. | Fresh Fold's Wash Credit is low. Only the owner can fund it — point them at Billing & usage. |
| **A driver running late** | You're 20 minutes behind. The outlet and the customer have been told. | — |

Three deliberate moves: the **driver is told the comms already happened** (a
driver holding a bag in the rain will not make the call); the **operator is told
who else knows** (their next action is usually a phone call the message either
saves or causes); and **empty cells carry their reason** — "not applicable" is
information, a blank is an oversight.

---

## Message architecture

> **Proposal.** None of these lines are signed off. Anything marked ⚠ is on the
> roadmap, not shipped, and must not appear in market copy until it is.

| | Service providers *(the paying customer)* | Customers ⚠ |
|---|---|---|
| **One line** | Run the whole laundry business from one screen, including the hours the network is down. | Know where your clothes are. |
| **Paragraph** | Intake, the Wash House floor, drivers, customers, pricing and the money — one console, one login, one set of numbers. It keeps working when the power or the network doesn't, and syncs itself when they come back. | Send your laundry to a provider you choose, watch it move, and get it back when they said. No phone calls to find out what stage it's at. |
| **Proof 1** | **Offline-first, not offline-tolerant.** Every screen reads from cache and every write queues, so a power cut is an inconvenience rather than a stopped shop. | **The status you see is the status they work in** — the same record the shop just changed, not a customer view updated later. |
| **Proof 2** | **One system end to end.** Walk-in intake, Wash House floor, driver assignment, catalogue pricing and reports are the same records, not four tools reconciled by hand. | ⚠ **One account, every provider.** One identity keyed on email, so the same person is one record however they arrive — Google, an emailed link, or a password if they want one. |
| **Proof 3** | **Access that matches how a business runs.** Roles are per business and editable, membership is per outlet — a cashier at Lekki is not automatically a cashier at Ikeja. | ⚠ **The provider is named, not hidden.** You chose a business; the app shows whose hands your clothes are in. |

| | Drivers ⚠ | Field agents ⚠ |
|---|---|---|
| **One line** | One screen, one job, one tap. | Get a laundry business live before you leave the shop. |
| **Paragraph** | Your next stop, big enough to read in the sun and reachable with one thumb. It works with no signal, and it tells the shop and the customer for you. | A registration flow you can run on a tablet on a counter — it autosaves, it resumes, and it hands the owner a working account rather than a promise of one. |
| **Proof 1** | **Built for the actual conditions.** 48px minimum targets, bottom half of the screen, status shown as a word first so it survives sunlight and colour vision deficiency. See [Accessibility](../12-accessibility.md). | **Resumable by design.** One column, visible progress, autosave — a shop that gets busy mid-registration doesn't cost you the visit. |
| **Proof 2** | **No signal is a normal state, not an error.** Every screen reads from cache; every write queues. | **The owner doesn't have to invent anything to get in.** The account is claimed with Google sign-in or an emailed link — a password is optional, set later if they want one. Phone sign-in was deliberately removed. |
| **Proof 3** | ⚠ **The talking is done for you.** Status changes notify the outlet and the customer, so nobody phones a moving vehicle. | **The business owns its data from minute one.** Neutral console chrome, because an agent works across many businesses in a day. |

---

## Tagline territory

> **Proposal — nothing here is decided.** The multi-vertical roadmap (home
> cleaning, car wash) is the constraint that kills most candidates, so it is
> scored explicitly.

| Direction | The claim | Lands with | Why it might fail |
|---|---|---|---|
| **Operational span** — *"from the console to the kerb"* | We cover the whole chain, back office to doorstep. | Providers, investors | Already the design system's line ([README](../../README.md)); it is a systems boast, and a consumer does not know what a console is. |
| **We don't wash** | Wash Junkie runs the business behind the wash. | Providers | Precise, true and differentiating — and meaningless to a customer choosing where to send a shirt. B2B only. |
| **Everything laundry** | One place to organise every laundry thing. | Customers | Straight from the roadmap's own words for the Customer App ("organise and manage everything laundry"). Welds the brand to laundry on the same roadmap that plans a car wash vertical — phase 5, no date set. |
| **Visibility** — *"know where your clothes are"* | The anxiety is not-knowing; we remove it. | Customers, and providers selling to customers | Consumer-only. Says nothing about running a business, and generalises to car wash awkwardly. |
| **Wash as a verb we own** | "Wash" stretches — laundry, car, home. | Everyone, eventually | The most future-proof and the least concrete. Risks being a positioning statement nobody outside the company can decode. |

Three bars are not open even though the line is: **it survives the vertical
expansion** (a tagline containing "laundry" has a known expiry date); **it works
in both registers** (if it cannot sit above a dense operator table *and* on a
consumer splash, it is a campaign line); **it is provable in one sentence**.

---

## Naming

> **Proposed convention, not a signed-off one.** The object names below are
> facts — they are the API's — but the capitalisation tiers, the never-column in
> the glossary and the naming test are this guide's proposal. They are being
> written as rules because a convention stated tentatively is a convention
> nobody follows; they still need an owner's call, and the shipped strings that
> already disagree are listed under [Open decisions](#open-decisions-and-known-drift).

### Capitalisation — the rule

Three tiers. A term's tier is decided once and never varies.

| Tier | Rule | Examples |
|---|---|---|
| **Product surfaces** | Title case, full name on first mention in a document; short form after. | Service Provider Console, Customer App, Driver App, Agent Console |
| **Platform features unique to Wash Junkie** | Title case. Proper nouns — there is no generic English word for them. | Wash Credit, Wash House |
| **Domain objects that are ordinary words** | **Lowercase in prose.** Capitalised only when quoting a UI label or a schema name. | an outlet, an order, a driver, a customer, a machine, a catalogue item |

So **"Wash Credit"**, always both capitals — never "wash credit", "WashCredit" or
"credits". And **"your outlet"** in a sentence, but **"Settings → Outlet"** when
naming the nav item.

The tier-three test: could a competitor's product use this word to mean the same
thing? If yes, it is an ordinary word and takes no capital.

**Sentence case everywhere else** — page titles, buttons, modal headers, nav
items, toasts. Title case in UI chrome makes labels read as brand names and slows
scanning in a dense console.

### Naming the next thing

Run these in order and stop at the first that answers.

1. **Is there an ordinary English word for it?** Use it, lowercase. Most new
   things do not deserve a name.
2. **Does the name survive the vertical expansion?** Anything on the shared spine
   — order, driver, outlet, customer, status — must be vertical-neutral. "Wash"
   is fine in the platform's own vocabulary (Wash Credit is *ours*, and funds a
   car wash business just as well) and wrong in the name of a shared object. The
   most expensive naming mistake available to us.
3. **Does it collide with something already taken?** `User`, `Business`,
   `Outlet`, `Order`, `Customer` and `Driver` are schema names with precise
   meanings. "Staff" and "Agent" are taken in the product vocabulary rather than
   the schema — staff belong to an outlet, an agent is a field agent — and
   reusing either is worse than a collision in code, because only one of the two
   readings is ever visible on the screen you are writing for.
4. **One word, one thing, everywhere** — API, four surfaces, support macros,
   marketing site. Otherwise the word is wrong.
5. **Add it to the glossary in the same change.** A term that ships before it is
   written down has already begun drifting.

---

## Domain glossary

Grounded in the API's object names — `Business` → `Outlet` → `WashHouse` →
`Machine`, plus `Order`, `Customer`, `Driver`, `Staff`, `Catalog Item`. The
wrong-word column is not taste; each one causes a specific problem.

| Use | Never | Why |
|---|---|---|
| **outlet** | branch, shop, store, site | `Outlet` is the entity, and a business runs several kinds — main, pickup point, Wash House. "Branch" implies a hierarchy the model doesn't have. A provider may *name* an outlet "Lekki Main Branch"; their words on their record, not ours in our chrome. |
| **Wash House** | facility, plant, factory, hub | `WashHouse` is the production floor, inside an outlet or standalone. "Plant" describes an industrial laundry we don't sell to. Two words, both capitalised, in every user-facing string; `WashHouse` stays the code identifier. |
| **order** | job, ticket, batch, docket | `Order` is the record every surface shares. "Ticket" belongs to support and will collide the day we ship one. |
| **driver** | rider, courier, dispatch rider | `Driver` is a first-class model, not a role. "Dispatch rider" is Nigeria-specific and breaks the moment a market uses vans. |
| **customer** | client, user, consumer, end-user | `Customer` is who the provider serves. **"User" is ambiguous now** — `User` is the one platform identity, and a person can be a customer, a driver and an owner at once. |
| **service provider** *(market)* / **business** *(in-product)* | vendor, merchant, partner | `Business` is the entity, and it covers every type an owner can pick at onboarding — laundromat, pickup & delivery, drop-off, hotel/B&B. Do not reach for one of those four as the name for all of them; "laundromat" in particular reads as American English for "laundry" and is [opt-in, not free](#words-we-dont-use). |
| **staff member** | employee, agent, worker | Staff belong to an outlet (per-outlet membership on one `User`, not a separate person record). **"Agent" is taken** by field agents; reusing it confuses two products. |
| **field agent** | rep, sales agent, onboarder | The person who registers providers — and why the Agent Console is called that. |
| **Wash Credit** | wallet, balance, top-up, points, funds | Prepaid, per business, never cash-refundable, never transferable, redeemable only against Wash Junkie's own services. Those three constraints are what the closed-loop-contract-liability position rests on (Nigeria/CBN analysis, jurisdiction-specific, not counsel-reviewed). "Wallet" and "funds" describe stored value and argue against our own position. |
| **fund** *(verb)* | top up, recharge, deposit, load | Same reason. "Deposit" implies we hold your money. |
| **catalogue item / service** | SKU, product, item code | `Catalog Item`. The shipped nav label is "Catalog" — see the drift list. |
| **status** | stage, state, step | Statuses are admin-managed and per business, so the words a customer sees are the *provider's* words. Never hard-code your own stage vocabulary into copy a customer reads. |
| **paused** | suspended, blocked, disabled, frozen | Pausing a usage category is a reversible circuit breaker the owner controls. "Suspended" sounds like a penalty from us. |

---

## Writing rules

| Situation | ✗ | ✓ | The rule |
|---|---|---|---|
| **Numbers** | You currently have a total of 38 orders in the washing stage. | 38 orders in wash. | Round in prose, exact in tables. Tabular figures are global ([Typography](../04-typography.md)), so columns don't jitter as data updates. |
| **Zero** | 0 orders | No orders yet — create the first one from Intake. | Zero is an empty state, not a number. |
| **Currency** | `` `₦${amount}` `` | `formatMoney(amount)` | Currency follows the outlet's country; the formatter decides symbol and fraction digits. Never hard-code `₦`, never assume decimals or a grouping separator. |
| **Wash Credit** | Wash Credit · ₦20,000 | Wash Credit · 20,000 | It is a count, not an amount. The internal peg of 1 WC = ₦1 is accounting, and is not shown. |
| **Times** | Scheduled: 07/08/2026 14:00 UTC | Pickup tomorrow, 2pm. | Relative where a person would say it that way, absolute for anything they'll plan around. Times belong to the **outlet's own timezone** — never the server's, never the device's by default. A numeric date is banned outright: `07/08` is 7 August in Lagos and 8 July in Denver. |
| **Timestamps** | Updated 2026-07-30T09:14:22Z | Updated 4 minutes ago. | "How stale is this?" is the only question a timestamp on a live record answers, and a relative stamp answers it without the reader converting a timezone. |
| **Order refs** | Order 4kp7t2m has been updated | Order #4KP7T2M moved to Washing. | Seven uppercase characters in Crockford base32 — digits plus A–Z minus **I, L, O and U** (`ORDER_CODE_ALPHABET`, `api/src/services/orders.service.ts`) — so there is no "one or letter I?" on a phone call, and dropping U keeps accidental words out. `.wj-mono`, `#` prefix in a sentence, never lowercased, never broken across a line. The code *is* the shared vocabulary between operator, driver and customer. |
| **Names** | Hi , your order is ready | Your order is ready. | If there's no name, drop the greeting rather than shipping an empty one. The shipped order-status SMS already branches this way (`order-notifications.service.ts`). |
| **Name fields** | First name / Last name | Full name | Store and show exactly what was typed. No title-casing, no assumed given-name-first, no assumption a name has two parts — mononyms are normal and so is family-name-first. |
| **Errors** | Request failed with status 502 | We couldn't reach the payment service. The order is saved — try again in a minute. | Three parts, in order: what happened · what it means for their work · what to do. Whatever the server said stays in the log. |
| **Validation** | Invalid input | That phone number looks too short for the country on this outlet. | Name the field and what is wrong with it. Do not write a market's numbering plan into the string — numbers are stored E.164 and validated against the outlet's country, so a rule hard-coded in copy is wrong the first time a business runs outside Nigeria. |
| **Empty (filtered)** | No results | No orders match those filters. Clear them, or widen the date range. | Never-had-any and nothing-matched are different screens with different copy — see [Patterns](../10-patterns.md#empty-error-offline). |
| **Empty (never had any)** | Nothing here | No drivers yet. Add one and you can start assigning pickups. | |
| **Toasts** | Success! | Order #4KP7T2M refunded. **Undo** | Past tense, name the object, offer the undo where one exists. |

### Push

Push needs a budget because the OS truncates without asking, and it truncates at
a point that moves with device width and dynamic-type setting. **No Wash Junkie
surface sends push yet** — the apps that will are planned
([Surfaces](../11-surfaces.md)) — so there is nothing to measure against and no
budget to publish.

| Field | Budget | How to set it |
|---|---|---|
| Title | **TO SPECIFY** | Measure the collapsed single-line cut on the reference devices, then set the budget below the shortest observed cut, not at it. |
| Body | **TO SPECIFY** | Measure the expanded body at default *and* largest dynamic type; the largest-type cut is the binding one. |
| Front-loading | Carry the whole message in the opening clause | This one needs no measurement: a collapsed notification shows the start of the string, so everything after the first clause is a bonus regardless of where the cut lands. |

**TO SPECIFY:** run the measurement on the reference devices once the Customer
or Driver app has a build that can receive a notification, and record the three
numbers here. Until then, write to the front-loading rule and treat any specific
character count you see quoted elsewhere as unverified.

> ✗ Wash Junkie: An update has occurred on one of your recent orders. Tap to view
> the latest status information.
> ✓ **Order #4KP7T2M is ready** · Tunde's delivering between 2 and 4.

Never put the brand name in the title — the OS already shows it.

### SMS

A segment is **160 characters** in the GSM 7-bit default alphabet and **70** once
a message has to fall back to UCS-2. **`₦` is not in the GSM default alphabet**,
so one naira sign switches the whole message to UCS-2 and less than halves what
fits. Keep amounts out of SMS unless the amount *is* the message.

Budget for the tail as well as the message: the shipped order SMS appends `Reply
STOP to opt out.` — 23 characters with the space that joins it, and they are not
negotiable, because the opt-out notice is what keeps an informational SMS an
informational SMS.

> ✗ Hi Amaka, your order #4KP7T2M with Fresh Fold is now "Ready for delivery".
> ✓ Hi Amaka, your order #4KP7T2M with Fresh Fold is ready for delivery.

The quotation marks around the status label read as scare quotes and cost two
characters. The ✗ line is not hypothetical — it is the string the API sends
today, which is why it is on the drift list.

---

## The multilingual question

**Nigerian English is the default register** — British conventions (colour,
organise, catalogue, kerb), plain business register, no American idiom. It does
*not* mean performing local speech: warmth comes from plainness, and pidgin or
regional slang in product copy reads as a brand doing an impression of its users.

The platform already carries roughly 250 countries, 5,300 states and 153,000
cities in its seeded geo data, and currency follows the outlet's country. None of
that is theoretical, so no string may assume Nigeria.

| Never in the string | Where it comes from instead |
|---|---|
| A currency symbol or a formatted amount | the money formatter |
| A date or time format, or a timezone | the outlet's own timezone, formatted at the edge |
| Digit grouping and decimal separators | the number formatter (`1,200` vs `1.200`) |
| Name order, honorifics, a first/last split | one name field, shown as typed |
| A phone number format | E.164 storage, formatted for display |
| An address shape | the Country → State → City model |
| Units (kg, km) | the market's own units |
| A plural built by concatenating "(s)" | real plural rules — many languages have more than two forms |
| A sentence assembled from fragments | one string with named placeholders; word order is not universal |

Two more that bite later:

- **Leave room to expand.** Translations of short UI labels routinely run longer
  than the English — German and French notoriously so. A button sized to fit its
  English label exactly is a bug in the next market. **TO SPECIFY:** the
  expansion allowance, once there is a real translated string set to measure;
  until then design labels to wrap or truncate gracefully rather than to a
  fixed width.
- **The wordmark does not translate.** It is drawn artwork in lowercase Latin,
  not set type ([Brand](../02-brand.md#what-not-to-do)). **Proposed:** a
  non-Latin market gets the mark alone plus a locally set business name, and the
  wordmark is never redrawn in another script. No such market exists yet, so this
  is a direction, not a decision.

---

## Words we don't use

| Word | Why not |
|---|---|
| wallet, top up, cash out, deposit | Describes stored value. Wash Credit's whole defensibility is that it is not stored value. |
| oops, whoops, uh-oh | A system that says "oops" after mishandling someone's money doesn't understand what it just did. |
| simply, just, easy, quick | Tells a reader who is stuck that their difficulty is a personal failing. |
| user | `User` is a specific platform entity. Say customer, operator, driver or agent. |
| kindly | Idiomatic in Nigerian business correspondence and still doing no work — remove it and the sentence is identical. Out of product copy; correspondence is the writer's call. |
| seamless, revolutionary, cutting-edge, one-stop shop | No proof point behind any of them. |
| sorry for any inconvenience | Apologise for the actual thing, or don't apologise. |
| failed, invalid, error | Fine in a log. Never in a sentence aimed at a person. |
| laundromat | **Amended 2026-08-10 — no longer banned outright, now opt-in.** The old reason ("not what our providers run") was factually wrong: `api/src/database/seed-data.ts` seeds `business-type-laundromat` — "Laundromat · Self-serve washers & dryers" — as the first business type an owner picks at onboarding. Use it where you mean that trade, and nowhere else; it is still wrong as an American synonym for "laundry". `landing/scripts/brand-lint.mjs` enforces this: the word fails the build unless the element carries `data-lint-allow="laundromat"`. Naming the trade is fine; implying we run its coin-op tills is not, because there is no payment rail. |
| "we'll wash your clothes" | Factually false. Wash Junkie does not wash anything. |

---

## Open decisions and known drift

**Open — each needs an owner's call, and this guide is wrong until it gets one**

1. **The tagline.** Five territories above, none chosen. Blocks the marketing
   site, nothing else.
2. **What "wash" means after the vertical expansion.** Home cleaning and car wash
   reuse the order/driver/outlet spine. Wash Credit stretches; Wash House does
   not. Needs a brand-architecture decision before the second vertical ships.
3. **Positioning, proof points and the naming conventions are proposals**, and
   three of the four audiences' surfaces are unbuilt. No ⚠ proof point goes into
   market copy, and the capitalisation tiers need an owner's call before the
   shipped strings are swept to match them.
4. **"Fund wash credit".** The shipped modal header is lowercased on purpose,
   modelled on the Claude Console flow. It is not a sentence-case question —
   sentence case keeps proper nouns, so both rules in this document point at
   "Fund Wash Credit". Either Wash Credit stops being a tier-two proper noun
   (it shouldn't) or the header changes. Pick one; do not leave both.
5. **"Catalog" or "Catalogue".** The console ships "Catalog" as the nav and page
   label; these docs are British English. Renaming a nav item is a product
   decision.
6. **The push budget** does not exist yet and cannot until an app can receive a
   notification — see TO SPECIFY above. Nothing should quote a character count
   in the meantime.
7. **The Wash Credit regulatory wording.** The three invariants are treated here
   as fixed because the copy rules hang off them, but the analysis behind them
   is Nigeria/CBN-specific and has not been reviewed by counsel. A lawyer's read
   could tighten or loosen every Wash Credit string in the product.

> **Needs a decision:** whether the Wash Credit language in this guide is signed
> off as-is or held until counsel reviews the closed-loop position. Until that
> call, treat the glossary row and the "never described as money" rule as
> binding on copy and non-binding as legal fact — and do not repeat the
> reasoning in anything customer-facing or in marketing.

**Drift to fix**

- User-facing strings in `web/` ship two spellings of the same concept — "Wash
  House" (nav, floor screen) and "wash house" (onboarding steps, marketing
  panel). The rule says Wash House; the strings need a sweep. "Washhouse" also
  exists, but only as a route segment, component and CSS class name, which is
  fine — code identifiers are not copy.
- The **order-status SMS** wraps the status label in quotation marks — `is now
  "Ready for delivery"` (`api/src/services/order-notifications.service.ts`).
  That is the ✗ in the SMS section above, shipping today.
- `walletBalance` is the prop name carrying the Wash Credit balance through the
  console. Harmless in code, but "wallet" is the exact word the regulatory
  position avoids. Worth renaming when that file is next touched.
- **Fixed.** [Patterns](../10-patterns.md#destructive-actions) and
  [Typography](../04-typography.md#numerals) used `WJ-2026-0731` as the example
  order reference. Nothing of that shape is generated — the generator it
  replaced produced `WJ-` plus a timestamp fragment, and the current one
  produces seven base32 characters with no prefix and no date. Both examples now
  carry the live shape. Any other `WJ-`-prefixed reference found in a deck, a
  mock or a support macro is the same stale shape and should go the same way.

---

See also: [Identity system](03-identity-system.md) · [Brand](../02-brand.md) ·
[Patterns](../10-patterns.md) · [Accessibility](../12-accessibility.md)
