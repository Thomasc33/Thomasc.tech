import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import '../css/Projects.css';
import useWindowDimensions from '../Components/useWindowDimensions';

const publications = require('../Data/publications.json');

function PublicationPage() {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68;

    const { height } = useWindowDimensions();

    function renderPublication(publication) {
        return (
            <div key={publication.title} className='Project'>
                <h1>{publication.title}</h1>
                <h2>{publication.conference}</h2>
                <div className='ProjectColumn'>
                    <h3 style={{ margin: '.5rem 1rem .5rem .5rem' }}>{publication.authors}</h3>
                    <h3 style={{ margin: '.5rem .5rem .5rem 1rem' }}>{publication.publicationType}</h3>
                </div>
                <p>{publication.abstract || publication.description}</p>
                {publication.links && (
                    <div className='ProjectLinkContainer'>
                        {publication.links.map((link, index) => (
                            <div key={index} className='ProjectLink'>
                                <a href={link} target="_blank" rel="noreferrer">
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
        <div className='ProjectsContainer' style={{ top: headerHeight, height: height - headerHeight }}>
            <h1 style={{ paddingTop: '2rem' }}>Published Works</h1>
            <hr style={{ width: '90%', margin: '2rem auto', borderColor: 'gray', borderWidth: '1px' }} />
            {publications.published.map(renderPublication)}
            <div style={{ flexBasis: '100%', height: 0 }} />
            <h1 style={{ paddingTop: '2rem' }}>Ongoing Works</h1>
            <hr style={{ width: '90%', margin: '2rem auto', borderColor: 'gray', borderWidth: '1px' }} />
            {publications.ongoing.map(renderPublication)}
        </div>
    );
}

export default PublicationPage;
