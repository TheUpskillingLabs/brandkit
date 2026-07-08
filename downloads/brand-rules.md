# The Upskilling Labs — Brand Rules

Complete brand reference with token tables and code examples.
Matches the shipped app design system — source of truth: OLOS `app/globals.css`.

---

## Naming

| Rule | Value |
|---|---|
| Organization | The Upskilling Labs |
| Short form | "The Labs" — the **only** shortening. Never "TUL". |
| Legal entity | The Upskilling Labs, Inc., a fiscally sponsored project of Superbloom Design (501(c)(3)) |
| Vocabulary | Build Cycle (twelve weeks, one real project) · Pod · Upskiller |
| Never | course, class, student, lesson, module |

## Key copy

| Pattern | Text |
|---|---|
| Tagline | Find your people. Build your edge. |
| Lede | The Labs isn't a class you sit through. It's where you practice becoming the person you want to be — on real problems, with people who notice. |
| CTA | Join The Labs — never "Sign up" / "Get started" |
| Footer brand line | A commons for upskilling — learn by doing, in the open. Projects, playbooks, and lessons, built like open source. |
| Legal line | © 2026 The Upskilling Labs, Inc. · MIT code · CC BY 4.0 content · Built in the open. |

## Theme

Light-first. Warm paper `#F6F4EF` is the **only** light page background.
Dark (`--ink` / the cover gradient) is reserved for covers, nav bars, and
footers. Never two consecutive dark sections without a light break.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#00141B` | Darkest brand color — page text, nav, footers, cover base |
| `--navy` | `#03232A` | Mid stop of the cover gradient, media frames |
| `--forest` | `#005F68` | Deep teal-green — the cover gradient's end stop |
| `--teal` | `#0094A0` | Primary accent — links, focus, eyebrows on dark. Not button fills |
| `--teal-deep` | `#007882` | The standard filled-CTA color (AA on white), emphasis labels |
| `--red` | `#E11D2A` | Landing "Join The Labs" CTA, alerts, risk, the orb's red lobe |
| `--paper` | `#F6F4EF` | The only light page background |
| `--paper-edge` | `#E8E5DF` | Paper border / edge |
| `--tint` | `#ECF3F4` | Pale teal tint surface |
| `--tint-edge` | `#D8E8EA` | Border for tint surfaces |
| `--white` | `#FFFFFF` | Card and input surfaces |
| `--charcoal` | `#444444` | Body text |
| `--slate` | `#4A5557` | Lede / secondary body text |
| `--meta` | `#5F6B70` | Captions, labels, meta text |
| `--meta-soft` | `#8A979B` | Placeholders, idle dots, disabled |

### On-dark text & hairlines

| Token | Value | Use |
|---|---|---|
| `--od1` | `rgba(255,255,255,0.95)` | High-emphasis text on dark |
| `--od2` | `rgba(255,255,255,0.64)` | Body text on dark |
| `--od3` | `rgba(255,255,255,0.4)` | Muted text on dark |
| `--rule-d` | `rgba(255,255,255,0.16)` | Divider on dark |
| `--rule` | `rgba(0,20,27,0.1)` | Default border / divider on light |
| `--rule-soft` | `rgba(0,20,27,0.07)` | Soft hairline on light |
| `--rule-ink` | `rgba(0,20,27,0.85)` | Ghost-button border, dot outlines |

No purples, no blues outside the teal family, no yellows. Semantic states
reuse the palette: success/active → teal · risk/error → red · neutral → meta.

## Shape & elevation

| Token | Value |
|---|---|
| `--r` | `14px` — **the one radius**, on every rectangular container. No pills. Circles only for avatars, dots, pips |
| `--shadow` | `0 1px 2px rgba(0,20,27,0.05), 0 6px 20px rgba(0,20,27,0.06)` |
| `--shadow-lg` | `0 12px 40px rgba(0,20,27,0.16)` |

Shadows never on text or the logo.

## Layout

| Token | Value |
|---|---|
| `--pad` | `24px` mobile → `40px` ≥1024px (page gutter) |
| `--maxw` | `1920px` (full-width shell; caps only on ultrawide) |
| `--measure` | `760px` (readable prose column) |
| Section padding | `56px` vertical → `72px` ≥1024px |
| Nav bar | ink background, `min-height: 76px`, 56px logo |
| Mobile | bottom tab bar below 768px |
| Grid | 4px baseline — every spacing value is a multiple of 4 |

## Typography

