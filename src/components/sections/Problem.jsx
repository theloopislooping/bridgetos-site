import React from 'react';
import { Activity, AlertTriangle, GitBranch, Cpu } from 'lucide-react';

const DRIFT_CAUSES = [
  {
    icon: Activity,
    title: 'Context accumulation',
    desc: "Each interaction extends an agent's effective context. Over long sessions or high-volume deployments, accumulated context reshapes decision-making in ways that cause agents to take unintended actions — without any individual step appearing obviously wrong.",
  },
  {
    icon: AlertTriangle,
    title: 'Prompt injection and adversarial input',
    desc: "Malicious or unintentional inputs redirect an agent's decision-making and tool use mid-session — not by breaking the model, but by exploiting its responsiveness to instruction. The agent continues operating. It operates differently.",
  },
  {
    icon: GitBranch,
    title: 'Recursive self-modification',
    desc: "Agents that generate, store, or act on their own outputs can enter feedback loops where small initial deviations amplify across action cycles — producing compounding behavioral deviation with real-world consequences.",
  },
  {
    icon: Cpu,
    title: 'Silent model and environment updates',
    desc: "Underlying model versions change. Tool APIs shift. Fine-tuned adapters are swapped. None of these are visible in agent action logs — until the decisions change and the wrong actions have already been taken.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">The Problem</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            For agentic AI, drift isn't<br />a quality problem. It's a liability.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            An autonomous AI agent deployed today is not the same agent operating in thirty days.
            For a system that only generates text, that's a quality problem. For a system that
            browses the web, executes code, writes to databases, and takes real-world actions —
            it's a governance failure. Identity drift compounds silently, and most platforms
            have no mechanism to detect it until something consequential has already happened.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {DRIFT_CAUSES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass card-hover rounded-2xl p-6 flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center">
                <Icon size={16} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 100%)',
          border: '1px solid rgba(99,102,241,0.18)',
        }}>
          <p className="text-gray-300 leading-relaxed">
            This is{' '}
            <span className="text-white font-semibold">cumulative behavioral drift</span>{' '}
            — the gradual degradation of behavioral coherence across an agent's operational lifetime.
            For autonomous systems, drift does not surface as output noise. It surfaces as incorrect
            actions. An agent operating in finance, legal, healthcare, or security that has deviated
            from its verified baseline is not just producing different output — it is executing
            different actions, with real-world consequences and no audit record that governance
            frameworks will accept.
          </p>
        </div>
      </div>
    </section>
  );
}
