import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ParticlesBackground from './Components/ParticlesFixed';
import SEO from './Components/SEO';
import Portfolio from './Portfolio';
import './App.css';

function App() {
  const isUnccHosting = window.location.hostname === 'webpages.charlotte.edu';
  const basename = isUnccHosting ? '/tcarr23' : '/';

  return (
    <BrowserRouter basename={basename}>
      <SEO />
      <ParticlesBackground />
      <Portfolio />
    </BrowserRouter>
  );
}

export default App;
