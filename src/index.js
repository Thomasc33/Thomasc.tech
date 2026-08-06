import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Analytics plays no part in the first paint, so it is pulled in once the
// browser goes idle instead of riding along in the initial bundle.
const startAnalytics = () => {
  Promise.all([import('firebase/analytics'), import('./Analytics')])
    .then(([{ getAnalytics }, { default: app }]) => getAnalytics(app))
    .catch(() => {
      // Measurement is non-essential; a blocked or failed load must never
      // surface to the visitor.
    });
};

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startAnalytics, { timeout: 5000 });
} else {
  window.setTimeout(startAnalytics, 2000);
}
