import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
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
import FloatingText from './FloatingText';

// Modern styled components
const ModernAppBar = styled(AppBar)(({ accentcolor }) => ({
    background: 'rgba(15, 15, 20, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: accentcolor,
    },
    '&.scrolled': {
        background: 'rgba(10, 10, 15, 0.95)',
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${accentcolor}20`,
    },
}));

const NavButton = styled(Box)(({ accentcolor, active }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: active ? accentcolor : 'rgba(255, 255, 255, 0.8)',
    background: active ? `${accentcolor}15` : 'transparent',
    border: active ? `1px solid ${accentcolor}30` : '1px solid transparent',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 500,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${accentcolor}10, transparent)`,
        transition: 'left 0.5s',
    },
    '&:hover': {
        color: accentcolor,
        background: `${accentcolor}10`,
        border: `1px solid ${accentcolor}30`,
        transform: 'translateY(-1px)',
        '&::before': {
            left: '100%',
        },
    },
}));

const SocialButton = styled(IconButton)(({ accentcolor }) => ({
    color: 'rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        color: accentcolor,
        background: `${accentcolor}15`,
        border: `1px solid ${accentcolor}30`,
        transform: 'translateY(-1px)',
    },
}));

function PageTemplate(props) {
    const { setPage } = props;
    const accent = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Set the active page based on URL
    useEffect(() => {
        const getActivePage = () => {
            const path = location.pathname;
            if (path.includes('/projects')) return 1;
            if (path.includes('/about')) return 2;
            if (path.includes('/publications')) return 3;
            if (path.includes('/contact')) return 4;
            return 0; // Home page
        };
        
        const activePage = getActivePage();
        setPage(activePage);
    }, [location, setPage]);

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
        <>
            <ModernAppBar
                position="fixed"
                accentcolor={accent}
                className={scrolled ? 'scrolled' : ''}
                elevation={0}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                    {/* Logo */}
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        onClick={() => handleNavClick(0)}
                    >
                        <FloatingText
                            variant="h5"
                            component="div"
                            animation="gentle"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                            }}
                        >
                            Thomas Carr
                        </FloatingText>
                    </Typography>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {navItems.map((item) => (
                                <NavButton
                                    key={item.index}
                                    component={Link}
                                    to={item.to}
                                    onClick={() => handleNavClick(item.index)}
                                    accentcolor={accent}
                                    active={props.Page === item.index}
                                >
                                    {item.icon}
                                    <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
                                        {item.label}
                                    </Typography>
                                </NavButton>
                            ))}
                        </Box>
                    )}

                    {/* Social Links & Mobile Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isMobile && socialLinks.map((link, index) => (
                            <SocialButton
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                accentcolor={accent}
                            >
                                {link.icon}
                            </SocialButton>
                        ))}

                        {isMobile && (
                            <IconButton
                                onClick={toggleMobileMenu}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                sx={{ color: 'white' }}
                            >
                                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </ModernAppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
                PaperProps={{
                    sx: {
                        background: 'rgba(15, 15, 20, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: 280,
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
                        Navigation
                    </Typography>
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item.index}
                                component={Link}
                                to={item.to}
                                onClick={() => handleNavClick(item.index)}
                                sx={{
                                    borderRadius: '12px',
                                    mb: 1,
                                    color: props.Page === item.index ? accent : 'rgba(255, 255, 255, 0.8)',
                                    background: props.Page === item.index ? `${accent}20` : 'transparent',
                                    border: props.Page === item.index ? `1px solid ${accent}40` : '1px solid transparent',
                                    '&:hover': {
                                        background: `${accent}15`,
                                        color: accent,
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {socialLinks.map((link, index) => (
                            <SocialButton
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                accentcolor={accent}
                            >
                                {link.icon}
                            </SocialButton>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default PageTemplate