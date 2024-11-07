import React from 'react';
import '../css/About.css';
const { languages, frameworks, webServices, ide, operatingSystems, misc, machineLearning } = require('../Data/skills.json');
const experiences = require('../Data/experience.json');

function AboutPage(props) {
    let headerHeight = document.getElementById('HeaderNavBar');
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight;
    else headerHeight = 68;

    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', height: '94vh', color: 'white', overflow: 'scroll' }}>
            <div className='InfoContainer'>
                <h2>Education</h2>
                <div className='break' />
                <h3>The University of North Carolina at Charlotte</h3>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>Ph.D. Computer Science</p>
                    <p className='Right'>Spring 2023 - Present</p>
                </span>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>Software and Information Systems</p>
                    <p className='Right'>Ethical Machine Learning</p>
                </span>
                <div className='break' style={{ padding: '1rem' }} />
                <h3>The University of North Carolina at Charlotte</h3>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>M.S. Computer Science</p>
                    <p className='Right'>Spring 2022 - Fall 2022</p>
                </span>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>AI, Robotics, and Gaming</p>
                    <p className='Right'>3.8 GPA</p>
                </span>
                <div className='break' style={{ padding: '1rem' }} />
                <h3>The University of North Carolina at Charlotte</h3>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>B.S. Computer Science</p>
                    <p className='Right'>Fall 2019 - Fall 2021</p>
                </span>
                <div className='break' />
                <span className='InlineText'>
                    <p className='Left'>AI, Robotics, and Gaming</p>
                    <p className='Right'>3.714 GPA</p>
                </span>
                <hr />
                <h2>Work Experience</h2>
                <div className='break' />
                {renderWorkExperience()}
                <hr />
                <h2>Technical Skills</h2>
                <div className='break' />
                <h3>Machine Learning Techniques / AI</h3>
                <div className='break' />
                {machineLearning.map(m => renderSkill(m))}
                <div className='break' />
                <h3>Languages</h3>
                <div className='break' />
                {languages.map(m => renderSkill(m))}
                <div className='break' />
                <h3>Frameworks</h3>
                <div className='break' />
                {frameworks.map(m => renderSkill(m))}
                <div className='break' />
                <h3>Web Services</h3>
                <div className='break' />
                {webServices.map(m => renderSkill(m))}
                <div className='break' />
                <h3>IDE / Applications</h3>
                <div className='break' />
                {ide.map(m => renderSkill(m))}
                <div className='break' />
                <h3>Operating Systems</h3>
                <div className='break' />
                {operatingSystems.map(m => renderSkill(m))}
                <div className='break' />
                <h3>Misc</h3>
                <div className='break' />
                {misc.map(m => renderSkill(m))}
            </div>
        </div>
    );
}

function renderSkill(skill) {
    return (
        <div className='HoverableList'>
            <p>{skill.label}</p>
            <p className='ToolTip'>{skill.hint}</p>
        </div>
    );
}

// Function to render the work experience section
function renderWorkExperience() {
    return experiences.map((exp, index) => (
        <div key={index} style={{ marginBottom: '1.5rem' }}>
            <h3>{exp.title}</h3>
            <span className='InlineText'>
                <p className='Left'>{exp.organization}</p>
                <p className='Right'>{exp.timeframe}</p>
            </span>
            <ul className="ResponsibilitiesList">
                {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                ))}
            </ul>
            <div className='break' />
        </div>
    ));
}

export default AboutPage;
