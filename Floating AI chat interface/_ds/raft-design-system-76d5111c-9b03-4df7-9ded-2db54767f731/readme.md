# Raft Design — Design System

Raft Design is a bilingual AI-native studio working across the U.S. and Japan on brand, product, and digital experience. It was founded by Lance Shields after twenty years of design leadership at Adobe and Walmart, plus brand and product work with LegalOn, Visa, Hitachi, and Red Bull. The studio's own words: hands-on, fast, and "built to move with change rather than around it."

The system reads as editorial-technical: a near-black forest-green canvas, one acid-lime accent, Inter Black for everything structural, and Fraunces italic for the few moments of warmth. Dark mode is the default. Light mode is a full parallel palette, not an inverted filter.

## Sources

- **GitHub repo (primary source of truth):** https://github.com/lanceshields69/Raft-Design — the live site's HTML and CSS. Worth exploring further: `styles.css` (tokens + homepage), `tools.css` (status badges, tool cards), `journal.css` (article + carousel), `work-index.css` (projects index), `project.css` (case-study pages), `ja/ja.css` (the Japanese overrides).
- **`DESIGN.md`** in that repo (also uploaded to `uploads/DESIGN.md`) — the studio's own machine-readable spec, including a candid "Known Gaps" section. Where this design system and DESIGN.md disagree, DESIGN.md wins.
- **`llms.txt`** in that repo — the studio's site map and positioning summary.
- **Live site:** https://raftdesign.studio/ (English) and https://raftdesign.studio/ja/ (Japanese).
- **Uploaded logo files:** `uploads/Logo-icon.png`, `uploads/RAFT-Logo.png`.
- Referenced but **not** accessible from here: the Figma files cited throughout the CSS comments (node ids like 232:4846, 231:3476, 144:1183). All values below come from the CSS, which those comments describe as the corrected, live source of truth.

## Products / surfaces

There is one product: the studio's own bilingual marketing site. Its surfaces are the homepage, the projects index and six case-study pages, the journal index and article template, and the AI Tools page. Each exists in English and Japanese. The Design Intelligence Engine is an external tool the site links to in an iframe modal, not a surface designed here.

## Content fundamentals

- **Voice:** plain, declarative, senior. Short sentences. Claims followed by the reason for the claim. No hype adjectives, no exclamation marks, no rhetorical questions except in FAQ headings and one CTA ("Ever wondered if your site is designed or built well?").
- **Person:** "we" for the studio ("We work with both"), "I" only where Lance speaks personally ("Connect with me to explore your project's potential", "Thanks — I'll get back to you soon"). Never "you're going to love" marketing address; "you" is used for the reader's situation ("get you where you need to go").
- **Casing:** sentence case for headings, body, and FAQ questions. UPPERCASE only for section-label pills, flat field labels (MY ROLE, OFFICE, CONTACT, SOCIAL), and the 72px hero titles. Status badge labels are lowercase ("core stack", "in rotation", "dropped").
- **Honesty as a device.** The AI Tools page publishes a "Graveyard" of dropped tools with reasons, and verdicts name downsides: "Downside is the sycophantic behavior", "The $20 plan runs out fast". DESIGN.md itself carries a "Known Gaps" section. Copy admits limits rather than hiding them.
- **Metaphor discipline.** The raft/water metaphor appears sparingly and only where it earns its place: "even as the water keeps changing", "water the rest of the industry hasn't learned to read yet", "Why I Built a Raft, Not a Ship". Never stretched into nautical puns.
- **Structure of a claim:** negation then correction. "The build is directed, not just delegated." "Meaning has to be rebuilt, not converted." "Design and prototype move together, not handed off in sequence." Use this sparingly — it is the house rhythm, not every sentence.
- **Numbers carry weight.** Stats appear as bare figures with a factual caption: "540M+ / Users and visitors interacted with our design in Walmart app".
- **No emoji.** Anywhere. The one recurring glyph is the arrow `→`.
- **Japanese is real content, not translation.** Nav labels, section pills, and page titles stay in English on purpose (they function as design elements); FAQ and Tools pills switch to genuine Japanese (よくある質問 / 稼働中 / グレイブヤード). Copy is rebuilt for the market, not converted.

