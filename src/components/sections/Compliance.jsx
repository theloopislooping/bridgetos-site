import React from 'react';
import { CheckCircle } from 'lucide-react';

const FRAMEWORKS = [
  {
    label: 'EU AI Act',
    desc: "Generates the documentation and monitoring records that systemic risk classification anticipates: per-agent behavioral and action logs, identity passports, governance state histories, and structured incident records. Organizations deploying high-risk autonomous AI systems can use BridgetOS artifacts to demonstrate continuous behavioral monitoring, execution governance, and human oversight capability.",
  },
  {
    label: 'NIST AI RMF',
    desc: "Across the Identify, Govern, Map, Measure, and Manage functions, BridgetOS provides: continuous behavioral and action measurement, an automated governed response mechanism, provenance-traceable identity records, and an immutable audit chain that supports post-incident analysis and formal risk documentation for agentic deployments.",
  },
];

const ARTIFACTS = [
  'Identity passports (fingerprint + calibration history + governance state + action profile)',
  'Drift logs (per-observation scoring with timestamp, severity, component breakdown)',
  'Behavioral fingerprints (compact identity signatures for provenance comparison)',
  'Governance state transitions (complete FSM history, actor-tagged, role-gated)',
  'Blocked action records (tool calls and memory writes intercepted by enforcement)',
  'NDJSON audit export (machine-readable, SIEM-compatible)',
];

const THREATS = [
  { label: 'Gradual drift',      desc: 'Slow behavioral displacement over extended operational periods — invisible to conventional logging, consequential in autonomous action contexts.' },
  { label: 'Prompt injection',   desc: "Adversarial input designed to redirect agent decision-making and tool use mid-session, exploiting responsiveness to instruction rather than breaking the model." },
  { label: 'Recursive collapse', desc: 'Feedback loops in self-referential agents where small deviations amplify across action cycles, compounding into significant behavioral deviation.' },
  { label: 'Identity cloning',   desc: 'Behavioral convergence between agents indicating unauthorized transfer or adversarial mimicry — critical in multi-agent orchestration environments.' },
];

export default function Compliance() {
  return (
    <section id="compliance" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Compliance & Risk Alignment</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Aligned with current<br />regulatory frameworks.
          </h2>
          <p className="text-gray-400 text-lg">
            BridgetOS produces the artifacts that agentic AI governance frameworks require —
            the records that demonstrate an autonomous system was continuously monitored,
            governed, and controlled throughout its operational lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {FRAMEWORKS.map(({ label, desc }) => (
            <div key={label} className="glass card-hover rounded-2xl p-6 md:p-8">
              <div className="inline-block px-2.5 py-1 rounded-md text-xs font-bold text-indigo-300 bg-indigo-500/12 border border-indigo-500/25 mb-4">
                {label}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-sm font-semibold text-white mb-5">Audit artifacts produced</h3>
          <div className="flex flex-col gap-3">
            {ARTIFACTS.map(a => (
              <div key={a} className="flex items-start gap-2.5">
                <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#2dd4bf' }} />
                <span className="text-xs text-gray-400">{a}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Threat classes actively monitored</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THREATS.map(({ label, desc }) => (
              <div key={label} className="rounded-xl p-4" style={{
                background: 'rgba(239,68,68,0.04)',
                border: '1px solid rgba(239,68,68,0.12)',
              }}>
                <p className="text-xs font-semibold text-red-400 mb-1.5">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
