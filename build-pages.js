#!/usr/bin/env node
/*
 * Shared-content builder for pages that have a human version and a terminal
 * (machine) version. Zero dependencies, same idea as build-journal.js.
 *
 * Source:  content/<page>.json  (facts shared by both languages + EN/JA text)
 * Writes:
 *   - the human pages, but ONLY the text between <!--c:key--> and <!--/c-->
 *     markers, attributes tagged data-c-href / data-c-content, the <title>,
 *     and blocks between <!--c:block:name--> and <!--/c:block-->. Layout,
 *     styles, animation and all other markup stay hand-authored.
 *   - the terminal pages, rendered in full from one template that borrows
 *     the visual system (styles, scripts, toggle, logo) from /ai/ and /ja/ai/.
 *
 * Usage:
 *   node build-pages.js          rebuild everything
 *   node build-pages.js --check  exit 1 if any output is out of date
 *
 * Marker keys starting with "@" read from "facts"; all others read from the
 * page language. Never hand-edit text inside markers: the next build
 * overwrites it. Edit content/*.json instead.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://raftdesign.studio';
const CHECK = process.argv.includes('--check');

const PAGES = [
  {
    content: 'content/design-system.json',
    human: { en: 'design-system/index.html', ja: 'ja/design-system/index.html' },
    terminal: { en: 'ai/design-system/index.html', ja: 'ja/ai/design-system/index.html' },
    render: renderDesignSystemTerminal,
    blocks: { 'service-jsonld': designSystemJsonLd },
  },
  {
    content: 'content/design-foundation.json',
    human: { en: 'design-foundation/index.html', ja: 'ja/design-foundation/index.html' },
    terminal: { en: 'ai/design-foundation/index.html', ja: 'ja/ai/design-foundation/index.html' },
    render: renderDesignFoundationTerminal,
    blocks: { 'service-jsonld': designFoundationServiceJsonLd, 'faq-jsonld': designFoundationFaqJsonLd },
  },
];

// The existing /ai/ pages supply the terminal visual system. They are read,
// never written.
const TERMINAL_SHELL = { en: 'ai/index.html', ja: 'ja/ai/index.html' };

// ---------------------------------------------------------------- helpers

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }

function escText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(s) { return escText(s).replace(/"/g, '&quot;'); }

// Looks a dotted path up in the content ("meta.title", or "@offers.0.price"
// for the shared facts). Language-keyed facts such as
// { "en": "/work/", "ja": "/ja/work/" } resolve to the page language.
function lookupPath(content, lang, key) {
  const fromFacts = key.startsWith('@');
  let cur = fromFacts ? content.facts : content[lang];
  for (const part of (fromFacts ? key.slice(1) : key).split('.')) {
    if (cur == null) break;
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  if (cur && typeof cur === 'object' && !Array.isArray(cur) && lang in cur) cur = cur[lang];
  return cur;
}

// "key|format" markers render a shared fact through a per-language template
// from content[lang].formats, e.g. "@offers.0.price|usd" gives "$28,000" in
// EN and "28,000米ドル" in JA, so every page shows the same number written
// the way its language writes it. Templates use {n} (a number or string) or
// {name} for object facts.
const GROUPED_FORMATS = ['usd', 'usd_mo'];
function formatValue(content, lang, fmt, value, key, file) {
  const tpl = content[lang].formats && content[lang].formats[fmt];
  if (typeof tpl !== 'string') throw new Error(`${file}: format "${fmt}" (used by "${key}") is missing from ${lang}.formats`);
  if (value && typeof value === 'object') {
    return tpl.replace(/\{(\w+)\}/g, (m, k) => {
      if (!(k in value)) throw new Error(`${file}: "${key}" has no "${k}" for format "${fmt}"`);
      return String(value[k]);
    });
  }
  const n = GROUPED_FORMATS.includes(fmt) && typeof value === 'number' ? value.toLocaleString('en-US') : String(value);
  return tpl.replace(/\{n\}/g, n);
}

function makeResolver(content, lang, file) {
  return function resolve(key) {
    const [pathKey, fmt] = key.split('|');
    let cur = lookupPath(content, lang, pathKey);
    if (fmt && cur != null) return formatValue(content, lang, fmt, cur, key, file);
    if (typeof cur === 'number') cur = String(cur);
    if (typeof cur !== 'string') {
      throw new Error(`${file}: marker "${key}" has no text value in the content file`);
    }
    return cur;
  };
}

function joiner(lang) { return lang === 'ja' ? '' : ' '; }

// ---------------------------------------------------------- human pages

function patchHuman(html, content, lang, file, page) {
  const resolve = makeResolver(content, lang, file);
  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(resolve('meta.title'))}</title>`);

  out = out.replace(/<!--c:block:([\w-]+)-->\n([\s\S]*?)<!--\/c:block-->/g, (m, name) => {
    const block = page.blocks && page.blocks[name];
    if (!block) throw new Error(`${file}: unknown block "${name}"`);
    return `<!--c:block:${name}-->\n${block(content, lang)}  <!--/c:block-->`;
  });

  let count = 0;
  out = out.replace(/<!--c:([@\w.|-]+)-->([\s\S]*?)<!--\/c-->/g, (m, key) => {
    count++;
    return `<!--c:${key}-->${escText(resolve(key))}<!--/c-->`;
  });

  out = out.replace(/<(a|meta)\b[^>]*\sdata-c-(href|content)="([^"]+)"[^>]*>/g, (tag, el, attr, key) => {
    const value = escAttr(resolve(key));
    const re = new RegExp(`(\\s${attr}=")[^"]*(")`);
    if (!re.test(tag)) throw new Error(`${file}: <${el}> tagged data-c-${attr} has no ${attr} attribute`);
    return tag.replace(re, `$1${value}$2`);
  });

  if (count === 0) throw new Error(`${file}: no <!--c:key--> markers found`);
  return out;
}

function designSystemJsonLd(content, lang) {
  const L = content[lang];
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: L.meta.offer_name,
    url: SITE + content.facts.pages.human[lang],
    description: L.meta.description,
    provider: { '@id': `${SITE}/#organization` },
    areaServed: content.facts.area_served,
  };
  if (lang === 'ja') node.inLanguage = 'ja';
  node.audience = { '@type': 'Audience', audienceType: L.meta.audience };
  const body = JSON.stringify(node, null, 2).split('\n').map((l) => '  ' + l).join('\n');
  return `  <script type="application/ld+json">\n${body}\n  </script>\n`;
}

// ------------------------------------------------------ terminal template

function extractShell(lang) {
  const file = TERMINAL_SHELL[lang];
  const html = read(file);
  const grab = (re, what) => {
    const m = html.match(re);
    if (!m) throw new Error(`${file}: could not find ${what} for the terminal template`);
    return m[0];
  };
  // Asset paths in /ai/ ("./x", "../x") are relative to the shell page; the
  // terminal pages sit deeper, so resolve them to root-absolute paths.
  const shellDir = '/' + path.posix.dirname(file) + '/';
  const absolute = (s) => s.replace(/(src|href)="(\.{1,2}\/[^"]*)"/g,
    (m, attr, rel) => `${attr}="${path.posix.resolve(shellDir, rel)}"`);
  const head = html.slice(0, html.indexOf('</head>'));
  // Keep shared page styles; home-page logo and audio belong only on /ai/.
  const extraCss = [...head.matchAll(/<link rel="stylesheet" href="[^"]+">/g)]
    .map((m) => absolute(m[0]))
    .filter((l) => !['/machine-toggle.css', '/logo-morph.css', '/audio.css', '/edge-audio.css'].some((asset) => l.includes(asset)));
  const logo = grab(/<pre class="logo"[^>]*>[\s\S]*?<\/pre>/, 'logo')
    .replace(/\saria-hidden="true"/, ' aria-label="RAFT"');
  const logoSub = grab(/<p class="logo-sub"[^>]*>[\s\S]*?<\/p>/, 'logo subtitle');
  const logoDither = grab(/<div class="logo-dither"[^>]*><\/div>/, 'logo dither');
  return {
    fonts: grab(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>/, 'font link'),
    headScript: grab(/<script>\n\s*\/\/ Streamed-output effect[\s\S]*?<\/script>/, 'stream script'),
    style: grab(/<style>[\s\S]*?<\/style>/, 'style block'),
    extraCss: extraCss.join('\n  '),
    logo: `${logo}\n    ${logoSub}\n    ${logoDither}`,
    nav: grab(/<nav class="nav"[\s\S]*?<\/nav>/, 'nav'),
    foot: grab(/<div class="foot">[\s\S]*?<\/div>/, 'footer'),
    // Subpages get the static logo with glitch bursts from the shared
    // /ai/logo-glitch.js (added by the template), so drop the morph and any
    // inline copy of the glitch script the shell still carries.
    tail: absolute(html.slice(html.indexOf('</main>') + '</main>'.length, html.indexOf('</body>')))
      .replace(/\s*<!-- AI home soundtrack -->[\s\S]*?<!-- \/AI home soundtrack -->/g, '')
      .replace(/\s*<script src="\/ai\/(?:logo-morph|audio)\.js" defer><\/script>/g, '')
      .replace(/\s*<script src="\/edge-audio\.js" defer><\/script>/g, '')
      .replace(/\s*<script src="https:\/\/w\.soundcloud\.com\/player\/api\.js" defer><\/script>/, '')
      .replace(/\s*<script>\s*\/\/ Random glitch bursts on the pixel logo[\s\S]*?<\/script>/g, ''),
  };
}

// Terminal page titles. EN: "Raft Design: <page name>", derived from the page's
// meta.offer_name so every new page follows it. JA keeps the usual Japanese
// "<page>｜Raft Design" form, written per page in terminal.title.
function terminalTitle(L, lang) {
  if (lang === 'ja') {
    if (!L.terminal.title) throw new Error('ja terminal.title is required (format: "<page>｜Raft Design")');
    return L.terminal.title;
  }
  if (!L.meta || !L.meta.offer_name) throw new Error('meta.offer_name is required: the EN terminal title is built from it');
  return `Raft Design: ${L.meta.offer_name}`;
}

function rule(n, label) {
  const num = String(n).padStart(2, '0');
  const fill = '─'.repeat(Math.max(8, 96 - label.length));
  return `    <h2 class="rule" id="${label.toLowerCase().replace(/\s+/g, '-')}"><b>──[ ${num} ]──</b> ${escText(label)} ${fill}</h2>`;
}

function rows(items, link) {
  return items.map((it, i) => {
    const name = link ? `<a href="${escAttr(it.href)}">${escText(it.name)}</a>` : `<span>${escText(it.name)}</span>`;
    const meta = it.meta ? `<span class="leader"></span><span class="meta">${escText(it.meta)}</span>` : '';
    return `      <div class="row"><span class="n">${i + 1}</span>${name}${meta}</div>`;
  }).join('\n');
}

// The shared frame of every terminal page: head, language bar, logo, nav,
// summary chat, source line, footer and the human/AI toggle. A page supplies
// its own chat answer (`chat`) and sections (`body`).
function terminalDocument(content, lang, { contentFile, question, chat, body }) {
  const F = content.facts;
  const L = content[lang];
  const shell = extractShell(lang);
  const human = F.pages.human[lang];
  const here = F.pages.terminal[lang];
  const e = escText;
  const a = escAttr;

  const toggle = shell.tail.replace(
    /(<a class="hm-toggle-item" href=")[^"]*(")/,
    `$1${human}$2`
  );
  const foot = shell.foot.replace(/<a href="[^"]*">human version<\/a>/, `<a href="${a(human)}">human version</a>`);
  const langSwitch = lang === 'en'
    ? `<b aria-current="page">EN</b> | <a href="${F.pages.terminal.ja}" hreflang="ja" lang="ja">JP</a>`
    : `<a href="${F.pages.terminal.en}" hreflang="en" lang="en">EN</a> | <b aria-current="page">JP</b>`;

  return `<!DOCTYPE html>
<!--
  Machine version of ${SITE}${human}
  Rendered by build-pages.js from ${contentFile}, the same source as the
  human page. Do not edit by hand: edit the JSON and run node build-pages.js.
-->
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(terminalTitle(L, lang))}</title>
  <meta name="description" content="${a(L.terminal.description)}">
  <meta name="robots" content="noindex">
  <link rel="icon" type="image/png" href="/images/r-mark-favicon.png">
  <link rel="alternate" hreflang="en" href="${SITE}${F.pages.terminal.en}">
  <link rel="alternate" hreflang="ja" href="${SITE}${F.pages.terminal.ja}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${shell.fonts}
  <link rel="stylesheet" href="/machine-toggle.css">
  ${shell.headScript}
  ${shell.style}${shell.extraCss ? '\n  ' + shell.extraCss : ''}
  <link rel="stylesheet" href="/ai/logo-glitch.css">
</head>
<body>
  <main class="term">

    <div class="bar">
      <div class="bar-left"><span class="dot" aria-hidden="true"></span><span class="bar-path">raftdesign.studio${e(here.replace(/\/$/, ''))}</span></div>
      <div class="lang" role="group" aria-label="Language">${langSwitch}</div>
    </div>

${shell.logo}

    ${shell.nav}

    <section class="chat" aria-label="Summary">
      <div class="chat-head"><span>raft-assistant · ${e(here)}</span><span>status: <span class="accent">online</span> · human-reviewed</span></div>
      <div class="chat-body">
        <p class="msg-user">${e(question)}</p>
        <div class="msg-ai">
${chat}
        </div>
      </div>
    </section>
    <p class="muted" style="margin-top:16px">${e(L.terminal.source_line)} <a href="${a(human)}">→ ${e(human)}</a></p>

${body.replace(/\n+$/, '')}

    <p class="eof">/* EOF */</p>
    ${foot}
  </main>${toggle}  <script src="/ai/logo-glitch.js"></script>
