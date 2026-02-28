import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ROWS = [
  { feature: 'Real-time behavioral drift detection',     bos: true,  obs: false, manual: false },
  { feature: 'Identity baseline per agent',              bos: true,  obs: false, manual: 'partial' },
  { feature: 'Automatic execution blocking',             bos: true,  obs: false, manual: false },
  { feature: 'Four-state governance FSM',                bos: true,  obs: false, manual: false },
  { feature: 'HDIT multi-vector monitoring',             bos: true,  obs: false, manual: false },
  { feature: 'Immutable append-only audit log',          bos: true,  obs: 'partial', manual: false },
  { feature: 'EU AI Act / NIST RMF artifacts',           bos: true,  obs: false, manual: 'partial' },
  { feature: 'Prompt injection detection',               bos: true,  obs: false, manual: false },
  { feature: 'Multi-agent identity divergence alerts',   bos: true,  obs: false, manual: false },
  { feature: 'No model modification required',           bos: true,  obs: true,  manual: true  },
];

function Cell({ val }) {
  if (val === true)      return <Check size={15} className="text-indigo-400 mx-auto" />;
  if (val === false)     return <X size={14} className="text-gray-700 mx-auto" />;
  if (val === 'partial') return <Minus size={14} className="text-gray-500 mx-auto" />;
  return null;
}

export default function Comparison() {
  return (
    <section id="comparison" className="section-divider py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Observability logs what happened.<br />BridgetOS stops it.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Existing observability tools were built for debugging, not enforcement.
            They record behavior — they don't govern it.
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] text-xs">

            {/* Header */}
            <div className="px-5 py-3.5 text-gray-600 font-semibold uppercase tracking-wider border-b border-white/5" />
            {[
              { label: 'BridgetOS', highlight: true  },
              { label: 'Observability tools', highlight: false },
              { label: 'Manual oversight', highlight: false },
            ].map(({ label, highlight }) => (
              <div
                key={label}
                className="px-4 py-3.5 text-center font-semibold border-b border-white/5 border-l border-l-white/5"
                style={{ color: highlight ? '#a5b4fc' : 'rgba(156,163,175,0.5)' }}
              >
                {label}
              </div>
            ))}

            {/* Rows */}
            {ROWS.map(({ feature, bos, obs, manual }, i) => (
              <React.Fragment key={feature}>
                <div
                  className="px-5 py-3 text-xs text-gray-400 border-b border-white/5"
                  style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                >
                  {feature}
                </div>
                {[
                  { val: bos,    highlight: true  },
                  { val: obs,    highlight: false },
                  { val: manual, highlight: false },
                ].map(({ val, highlight }, ci) => (
                  <div
                    key={ci}
                    className="px-4 py-3 flex items-center justify-center border-b border-white/5 border-l border-l-white/5"
                    style={{
                      background: highlight
                        ? (i % 2 === 0 ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.06)')
                        : (i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'),
                    }}
                  >
                    <Cell val={val} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="px-5 py-3 flex items-center gap-4 border-t border-white/5">
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <Minus size={11} className="text-gray-600" /> Partial support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
