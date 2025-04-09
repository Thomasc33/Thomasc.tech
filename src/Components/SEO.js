import React from 'react';
import { Helmet } from 'react-helmet';

function SEO() {
  // Structured data for a person (you)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Thomas Carr",
    "url": "https://thomasc.tech",
    "image": "https://media.licdn.com/dms/image/v2/D4E03AQGZMDNy_cJW5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728522972149?e=1736380800&v=beta&t=_vrrBs6_6OPJZq-iK-r_PG_7xAkIh4ts2PwyHxDFExs",
    "sameAs": [
      "https://github.com/thomasc33",
      "https://www.linkedin.com/in/thomasc33/"
    ],
    "jobTitle": "Computer Science Ph.D. Student",
    "worksFor": {
      "@type": "Organization",
      "name": "University of North Carolina at Charlotte"
    },
    "description": "Computer Science Ph.D. researcher specializing in ethical machine learning, privacy, and fairness.",
    "knowsAbout": [
      "Ethical Machine Learning",
      "Privacy",
      "Fairness",
      "AI",
      "Full-stack Development",
      "Computer Science"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of North Carolina at Charlotte"
    }
  };

  // Structured data for your website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://thomasc.tech",
    "name": "Thomas Carr - Computer Science Ph.D. Researcher",
    "description": "Portfolio website for Thomas Carr, Computer Science Ph.D. researcher specializing in ethical machine learning, privacy, and fairness.",
    "author": {
      "@type": "Person",
      "name": "Thomas Carr"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;
