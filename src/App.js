import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import ProjectPage from './Pages/Projects';
import ContactPage from './Pages/Contact';
import PublicationsPage from './Pages/Publications';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageTemplate from './Components/Template';
import ParticlesElement from './Components/Particles';
import SEO from './Components/SEO';
import './App.css';
import './css/Info.css';
const isUNCC = require('./isUNCC.json').isUNCC


function App(props) {
  const [Page, setPage] = useState(0)

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
    <BrowserRouter>
      <SEO />
      <ParticlesElement />
      <PageTemplate {...props} Page={Page} setPage={setPage} />
      <main className="page-content">
        <Routes>
          <Route exact path={`${isUNCC ? '/tcarr23' : ''}/projects`} element={<ProjectPage {...props} />} />
          <Route exact path={`${isUNCC ? '/tcarr23' : ''}/about`} element={<AboutPage {...props} />} />
          <Route exact path={`${isUNCC ? '/tcarr23' : ''}/contact`} element={<ContactPage {...props} />} />
          <Route exact path={`${isUNCC ? '/tcarr23' : ''}/publications`} element={<PublicationsPage {...props} />} />
          <Route exact path={`${isUNCC ? '/tcarr23' : ''}/`} element={<HomePage {...props} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;