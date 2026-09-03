# Build the live Raft chatbot ("Ishmael")

Rename the chatbot from "Raft Assistant" to **Ishmael** throughout the UI (header label, any references in code/comments). Keep the existing visual design, chat bubble styling, typing/thinking indicators, and layout as-is — this is a backend and behavior swap, not a redesign.

Note: the name is a Moby-Dick reference (the narrator, not the captain) — see the Identity section of the system prompt for the "Call me Ishmael" greeting behavior. This should read as a subtle, literary nod in the UI (e.g. header label just says "Ishmael," no explanation needed there) — the explanation lives in the chat behavior itself, not the chrome.

## What exists today
`/api/chat` currently doesn't exist — the frontend's `send()` function matches user input against a hardcoded `SCRIPT` array of ~7 canned Q&As and falls back to a generic reply otherwise. There's no live model behind it.

## What to build

### 1. Serverless function: `/api/chat.js`
- Calls the Anthropic Messages API server-side using `process.env.ANTHROPIC_API_KEY`
- System prompt is the full content of `raft-chatbot-system-prompt.md` (provided alongside this file) — use it in full, don't summarize or trim it
- Receives the user's message plus conversation history, returns the model's reply
- Response needs a structured shape, not just plain text: the reply text, plus a `chips` array (3-4 strings) for the suggested follow-up buttons, plus a `summary` object with three fields — `working_on`, `blocker`, `looking_for` (any can be empty string if that part of the conversation hasn't come up) — for the contact-form auto-fill (see #4)

### 2. Rate limiting
- Use `@upstash/ratelimit` and `@upstash/redis`, both already added as dependencies if not present
- Env vars `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are already set in Vercel (Production, and Development if testing locally)
- Limit by IP: something like 15 requests/hour per IP
- On limit exceeded, return a graceful in-character response rather than a raw 429 — something like "Getting a lot of questions right now. Try again in a bit, or reach Lance directly." — don't just surface an error state in the chat UI

### 3. Frontend swap
- Replace the `SCRIPT`-matching logic in `send()` with a `fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message, history }) })` call
- Keep all existing UI behavior: typing reveal, thinking-dots state, message bubbles, scroll behavior
- Render the returned `chips` array as the suggested-question buttons below the latest bot message, replacing whatever fixed chip set exists today
- "I have a project in mind" chip (whenever it appears) should behave exactly as it does today — triggering the contact flow — this label must stay exact since it's used as a trigger

### 4. Contact form auto-fill
- When the contact flow opens (via chip click, "Send a message" button, or the model surfacing it mid-conversation), pre-populate the message field using the `summary` object's three parts — "What you're working on," "What seems to be getting in the way," "What you're looking for" — as labeled lines or a lightly structured block, skipping any field that's empty
- The field must remain fully editable — the visitor can change or clear it before submitting
- Nothing about this should imply the conversation was already sent anywhere; only the actual form submission (existing Formspree/Notion flow) constitutes a real handoff
- The summary should stay short — a line or two per field, never a verbatim transcript dump

### 5. Testing
- Run locally with `vercel dev` (pulls env vars if the project is linked)
- Confirm: normal Q&A works, chips render and update contextually, rate limit triggers a graceful message after ~15 rapid requests, contact form auto-fills correctly and remains editable, fallback behavior triggers cleanly on out-of-scope questions (try asking about pricing or a competitor)
- Deploy to Vercel once local testing looks right

## Reference document
The complete system prompt, including all grounding content (FAQs, philosophy pillars with Journal links, the six projects, fallback rules, the clarifying-question behavior, contact-routing rules, easter eggs, scope boundaries, and the full chip pool/generation logic) is in `raft-chatbot-system-prompt.md`. Use it as the literal system prompt content — it's already been through several rounds of review and reflects exact intended behavior, not a draft to reinterpret.

## Explicitly out of scope for this pass
- Japanese language support (EN only for v1)
- Live RSS pull from Upstream — the Journal essay links are static/hardcoded for now
- Dynamic/contextual chip *generation* validation beyond what's in the system prompt — if a generated chip leads somewhere thin, the existing fallback behavior should handle it gracefully; no extra guardrail logic needed yet
- Any admin/analytics dashboard for chat transcripts — not requested yet

At the end of the session, summarize: what was built, what's working, and anything that needs a decision before deploy (e.g. if the Messages API response format needs adjusting to cleanly return the chips/summary structure alongside the reply).
