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
:root{
  --emerald:#10b981;--emerald-dim:rgba(16,185,129,.55);
  --gold:#d4a853;--gold-lite:#e8c075;
  --bg:#050807;--fg:#e9efec;--muted:#93a49c;
  --line:rgba(255,255,255,.09);
  --glass:rgba(255,255,255,.022);
  --serif:"DM Serif Display",Georgia,"Times New Roman",serif;
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{
  margin:0;color:var(--fg);font-family:var(--sans);font-size:16px;line-height:1.68;
  background:
    radial-gradient(900px 620px at 78% -6%, rgba(16,185,129,.13), transparent 62%),
    radial-gradient(760px 520px at 4% 102%, rgba(212,168,83,.09), transparent 60%),
    var(--bg);
  background-attachment:fixed;
  -webkit-font-smoothing:antialiased;
}
/* grain, matching the main site's GrainOverlay */
body::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.16;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E");
}
a{color:var(--emerald);text-decoration:none;transition:color .25s ease}
a:hover,a:focus-visible{color:var(--gold);text-decoration:underline;text-underline-offset:3px}
.wrap{position:relative;z-index:1;max-width:54rem;margin:0 auto;padding:1.5rem 1.5rem 5rem}

nav.top{border-bottom:1px solid var(--line);padding:1.1rem 0;margin-bottom:3.25rem}
nav.top ul{list-style:none;display:flex;flex-wrap:wrap;gap:1.6rem;margin:0;padding:0}
nav.top a{
  font-family:var(--mono);font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--muted);text-decoration:none;
}
nav.top a:hover{color:var(--fg)}
nav.top a[aria-current=page]{color:var(--gold)}

.kicker{
  font-family:var(--mono);font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;
  color:var(--emerald);opacity:.85;margin:0 0 1.1rem;
}
h1{
  font-family:var(--serif);font-weight:400;
  font-size:clamp(2.3rem,6vw,3.5rem);line-height:1.06;letter-spacing:.01em;
  margin:0 0 1.1rem;
}
h1::after{
  content:"";display:block;width:96px;height:2px;border-radius:2px;margin-top:1.4rem;
  background:linear-gradient(90deg,var(--gold),var(--gold-lite) 50%,var(--gold));
}
h2{
  font-family:var(--serif);font-weight:400;color:var(--gold);
  font-size:1.6rem;letter-spacing:.01em;margin:3.5rem 0 1rem;
}
h3{font-size:1.04rem;font-weight:600;line-height:1.4;margin:0 0 .5rem;letter-spacing:-.005em}
p{margin:0 0 1.15rem}
p.lede{font-size:1.13rem;line-height:1.6;color:var(--muted);margin:0 0 2.25rem;max-width:44rem}
ul,ol{padding-left:1.15rem}
li{margin:0 0 .55rem}
strong{color:#f3f8f5;font-weight:600}
em{color:var(--muted)}

.meta{color:var(--muted);font-size:.88rem;line-height:1.55;margin:0 0 .5rem}
.meta a{color:var(--emerald-dim)}
.meta a:hover{color:var(--gold)}

article.entry{
  background:var(--glass);border:1px solid var(--line);border-radius:10px;
  padding:1.4rem 1.5rem 1.25rem;margin:0 0 1.1rem;
  transition:border-color .3s ease,background .3s ease;
}
article.entry:hover{border-color:rgba(212,168,83,.26);background:rgba(255,255,255,.035)}
article.entry p:last-of-type{margin-bottom:0}

.tags{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;padding:0;margin:1rem 0 0}
.tags li{
  margin:0;font-family:var(--mono);font-size:.68rem;letter-spacing:.05em;color:var(--muted);
  border:1px solid var(--line);border-radius:999px;padding:.24rem .7rem;
}
.badge{
  display:inline-block;vertical-align:middle;margin-left:.5rem;
  font-family:var(--mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid rgba(212,168,83,.35);border-radius:3px;padding:.12rem .5rem;color:var(--gold);
}

dl.ids{margin:0;display:grid;grid-template-columns:minmax(9rem,auto) 1fr;gap:.55rem 1.5rem}
dl.ids dt{font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding-top:.15rem}
dl.ids dd{margin:0}

details.faq{border-bottom:1px solid var(--line);padding:1rem 0}
details.faq summary{cursor:pointer;font-weight:600;list-style:none;transition:color .25s ease}
details.faq summary::-webkit-details-marker{display:none}
details.faq summary::before{content:"+ ";font-family:var(--mono);color:var(--emerald)}
details.faq[open] summary::before{content:"\\2212 "}
details.faq summary:hover{color:var(--gold)}
details.faq p{margin:.85rem 0 0;color:var(--muted)}

footer.site{border-top:1px solid var(--line);margin-top:4.5rem;padding-top:1.75rem;color:var(--muted);font-size:.85rem}
footer.site ul{list-style:none;display:flex;flex-wrap:wrap;gap:.5rem 1.4rem;padding:0;margin:0 0 1.25rem}
footer.site li{margin:0}
footer.site a{color:var(--muted)}
footer.site a:hover{color:var(--gold)}

@media (max-width:640px){
  .wrap{padding:1.25rem 1.15rem 4rem}
  dl.ids{grid-template-columns:1fr;gap:.15rem}
  dl.ids dt{margin-top:.85rem}
}
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&amp;family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet" />
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
