import React, { useState } from 'react';
import { X, RadioTower } from 'lucide-react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="w-full flex items-center"
      style={{
        background: 'linear-gradient(90deg, rgba(79,70,229,0.18) 0%, rgba(139,92,246,0.18) 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.2)',
        minHeight: '40px',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <RadioTower size={12} className="text-indigo-400 shrink-0" />
          <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: '#2dd4bf' }} aria-hidden="true" />
          <p className="text-xs text-gray-200 truncate">
            <span className="font-semibold text-white">Pilots live</span>
            {' '}—{' '}
            deploying with autonomous agents and enterprise teams.{' '}
            <a
              href="#partnership"
              className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors hidden sm:inline"
            >
              Join early access →
            </a>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 text-gray-500 hover:text-gray-300 transition-colors p-1 rounded"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
