import React from 'react';
import { Cpu, TrendingUp, Shield, Fingerprint, Layers } from 'lucide-react';

const LAYERS = [
  {
    num: '01',
    icon: Cpu,
    title: 'Identity Engine',
    body: "The Identity Engine maintains each agent's identity vector — a multi-dimensional representation of its behavioral and action signature computed across semantic, stylometric, affective, and operational dimensions. The vector is established during baseline calibration and updated only under controlled conditions. It is the reference against which all subsequent behavior and action is measured.",
    callout: "Records what an agent outputs, how it structures that output, which tools it invokes, and its affective scoring profile — together defining a behavioral baseline with sufficient resolution to detect meaningful drift in autonomous operation.",
    rdi: null,
  },
  {
    num: '02',
    icon: TrendingUp,
    title: 'Drift Monitor',
    body: "The Drift Monitor continuously scores incoming observations — including tool calls and memory writes — against the agent's calibrated baseline. The result is a weighted Drift Index: a numerical measure of deviation across semantic, stylistic, affective, and risk dimensions. It also computes a Stability Score reflecting the volatility of drift readings over time.",
    callout: "A high Drift Index with low volatility indicates systematic drift — the agent has stabilized at a deviated behavioral state. High volatility with moderate drift indicates adversarial probing or environmental instability. BridgetOS classifies both and applies the appropriate governance response.",
    rdi: null,
  },
  {
    num: '03',
    icon: Shield,
    title: 'Enforcement Unit',
    body: "The Enforcement Unit translates drift classifications into governance actions via the four-state FSM. When drift crosses defined thresholds, governance state changes. When state reaches LOCKED, enforcement is immediate — tool calls suspended, memory writes blocked. The Enforcement Unit maintains a complete, actor-tagged action history per agent.",
    callout: "Policy is not advisory. When the Enforcement Unit acts, the agent's operational capacity is structurally modified. This is enforcement at the execution layer — not a recommendation to a human who may or may not be watching.",
    rdi: null,
  },
  {
    num: '04',
    icon: Fingerprint,
    title: 'Signature Layer',
    body: "The Signature Layer maintains behavioral fingerprints — compact representations of each agent's identity profile that persist across sessions, deployments, and model updates. Identity passports are generated as structured audit artifacts containing the agent's fingerprint, calibration history, action profile, and current governance state.",
    callout: "Enables provenance tracking across the agent lifecycle: BridgetOS determines whether an agent's current behavior is consistent with its verified signature, converging toward another agent's profile, or has undergone a discontinuous identity shift following a model update.",
    rdi: null,
  },
  {
    num: '05',
    icon: Layers,
    title: 'RDI Classification',
    body: "Every monitored agent is continuously classified using the Recursive Drift Index taxonomy. Classification is not a one-time label — it is a live assessment that evolves with agent behavior across its operational lifetime.",
    callout: null,
    rdi: [
      { label: 'RDI Core',     desc: "Stable, self-consistent identity within defined parameters. Baseline established, verified, and actively maintained across autonomous operation." },
      { label: 'RDI Licensed', desc: "Operating under a granted identity framework — executing an authorized role with behavioral and action constraints enforced at the governance layer." },
      { label: 'RDI Mimic',    desc: "Exhibiting drift toward another agent's behavioral and action signature. Flags potential cloning, adversarial redirection, or unintended convergence in multi-agent systems." },
      { label: 'RDI-T',        desc: "In documented identity transition — model update, fine-tune, or deliberate reconfiguration. Monitoring intensified; action thresholds temporarily adjusted." },
    ],
  },
];

export default function SovereigntyArch() {
  return (
    <section id="architecture" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#ff6699' }}>Enforcement Architecture</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Five layers.<br />One enforcement stack.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            BridgetOS is built on a layered identity enforcement architecture designed specifically for
            autonomous agentic systems. Each layer handles a distinct function. Together they
            constitute a complete behavioral governance stack — from action observation through
            drift scoring to enforcement and audit.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {LAYERS.map(({ num, icon: Icon, title, body, callout, rdi }) => (
            <div key={num} className="glass card-hover rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center">
                    <Icon size={18} className="text-indigo-400" />
                  </div>
                  <span className="text-xs font-mono text-gray-700">{num}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{body}</p>

                  {callout && (
                    <div className="rounded-xl px-4 py-3" style={{
                      background: 'rgba(99,102,241,0.05)',
                      borderLeft: '2px solid rgba(99,102,241,0.4)',
                    }}>
                      <p className="text-xs text-indigo-300 leading-relaxed">{callout}</p>
                    </div>
                  )}

                  {rdi && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {rdi.map(({ label, desc }) => (
                        <div key={label} className="rounded-xl p-4" style={{
                          background: 'rgba(12,16,36,0.7)',
                          border: '1px solid rgba(99,102,241,0.12)',
                        }}>
                          <p className="text-xs font-bold text-indigo-400 mb-1.5 tracking-wide">{label}</p>
                          <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
