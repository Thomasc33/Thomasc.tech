/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Particles from 'react-tsparticles'
import { isMobile } from 'react-device-detect';

export default (props) => {
    if (isMobile) return <></>
    const accent = localStorage.getItem('accentColor') || '#aa00ff'
    return (
        <Particles
            width='100vw'
            height='100vh'
            style={{ overflow: 'hidden', zIndex: 0, position: 'fixed', top: 0, left: 0 }}
            options={{
                background: {
                    color: {
                        value: "#1a1a1a"
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: "window",
                    events: {
                        onHover: {
                            enable: true,
                            mode: [],
                            parallax: {
                                enable: true,
                                force: 20,
                                smooth: 10,
                            }
                        }
                    }
                },
                particles: {
                    number: {
                        value: 30,
                    },
                    color: {
                        value: accent
                    },
                    links: {
                        color: "#99AAB5",
                        distance: 200,
                        enable: true,
                        opacity: .5,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'random',
                        random: true
                    },
                }
            }}
        />
    )
}