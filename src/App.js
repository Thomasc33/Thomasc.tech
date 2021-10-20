import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import ProjectPage from './Pages/Projects';
import ContactPage from './Pages/Contact';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/projects" render={props => <ProjectPage {...props} />} />
      <Route exact path="/contact" render={props => <ContactPage {...props} />} />
      <Route exact path="/about" render={props => <AboutPage {...props} />} />
      <Route exact path="/" render={props => <HomePage {...props} />} />
    </BrowserRouter >
  );
}

export default App;
