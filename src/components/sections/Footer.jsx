import React from 'react';
import { Shield } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

export default function Footer() {
  return (
    <footer className="section-divider py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <Shield size={12} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">BridgetOS</span>
          <span className="text-gray-700 text-sm">·</span>
          <span className="text-gray-600 text-xs">Holborn Rowe LLC</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-600">
          <a
            href="https://www.linkedin.com/in/wendi-kimberli/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >LinkedIn</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gray-400 transition-colors">Contact</a>
          <span className="text-gray-700">·</span>
          <span>© 2026 Holborn Rowe LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
