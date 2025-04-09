import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import '../css/Projects.css'
import useWindowDimensions from '../Components/useWindowDimensions';

const projects = require('../Data/projects.json')

function ProjectPage(props) {
    // No need to manually calculate header height anymore as we use CSS variables

    function renderProject(project) {
        // Get the accent color from localStorage or use the default color
        const accentColor = localStorage.getItem('accentColor') || '#aa00ff';

        return (
            <div key={project.title} className='Project'>
                <h1>{project.title}</h1>
                <h2>{project.subtitle}</h2>
                <div className='ProjectColumn' style={{ borderTop: 'none' }}>
                    <h3>{project.timeframe}</h3>
                    <h3>{project.organization}</h3>
                </div>
                <p>{project.description}</p>

                <div className='SkillsContainer'>
                    {project.langauge_framework.slice(0, 6).map(skill => (
                        <div
                            key={skill.label}
                            className='SkillTag'
                            style={{
                                backgroundColor: `${accentColor}${skill.stars * 15}`,
                                border: `1px solid ${accentColor}`
                            }}
                        >
                            {skill.label}
                        </div>
                    ))}
                    {project.langauge_framework.length > 6 && (
                        <div className='SkillTag' style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                            +{project.langauge_framework.length - 6} more
                        </div>
                    )}
                </div>

                <div className='ProjectLinkContainer'>
                    {project.links.map((link, index) => (
                        <div key={index} className='ProjectLink'>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.icon}
                            >
                                {link.icon === 'GitHub' ? <GitHubIcon /> : <LinkIcon />}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section className='ProjectsContainer'>
            <header>
                <h1 className="visually-hidden">Thomas Carr's Projects and Portfolio</h1>
                <p className="visually-hidden">Explore my projects in AI, machine learning, privacy research, and full-stack development.</p>
            </header>
            <div className="projects-grid">
                {projects.map(m => renderProject(m))}
            </div>
        </section>
    )
}

export default ProjectPage
