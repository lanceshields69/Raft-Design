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
    jsonld: designSystemJsonLd,
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

function makeResolver(content, lang, file) {
  return function resolve(key) {
    const fromFacts = key.startsWith('@');
    let cur = fromFacts ? content.facts : content[lang];
    for (const part of (fromFacts ? key.slice(1) : key).split('.')) {
      if (cur == null) break;
      cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
    }
    // Language-keyed facts, e.g. { "en": "/work/", "ja": "/ja/work/" }
    if (cur && typeof cur === 'object' && !Array.isArray(cur) && lang in cur) cur = cur[lang];
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
    if (name !== 'service-jsonld') throw new Error(`${file}: unknown block "${name}"`);
    return `<!--c:block:${name}-->\n${page.jsonld(content, lang)}  <!--/c:block-->`;
  });

  let count = 0;
  out = out.replace(/<!--c:([@\w.-]+)-->([\s\S]*?)<!--\/c-->/g, (m, key) => {
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
  // Asset paths in /ai/ are relative to its own depth; the terminal pages
  // sit deeper, so make them root-absolute.
  const absolute = (s) => s.replace(/(src|href)="(?:\.\.\/)+/g, '$1="/');
  return {
    fonts: grab(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>/, 'font link'),
    headScript: grab(/<script>\n\s*\/\/ Streamed-output effect[\s\S]*?<\/script>/, 'stream script'),
    style: grab(/<style>[\s\S]*?<\/style>/, 'style block'),
    logo: grab(/<pre class="logo"[\s\S]*?<div class="logo-dither"[^>]*><\/div>/, 'logo'),
    nav: grab(/<nav class="nav"[\s\S]*?<\/nav>/, 'nav'),
    foot: grab(/<div class="foot">[\s\S]*?<\/div>/, 'footer'),
    tail: absolute(html.slice(html.indexOf('</main>') + '</main>'.length, html.indexOf('</body>'))),
  };
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

function renderDesignSystemTerminal(content, lang) {
  const F = content.facts;
  const L = content[lang];
  const J = joiner(lang);
  const shell = extractShell(lang);
  const other = lang === 'en' ? 'ja' : 'en';
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

  const tags = [...L.hero.card.layers, ...L.hero.card.audiences]
    .map((t) => `<span class="tag">${e(lang === 'en' ? t.toLowerCase().replace(/\s+/g, '-') : t)}</span>`).join('');
  const tools = [...F.tools, L.tools.other].map((t) => `<span class="tag">${e(t)}</span>`).join('');

  return `<!DOCTYPE html>
<!--
  Machine version of ${SITE}${human}
  Rendered by build-pages.js from ${PAGES[0].content}, the same source as the
  human page. Do not edit by hand: edit the JSON and run node build-pages.js.
-->
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(L.terminal.title)}</title>
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
  ${shell.style}
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
        <p class="msg-user">${e(L.terminal.question)}</p>
        <div class="msg-ai">
          <p><strong>${e(L.hero.headline.join(J))}</strong></p>
          <p>${e(L.hero.body)}</p>
          <p class="muted">${e(L.hero.card.tagline.join(J))}<span class="cursor" aria-hidden="true"></span></p>
          <div class="tags">${tags}</div>
        </div>
      </div>
    </section>
    <p class="muted" style="margin-top:16px">${e(L.terminal.source_line)} <a href="${a(human)}">→ ${e(human)}</a></p>

${rule(1, 'OFFER')}
    <dl class="kv">
      <dt>name</dt><dd>${e(L.meta.offer_name)}</dd>
      <dt>for</dt><dd>${e(L.meta.audience)}</dd>
      <dt>pricing</dt><dd>${e(L.offer.pricing)}</dd>
      <dt>included in</dt><dd><a href="${a(F.links.included_in[lang])}">${e(F.included_in_offer)}</a> · ${e(L.offer.included)}</dd>
      <dt>example</dt><dd><a href="${a(F.links.example_deck)}">${e(L.hero.cta_example)}</a></dd>
      <dt>human page</dt><dd><a href="${a(human)}">${e(SITE + human)}</a></dd>
    </dl>

${rule(2, 'THE SHIFT')}
    <p class="prompt">cat shift.md</p>
    <div class="out">
      <p class="accent"># ${e(L.shift.headline)}</p>
      <p style="margin-top:10px">${e(L.shift.body)}</p>
    </div>
    <div class="card" style="margin-top:16px">
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

    <p class="eof">/* EOF */</p>
    ${foot}
  </main>${toggle}</body>
</html>
`;
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
