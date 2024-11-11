import React, { useState } from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
const isUNCC = require('../isUNCC.json').isUNCC;

function HomePage(props) {
    // Get the accent color from localStorage or use the default color
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';

    // Separate hover states for each button
    const [hoveredButton, setHoveredButton] = useState({
        projects: false,
        publications: false,
        resume: false
    });

    // Function to dynamically adjust color shade
    function shadeColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = ((num >> 8) & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000
            + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100
            + (B < 255 ? (B < 1 ? 0 : B) : 255))
            .toString(16).slice(1);
    }

    let headerHeight = document.getElementById('HeaderNavBar');
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight;
    else headerHeight = 68;

    return (
        <div className="HeroSection" style={{ top: `${headerHeight}px`, width: '100vw', height: '100vh', color: 'white', overflow: 'hidden' }}>
            <div className="HomeContent">
                <div className="IntroText">
                    <h1>Hi! I'm Thomas Carr</h1>
                    <h3>Computer Science Ph.D. Student | Researcher in Ethical Machine Learning, Privacy, and Fairness</h3>
                    <p>
                        With a strong foundation in full-stack development and academic expertise in privacy-preserving systems,
                        I bring a balanced approach to AI research and software engineering. Passionate about solving real-world
                        problems with ethical and privacy-conscious solutions.
                    </p>
                    <div className="ButtonContainer">
                        <Link
                            to={`${isUNCC ? '/tcarr23' : ''}/projects`}
                            onClick={() => props.setPage(1)}
                            style={{
                                backgroundColor: hoveredButton.projects ? shadeColor(accentColor, -20) : accentColor,
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={() => setHoveredButton({ ...hoveredButton, projects: true })}
                            onMouseLeave={() => setHoveredButton({ ...hoveredButton, projects: false })}
                        >
                            Explore Projects
                        </Link>
                        <Link
                            to={`${isUNCC ? '/tcarr23' : ''}/publications`}
                            onClick={() => props.setPage(3)}
                            style={{
                                backgroundColor: hoveredButton.publications ? shadeColor(accentColor, -20) : accentColor,
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={() => setHoveredButton({ ...hoveredButton, publications: true })}
                            onMouseLeave={() => setHoveredButton({ ...hoveredButton, publications: false })}
                        >
                            View Publications
                        </Link>
                        <Link
                            onClick={() => props.setPage(2)}
                            to={`${isUNCC ? '/tcarr23' : ''}/about`}
                            style={{
                                backgroundColor: hoveredButton.resume ? shadeColor(accentColor, -20) : accentColor,
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={() => setHoveredButton({ ...hoveredButton, resume: true })}
                            onMouseLeave={() => setHoveredButton({ ...hoveredButton, resume: false })}
                        >
                            View Resume
                        </Link>
                    </div>
                </div>
                {/* Optional profile photo or visual element */}
                <div className="Photo">
                    <img src="https://media.licdn.com/dms/image/v2/D4E03AQGZMDNy_cJW5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728522972149?e=1736380800&v=beta&t=_vrrBs6_6OPJZq-iK-r_PG_7xAkIh4ts2PwyHxDFExs" alt="Thomas Carr" className="ProfilePhoto" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
