/* eslint-disable import/no-anonymous-default-export */
import React, { useCallback, useMemo } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { isMobile } from 'react-device-detect';

export default (props) => {
    if (isMobile) return <></>
    const accent = localStorage.getItem('accentColor') || '#aa00ff'
    
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log('Particles loaded');
    }, []);

    const options = useMemo(() => ({
        background: {
            color: {
                value: "transparent"
            },
        },
        fpsLimit: 60,
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
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out"
                },
                random: true,
                speed: 0.5,
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
                value: 40
            },
            opacity: {
                value: 0.3,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
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
                    minimumValue: 0.1,
                    sync: false
                }
            }
        },
        detectRetina: true
    }), [accent]);

    return <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} />;
}
