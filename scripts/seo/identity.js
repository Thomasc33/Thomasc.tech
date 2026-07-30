/**
 * Single source of truth for identity / entity facts used by every generated
 * SEO page. Keeping these in one module means the Person entity emitted on
 * every URL is byte-identical, which is what lets Google merge them into one
 * knowledge-graph node instead of several competing ones.
 */

const SITE_URL = 'https://thomasc.tech';

const PERSON_ID = `${SITE_URL}/#thomas`;
const ORG_INCERTA_ID = `${SITE_URL}/#incerta`;
const ORG_UNCC_ID = `${SITE_URL}/#uncc`;

const ORCID = '0009-0006-6039-0209';
const SCHOLAR_ID = 'a1uc2zEAAAAJ';
const DBLP_PID = '176/3082-1';
const S2_AUTHOR_ID = '2260650849';

const PROFILE_URLS = Object.freeze({
  orcid: `https://orcid.org/${ORCID}`,
  scholar: `https://scholar.google.com/citations?hl=en&user=${SCHOLAR_ID}`,
  dblp: `https://dblp.org/pid/${DBLP_PID}`,
  semanticScholar: `https://www.semanticscholar.org/author/${S2_AUTHOR_ID}`,
  github: 'https://github.com/thomasc33',
  linkedin: 'https://www.linkedin.com/in/thomasc33/',
});

const SAME_AS = Object.freeze(Object.values(PROFILE_URLS));

const KNOWS_ABOUT = Object.freeze([
  'Privacy-Preserving Machine Learning',
  'Skeleton-Based Motion Data',
  'Biometric Data Privacy',
  'Motion Retargeting',
  'Virtual Reality Privacy',
  'Differential Privacy',
  'Skeleton De-identification',
  'Action Recognition',
  'Adversarial Machine Learning',
  'Ethical Machine Learning',
  'Explainable AI',
  'Deep Learning',
  'Computer Vision',
  'Multimodal Fusion',
  'Trustworthy AI',
]);

const DISAMBIGUATION =
  'Thomas Carr is a Ph.D. computer scientist (UNC Charlotte, 2026) and Lead AI & Software Engineer at Incerta Intelligence in Charlotte, North Carolina. He is not the athletics director, the basketball coach, the cognitive psychologist Thomas H. Carr, or the paleontologist Thomas D. Carr of the same name. ORCID: ' +
  ORCID +
  '.';

/** The Person node, referenced by @id from every other node on every page. */
const personNode = () =>
  Object.freeze({
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Thomas Carr',
    alternateName: [
      'Thomas Carr, Ph.D.',
      'Thomas Carr PhD',
      'Thomas Carr AI',
      'Thomas Carr UNC Charlotte',
    ],
    givenName: 'Thomas',
    familyName: 'Carr',
    honorificSuffix: 'Ph.D.',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-card.png`,
    email: 'thomas@thomasc.tech',
    jobTitle: ['Lead AI & Software Engineer', 'AI Researcher', 'Computer Scientist'],
    worksFor: { '@id': ORG_INCERTA_ID },
    alumniOf: { '@id': ORG_UNCC_ID },
    affiliation: [{ '@id': ORG_INCERTA_ID }, { '@id': ORG_UNCC_ID }],
    homeLocation: {
      '@type': 'Place',
      name: 'Charlotte, North Carolina, USA',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        addressCountry: 'US',
      },
    },
    knowsAbout: [...KNOWS_ABOUT],
    disambiguatingDescription: DISAMBIGUATION,
    sameAs: [...SAME_AS],
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ORCID', value: ORCID, url: PROFILE_URLS.orcid },
      {
        '@type': 'PropertyValue',
        propertyID: 'Google Scholar',
        value: SCHOLAR_ID,
        url: PROFILE_URLS.scholar,
      },
      { '@type': 'PropertyValue', propertyID: 'DBLP', value: DBLP_PID, url: PROFILE_URLS.dblp },
      {
        '@type': 'PropertyValue',
        propertyID: 'Semantic Scholar',
        value: S2_AUTHOR_ID,
        url: PROFILE_URLS.semanticScholar,
      },
    ],
  });

const organizationNodes = () =>
  Object.freeze([
    {
      '@type': 'Organization',
      '@id': ORG_INCERTA_ID,
      name: 'Incerta Intelligence',
      alternateName: 'Incerta Intelligence Inc.',
    },
    {
      '@type': 'CollegeOrUniversity',
      '@id': ORG_UNCC_ID,
      name: 'University of North Carolina at Charlotte',
      alternateName: ['UNC Charlotte', 'UNCC'],
      url: 'https://www.charlotte.edu/',
      sameAs: 'https://www.charlotte.edu/',
    },
  ]);

module.exports = {
  SITE_URL,
  PERSON_ID,
  ORG_INCERTA_ID,
  ORG_UNCC_ID,
  ORCID,
  PROFILE_URLS,
  SAME_AS,
  KNOWS_ABOUT,
  DISAMBIGUATION,
  personNode,
  organizationNodes,
};
