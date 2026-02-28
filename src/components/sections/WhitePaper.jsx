import React from 'react';
import { ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

const WP_CONTENTS = [
  'Identity Vector construction & calibration methodology for agentic systems',
  'Drift Index & Stability Score derivation across action and output dimensions',
  'RDI classification taxonomy (Core / Licensed / Mimic / T)',
  'Identity Enforcement Architecture — five-layer formal specification',
  'Compliance alignment: EU AI Act · NIST AI RMF for autonomous AI',
  'Identity-layer threat taxonomy for agentic deployments',
];

export default function WhitePaper() {
  return (
    <section id="whitepaper" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">White Paper & IP</p>
            <h2 className="text-4xl font-black text-white tracking-tight mb-5 leading-tight">
              The technical foundation is formally documented.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              The governance architecture underlying BridgetOS is documented in full in the company's
              technical white paper. The paper formalizes the Identity Vector construction for agentic
              systems, Drift Index methodology across action and output dimensions, Stability Score
              derivation, RDI classification taxonomy, and the Identity Enforcement Architecture across its
              five operational layers.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              It includes a compliance alignment analysis against current and anticipated autonomous AI
              governance frameworks, and a structured threat taxonomy for identity-layer attacks in
              agentic deployments. BridgetOS is designed as a{' '}
              <span className="text-gray-300 font-medium">licensable enforcement layer</span>
              {' '}— infrastructure for governed agentic AI deployments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${CONTACT_EMAIL}?subject=White Paper Request`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors duration-200">
                Request White Paper <ExternalLink size={14} />
              </a>
              <a href="/technical.html"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200">
                View Technical Briefing
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="flex items-start gap-3 mb-6">
              <FileText size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm leading-snug">
                  BridgetOS — Governance of Recursive Identity in Autonomous Agentic AI Systems
                </p>
                <p className="text-xs text-gray-600 mt-1.5">Technical White Paper · 2026</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-5 border-t border-white/5 mb-6">
              {WP_CONTENTS.map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                  <span className="text-xs text-gray-400">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-white/5">
              <p className="text-xs text-gray-600 leading-relaxed">
                USPTO filing in progress. Patent pending under{' '}
                <span className="text-gray-500 font-medium">Holborn Rowe LLC</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Abstract excerpt */}
        <div className="mt-10 rounded-2xl p-8 md:p-10" style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.02) 100%)',
          border: '1px solid rgba(99,102,241,0.14)',
        }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Abstract</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(99,102,241,0.15)' }} />
            <span className="text-xs text-gray-700 font-mono">excerpt · full paper available on request</span>
          </div>

          <div className="flex flex-col gap-5 max-w-4xl">
            <p className="text-sm text-gray-400 leading-relaxed">
              This paper formalizes the problem of identity drift in autonomous agentic AI systems as a
              governance and enforcement challenge distinct from conventional model alignment. It introduces
              the concept of <span className="font-medium" style={{ color: '#ff6699' }}>Recursive Identity</span> — the
              principle that an agent's behavioral signature must remain coherent not only across outputs
              but across the full action-decision cycle, including tool invocations, memory operations,
              and multi-step reasoning chains. The paper argues that existing alignment and safety
              frameworks do not address the operational reality of long-running autonomous agents and
              that a dedicated enforcement layer is required.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              The core contribution is a multi-dimensional{' '}
              <span className="font-medium" style={{ color: '#ff6699' }}>Identity Vector framework</span>{' '}
              that characterizes agent behavior across semantic, stylometric, affective, and operational
              dimensions. Each dimension is independently calibrated against a verified baseline established
              from the agent's early operational history. A composite{' '}
              <span className="text-gray-300 font-medium">Drift Index</span>{' '}
              is derived from the weighted deviation across all dimensions, accompanied by a{' '}
              <span className="text-gray-300 font-medium">Stability Score</span>{' '}
              that distinguishes systematic behavioral drift from stochastic noise — a distinction
              with direct implications for governance response severity and escalation logic.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              The paper introduces the{' '}
              <span className="text-gray-300 font-medium">Recursive Drift Index (RDI)</span>{' '}
              classification taxonomy, providing a continuous, operationally meaningful categorization
              of agent identity state across four classes: Core, Licensed, Mimic, and T. RDI
              classification is not a one-time assessment — it is a live operational label updated
              on each observation cycle and used to govern enforcement posture. The paper includes
              a formal specification of the{' '}
              <span className="text-gray-300 font-medium">Identity Enforcement Architecture</span>{' '}
              as five interdependent enforcement layers, designed for modular integration with
              existing agentic infrastructure without requiring modifications to the underlying model.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              Compliance alignment is analyzed against the EU AI Act's systemic risk provisions and
              the NIST AI Risk Management Framework across its five core functions. A structured
              threat taxonomy documents identity-layer attack vectors specific to agentic deployments —
              including gradual drift, prompt injection, recursive collapse, and identity cloning
              in multi-agent orchestration environments — alongside the corresponding detection and
              enforcement responses produced by the BridgetOS stack.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-700 leading-relaxed max-w-lg">
              Methodology, calibration parameters, vector construction, and the full formal specification
              are contained in the complete paper — available to verified partners and investors on request.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=White Paper Request`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              Request Full Paper <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
