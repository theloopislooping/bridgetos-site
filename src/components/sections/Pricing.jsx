import React from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

// Currency toggle removed — both prices shown at equal size

const PLANS = [
  {
    name:    'Starter',
    tagline: 'For teams piloting agentic AI',
    usd:     299,
    gbp:     239,
    per:     'per month',
    cta:     'Join Waitlist',
    waitlist: true,
    features: [
      'Up to 5 agents monitored',
      'Drift scoring — all 4 components',
      'NORMAL & WATCHLIST governance states',
      '30-day immutable audit log',
      'REST API access',
      'Email alerts',
    ],
  },
  {
    name:     'Pro',
    tagline:  'For teams deploying at scale',
    usd:      799,
    gbp:      629,
    per:      'per month',
    cta:      'Join Waitlist',
    waitlist:  true,
    highlight: true,
    badge:    'Most Popular',
    features: [
      'Up to 25 agents monitored',
      'Full HDIT monitoring — all 6 vectors',
      'All 4 governance states + HITL enforcement',
      '90-day immutable audit log',
      'Compliance reports (PDF export)',
      'Webhook & Slack alerts',
      'Vex AI governance assistant',
      'Priority support',
    ],
  },
  {
    name:    'Enterprise',
    tagline: 'For regulated agentic deployments',
    usd:     null,
    gbp:     null,
    per:     'custom pricing',
    cta:     'Contact Us',
    waitlist: false,
    features: [
      'Unlimited agents monitored',
      'Everything in Pro',
      '365-day audit log + custom retention',
      'SSO / SAML integration',
      'On-premise deployment option',
      'Custom compliance report templates',
      'Dedicated support + SLA',
      'Custom integrations & onboarding',
    ],
  },
];

export default function Pricing({ onJoin }) {

  return (
    <section id="pricing" className="section-divider py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            All plans include a 14-day free trial. No credit card required to join the waitlist.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-6"
              style={plan.highlight
                ? {
                    background: 'linear-gradient(160deg, rgba(79,70,229,0.18) 0%, rgba(45,212,191,0.06) 100%)',
                    border: '1px solid rgba(99,102,241,0.5)',
                    boxShadow: '0 0 32px rgba(79,70,229,0.15)',
                  }
                : {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }
              }
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(99,102,241,0.9)', color: '#fff' }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name + tagline */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.usd !== null ? (
                  <>
                    <div className="flex items-end gap-3">
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-black text-white">${plan.usd}</span>
                        <span className="text-gray-500 text-xs mb-1">USD</span>
                      </div>
                      <span className="text-gray-600 text-sm mb-1">/</span>
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-black text-white">£{plan.gbp}</span>
                        <span className="text-gray-500 text-xs mb-1">GBP</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1">per month · billed monthly</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-black text-white">Custom</div>
                    <p className="text-[11px] text-gray-600 mt-1">Contact us for a quote</p>
                  </>
                )}
              </div>

              {/* CTA */}
              {plan.waitlist ? (
                <button
                  onClick={onJoin}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all mb-6"
                  style={plan.highlight
                    ? { background: 'rgba(99,102,241,0.9)', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {plan.cta} <ArrowRight size={13} />
                </button>
              ) : (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all mb-6"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {plan.cta} <ArrowRight size={13} />
                </a>
              )}

              {/* Divider */}
              <div className="w-full h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: plan.highlight ? '#818cf8' : '#2dd4bf' }} />
                    <span className="text-xs text-gray-400 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Early access note */}
        <div className="mt-10 text-center flex items-center justify-center gap-2">
          <Zap size={12} style={{ color: '#ff6699' }} />
          <p className="text-xs text-gray-600">
            Early access pricing — locked in for the lifetime of your subscription.
          </p>
        </div>

      </div>
    </section>
  );
}
