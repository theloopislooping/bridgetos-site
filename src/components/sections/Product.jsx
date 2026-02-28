import React from 'react';
import { TrendingUp, GitBranch, Lock, BarChart3, Activity, MessageSquare } from 'lucide-react';

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Identity Drift Detection',
    desc: "Every observation — text output, tool call, and memory write — is scored across four drift components (semantic, stylistic, affective, risk) against the agent's verified behavioral baseline. A composite drift index classified by severity band is updated continuously across the agent's operational lifetime.",
    pink: true,
  },
  {
    icon: GitBranch,
    title: 'Governance State Machine',
    desc: "A four-state FSM enforces governance policy: NORMAL → WATCHLIST → REVIEW_REQUIRED → LOCKED. Transitions are threshold-driven and automatic. No human approval required for escalation — only for unlock. Stable agents auto-downgrade.",
  },
  {
    icon: Lock,
    title: 'Execution Blocking',
    desc: "When an agent reaches LOCKED status, tool calls and memory writes are suspended at the governance layer. The agent cannot act. For autonomous agents with real-world access, this is the critical safety primitive — enforcement at the execution layer, not the prompt layer.",
  },
  {
    icon: BarChart3,
    title: 'HDIT Monitoring',
    desc: "Six behavioral vectors tracked with rolling observation windows and exponentially-weighted calibration. A live heatmap surfaces volatility patterns, tool usage anomalies, refusal frequency, and high-risk content signatures across the entire agent fleet.",
  },
  {
    icon: Activity,
    title: 'Immutable Audit Trail',
    desc: "Every governance decision, drift score, state transition, and blocked action is appended to a monotonic, append-only log with a sequential counter. Exportable as NDJSON for compliance review, external audit, or post-incident forensics.",
  },
  {
    icon: MessageSquare,
    title: 'Vex — Operational Assistant',
    desc: "An embedded AI assistant with persistent session memory and direct access to live drift scores, governance states, blocked action records, and audit events. Operates within the same role-based access controls as the console.",
  },
];

export default function Product() {
  return (
    <section id="product" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">What BridgetOS Does</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            A complete governance stack<br />for autonomous agent identity.
          </h2>
        </div>

        <p className="text-gray-400 text-lg mb-14 max-w-2xl leading-relaxed">
          BridgetOS is not an observability layer. It is an enforcement layer. Every agent
          observation is scored, classified, and acted upon according to defined governance policy.
          Every enforcement action is written to an immutable record that regulatory frameworks can inspect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, pink }) => (
            <div key={title} className="glass card-hover rounded-2xl p-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={pink
                  ? { background: 'rgba(255,102,153,0.12)', border: '1px solid rgba(255,102,153,0.28)' }
                  : { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }
                }
              >
                <Icon size={18} style={pink ? { color: '#ff6699' } : undefined} className={pink ? '' : 'text-indigo-400'} />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