</body>
</html>
`;
}

function renderDesignSystemTerminal(content, lang) {
  const F = content.facts;
  const L = content[lang];
  const J = joiner(lang);
  const human = F.pages.human[lang];
  const e = escText;
  const a = escAttr;

  const tags = [...L.hero.card.layers, ...L.hero.card.audiences]
    .map((t) => `<span class="tag">${e(lang === 'en' ? t.toLowerCase().replace(/\s+/g, '-') : t)}</span>`).join('');
  const tools = [...F.tools, L.tools.other].map((t) => `<span class="tag">${e(t)}</span>`).join('');

  const chat = `          <p><strong>${e(L.hero.headline.join(J))}</strong></p>
          <p>${e(L.hero.body)}</p>
          <p class="muted">${e(L.hero.card.tagline.join(J))}<span class="cursor" aria-hidden="true"></span></p>
          <div class="tags">${tags}</div>`;

  const body = `${rule(1, 'OFFER')}
    <dl class="kv">
      <dt>name</dt><dd>${e(L.meta.offer_name)}</dd>
      <dt>for</dt><dd>${e(L.meta.audience)}</dd>
      <dt>pricing</dt><dd>${e(L.offer.pricing)}</dd>
      <dt>included in</dt><dd><a href="${a(F.links.included_in_terminal[lang])}">${e(F.included_in_offer)}</a> · ${e(L.offer.included)}</dd>
      <dt>example</dt><dd><a href="${a(F.links.example_deck)}">${e(L.hero.cta_example)}</a></dd>
      <dt>human page</dt><dd><a href="${a(human)}">${e(SITE + human)}</a></dd>
    </dl>

