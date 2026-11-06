#!/usr/bin/env node
/**
 * WORLD PRODUCT WORD HUNT — AI Content Manager
 * ---------------------------------------------
 * Discovers, verifies and enriches product names for the game catalogue.
 *
 * Pipeline per product:
 *   1. Wikipedia search API  -> canonical article title (spelling verification)
 *   2. Wikipedia REST summary -> short description + canonical URL + page image
 *   3. Wikimedia Commons API  -> licence metadata for that image
 *   4. Licence gate           -> only CC0 / Public Domain / CC BY / CC BY-SA images are used
 *   5. Download a small thumbnail into assets/img/ (game stays fully offline)
 *
 * Anything that cannot be verified keeps its cached value, so the game never
 * breaks when a source is unreachable. Run with --offline to skip the network.
 *
 * Usage:
 *   node tools/refresh-catalog.mjs [--offline] [--limit N] [--max-images N]
 *                                  [--concurrency N] [--verbose]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SEED = path.join(ROOT, 'data', 'catalog.seed.json');
const CATALOG = path.join(ROOT, 'data', 'catalog.json');
const CREDITS = path.join(ROOT, 'data', 'credits.json');
const REPORT = path.join(ROOT, 'data', 'refresh-report.json');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const CACHE_DIR = path.join(ROOT, 'data', 'agent-cache');
const UA = 'WorldProductWordHunt/1.0 (offline word-search game; contact: repo owner)';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? Number(args[i + 1]) : d; };
const OFFLINE = flag('--offline');
const LIMIT = opt('--limit', Infinity);
const MAX_IMAGES = opt('--max-images', 64);
const CONCURRENCY = opt('--concurrency', 4);
const OFFSET = opt('--offset', 0);
const GAP_MS = opt('--gap', 220);
const VERBOSE = flag('--verbose');
const NO_IMAGES = flag('--no-images');

const ALLOWED_LICENCE = /^(cc0|cc[- ]by|cc[- ]by[- ]sa|public domain|pd\b|pd-)/i;
const lettersOf = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, '');
const slugOf = (s) => lettersOf(s).toLowerCase().slice(0, 22);
const stripTags = (s = '') => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Gentle global rate limiter: Wikimedia asks clients to stay well under
   ~200 requests/second and to send a descriptive User-Agent. We stay far
   below that and back off politely when a 429 arrives. */
let chain = Promise.resolve();
function gate(fn, gap = GAP_MS) {
  const run = chain.then(fn);
  chain = run.catch(() => {}).then(() => sleep(gap));
  return run;
}

/* Transport: curl is used so that HTTP(S)_PROXY environments (corporate /
   sandboxed networks) work without extra dependencies. */
function curl(url, { binary = false, timeout = 25 } = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      'curl',
      ['-sSL', '--max-time', String(timeout), '--compressed', '-A', UA,
       '-H', 'Accept: application/json', '-w', '\n%{http_code}', url],
      { maxBuffer: 24 * 1024 * 1024, encoding: binary ? 'buffer' : 'utf8' },
      (err, stdout) => {
        if (err) return reject(err);
        if (binary) return resolve({ body: stdout, status: 200 });
        const cut = stdout.lastIndexOf('\n');
        const status = Number(stdout.slice(cut + 1).trim());
        resolve({ body: stdout.slice(0, cut), status });
      }
    );
  });
}

async function getJSON(url, tries = 4) {
  for (let t = 0; t < tries; t++) {
    try {
      const { body, status } = await gate(() => curl(url));
      if (status === 404) return null;
      if (status === 429) { await sleep(2500 * (t + 1)); throw new Error('HTTP 429'); }
      if (status < 200 || status >= 300) throw new Error(`HTTP ${status}`);
      return JSON.parse(body);
    } catch (err) {
      if (t === tries - 1) throw err;
      await sleep(800 * (t + 1));
    }
  }
  return null;
}

