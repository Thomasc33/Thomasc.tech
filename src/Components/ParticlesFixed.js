import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { isMobile } from 'react-device-detect';
import { useReducedMotion } from 'framer-motion';

const EMERALD = '#10b981';

const ParticlesFixed = () => {
    const [mounted, setMounted] = useState(false);
    const [ready, setReady] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        // A full-viewport field of drifting, line-linking particles is the
        // heaviest motion on the site. Never initialise the engine at all when
        // reduced motion is requested — the page reads fine without it.
        if (reduceMotion) return;

        setMounted(true);

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setReady(true);
        });
    }, [reduceMotion]);

    const options = useMemo(() => ({
        background: {
            color: {
                value: "transparent"
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: EMERALD
            },
            links: {
                enable: true,
                distance: 150,
                color: EMERALD,
                opacity: 0.2,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out"
                },
                random: false,
                speed: 0.8,
                straight: false,
                attract: {
                    enable: false
                }
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 60
            },
            opacity: {
                value: 0.5,
                animation: {
                    enable: true,
                    speed: 1,
                    min: 0.1,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 3 },
                animation: {
                    enable: true,
                    speed: 2,
                    min: 0.1,
                    sync: false
                }
            }
        },
        detectRetina: true
    }), []);

    if (isMobile || !mounted || !ready) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <Particles
                id="tsparticles"
                options={options}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default ParticlesFixed;
