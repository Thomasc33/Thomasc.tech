/**
 * Static HTML shell for the generated SEO landing pages.
 *
 * These pages are deliberately plain: no JavaScript, no webfonts, no external
 * requests. Every crawler — including the ones that never execute JS — gets the
 * full text on first byte, and Core Web Vitals are effectively perfect.
 */

const { SITE_URL, PROFILE_URLS, ORCID } = require('./identity');

const HTML_ESCAPES = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
});

/** Escape a value for interpolation into HTML text or an attribute. */
const esc = (value) => {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
};

/**
 * Serialize JSON-LD safely. `</script>` inside a string would otherwise close
 * the script element early and break the whole document.
 */
const jsonLd = (graph) =>
  JSON.stringify(graph).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

const NAV_LINKS = Object.freeze([
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/projects/', label: 'Projects' },
]);

const STYLES = `
:root{--emerald:#10b981;--gold:#d4a853;--bg:#050807;--fg:#e9efec;--muted:#9aa8a2;--line:rgba(255,255,255,.10)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,Helvetica,Arial,sans-serif}
a{color:var(--emerald);text-decoration:none}
a:hover,a:focus{text-decoration:underline}
.wrap{max-width:56rem;margin:0 auto;padding:2rem 1.25rem 4rem}
nav.top{border-bottom:1px solid var(--line);padding:1rem 0;margin-bottom:2.5rem}
nav.top ul{list-style:none;display:flex;flex-wrap:wrap;gap:1.25rem;margin:0;padding:0;font-size:.92rem}
nav.top a[aria-current=page]{color:var(--gold);font-weight:600}
h1{font-size:clamp(1.9rem,4.5vw,2.7rem);line-height:1.15;margin:0 0 .4rem;letter-spacing:-.01em}
h2{font-size:1.35rem;margin:2.75rem 0 .75rem;color:var(--gold);letter-spacing:-.01em}
h3{font-size:1.05rem;margin:1.75rem 0 .35rem}
p.lede{font-size:1.08rem;color:var(--muted);margin:0 0 1.75rem}
.kicker{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.72rem;letter-spacing:.26em;text-transform:uppercase;color:var(--emerald);margin:0 0 .6rem}
.meta{color:var(--muted);font-size:.9rem;margin:.15rem 0 .5rem}
article.entry{border-left:2px solid var(--line);padding:0 0 .25rem 1.1rem;margin:0 0 2rem}
article.entry h3{margin-top:0}
.tags{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;padding:0;margin:.6rem 0 0}
.tags li{font-size:.75rem;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.15rem .6rem}
.badge{display:inline-block;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);border-radius:3px;padding:.1rem .45rem;color:var(--gold);vertical-align:middle}
dl.ids{margin:0}
dl.ids dt{font-weight:600;margin-top:.85rem}
dl.ids dd{margin:0;color:var(--muted)}
details.faq{border-bottom:1px solid var(--line);padding:.85rem 0}
details.faq summary{cursor:pointer;font-weight:600}
details.faq p{margin:.6rem 0 0;color:var(--muted)}
footer.site{border-top:1px solid var(--line);margin-top:3.5rem;padding-top:1.5rem;color:var(--muted);font-size:.88rem}
footer.site ul{list-style:none;display:flex;flex-wrap:wrap;gap:1rem;padding:0;margin:0 0 1rem}
`.trim();

const navHtml = (currentPath) => {
  const items = NAV_LINKS.map((link) => {
    const current = link.href === currentPath ? ' aria-current="page"' : '';
    return `<li><a href="${link.href}"${current}>${esc(link.label)}</a></li>`;
  }).join('');
  return `<nav class="top" aria-label="Primary"><ul>${items}</ul></nav>`;
};

const footerHtml = () =>
  `<footer class="site">
<ul>
<li><a href="${PROFILE_URLS.orcid}" rel="me">ORCID ${esc(ORCID)}</a></li>
<li><a href="${esc(PROFILE_URLS.scholar)}" rel="me">Google Scholar</a></li>
<li><a href="${PROFILE_URLS.dblp}" rel="me">DBLP</a></li>
<li><a href="${PROFILE_URLS.semanticScholar}" rel="me">Semantic Scholar</a></li>
<li><a href="${PROFILE_URLS.github}" rel="me">GitHub</a></li>
<li><a href="${PROFILE_URLS.linkedin}" rel="me">LinkedIn</a></li>
<li><a href="mailto:thomas@thomasc.tech">thomas@thomasc.tech</a></li>
</ul>
<p>&copy; 2026 Thomas Carr, Ph.D. &middot; Charlotte, North Carolina &middot; <a href="/">thomasc.tech</a></p>
</footer>`;

/**
 * Build a complete HTML document.
 *
 * @param {object} page
 * @param {string} page.path      Absolute site path, e.g. "/about/".
 * @param {string} page.title     <title> text.
 * @param {string} page.description  Meta description.
 * @param {string} page.markdown  Path to the plain-text mirror of this page.
 * @param {object} page.graph     JSON-LD @graph object.
 * @param {string} page.body      Inner HTML for <main>.
 */
const renderPage = (page) => {
  const required = ['path', 'title', 'description', 'graph', 'body'];
  const missing = required.filter((key) => !page || !page[key]);
  if (missing.length > 0) {
    throw new Error(`renderPage: missing required field(s): ${missing.join(', ')}`);
  }

  const canonical = `${SITE_URL}${page.path}`;
  const mirror = page.markdown
    ? `\n  <link rel="alternate" type="text/markdown" href="${SITE_URL}${page.markdown}" title="${esc(page.title)} (Markdown)" />`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <meta name="author" content="Thomas Carr" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="theme-color" content="#10b981" />
  <meta name="color-scheme" content="dark" />
  <meta name="geo.region" content="US-NC" />
  <meta name="geo.placename" content="Charlotte" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
  <link rel="author" href="${SITE_URL}/" />
  <link rel="me" href="${PROFILE_URLS.orcid}" />
  <link rel="me" href="${PROFILE_URLS.dblp}" />
  <link rel="me" href="${PROFILE_URLS.github}" />
  <link rel="me" href="${PROFILE_URLS.linkedin}" />${mirror}
  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Thomas Carr, Ph.D." />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(page.title)}" />
  <meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:image" content="${SITE_URL}/og-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(page.title)}" />
  <meta name="twitter:description" content="${esc(page.description)}" />
  <meta name="twitter:image" content="${SITE_URL}/og-card.png" />
  <style>${STYLES}</style>
  <script type="application/ld+json">${jsonLd(page.graph)}</script>
</head>
<body>
  <div class="wrap">
    ${navHtml(page.path)}
    <main>
${page.body}
    </main>
    ${footerHtml()}
  </div>
</body>
</html>
`;
};

/** BreadcrumbList node — gives Google the site hierarchy for these URLs. */
const breadcrumb = (path, label) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}${path}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Thomas Carr, Ph.D.', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: label, item: `${SITE_URL}${path}` },
  ],
});

module.exports = { esc, jsonLd, renderPage, breadcrumb, NAV_LINKS };
