import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

const FAQS = [
  {
    q: 'Does BridgetOS require modifying the underlying AI model?',
    a: 'No. BridgetOS operates as an external governance layer that wraps your existing agent infrastructure. It intercepts observations and enforces policy at the API boundary — no fine-tuning, no model modifications, no changes to the underlying model weights or prompt templates required.',
  },
  {
    q: 'What is the latency overhead?',
    a: 'Drift scoring is designed for sub-100ms enforcement latency in the production stack. The scoring pipeline runs asynchronously against the observation stream — it does not sit in the synchronous execution path for normal agent operation. Enforcement (blocking) only activates when governance state escalates above threshold.',
  },
  {
    q: 'How is the behavioral baseline established?',
    a: 'Each agent\'s baseline is constructed from its early operational history — a calibration window of observations from which the Identity Vector is derived. Semantic, stylistic, affective, and risk profiles are computed and stored as the agent\'s verified fingerprint. Baseline calibration completes after 50 observations and can be re-anchored by an admin when an intentional behavioral update is deployed.',
  },
  {
    q: 'What happens when an agent is locked?',
    a: 'A LOCKED agent has all tool calls and memory writes suspended at the governance layer. The agent continues to process inputs but cannot execute external actions. It remains locked until an admin explicitly clears it. Every lock event, the triggering observation, and the unlock action are written to the immutable audit log.',
  },
  {
    q: 'Can it handle multi-agent orchestration?',
    a: 'Yes. BridgetOS maintains independent identity baselines for each agent in a fleet — including orchestrators and subagents. The HDIT monitoring layer includes identity similarity tracking that flags behavioral convergence between agents, which is a key indicator of identity cloning or unauthorized behavioral transfer in multi-agent pipelines.',
  },
  {
    q: 'How does it integrate with existing infrastructure?',
    a: 'BridgetOS exposes a REST API and WebSocket interface. Agent observations are posted to the scoring endpoint; governance state is available via the agents API; the WebSocket stream delivers real-time enforcement events. An SDK for LangChain, AutoGen, and OpenAI Agents SDK is in development and available to design partners.',
  },
  {
    q: 'Is BridgetOS SOC2 compliant?',
    a: 'BridgetOS is pre-SOC2 as a pre-launch company. The architecture is designed with SOC2 in mind — append-only audit logs, role-based access controls, JWT authentication with revocation, and structured compliance artifact export. SOC2 Type I audit is on the roadmap for Q4 2026.',
  },
  {
    q: 'What is the pricing model?',
    a: 'Pilot access is available at no cost for qualified design partners. Production pricing is per-agent per-month with volume tiers for enterprise deployments. Pricing is being finalised with pilot partners — contact us for current rates and enterprise licensing terms.',
  },
  {
    q: 'Can false positives be corrected?',
    a: 'Yes. The console includes a feedback mechanism for marking governance escalations as false positives. Feedback records are stored in the audit log and can inform threshold calibration. Admins can also manually de-escalate governance state with a role-gated override — all actions are logged.',
  },
  {
    q: 'Is this the same as AI alignment?',
    a: 'No. Alignment addresses model values and objectives at training time. BridgetOS addresses operational behavioral identity at runtime — detecting when a deployed agent deviates from its own verified behavioral baseline. It is an enforcement layer for production agentic deployments, not a replacement for alignment research.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{ border: `1px solid ${open ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}` }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
      >
        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          size={15}
          className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-all duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4">
          <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-divider py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Questions we get asked.
          </h2>
          <p className="text-gray-400 text-lg">
            Everything else —{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              email us directly
            </a>.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
