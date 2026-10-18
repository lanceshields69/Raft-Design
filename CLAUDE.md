# Raft Design site

Static HTML site deployed on Vercel. Merging to main deploys to production.

## Keeping the AI-readable files in sync

When you change content on any page listed in /llms.txt (services, offers, pricing, work, about, contact, FAQ), update /llms.txt, /ai.md and /ja/ai.md in the same commit, keep facts identical across all three, and update their Last updated dates. If a change can't be reflected without a judgment call, flag it in your summary instead of guessing.
