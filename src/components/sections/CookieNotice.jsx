import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'bos_cookie_notice_dismissed';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-3"
      style={{
        background:   'rgba(6,8,20,0.97)',
        borderTop:    '1px solid rgba(99,102,241,0.18)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p className="text-xs text-gray-500 leading-relaxed">
        We use{' '}
        <a href="https://plausible.io" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Plausible Analytics
        </a>
        {' '}— privacy-first, no cookies, no personal data collected. See our{' '}
        <a href="/privacy.html" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>.
      </p>
      <button
        onClick={dismiss}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <X size={11} /> Dismiss
      </button>
    </div>
  );
}
