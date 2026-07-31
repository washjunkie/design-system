# Brand guide

*The identity layer. Read this if you are representing Wash Junkie anywhere a
person can see it — a van, a shopfront, a laundry bag, a deck, a press release,
an ad, or a laundry counter with you standing at it. If you are building the
product interface, you want the [design system](../../README.md) instead.*

---

## Why this is separate from the design system

They are different documents for different people, and conflating them is how
both get worse.

| | Brand guide | Design system |
|---|---|---|
| **Governs** | Identity | Interface |
| **Audience** | Anyone representing the company — including printers, signwriters, agencies, partners | People building product |
| **Contains** | Positioning, voice, marks, art direction, physical applications, merchandise, usage rights, and who may act as the company | Tokens, components, patterns, code |
| **Changes** | Rarely, and by decision | Continuously, and by pull request |
| **Enforced by** | Review and this document | `tokens/build.mjs --check` and the type system |

The overlap is real and intentional. A design system carries a **brand
foundations layer** — the subset of identity the product needs, which for Wash
Junkie is [docs/02-brand.md](../02-brand.md), [colour](../03-color.md), and
[typography](../04-typography.md). This guide covers everything the product
does not touch, and it is the larger half.

Where the two meet, **the design system wins on anything that renders on a
screen**, because those values are audited by a build that fails. This guide
never restates a screen measurement *differently* — where it repeats one (the
18px and 16px floors, the clear-space ratio) it repeats it verbatim and links to
the source.

## The documents

| | | |
|---|---|---|
| [01](01-strategy.md) | **Strategy** | Positioning, promise, personality, audiences, and the multi-vertical brand-architecture problem |
| [02](02-verbal-identity.md) | **Verbal identity** | Voice, the tone matrix, naming, message architecture, the domain glossary |
| [03](03-identity-system.md) | **Identity system** | The marks in full: variants, physical minimum sizes, misuse, co-branding |
| [04](04-colour-and-materials.md) | **Colour & materials** | Colour off the screen — CMYK, spot, vinyl, thread, substrates, 1-bit |
| [05](05-art-direction.md) | **Art direction** | Photography, illustration, the splash as a motif, imagery under glass |
| [06](06-physical-applications.md) | **Physical applications** | Vans, signage, uniforms, bags, receipts, tags |
| [07](07-digital-and-social.md) | **Digital & social** | Social, ads, email, app store, decks |
| [08](08-usage-and-legal.md) | **Usage, requests & assets** | Trademark, third-party permission, the asset index |
| [09](09-brand-representation.md) | **Brand representation** | Who may act as the company — agents, drivers, support, press, stands, partners |
| [10](10-merchandise.md) | **Merchandise** | What earns the mark on an object, what we refuse, and how a run is sourced and checked |

## The three facts that cause the most damage when missed

**1. A white mark on brand teal is not legible.**

`#2cbec5` carries white at **2.26:1** — below the 3:1 floor for non-text
graphics, and far below the 4.5:1 needed for type. A brand-teal van with a white
wordmark washes out at distance and disappears in direct sun. Put the mark in
ink on brand teal, or use the deeper accent teal `#007e84` (white at 4.86:1) as
the field. Measured by `tokens/print.mjs`; see
[04-colour-and-materials.md](04-colour-and-materials.md).

**2. The brand teal is in the hardest region for process ink.**

Saturated cyan-green above 60% lightness is the largest part of sRGB that offset
CMYK cannot reach. Four-colour process will flatten it toward grey-green.
Anything where the teal is the hero needs a **spot colour** and a wet proof on
the actual substrate.

**3. On a provider's premises, the provider's brand leads.**

Wash Junkie endorses; it does not take over a shopfront. This is the same
principle as the in-product [white-label rule](../13-white-label.md) — the
accent is the tenant's, the mark is ours — applied to a different medium.

It does not reach as far as a person. **A driver carries no platform mark at
all** — not an endorsement, not smaller, absent — because the garment would name
a party that neither did the work nor answers for it
([09](09-brand-representation.md#decided--option-a), decided). For the provider's
**objects** it reaches per artefact, on written request, never automatically —
[03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided). One mark per shopfront;
nothing on the bag's printed face or the cab doors until a customer notice names
the driver.

## What is proposal and what is decided

**Decided and closed:** the driver question ([09](09-brand-representation.md#decided--option-a)),
the artefact grant — strategy #8 — and the vehicle livery scheme
([03 · the artefact grant](03-identity-system.md#the-artefact-grant--decided) and
[06](06-physical-applications.md#vehicle-livery)).

Strategy, personality attributes, taglines, and brand architecture in
[01-strategy.md](01-strategy.md) are **proposals awaiting sign-off**, marked as
such, with an open-decisions list at the end of that document. Every one of the
ten ends with the same kind of list, and they cross-reference rather than each
answering the same question their own way. Everything measured — colour,
contrast, ratios, minimum sizes — is fact.

Anywhere a supplier would need a code that nobody has physically matched yet,
the guide says **TO SPECIFY** and gives the method rather than inventing a
number. Those are the gaps to close first, and they are the honest state of a
brand this age.

## Tools

```bash
node ../../tokens/print.mjs                     # production colour report
node ../../tokens/print.mjs '#2cbec5' '#00A5B5' # ΔE2000 against a spot candidate
```

The second one is the real workflow: read a candidate off a **physical** Pantone
bridge guide under D50, then check it. A hex found on a website is a screen
approximation of a print approximation and carries no authority.