One typeface: **Geologica** (variable). Weights in use: 400 / 500 / 600 / 700.
**All type is flush left, ragged right — never centered, never justified.**
One alignment across the whole system. Tabular numerals for numbers
(`font-variant-numeric: tabular-nums`). No monospace. The app self-hosts via
`next/font`; static pages may use the Google Fonts CDN.

| Style | Mobile | Desktop (≥1024px) | Color |
|---|---|---|---|
| Display | 44/48 · −0.03em · 700 | 76/80 · −0.04em | ink |
| H1 | 32/36 · −0.026em · 700 | 48/52 · −0.034em | ink |
| H2 | 26/32 · −0.02em · 700 | 34/40 | ink |
| H3 | 20/28 · −0.016em · 600 | 24/32 | ink |
| H4 | 17/24 · −0.01em · 600 | — | ink |
| Lede | 18/28 · 400 | 20/32 | slate |
| Body | 16/24 · 400 | — | charcoal |
| Small | 13/20 · 400 | — | meta |
| Eyebrow | 12/16 · +0.1em · 500 · UPPERCASE | — | meta (`--teal-deep` for emphasis) |
| Index | 18/24 · −0.01em · 700 | — | teal-deep |
| Stat | 64/64 · −0.04em · 700 | 88/88 | teal-deep |

The eyebrow is **plain text** — no capsule, no box. (The old teal-tinted
capsule is retired; it violated the one-radius rule.)

## Components

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 14px;                  /* var(--r) — no pills */
  font-size: 15px; font-weight: 600; letter-spacing: 0.01em;
  padding: 15px 24px;
}
.btn:active   { transform: scale(0.98); }
.btn:disabled { opacity: 0.34; }
.btn:hover    { opacity: 0.9; box-shadow: var(--shadow); } /* filled variants */
```

| Variant | Spec |
|---|---|
| `.btn-teal` | bg `--teal-deep` `#007882`, white text — the standard primary (AA) |
| `.btn-red` | bg `--red` — the landing "Join The Labs" primary |
| `.btn-ink` / `.btn-white` | ink bg / white bg with ink text |
| `.btn-ghost` | transparent, `1px solid rgba(0,20,27,0.85)`, ink text (white on dark) |
| `.btn-ghost-teal` | transparent, teal-deep text, `1px solid rgba(0,148,160,0.45)` |
| `.btn-sm` | 13px, padding 11px 16px |

