#!/usr/bin/env node
// Submit URLs to IndexNow (Bing, Yandex, and other participating engines).
//
// Usage:
//   node scripts/indexnow.js /ai.md /ja/ai.md
//   node scripts/indexnow.js https://raftdesign.studio/about/
//   node scripts/indexnow.js --dry-run /ai.md
//
// Paths are resolved against the site origin. The key file must be live at
// https://raftdesign.studio/<key>.txt before submitting, so deploy first.
// The key is public by design: IndexNow verifies ownership by fetching it.

const HOST = 'raftdesign.studio';
const KEY = 'af7f65e72069bedee0c0201ff605f911';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const inputs = args.filter((a) => !a.startsWith('--'));
  if (!inputs.length) {
    console.error('Usage: node scripts/indexnow.js [--dry-run] <path-or-url>...');
    process.exit(1);
  }

  const urlList = inputs.map((i) => {
    const u = new URL(i, 'https://' + HOST);
    if (u.hostname !== HOST) throw new Error('Not a ' + HOST + ' URL: ' + i);
    return u.href;
  });

  const keyLocation = 'https://' + HOST + '/' + KEY + '.txt';
  const body = { host: HOST, key: KEY, keyLocation, urlList };

  if (dryRun) {
    console.log(JSON.stringify(body, null, 2));
    return;
  }

  // Refuse to submit if the key file isn't reachable yet; IndexNow would reject it.
  const check = await fetch(keyLocation);
  if (!check.ok || (await check.text()).trim() !== KEY) {
    console.error('Key file not live at ' + keyLocation + ' (HTTP ' + check.status + '). Deploy first.');
    process.exit(1);
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  // 200 or 202 means accepted. 400 bad request, 403 key mismatch, 422 URL/host mismatch, 429 too many.
  console.log('IndexNow responded ' + res.status + ' ' + res.statusText + ' for ' + urlList.length + ' URL(s):');
  urlList.forEach((u) => console.log('  ' + u));
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
