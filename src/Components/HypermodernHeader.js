import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import '../css/HypermodernHeader.css';

// Styled components with hypermodern aesthetics
const ModernAppBar = styled(AppBar)(({ accentcolor, scrolled }) => ({
    background: scrolled 
        ? 'rgba(10, 10, 15, 0.95)' 
        : 'rgba(15, 15, 20, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: scrolled
        ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(170, 0, 255, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
        transition: 'left 0.8s ease',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${accentcolor}, transparent)`,
        transform: 'translateX(-100%)',
        transition: 'transform 0.5s ease',
    },
}));

const LogoContainer = styled(motion.div)(({ accentcolor }) => ({
    position: 'relative',
    cursor: 'pointer',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        background: `conic-gradient(from 0deg, ${accentcolor}, transparent, ${accentcolor})`,
        borderRadius: '12px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: -1,
        pointerEvents: 'none',
    },
    '&:hover::before': {
        opacity: 0.7,
    },
    '& > *': {
        position: 'relative',
        zIndex: 1,
    },
}));

const NavItem = styled(motion.div)(({ accentcolor, active }) => ({
    position: 'relative',
    padding: '10px 20px',
    borderRadius: '16px',
    cursor: 'pointer',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: active 
            ? `linear-gradient(135deg, ${accentcolor}20, ${accentcolor}10)`
            : 'transparent',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        zIndex: 0,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: active 
            ? `linear-gradient(135deg, ${accentcolor}30, transparent)`
            : 'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05))',
        borderRadius: '16px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1,
    },
    '&:hover::after': {
        opacity: 1,
    },
    '& > *': {
        position: 'relative',
        zIndex: 2,
    },
}));

const SocialButton = styled(motion.a)(({ accentcolor }) => ({
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '& svg': {
        fontSize: '24px',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 2,
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: `linear-gradient(135deg, ${accentcolor}20, transparent)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        borderRadius: '14px',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: `linear-gradient(45deg, ${accentcolor}, transparent, ${accentcolor})`,
        borderRadius: '14px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: -1,
    },
    '&:hover': {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))',
        border: `1px solid ${accentcolor}40`,
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${accentcolor}20`,
        '&::before': {
            opacity: 1,
        },
        '&::after': {
            opacity: 0.5,
        },
        '& svg': {
            color: accentcolor,
            filter: 'drop-shadow(0 0 8px rgba(170, 0, 255, 0.5))',
        },
    },
}));

const SlidingIndicator = styled(motion.div)(({ accentcolor }) => ({
    position: 'absolute',
    bottom: '-2px',
    height: '3px',
    background: `linear-gradient(90deg, ${accentcolor}, ${accentcolor}80)`,
    borderRadius: '2px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

function HypermodernHeader(props) {
    const { setPage } = props;
    const accent = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef(null);
    const navItemsRef = useRef([]);
    const location = useLocation();

    // Set the active page based on URL
    useEffect(() => {
        const getActivePage = () => {
            const path = location.pathname;
            if (path.includes('/projects')) return 1;
            if (path.includes('/about')) return 2;
            if (path.includes('/publications')) return 3;
            if (path.includes('/contact')) return 4;
            return 0;
        };
        
        const activePage = getActivePage();
        setPage(activePage);
        
        // Update sliding indicator position
        if (!isMobile && navItemsRef.current[activePage]) {
            const activeElement = navItemsRef.current[activePage];
            const { offsetLeft, offsetWidth } = activeElement;
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth,
            });
        }
    }, [location, setPage, isMobile]);

    // No longer needed - using CSS animation-direction: alternate

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        { href: 'https://github.com/Thomasc33', icon: <GitHubIcon />, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/thomasc33/', icon: <LinkedInIcon />, label: 'LinkedIn' }
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
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

    // Container variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Item variants for nav items
    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
    };

    return (
        <>
            <ModernAppBar
                position="fixed"
                accentcolor={accent}
                scrolled={scrolled}
                elevation={0}
                component={motion.header}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, py: 1 }}>
                    {/* Animated Logo */}
                    <LogoContainer
                        component={Link}
                        to="/"
                        onClick={() => handleNavClick(0)}
                        accentcolor={accent}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                    letterSpacing: '-0.5px',
                                    background: `linear-gradient(90deg, 
                                        #ffffff 0%, 
                                        #ffffff 25%, 
                                        ${accent} 50%, 
                                        #ffffff 75%, 
                                        #ffffff 100%)`,
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    willChange: 'background-position',
                                    animation: 'gradient-wave 6s ease-in-out infinite alternate',
                                }}
                            >
                                Thomas Carr
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    fontWeight: 800,
                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                    letterSpacing: '-0.5px',
                                    background: `linear-gradient(90deg, 
                                        ${accent} 0%, 
                                        #ffffff 25%, 
                                        ${accent} 50%, 
                                        #ffffff 75%, 
                                        ${accent} 100%)`,
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    opacity: 0.3,
                                    filter: 'blur(3px)',
                                    willChange: 'background-position',
                                    animation: 'gradient-wave 6s ease-in-out infinite alternate-reverse',
                                    pointerEvents: 'none',
                                }}
                            >
                                Thomas Carr
                            </Typography>
                        </Box>
                    </LogoContainer>

                    {/* Desktop Navigation with animations */}
                    {!isMobile && (
                        <motion.div 
                            ref={navRef}
                            style={{ 
                                display: 'flex', 
                                gap: '4px',
                                position: 'relative'
                            }}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <SlidingIndicator
                                accentcolor={accent}
                                animate={indicatorStyle}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                            {navItems.map((item) => (
                                <Link
                                    key={item.index}
                                    to={item.to}
                                    style={{ textDecoration: 'none' }}
                                    onClick={() => handleNavClick(item.index)}
                                >
                                    <NavItem
                                        ref={el => navItemsRef.current[item.index] = el}
                                        accentcolor={accent}
                                        active={props.Page === item.index}
                                        variants={itemVariants}
                                        onHoverStart={() => setHoveredIndex(item.index)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
                                            <motion.div
                                                animate={{
                                                    color: props.Page === item.index ? accent : 'rgba(255, 255, 255, 0.8)',
                                                    scale: hoveredIndex === item.index ? 1.2 : 1,
                                                }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: props.Page === item.index ? 600 : 500,
                                                    color: props.Page === item.index ? accent : 'rgba(255, 255, 255, 0.8)',
                                                    fontSize: '0.9rem',
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    </NavItem>
                                </Link>
                            ))}
                        </motion.div>
                    )}

                    {/* Social Links & Mobile Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isMobile && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'flex', gap: '8px' }}
                            >
                                {socialLinks.map((link, index) => (
                                    <SocialButton
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        accentcolor={accent}
                                        variants={itemVariants}
                                        whileHover={{ 
                                            scale: 1.1,
                                            rotate: [0, -5, 5, 0],
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <motion.div
                                            animate={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                            whileHover={{ color: accent }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                        >
                                            {link.icon}
                                        </motion.div>
                                    </SocialButton>
                                ))}
                            </motion.div>
                        )}

                        {isMobile && (
                            <IconButton
                                onClick={toggleMobileMenu}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                sx={{ color: 'white' }}
                                component={motion.button}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <CloseIcon key="close" />
                                    ) : (
                                        <MenuIcon key="menu" />
                                    )}
                                </AnimatePresence>
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </ModernAppBar>

            {/* Mobile Drawer with animations */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <Drawer
                        anchor="right"
                        open={mobileMenuOpen}
                        onClose={toggleMobileMenu}
                        PaperProps={{
                            component: motion.div,
                            initial: { x: '100%' },
                            animate: { x: 0 },
                            exit: { x: '100%' },
                            transition: { type: 'spring', stiffness: 300, damping: 30 },
                            sx: {
                                background: 'rgba(15, 15, 20, 0.95)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                width: 280,
                            }
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Typography variant="h6" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
                                    Navigation
                                </Typography>
                            </motion.div>
                            <List>
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.index}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <ListItem
                                            component={Link}
                                            to={item.to}
                                            onClick={() => handleNavClick(item.index)}
                                            sx={{
                                                borderRadius: '12px',
                                                mb: 1,
                                                color: props.Page === item.index ? accent : 'rgba(255, 255, 255, 0.8)',
                                                background: props.Page === item.index ? `${accent}20` : 'transparent',
                                                border: props.Page === item.index ? `1px solid ${accent}40` : '1px solid transparent',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: `${accent}15`,
                                                    color: accent,
                                                    transform: 'translateX(-5px)',
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItem>
                                    </motion.div>
                                ))}
                            </List>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    {socialLinks.map((link, index) => (
                                        <SocialButton
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={link.label}
                                            accentcolor={accent}
                                            whileHover={{ 
                                                scale: 1.1,
                                                rotate: [0, -5, 5, 0],
                                                transition: { duration: 0.3 }
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <motion.div
                                                animate={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                                whileHover={{ color: accent }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                            >
                                                {link.icon}
                                            </motion.div>
                                        </SocialButton>
                                    ))}
                                </Box>
                            </motion.div>
                        </Box>
                    </Drawer>
                )}
            </AnimatePresence>
        </>
    );
}

export default HypermodernHeader;
