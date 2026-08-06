import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

const TypingAnimation = ({ words, speed = 100, deleteSpeed = 50, pauseDuration = 2000 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        // A caret cycling through words forever is exactly the kind of motion
        // the preference is asking us to stop. Show the first phrase in full
        // and leave it there.
        if (reduceMotion) {
            setCurrentText(words[0]);
            return undefined;
        }

        const currentWord = words[currentWordIndex];
        
        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (charIndex < currentWord.length) {
                    setCurrentText(currentWord.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // Finished typing, pause before deleting
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setCurrentText(currentWord.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentWordIndex, words, speed, deleteSpeed, pauseDuration, reduceMotion]);

    return (
        <Box sx={{ display: 'inline-block', position: 'relative' }}>
            <Typography component="span" sx={{ color: 'inherit' }}>
                {currentText}
            </Typography>
            <Box
                component="span"
                sx={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1.2em',
                    backgroundColor: 'currentColor',
                    marginLeft: '2px',
                    animation: 'blink 1s infinite',
                    '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0 },
                    },
                }}
            />
        </Box>
    );
};

export default TypingAnimation;