${rule(2, 'THE SHIFT')}
    <p class="prompt">cat shift.md</p>
    <div class="out">
      <p class="accent"># ${e(L.shift.headline)}</p>
      <p style="margin-top:10px">${e(L.shift.body)}</p>
    </div>
${L.shift.stats ? `    <div class="stats" style="margin-top:16px">
${L.shift.stats.map((s, i) => {
    const f = F.stats[i];
    const fig = f.figure ? `<p class="stat-n">${e(f.figure)}</p>` : '';
    const src = f.source ? `<p class="stat-l"><a href="${a(f.source.url)}">${e(s.source_label)}</a></p>` : '';
    return `      <div class="stat">${fig}<p class="stat-l">${e(s.label)}</p>${src}</div>`;
  }).join('\n')}
    </div>
` : ''}    <div class="card" style="margin-top:16px">
      <h3>${e(L.shift.before.title)}</h3>
${L.shift.before.items.map((t) => `      <p><span class="muted">✕</span> ${e(t)}</p>`).join('\n')}
    </div>
    <div class="card">
      <h3>${e(L.shift.after.title.join(''))}</h3>
${L.shift.after.items.map((t) => `      <p><span class="accent">✓</span> ${e(t)}</p>`).join('\n')}
    </div>

${rule(3, 'WHAT WE BUILD')}
    <p class="prompt">ls /system</p>
    <div class="out">
      <p class="accent"># ${e(L.build.headline)}</p>
      <p style="margin-top:10px">${e(L.build.body)}</p>
      <div style="margin-top:12px">