async function verifySpelling(name, brand) {
  const q = encodeURIComponent(`${name} ${brand}`);
  const search = await getJSON(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srlimit=3&srsearch=${q}`
  );
  const hits = search?.query?.search ?? [];
  if (!hits.length) return null;
  // Prefer a result whose title shares a token with the product name.
  const tokens = lettersOf(name).slice(0, 6);
  const best = hits.find((h) => lettersOf(h.title).includes(tokens)) ?? hits[0];
  return best.title;
}

async function wikiSummary(title) {
  return await getJSON(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`
  );
}

async function commonsLicence(fileName) {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*` +
    `&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=560` +
    `&titles=${encodeURIComponent('File:' + fileName)}`;
  const data = await getJSON(url);
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  if (!page || page.missing !== undefined || !page.imageinfo?.[0]) return null;
  const info = page.imageinfo[0];
  const meta = info.extmetadata ?? {};
  const licence = stripTags(meta.LicenseShortName?.value ?? '');
  return {
    fileName: page.title.replace(/^File:/, ''),
    licence,
    licenceUrl: meta.LicenseUrl?.value ?? '',
    artist: stripTags(meta.Artist?.value ?? '') || 'Unknown',
    credit: stripTags(meta.Credit?.value ?? ''),
    descriptionUrl: info.descriptionurl ?? '',
    thumbUrl: info.thumburl ?? info.url,
    mime: info.mime ?? 'image/jpeg',
    allowed: ALLOWED_LICENCE.test(licence),
  };
}

async function downloadImage(url, dest) {
  const { body: buf } = await gate(() => curl(url, { binary: true, timeout: 40 }), 400);
  if (!buf || buf.length < 2000) throw new Error('image too small');
  await fs.writeFile(dest, buf);
  return buf.length;
}

function makeEntry(row) {
  const [name, brand, category, country] = row;
  return {
    id: slugOf(name),
    name,
    brand,
    category,
    country,
    letters: lettersOf(name),
    wiki: null,
    image: null,
  };
}

async function writeCache(entry) {
  try {
    await fs.writeFile(path.join(CACHE_DIR, entry.id + '.json'),
      JSON.stringify({ wiki: entry.wiki, image: entry.image, subtitle: entry.subtitle }));
  } catch { /* ignore */ }
}

async function enrich(entry, state, images) {
  if (entry.letters.length < 4) return entry;

  // --- 1. spelling verification + canonical article -----------------------
  let title = entry.wiki?.title ?? null;
  if (!OFFLINE) {
    try {
      const found = await verifySpelling(entry.name, entry.brand);
      if (found) title = found;
    } catch { /* keep cached */ }
  }
  if (!title) return entry;

  let summary = null;
  if (!OFFLINE) {
    try { summary = await wikiSummary(title); } catch { summary = null; }
  }
  entry.wiki = {
    title,
    url: summary?.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`,
    extract: (summary?.extract ?? entry.wiki?.extract ?? '').slice(0, 320),
    verified: Boolean(summary) || Boolean(entry.wiki?.verified),
  };
  if (summary?.description && !entry.subtitle) entry.subtitle = summary.description;

  // --- 2. image (licence-gated, downloaded for offline use) ---------------
  if (NO_IMAGES || (entry.image?.local && !OFFLINE)) { await writeCache(entry); return entry; }
  if (OFFLINE) return entry;
  if (!summary?.thumbnail?.source) { await writeCache(entry); return entry; }
  if (state.images >= MAX_IMAGES) return entry;

  const fileName = decodeURIComponent(summary.thumbnail.source.split('/').pop().split('?')[0]);
  try {
    const lic = await commonsLicence(fileName);
    if (!lic || !lic.allowed) return entry;
    const dest = path.join(IMG_DIR, `${entry.id}.jpg`);
    const bytes = await downloadImage(lic.thumbUrl, dest);
    entry.image = {
      local: `assets/img/${entry.id}.jpg`,
      source: 'Wikimedia Commons',
      file: lic.fileName,
      licence: lic.licence,
      licenceUrl: lic.licenceUrl,
      author: lic.artist,
      page: lic.descriptionUrl,
      bytes,
    };
    state.images += 1;
    images.push({ id: entry.id, name: entry.name, ...entry.image });
    if (VERBOSE) console.log(`  img ${entry.id} (${lic.licence})`);
  } catch (err) {
    if (VERBOSE) console.log(`  img fail ${entry.id}: ${err.message}`);
  }
  await writeCache(entry);
  return entry;
}

