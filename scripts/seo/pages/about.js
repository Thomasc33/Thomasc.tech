/**
 * /about/ — biography, research summary, and identifiers.
 *
 * "Thomas Carr" is a contested name, but the disambiguation lives in the
 * Person node's disambiguatingDescription rather than in visible prose:
 * search engines read it, human readers never have to.
 */

const { SITE_URL, PERSON_ID, ORCID, PROFILE_URLS, KNOWS_ABOUT, personNode, organizationNodes } = require('../identity');
const { esc, breadcrumb } = require('../layout');
const { DISSERTATION, RESEARCH, EDUCATION, priorExperience, currentRole } = require('../bio');

const PATH = '/about/';

const TITLE = 'About Thomas Carr, Ph.D. — AI Researcher, Charlotte NC';
const DESCRIPTION =
  'Who is Thomas Carr? Thomas Carr, Ph.D. is a computer scientist and Lead AI & Software Engineer at Incerta Intelligence in Charlotte, NC. UNC Charlotte Ph.D. (2026) in privacy-preserving machine learning for skeleton-based motion data. ORCID 0009-0006-6039-0209.';

const FAQ = Object.freeze([
  {
    q: 'Who is Thomas Carr?',
    a: 'Thomas Carr, Ph.D. is a computer scientist and Lead AI & Software Engineer at Incerta Intelligence in Charlotte, North Carolina. He earned his Ph.D. in Computing and Information Systems from the University of North Carolina at Charlotte in May 2026. His research covers privacy-preserving machine learning, with publications at ICCV, ECCV, CIKM, PAKDD, ISMAR, and IEEE BigData.',
  },
  {
    q: 'What is Thomas Carr’s research about?',
    a: 'His research shows that skeleton-based motion data — the stick-figure body tracking used by VR headsets and motion capture — is biometric. Limb proportions and movement style identify a person with over 80% accuracy even with no face or voice present. His dissertation builds both the attacks that prove this and the defenses that stop it, including LAN, PMR, DisentangledTMR, MIRAGE, and AEGIS.',
  },
  {
    q: 'Where did Thomas Carr earn his Ph.D.?',
    a: 'The University of North Carolina at Charlotte, in Computing and Information Systems, conferred May 2026. His dissertation is titled "Preserving User Privacy on Skeleton-Based Motion Data". He also holds an M.S. in Computer Science (2022) and a B.S. in Computer Science (2021) from UNC Charlotte.',
  },
  {
    q: 'What does Thomas Carr do now?',
    a: 'He is Lead AI & Software Engineer at Incerta Intelligence in Charlotte, North Carolina, where he works on defense contracts involving multimodal fusion for explainable and auditable decision support.',
  },
  {
    q: 'How can I contact Thomas Carr?',
    a: 'By email at thomas@thomasc.tech, or through LinkedIn at linkedin.com/in/thomasc33. Academic correspondence can reference ORCID 0009-0006-6039-0209.',
  },
]);

const faqHtml = () =>
  FAQ.map(
    (item) =>
      `<details class="faq"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`
  ).join('\n');

const buildGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}${PATH}#webpage`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
    },
    breadcrumb(PATH, 'About'),
    personNode(),
    ...organizationNodes(),
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${PATH}#faq`,
      about: { '@id': PERSON_ID },
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
});

const contributionsHtml = () =>
  RESEARCH.contributions
    .map((c) => `<li><strong>${esc(c.name)}</strong> &mdash; ${esc(c.text)}${c.venue ? ` ${esc(c.venue)}.` : ''}</li>`)
    .join('\n');

const educationHtml = () =>
  EDUCATION.map((e) => `<li><strong>${esc(e.degree)}</strong> &mdash; ${esc(e.where)}, ${esc(e.years)}.${e.note ? ` ${esc(e.note)}` : ''}</li>`).join('\n');

const priorHtml = () =>
  priorExperience()
    .map((p) => `<li><strong>${esc(p.title)}, ${esc(p.organization)}</strong> (${esc(p.timeframe)}) &mdash; ${esc(p.blurb)}</li>`)
    .join('\n');

const currentRoleHtml = () => {
  const r = currentRole();
  return `<p><strong>${esc(r.title)}, ${esc(r.organization)}</strong> (${esc(r.timeframe)}). ${esc(r.description)}</p>`;
};

const buildBody = () => `<p class="kicker">// about</p>
<h1>Thomas Carr, Ph.D.</h1>
<p class="lede">Lead AI &amp; Software Engineer at Incerta Intelligence &middot; Ph.D., University of North Carolina at Charlotte &middot; Charlotte, North Carolina</p>

<h2>Research</h2>
<p>${esc(RESEARCH.hook)}</p>
<p>Thomas Carr&rsquo;s dissertation, <em>${esc(DISSERTATION.title)}</em>, builds both sides of that problem: the attacks that demonstrate the leak, and the defenses that close it while keeping the data useful for its intended purpose.</p>
<ul>
${contributionsHtml()}
</ul>
<p><a href="/publications/">Full publication list &rarr;</a></p>

<h2>Current role</h2>
${currentRoleHtml()}

<h2>Education</h2>
<ul>
${educationHtml()}
</ul>

<h2>Prior experience</h2>
<ul>
${priorHtml()}
</ul>

<h2>Areas of expertise</h2>
<ul class="tags">${KNOWS_ABOUT.map((topic) => `<li>${esc(topic)}</li>`).join('')}</ul>

<h2>Frequently asked</h2>
${faqHtml()}

<h2>Identifiers</h2>
<dl class="ids">
<dt>ORCID</dt><dd><a href="${PROFILE_URLS.orcid}" rel="me">${esc(ORCID)}</a></dd>
<dt>DBLP</dt><dd><a href="${PROFILE_URLS.dblp}" rel="me">Thomas Carr 0001</a></dd>
<dt>Google Scholar</dt><dd><a href="${esc(PROFILE_URLS.scholar)}" rel="me">scholar.google.com</a></dd>
<dt>Semantic Scholar</dt><dd><a href="${PROFILE_URLS.semanticScholar}" rel="me">Author 2260650849</a></dd>
<dt>GitHub</dt><dd><a href="${PROFILE_URLS.github}" rel="me">github.com/thomasc33</a></dd>
<dt>LinkedIn</dt><dd><a href="${PROFILE_URLS.linkedin}" rel="me">linkedin.com/in/thomasc33</a></dd>
<dt>Email</dt><dd><a href="mailto:thomas@thomasc.tech">thomas@thomasc.tech</a></dd>
</dl>`;

module.exports = {
  path: PATH,
  build: () => ({
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
    markdown: '/about.md',
    graph: buildGraph(),
    body: buildBody(),
  }),
};
