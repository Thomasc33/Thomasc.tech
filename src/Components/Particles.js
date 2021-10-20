/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Particles from 'react-tsparticles'

export default (props) => {
    return (
        <Particles
            width='100vw'
            height='100vh'
            style={{ overflow: 'hidden' }}
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
                            mode: "attract"
                        },
                        onClick: {
                            enabled: true,
                            mode: 'attract'
                        }
                    },
                    modes: {
                        attract: {
                            quantity: .1
                        },
                        grab: {
                            distance: 150
                        }
                    }
                },
                particles: {
                    number: {
                        value: 60,
                    },
                    color: {
                        value: props.color
                    },
                    links: {
                        color: "#99AAB5",
                        distance: 50,
                        enable: true,
                        opacity: .5,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: .3,
                        direction: 'random',
                        random: true
                    },
                }
            }}
        />
    )
}