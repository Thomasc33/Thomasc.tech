import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesTest = () => {
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            console.log('Engine ready');
            setReady(true);
        });
    }, []);
    
    if (!ready) return <div>Loading particles...</div>;
    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Particles
                options={{
                    background: { color: { value: "#000" } },
                    particles: {
                        color: { value: "#fff" },
                        number: { value: 100 },
                        move: { enable: true, speed: 2 },
                        size: { value: 3 }
                    }
                }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
            <div style={{ position: 'relative', color: 'white', padding: '20px' }}>
                <h1>Particles Test</h1>
                <p>If you see white particles on black background, it's working!</p>
            </div>
        </div>
    );
};

export default ParticlesTest;
