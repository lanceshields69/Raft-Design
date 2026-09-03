const Anthropic = require('@anthropic-ai/sdk');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');
const { z } = require('zod');
const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');
const SYSTEM_PROMPT = require('./system-prompt-ja.js');

// Same model choice and reasoning as the English endpoint (api/chat.js):
// grounded, well-defined work on a public rate-limited surface where the
// cost difference against Opus is a direct lever.
const MODEL = 'claude-sonnet-5';
const MAX_HISTORY_MESSAGES = 20;

// Matches the "Grounding: Projects" table in raft-chatbot-system-prompt-ja.md
// verbatim — keyed by the exact "Project" column string the model is told
// to echo back (project names stay in English/Roman lettering per site
// convention, so these keys are identical to PROJECT_MAP in api/chat.js;
// only the URL and subtitle differ, pointing at the /ja/ pages).
const PROJECT_MAP = {
  "LegalOn's AI Brand Platform": {
    image: '/images/legalon-3.webp',
    url: '/ja/projects/legalon/',
    subtitle: '7つのプロダクトを貫く一貫したグローバルアイデンティティ',
  },
  'Adobe Express Photos': {
    image: '/images/Harmony-thumbnail-01.webp',
    url: '/ja/projects/adobe-express-photos/',
    subtitle: '0→1のAIプロダクトデザイン',
  },
  "Walmart's AI-First Shopping Experience": {
    image: '/images/walmart-3.webp',
    url: '/ja/projects/walmart/',
    subtitle: 'AR室内スキャン、対話型検索、ARでのテレビ比較',
  },
  'Adobe Express Enterprise Platform': {
    image: '/images/express-hero.jpg',
    url: '/ja/projects/adobe-express-enterprise/',
    subtitle: '埋め込みSDKとプラグインエコシステム',
  },
  'Modere eCommerce': {
    image: '/images/modere-1.webp',
    url: '/ja/projects/modere/',
    subtitle: 'バイリンガルなストアフロント、アンチエイジング美容液の製品ページ',
  },
  'Modular Suite for XD': {
    image: '/images/modular-hero.jpg',
    url: '/ja/projects/modular-suite-xd/',
    subtitle: 'Adobe XDプラグイン、ランディングページ向けテーマシステム',
  },
};

// Matches the "Grounding: Philosophy" section's Japanese essay titles
// verbatim, keyed to the site's own hosted /ja/journal/ pages (not the
// English Substack links used by api/chat.js).
const JOURNAL_MAP = {
  'AIをデザインプロセスに追加するのはやめよう。再設計しよう。': {
    url: 'https://raftdesign.studio/ja/journal/stop-adding-ai-to-the-design-process/',
  },
  '船ではなく、いかだをつくった理由': {
    url: 'https://raftdesign.studio/ja/journal/why-i-built-a-raft-not-a-ship/',
  },
  'AIネイティブ・デザイナーは、フェーズ1にすぎなかった': {
    url: 'https://raftdesign.studio/ja/journal/ai-native-designer-phase-one/',
  },
  '私のAIの使い方': {
    url: 'https://raftdesign.studio/ja/journal/how-i-use-ai/',
  },
  '状況認識のためのデザイン：マルチモーダルAIがインタラクションの未来を変える': {
    url: 'https://raftdesign.studio/ja/journal/designing-for-awareness-how-multimodal/',
  },
  'AIを宿題のカンニングのように扱うのはやめよう：AIネイティブなデザインチームのためのプレイブック': {
    url: 'https://raftdesign.studio/ja/journal/stop-treating-ai-like-cheating-on-your-homework/',
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

const RATE_LIMIT_REPLY = {
  reply: '多くのご質問をいただいています。しばらくしてからもう一度お試しいただくか、Lanceに直接ご連絡ください。',
  chips: ['Raftは、実際に何をする会社ですか？', '実績を見せてください', '相談したいプロジェクトがあります'],
  cta: true,
  projects: [],
  journal: [],
  summary: { working_on: '', blocker: '', looking_for: '' },
};

const ERROR_REPLY = {
  reply: '現在、こちらの処理がうまくいっていないようです。お手数ですが、Lanceに直接ご連絡ください。',
  chips: ['Raftは、実際に何をする会社ですか？', '実績を見せてください', '相談したいプロジェクトがあります'],
  cta: true,
  projects: [],
  journal: [],
  summary: { working_on: '', blocker: '', looking_for: '' },
};

let anthropic = null;
function getAnthropicClient() {
  if (!anthropic) anthropic = new Anthropic();
  return anthropic;
}

// Separate rate-limit bucket from the English endpoint (distinct prefix) so
// usage on one language doesn't consume the other's budget for the same IP.
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
    prefix: 'raft-chat-ja',
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
      console.warn('raft-chat-ja rate limit hit:', ip);
      if (typeof res.setHeader === 'function') res.setHeader('X-RateLimit-Blocked', '1');
      res.status(200).json(RATE_LIMIT_REPLY);
      return;
    }
  }

  try {
    const client = getAnthropicClient();
    const isFirstTurn = history.length === 0;
    let system = SYSTEM_PROMPT;
    if (isFirstTurn) {
      system += '\n\nThis is also the first user message of a new session. The interface has already shown the greeting starting with "私のことは、イシュメールと呼んでください。" — do not reproduce it, any variant of it, or a reference to the narrator (語り手) yourself. Answer the visitor\'s message directly, exactly as you would on any later turn.';
    }
    const response = await client.messages.parse({
      model: MODEL,
      // Same shared thinking+output budget consideration as api/chat.js —
      // see that file's comment for the full reproduction/root-cause notes.
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
    console.error('raft-chat-ja /api/chat-ja error:', err);
    res.status(200).json(ERROR_REPLY);
  }
};
