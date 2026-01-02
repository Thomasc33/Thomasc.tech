import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import ProjectsPage from './Pages/Projects';
import PublicationsPage from './Pages/Publications';
import ContactPage from './Pages/Contact';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageTemplate from './Components/HypermodernHeader';
import ParticlesBackground from './Components/ParticlesFixed';
import SEO from './Components/SEO';
import './App.css';
import './css/Info.css';


function App(props) {
  const [Page, setPage] = useState(0)
  
  // Detect if we're on UNCC hosting and set basename accordingly
  const isUnccHosting = window.location.hostname === 'webpages.charlotte.edu';
  const basename = isUnccHosting ? '/tcarr23' : '/';

  // Set the accent color as a CSS variable
  React.useEffect(() => {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    document.documentElement.style.setProperty('--accent-color', accentColor);

    // Convert hex to RGB for CSS variables
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ?
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(accentColor));
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <SEO />
      <ParticlesBackground />
      <PageTemplate {...props} Page={Page} setPage={setPage} />
      <main className="page-content">
        <Routes>
          <Route exact path="/projects" element={<ProjectsPage {...props} />} />
          <Route exact path="/about" element={<AboutPage {...props} />} />
          <Route exact path="/contact" element={<ContactPage {...props} />} />
          <Route exact path="/publications" element={<PublicationsPage {...props} />} />
          <Route exact path="/" element={<HomePage {...props} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;