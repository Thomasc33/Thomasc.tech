import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesWorking = () => {
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setReady(true);
        });
    }, []);
    
    if (!ready) return null;
    
    return (
        <Particles
            options={{
                particles: {
                    number: { value: 50 },
                    color: { value: "#ff0000" },
                    size: { value: 3 },
                    move: { enable: true, speed: 1 }
                }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1
            }}
        />
    );
};

export default ParticlesWorking;
