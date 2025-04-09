import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../css/Template.css';
const isUNCC = require('../isUNCC.json').isUNCC;

function PageTemplate(props) {
    const accent = localStorage.getItem('accentColor') || '#aa00ff';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Determine active page based on URL path
    const getActivePage = () => {
        const path = location.pathname;
        if (path.includes('/projects')) return 1;
        if (path.includes('/about')) return 2;
        if (path.includes('/publications')) return 3;
        if (path.includes('/contact')) return 4;
        return 0; // Home page
    };

    // Set the active page based on URL
    useEffect(() => {
        const activePage = getActivePage();
        props.setPage(activePage);
    }, [location, props.setPage]);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // Navigation items data
    const navItems = [
        { to: '/', icon: <HomeIcon />, label: 'Home', index: 0 },
        { to: '/projects', icon: <CodeIcon />, label: 'Projects', index: 1 },
        { to: '/about', icon: <PersonIcon />, label: 'About', index: 2 },
        { to: '/publications', icon: <ArticleIcon />, label: 'Publications', index: 3 },
        { to: '/contact', icon: <MailIcon />, label: 'Contact', index: 4 }
    ];

    // Social links data
    const socialLinks = [
        { href: 'https://github.com/thomasc33', icon: <GitHubIcon />, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/thomasc33/', icon: <LinkedInIcon />, label: 'LinkedIn' }
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
    };

    // Close mobile menu when a link is clicked
    const handleNavClick = (index) => {
        props.setPage(index);
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
            document.body.style.overflow = '';
        }
    };

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`} id='HeaderNavBar'>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to={`${isUNCC ? '/tcarr23' : ''}/`} onClick={() => handleNavClick(0)}>
                        <h1>Thomas Carr</h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul className="nav-links">
                        {navItems.map((item) => (
                            <li key={item.index} className={props.Page == item.index ? 'active' : ''}>
                                <Link
                                    to={`${isUNCC ? '/tcarr23' : ''}${item.to}`}
                                    onClick={() => handleNavClick(item.index)}
                                    aria-label={item.label}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-text">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social Links */}
                <div className="social-links">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMobileMenu}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    {navItems.map((item) => (
                        <li key={item.index} className={props.Page == item.index ? 'active' : ''}>
                            <Link
                                to={`${isUNCC ? '/tcarr23' : ''}${item.to}`}
                                onClick={() => handleNavClick(item.index)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="mobile-social">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default PageTemplate