${rows(L.build.items.map((it) => ({ name: it.name, meta: it.summary })))}
      </div>
    </div>

${rule(4, 'TEAMS')}
    <p class="prompt">ls /teams</p>
    <div class="out">
      <p class="accent"># ${e(L.teams.headline)}</p>
      <p style="margin-top:10px">${e(L.teams.body)}</p>
      <div style="margin-top:12px">
${rows(L.teams.items.map((it) => ({ name: it.name, meta: it.summary })))}
      </div>
    </div>

${rule(5, 'EXAMPLE')}
    <p class="prompt">cat raft-design-system.md</p>
    <div class="out">
      <p class="muted">// ${e(L.example.eyebrow)}</p>
      <p class="accent"># ${e(L.example.headline)}</p>
      <p style="margin-top:10px">${e(L.example.lead)}</p>
      <div style="margin-top:12px">
${rows(L.example.includes.map((t) => ({ name: t })))}
      </div>
      <p style="margin-top:12px"><a href="${a(F.links.example_deck)}">→ ${e(L.example.cta)}</a></p>
    </div>

${rule(6, 'TOOLS')}
    <p class="prompt">cat tools.md</p>
    <div class="out">
      <p class="accent"># ${e(L.tools.headline)}</p>
      <p style="margin-top:10px">${e(L.tools.body[0] + F.tools[0] + L.tools.body[1])}</p>
      <p style="margin-top:10px">${e(L.tools.agnostic.join(''))}</p>
      <div class="tags">${tools}</div>
    </div>

