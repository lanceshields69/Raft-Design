# Raft Design site

Static HTML site deployed on Vercel. Merging to main deploys to production.

## Keeping the AI-readable files in sync

When you change content on any page listed in /llms.txt (services, offers, pricing, work, about, contact, FAQ), update /llms.txt, /ai.md and /ja/ai.md in the same commit, keep facts identical across all three, and update their Last updated dates. If a change can't be reflected without a judgment call, flag it in your summary instead of guessing.

## Telling search engines about changes

After a deploy that changes page content, remind Lance to run `node scripts/indexnow.js` with the changed paths (for example `node scripts/indexnow.js /ai.md /about/`). Run it only after the deploy is live, because the script checks that the key file is reachable first. Do not run it without asking, since it submits URLs to external search engines.

## Shared content for human and terminal pages

The AI-Ready Design Systems page renders from one content file, `content/design-system.json`, into four outputs: the human pages (`/design-system/`, `/ja/design-system/`) and their terminal versions (`/ai/design-system/`, `/ja/ai/design-system/`).

- The JSON holds `facts` (shared by both languages: links, tool names, project names and URLs, pricing status) and `en` / `ja` (headlines, body copy, labels, meta). Layout, styles, animation and components stay hand-authored in the HTML.
- In the human pages, only text between `<!--c:key-->` and `<!--/c-->` markers, attributes tagged `data-c-href` / `data-c-content`, the `<title>`, and the `<!--c:block:…-->` JSON-LD block come from the JSON. Keys starting with `@` read from `facts`.
- The terminal pages are rendered in full by one template in `build-pages.js`, which borrows the styles, scripts, logo, nav, footer and toggle from `/ai/index.html` and `/ja/ai/index.html` (read only, never written). Only the `/ai/` home page uses the animated logo morph; terminal subpages get the static ASCII logo with occasional glitch bursts from `ai/logo-glitch.js` and `ai/logo-glitch.css`, which the template adds. Terminal titles follow `Raft Design: <page name>` on EN (built from `meta.offer_name`, so new pages get it automatically) and `<page>｜Raft Design` on JA (written in `terminal.title`). They carry `noindex`, stay out of `sitemap.xml`, and are not blocked in `robots.txt`.
- After editing `content/*.json`, run `node build-pages.js` and commit the regenerated HTML. `node build-pages.js --check` exits 1 if any output is out of date. Vercel has no build step, so the committed HTML is what ships.
- Never hand-edit text inside markers. The next build overwrites it. Edit the JSON instead. Markup outside the markers can be edited by hand as before.

To add the next page (the Design Foundation Sprint is next): create `content/design-foundation.json`, wrap the page's text in markers (keys in document order, same scheme as the design system page), add an entry to `PAGES` in `build-pages.js` with its own terminal render function, add the human/AI toggle to the page pointing at its terminal URL, then run the build and confirm the human page's visible text is unchanged.

`ai.md`, `ja/ai.md` and `llms.txt` are still written by hand (they are part of a 60-day indexing test that started 2026-10-18). Later, their per-offer sections could be generated from the same JSON files so facts cannot drift.
