/**
 * The Markdown mirrors (/about.md, /publications.md, /projects.md, /contact.md)
 * and the machine-readable indexes built on top of them.
 *
 * These were hand-maintained until now, which is why they drifted from the HTML
 * pages that carry the same facts. Both surfaces now render from src/Data and
 * scripts/seo/bio.js, so a change lands everywhere at once.
 */

const { PROFILE_URLS, ORCID } = require('./identity');
const { DISSERTATION, RESEARCH, EDUCATION, EXPERTISE_PROSE, priorExperience, currentRole } = require('./bio');

const publications = require('../../src/Data/publications.json');
const projects = require('../../src/Data/projects.json');

const EMAIL = 'thomas@thomasc.tech';
const SITE = 'https://thomasc.tech';
const link = (text, url) => `[${text}](${url})`;

const allPublications = () => [...publications.published, ...publications.ongoing];

function aboutMarkdown() {
  const role = currentRole();
  const contributions = RESEARCH.contributions
    .map((c) => `- **${c.name}** — ${c.text}${c.venue ? ` ${c.venue}.` : ''}`)
    .join('\n');

  const education = EDUCATION.map((e) => `- **${e.degree}** — ${e.where}, ${e.years}.${e.note ? ` ${e.note}` : ''}`).join('\n');

  const prior = priorExperience()
    .map((p) => `- **${p.title}, ${p.organization}** (${p.timeframe}) — ${p.blurb}`)
    .join('\n');

  return `# About Thomas Carr, Ph.D.

Thomas Carr is an AI researcher and software engineer based in Charlotte, North Carolina. He earned his **${DISSERTATION.degree} in ${DISSERTATION.field}** from the **${DISSERTATION.institution}** in **${DISSERTATION.conferred}**, with a dissertation titled *${DISSERTATION.title}*.

## Research Focus

${RESEARCH.hook}

${RESEARCH.framing}

${contributions}

## Current Role

**${role.title}, ${role.organization}** (${role.timeframe}). ${role.description}

## Education

${education}

## Selected Prior Experience

${prior}

## Expertise

${EXPERTISE_PROSE}

## Identifiers

- ORCID: ${link(ORCID, PROFILE_URLS.orcid)}
- Google Scholar: ${link('scholar.google.com', PROFILE_URLS.scholar)}
- DBLP: ${link('Thomas Carr 0001', PROFILE_URLS.dblp)}
- Semantic Scholar: ${link('Author 2260650849', PROFILE_URLS.semanticScholar)}
- GitHub: ${link('github.com/thomasc33', PROFILE_URLS.github)}
- LinkedIn: ${link('linkedin.com/in/thomasc33', PROFILE_URLS.linkedin)}
- Email: ${EMAIL}
`;
}

const linkLabel = (url) =>
  url.includes('doi.org') ? 'Publisher page'
    : url.includes('arxiv') ? 'arXiv'
    : url.includes('proquest') ? 'ProQuest'
    : 'Link';

function publicationEntry(p) {
  const status = p.status === 'Published' ? '' : ` (${p.status})`;
  const extras = [
    ...(p.links || []).map((url) => link(linkLabel(url), url)),
    ...(p.projectPage ? [link('Project page', p.projectPage)] : []),
  ];
  const tail = extras.length ? ` ${extras.join(' · ')}.` : '';
  const abstract = p.abstract ? `\n\n${p.abstract}` : '';
  return `### ${p.title} (${p.year}${p.status === 'Published' ? '' : `, ${p.status}`})

**${p.authors}.** ${p.conference}, ${p.year}${status}.${tail}${abstract}`;
}

const SECTIONS = [
  { heading: 'Peer-Reviewed Publications', status: 'Published' },
  { heading: 'Accepted', status: 'Accepted' },
  { heading: 'Under Review', status: 'Under Review' },
  { heading: 'Ongoing Work', status: 'In Progress' },
];

function publicationsMarkdown() {
  const all = allPublications();
  const parts = [
    '# Publications — Thomas Carr, Ph.D.',
    '',
    `Complete list of peer-reviewed papers, dissertation, and ongoing work. Author: Thomas Carr (${link(`ORCID ${ORCID}`, PROFILE_URLS.orcid)}, ${link('Google Scholar', PROFILE_URLS.scholar)}).`,
  ];

  const dissertation = all.find((p) => p.publicationType === 'Dissertation');
  if (dissertation) parts.push('', '## Dissertation', '', publicationEntry(dissertation));

  for (const { heading, status } of SECTIONS) {
    const entries = all.filter((p) => p.publicationType !== 'Dissertation' && p.status === status);
    if (!entries.length) continue;
    parts.push('', `## ${heading}`, '', entries.map(publicationEntry).join('\n\n'));
  }
  return `${parts.join('\n')}\n`;
}

function projectsMarkdown() {
  const entries = projects
    .map((proj) => {
      const stack = (proj.language_framework || []).map((l) => l.label).join(', ');
      const links = (proj.links || []).map((l) => link(l.icon || 'Link', l.href)).join(' · ');
      const title = proj.subtitle ? `${proj.title} — ${proj.subtitle}` : proj.title;
      return `## ${title} (${proj.timeframe})\n\n${proj.description}${stack ? ` Stack: ${stack}.` : ''}${links ? ` ${links}` : ''}`;
    })
    .join('\n\n');

  return `# Projects — Thomas Carr, Ph.D.

Selected engineering and research projects.

${entries}
`;
}

function contactMarkdown() {
  return `# Contact — Thomas Carr, Ph.D.

- **Email:** ${EMAIL}
- **LinkedIn:** ${link('linkedin.com/in/thomasc33', PROFILE_URLS.linkedin)}
- **GitHub:** ${link('github.com/thomasc33', PROFILE_URLS.github)}
- **ORCID:** ${link(ORCID, PROFILE_URLS.orcid)}
- **Google Scholar:** ${link('scholar.google.com', PROFILE_URLS.scholar)}

The contact form on ${link('thomasc.tech', `${SITE}/#contact`)} routes to the same email via Formspree.
`;
}

module.exports = {
  aboutMarkdown,
  publicationsMarkdown,
  projectsMarkdown,
  contactMarkdown,
  allPublications,
};