${rule(7, 'OUTCOMES')}
    <p class="prompt">cat outcomes.md</p>
    <div class="out">
      <p class="accent"># ${e(L.outcomes.headline)}</p>
      <p style="margin-top:10px">${e(L.outcomes.body)}</p>
      <div style="margin-top:12px">
${rows(L.outcomes.items.map((it) => ({ name: it.name, meta: it.summary })))}
      </div>
    </div>

${rule(8, 'RELATED WORK')}
    <p class="prompt">ls -l /work --related</p>
    <div class="out">
      <p class="muted">${e(L.related.body)}</p>
      <div style="margin-top:12px">
${rows(F.related.map((r, i) => ({ name: r.name, href: r.href[lang], meta: L.related.items[i] })), true)}
      </div>
      <p style="margin-top:12px"><a href="${a(F.links.all_work[lang])}">${e(L.related.view_all)}</a></p>
    </div>

${rule(9, 'CONTACT')}
    <p class="prompt">raft --connect</p>
    <div class="out">
      <p class="muted">// ${e(L.cta.eyebrow)}</p>
      <p class="accent"># ${e(L.cta.headline)}</p>
      <p style="margin-top:10px">${e(L.cta.body)}</p>
      <dl class="kv" style="margin-top:12px">
        <dt>email</dt><dd><a href="mailto:${a(F.email)}">${e(F.email)}</a></dd>
        <dt>book</dt><dd><a href="${a(F.links.contact[lang])}">${e(F.links.contact[lang].replace(/\/$/, ''))}</a></dd>
      </dl>
      <a class="cta" href="${a(F.links.contact[lang])}">${e(L.cta.button)} →</a>
    </div>