Focus (all interactive elements): `outline: 2px solid #0094A0; outline-offset: 2px`.

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(0,20,27,0.1);
  border-radius: 14px;
  overflow: hidden;
}
.card.tappable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}
```

No gradient fills inside cards. No left-border accent stripes.
Card body padding 18px 20px.

### Chips, status, forms

| Component | Spec |
|---|---|
| Chip | padding 9px 16px, radius 14px, white bg, 1px `--rule`, 13px/600 charcoal; active = ink bg, white text |
| Status pill | inline-flex, 11px/600, +0.06em, UPPERCASE, 7px dot — active: teal-deep text + teal dot with `rgba(0,148,160,0.18)` glow; risk: red |
| Input | white bg, 1px `--rule`, radius 14px, **16px font** (iOS no-zoom rule), padding 14px 16px |
| Input focus | border `--teal` + `box-shadow: 0 0 0 3px rgba(0,148,160,0.14)` |
| Field label | 12px/500, +0.09em, UPPERCASE, meta |

## The cover (dark surface)

```css
.s-cover {
  background:
    radial-gradient(120% 80% at 0% 100%, rgba(0,148,160,0.55) 0%, transparent 56%),
    radial-gradient(110% 70% at 100% 0%, rgba(0,148,160,0.4) 0%, transparent 50%),
    linear-gradient(160deg, #00141B 0%, #03232A 55%, #005F68 120%);
}
/* + .grain overlay: base64 fractal-noise SVG, mix-blend-mode: overlay, opacity: 0.5 */
```

Teal radiates outward from corners and edges. Dark ink at center → teal
at edges is the rule. Never a centered teal blob. Nav bars and footers
are flat `--ink`, not the gradient.

## Voice

Warm, plain, human. Second person ("you"), plain present tense, sentence
case. Specific nouns ("your local library", "the twelve-week Build
Cycle", "your pod") and real verbs (building, shipping, iterating).
No emoji. No exclamation points in marketing copy.

**Words we never use:** seamless, powerful, supercharge, revolutionize,
amazing, awesome, unlock, leverage, empower, game-changing, cutting-edge,
innovative, disruptive, transformative.

## Logo

- Primary lockup: orb mark + sentence-case wordmark "The Upskilling Labs", white knockout — dark ink/cover surfaces only, with clear space.
- The orb is a **direct homage to the NASA "meatball"** insignia — a round emblem with a vector swoosh cutting across it (teal field, red lower lobe, teal swoosh).
- App placement: ink nav bar (76px bar, 56px logo) and footer.
- On paper/light surfaces: use the orb-on-light mark.
- Partner marks (DC Public Library, Levy Strategic Design, Superbloom Design): white knockouts, footer rail only, hairline dividers — never in the hero.
- No drop shadows on the mark. Never place the lockup on teal, red, or busy imagery.

## Design lineage

Our layout and typographic standards are deeply inspired by NASA's **1976
Graphics Standards Manual** (Danne & Blackburn) and the International Typographic
Style behind it: a strict grid, a systematic type scale, a restrained palette
with a single red accent, and type set **flush left, ragged right** — never
centered. Expressive round mark (the meatball homage), disciplined flush-left
system.

## Photography

Used rarely — external marketing only; the photo reads as texture, never
as subject. Treatment: grayscale, then the cover tint
(`linear-gradient(160deg, rgba(0,20,27,0.93), rgba(3,35,42,0.92), rgba(0,95,104,0.9))`
plus corner teal radials) and a scrim for text legibility.
Good: candid work, ambient/underexposed cool light, library and civic contexts.
Never: horizon lines, perspective grids, stairs, blinds, striped surfaces,
posed stock, warm/golden-hour tones.

## Logo clear space & minimum size

- Clear space = the orb's height on all four sides; nothing inside it.
- Minimum size — screen: never below **24px** tall (app nav lockup is 56px). Print: never below **0.5″ / 13 mm** wide. Below that, use the orb mark alone.

## Print color reproduction (CMYK)

For print. CMYK is a reference conversion from each sRGB hex — **confirm against a printed proof** and match critical color to the HEX or Pantone. Pantone values are nearest approximate. No pastels.

| Color | HEX | RGB | CMYK | Pantone ~ |
|---|---|---|---|---|
| Ink | `#00141B` | 0 20 27 | 100 26 0 89 | Black 6 C |
| Navy | `#03232A` | 3 35 42 | 93 17 0 84 | 5467 C |
| Forest | `#005F68` | 0 95 104 | 100 9 0 59 | 7476 C |
| Teal | `#0094A0` | 0 148 160 | 100 7 0 37 | 320 C |
| Teal Deep | `#007882` | 0 120 130 | 100 8 0 49 | 321 C |
| Red | `#E11D2A` | 225 29 42 | 0 87 81 12 | 485 C |
| Paper | `#F6F4EF` | 246 244 239 | 0 1 3 4 | warm white stock |
| Charcoal | `#444444` | 68 68 68 | 0 0 0 73 | Cool Gray 11 C |
| White | `#FFFFFF` | 255 255 255 | 0 0 0 0 | — |

## Accessibility

Meet WCAG AA (4.5:1 body, 3:1 large).

| Text | On | Ratio | Use |
|---|---|---|---|
| Ink / Charcoal / Slate / Meta | paper / white | 17.1 / 8.9 / 7.0 / 5.0 | body text ✓ |
| Meta-soft `#8A979B` | paper / white | 2.7 | decorative only — never body text |
| Teal-deep `#007882` | white | 5.2 | text & links ✓ |
| Teal `#0094A0` | white | 3.7 | accent / large only |
| Red `#E11D2A` | white | 4.8 | ✓ |
| White / Teal | ink | 16.8 / 5.1 | ✓ |

- **Rule:** teal is an accent — use teal-deep for text/links on light.
- Visible focus on every interactive element: `outline: 2px solid #0094A0; outline-offset: 2px`.
- Inputs ≥ 16px (prevents iOS zoom). Respect `prefers-reduced-motion`. Always write alt text (logo alt = "The Upskilling Labs").

## Glossary

| Term | Meaning |
|---|---|
| The Labs | The only shortening of The Upskilling Labs. Never "TUL". |
| Build Cycle | The twelve-week program; one real project, W0 → W12. |
| Pod | A small cross-functional team (5–8) formed early in a cycle. |
| Project Team | The 3–5 who carry a project after Meet the Projects (W8). |
| Upskiller | A participant — the copy word ("Participant" in code). |
| Poderator | A pod's shepherd / facilitator ("shepherd" in the UI). |
| Learning Log | The weekly practice ritual (formerly the "pulse check"). |
| Demo Day | The W12 showcase where Project Teams present prototypes. |
| Not an LMS | Never "course," "class," "student," "lesson," or "module." |
