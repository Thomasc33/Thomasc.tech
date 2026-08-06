import React, { Suspense, lazy } from 'react';
import SEO from './Components/SEO';
import Portfolio from './Portfolio';
import './App.css';

// Purely decorative, and the heaviest thing in the tree. Split it out so the
// particle engine downloads after the page above the fold is already painted.
const ParticlesBackground = lazy(() => import('./Components/ParticlesFixed'));

function App() {
  return (
    <>
      <SEO />
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>
      <Portfolio />
    </>
  );
}

export default App;