async function pool(items, worker, size) {
  const out = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      out[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return out;
}

async function main() {
  await fs.mkdir(IMG_DIR, { recursive: true });
  await fs.mkdir(CACHE_DIR, { recursive: true });

  const seed = JSON.parse(await fs.readFile(SEED, 'utf8'));
  let cached = [];
  try { cached = JSON.parse(await fs.readFile(CATALOG, 'utf8')).products ?? []; } catch { /* first run */ }
  const cacheById = new Map(cached.map((p) => [p.id, p]));

  // de-duplicate by display name and by letter signature
  const seenName = new Set();
  const seenLetters = new Set();
  const entries = [];
  for (const row of seed.products.slice(OFFSET, LIMIT === Infinity ? undefined : OFFSET + LIMIT)) {
    const entry = makeEntry(row);
    if (entry.letters.length < 4 || entry.letters.length > 14) continue;
    const key = entry.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenName.has(key)) continue;
    // allow a shared letter signature only when the display names differ clearly
    seenName.add(key);
    const prev = cacheById.get(entry.id);
    if (prev) { entry.wiki = prev.wiki ?? null; entry.image = prev.image ?? null; entry.subtitle = prev.subtitle; }
    try {
      const hit = JSON.parse(await fs.readFile(path.join(CACHE_DIR, entry.id + '.json'), 'utf8'));
      if (hit) { entry.wiki = hit.wiki ?? entry.wiki; entry.image = hit.image ?? entry.image; entry.subtitle = hit.subtitle ?? entry.subtitle; }
    } catch { /* not cached yet */ }
    entries.push(entry);
  }

  const state = { images: entries.filter((e) => e.image?.local).length };
  const newImages = [];
  console.log(`[agent] offset=${OFFSET} ${entries.length} products · offline=${OFFLINE} · images already cached=${state.images}`);

  const enriched = await pool(entries, (e) => enrich(e, state, newImages), CONCURRENCY);

  // keep one product per letter signature so the same grid word is never repeated
  const final = [];
  for (const e of enriched) {
    if (seenLetters.has(e.letters)) continue;
    seenLetters.add(e.letters);
    final.push(e);
  }

  const categories = {};
  for (const e of final) categories[e.category] = (categories[e.category] ?? 0) + 1;
  const verified = final.filter((e) => e.wiki?.verified).length;
  const withImage = final.filter((e) => e.image?.local).length;

  const catalog = {
    name: 'WORLD PRODUCT WORD HUNT',
    version: 1,
    generatedAt: new Date().toISOString(),
    agent: 'refresh-catalog.mjs (Wikipedia + Wikimedia Commons)',
    stats: { products: final.length, verified, withImage, categories },
    products: final,
  };
  await fs.writeFile(CATALOG, JSON.stringify(catalog, null, 1) + '\n');

  const credits = {
    generatedAt: catalog.generatedAt,
    text: 'Product names verified against Wikipedia. Images from Wikimedia Commons, used under the licence stated for each file.',
    images: final.filter((e) => e.image?.local).map((e) => ({
      id: e.id, product: e.name, file: e.image.file, licence: e.image.licence,
      licenceUrl: e.image.licenceUrl, author: e.image.author, page: e.image.page,
      local: e.image.local,
    })),
  };
  await fs.writeFile(CREDITS, JSON.stringify(credits, null, 1) + '\n');

  const report = {
    runAt: catalog.generatedAt,
    mode: OFFLINE ? 'offline (cache only)' : 'online',
    products: final.length,
    verifiedSpelling: verified,
    imagesAvailable: withImage,
    newImages: newImages.length,
    categories,
    skipped: seed.products.length - final.length,
  };
  await fs.writeFile(REPORT, JSON.stringify(report, null, 1) + '\n');
  console.log('[agent]', JSON.stringify(report));
}

main().catch((err) => { console.error('[agent] failed:', err); process.exit(1); });
