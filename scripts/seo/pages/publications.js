/**
 * /publications/ — full bibliography as static HTML.
 *
 * Source of truth is src/Data/publications.json, so this page can never drift
 * from what the React app renders.
 */

const publications = require('../../../src/Data/publications.json');
const { SITE_URL, PERSON_ID, ORG_UNCC_ID, personNode, organizationNodes } = require('../identity');
const { esc, breadcrumb } = require('../layout');

const PATH = '/publications/';

const TITLE = 'Publications — Thomas Carr, Ph.D. | ICCV, ECCV, CIKM, PAKDD';
const DESCRIPTION =
  'Peer-reviewed publications by Thomas Carr, Ph.D. on privacy-preserving machine learning for skeleton-based motion data: ICCV 2025, ECCV 2026, ISMAR 2025, PAKDD 2025, MetaCom 2024, IEEE BigData 2024, CIKM 2023, plus his UNC Charlotte dissertation.';

/** Only peer-reviewed, accepted work earns a ScholarlyArticle node. */
const SCHEMA_STATUSES = Object.freeze(['Published', 'Accepted']);

const allEntries = [
  ...publications.published.map((entry) => ({ ...entry, group: 'published' })),
  ...publications.ongoing.map((entry) => ({ ...entry, group: 'ongoing' })),
];

const abstractOf = (entry) => entry.abstract || entry.description || '';

const linksOf = (entry) => {
  const external = (entry.links || []).map((href) => ({ href, label: labelForLink(href) }));
  const project = entry.projectPage
    ? [{ href: entry.projectPage, label: 'Project page' }]
    : [];
  return [...external, ...project];
};

const LINK_LABELS = Object.freeze([
  ['arxiv.org', 'arXiv'],
  ['ieeexplore.ieee.org', 'IEEE Xplore'],
  ['dl.acm.org', 'ACM Digital Library'],
  ['link.springer.com', 'Springer'],
  ['proquest.com', 'ProQuest'],
]);

const labelForLink = (href) => {
  const match = LINK_LABELS.find(([host]) => href.includes(host));
  return match ? match[1] : 'Publisher page';
};

const entryHtml = (entry) => {
  const links = linksOf(entry);
  const linkHtml =
    links.length > 0
      ? `<p class="meta">${links
          .map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`)
          .join(' &middot; ')}</p>`
      : '';
  const badge =
    entry.status && entry.status !== 'Published'
      ? ` <span class="badge">${esc(entry.status)}</span>`
      : '';
  return `<article class="entry">
<h3>${esc(entry.title)}${badge}</h3>
<p class="meta">${esc(entry.authors)}</p>
<p class="meta"><em>${esc(entry.conference)}</em>, ${esc(entry.year)}</p>
<p>${esc(abstractOf(entry))}</p>
${linkHtml}
</article>`;
};

const scholarlyNodes = () =>
  allEntries
    .filter((entry) => SCHEMA_STATUSES.includes(entry.status))
    .map((entry, index) => {
      const isThesis = entry.publicationType === 'Dissertation';
      const url = (entry.links && entry.links[0]) || entry.projectPage;
      return {
        '@type': isThesis ? 'Thesis' : 'ScholarlyArticle',
        '@id': `${SITE_URL}${PATH}#publication-${index}`,
        headline: entry.title,
        name: entry.title,
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
        datePublished: String(entry.year),
        creativeWorkStatus: entry.status,
        isPartOf: { '@type': 'PublicationVolume', name: entry.conference },
        abstract: abstractOf(entry) || undefined,
        url: url || undefined,
        inLanguage: 'en',
        ...(isThesis && {
          inSupportOf: 'Computing and Information Systems',
          educationalLevel: 'Doctorate',
          provider: { '@id': ORG_UNCC_ID },
        }),
      };
    });

const buildGraph = () => {
  const nodes = scholarlyNodes();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${PATH}#webpage`,
        url: `${SITE_URL}${PATH}`,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': PERSON_ID },
        breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
      },
      breadcrumb(PATH, 'Publications'),
      personNode(),
      ...organizationNodes(),
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}${PATH}#list`,
        name: 'Publications by Thomas Carr, Ph.D.',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: nodes.length,
        itemListElement: nodes.map((node, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': node['@id'] },
        })),
      },
      ...nodes,
    ],
  };
};

const buildBody = () => {
  const published = allEntries.filter((entry) => entry.group === 'published');
  const ongoing = allEntries.filter((entry) => entry.group === 'ongoing');
  const ongoingSection =
    ongoing.length > 0
      ? `<h2>In progress</h2>\n${ongoing.map(entryHtml).join('\n')}`
      : '';

  return `<p class="kicker">// publications</p>
<h1>Publications</h1>
<p class="lede">Peer-reviewed work by Thomas Carr, Ph.D. on privacy-preserving machine learning for skeleton-based motion data. ORCID 0009-0006-6039-0209 &middot; DBLP &ldquo;Thomas Carr 0001&rdquo;.</p>

<h2>Papers and dissertation</h2>
${published.map(entryHtml).join('\n')}
${ongoingSection}

<p><a href="/about/">About the author &rarr;</a> &middot; <a href="/publications.md">Plain-text version</a></p>`;
};

module.exports = {
  path: PATH,
  build: () => ({
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
    markdown: '/publications.md',
    graph: buildGraph(),
    body: buildBody(),
  }),
};
