import React from 'react';
import { Typography, Box } from '@mui/material';

const FloatingText = ({
    children,
    variant = 'body1',
    animation = 'gentle',
    delay = 0,
    className = '',
    sx = {},
    ...props
}) => {
    const animationClasses = {
        gentle: 'floating-gentle',
        wave: 'floating-wave',
        bounce: 'floating-bounce',
        drift: 'floating-drift',
        hover: 'floating-hover',
        text: 'floating-text'
    };

    const delayClasses = {
        0: '',
        1: 'floating-delay-1',
        2: 'floating-delay-2',
        3: 'floating-delay-3',
        4: 'floating-delay-4',
        5: 'floating-delay-5'
    };

    return (
        <Typography
            variant={variant}
            className={`${animationClasses[animation]} ${delayClasses[delay]} ${className}`}
            sx={{
                display: 'inline-block',
                ...sx
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};

// Component for staggered floating text (word by word or character by character)
export const StaggeredFloatingText = ({
    text,
    variant = 'body1',
    animation = 'gentle',
    staggerType = 'word', // 'word' or 'character'
    className = '',
    sx = {},
    ...props
}) => {
    const splitText = staggerType === 'word' ? text.split(' ') : text.split('');
    
    return (
        <Box
            component="span"
            className={className}
            sx={{ display: 'inline-block', ...sx }}
            {...props}
        >
            {splitText.map((item, index) => (
                <Typography
                    key={index}
                    variant={variant}
                    component="span"
                    className={`floating-gentle floating-delay-${(index % 5) + 1}`}
                    sx={{
                        display: 'inline-block',
                        '--char-index': index,
                        marginRight: staggerType === 'word' ? '0.3em' : '0',
                    }}
                >
                    {item}
                </Typography>
            ))}
        </Box>
    );
};

// Component for hover-triggered floating
export const HoverFloatText = ({
    children,
    variant = 'body1',
    className = '',
    sx = {},
    ...props
}) => {
    return (
        <Typography
            variant={variant}
            className={`float-on-hover ${className}`}
            sx={{
                display: 'inline-block',
                cursor: 'pointer',
                ...sx
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default FloatingText;
