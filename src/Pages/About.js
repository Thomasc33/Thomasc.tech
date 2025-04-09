import React from 'react';
import '../css/About.css';
const { languages, frameworks, webServices, ide, operatingSystems, misc, machineLearning } = require('../Data/skills.json');
const experiences = require('../Data/experience.json');

function AboutPage(props) {
    // Get the accent color for skill level calculations
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';

    // Function to calculate a random skill level between 3-5 stars for demo purposes
    // In a real app, you would have actual skill levels in your data
    const getSkillLevel = () => {
        return Math.floor(Math.random() * 3) + 3; // Random number between 3-5
    };

    // Function to render star rating
    const renderStarRating = (level) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= level) {
                // Full star
                stars.push(
                    <div key={i} className="skill-star">
                        <div className="skill-star-bg"></div>
                        <div className="skill-star-fill"></div>
                    </div>
                );
            } else if (i === Math.ceil(level) && !Number.isInteger(level)) {
                // Half star
                stars.push(
                    <div key={i} className="skill-star skill-star-half">
                        <div className="skill-star-bg"></div>
                        <div className="skill-star-fill"></div>
                    </div>
                );
            } else {
                // Empty star
                stars.push(
                    <div key={i} className="skill-star skill-star-empty">
                        <div className="skill-star-bg"></div>
                        <div className="skill-star-fill"></div>
                    </div>
                );
            }
        }
        return stars;
    };

    // Function to render a skill card
    const renderSkillCard = (skill, iconText, index) => {
        const level = getSkillLevel();
        return (
            <div className="skill-card" key={`${iconText}-${skill.label}-${index || Math.random()}`}>
                <div className="skill-icon" style={{ backgroundColor: `${accentColor}20` }}>
                    <span>{iconText}</span>
                </div>
                <h4 className="skill-name">{skill.label}</h4>
                <div className="skill-rating">
                    {renderStarRating(level)}
                </div>
                <div className="skill-level-text">
                    {level >= 5 ? "Expert" : level >= 4 ? "Advanced" : "Proficient"}
                </div>
            </div>
        );
    };

    return (
        <section className='about-page'>
            <article className='InfoContainer'>
                <header>
                    <h1 className="visually-hidden">Thomas Carr - Resume and Skills</h1>
                    <p className="visually-hidden">Computer Science Ph.D. researcher at UNC Charlotte specializing in ethical machine learning, privacy, and fairness.</p>
                </header>

                {/* Introduction Section */}
                <div className="resume-section">
                    <h1 className="section-title">Resume</h1>
                    <p className="section-subtitle">
                        Computer Science Ph.D. researcher specializing in ethical machine learning, privacy, and fairness.
                        Passionate about solving real-world problems with ethical and privacy-conscious solutions.
                    </p>
                </div>

                {/* Education Section */}
                <div className="resume-section">
                    <h2 className="section-title">Education</h2>
                    <div className="timeline-education">
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <div className="timeline-date">Spring 2023 - Present</div>
                                <h3 className="timeline-title">Ph.D. Computer Science</h3>
                                <p className="timeline-subtitle">University of North Carolina at Charlotte</p>
                                <p className="timeline-text">Software and Information Systems with focus on Ethical Machine Learning</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-content">
                                <div className="timeline-date">Spring 2022 - Fall 2022</div>
                                <h3 className="timeline-title">M.S. Computer Science</h3>
                                <p className="timeline-subtitle">University of North Carolina at Charlotte</p>
                                <p className="timeline-text">AI, Robotics, and Gaming concentration with a 3.8 GPA</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-content">
                                <div className="timeline-date">Fall 2019 - Fall 2021</div>
                                <h3 className="timeline-title">B.S. Computer Science</h3>
                                <p className="timeline-subtitle">University of North Carolina at Charlotte</p>
                                <p className="timeline-text">AI, Robotics, and Gaming concentration with a 3.714 GPA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Experience Section */}
                <div className="resume-section">
                    <h2 className="section-title">Work Experience</h2>
                    <div className="timeline-experience">
                        {experiences.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-content">
                                    <h3 className="timeline-title">{exp.title}</h3>
                                    <p className="timeline-subtitle">{exp.organization}</p>
                                    <span className="timeline-date">{exp.timeframe}</span>
                                    <ul className="ResponsibilitiesList">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="resume-section">
                    <h2 className="section-title">Technical Skills</h2>
                    <p className="section-subtitle">
                        A comprehensive overview of my technical expertise and proficiency levels across various domains.
                    </p>

                    <div className="skills-container">
                        {/* Machine Learning Skills */}
                        <div className="skills-category">
                            <h3 className="skills-category-title">Machine Learning & AI</h3>
                            <div className="skills-grid">
                                {machineLearning.map((skill, index) =>
                                    renderSkillCard(skill, "ML", index)
                                )}
                            </div>
                        </div>

                        {/* Programming Languages */}
                        <div className="skills-category">
                            <h3 className="skills-category-title">Programming Languages</h3>
                            <div className="skills-grid">
                                {languages.map((skill, index) =>
                                    renderSkillCard(skill, "PL", index)
                                )}
                            </div>
                        </div>

                        {/* Frameworks */}
                        <div className="skills-category">
                            <h3 className="skills-category-title">Frameworks</h3>
                            <div className="skills-grid">
                                {frameworks.map((skill, index) =>
                                    renderSkillCard(skill, "FW", index)
                                )}
                            </div>
                        </div>

                        {/* Web Services */}
                        <div className="skills-category">
                            <h3 className="skills-category-title">Web Services</h3>
                            <div className="skills-grid">
                                {webServices.map((skill, index) =>
                                    renderSkillCard(skill, "WS", index)
                                )}
                            </div>
                        </div>

                        {/* Tools & Applications */}
                        <div className="skills-category">
                            <h3 className="skills-category-title">Tools & Applications</h3>
                            <div className="skills-grid">
                                {[...ide, ...operatingSystems, ...misc].map((skill, index) =>
                                    renderSkillCard(skill, "T", index)
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p className="visually-hidden">Contact Thomas Carr for research collaborations, speaking engagements, or academic inquiries.</p>
                </footer>
            </article>
        </section>
    );
}



export default AboutPage;
