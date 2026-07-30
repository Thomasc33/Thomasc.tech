/**
 * /projects/ — engineering portfolio as static HTML, generated from
 * src/Data/projects.json.
 */

const projects = require('../../../src/Data/projects.json');
const { SITE_URL, PERSON_ID, personNode, organizationNodes } = require('../identity');
const { esc, breadcrumb } = require('../layout');

const PATH = '/projects/';

const TITLE = 'Projects — Thomas Carr, Ph.D. | Software & ML Engineering';
const DESCRIPTION =
  'Engineering and research projects by Thomas Carr, Ph.D. — machine learning systems, full-stack web applications, computer vision, and real-time platforms built in React, Node.js, Python, and PyTorch.';

const stackOf = (project) =>
  (project.language_framework || []).map((item) => item.label);

const projectHtml = (project) => {
  const stack = stackOf(project);
  const links = (project.links || []).filter((link) => link && link.href);
  const linkHtml =
    links.length > 0
      ? `<p class="meta">${links
          .map(
            (link) =>
              `<a href="${esc(link.href)}" rel="noopener">${esc(
                link.icon === 'GitHub' ? 'Source on GitHub' : 'Live site'
              )}</a>`
          )
          .join(' &middot; ')}</p>`
      : '';
  return `<article class="entry">
<h3>${esc(project.title)}</h3>
<p class="meta">${esc(project.subtitle)} &middot; ${esc(project.timeframe)} &middot; ${esc(project.organization)}</p>
<p>${esc(project.description)}</p>
${linkHtml}
<ul class="tags">${stack.map((label) => `<li>${esc(label)}</li>`).join('')}</ul>
</article>`;
};

const projectNodes = () =>
  projects.map((project, index) => {
    const repo = (project.links || []).find((link) => link.icon === 'GitHub');
    const live = (project.links || []).find((link) => link.icon === 'Link');
    return {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}${PATH}#project-${index}`,
      name: project.title,
      alternativeHeadline: project.subtitle,
      description: project.description,
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      programmingLanguage: stackOf(project),
      codeRepository: repo ? repo.href : undefined,
      url: live ? live.href : repo ? repo.href : undefined,
      inLanguage: 'en',
    };
  });

const buildGraph = () => {
  const nodes = projectNodes();
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
      breadcrumb(PATH, 'Projects'),
      personNode(),
      ...organizationNodes(),
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}${PATH}#list`,
        name: 'Projects by Thomas Carr, Ph.D.',
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

const buildBody = () => `<p class="kicker">// projects</p>
<h1>Projects</h1>
<p class="lede">Selected engineering and research work by Thomas Carr, Ph.D. &mdash; machine learning systems, computer vision, and full-stack platforms.</p>

${projects.map(projectHtml).join('\n')}

<p><a href="/publications/">Research publications &rarr;</a> &middot; <a href="/about/">About the author &rarr;</a></p>`;

module.exports = {
  path: PATH,
  build: () => ({
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
    markdown: '/projects.md',
    graph: buildGraph(),
    body: buildBody(),
  }),
};
