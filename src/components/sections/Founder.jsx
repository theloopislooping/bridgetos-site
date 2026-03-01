import React from 'react';
import { Users } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

const ADVISORY_SLOTS = [
  { area: 'Enterprise AI Infrastructure',   note: 'Open — seeking operators scaling agentic deployments'     },
  { area: 'AI Policy & Regulatory Affairs', note: 'Open — EU AI Act + NIST RMF domain expertise'             },
  { area: 'Cybersecurity & Identity',       note: 'Open — identity systems, zero-trust, security governance'  },
];

export default function Founder() {
  return (
    <section id="founder" className="section-divider py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-16 text-center">
          Founder & Foundation
        </p>

        <blockquote className="text-center mb-16">
          <div className="w-8 h-px bg-indigo-600/40 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight italic mb-6 max-w-2xl mx-auto">
            "Agentic AI doesn't fail by hallucinating. It fails by drifting. We prevent the drift."
          </p>
          <div className="w-8 h-px bg-indigo-600/40 mx-auto" />
        </blockquote>

        <div className="glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <img
              src="/wendi.png"
              alt="Wendi Soto"
              className="flex-shrink-0 w-16 h-16 rounded-full object-cover object-top border border-indigo-500/30"
            />
            <div>
              <div className="flex items-center justify-between gap-4 mb-0.5">
                <p className="text-white font-semibold text-sm">Wendi Soto</p>
                <a
                  href="https://www.linkedin.com/in/wendi-kimberli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  LinkedIn →
                </a>
              </div>
              <p className="text-xs text-indigo-400 mb-4">Founder · PhD Candidate, King's College London</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Background spanning clinical science, cybersecurity project management, and advanced
                work in adaptive learning systems. BridgetOS was developed prior to my doctoral
                program as an independent R&D initiative focused on identity governance, drift
                detection, and behavioral stability in agentic AI systems.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                My current doctoral research at King's College London examines adaptive cybersecurity
                education, recursive feedback architectures, and human–AI co-evolution in security
                training. I am building an adaptive AI tool that models user cognition in real time
                to strengthen long-term cybersecurity behavior.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                The two tracks remain separate: BridgetOS as a technical governance layer for
                agentic AI, and my PhD as formal research into adaptive cybersecurity learning systems.
              </p>
              <p className="text-xs text-gray-600 mt-4">
                Intellectual property held under Holborn Rowe LLC.
              </p>
            </div>
          </div>
        </div>
        {/* Advisory board */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users size={14} className="text-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Advisory Board — Forming
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {ADVISORY_SLOTS.map(({ area, note }) => (
              <div key={area} className="flex items-start gap-4 rounded-xl px-4 py-3.5" style={{
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.12)',
              }}>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-300">{area}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-700 mt-4 leading-relaxed">
            Interested in an advisory role?{' '}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Advisory Interest`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Get in touch →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
