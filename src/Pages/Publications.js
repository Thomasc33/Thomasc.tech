import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import '../css/Projects.css';

const publications = require('../Data/publications.json');

function PublicationPage() {
    // No need to manually calculate header height anymore as we use CSS variables

    function renderPublication(publication) {
        // Get the accent color from localStorage or use the default color
        const accentColor = localStorage.getItem('accentColor') || '#aa00ff';

        return (
            <div key={publication.title} className='Project'>
                <h1>{publication.title}</h1>
                <div className='ProjectColumn' style={{ borderTop: 'none' }}>
                    <h3>Conference</h3>
                    <h3>{publication.conference}</h3>
                </div>
                <div className='PublicationHeader'>
                    <h3>{publication.publicationType}</h3>
                    <div className='PublicationBadge' style={{ backgroundColor: accentColor }}>
                        {publication.status || 'Published'}
                    </div>
                </div>

                <p className='AuthorsList'>{publication.authors}</p>

                <p>{publication.abstract || publication.description}</p>

                {publication.keywords && (
                    <div className='SkillsContainer'>
                        {publication.keywords.map((keyword, index) => (
                            <div
                                key={index}
                                className='SkillTag'
                                style={{
                                    backgroundColor: `${accentColor}40`,
                                    border: `1px solid ${accentColor}`
                                }}
                            >
                                {keyword}
                            </div>
                        ))}
                    </div>
                )}

                {publication.links && (
                    <div className='ProjectLinkContainer'>
                        {publication.links.map((link, index) => (
                            <div key={index} className='ProjectLink'>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Publication Link"
                                >
                                    <LinkIcon />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <section className='ProjectsContainer'>
            <header>
                <h1 className="visually-hidden">Thomas Carr's Academic Publications and Research</h1>
                <p className="visually-hidden">Academic publications and ongoing research in ethical machine learning, privacy, and AI.</p>
            </header>

            <div className="publications-section">
                <h2>Published Works</h2>
                <hr />
                <div className="publications-grid">
                    {publications.published.map(renderPublication)}
                </div>
            </div>

            <div style={{ width: '100%', margin: '2rem 0' }} />

            <div className="publications-section">
                <h2>Ongoing Works</h2>
                <hr />
                <div className="publications-grid">
                    {publications.ongoing.map(renderPublication)}
                </div>
            </div>
        </section>
    );
}

export default PublicationPage;
