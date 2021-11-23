import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import ProjectPage from './Pages/Projects';
import ContactPage from './Pages/Contact';
import React, { useState } from 'react';
import PageTemplate from './Components/Template';
import './App.css';
import './css/Info.css';


function App(props) {
  const [Page, setPage] = useState(0)
  let PageElement

  switch (Page) {
    case 1: PageElement = ProjectPage; document.title = 'Projects'; break;
    case 2: PageElement = AboutPage; document.title = 'About'; break;
    case 3: PageElement = ContactPage; document.title = 'Contact'; break;
    default: PageElement = HomePage; document.title = 'Home';;
  }

  return (
    <>
      <PageTemplate {...props} Page={Page} setPage={setPage} />
      <PageElement />
    </>

  );
}

export default App;