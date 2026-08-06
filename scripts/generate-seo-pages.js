#!/usr/bin/env node
/**
 * Generates the static, JS-free SEO landing pages plus sitemap.xml into
 * public/, so they ship verbatim with the CRA build.
 *
 * Firebase Hosting serves matching static files before applying the SPA
 * rewrite, so /about/, /publications/, and /projects/ resolve to these files
 * while every other path still falls through to the React app.
 *
 * Run automatically via the `prebuild` npm script; safe to run by hand.
 */

const fs = require('fs');
const path = require('path');

const { renderPage } = require('./seo/layout');
const { renderSitemap } = require('./seo/sitemap');
const {
  aboutMarkdown,
  publicationsMarkdown,
  projectsMarkdown,
  contactMarkdown,
} = require('./seo/markdown');
const { llmsTxt, llmsFullTxt, humansTxt, noscriptBlock } = require('./seo/text-indexes');

const PAGE_MODULES = [
  require('./seo/pages/about'),
  require('./seo/pages/publications'),
  require('./seo/pages/projects'),
];

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

/** Convert a site path like "/about/" into "public/about/index.html". */
const outputPathFor = (sitePath) => {
  const segment = sitePath.replace(/^\/+|\/+$/g, '');
  if (segment.length === 0) {
    throw new Error(`Refusing to generate a page at site root: "${sitePath}"`);
  }
  return path.join(PUBLIC_DIR, segment, 'index.html');
};

const writeFile = (filePath, contents) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
  const relative = path.relative(process.cwd(), filePath);
  const kb = (Buffer.byteLength(contents, 'utf8') / 1024).toFixed(1);
  console.log(`  ✓ ${relative} (${kb} kB)`);
};

const generatePages = () =>
  PAGE_MODULES.map((pageModule) => {
    const page = pageModule.build();
    writeFile(outputPathFor(page.path), renderPage(page));
    return page.path;
  });

const generateSitemap = () => {
  writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), renderSitemap());
};

/**
 * The Markdown mirrors and the machine-readable indexes built from them. These
 * carry the same facts as the HTML pages above; rendering both from src/Data is
 * what stops them drifting apart.
 */
const generateTextSurfaces = () => {
  const about = aboutMarkdown();
  const publications = publicationsMarkdown();
  const projects = projectsMarkdown();
  const contact = contactMarkdown();

  writeFile(path.join(PUBLIC_DIR, 'about.md'), about);
  writeFile(path.join(PUBLIC_DIR, 'publications.md'), publications);
  writeFile(path.join(PUBLIC_DIR, 'projects.md'), projects);
  writeFile(path.join(PUBLIC_DIR, 'contact.md'), contact);

  writeFile(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt());
  writeFile(
    path.join(PUBLIC_DIR, 'llms-full.txt'),
    llmsFullTxt([about, publications, projects, contact])
  );
  writeFile(
    path.join(PUBLIC_DIR, 'humans.txt'),
    humansTxt(new Date().toISOString().slice(0, 10))
  );
};

/**
 * index.html is hand-maintained apart from its no-JS fallback, so that one
 * block is patched in place between its <noscript> tags rather than the whole
 * file being regenerated.
 */
const NOSCRIPT_BLOCK = / {2}<noscript>[\s\S]*?<\/noscript>/;

const generateNoscriptFallback = () => {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  // Test for the marker rather than comparing before/after: a rerun that
  // changes nothing is the normal case, not a failure.
  if (!NOSCRIPT_BLOCK.test(html)) {
    throw new Error('public/index.html: no <noscript> block found to replace');
  }
  fs.writeFileSync(indexPath, html.replace(NOSCRIPT_BLOCK, noscriptBlock()), 'utf8');
  console.log('  ✓ public/index.html (noscript fallback)');
};

const main = () => {
  if (!fs.existsSync(PUBLIC_DIR)) {
    throw new Error(`public/ not found at ${PUBLIC_DIR}`);
  }
  console.log('Generating static SEO pages…');
  const paths = generatePages();
  generateSitemap();
  generateTextSurfaces();
  generateNoscriptFallback();
  console.log(`Done. ${paths.length} page(s) + sitemap.xml + 7 text surfaces written.`);
};

try {
  main();
} catch (error) {
  console.error(`\nSEO page generation failed: ${error.message}`);
  process.exitCode = 1;
}
