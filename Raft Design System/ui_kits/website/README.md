# Website UI kit — raftdesign.studio

Click-through recreation of the live site, built from the source repo's HTML/CSS (`index.html`, `styles.css`, `work-index.css`, `journal.css`, `tools.css`), not from screenshots.

| File | Surface | Source |
| --- | --- | --- |
| `index.html` | App shell: nav routing, theme state, contact modal, image lightbox | `index.html` + the theme/menu scripts in it |
| `Home.jsx` | Homepage: hero lockup, Approach, Expertise, Projects, Studio + awards, Design Intelligence banner, Journal carousel, FAQs, Connect | `index.html`, `styles.css`, `journal.css` |
| `ProjectsIndex.jsx` | /work/ — 2-up work grid under the 72px hero | `work/index.html`, `work-index.css` |
| `JournalIndex.jsx` | /journal/ — 2-up article grid with excerpts | `journal/index.html`, `journal.css` |
| `ToolsPage.jsx` | /tools/ — community strip, Active grid, Graveyard list, contribute CTA | `tools/index.html`, `tools.css` |
| `ContactModal.jsx` | Contact modal with the site's three fields and success state | `index.html` contact modal + `styles.css` |

## What works
Nav links route between Home / Projects / Journal / AI Tools; Contact opens the modal (submitting shows the real success banner); the theme toggle flips the whole palette including the client-logo swap; project thumbnails open a lightbox.

## Deliberately omitted
The Vimeo reel iframe, the mobile hamburger overlay, the Design Intelligence Engine iframe (it points at an external tool), and the Build section's full copy block are out of scope here — the Build section reuses `ServiceCard`, already shown in the Expertise section. Project images stand in from the assets copied into this project; the live site's per-project photography is not fully mirrored.
