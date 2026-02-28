import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function StickyBar({ onJoin }) {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 md:left-56 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div
        className="max-w-2xl mx-auto rounded-2xl px-5 py-4 flex items-center justify-between gap-4 pointer-events-auto"
        style={{
          background:     'rgba(10,12,26,0.93)',
          border:         '1px solid rgba(99,102,241,0.28)',
          backdropFilter: 'blur(14px)',
          boxShadow:      '0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.08)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse flex-shrink-0" />
          <p className="text-sm text-gray-300 font-medium truncate">
            BridgetOS is in early access.{' '}
            <span className="text-gray-500 hidden sm:inline">Design partners and investors welcome.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onJoin}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
          >
            Join the Waitlist
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-gray-600 hover:text-gray-400 transition-colors"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
