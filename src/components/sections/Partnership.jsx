import React from 'react';
import { ArrowRight, Building2, Zap, Eye } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

const PARTNER_TYPES = [
  {
    icon: Building2,
    label: 'Design Partners',
    desc: "Organizations with active autonomous agent deployments ready to instrument governance from the ground up. We work closely with design partners to validate the enforcement stack against real production agentic workloads.",
  },
  {
    icon: Zap,
    label: 'Early Adopters',
    desc: "Platform and infrastructure teams deploying agentic AI that need audit-ready behavioral monitoring and execution governance before compliance mandates arrive. Early adopters shape the product roadmap.",
  },
  {
    icon: Eye,
    label: 'Investors & Strategic Partners',
    desc: "Institutions with a position in autonomous AI infrastructure, regulated agentic deployment, or AI governance tooling. BridgetOS is designed as foundational enforcement infrastructure for governed agentic AI deployments.",
  },
];

export default function Partnership({ onJoin }) {
  return (
    <section id="partnership" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Partnership & Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Build defensible agents.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            BridgetOS is available to design partners, early adopters, and strategic
            collaborators deploying autonomous AI agents in contexts where behavioral integrity,
            action auditability, and governance enforcement are hard requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PARTNER_TYPES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass card-hover rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center mb-4">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{label}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Pricing</p>
              <p className="text-sm text-gray-500">Per agent, per month. Annual contracts at 20% discount.</p>
            </div>
            <span className="text-xs text-gray-700 italic">Security budget — not dev tools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              {
                tier: 'Pilot',
                price: 'Free',
                unit: null,
                highlight: false,
                agents: 'Qualified design partners',
                features: [
                  'Full console access',
                  'Direct founder support',
                  'Co-development input',
                  'Case study co-authorship',
                ],
                cta: 'Apply for pilot',
              },
              {
                tier: 'Startup',
                price: '$99',
                unit: '/agent/mo',
                highlight: false,
                agents: '1–10 agents',
                features: [
                  'Full governance console',
                  'REST API + WebSocket',
                  '90-day audit retention',
                  'Standard support',
                ],
                cta: null,
              },
              {
                tier: 'Scale',
                price: '$79',
                unit: '/agent/mo',
                highlight: true,
                agents: '11–50 agents',
                features: [
                  'Everything in Startup',
                  'SIEM export (Splunk, Elastic)',
                  'Multi-tenant fleet management',
                  'Priority support',
                ],
                cta: null,
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                unit: null,
                highlight: false,
                agents: '50+ agents',
                features: [
                  '$2,500/mo platform + $49/agent',
                  'SSO (SAML / OIDC)',
                  '99.9% SLA + dedicated support',
                  'Custom compliance templates',
                ],
                cta: null,
              },
            ].map(({ tier, price, unit, highlight, agents, features, cta }) => (
              <div
                key={tier}
                className="rounded-2xl p-5 flex flex-col"
                style={{
                  background: highlight ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.03)',
                  border: highlight ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {highlight && (
                  <span className="self-start text-xs font-bold text-indigo-300 uppercase tracking-widest bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-md mb-3">
                    Most popular
                  </span>
                )}
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{tier}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-2xl font-black ${highlight ? 'text-white' : 'text-gray-200'}`}>{price}</span>
                  {unit && <span className="text-xs text-gray-500">{unit}</span>}
                </div>
                <p className="text-xs text-indigo-400 mb-4">{agents}</p>
                <div className="flex flex-col gap-2 flex-1">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-500/60 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-gray-400 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                {cta && (
                  <button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-5 w-full py-2 rounded-xl text-xs font-semibold text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/10 transition-colors"
                  >
                    {cta}
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-700 mt-4 text-center leading-relaxed">
            Prices are indicative and being finalised with pilot partners.
            Annual prepay saves 20%. Volume pricing available for large fleets.{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-500 hover:text-indigo-400 transition-colors">
              Get in touch for a custom quote.
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onJoin}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 text-sm">
            Join the Waitlist <ArrowRight size={15} />
          </button>
          <a href="/investors.html"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-medium transition-all duration-200 text-sm">
            Request Investor Brief
          </a>
        </div>
      </div>
    </section>
  );
}
