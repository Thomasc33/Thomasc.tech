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

const main = () => {
  if (!fs.existsSync(PUBLIC_DIR)) {
    throw new Error(`public/ not found at ${PUBLIC_DIR}`);
  }
  console.log('Generating static SEO pages…');
  const paths = generatePages();
  generateSitemap();
  console.log(`Done. ${paths.length} page(s) + sitemap.xml written.`);
};

try {
  main();
} catch (error) {
  console.error(`\nSEO page generation failed: ${error.message}`);
  process.exitCode = 1;
}