## Visual foundations

**Color.** One accent. `--bg-brand` / `--text-accent` #3DE83D is the only saturated color in the sitewide palette, and it does not change between themes. Everything else is a value step of the same forest green: canvas #04220F, chrome #2E4034, elevated #102A1B, sunken #02190A, rule #1E3A28. Text is off-white #EDF2EE, never pure white; metadata is #8FA396. Text on green fills is always `--accent-ink` #0B1F14. Light mode swaps canvas to #F7FFF7 and darkens the accent to #159845 for contrast. The AI Tools page adds five status colors (lime, mint, periwinkle, amber, coral) — the only place other hues appear. Form validation red is the one deliberate exception to the brand palette.

**Type.** Inter carries the system, at weight 900 for anything that reads as a heading, with `font-optical-sizing: auto`, `'opsz' 32` and `cv11` kerning so the heavy weight doesn't muddy. Scale: 11 / 12 / 13 / 16 / 20 / 24 / 28 / 36 / 72px, plus two one-off literals the source deliberately left untokenized (48px article title, 105-128px hero display). Fraunces italic SemiBold with `'SOFT' 0, 'WONK' 1` is the emphasis face — accent words in the hero and every stat figure. Noto Sans JP is the logotype face and the default on Japanese pages. Tracking is a two-role system: 0.52px for pill/badge components, 1px for flat uppercase labels, -2px on 72px display headings, 0 everywhere else. On Japanese pages tracking is always 0 and line-height opens to 1.5 (headings) / 1.9 (body).

**Spacing and layout.** An 8-point-ish scale from 4 to 96px, with 6px and 12px minted specifically for badges and tags. Sections are full-width to a 1920px cap with 15px page gutters on the homepage and 32px on the Tools page; the Tools content column caps at 1200px, article bodies at 830px. Sections are separated by a single 1px `--border-rule` top border — no background changes, no cards-as-sections. Section-label pills carry a large 133px gap before their content on the homepage. Only the nav is fixed (sticky, 66px).

**Backgrounds.** Flat color. No gradients anywhere, no photographic page backgrounds, no repeating patterns or textures, no grain. Imagery appears as bounded content: 2000:1307 project crops, square 250px lime "badge" tiles holding animated SVG figures, and 280px carousel thumbnails with a 10% dark scrim. Photography is warm and human but always cropped into a rectangle; the illustration is flat vector on lime.

**Cards.** Elevated fill + 1px hairline rule border + 4px radius + 24px padding. No shadows exist in this system at all — depth comes from surface value and a border. The recessed CTA banner is the inverse: darker fill, brighter border, square corners.

**Radii.** 2px on labels, tags and the 250px badge tiles; 4px on cards, images, modals and video; 999px on buttons and badges; raw 50% on dots and avatars. (The source has a few known strays: 99px on the theme toggle, 3px on the hamburger.)

**Transparency and blur.** Used in exactly four places: the nav bar (85% canvas + 12px backdrop blur), modal scrims (50% black; 90-94% canvas for the fullscreen scan modal and lightbox), the 12% brand tint on success banners and status badges, and the translucent form input fill. Everywhere else is opaque.

**Motion.** Purposeful and mostly one-shot. Reveals use `clip-path: inset()` wipes at 0.33-0.6s on `cubic-bezier(0.65, 0, 0.35, 1)` — RAFT wipes in left-to-right, DESIGN right-to-left, headline lines and hero tags wipe in on load. Scroll fade-ins are 0.6s ease-out with a 20px translate. The client marquee is a 24s linear infinite scroll at 50% opacity. The lime badge tiles run long hand-keyed SVG animations with squash-and-stretch easing. Every animation is disabled under `prefers-reduced-motion`.

**Hover and press.** Hovers are 0.2s color or background transitions, never scale or lift. Links go muted → primary, or primary → accent green. The button inverts: transparent-with-green-border becomes solid green with ink text. Icon buttons darken from `--bg-surface` to `--border-rule`. Cards do not hover at all. There are no distinct press states in the source — no shrink, no darken.

