import React from 'react';
import { Helmet } from 'react-helmet';
import publications from '../Data/publications.json';

const SITE_URL = 'https://thomasc.tech';
const SITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#thomas`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const ORG_INCERTA_ID = `${SITE_URL}/#incerta`;
const ORG_UNCC_ID = `${SITE_URL}/#uncc`;
const PUB_LIST_ID = `${SITE_URL}/#publications`;
const IMAGE_URL = `${SITE_URL}/android-chrome-512x512.png`;

const PAGE_TITLE =
  'Thomas Carr, Ph.D. | Privacy-Preserving AI Researcher | UNC Charlotte';
const PAGE_DESCRIPTION =
  'Thomas Carr, Ph.D. — Lead AI & Software Engineer at Incerta Intelligence. UNC Charlotte Ph.D. (2026) in Computing and Information Systems. Research on privacy-preserving machine learning for skeleton-based biometric motion data (ECCV, ICCV, CIKM). ORCID 0009-0006-6039-0209.';

const SAME_AS = [
  'https://orcid.org/0009-0006-6039-0209',
  'https://scholar.google.com/citations?hl=en&user=a1uc2zEAAAAJ',
  'https://github.com/thomasc33',
  'https://www.linkedin.com/in/thomasc33/',
];

const KNOW_ABOUT = [
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
  'Full-Stack Development',
];

const indexedPublications = [
  ...publications.published,
  ...publications.ongoing,
].filter((p) => p.status === 'Published' || p.status === 'Accepted');

const publicationNodes = indexedPublications.map((p, i) => {
  const id = `${SITE_URL}/#publication-${i}`;
  const isThesis = p.publicationType === 'Dissertation';
  return {
    '@type': isThesis ? 'Thesis' : 'ScholarlyArticle',
    '@id': id,
    headline: p.title,
    name: p.title,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    datePublished: String(p.year),
    creativeWorkStatus: p.status,
    isPartOf: {
      '@type': 'PublicationVolume',
      name: p.conference,
    },
    abstract: p.abstract || p.description || undefined,
    url: (p.links && p.links[0]) || p.projectPage || undefined,
    about: KNOW_ABOUT.slice(0, 6),
    inLanguage: 'en',
    ...(isThesis && {
      inSupportOf: 'Computing and Information Systems',
      educationalLevel: 'Doctorate',
      provider: { '@id': ORG_UNCC_ID },
    }),
  };
});

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL,
      name: 'Thomas Carr, Ph.D.',
      alternateName: [
        'thomasc.tech',
        'Thomas Carr AI Researcher',
        'Thomas Carr Privacy ML',
      ],
      description: PAGE_DESCRIPTION,
      publisher: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      inLanguage: 'en-US',
      copyrightHolder: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': WEBPAGE_ID,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      dateModified: '2026-07-29',
      inLanguage: 'en-US',
      isPartOf: { '@id': SITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: IMAGE_URL,
        width: 512,
        height: 512,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'meta[name="description"]'],
      },
    },
    {
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
      url: SITE_URL,
      image: IMAGE_URL,
      email: 'thomas@thomasc.tech',
      mainEntityOfPage: { '@id': WEBPAGE_ID },
      sameAs: SAME_AS,
      identifier: [
        {
          '@type': 'PropertyValue',
          propertyID: 'ORCID',
          value: '0009-0006-6039-0209',
          url: 'https://orcid.org/0009-0006-6039-0209',
        },
        {
          '@type': 'PropertyValue',
          propertyID: 'Google Scholar',
          value: 'a1uc2zEAAAAJ',
          url: 'https://scholar.google.com/citations?user=a1uc2zEAAAAJ',
        },
      ],
      jobTitle: [
        'Lead AI & Software Engineer',
        'AI Researcher',
        'Computer Scientist',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Lead AI & Software Engineer',
        occupationLocation: {
          '@type': 'City',
          name: 'Charlotte',
          containedInPlace: {
            '@type': 'State',
            name: 'North Carolina',
          },
        },
        skills: KNOW_ABOUT.join(', '),
      },
      worksFor: { '@id': ORG_INCERTA_ID },
      affiliation: [{ '@id': ORG_INCERTA_ID }, { '@id': ORG_UNCC_ID }],
      alumniOf: { '@id': ORG_UNCC_ID },
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
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          educationalLevel: 'Doctorate',
          name: 'Ph.D. in Computing and Information Systems',
          dateCreated: '2026-05',
          recognizedBy: { '@id': ORG_UNCC_ID },
          about: 'Preserving User Privacy on Skeleton-Based Motion Data',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          educationalLevel: 'Master',
          name: 'M.S. Computer Science',
          dateCreated: '2022',
          recognizedBy: { '@id': ORG_UNCC_ID },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          educationalLevel: 'Bachelor',
          name: 'B.S. Computer Science',
          dateCreated: '2021',
          recognizedBy: { '@id': ORG_UNCC_ID },
        },
      ],
      description: PAGE_DESCRIPTION,
      disambiguatingDescription:
        'Thomas Carr is a Ph.D. computer scientist (UNC Charlotte, 2026) and Lead AI & Software Engineer at Incerta Intelligence in Charlotte, NC — not the athletics director or basketball coach of the same name. Specializes in privacy-preserving machine learning, differential privacy, and skeleton-based biometric motion anonymization. ORCID: 0009-0006-6039-0209.',
      knowsAbout: KNOW_ABOUT,
      subjectOf: publicationNodes.map((n) => ({ '@id': n['@id'] })),
    },
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
      alternateName: ['UNC Charlotte', 'UNCC', 'Charlotte'],
      sameAs: 'https://www.charlotte.edu/',
      url: 'https://www.charlotte.edu/',
    },
    {
      '@type': 'ItemList',
      '@id': PUB_LIST_ID,
      name: 'Publications by Thomas Carr, Ph.D.',
      description:
        'Peer-reviewed publications and dissertation by Thomas Carr on privacy-preserving machine learning for skeleton-based motion data.',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: publicationNodes.length,
      itemListElement: publicationNodes.map((n, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@id': n['@id'] },
      })),
    },
    ...publicationNodes,
  ],
};

