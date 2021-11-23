import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import '../css/Projects.css'

const projects = require('../Data/projects.json')

function ProjectPage(props) {
    function renderProject(project) {
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
        <div className='ProjectsContainer'>
            {projects.map(m => renderProject(m))}
        </div>
    )
}

export default ProjectPage
