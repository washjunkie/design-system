# Brand representation

*For anyone who stands in a room and is taken to be Wash Junkie — a field agent
on a shop counter, whoever answers a complaint, whoever talks to a journalist,
whoever staffs a stand. Open it before the visit, the call or the panel.*

[Usage & legal](08-usage-and-legal.md) governs **who may use the marks**. This
governs **who may act as the company** — the higher-stakes question for a
marketplace, because a field agent at a laundry counter *is* Wash Junkie for that
hour, and nobody proofs a person before they speak.

It comes off one fact ([Strategy](01-strategy.md#what-wash-junkie-is-not)):
**Wash Junkie does not wash anything. We promise the record, never the result.**
A representative who implies otherwise has moved a liability onto a company with
no machine, no water bill and no ruined shirt to meet it. So the question that
resolves most of this page is **whose promise is being made?** If it is the
provider's — price, turnaround, the state a garment comes back in — a
representative may explain it and may never make it.

---

## Who represents Wash Junkie

Four kinds of person are visible in the service and exactly one of them is ours.
The fifth row is everyone else who works here — ours, and not standing in front
of a customer. The column that decides everything is **belongs to**; it is what a
customer infers from a shirt.

| Who | Belongs to | Speaks for | May say, unasked | Never |
|---|---|---|---|---|
| **Field agent** | **Wash Junkie.** The Agent Console is a planned surface ([Surfaces](../11-surfaces.md)) | The platform, inside the limits below | What the platform does; how to get an account | Anything about how a provider will wash, price or return a garment |
| **Driver** | **The provider.** `Driver` is a record under a `Business` and an `Outlet`, with a nullable link to a `User` | The provider they are driving for on that job | That they are collecting for that business | That they are from Wash Junkie. They are not — see below |
| **Staff member** | **The provider.** Per-outlet membership on a `User`, not a separate person record ([glossary](02-verbal-identity.md#domain-glossary)) | The provider | That the shop runs on Wash Junkie — the **name in plain text** is already theirs ([08](08-usage-and-legal.md#third-party-usage)) | That we washed, collected, priced or lost anything |
| **Provider owner** | **Themselves.** Our customer, not our representative | Their own business | Their own experience of the product | Anything on our behalf |
| **Everyone else here** — whoever answers support, whoever builds it, the founder | Wash Junkie | Themselves, unless named under [press](#press-and-spokespeople) | What is already public | An unannounced date, a customer's data, a provider's numbers |

Two mistakes, opposite directions. **A provider is not a representative** — a
delighted owner telling the shop next door what our pricing will be creates an
expectation we have to break. **An agent is not staff** — one who starts serving
the counter to be helpful is doing a provider's work, unpaid and uninsured,
inside a business they registered that morning. What that makes them is a
question for whoever writes the agent's terms, and it is not a question anyone
should be answering at a counter at 11am.

---

## The driver question

The sharpest tension in the brand, and it does not resolve neatly. A driver is
the **most visible person in the service**: they arrive at a stranger's door with
that stranger's clothes, and are the only human moment in an order that is
otherwise a record on a screen. Exactly the surface a brand wants, and not ours
to take.

| Fact | What it forces |
|---|---|
| The `Driver` record is scoped to a `Business` and an `Outlet`. **The platform does not engage, pay or vet the person** | Dressing someone we did not engage makes a claim we cannot support. How that relationship is characterised in law is [strategy #9](01-strategy.md#open-decisions) and this row does not decide it |
| A person in Wash Junkie livery at a door says **Wash Junkie collected your clothes** | *"Our team collected"* is a sentence [Strategy](01-strategy.md#what-wash-junkie-is-not) bans outright — said here in the loudest medium available, by someone who cannot take it back |
| **A mark is not a liability allocation** | Where liability sits is [strategy #9](01-strategy.md#open-decisions), legal and unanswered. What livery changes is who the customer *addresses* — nothing more. Do not offer this as a reason the platform is less exposed |
| **One person can drive for two businesses** — `Driver` is per business and links to a single `User` | The same person may hold records at two providers and work both in a day, so no single provider's mark is true across a shift — and neither is ours. The fact is direction-neutral: under a platform-engaged fleet it would argue the opposite way |

The endorsement principle does not settle this on its own. It says the provider
leads on the provider's surface — which gets you to *provider first*, not to *no
platform mark at all*. What closes the gap is the first two rows together: an
endorsement may sit on any surface **whose owner can stand behind what it says**,
and a provider's driver cannot. The garment would name a party that neither did the
work nor answers for it.

| Option | The driver carries | Reads at the door as | What it costs |
|---|---|---|---|
| **A · Provider only** | The provider's garment and bag. No platform mark on the person | The provider collected — which is what happened | We give up a small secondary mark read at close range — [03's geometry](03-identity-system.md#relative-size) never put it on the chest. Not "the most visible surface in the service": the driver hands over a bag whose **woven seam label** carries the mark ([10 · distribution](10-merchandise.md#distribution-the-right-object-at-the-wrong-moment-is-a-cost)). Its printed **face** does not, until the driver notice ships — so for a collection customer this is nearer the absent answer than it reads, and [03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided) records that in those words |
| **B · Provider leads, platform endorses** | The provider's garment; our mark small, on a secondary item, never on the chest ([co-branding](03-identity-system.md#co-branding-and-partner-lock-ups)) | The provider collected, using us | An endorsement is a claim its owner backs. On a fascia we back it — the shop does run on us. On the person taking custody it says we are part of the collection, which we are not and do not answer for. Size does not reach that: a smaller mark makes a quieter false claim. It also multiplies kit per provider |
| **C · Platform livery** | Wash Junkie polo, cap, bag | Wash Junkie collected your clothes | Contradicts the model, invites the garment complaint to our door, and breaks the moment one driver serves two providers |

### Decided — option A

> **Platform-supplied kit carries no platform mark on a driver.** A driver wears
> the provider's garment and carries the provider's bag.
>
> **Scope.** This governs kit the platform **specifies, supplies or catalogues**.
> A provider printing our name in plain text on their own driver's shirt is
> [08's existing grant](08-usage-and-legal.md#third-party-usage), bounded as it
> already is by *never presenting Wash Junkie as the launderer*. It also governs
> the platform's endorsement on **someone else's** person: a field agent is
> **ours**, and livery on one is the subject, not an endorsement
> ([above](#what-they-wear-and-what-they-carry)).
>
> **Not time-boxed, and not tied to the Customer App.** Conditional on **who
> engaged the driver** — see below.

The decision rests on the first, second and fourth rows of the fact table, not on
the surface being a person. There is no general rule here that endorsement cannot go
on a person: it goes on a field agent, and [08](08-usage-and-legal.md#third-party-usage)
already lets a provider's staff say out loud that the shop runs on Wash Junkie.
What a driver cannot do is stand behind the claim, and a garment cannot qualify
itself the way a sentence can.

**Reversal condition.** This reopens the moment Wash Junkie **engages, pays,
vets, schedules or disciplines a driver directly**, or contracts a fleet or
courier serving more than one provider. It reopens as a **fresh derivation across
A, B and C** — not as C. Three of the four facts above survive a platform-engaged
fleet; one inverts.

**A "never" needs a "may".** A driver asked whether they are from Wash Junkie
says no, and may say what is true: *"I collect for Fresh Fold. They run their
orders through Wash Junkie."* One sentence, and it belongs in
[02's tone matrix](02-verbal-identity.md#tone-matrix), which currently has no
driver row for it. **TO SPECIFY.**

**What this does not decide.** [06 #2](06-physical-applications.md#open-decisions-and-to-specify),
the vehicle scheme, **never depended on the person** and is unchanged by this —
the earlier claim that a liveried van with an unliveried driver is "worse than
either" was wrong for a *provider's* van carrying our endorsement, which is
[#8](01-strategy.md#open-decisions)'s artefact question, and remains true for a
platform-liveried one. Note that the cab-door pair sits at 2–5m, at the kerb,
beside the driver ([06](06-physical-applications.md#vehicle-livery)); it is the
same claim in a larger size, and #8 should be answered knowing that.
#8 governed **objects** and this decision settled the **person**; #8 itself was
closed on 2026-07-31 — [03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided).
It did not land *absent*, so the reopen clause below did not fire: a fascia and a
van side remain customer-facing physical surfaces. It landed close enough to
absent for a *collection* customer that the grant records the fact in its own
words.

**Nobody in platform livery performs a collection or a delivery, whatever their
role.** This is the line that stops the agent rule and the driver rule colliding
the first time an agent covers a pickup on a pilot.

> **Unsettled, and above this chapter:** [11 · Surfaces](../11-surfaces.md#customer-app--planned)
> says the customer's relationship is with Wash Junkie;
> [10](10-merchandise.md#the-four-audiences) says the driver is the provider's.
> Option A adopts the latter. Reconciling the two is strategy's, not this
> chapter's to settle by implication.

**The debt this creates.** The customer must be able to tell that
the person at the door is the one they were told to expect. That is the
**record's** job, not the shirt's — *"Tunde's about 20 minutes away. He'll call
when he's outside"* ([tone matrix](02-verbal-identity.md#tone-matrix)). The usual
argument for platform livery is trust at the door, and that argument only loses
if the record actually carries it: today it does not. The only customer-facing
notice in the codebase is the order-status SMS
(`api/src/services/order-notifications.service.ts`) — per-business opt-in, and
inert until Twilio is configured — which names the business and the reference and
says nothing about who is coming. Until something sends it, the doorstep
introduction is the provider's to make.

That debt is **partly dischargeable today, not blocked on the Customer App**:
`order-notifications.service.ts` already composes that string and already
resolves a first name, so adding the driver's is a change in that one file —
subject to the per-business opt-in and to Twilio being configured. Full discharge
is blocked on the Customer App. **TO SPECIFY: nobody owns this item.** Until
someone does, this is a debt, not a plan — and adopting A without the record
carrying driver identity removes the forcing function that kept it visible.

Hi-vis belongs to the safety requirement, not to us
([06](06-physical-applications.md#uniforms)).

---

## Field agents

The highest-stakes representation moment in the company, for a reason that is not
about design: **the ask is "let me set up your business account".** That is the
shape of every account-takeover approach ever made, delivered in person to
someone who has never heard of us. Agent identification is fraud prevention — and
a badge is no answer to a fraud problem, being the cheapest thing in the
interaction to counterfeit.

### Identification

**The test: can the provider verify the agent using something the agent did not
give them?** If the only proof is on the agent's body or in the agent's hand, it
is not proof.

| What the agent has | Controlled by | Proves |
|---|---|---|
| Embroidered polo, lanyard, printed badge | Whoever paid the embroiderer | **Nothing.** Recognition only — worth having, not evidence |
| A card, and a number or QR code printed on it | The agent | **Nothing.** A link on a card is a link chosen by whoever printed the card. This is the one mistaken for proof |
| An email naming the agent and the visit, arriving in the owner's own inbox from our sending domain | Us | **Yes.** The same channel the account is claimed in anyway |
| A number the owner finds on our own site and dials | Us | **Yes** — and the only one that works for an owner who was not expecting a visit |

**TO SPECIFY:** the pre-visit email, the surface an owner can check a name
against, and the number to call. None exist — the Agent Console is planned, not
built — so an agent visit is unverifiable today. The sending domain is in hand
([08 #2](08-usage-and-legal.md#open-decisions-and-to-specify)); the rest is a
product decision this page is asking for.

> **Three asks mean it is not us. A Wash Junkie representative never asks for a
> password, never asks for a sign-in code out of your inbox, and never takes
> money.** One sentence, and a provider can carry it without training.

It costs nothing to hold, because the platform is built so none is ever needed:

| Already true in the platform | So |
|---|---|
| **Sign-in is Google or an emailed link, and a password is optional**, set later by the owner. Phone sign-in was deliberately removed | An agent has no legitimate reason to see a credential, ever |
| **The owner claims the account in their own inbox** — *"Fresh Fold is registered. The owner gets a sign-in link by email"* ([tone matrix](02-verbal-identity.md#tone-matrix)) | The agent never holds the key, by construction |
| **An agent never handles a provider's money — funding is owner-only, in the provider's own console** ([02](02-verbal-identity.md#tone-matrix)) | Repeated verbatim, not paraphrased: a paraphrase of a fraud rule is a loophole |

That runs back into the product. **No flow may ever ask an agent to type a code
that arrived in the owner's inbox** — the day one does, the sentence above stops
being true and every provider who learned it has been taught to trust the next
impostor. For the same reason **an agent never works inside the owner's session**,
even when offered the laptop: one `User` is the whole platform's identity, so the
action is indistinguishable from the owner's own, and the append-only trail
(`audit_logs`) records the account, not the hands. **TO SPECIFY:** whether
agent-performed registrations are attributed to the agent there once the Agent
Console ships; today it covers super-admin writes only.

### What they wear and carry

An agent **is** ours, so platform livery on one is accurate and the endorsement
hierarchy does not apply — a counter during a registration is our meeting, not
the provider's shopfront. Garments, badge placement and the embroidery floor are
[06](06-physical-applications.md#uniforms). Two rules are specific:

| Rule | Why |
|---|---|
| **Nothing an agent carries is tinted to a business** — not the tablet case, not the folder, not the console | An agent works across many businesses in a day, which is why the Agent Console is specified with permanently neutral chrome ([Surfaces](../11-surfaces.md)). Kit carrying the last shop's colour implies an allegiance the agent does not have |
| **The mark alone, never the lock-up** | An agent is read across a counter, not a car park, so distance is not the binding constraint — the process floor is. At chest-badge size the lock-up is not embroiderable at all, and the mark at its floor already over-serves a counter ([06](06-physical-applications.md#uniforms)) |

### How they introduce themselves

Three sentences, in order. The second prevents a misunderstanding the company
would otherwise inherit.

> "I'm *name*, from Wash Junkie. We don't wash anything — we're the system a
> laundry runs on, and your shop stays yours. If you want, I can set the business
> up now, and the sign-in link goes to your email, not to me."

What is missing is deliberate: no revenue claim, no *easy* or *simply*
([02](02-verbal-identity.md#words-we-dont-use)), and nothing about the exercise
book — their current system works, which is the actual problem, and mocking it
loses the room ([Strategy](01-strategy.md#the-competitive-frame)).

### What an agent leaves behind

The item is the field-agent service card and the sample bag, both specified in
[10 · the catalogue](10-merchandise.md#the-catalogue) — material, process, floor
and the moment they are handed over. What goes *on* the card is this page's:

| Must carry | Must not carry |
|---|---|
| The URL — the one address that survives an office move and the agent's departure ([06's standing rule](06-physical-applications.md#merchandise)) | The agent's personal number. A provider who can reach only one human has a relationship with a person, and it ends when that person does |
| How to get in without the agent: the link goes to the owner's email | A price. Charging is not built and no price is published, so anything printed is a guess with our name on it |
| How to check that an agent is ours, pointing at a surface we control | A QR code resolving to anything the agent chose — it fails the identification test by construction |

### When an agent leaves the company

A former agent is the best-placed impostor this platform has: they know which
shops are registered, they know the owners, and they have a plausible reason to
walk back in. The leaver process is a brand control, not an HR formality.

> **PROPOSAL — needs sign-off, and nothing below exists yet.** There are no field
> agents, no record linking an agent to the businesses they registered — the API
> has no agent concept at all today — and no platform notice to send. Read the
> table as the shape the Agent Console has to be built to support, not as a
> process anyone could follow this week.

| Same day | Why |
|---|---|
| Access revoked; their businesses reassigned to a named person | An account left live is the whole risk in one row |
| **Every provider they onboarded is told by the platform, in their own inbox** — not by the departing agent | If the first they hear is the ex-agent's version, the ex-agent is still the channel |
| Anything carrying the mark comes back or is destroyed, and the return is recorded | Embroidery outlasts the garment ([06](06-physical-applications.md#uniforms)) — a virtue until the shirt leaves with someone |
| The audit trail is not touched | It is append-only. A record that can be tidied after a departure was never a record |

**TO SPECIFY:** who owns this checklist and where it lives. Nowhere today.

---

## What a representative may commit the company to

Most of what someone wants promised is **the provider's promise**. Saying so is
not evasion; it is an accurate description of what we sell.

| Commitment | Whose | What a representative may say |
|---|---|---|
| **The price of a wash** | The provider's — catalogue pricing is per business | "They set their own prices; they're on their catalogue." Never quote one |
| **Turnaround** | The provider's: "the provider's promise to make, not ours to make on their behalf" ([Strategy](01-strategy.md#what-wash-junkie-is-not)) | Never "we'll have it back by Friday" — not even "they usually manage two days" |
| **A damaged or lost garment** | Between customer and provider | What the record shows: the order existed, the price was agreed, the driver collected at the time shown. Where liability sits is a **legal** question with an open note against it in [Strategy](01-strategy.md#what-wash-junkie-is-not) — do not answer it in a shop |
| **A refund** | The provider's. Refunds need `orders:refund`, a permission in *their* console | "You can refund it from the order." We do not issue one, and a driver never sees one |
| **Uptime** | Ours, and nothing about it is published | **TO SPECIFY:** whether the provider terms commit to any availability at all — nobody answers that from memory in a shop. What is safe to say is the behaviour: offline-first is a **design property** — every screen reads from cache, every write queues — not an availability number. Never say a percentage, and never invent one to sound confident |
| **Roadmap dates** | Nobody's, out loud | Three of the four audience-facing surfaces are planned, not shipped ([Surfaces](../11-surfaces.md)). No ⚠ proof point from [02's message architecture](02-verbal-identity.md#message-architecture) reaches market copy or an agent's mouth until it ships |
| **What the platform costs a provider** | **TO SPECIFY** | Wash Credit is metered and the pause circuit-breaker is built; **charging is not**, and no price is published. The honest answer is that pricing is being finalised — not a number, not a guess |
| **Data — export, ownership, deletion** | Legal, not brand | Route it, as [08](08-usage-and-legal.md#asking-for-something) routes anything with a legal shape |

Across all eight: **never describe Wash Credit as money** — not a wallet, a
balance, a top-up or funds. The wording carries a regulatory position that has not
been through counsel ([02](02-verbal-identity.md#open-decisions-and-known-drift)),
and it binds speech for the same reason it binds a string.

---

## Support and complaints

The question is not who is at fault. It is **which promise was broken** — and
that decides who speaks.

| What broke | Whose | Who answers |
|---|---|---|
| The **record** — a status never moved, a notification never arrived, the console lost a change | Ours | Us, in the [voice for an error we caused](02-verbal-identity.md#tone-matrix): what happened, what it means for their work, what to do |
| The **result** — a stained shirt, a late delivery, a rude driver | The provider's | The provider. We supply the record that settles it, and nothing else |
| **Both**, or nobody can tell yet | Unresolved | Say what the record shows, say what we are checking, give a time. Never assign blame to a provider in front of a customer — the provider is our customer too, and it reaches them |

| Never, whoever is speaking | Because |
|---|---|
| **Apologise for the wash** | Apologising for it is claiming it ([02](02-verbal-identity.md#words-we-dont-use)) |
| **Confirm an order to someone who is not on it** | The console shows a customer's full name, address, phone and history behind one tap, and an order reference is the *shared* vocabulary between operator, driver and customer ([07](07-digital-and-social.md#what-not-to-do)) — a lookup key in the wrong hands |
| **Tell one provider anything about another** | Volumes, pricing, or that they are on the platform at all. Two shops on the same street are both our customers; the moment one of them learns something about the other from us, the console stops being a record they can trust with their own numbers |

---

## Press and spokespeople

**TO SPECIFY:** who may speak on record — realistically the founder today, and
writing the name down is the point. Unnamed means the first journalist to call
appoints one.

> **PROPOSAL — needs sign-off.** The holding line for anything unconfirmed:
> *"That's not something we've announced. I'll come back to you today with what
> we can say."* Then come back the same day — a holding line not honoured is
> worse than no comment, because it was a commitment.

| Never said, on or off record | Why |
|---|---|
| **Any customer's data**, or a real order reference | Off the record is a convention, not a mechanism |
| **A provider's revenue or volumes** | We can see them in reports. Being able to see something is not permission to repeat it, and a provider who reads their own numbers in an article never trusts the console again |
| **Unannounced roadmap** — dates, verticals, markets | The Phase 5 verticals and the brand-architecture question are unresolved ([strategy #4](01-strategy.md#open-decisions)). A named date becomes the thing we are measured against |
| **A number we have not measured** — providers, orders, growth | This guide names no statistic anywhere, on purpose. A figure said once is quoted forever |
| **A competitor** | No competitive research has been commissioned ([Strategy](01-strategy.md#the-competitive-frame)), so any comparison is unsupported |
| **The Wash Credit regulatory reasoning** | [02](02-verbal-identity.md#open-decisions-and-known-drift) keeps it out of marketing and customer-facing material. An interview is both |

Editorial use of the marks is granted and bounded in
[08](08-usage-and-legal.md#third-party-usage) — send a file, not a link to a page.

---

## Events, stands and demos

Whose event decides who leads. **Ours** is the one setting where the lock-up
leads, sized from the distance table rather than from the panel
([06](06-physical-applications.md#height-by-viewing-distance)). On **a
provider's** stand the endorsement rule does not stop
at their doorframe: our mark alone, second, smaller, outside their clear space
([co-branding](03-identity-system.md#co-branding-and-partner-lock-ups)). At **a
third party's** we are a guest, implying no partnership that has not been written
([08](08-usage-and-legal.md#third-party-usage)).

A live demo is a worse risk than a screenshot: a screenshot is bounded and
reviewed, a demo is an open surface in front of people who ask questions, and the
console opens a customer's full record in one tap. Stand graphics inherit field,
contrast and distance from
[06](06-physical-applications.md#height-by-viewing-distance) unchanged; what is
specific to a hall is that **the light is not ours and neither is the
backdrop**. Both sets of rules run together:

| Rule | Why |
|---|---|
| **Demo from a seeded demo business. Never sign into a live tenant** — not even with the owner's blessing | Their console holds their customers' names, addresses and numbers, and their accent re-tints the chrome ([White-label](../13-white-label.md)), so the tenant is identifiable with every name in frame removed ([07](07-digital-and-social.md#what-not-to-do)) |
| **"Can you look up a real one?" is always no** | Said once, in front of an audience, it is the answer everyone remembers. Decide it before you are asked |
| **Demo references keep the real shape** — seven Crockford base32 characters, e.g. `X86WE8T` ([02](02-verbal-identity.md#writing-rules)) | A fabricated `WJ-2026-0731` teaches a room the wrong shape, and it is the shape of the generator that was replaced for colliding on concurrent creates ([02's drift list](02-verbal-identity.md#open-decisions-and-known-drift)) |
| **Never demo an unshipped surface as if it ships** | A mock in a demo is a promise with pictures |
| **No white on the brand teal**, ever, on a backdrop | 2.26:1 — under the 3:1 non-text floor before the hall's lighting is argued about ([the table](03-identity-system.md#which-mark-on-which-field)). A backdrop is also distance work, and beyond arm's length [06](06-physical-applications.md) approves only pairings clearing 4.5:1: ink on brand teal (7.24), white on accent teal (4.86), ink on white (15.98) |
| **Printed fabric is a substrate** — proof on the actual fabric | [Nobody signs off a physical piece on a screen](06-physical-applications.md#before-any-physical-order-ships), and a backdrop is no exception |
| **Giveaways go through the earning test**, not the stand budget | An item bought because there is a stand has no job in the service ([merchandise](10-merchandise.md)) |

> **Fixed 2026-07-31.** The demo dataset — `bun run db:seed:demo`
> (`api/src/database/seed-demo-oron.ts`) — numbered its orders `FF-1000` upward,
> the exact shape the rule above bans from a demo. It now draws real references
> from `order_number_seq` through the same encoder production uses, so demo data
> is indistinguishable from real data by construction rather than by a format
> somebody has to remember to imitate. The prefix had been doing double duty as
> the reset key; that job moved to the demo customer's own e-mail domain, which
> the script already used to tear down customers and drivers.

---

## Partners, resellers and integrators

**The default is none.** A partnership, an integration or a signed agreement
confers, in itself, no right to speak for the company — the principle
[08](08-usage-and-legal.md#third-party-usage) applies to artwork, applied to a
person. *A mention is not a licence*, and neither is a contract unless it says so.

| Conferred | Never conferred, unless written |
|---|---|
| "Works with Wash Junkie" **in text**, already granted to integrators in [08](08-usage-and-legal.md#third-party-usage) | Speaking for us — support, incidents, pricing, roadmap |
| A listing describing what the integration does | Quoting a price, or any commitment from the table [above](#what-a-representative-may-commit-the-company-to) |
| — | **Registering providers.** A partner who onboards businesses is doing a field agent's job and inherits the whole identification standard, or the arrangement is not approved |
| — | Holding a provider's credentials, for any reason |

**TO SPECIFY:** whether third-party onboarding is permitted at all — the one
partnership shape reaching straight into the fraud surface, so answer it
deliberately rather than discover it in a deal.

---

## Employee advocacy and personal accounts

Nobody here needs permission to post about the work, and this page is not going
to invent an approval queue for a company this size. Four rules, and they are the
whole list.

| Rule | Why |
|---|---|
| **You are not the company** | Say where you work; don't present a personal post as a company statement. Nobody needs a disclaimer in their bio — they need to not announce things |
| **No screenshot with real data in it** | The one that actually happens: a proud post about a shipped feature, and a customer's phone number in the third row. Seeded data only ([07](07-digital-and-social.md#what-not-to-do)) |
| **Nothing unannounced, and no commentary on an incident** | There is no canonical outage surface yet ([07 #9](07-digital-and-social.md#open-decisions-and-to-specify)), which is exactly why a personal thread would become one |
| **A complaint that finds you personally goes to support** | You cannot see the record from a feed, and *specific beats soothing* ([02](02-verbal-identity.md#voice-four-things-that-are-always-true)) is impossible without it |

---

## Sponsorship and community

What our name sits beside is a claim about us, made by placement rather than
copy. Nigeria-first is a fact and expansion is real, so this travels.

| Sits beside | Never sits beside |
|---|---|
| Trade associations and neighbourhood business groups — where our audience actually is | A political party, a campaign, or a religious body. We do not know a provider's politics or faith and have no reason to; the console is deliberately neutral chrome, and an affiliation costs us providers we have not met yet |
| Training and skills programmes for the trades we serve | A claim we cannot verify — an award, a ranking, a "leading platform" line supplied by an organiser |
| Local events where the provider's name leads and ours endorses | Anything implying we wash. Sponsoring a laundry competition is the trap: the name appears above the work |
| — | Anything whose branded item is disposable — it fails the earning test before it reaches the sponsorship question ([merchandise](10-merchandise.md)) |

**TO SPECIFY:** who approves a sponsorship, and against what budget. Neither
exists, so the first request will be answered by whoever is asked.

---

## Open decisions and TO SPECIFY

| | Item | Method / blocked on |
|---|---|---|
| 1 | ~~Whether drivers carry any platform identity at all~~ | **Closed 2026-07-31 — option A.** No platform mark on platform-supplied driver kit; scope, reversal condition and the permitted sentence are [above](#decided--option-a). [03's co-branding table](03-identity-system.md#co-branding-and-partner-lock-ups) was corrected in the same pass |
| 1a | **The driver's name in the customer notice**, and an owner for it | Partly dischargeable now in `api/src/services/order-notifications.service.ts`, which already resolves a first name; full discharge needs the Customer App. **Unowned** — this is the debt option A took on |
| 1b | **A driver row in [02's tone matrix](02-verbal-identity.md#tone-matrix)** for the permitted sentence | 09's decision ships a *never* with no *may*. One sentence, and the matrix has no driver row for it |
| 2 | **How a provider verifies a field agent** — the pre-visit email, the name-check surface, the call-back number | None exist. Blocked on the Agent Console; the sending domain is in hand ([08 #2](08-usage-and-legal.md#open-decisions-and-to-specify)) |
| 3 | **Whether agent-performed registrations are attributed to the agent in the audit trail** | `audit_logs` covers super-admin writes today. Decide before the Agent Console ships, not after |
| 4 | **The agent leaver checklist, and its owner** | Access revocation, reassignment, a platform-sent notice to each provider, kit return. Written nowhere |
| 5 | **What the platform costs a provider** | Wash Credit is metered and pausable; charging is not built and no price is published. Until it is, nobody quotes one |
| 6 | **The named spokesperson**, and the holding-line commitment | Owner's call. Unnamed means the first person reached becomes one |
| 7 | **Whether partners may onboard providers** | The one partnership shape that reaches the fraud surface |
| 8 | **Sponsorship approver and budget** | Neither exists |
| 9 | **Where liability sits** between platform, provider and customer | Legal, not brand — already flagged in [Strategy](01-strategy.md#what-wash-junkie-is-not). Until it lands, representatives describe the record and nothing else |
| 10 | ~~A business reserved for demos~~ | **Closed 2026-07-31.** Both halves are fixed. References are drawn from `order_number_seq`, and the targeting no longer picks: it refuses under `NODE_ENV=production`, refuses a name matching more than one business (listing the ids), and refuses to write into a business holding any order it did not create unless the id is given explicitly — a name is a search term, an id is an address. Naming a dedicated demo business is still the tidier habit, but nothing now depends on it |
| 11 | **Whether the provider terms commit to any availability** | Legal, not brand. Until it is answered, uptime is described as behaviour and never as a number |
| 12 | **A customer-facing notice that names who is coming to the door** | The doorstep-identification promise the driver question rests on. Today the only notice in the codebase is the order-status SMS — per-business opt-in, inert until Twilio is configured — carrying the business and the reference and nothing else. Blocked on the Customer App; it is what makes option A survivable |

---

Related: [Strategy](01-strategy.md) · [Verbal identity](02-verbal-identity.md) ·
[Identity system](03-identity-system.md) ·
[Physical applications](06-physical-applications.md) ·
[Digital & social](07-digital-and-social.md) ·
[Usage & legal](08-usage-and-legal.md) · [Merchandise](10-merchandise.md) ·
[Surfaces](../11-surfaces.md) · [White-label](../13-white-label.md)
