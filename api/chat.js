const Anthropic = require('@anthropic-ai/sdk');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');
const { z } = require('zod');
const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');
const SYSTEM_PROMPT = require('./system-prompt.js');

// Sonnet 5, not Opus: this is well-defined, grounded, high-frequency work
// (the bot draws entirely from the system prompt, not model knowledge, so
// the knowledge-cutoff gap between tiers doesn't matter here) on a public,
// rate-limited endpoint where the ~2.5x cost difference is a direct cost
// lever. Sonnet is the recommended default for this shape of task.
const MODEL = 'claude-sonnet-5';
const MAX_HISTORY_MESSAGES = 20;

// Matches the "Grounding: Projects" table in raft-chatbot-system-prompt.md
// verbatim — keyed by the exact "Project" column string the model is told
// to echo back. Resolving cards server-side (rather than trusting the model
// to output image paths/URLs directly) means a hallucinated or malformed
// name is just dropped, never a broken card.
const PROJECT_MAP = {
  "LegalOn's AI Brand Platform": {
    image: 'images/legalon-3.webp',
    url: '/projects/legalon/',
    subtitle: 'Unified brand lockup across seven products under one identity',
  },
  'Adobe Express Photos': {
    image: 'images/Harmony-thumbnail-01.webp',
    url: '/projects/adobe-express-photos/',
    subtitle: '0-to-1 AI-powered desktop image editor',
  },
  "Walmart's AI-First Shopping Experience": {
    image: 'images/walmart-3.webp',
    url: '/projects/walmart/',
    subtitle: 'AR room scan, conversational search, AR TV comparison',
  },
  'Adobe Express Enterprise Platform': {
    image: 'images/express-hero.jpg',
    url: '/projects/adobe-express-enterprise/',
    subtitle: 'Add-on marketplace and partner integrations',
  },
  'Modere eCommerce': {
    image: 'images/modere-1.webp',
    url: '/projects/modere/',
    subtitle: 'Bilingual storefront, anti-aging serum product page',
  },
  'Modular Suite for XD': {
    image: 'images/modular-hero.jpg',
    url: '/projects/modular-suite-xd/',
    subtitle: 'Adobe XD plugin, theme system for landing pages',
  },
};

// Matches the "Grounding: Philosophy" section's essay titles verbatim —
// same resolve-server-side-from-a-known-title pattern as PROJECT_MAP, for
// the same reason: the model names which essay, never the URL itself.
const JOURNAL_MAP = {
  'Stop Adding AI to the Design Process. Re-engineer It.': {
    url: 'https://upstreamjournal.substack.com/p/stop-adding-ai-to-the-design-process',
  },
  'The AI-Native Designer Was Only Phase One': {
    url: 'https://upstreamjournal.substack.com/p/the-ai-native-designer-was-only-phase',
  },
  'Stop Treating AI Like Cheating on Your Homework: A Playbook for AI-Native Design Teams': {
    url: 'https://upstreamjournal.substack.com/p/stop-treating-ai-like-cheating-on',
  },
  'Why I Built a Raft, Not a Ship': {
    url: 'https://upstreamjournal.substack.com/p/why-i-built-a-raft-not-a-ship',
  },
  'How I Use AI': {
    url: 'https://upstreamjournal.substack.com/p/how-i-use-ai',
  },
  'Designing for Awareness: How Multimodal AI Is Reshaping the Future of Interaction': {
    url: 'https://upstreamjournal.substack.com/p/designing-for-awareness-how-multimodal',
  },
};

const ResponseSchema = z.object({
  reply: z.string(),
  chips: z.array(z.string()).min(3).max(4),
  cta: z.boolean(),
  projects: z.array(z.string()).max(3),
  journal: z.array(z.string()).max(1),
  summary: z.object({
    working_on: z.string(),
    blocker: z.string(),
    looking_for: z.string(),
  }),
});

function resolveProjects(names) {
  if (!Array.isArray(names)) return [];
  return names
    .map((name) => (PROJECT_MAP[name] ? Object.assign({ name }, PROJECT_MAP[name]) : null))
    .filter(Boolean);
}

function resolveJournal(titles) {
  if (!Array.isArray(titles)) return [];
  return titles
    .map((title) => (JOURNAL_MAP[title] ? Object.assign({ title }, JOURNAL_MAP[title]) : null))
    .filter(Boolean);
}

