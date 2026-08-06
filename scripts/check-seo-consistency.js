#!/usr/bin/env node
/**
 * Guards the property the generator exists to provide: every public surface
 * states the same facts.
 *
 * Before the surfaces were generated, the ACR end date read "Oct 2025" on the
 * site while LinkedIn said June, and the Graduate Research Assistant entry was
 * "2025" in one file and "May 2025" in another. Those are the failures this
 * catches — run it after touching src/Data or scripts/seo.
 *
 *   npm run seo:check
 */

const fs = require('fs');
const path = require('path');

const experience = require('../src/Data/experience.json');
const publications = require('../src/Data/publications.json');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

/** Surfaces that restate biography facts and must therefore agree. */
const SURFACES = [
  'index.html',
  'about.md',
  'about/index.html',
  'llms.txt',
  'llms-full.txt',
];

const read = (rel) => fs.readFileSync(path.join(PUBLIC_DIR, rel), 'utf8');

/** HTML entities the generated pages use, so a date compares equal either way. */
const normalize = (text) =>
  text
    .replace(/&ndash;|&mdash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/–|—/g, '–')
    .replace(/\s+/g, ' ');

const failures = [];
const check = (label, condition, detail) => {
  if (!condition) failures.push(`${label}: ${detail}`);
};

const contents = new Map(SURFACES.map((rel) => [rel, normalize(read(rel))]));

const DATE_IN_PARENS = /\(((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4} – [^)]+)\)/;

// --- Where a surface dates a role, the date must be experience.json's ------
// Prose that names a role without dating it ("is currently Lead AI & Software
// Engineer at Incerta") cannot drift, so it is not required to carry one.
for (const role of experience) {
  for (const [rel, text] of contents) {
    const anchor = `${role.title}, ${normalize(role.organization)}`;
    const at = text.indexOf(anchor);
    if (at === -1) continue;
    const stated = text.slice(at + anchor.length, at + anchor.length + 60).match(DATE_IN_PARENS);
    if (!stated) continue;
    check(
      rel,
      normalize(stated[1]) === normalize(role.timeframe),
      `dates "${anchor}" as "${stated[1]}" but experience.json says "${role.timeframe}"`
    );
  }
}

// --- No surface may carry a date that experience.json does not know about --
const KNOWN = new Set(experience.map((e) => normalize(e.timeframe)));
const DATE_RANGE = /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4} – (?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}|Present|present|\d{4}))\b/g;

for (const [rel, text] of contents) {
  for (const [, range] of text.matchAll(DATE_RANGE)) {
    check(
      rel,
      KNOWN.has(normalize(range)),
      `contains date range "${range}", which is not any timeframe in experience.json`
    );
  }
}

// --- Accepted/published work must appear in the crawler-visible fallback ----
const noscript = read('index.html').match(/<noscript>[\s\S]*?<\/noscript>/)[0];
const headline = [...publications.published, ...publications.ongoing]
  .filter((p) => p.publicationType !== 'Dissertation' && ['Published', 'Accepted'].includes(p.status))
  .sort((a, b) => b.year - a.year)[0];
check(
  'index.html <noscript>',
  noscript.includes(headline.title.split(':')[0].trim()),
  `most recent accepted/published work "${headline.title}" is missing from the no-JS fallback`
);

// --- The dissertation must be stated identically everywhere ----------------
const dissertation = [...publications.published].find((p) => p.publicationType === 'Dissertation');
for (const [rel, text] of contents) {
  check(rel, text.includes(dissertation.title), `does not mention the dissertation title "${dissertation.title}"`);
}

if (failures.length) {
  console.error(`\nSEO consistency check FAILED (${failures.length}):\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error('\nFix the source in src/Data or scripts/seo, then re-run `npm run seo:pages`.\n');
  process.exit(1);
}

console.log(`SEO consistency check passed — ${SURFACES.length} surfaces agree on every date and title.`);
