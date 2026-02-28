import React from 'react';
import { Eye, BarChart3, Shield } from 'lucide-react';

const HOW_STEPS = [
  {
    icon: Eye,
    step: '01',
    title: 'Observe',
    desc: "Every agent output, tool call, and memory write enters the scoring pipeline in real time — captured as discrete, timestamped observations against the agent's verified baseline.",
  },
  {
    icon: BarChart3,
    step: '02',
    title: 'Score',
    desc: 'Four drift components computed per observation — semantic, stylistic, affective, and risk — plus six real-time HDIT behavioral vectors. Composite index classified into a severity band.',
  },
  {
    icon: Shield,
    step: '03',
    title: 'Enforce',
    desc: 'The governance FSM acts immediately. Tool calls blocked. Memory writes restricted. State transition recorded. Full audit entry appended — no human required for escalation.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-divider py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Three steps.<br />Continuous loop.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_STEPS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <span className="text-4xl font-black font-mono leading-none" style={{
                  background:           'linear-gradient(135deg, rgba(99,102,241,0.40) 0%, rgba(99,102,241,0.08) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}>{step}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-700 text-center max-w-xl mx-auto leading-relaxed">
            Every observation → score → enforcement action written to an append-only audit log
            with a sequential counter. Nothing is lost. Nothing is mutable. Every blocked action is on record.
          </p>
        </div>
      </div>
    </section>
  );
}
