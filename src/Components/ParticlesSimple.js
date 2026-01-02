import React from 'react';
import Particles from '@tsparticles/react';

// Using the simplest possible configuration
const ParticlesSimple = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Particles
                options={{
                    particles: {
                        number: { value: 50 },
                        color: { value: '#ff0000' },
                        size: { value: 5 }
                    }
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default ParticlesSimple;
