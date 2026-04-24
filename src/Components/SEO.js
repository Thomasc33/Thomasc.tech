import React from 'react';
import { Helmet } from 'react-helmet';
import publications from '../Data/publications.json';

const SITE_URL = 'https://thomasc.tech';
const PERSON_ID = `${SITE_URL}/#thomas`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Thomas Carr',
  honorificSuffix: 'Ph.D.',
  url: SITE_URL,
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
  jobTitle: 'AI Researcher & Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Incerta Intelligence',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of North Carolina at Charlotte',
    sameAs: 'https://www.charlotte.edu/',
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
    'AI researcher and software engineer. Ph.D. in Computing and Information Systems (UNC Charlotte, 2026). Research focus: privacy-preserving machine learning on skeleton-based motion data.',
  knowsAbout: [
    'Privacy-Preserving Machine Learning',
    'Skeleton-Based Motion Data',
    'Motion Retargeting',
    'Virtual Reality Privacy',
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
}));

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Thomas Carr, Ph.D.',
  description:
    'Portfolio of Thomas Carr, Ph.D. — AI researcher and software engineer working on privacy-preserving machine learning.',
  author: { '@id': PERSON_ID },
  inLanguage: 'en',
};

function SEO() {
  return (
    <Helmet>
      <title>Thomas Carr, Ph.D. — AI Researcher & Software Engineer</title>
      <meta
        name="description"
        content="AI researcher and software engineer. Ph.D. in Computing and Information Systems (UNC Charlotte, 2026). Privacy-preserving machine learning for skeleton-based motion data."
      />
      <meta
        name="keywords"
        content="Thomas Carr, AI researcher, software engineer, privacy-preserving machine learning, skeleton motion data, motion retargeting, UNC Charlotte, Ph.D. Computing and Information Systems"
      />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Thomas Carr, Ph.D." />
      <meta
        property="og:description"
        content="AI researcher and software engineer working on privacy-preserving machine learning."
      />
      <meta property="profile:first_name" content="Thomas" />
      <meta property="profile:last_name" content="Carr" />
      <link rel="canonical" href={SITE_URL} />
      <link rel="alternate" type="text/markdown" href={`${SITE_URL}/llms.txt`} />
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
