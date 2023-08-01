import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import '../css/Projects.css'
import useWindowDimensions from '../Components/useWindowDimensions';

const publications = require('../Data/publications.json')

function PublicationPage(props) {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68

    const { height, width } = useWindowDimensions()

    function renderPublication(project) {
        return <div key={project.title} className='Project'>
            <h1>{project.title}</h1>
            <h2>{project.subtitle}</h2>
            <div className='ProjectColumn'>
                <h3 style={{ margin: '.5rem 1rem .5rem .5rem' }}>{project.timeframe}</h3>
                <h3 style={{ margin: '.5rem .5rem .5rem 1rem' }}>{project.organization}</h3>
            </div>
            <p>{project.description}</p>
            <div className='ProjectColumn'>
                <h3 style={{ margin: '.5rem 1rem .5rem .5rem' }}>Language/Framework</h3>
                <h3 style={{ margin: '.5rem .5rem .5rem 1rem' }}>Intensity</h3>
            </div>
            {project.langauge_framework.map(m =>
                <div key={m.label} className='ProjectColumn'>
                    <h3 style={{ marginleft: '.5rem' }}>{m.label}</h3>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        {m.stars >= 1 ? <StarIcon /> : <StarBorderIcon />}
                        {m.stars >= 2 ? <StarIcon /> : <StarBorderIcon />}
                        {m.stars >= 3 ? <StarIcon /> : <StarBorderIcon />}
                        {m.stars >= 4 ? <StarIcon /> : <StarBorderIcon />}
                        {m.stars >= 5 ? <StarIcon /> : <StarBorderIcon />}
                    </div>
                </div>
            )}
            <div className='ProjectLinkContainer'>
                {project.links.map(m => <div className='ProjectLink'><a href={m.href} target="_blank" rel="noreferrer">{m.icon === 'GitHub' ? <GitHubIcon /> : <LinkIcon />}</a></div >)}
            </div>
        </div>
    }

    return (
        <div className='ProjectsContainer' style={{ top: headerHeight, height: height - headerHeight }}>
            {/* {publications.map(m => renderPublication(m))} */}
            <h1 style={{ paddingTop: '8rem' }}>Coming Soon!</h1>
        </div>
    )
}

export default PublicationPage