`;

  return terminalDocument(content, lang, { contentFile: PAGES[0].content, question: L.terminal.question, chat, body });
}

// ------------------------------------------------- Design Foundation Sprint

function ldScript(node) {
  const body = JSON.stringify(node, null, 2).split('\n').map((l) => '  ' + l).join('\n');
  return `  <script type="application/ld+json">\n${body}\n  </script>\n`;
}

// FAQ answers are a string, or an array of parts when the visible answer
// contains an inline link ("...ground up. <a>AI-Ready Design Systems</a> is for...").
function faqAnswer(item, lang) {
  return Array.isArray(item.answer) ? item.answer.join(joiner(lang)) : item.answer;
}

// The Offer prices come from facts.offers, the same values the visible price
// markers format, so the page text and the JSON-LD cannot disagree.
function designFoundationServiceJsonLd(content, lang) {
  const F = content.facts;
  const L = content[lang];
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: F.offer_name,
    url: SITE + F.pages.human[lang],
    description: L.schema.description,
    provider: { '@id': `${SITE}/#organization` },
    areaServed: F.area_served,
  };
  if (lang === 'ja') node.inLanguage = 'ja';
  node.audience = { '@type': 'Audience', audienceType: L.schema.audience };
  node.offers = F.offers.map((o, i) => {
    const offer = { '@type': 'Offer', name: o.name };
    if (o.unit) {
      offer.priceSpecification = { '@type': 'UnitPriceSpecification', price: String(o.price), priceCurrency: F.currency, unitText: o.unit };
    } else {
      offer.price = String(o.price);
      offer.priceCurrency = F.currency;
    }
    offer.description = L.schema.offers[i];
    return offer;
  });
  return ldScript(node);
}

function designFoundationFaqJsonLd(content, lang) {
  const items = content[lang].faq.items;
  return ldScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: faqAnswer(it, lang) },
    })),
  });
}

