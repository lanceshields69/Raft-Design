---
name: Raft Design
colors:
  bg-canvas: "#04220F"
  bg-surface: "#2E4034"
  bg-elevated: "#102A1B"
  bg-brand: "#3DE83D"
  bg-sunken: "#02190A"
  text-primary: "#EDF2EE"
  text-muted: "#8FA396"
  text-accent: "#3DE83D"
  border-rule: "#1E3A28"
  border-button: "#3DE83D"
  border-bright: "#438259"
  accent-ink: "#0B1F14"
theme:
  light:
    bg-canvas: "#F7FFF7"
    bg-surface: "#EBF7EB"
    bg-elevated: "#EBF7EB"
    text-primary: "#000000"
    text-accent: "#159845"
    border-rule: "#CFE5D7"
    border-button: "#159845"
    bg-sunken: "#EAFFEA"
    border-bright: "#A9C7B4"
typography:
  fontStacks:
    en: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    ja: "'Inter', 'Noto Sans JP', sans-serif"
    emphasis-en: "'Fraunces', serif"
    emphasis-ja: "'Noto Serif JP', serif"
  tracking:
    display: -2px
    heading: 0
    body: 0
    eyebrow: 0.52px
    section-title: 1px
    ja: 0
  eyebrow:
    fontFamily: Inter
    fontSize: 0.8125rem
    lineHeight: 0.86
    letterSpacing: var(--tracking-eyebrow)
    weight: 900
  label-small:
    fontFamily: Inter
    fontSize: 0.6875rem
  label-medium:
    fontFamily: Inter
    fontSize: 0.75rem
    lineHeight: 1.25rem
    weight: 500
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    lineHeight: 1.75rem
  heading-3:
    fontFamily: Inter
    fontSize: 1.5rem
    weight: 900
  heading-2:
    fontFamily: Inter
    fontSize: 1.75rem
    weight: 900
    lineHeight: var(--line-height-heading-large)
  heading-1:
    fontFamily: Inter
    fontSize: 2.25rem
    weight: 900
  display:
    fontFamily: Inter
    fontSize: 4.5rem
    weight: 900
    letterSpacing: var(--tracking-display)
    textTransform: uppercase
  emphasis:
    fontFamily: Fraunces
    fontStyle: italic
    weight: 600
  logotype-ja:
    fontFamily: Noto Sans JP
spacing:
  xs: 4px
  sm: 8px
  gap-xs: 6px
  md: 16px
  container-xs: 12px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 60px
  huge: 96px
rounded:
  sm: 2px
  md: 4px
  pill: 999px
weights:
  regular: 400
  medium: 500
  semibold: 600
  bold: 700
  black: 900
components:
  button-primary:
    padding: "20px 30px"
    border: "1px solid var(--border-button)"
    radius: pill
    hoverBg: bg-brand
    hoverText: accent-ink
  card:
    background: bg-elevated
    border: "1px solid var(--border-rule)"
    radius: md
    padding: lg
  status-badge:
    radius: pill
    padding: "space-xs space-12"
    border: "1px solid, color-matched to status"
  stat-value:
    fontFamily: Fraunces
    weight: semibold
    variationSettings: "'SOFT' 0, 'WONK' 1"
    color: text-accent
    note: "Shared spec across journal.css's stat-bar-value and project.css's project-metric-value — same component, two contexts."
---

## Overview

Raft Design's system reads as editorial-technical: a deep forest-green canvas with a single acid-lime accent, built for a bilingual EN/JP AI-native studio that has to feel credible in both Silicon Valley and Tokyo design contexts at once. Dark mode is the default. Light mode is a full parallel palette, not an inverted filter.

## Colors

The palette is rooted in a near-black forest green with one high-signal accent.

