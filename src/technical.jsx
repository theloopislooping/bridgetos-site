import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TechnicalBriefing from './TechnicalBriefing.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <TechnicalBriefing />
    </ErrorBoundary>
  </React.StrictMode>
);
