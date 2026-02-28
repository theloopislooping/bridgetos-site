import React from 'react';

const STATS = [
  { value: '3',    label: 'active pilots'              },
  { value: '2',    label: 'enterprise conversations'   },
  { value: '1',    label: 'design partner onboarded'   },
  { value: 'Live', label: 'console operational'        },
];

const SECTORS = [
  'Autonomous AI deployment',
  'Financial services',
  'Legal technology',
  'Enterprise infrastructure',
];

export default function SocialProof() {
  return (
    <div className="section-divider py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* Pilot stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black tracking-tight" style={{ color: value === 'Live' ? '#2dd4bf' : '#fff' }}>{value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Sector row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-700 uppercase tracking-widest flex-shrink-0">
            In conversation with teams in
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5">
            {SECTORS.map(s => (
              <span key={s} className="text-xs font-semibold text-gray-600">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