function SEO() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta
        name="keywords"
        content="Thomas Carr, Thomas Carr PhD, Thomas Carr AI, Thomas Carr AI researcher, Thomas Carr UNC Charlotte, Thomas Carr Charlotte, Thomas Carr Incerta Intelligence, Thomas Carr privacy, Thomas Carr machine learning, privacy-preserving machine learning, skeleton motion privacy, biometric motion anonymization, differential privacy, motion retargeting, DisentangledTMR, MIRAGE, PMR, ECCV 2026, ICCV 2025, CIKM 2023, ORCID 0009-0006-6039-0209"
      />
      <meta name="author" content="Thomas Carr" />
      <meta name="creator" content="Thomas Carr" />
      <meta name="publisher" content="Thomas Carr" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="rating" content="general" />
      <meta name="geo.region" content="US-NC" />
      <meta name="geo.placename" content="Charlotte" />
      <meta name="ICBM" content="35.2271, -80.8431" />

      <link rel="canonical" href={`${SITE_URL}/`} />
      <link rel="author" href={SITE_URL} />
      <link rel="me" href="https://orcid.org/0009-0006-6039-0209" />
      <link rel="me" href="https://github.com/thomasc33" />
      <link rel="me" href="https://www.linkedin.com/in/thomasc33/" />
      <link
        rel="me"
        href="https://scholar.google.com/citations?user=a1uc2zEAAAAJ"
      />
      <link
        rel="alternate"
        type="text/plain"
        href={`${SITE_URL}/llms.txt`}
        title="LLM-readable site index"
      />
      <link
        rel="alternate"
        type="text/plain"
        href={`${SITE_URL}/llms-full.txt`}
        title="LLM-readable full content"
      />
      <link
        rel="alternate"
        type="text/markdown"
        href={`${SITE_URL}/about.md`}
        title="About Thomas Carr"
      />
      <link
        rel="alternate"
        type="text/markdown"
        href={`${SITE_URL}/publications.md`}
        title="Publications by Thomas Carr"
      />

      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content="Thomas Carr, Ph.D." />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta property="og:image" content={IMAGE_URL} />
      <meta
        property="og:image:alt"
        content="Thomas Carr, Ph.D. — Privacy-Preserving AI Researcher"
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content="en_US" />
      <meta property="profile:first_name" content="Thomas" />
      <meta property="profile:last_name" content="Carr" />
      <meta property="profile:username" content="thomasc33" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={PAGE_TITLE} />
      <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE_URL} />
      <meta
        name="twitter:image:alt"
        content="Thomas Carr, Ph.D. — Privacy-Preserving AI Researcher"
      />
      <meta name="twitter:url" content={`${SITE_URL}/`} />

      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

export default SEO;
