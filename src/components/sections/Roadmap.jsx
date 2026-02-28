import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const MILESTONES = [
  {
    status: 'done',
    period: 'Now',
    title: 'Pilot phase',
    items: [
      'Console operational — live drift scoring, heatmap, audit log, enforcement',
      'Active deployments with autonomous agents',
      'Design partner onboarding open',
    ],
  },
  {
    status: 'active',
    period: 'Q2 2026',
    title: 'Design partner GA',
    items: [
      'Full console + REST API available to design partners',
      'SDK for LangChain, AutoGen, and OpenAI Agents SDK',
      'Feedback loop and false-positive marking in production',
      'Vex session memory and persistent conversation context',
    ],
  },
  {
    status: 'upcoming',
    period: 'Q3 2026',
    title: 'General availability',
    items: [
      'Public waitlist access rolls out',
      'Self-serve onboarding and baseline calibration wizard',
      'Multi-tenant fleet management',
      'NDJSON audit export + SIEM connector (Splunk, Elastic)',
    ],
  },
  {
    status: 'upcoming',
    period: 'Q4 2026',
    title: 'Enterprise tier',
    items: [
      'SSO (SAML / OIDC), dedicated tenancy',
      'SLA — 99.9% uptime commitment',
      'SOC2 Type I audit',
      'Custom compliance report templates',
    ],
  },
];

const STATUS_CFG = {
  done:     { icon: CheckCircle, color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)',  border: 'rgba(45,212,191,0.3)',  label: 'Live'     },
  active:   { icon: Clock,       color: '#a5b4fc', bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)',  label: 'In progress' },
  upcoming: { icon: Circle,      color: '#4b5563', bg: 'rgba(75,85,99,0.10)',    border: 'rgba(75,85,99,0.2)',    label: 'Planned'  },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-divider py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Roadmap</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            From pilot to<br />production standard.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            The console is running. The enforcement stack is deployed.
            Here's what comes next.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 mb-2 relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px" style={{ background: 'rgba(99,102,241,0.15)' }} />

          {MILESTONES.map(({ status, period, title, items }) => {
            const cfg = STATUS_CFG[status];
            const Icon = cfg.icon;
            return (
              <div key={period} className="flex flex-col items-center px-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 relative z-10"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <Icon size={16} style={{ color: cfg.color }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-1 px-2 py-0.5 rounded-md"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                >
                  {period}
                </span>
                <p className="text-sm font-semibold text-white text-center mt-2 mb-3">{title}</p>
                <div className="flex flex-col gap-1.5 w-full">
                  {items.map(item => (
                    <div key={item} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: cfg.color, opacity: 0.6 }} />
                      <span className="text-xs text-gray-500 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden flex flex-col gap-4">
          {MILESTONES.map(({ status, period, title, items }) => {
            const cfg = STATUS_CFG[status];
            const Icon = cfg.icon;
            return (
              <div key={period} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} />
                  </div>
                  <div className="w-px flex-1 mt-2" style={{ background: 'rgba(99,102,241,0.12)' }} />
                </div>
                <div className="pb-6 flex-1">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                  >
                    {period}
                  </span>
                  <p className="text-sm font-semibold text-white mt-2 mb-2">{title}</p>
                  <div className="flex flex-col gap-1.5">
                    {items.map(item => (
                      <div key={item} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: cfg.color, opacity: 0.6 }} />
                        <span className="text-xs text-gray-500 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
