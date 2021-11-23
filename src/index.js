import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Firebase analytics
import { getAnalytics } from "firebase/analytics";
import Analytics from './Analytics'
getAnalytics(Analytics)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);