// summary is null, not a blank {working_on:'',...} object, on both fallback
// replies below — the frontend does `data.summary || state.lastSummary` to
// carry the last real summary forward across turns, and a blank object is
// truthy, so it would silently overwrite a real accumulated summary with
// nothing the moment a visitor hit a rate limit or a server error.
const RATE_LIMIT_REPLY = {
  reply: "Getting a lot of questions right now. Try again in a bit, or reach Lance directly.",
  chips: ['Show me the work', 'What does Raft actually do?', 'I have a project in mind'],
  cta: true,
  projects: [],
  journal: [],
  summary: null,
};

const ERROR_REPLY = {
  reply: "Something's not working on my end right now. Worth reaching Lance directly in the meantime.",
  chips: ['What does Raft actually do?', 'Show me the work', 'I have a project in mind'],
  cta: true,
  projects: [],
  journal: [],
  summary: null,
};

let anthropic = null;
function getAnthropicClient() {
  if (!anthropic) anthropic = new Anthropic();
  return anthropic;
}

let ratelimit = null;
function getRatelimit() {
  if (ratelimit) return ratelimit;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, '1 h'),
    prefix: 'raft-chat',
  });
  return ratelimit;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content }));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    res.status(400).json({ error: 'message is required' });
    return;
  }
  const history = sanitizeHistory(body.history);

  const limiter = getRatelimit();
  if (limiter) {
    const ip = getClientIp(req);
    const { success } = await limiter.limit(ip);
    if (!success) {
      // Status stays 200 so the chat UI renders this as a normal in-character
      // reply (never a raw error state) — but abuse/monitoring tooling that
      // greps function logs or checks headers, rather than status codes,
      // can still see this happened.
      console.warn('raft-chat rate limit hit:', ip);
      if (typeof res.setHeader === 'function') res.setHeader('X-RateLimit-Blocked', '1');
      res.status(200).json(RATE_LIMIT_REPLY);
      return;
    }
  }

  try {
    const client = getAnthropicClient();
    const isFirstTurn = history.length === 0;
    // The Voice section's "no em dashes" rule is easy to lose track of over
    // a long system prompt — reinforced every turn, not just first-turn,
    // since it's a per-reply style constraint, not session-scoped.
    let system = SYSTEM_PROMPT + '\n\n---\n\nReminder: never use an em dash (—) anywhere in your reply, per the Voice section above. If a sentence wants one, restructure it with a period, comma, or "and" instead.';
    if (isFirstTurn) {
      system += '\n\nThis is also the first user message of a new session. The interface has already shown the "Call me Ishmael" greeting to the visitor — do not reproduce it, any variant of it, or a reference to "the narrator" yourself. Answer the visitor\'s message directly, exactly as you would on any later turn.';
    }
    const response = await client.messages.parse({
      model: MODEL,
      // Sonnet 5's adaptive thinking draws from this SAME budget, not a
      // separate one — confirmed by reproduction: a long/hard prompt (a
      // multi-part Japanese question) hit thinking_tokens: 2000/2000 against
      // the old max_tokens: 2000 ceiling, leaving zero room for the actual
      // reply and producing null parsed_output or a truncated, invalid JSON
      // string mid-generation (in one case a thrown "Unterminated string in
      // JSON" error). Under lighter versions of the same pressure, the model
      // can visibly race/self-correct inline within the reply string as it
      // runs out of room, which is the "scratchpad narration leaking into
      // the reply" bug this was raised for. 8000 gives real headroom for
      // both — the same hard prompt used up to ~2600 thinking tokens plus
      // its actual reply at max_tokens: 6000 with zero failures across 3
      // reruns; this is just a ceiling, not a spend floor, so a generous
      // value costs nothing when a simple reply only needs a few hundred.
      max_tokens: 8000,
      system,
      messages: [...history, { role: 'user', content: message }],
      output_config: {
        format: zodOutputFormat(ResponseSchema),
      },
    });

    if (!response.parsed_output) {
      res.status(200).json(ERROR_REPLY);
      return;
    }

    const out = response.parsed_output;
    out.projects = resolveProjects(out.projects);
    out.journal = resolveJournal(out.journal);
    res.status(200).json(out);
  } catch (err) {
    console.error('raft-chat /api/chat error:', err);
    res.status(200).json(ERROR_REPLY);
  }
};
