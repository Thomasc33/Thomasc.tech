import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// Firebase analytics
import { getAnalytics } from "firebase/analytics";
import Analytics from './Analytics'
getAnalytics(Analytics)


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);