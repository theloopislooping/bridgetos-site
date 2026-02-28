import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import InvestorPage from './InvestorPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <InvestorPage />
    </ErrorBoundary>
  </React.StrictMode>
);
