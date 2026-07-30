/**
 * sitemap.xml generator. Keeping it generated (rather than hand-edited) means
 * lastmod is always honest, which is the only thing crawlers actually trust.
 */

const { SITE_URL } = require('./identity');

const ENTRIES = Object.freeze([
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about/', changefreq: 'monthly', priority: '0.95' },
  { path: '/publications/', changefreq: 'weekly', priority: '0.95' },
  { path: '/projects/', changefreq: 'monthly', priority: '0.8' },
  { path: '/publications.md', changefreq: 'weekly', priority: '0.7' },
  { path: '/about.md', changefreq: 'monthly', priority: '0.7' },
  { path: '/llms.txt', changefreq: 'monthly', priority: '0.6' },
  { path: '/llms-full.txt', changefreq: 'monthly', priority: '0.6' },
  { path: '/projects.md', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact.md', changefreq: 'yearly', priority: '0.4' },
  { path: '/humans.txt', changefreq: 'yearly', priority: '0.3' },
]);

const isoDate = (date) => date.toISOString().slice(0, 10);

const urlBlock = (entry, lastmod) => {
  const alternate =
    entry.path === '/'
      ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/" />`
      : '';
  return `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternate}
  </url>`;
};

const renderSitemap = (now = new Date()) => {
  const lastmod = isoDate(now);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ENTRIES.map((entry) => urlBlock(entry, lastmod)).join('\n')}
</urlset>
`;
};

module.exports = { renderSitemap, ENTRIES };
