import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import ProjectPage from './Pages/Projects';
import ContactPage from './Pages/Contact';
import PublicationsPage from './Pages/Publications';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageTemplate from './Components/Template';
import ParticlesElement from './Components/Particles';
import './App.css';
import './css/Info.css';


function App(props) {
  const [Page, setPage] = useState(0)
  return (
    <BrowserRouter>
      <ParticlesElement />
      <PageTemplate {...props} Page={Page} setPage={setPage} />
      <Routes>
        <Route exact path='/projects' element={<ProjectPage {...props} />} />
        <Route exact path='/about' element={<AboutPage {...props} />} />
        <Route exact path='/contact' element={<ContactPage {...props} />} />
        <Route exact path='/publications' element={<PublicationsPage {...props} />} />
        <Route exact path='/' element={<HomePage {...props} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;