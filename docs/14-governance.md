# Governance

---

## Source of truth

```
tokens/palette.mjs  ─┐
tokens/source.mjs   ─┴─→ tokens/build.mjs ─→ tokens/dist/*   (generated)
                                            css/*.css        (authored, reads tokens)
                                            packages/react   (authored, reads css)
```

**Nothing in `tokens/dist/` is edited by hand.** Change the recipe and rebuild.

```bash
node tokens/build.mjs           # write every output + audit
node tokens/build.mjs --check   # audit only, non-zero exit on failure
```

The wider project's source of truth is the
[vault](https://github.com/washjunkie/wiki). A change here that
alters a platform-level decision gets written there in the same pass — see
`Decisions/Design System.md`.

## The layers, and the rule about them

```
primitive   --wj-aqua-9        raw. theme-independent. never used by a component.
semantic    --wj-accent-solid  what it's FOR. flips with theme and register.
component   .wj-btn            composed from semantics only.
```

A component reaching past the semantic layer into a primitive is a bug. It will
look correct today and wrong the moment the theme flips or a business re-tints.

## Changing a token

| Change | Cost | Needs |
|---|---|---|
| New token | Additive | Rebuild, showcase entry |
| New semantic role | Additive | Both themes, `--check`, docs |
| Change a semantic value | Product-wide | `--check`, visual review both themes, both registers |
| Change a ramp lightness | Everything | `--check`, and a note on why the old value was wrong |
| Remove a token | Breaking | Deprecate for one minor, then remove |

Never delete a token in the same change that stops using it. Something else is
using it.

## Changing the material

The glass tier values are **derived, not chosen**. Before touching an alpha:

1. Run the sweep in `build.mjs --check` and read what the current floors are.
2. If the new value goes below the floor, it does not ship. The floor is the
   point at which body text stops clearing AA over a worst-case backdrop.
3. Blur and edge are free to change — they cost frame budget, not legibility.
   Profile a 500-row table before raising blur on a tier used by chrome.

## Adding a component

1. **Does a composition already do it?** Most "new components" are a Card with a
   Stack in it. The kit is small on purpose.
2. CSS in `wj-components.css`, semantic tokens only.
3. React wrapper only if it needs state, focus management, or ARIA wiring.
4. Add it to the showcase. **If it is not in the showcase, it does not exist** —
   nobody will find it, and it will be rebuilt badly somewhere else.
5. Document when **not** to use it. That paragraph is the one people read.
6. `node tokens/build.mjs --check` and the review checklist in
   [Accessibility](12-accessibility.md).

## Versioning

Semver on the system as a whole.

- **Patch** — a fix that changes no value anyone could depend on.
- **Minor** — new tokens, new components, new variants. Additive.
- **Major** — a removed or repointed token, a changed class name, a changed
  default.

Deprecations live for one minor with a comment naming the replacement.

## Reviewing a change

- [ ] `node tokens/build.mjs --check` passes
- [ ] `node tokens/checklinks.mjs` passes
- [ ] Showcase updated, and looked at in **light and dark**
- [ ] Looked at in **both registers**
- [ ] Reduced motion and reduced transparency both still usable
- [ ] Nothing hard-codes a hex, a px font size, or a raw ramp step
- [ ] Docs updated in the same commit
- [ ] Vault updated if a platform decision changed
- [ ] No AI co-author trailers in the commit (project convention)

## Where things live

| | |
|---|---|
| `docs/` | This documentation |
| `tokens/` | Palette recipe, build, generated outputs |
| `css/` | Material and component CSS — the actual product styles |
| `packages/react/` | React bindings |
| `showcase/` | Live gallery. Links the real CSS, so it is also the test. |
| `assets/` | Brand artwork |
