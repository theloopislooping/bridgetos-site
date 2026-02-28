import React from 'react';

/**
 * Catches render errors in the subtree and shows a graceful fallback.
 * Prevents blank-screen failures from reaching the user.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight:      '100vh',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#03070f',
          color:          '#9ca3af',
          fontFamily:     'system-ui, sans-serif',
          gap:            '12px',
          padding:        '24px',
          textAlign:      'center',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb' }}>
            Something went wrong.
          </div>
          <div style={{ fontSize: '13px', maxWidth: '360px', lineHeight: '1.6' }}>
            Please refresh the page. If the problem persists, contact{' '}
            <a
              href="mailto:wendi.soto@bridgetos.com"
              style={{ color: '#818cf8', textDecoration: 'none' }}
            >
              wendi.soto@bridgetos.com
            </a>.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