function renderDesignFoundationTerminal(content, lang) {
  const F = content.facts;
  const L = content[lang];
  const R = makeResolver(content, lang, 'content/design-foundation.json');
  const J = joiner(lang);
  const e = escText;
  const a = escAttr;
  const human = F.pages.human[lang];

  const price = (i) => R(`@offers.${i}.price|${F.offers[i].unit ? 'usd_mo' : 'usd'}`) + (F.offers[i].unit && L.pricing.land_expand.suffix ? L.pricing.land_expand.suffix : '');
  const billing = R('@billing|billing');
  const stepNames = L.steps.map((st) => st.name);
  const tags = stepNames.map((t) => `<span class="tag">${e(lang === 'en' ? t.toLowerCase() : t)}</span>`).join('');

  const chat = `          <p><strong>${e(L.hero.headline.join(J))}</strong></p>
          <p>${e(L.hero.body)}</p>
          <p class="muted">${e(L.hero.eyebrow)} · ${e(L.hero.audience)}<span class="cursor" aria-hidden="true"></span></p>
          <div class="tags">${tags}</div>`;

  let n = 0;
  const sections = [];
  const section = (label, html) => { n += 1; sections.push(`${rule(n, label)}\n${html}`); };

  section('OFFER', `    <dl class="kv" style="overflow-wrap:anywhere">
      <dt>name</dt><dd>${e(F.offer_name)}</dd>
      <dt>for</dt><dd>${e(L.hero.audience)}</dd>
      <dt>timeline</dt><dd>${e(R('@duration_weeks|duration'))}</dd>
      <dt>pricing</dt><dd>${F.offers.map((o, i) => `${e(L.pricing[['core', 'full', 'land_expand'][i]].name)} ${e(price(i))}`).join(' · ')}</dd>
      <dt>billing</dt><dd>${e(billing)}</dd>
      <dt>book</dt><dd><a href="${a(F.links.calendly)}">${e(F.links.calendly)}</a></dd>
      <dt>human page</dt><dd><a href="${a(human)}">${e(SITE + human)}</a></dd>
    </dl>`);

  if (L.problems) {
    section('PROBLEMS', `    <p class="prompt">cat problems.md</p>
    <div class="out">
      <p class="muted">// ${e(L.problems.label)}</p>
      <p class="accent"># ${e(L.problems.headline)}</p>
      <p style="margin-top:10px">${e(L.problems.lead)}</p>
${L.problems.items.map((it) => `      <p style="margin-top:10px"><span class="muted">✕</span> <strong>${e(it.title)}</strong> ${e(it.body)}</p>`).join('\n')}
      <p class="accent" style="margin-top:14px"># ${e(L.problems.outcome.headline)}</p>
${L.problems.outcome.items.map((it) => `      <p><span class="accent">✓</span> <strong>${e(it.name)}</strong> ${e(it.body)}</p>`).join('\n')}
    </div>`);
  }

  section('SCOPE', `    <p class="prompt">cat scope.md</p>
    <div class="out">
      <p class="muted">// ${e(L.scope.label)}</p>
      <p class="accent"># ${e(L.scope.headline)}</p>
      <p style="margin-top:10px">${e(L.scope.lead)}</p>
      <div style="margin-top:12px">
${F.steps.map((st, i) => {
    const week = R(`@steps.${i}.week|week`);
    return `      <div class="row"><span class="n">${e(st.number)}</span><span>${e(L.steps[i].name)}</span><span class="leader"></span><span class="meta">${e(week)}</span></div>
      <p style="padding-left:calc(2ch + 10px);margin-bottom:6px">${e(L.steps[i].body)}</p>`;
  }).join('\n')}
      </div>
    </div>`);

  section('TRACK RECORD', `    <p class="prompt">cat track-record.md</p>
    <div class="out">
      <p class="muted">// ${e(L.track.label)}</p>
      <p class="accent"># ${e(L.track.headline)}</p>
      <p style="margin-top:10px">${e(L.track.lead)}</p>
${F.clients.map((c, i) => `      <div class="card" style="margin-top:14px">
        <h3>${e(c.name)}</h3>
        <p class="muted">${e(L.track.items[i].status)}</p>
        <p>${e(L.track.items[i].quote)}</p>
        <p class="muted">${e(L.track.items[i].attribution)}</p>
      </div>`).join('\n')}
    </div>`);

  const offerCard = (i, key) => {
    const p = L.pricing[key];
    const lines = [`        <h3>${e(F.offers[i].name)}</h3>`];
    if (p.eyebrow) lines.push(`        <p class="muted">${e(p.eyebrow)}</p>`);
    lines.push(`        <p>${e(p.description)}</p>`);
    lines.push(`        <p><span class="muted">price:</span> <span class="accent">${e(price(i))}</span></p>`);
    if (!F.offers[i].unit) lines.push(`        <p class="muted">${e(billing)}</p>`);
    if (p.includes) {
      lines.push(`        <p class="muted">${e(L.pricing.included_label)}</p>`);
      lines.push(...p.includes.map((t) => `        <p><span class="accent">+</span> ${e(t)}</p>`));
    }
    return `      <div class="card"${i ? '' : ' style="margin-top:14px"'}>\n${lines.join('\n')}\n      </div>`;
  };
  section('PRICING', `    <p class="prompt">cat pricing.md</p>
    <div class="out">
      <p class="muted">// ${e(L.pricing.label)}</p>
      <p class="accent"># ${e(L.pricing.headline)}</p>
      <p style="margin-top:10px">${e(L.pricing.lead)}</p>
${offerCard(0, 'core')}
${offerCard(1, 'full')}
${offerCard(2, 'land_expand')}
      <p class="muted" style="margin-top:14px">${e(L.pricing.note)}</p>
      <p style="margin-top:12px"><a class="cta" href="${a(F.links.calendly)}">${e(L.pricing.cta_reserve)} →</a></p>
    </div>`);

  section('SELECTED WORK', `    <p class="prompt">ls -l /work --selected</p>
    <div class="out">
      <p class="muted">// ${e(L.work.label)}</p>
      <p class="accent"># ${e(L.work.headline)}</p>
      <div style="margin-top:12px">
${F.showcase.map((w, i) => {
    const name = w.href ? `<a href="${a(w.href[lang])}">${e(w.name)}</a>` : `<span>${e(w.name)}</span>`;
    return `      <div class="row"><span class="n">${i + 1}</span>${name}<span class="leader"></span><span class="meta">${e(L.work.items[i].subtitle)}</span></div>`;
  }).join('\n')}
      </div>
    </div>`);

  section('AI-READY SYSTEM', `    <p class="prompt">cat ai-ready-design-system.md</p>
    <div class="out">
      <p class="muted">// ${e(L.ai.label)}</p>
      <p class="accent"># ${e(L.ai.headline)}</p>
      <p style="margin-top:10px">${e(L.ai.body)}</p>
      <p style="margin-top:12px"><a href="${a(F.links.design_system_terminal[lang])}">→ ${e(L.ai.cta)}</a></p>
    </div>`);

  section('FAQ', `    <dl class="faq">
${L.faq.items.map((it) => `      <dt>${e(it.question)}</dt>
      <dd>${e(faqAnswer(it, lang))}</dd>`).join('\n')}
    </dl>`);

  section('NEXT STEP', `    <p class="prompt">raft --connect</p>
    <div class="out">
      <p class="muted">// ${e(L.next.label)}</p>
      <p class="accent"># ${e(L.next.headline)}</p>
      <p style="margin-top:10px"><strong>${e(L.next.tab_founder)}.</strong> ${e(L.next.founder_fit)} ${e(L.next.founder_intro)}</p>
      <p style="margin-top:10px"><strong>${e(L.next.tab_vc)}.</strong> ${e(L.next.vc_fit)} ${e(L.next.vc_intro)}</p>
      <dl class="kv" style="margin-top:12px;overflow-wrap:anywhere">
        <dt>email</dt><dd><a href="mailto:${a(F.email)}">${e(F.email)}</a></dd>
        <dt>book</dt><dd><a href="${a(F.links.calendly)}">${e(F.links.calendly)}</a></dd>
        <dt>form</dt><dd><a href="${a(human + '#next-step')}">${e(human + '#next-step')}</a></dd>
      </dl>
      <a class="cta" href="${a(F.links.calendly)}">${e(L.hero.cta_book)} →</a>
    </div>`);

  return terminalDocument(content, lang, {
    contentFile: 'content/design-foundation.json',
    question: L.terminal.question,
    chat,
    body: sections.join('\n\n'),
  });
}

