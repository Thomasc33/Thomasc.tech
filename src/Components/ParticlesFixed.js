import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { isMobile } from 'react-device-detect';

const ParticlesFixed = () => {
    const [mounted, setMounted] = useState(false);
    const [accent, setAccent] = useState('#8b5cf6');
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        setAccent(localStorage.getItem('accentColor') || '#8b5cf6');
        
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setReady(true);
        });
    }, []);

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
                value: accent,
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false
                }
            },
            links: {
                enable: true,
                distance: 150,
                color: accent,
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
                value: 80
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
    }), [accent]);

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
