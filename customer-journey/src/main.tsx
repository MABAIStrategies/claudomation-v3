/**
 * Application Entry Point
 *
 * Renders the main App component into the DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeAnalytics } from './utils/analytics';

// Initialize analytics
initializeAnalytics();

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html has a div with id="root".');
}

// Create and render the React root
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