// ------------------------------------------------------------------ main

function build() {
  const outputs = [];
  for (const page of PAGES) {
    const content = JSON.parse(read(page.content));
    for (const lang of ['en', 'ja']) {
      const hf = page.human[lang];
      outputs.push([hf, patchHuman(read(hf), content, lang, hf, page)]);
      outputs.push([page.terminal[lang], page.render(content, lang)]);
    }
  }
  return outputs;
}

function main() {
  let outputs;
  try {
    outputs = build();
  } catch (err) {
    console.error('build-pages: ' + err.message);
    process.exit(1);
  }
  // Every JSON-LD block we emit must parse.
  for (const [file, html] of outputs) {
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch (err) {
        console.error(`build-pages: invalid JSON-LD in ${file}: ${err.message}`);
        process.exit(1);
      }
    }
  }
  const stale = [];
  for (const [file, html] of outputs) {
    const abs = path.join(ROOT, file);
    const current = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
    if (current === html) continue;
    stale.push(file);
    if (!CHECK) {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, html);
    }
  }
  if (CHECK) {
    if (stale.length) {
      console.error('build-pages: out of date, run node build-pages.js:\n  ' + stale.join('\n  '));
      process.exit(1);
    }
    console.log(`build-pages: ${outputs.length} files up to date`);
    return;
  }
  console.log(stale.length
    ? 'build-pages: wrote\n  ' + stale.join('\n  ')
    : `build-pages: ${outputs.length} files already up to date`);
}

main();
