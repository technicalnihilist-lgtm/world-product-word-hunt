#!/usr/bin/env node
/**
 * Build: inlines CSS + JS + catalogue into a single self-contained index.html,
 * copies the catalogue to /catalog.json (used by the in-game "refresh" button),
 * and stamps the build version.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFile(path.join(ROOT, p), 'utf8');

const pkg = JSON.parse(await read('package.json'));
const catalog = JSON.parse(await read('data/catalog.json'));
const credits = JSON.parse(await read('data/credits.json'));
const template = await read('src/index.template.html');
const css = await read('src/game.css');
const js = await read('src/game.js');

if (!catalog.products?.length) throw new Error('catalogue is empty — run tools/refresh-catalog.mjs first');

const build = {
  version: pkg.version,
  built: new Date().toISOString().slice(0, 10),
  products: catalog.products.length,
  categories: Object.keys(catalog.stats?.categories ?? {}).length,
  verified: catalog.products.filter((p) => p.wiki?.verified).length,
  images: credits.images?.length ?? 0
};

const compact = JSON.stringify({
  version: catalog.version,
  generatedAt: catalog.generatedAt,
  products: catalog.products.map((p) => ({
    id: p.id, name: p.name, brand: p.brand, category: p.category, country: p.country,
    letters: p.letters, subtitle: p.subtitle, wiki: p.wiki, image: p.image
  }))
});

const html = template
  .replace('__CSS__', () => css)
  .replace('__JS__', () => js)
  .replace('__CATALOG__', () => compact)
  .replace('__CREDITS__', () => JSON.stringify({ images: credits.images ?? [] }))
  .replace('__BUILD__', () => JSON.stringify(build));

await fs.writeFile(path.join(ROOT, 'index.html'), html);
await fs.writeFile(path.join(ROOT, 'catalog.json'), JSON.stringify(catalog));

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`[build] index.html ${kb} KB · ${build.products} products · ${build.categories} categories · ${build.verified} verified · v${build.version}`);
