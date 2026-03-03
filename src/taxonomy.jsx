import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DriftTaxonomy from './components/DriftTaxonomy.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DriftTaxonomy />
    </ErrorBoundary>
  </React.StrictMode>
);