- **Canvas (`--bg-canvas`, #04220F):** The page background in dark mode, and the same value used for the wordmark's dark logo state. This dual role is intentional, the canvas and the logo's dark half are meant to be the same green.
- **Brand (`--bg-brand` / `--text-accent`, #3DE83D):** The one accent color in the system. Solid fills on chips and filled buttons, and doubles as link/accent text color. It does not shift between themes, it's the one constant.
- **Surface (`--bg-surface`, #2E4034):** Small UI chrome only, the theme toggle pill, the community strip background on the Tools page. Not a general-purpose card background.
- **Elevated (`--bg-elevated`, #102A1B):** Cards, modals, panels. Distinct from surface, reads as "content sitting above the canvas."
- **Sunken (`--bg-sunken`, #02190A):** Recessed panels, darker than canvas itself. Used sparingly (e.g. the scan-banner card on the Tools page).
- **Text primary (`--text-primary`, #EDF2EE):** Off-white, deliberately never pure white. Body copy.
- **Text muted (`--text-muted`, #8FA396):** Labels, captions, metadata. Constant across both themes.
- **Accent ink (`--accent-ink`, #0B1F14):** The text color that sits on top of brand-green fills, e.g. button hover states. Constant across themes because it always needs to sit on the same green.

Light mode swaps canvas to a near-white green tint (#F7FFF7) and shifts the accent to a darker green (#159845) for contrast, everything else in the system (spacing, type, radius) stays identical between themes.

One small, deliberate exception: form validation error text (`.contact-modal-field-error`) uses its own untokenized reds (#FF8A80 dark mode, #C62828 light mode), not the brand palette. Semantically correct, error states shouldn't route through brand green, but worth tokenizing as `--color-error` / `--color-error-light` if a second error-state component ever gets built, right now it's a one-off.

## Typography

Inter carries the entire system at weight 900 for anything that reads as a heading, with optical sizing and `cv11` kerning turned on to keep heavy weights from muddying. Two typefaces break from Inter for specific, load-bearing reasons, not decoration:

- **Fraunces (SemiBold, upright, `'SOFT' 0, 'WONK' 1'`):** Used for `.emphasis` (the italic accent in hero copy) and, as of this pass, for stat values, `.stat-bar-value` in journal.css and `.project-metric-value` in project.css both share this exact spec now, confirmed as one real shared component pattern, not a coincidence. This replaced Lora, which was corrected against Figma's "Stats/Small" style and confirmed live on the article template's Google Fonts import.
- **Noto Sans JP:** The default body/heading typeface on all Japanese pages, see the Bilingual section below.

The type scale runs from `--font-size-label-small` (11px) up to `--font-size-display` (72px). `--line-height-heading-large` (36px) was added and confirmed this pass, reused identically across `.journal-card-title` and `.stat-bar-value` in two separate Figma files (232:4846 and 231:3476), a real cross-file match, not a guess.

**Tracking (letter-spacing) is now a resolved two-role system.** `--tracking-eyebrow` (0.52px) is reserved for pill/badge components with a background, `.section-label`, `.journal-carousel-badge`, `.tool-card-tag`, `.tool-card-verdict-label`. `--tracking-section-title` (1px) covers plain uppercase field labels with no pill, `.project-section-label`, `.article-eyebrow`, `.project-bottom-nav`. What first looked like recurring drift, the same Figma value showing up independently across three separate files and pulls, turned out to be a real second token: consistent value, consistent Figma variable name (`tracking-section-title`), and a consistent, distinct usage pattern (flat labels vs. pilled ones). Confirmed and applied across `styles.css`, `project.css`, and `journal.css`.

Separately, `work-hero-title`'s display tracking (-2px) was evaluated against a conflicting Figma value (-1px, bound to a mislabeled variable also called "tracking-eyebrow" in Figma despite sitting on a 72px display heading). This was a different, unrelated conflict, not the same issue as above. -2px was kept, independently confirmed live in both `work-index.css` and `tools.css`, the mislabeled Figma binding was judged stale.

## Spacing & Radius

Spacing runs an 8-point-ish scale from `--space-xs` (4px) to `--space-huge` (96px), with two odd insertions, `--space-6` and `--space-12`, added for the Tools page's status badges and tags, where the standard scale didn't have a fitting value. Convention: when a new component needs a spacing value the scale doesn't have, name the exact pixel value as a new token rather than force-fit an existing one.

Radius has three tokens: `--radius-sm` (2px), `--radius-md` (4px), `--radius-pill` (999px). Buttons and badges use pill, cards use md. Circular elements (avatars, status dots) use a raw `50%`, this is fine as-is, `50%` isn't really a fourth step on the radius scale, it's a distinct pattern that only makes sense on square elements.

## Bilingual System (EN/JA)

This is a first-class part of the design system, not a translation layer bolted on after the fact. `ja.css` loads after `styles.css` on every Japanese page and never edits it directly, same override discipline as `build.css`.

**Typeface swap.** English pages run Inter alone. Japanese pages run `'Inter', 'Noto Sans JP', sans-serif'`, Noto Sans JP picking up anywhere Inter has no glyph. Almost every text-bearing selector on the site gets explicitly re-pointed to Noto Sans JP on JA pages rather than relying on font-stack fallback alone, this is deliberate, it guarantees CJK-appropriate metrics (line height, character spacing) rather than whatever Inter's fallback behavior happens to produce.

**Fraunces has no Japanese glyphs.** `.emphasis` substitutes `'Noto Serif JP', serif'` at weight 900 on Japanese pages, same accent color, same role, different typeface entirely because there's no other option. This is the one place the EN/JA system requires a full typeface swap rather than a metric adjustment.

**Letter-spacing goes to zero.** Every heading-scale selector gets `letter-spacing: 0` on JA pages. Negative tracking is a Latin-script convention, tightening the space between characters that have varying width. Japanese sits on a fixed em-square per character, so negative tracking doesn't compress anything, it just adds awkward, inconsistent gaps. This is a hard rule, not a preference: any new heading-scale component needs this reset added to `ja.css` when it ships.

**Line-height opens up.** Two tiers, both looser than the English equivalents:
- Headings: `line-height: 1.5` (vs. Inter's tighter heading defaults)
- Body copy: `line-height: 1.9` (vs. `--line-height-body`'s 24px/16px ≈ 1.5)

Japanese characters are visually denser per line than Latin text at the same point size, more strokes packed into the same em-square, so they need more vertical breathing room to stay readable at the same reading speed.

**Line-breaking: default word-break, not `keep-all`.** This was tested and deliberately reversed. `word-break: keep-all` only recognizes break opportunities at whitespace, and Japanese has no whitespace between words, so `keep-all` forced every clause onto its own line regardless of container width, nothing like natural Japanese typesetting. Default `word-break` (normal) already follows correct CJK line-breaking rules, wrapping between characters the way native Japanese text should. The only addition kept is `overflow-wrap: anywhere` as a safety net for mixed runs, Latin product names strung together with Japanese punctuation and no spaces (e.g. brand names joined by 、) that would otherwise overflow their column by hundreds of pixels.

**What deliberately stays in English, even on JA pages:**
- Primary nav (Approach / Expertise / Projects / Build / Studio / Journal / Contact)
- Hero titles that function as page labels rather than sentences: `.work-hero-title` ("Journal", "Projects"), `.tools-hero-title` ("AI Tools")
- Most `.section-label` pills (Approach, Expertise, Studio), these stay Roman because the words themselves are being used as a design element, not translated content

**What switches to real Japanese content, not just font:**
- FAQ section-label pill (よくある質問)
- Tools page section-label pills (稼働中 / グレイブヤード), these override the sitewide "`.section-label` stays Inter" rule specifically, because unlike Approach/Expertise/Studio, this pill's text is genuinely Japanese, not a kept-English label

**Page-width tuning, case by case.** `.stats-intro-text`'s max-width was tuned in English (325px) but needed 380px in Japanese, "プリンシパルデザイナー" alone runs just over the English measure and wraps mid-word without the extra room. This is the kind of fix that has to be checked per-component when a translated string is meaningfully longer or shorter than its English source, not something a single global rule can catch.

## Known Gaps

This section exists because a design system file that pretends everything is finished is more dangerous to an AI agent than one that's honest about drift, a tool that trusts a token that isn't actually followed will confidently generate the wrong thing.

**Three flagged content-vs-Figma mismatches in `project.css`, still need a human call, not a code fix:**
- `.project-title`'s `margin-bottom` was tightened to 4px in an earlier pass "per Figma," this pass's pull shows 16px instead. Left at 4px since the earlier correction was deliberate, not obviously wrong.
- `.project-challenge` / `.project-solution` labels: this pass's Figma frame shows short uppercase labels matching `.project-section-label`, but the current CSS (and an earlier, explicit Figma-sourced correction) uses full descriptive sentences instead. The Figma frame in question still shows the pre-rebrand nav and logo, likely the Figma file itself is stale here, not the code. Worth confirming which one is source of truth before touching this again.
- `.project-subtitle` vs `.project-tension`: this pass's Figma pull shows one green accent line under the project title, unclear whether it maps to the subtitle field or the tension field, both exist in the codebase and only one is confirmed correct. Left unchanged rather than guess.

**Typography tokens are not fully retroactive.** journal.css moved from 2 tokenized declarations to 16, real progress, but 11 raw px values remain, including `.article-title`'s 48px, which sits in a genuine scale gap (between `--font-size-heading-1` at 36px and `--font-size-display` at 72px) and is still marked "one-off, not tokenized" rather than promoted to a real token.

**Border-radius drift, unchanged since the last audit.** `50%` (circles, expected), `99px` (theme-toggle, should be `--radius-pill`), `3px` (nav-hamburger), and two instances of `2px` (badges, should be `--radius-sm`) are still hardcoded outside the token system.

**Color tokenization remains fully resolved** for the brand palette, zero hardcoded hex outside `:root` for any canvas/surface/text/border/accent value. The one exception is the untokenized error-red pair noted above, a deliberate, isolated case, not drift.

## Components

- **Button (`.scan-cta`):** Pill radius, 20px/30px padding, transparent background with a brand-colored border, inverts to solid brand-green fill with ink-colored text on hover.
- **Card (`.tool-card`):** Elevated background, rule-colored 1px border, md radius, lg padding, content stacked in a column with a verdict block pinned to the bottom via `margin-top: auto`.
- **Status badge (`.status-badge`):** Pill-shaped, color-coded by status (stack / rotation / watching / overhyped / dropped), each with a matching dot, background tint, and border, defined as a dedicated token block scoped to the Tools page rather than the sitewide palette.
- **Stat value (`.stat-bar-value` / `.project-metric-value`):** Fraunces SemiBold, brand-green, confirmed as one shared component spec across journal and project pages rather than two independently-built lookalikes.
