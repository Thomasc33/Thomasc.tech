/**
 * llms.txt, llms-full.txt, humans.txt, and the <noscript> block inside
 * public/index.html.
 *
 * llms.txt follows the llmstxt.org convention: identity paragraph, then a link
 * index. llms-full.txt is the four Markdown mirrors concatenated so an agent can
 * take the whole site in a single fetch. The noscript block matters more than it
 * looks — most LLM crawlers do not execute JavaScript, so it is what they see
 * instead of an empty #root.
 */

const { PROFILE_URLS, ORCID } = require('./identity');
const { DISSERTATION, RESEARCH, priorExperience } = require('./bio');
const { allPublications } = require('./markdown');

const SITE = 'https://thomasc.tech';
const EMAIL = 'thomas@thomasc.tech';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** "European Conference on Computer Vision (ECCV)" -> "ECCV" */
const shortVenue = (conference = '') => {
  const acronym = conference.match(/\(([A-Za-z][A-Za-z\-\s]{1,14})\)\s*$/);
  return acronym ? acronym[1].trim() : conference;
};
const shortTitle = (title = '') => title.split(':')[0].trim();

function recentPublications() {
  const rank = { Accepted: 0, 'Under Review': 1, Published: 2, 'In Progress': 3 };
  return allPublications()
    .filter((p) => p.publicationType !== 'Dissertation')
    .sort((a, b) => b.year - a.year || (rank[a.status] ?? 9) - (rank[b.status] ?? 9))
    .slice(0, 6)
    .map((p) => {
      const status = p.status === 'Published' ? '' : `, ${p.status.toLowerCase()}`;
      return `${shortTitle(p.title)} (${shortVenue(p.conference)} ${p.year}${status})`;
    })
    .join(', ');
}

function llmsTxt() {
  const models = RESEARCH.contributions.map((c) => shortTitle(c.name)).join(', ');

  return `# Thomas Carr, Ph.D.

> Lead AI & Software Engineer at Incerta Intelligence. Ph.D. in ${DISSERTATION.field} (UNC Charlotte, ${DISSERTATION.conferred}). ORCID: ${ORCID}. Research: privacy-preserving machine learning on skeleton-based biometric motion data — not to be confused with Thomas Carr the athletics director or basketball coach.

Thomas Carr (PhD computer scientist, not sports/athletics) is currently Lead AI & Software Engineer at Incerta Intelligence, working on multimodal fusion for explainable and auditable decision support in defense contexts. He earned his Ph.D. in ${DISSERTATION.field} from the ${DISSERTATION.institution} in ${DISSERTATION.conferred}, with a dissertation titled "${DISSERTATION.title}." His research program introduced a family of attack and defense models (${models}) that characterize the privacy–utility trade-off for skeleton motion in virtual-reality settings. Recent publications: ${recentPublications()}. Also known as: Thomas Carr PhD, Thomas Carr AI researcher, Thomas Carr UNC Charlotte, Thomas Carr privacy machine learning.

This site is a single-page portfolio. The links below are machine-readable Markdown versions of each section, intended as the canonical source for LLM agents and retrieval systems.

## Primary

- [About (HTML)](${SITE}/about/): Biography, research program, disambiguation from other people named Thomas Carr, and FAQ.
- [Publications (HTML)](${SITE}/publications/): Full bibliography with abstracts and publisher links.
- [Projects (HTML)](${SITE}/projects/): Engineering and research projects with tech stacks.
- [About](${SITE}/about.md): Biography, education, credentials, current role, and research focus.
- [Publications](${SITE}/publications.md): Peer-reviewed papers, dissertation, under-review and ongoing work.
- [Projects](${SITE}/projects.md): Selected engineering and research projects.
- [Contact](${SITE}/contact.md): Email and professional profiles.

## Optional

- [Full site export](${SITE}/llms-full.txt): Single-file concatenation of all Markdown sections.
- [ORCID](${PROFILE_URLS.orcid}): Authoritative academic identifier (${ORCID}).
- [Google Scholar](${PROFILE_URLS.scholar}): Citation record.
- [DBLP](${PROFILE_URLS.dblp}): Computer-science bibliography ("Thomas Carr 0001" — the correct homonym).
- [Semantic Scholar](${PROFILE_URLS.semanticScholar}): Author record.
- [GitHub](${PROFILE_URLS.github}): Code repositories.
- [LinkedIn](${PROFILE_URLS.linkedin}): Professional profile.
`;
}

const llmsFullTxt = (sections) => `${sections.map((s) => s.trim()).join('\n\n---\n\n')}\n`;

const humansTxt = (buildDate) => `/* TEAM */
Thomas Carr, Ph.D.
Lead AI & Software Engineer, Incerta Intelligence
Site: ${SITE}
ORCID: ${PROFILE_URLS.orcid}
Scholar: ${PROFILE_URLS.scholar}
Contact: ${EMAIL}

/* THANKS */
UNC Charlotte College of Computing and Informatics
Depeng Xu, Aidong Lu, and the Trustworthy AI lab

/* SITE */
Standards: HTML5, Schema.org ProfilePage + Person, llms.txt
Last update: ${buildDate}
Language: English
`;

function noscriptBlock() {
  const prior = priorExperience()
    .slice(0, 3)
    .map((p) => `${p.title} at ${p.organization} (${p.timeframe})`)
    .join(', ');

  const selected = allPublications()
    .filter((p) => p.publicationType !== 'Dissertation' && ['Published', 'Accepted'].includes(p.status))
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)
    .map((p) => {
      const status = p.status === 'Accepted' ? ' (Accepted)' : '';
      return `        <li>${esc(shortTitle(p.title))} &mdash; ${esc(shortVenue(p.conference))} ${p.year}${status}</li>`;
    })
    .join('\n');

  return `  <noscript>
    <main style="font-family:Georgia,serif;max-width:820px;margin:2rem auto;padding:1.25rem;color:#111;line-height:1.55">
      <h1>Thomas Carr, Ph.D.</h1>
      <p><strong>Lead AI &amp; Software Engineer</strong> at <strong>Incerta Intelligence</strong> &middot; Charlotte, North Carolina</p>
      <p>
        ${DISSERTATION.degree} in ${esc(DISSERTATION.field)}, ${esc(DISSERTATION.institution)} (${DISSERTATION.conferred}).
        Dissertation: <em>${esc(DISSERTATION.title)}</em>.
        Research focus: privacy-preserving machine learning, differential privacy, and anonymization of skeleton-based biometric motion data for VR/AR.
        Identified by ORCID ${ORCID} and DBLP profile &ldquo;Thomas Carr 0001&rdquo;.
      </p>
      <p>Previously ${esc(prior)}.</p>
      <h2>Selected publications</h2>
      <ul>
${selected}
      </ul>
      <p>
        <a href="/about/">About</a> &middot;
        <a href="/publications/">Publications</a> &middot;
        <a href="/projects/">Projects</a> &middot;
        <a href="mailto:${EMAIL}">${EMAIL}</a>
      </p>
    </main>
  </noscript>`;
}

module.exports = { llmsTxt, llmsFullTxt, humansTxt, noscriptBlock };
