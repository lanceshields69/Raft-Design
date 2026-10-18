# Raft Design site

Static HTML site deployed on Vercel. Merging to main deploys to production.

## Keeping the AI-readable files in sync

When you change content on any page listed in /llms.txt (services, offers, pricing, work, about, contact, FAQ), update /llms.txt, /ai.md and /ja/ai.md in the same commit, keep facts identical across all three, and update their Last updated dates. If a change can't be reflected without a judgment call, flag it in your summary instead of guessing.

## Telling search engines about changes

After a deploy that changes page content, remind Lance to run `node scripts/indexnow.js` with the changed paths (for example `node scripts/indexnow.js /ai.md /about/`). Run it only after the deploy is live, because the script checks that the key file is reachable first. Do not run it without asking, since it submits URLs to external search engines.
