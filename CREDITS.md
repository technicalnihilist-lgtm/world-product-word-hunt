# CREDITS — WORLD PRODUCT WORD HUNT

**Game name:** WORLD PRODUCT WORD HUNT
**Version:** 1.0.0
**Concept:** AI-powered worldwide product-name word search — find the correct
spelling of real products from every country and category.

## Development

Built as an offline-first HTML/CSS/JS game (no frameworks, no CDN, no
tracking, no accounts). One `index.html` file contains the whole game; the
Android package wraps that same build in a WebView and ships without the
`INTERNET` permission.

* Game design, engine, UI, Android shell: the repository author
* Puzzle generator, scoring, achievements, i18n: same repository, `src/game.js`

## AI agent credits

`tools/refresh-catalog.mjs` is the content agent. It:

1. searches the **Wikipedia API** for every product name to confirm the
   spelling and store the canonical article title,
2. pulls the article summary (short description + canonical URL),
3. asks the **Wikimedia Commons API** for the licence metadata of the article
   image and only keeps images whose licence allows reuse
   (CC0 / public domain / CC BY / CC BY-SA),
4. downloads a small thumbnail so the game stays playable offline,
5. de-duplicates the catalogue and writes `data/catalog.json`,
   `data/credits.json` and `data/refresh-report.json`.

If a source is unreachable the agent keeps the cached value and the game keeps
working with bundled content. Run it with `--offline` to rebuild from cache.

## Wikipedia

Product names, spellings and short descriptions are checked against the
English Wikipedia API (`en.wikipedia.org/w/api.php`,
`en.wikipedia.org/api/rest_v1`). Wikipedia text is available under
CC BY-SA 4.0.

## Wikimedia Commons

Images are used only when the licence metadata allows reuse. For every image
the file name, licence, licence URL, author and Commons file page are stored in
`data/credits.json` and shown on the product card in-game. If no suitable
licensed image exists, the game draws a generated monogram card instead.

## Attribution and trademarks

Product names and brand names are trademarks of their owners. They appear here
only to identify real products inside a word puzzle. No affiliation,
sponsorship or endorsement by any brand is claimed or implied.

## Affiliation statement

This game is **not** affiliated with, endorsed by, or sponsored by Wikipedia,
the Wikimedia Foundation, or any brand named in the catalogue. Wikipedia and
Wikimedia Commons are used only as data sources under their published terms.

## Data sources

* `en.wikipedia.org` API — spelling verification, descriptions
* `commons.wikimedia.org` API — images and licence metadata
* Bundled catalogue — `data/catalog.json`
