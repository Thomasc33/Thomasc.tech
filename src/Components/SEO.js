import React from 'react';
import { Helmet } from 'react-helmet';
import publications from '../Data/publications.json';

const SITE_URL = 'https://thomasc.tech';
const SITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#thomas`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

// ProfilePage schema: tells Google/LLMs this URL is a personal profile.
// The Person ↔ ProfilePage bidirectional link (mainEntity / mainEntityOfPage)
// is the strongest on-page signal for triggering a Knowledge Panel.
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': WEBPAGE_ID,
  url: SITE_URL,
  name: 'Thomas Carr, Ph.D. — AI Researcher & Software Engineer',
  description:
    'Portfolio and profile of Thomas Carr, Ph.D. — Lead AI & Software Engineer at Incerta Intelligence and computer science researcher specializing in privacy-preserving machine learning.',
  dateModified: '2026-07-29',
  mainEntity: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  inLanguage: 'en-US',
  isPartOf: { '@id': SITE_ID },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Thomas Carr',
  givenName: 'Thomas',
  familyName: 'Carr',
  honorificSuffix: 'Ph.D.',
  url: SITE_URL,
  mainEntityOfPage: { '@id': WEBPAGE_ID },
  email: 'thomas@thomasc.tech',
  sameAs: [
    'https://orcid.org/0009-0006-6039-0209',
    'https://scholar.google.com/citations?hl=en&user=a1uc2zEAAAAJ',
    'https://github.com/thomasc33',
    'https://www.linkedin.com/in/thomasc33/',
  ],
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'ORCID',
    value: '0009-0006-6039-0209',
    url: 'https://orcid.org/0009-0006-6039-0209',
  },
  jobTitle: 'Lead AI & Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Incerta Intelligence',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of North Carolina at Charlotte',
    sameAs: 'https://www.charlotte.edu/',
  },
  homeLocation: {
    '@type': 'Place',
    name: 'Charlotte, North Carolina, USA',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Doctorate',
      name: 'Ph.D. in Computing and Information Systems',
      dateCreated: '2026-05',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'University of North Carolina at Charlotte',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Master',
      name: 'M.S. Computer Science',
      dateCreated: '2022',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'University of North Carolina at Charlotte',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      name: 'B.S. Computer Science',
      dateCreated: '2021',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'University of North Carolina at Charlotte',
      },
    },
  ],
  description:
    'AI researcher and software engineer. Ph.D. in Computing and Information Systems (UNC Charlotte, May 2026). Lead AI & Software Engineer at Incerta Intelligence. Research: privacy-preserving machine learning for skeleton-based biometric motion data in VR and AR settings.',
  // disambiguatingDescription helps search engines and LLMs identify which
  // Thomas Carr this is and distinguish him from unrelated public figures.
  disambiguatingDescription:
    'Ph.D. computer scientist (UNC Charlotte, 2026) and AI researcher specializing in privacy-preserving machine learning, biometric motion data, and deep learning. Lead AI & Software Engineer at Incerta Intelligence, Charlotte, NC. ORCID: 0009-0006-6039-0209.',
  knowsAbout: [
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
    'Full-Stack Development',
  ],
};

const publicationSchemas = publications.published.map((p, i) => ({
  '@context': 'https://schema.org',
  '@type': p.publicationType === 'Dissertation' ? 'Thesis' : 'ScholarlyArticle',
  '@id': `${SITE_URL}/#publication-${i}`,
  headline: p.title,
  name: p.title,
  author: { '@id': PERSON_ID },
  datePublished: String(p.year),
  isPartOf: p.conference,
  abstract: p.abstract || p.description || undefined,
  url: p.links && p.links.length > 0 ? p.links[0] : p.projectPage || undefined,
  ...(p.publicationType === 'Dissertation' && {
    inSupportOf: 'Computing and Information Systems',
    educationalLevel: 'Doctorate',
  }),
}));

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'Thomas Carr, Ph.D.',
  description:
    'Portfolio of Thomas Carr, Ph.D. — Lead AI & Software Engineer at Incerta Intelligence and AI researcher (UNC Charlotte) working on privacy-preserving machine learning for skeleton-based biometric motion data.',
  author: { '@id': PERSON_ID },
  inLanguage: 'en-US',
};

function SEO() {
  return (
    <Helmet>
      <title>Thomas Carr, Ph.D. — AI Researcher & Software Engineer</title>
      <meta
        name="description"
        content="Lead AI & Software Engineer at Incerta Intelligence. Ph.D. in Computing and Information Systems (UNC Charlotte, 2026). Research: privacy-preserving machine learning for skeleton-based biometric motion data. ORCID 0009-0006-6039-0209."
      />
      <meta
        name="keywords"
        content="Thomas Carr, Thomas Carr PhD, Thomas Carr AI researcher, Thomas Carr UNC Charlotte, Thomas Carr Incerta Intelligence, Thomas Carr privacy ML, AI researcher, software engineer, privacy-preserving machine learning, skeleton motion data, biometric motion privacy, motion retargeting, differential privacy, UNC Charlotte, PhD Computing and Information Systems, ORCID 0009-0006-6039-0209, Incerta Intelligence, deep learning, computer vision, explainable AI, ECCV 2026, ICCV 2025"
      />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Thomas Carr, Ph.D. — AI Researcher & Software Engineer" />
      <meta
        property="og:description"
        content="Lead AI & Software Engineer at Incerta Intelligence. Ph.D., UNC Charlotte (2026). Research: privacy-preserving machine learning for skeleton-based biometric motion data."
      />
      <meta property="og:image" content={`${SITE_URL}/android-chrome-512x512.png`} />
      <meta property="og:image:alt" content="Thomas Carr, Ph.D. — AI Researcher" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:locale" content="en_US" />
      <meta property="profile:first_name" content="Thomas" />
      <meta property="profile:last_name" content="Carr" />
      <meta property="profile:username" content="thomasc33" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Thomas Carr, Ph.D. — AI Researcher & Software Engineer" />
      <meta
        name="twitter:description"
        content="Lead AI & Software Engineer at Incerta Intelligence. Ph.D., UNC Charlotte (2026). Research: privacy-preserving machine learning for skeleton-based biometric motion data."
      />
      <meta name="twitter:image" content={`${SITE_URL}/android-chrome-512x512.png`} />
      <meta name="twitter:image:alt" content="Thomas Carr, Ph.D. — AI Researcher" />
      <link rel="canonical" href={SITE_URL} />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLM-readable site index" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="LLM-readable full content" />
      <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {publicationSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default SEO;