**Borders and rules.** The hairline `--border-rule` does most of the structural work: section separators, card edges, list dividers, nav cell underlines, table-like rows. `--border-bright` appears only on sunken panels. Buttons use `--border-button`, which tracks the accent.

## Iconography

There is no icon font and no icon library in this codebase, and Raft doesn't use one. The system is:

1. **The arrow `→` (U+2192) as the house glyph.** It leads every CTA label, prefixes practice-area taglines, follows text links, and appears in nav and carousel controls. Always the literal character, colored `--text-accent` (or `--bg-brand` on the community strip). `←` is its counterpart in carousel controls.
2. **A handful of inline SVGs, hand-written, 1.67-1.83px stroke, round caps:** the moon/sun theme icons, the hamburger, the modal close X. Copied into `assets/` where they existed as files.
3. **Brand SVG figures**, not icons: `services-*.svg` (leg, circle, triangle, diamond), `thesis-*.svg` (laptop, girl, marquee, oddball), `origin-spear-*.svg`, `geometric.svg`. These are the animated contents of the lime badge tiles.
4. **Logo files:** `r-mark-dark.gif` / `r-mark-light.gif` (animated nav mark), `r-mark-logo.svg`, `r-mark-favicon.png`, plus the CSS-typeset RAFT/DESIGN wordmark (`LogoBlock`). Client marks ship as white PNGs with a `-black` twin for light mode.
5. **Product marks** for the colophon: `llm-anthropic.svg`, `llm-openai.svg`, `llm-lovable.svg`.
6. **No emoji, and no unicode characters used as icons** beyond the arrows and a `|` divider in the language switch.

Nothing here was drawn or substituted — every asset was copied from the source repo.

## Index

Root files:

- `styles.css` — the entry point consumers link. Imports only.
- `tokens/` — `fonts.css`, `colors.css`, `status.css`, `typography.css`, `spacing.css`, `radius.css`, `base.css`
- `guidelines/` — 19 foundation specimen cards (Colors, Type, Spacing, Brand)
- `assets/` — 71 files: logos, client marks, motif SVGs, animated tiles, article and project imagery
- `components/` — see below
- `ui_kits/website/` — the click-through recreation of raftdesign.studio (`README.md` inside)
- `thumbnail.html`, `SKILL.md`, `github.md`, `readme.md`

Components (all in `components/`, one `.jsx` + `.d.ts` + `.prompt.md` each):

- **core/** — `Button`, `SectionLabel`, `Eyebrow`, `Tag`, `StatusBadge`, `StatValue`, `TextLink`, `Card`
- **forms/** — `TextField`
- **content/** — `ToolCard`, `GraveyardRow`, `ServiceCard`, `WorkCard`, `JournalCard`, `FaqItem`
- **navigation/** — `NavHeader`, `ThemeToggle`, `SiteFooter`
- **marketing/** — `PageHero`, `LogoBlock`, `CtaBanner`, `CommunityStrip`, `ClientLogoMarquee`

Every component maps to a real class in the source CSS. The inventory stops where the source stops: there is no Select, Checkbox, Radio, Switch, Toast, Tooltip, Avatar, or Tabs in this system, because raftdesign.studio doesn't have them.

### Intentional additions

- `Eyebrow` — the source has three near-identical flat-label selectors (`.project-section-label`, `.article-eyebrow`, `.project-bottom-nav`); one component holds the 1px-tracking rule so new labels don't drift back onto the pill token.
- `Card` — a generic container standing in for `.tool-card`'s shell plus the `.scan-banner-box` recessed variant, so surfaces other than tool cards have something correct to sit in.

## Known gaps carried over from the source

DESIGN.md's own "Known Gaps" list still applies: three flagged Figma-vs-code mismatches on project pages, 11 untokenized px values in `journal.css` (including the 48px article title), and border-radius strays (99px theme toggle, 3px hamburger, 2px badges). Those are documented as-is, not silently "fixed" here.

Fonts load from Google Fonts, as they do on the live site — there are no self-hosted font binaries in the source repo, so none are shipped here. `--font-emphasis-ja` points at Noto Serif JP, which the Japanese pages use for emphasis text; it is requested from Google Fonts on those pages rather than declared as a local `@font-face`.
