import React, { useState } from 'react';
import {
  Shield, ArrowRight, Lock, CheckCircle, ExternalLink,
  TrendingUp, AlertTriangle, FileText, ChevronRight,
} from 'lucide-react';

import { CONTACT_EMAIL, GATE_PASSWORD } from './lib/constants.js';

// ── Access gate (not cryptographically secure) ────────────────────────────────
// This is a client-side password gate — determined adversaries can bypass it by
// reading the JavaScript bundle. It deters casual access, not targeted extraction.
// Password is read from VITE_GATE_PASSWORD env var (set in .env, never committed).
// Rotate periodically. Do NOT store sensitive financial details exclusively here.
const INVESTOR_PASSWORD = GATE_PASSWORD;

// ── Market data ───────────────────────────────────────────────────────────────

const MARKET_TABLE = [
  { segment: 'Agentic AI (total)',          size2025: '~$7B',         proj2030: '$47–52B',   cagr: '42–49%' },
  { segment: 'AI governance',               size2025: '$228M–$940M',  proj2030: '$1.4–7.4B', cagr: '35–51%' },
  { segment: 'AI safety & alignment',       size2025: '$2.24B',       proj2030: '$18.15B',   cagr: '37%'    },
  { segment: 'Guardian agent technologies', size2025: '~$500M–$1B',   proj2030: '$5–7.5B',   cagr: '~50%+'  },
  { segment: 'Non-human identity mgmt',     size2025: '$11.3B',       proj2030: '$18.7B',    cagr: '11.9%'  },
];

const COMPARABLE_ROUNDS = [
  { company: 'Ciphero',          stage: 'Pre-seed',  amount: '$2.5M',  what: 'AI verification layer for governance'        },
  { company: 't54 Labs',         stage: 'Seed',      amount: '$5M',    what: 'Trust layer for AI agents'                   },
  { company: 'Trace (YC S25)',   stage: 'Seed',      amount: '$3M',    what: 'Agentic AI orchestration'                    },
  { company: 'Vouched',          stage: 'Series A',  amount: '$17M',   what: '"Know Your Agent" identity verification'     },
  { company: 'Orchid Security',  stage: 'Seed',      amount: '$36M',   what: 'LLM-powered identity security'               },
  { company: 'ConductorOne',     stage: 'Series B',  amount: '$79M',   what: 'AI-native identity governance'               },
];

const COMPETITIVE_TIERS = [
  {
    tier: 'Tier 1',
    label: 'Access identity — who has access',
    players: 'Saviynt · Oasis Security · Okta · SailPoint · Microsoft Entra ID',
    gap: 'Answers "can this agent access this resource?" — not "is this agent still itself?"',
  },
  {
    tier: 'Tier 2',
    label: 'Safety guardrails — what can go wrong',
    players: 'Robust Intelligence (Cisco) · CalypsoAI (F5) · Lakera (Check Point)',
    gap: 'Protects against prompt injection and jailbreaks. Does not track identity coherence over time.',
  },
  {
    tier: 'Tier 3',
    label: 'Governance & compliance — are we following rules',
    players: 'Credo AI · Arthur AI',
    gap: 'Tracks regulatory compliance and audit trails. No behavioral identity enforcement.',
  },
  {
    tier: 'Tier 4',
    label: 'Observability — what is happening',
    players: 'Arize AI · Fiddler AI · Galileo · Portkey',
    gap: 'Monitors model performance and metrics. No enforcement capability.',
  },
  {
    tier: 'Tier 5',
    label: 'Behavioral identity enforcement — is the agent still itself',
    players: 'BridgetOS',
    gap: null,
    isBridgetOS: true,
  },
];

const REGULATORY_TABLE = [
  { reg: 'EU AI Act Article 50(2)', mandate: 'Machine-readable identity marking of AI content',     date: 'Aug 2, 2026' },
  { reg: 'EU AI Act Article 49',    mandate: 'Mandatory AI system registration (identity registry)', date: 'Aug 2, 2026' },
  { reg: 'California SB 942',       mandate: 'Visible + invisible watermarks, detection API',        date: 'Aug 2, 2026' },
  { reg: 'Colorado AI Act',         mandate: 'Impact assessments + transparency disclosures',        date: 'Jun 30, 2026' },
  { reg: 'California SB 53',        mandate: 'Frontier model risk management protocol disclosure',   date: 'Jan 1, 2026'  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ value, label }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500 leading-snug">{label}</p>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
      {children}
    </p>
  );
}

// ── Screenshot helpers ────────────────────────────────────────────────────────

function ScreenshotImg({ src, alt, style, className }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return (
    <div className="w-full flex items-center justify-center rounded-xl"
      style={{ minHeight: 180, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(99,102,241,0.2)', ...style }}>
      <span className="text-xs text-gray-700 font-mono">{alt}</span>
    </div>
  );
  return (
    <img src={src} alt={alt} className={className}
      style={{ display: 'block', width: '100%', borderRadius: '12px', ...style }}
      onError={() => setFailed(true)} />
  );
}

function ProductScreenshots() {
  return (
    <div className="mb-20">
      <SectionLabel>Product — Live System</SectionLabel>
      <h2 className="text-3xl font-black text-white tracking-tight mb-3 leading-tight">
        Not a mockup. Not a prototype.
      </h2>
      <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
        The governance console is operational. The screenshots below are from the running system —
        live drift scoring, real-time HDIT heatmap, and an immutable audit log actively recording
        enforcement decisions.
      </p>

      {/* Main dashboard — full width */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{
        border: '1px solid rgba(99,102,241,0.2)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      }}>
        <div className="flex items-center gap-1.5 px-4 h-8"
          style={{ background: 'rgba(3,5,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-3 text-xs text-gray-600 font-mono">BridgetOS — Agent Fleet Dashboard</span>
        </div>
        <ScreenshotImg src="/screenshots/console-overview.png" alt="Agent fleet dashboard" />
      </div>

      {/* Two-up: agent detail + audit log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden" style={{
          border: '1px solid rgba(99,102,241,0.15)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
        }}>
          <div className="flex items-center gap-1.5 px-4 h-8"
            style={{ background: 'rgba(3,5,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-600 font-mono">Agent Detail — Drift Scores</span>
          </div>
          <ScreenshotImg src="/screenshots/console-agent.png" alt="Agent drift score detail" />
        </div>

        <div className="rounded-2xl overflow-hidden" style={{
          border: '1px solid rgba(99,102,241,0.15)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
        }}>
          <div className="flex items-center gap-1.5 px-4 h-8"
            style={{ background: 'rgba(3,5,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-600 font-mono">Immutable Audit Log</span>
          </div>
          <ScreenshotImg src="/screenshots/console-audit.png" alt="Audit log" />
        </div>
      </div>
    </div>
  );
}

// ── Consent modal ─────────────────────────────────────────────────────────────

function ConsentModal({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10,12,26,0.98)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-indigo-400" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">Confidentiality & Privacy Notice</h2>
          </div>
          <p className="text-xs text-gray-600 ml-11">You must read and accept before proceeding.</p>
        </div>

        {/* Scrollable body */}
        <div
          className="px-6 py-5 overflow-y-auto text-xs text-gray-400 leading-relaxed flex flex-col gap-4"
          style={{ maxHeight: '340px' }}
        >
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">1. Confidentiality</p>
            <p>
              The materials contained within this investor brief, including but not limited to market analysis,
              business strategy, financial projections, product architecture, intellectual property disclosures,
              and partnership information, are strictly confidential and the proprietary property of
              Holborn Rowe LLC. By accessing this brief you acknowledge that the contents are commercially sensitive,
              intended solely for the named or authorised recipient, and may not be shared, distributed,
              reproduced, copied, or disclosed to any third party — in whole or in part — without the
              prior written consent of Holborn Rowe LLC.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">2. Intellectual Property</p>
            <p>
              All intellectual property contained herein, including the BridgetOS governance architecture,
              Identity Vector framework, Drift Index methodology, Recursive Drift Index (RDI) taxonomy,
              and Identity Enforcement Architecture, is the exclusive property of Holborn Rowe LLC.
              A provisional patent application is currently pending with the United States Patent and
              Trademark Office (USPTO). Unauthorised reproduction, disclosure, or use of any intellectual
              property described in this brief may constitute patent infringement, misappropriation of
              trade secrets, and/or breach of applicable intellectual property laws in the United States,
              the United Kingdom, and the European Union.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">3. UK GDPR & Data Protection Act 2018</p>
            <p>
              Holborn Rowe LLC processes personal data in accordance with the UK General Data Protection
              Regulation (UK GDPR) and the Data Protection Act 2018. By accessing this brief, you
              acknowledge that your access may be logged for security and audit purposes. Any personal
              data collected in connection with this brief — including contact details submitted via
              correspondence — will be processed lawfully, fairly, and transparently, retained only as
              long as necessary, and protected against unauthorised access or disclosure. You have the
              right to access, rectify, or erase your personal data at any time by contacting
              wendi.soto@bridgetos.com. You also have the right to lodge a complaint with the
              Information Commissioner's Office (ICO) if you believe your data has been handled unlawfully.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">4. EU GDPR (Regulation 2016/679)</p>
            <p>
              For recipients accessing this brief from within the European Economic Area (EEA), Holborn
              Rowe LLC acknowledges obligations under the EU General Data Protection Regulation
              (GDPR 2016/679). Personal data shared in the course of reviewing this brief will be
              processed solely for the purpose of investor relations and business development, on the
              lawful basis of legitimate interests. Data will not be transferred to third parties
              without appropriate safeguards in place. EEA-based recipients retain all rights afforded
              under GDPR Articles 15–22, including rights of access, rectification, erasure, restriction,
              portability, and objection.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">5. United States — Federal & State Privacy Laws</p>
            <p>
              For recipients accessing this brief from within the United States: this brief does not
              constitute a public offering of securities under the Securities Act of 1933 or any
              applicable state securities laws. It is provided solely for informational purposes to
              qualified, authorised recipients. Holborn Rowe LLC complies with applicable US federal
              privacy frameworks and the following state privacy regimes where applicable: the California
              Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), the Virginia
              Consumer Data Protection Act (VCDPA), the Colorado Privacy Act (CPA), the Connecticut
              Data Privacy Act (CTDPA), and other enacted US state privacy laws. You have the right
              to request disclosure of, correction of, or deletion of any personal data held about you.
              Submit such requests to wendi.soto@bridgetos.com.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">6. No Investment Advice</p>
            <p>
              Nothing in this brief constitutes investment advice, a solicitation, or an offer to buy
              or sell any security. Forward-looking statements and financial projections are provided
              for illustrative purposes only and are subject to material risks and uncertainties.
              Recipients should conduct their own independent due diligence before making any investment
              decision.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-1.5">7. Governing Law</p>
            <p>
              This notice and any dispute arising from access to or use of this brief shall be governed
              by and construed in accordance with the laws of England and Wales, without prejudice to
              mandatory consumer protection rights applicable in the recipient's jurisdiction.
            </p>
          </div>
        </div>

        {/* Footer / accept */}
        <div className="px-6 pb-6 pt-4 border-t border-white/5">
          <label className="flex items-start gap-3 cursor-pointer mb-5 group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                className="sr-only"
              />
              <div
                className="w-4 h-4 rounded border flex items-center justify-center transition-all"
                style={{
                  background:   checked ? '#4f46e5' : 'rgba(255,255,255,0.04)',
                  borderColor:  checked ? '#6366f1' : 'rgba(255,255,255,0.15)',
                }}
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              I have read and understood this Confidentiality & Privacy Notice. I agree to keep all
              materials strictly confidential and acknowledge that accessing this brief constitutes
              acceptance of the terms described above.
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              onClick={onAccept}
              disabled={!checked}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:  checked ? '#4f46e5' : 'rgba(255,255,255,0.04)',
                color:       checked ? '#ffffff' : '#4b5563',
                cursor:      checked ? 'pointer' : 'not-allowed',
                border:      checked ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Accept & Continue
            </button>
            <a
              href="/"
              className="px-5 py-3 rounded-xl text-sm text-gray-600 hover:text-gray-400 transition-colors border border-white/5 hover:border-white/10"
            >
              Decline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Password gate ──────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt(inputValue) {
    const clean = (inputValue ?? value).trim();
    if (clean === INVESTOR_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
    }
  }

  function onKey(e) {
    if (e.key === 'Enter') attempt(value);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 dot-grid">
      <div className="hero-glow absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={20} className="text-indigo-400" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2 tracking-tight">Investor Brief</h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter your access code to view the full investor brief.
          <br />
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Investor Access Request`}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Request access →
          </a>
        </p>

        <div
          className="flex gap-2"
          style={shake ? { animation: 'shake 0.4s ease' } : {}}
        >
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={onKey}
            placeholder="Access code"
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}` }}
            autoFocus
          />
          <button
            onClick={() => attempt(value)}
            className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex-shrink-0"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 mt-2">Incorrect access code.</p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

// ── Investor brief content ─────────────────────────────────────────────────────

function InvestorBrief() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">BridgetOS</span>
            <span className="text-xs text-gray-600 ml-1">· Investor Brief</span>
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Investor Inquiry`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Get in Touch <ArrowRight size={12} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Thesis */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Confidential · Pre-Seed
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            BridgetOS occupies<br />
            <span style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 40%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>a category of one.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed mb-6">
            No commercial product today offers recursive identity enforcement for autonomous AI agents —
            not drift detection via behavioral signatures, not derivative tracking, not identity licensing.
            BridgetOS sits at the intersection of a{' '}
            <span className="text-white font-semibold">$47–52 billion agentic AI market</span>{' '}
            growing at 44%+ CAGR and an emerging regulatory environment that is making AI identity
            infrastructure{' '}
            <span className="text-white font-semibold">an operational requirement from 2026 onward.</span>
          </p>
          <p className="text-base text-gray-500 max-w-2xl leading-relaxed">
            Existing solutions manage what agents can <em>do</em>.
            BridgetOS manages who agents <em>are</em> — enforcing identity coherence as a
            continuous runtime property across the full action-decision cycle.
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <StatCard value="$47–52B"  label="Agentic AI market by 2030 (44%+ CAGR)" />
          <StatCard value="Aug 2026" label="EU AI Act + CA SB 942 enforcement cliff" />
          <StatCard value="1.3B"     label="Enterprise AI agents projected by 2028 (IDC)" />
          <StatCard value="80%"      label="Fortune 500 companies with active AI agents (Microsoft)" />
        </div>

        {/* Market opportunity */}
        <div className="mb-20">
          <SectionLabel>Market Opportunity</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-8 leading-tight">
            The market is massive, fast-growing,<br />and structurally underserved.
          </h2>

          <div className="glass rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Market Segment</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">2025</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">2030</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">CAGR</th>
                </tr>
              </thead>
              <tbody>
                {MARKET_TABLE.map((row, i) => (
                  <tr key={row.segment} className={i < MARKET_TABLE.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="px-5 py-3.5 text-gray-300 text-xs">{row.segment}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs text-right">{row.size2025}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs text-right">{row.proj2030}</td>
                    <td className="px-5 py-3.5 text-indigo-400 text-xs font-semibold text-right">{row.cagr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stat: '23%', desc: 'of organizations already scaling agentic AI in at least one business function (McKinsey)' },
              { stat: '27%', desc: 'trust in fully autonomous agents — down from 43% in twelve months (Deloitte)' },
              { stat: '80%', desc: 'of enterprises cannot tell in real time what their autonomous systems are doing (CSA)' },
            ].map(({ stat, desc }) => (
              <div key={stat} className="glass rounded-2xl p-5">
                <p className="text-2xl font-black text-white mb-2">{stat}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory cliff */}
        <div className="mb-20">
          <SectionLabel>Regulatory Mandate</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">
            Regulation makes AI identity enforcement<br />mandatory, not optional.
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-3xl">
            The EU AI Act's transparency mandates and California's watermarking requirements begin
            enforcement on August 2, 2026 — creating immediate demand for AI identity infrastructure.
            The precedent is clear — GDPR created a{' '}
            <span className="text-white font-semibold">$5+ billion compliance technology market.</span>{' '}
            The EU AI Act's identity provisions, backed by steeper penalties and broader scope,
            are expected to drive comparable investment in AI identity and governance tooling.
          </p>

          <div className="glass rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Regulation</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Key Mandate</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enforcement</th>
                </tr>
              </thead>
              <tbody>
                {REGULATORY_TABLE.map((row, i) => (
                  <tr key={row.reg} className={i < REGULATORY_TABLE.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="px-5 py-3.5 text-gray-300 text-xs font-medium">{row.reg}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs hidden md:table-cell">{row.mandate}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <span className="text-xs font-semibold text-amber-400">{row.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl p-6" style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
            border: '1px solid rgba(245,158,11,0.18)',
          }}>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-amber-400 font-semibold">August 2, 2026</span> — enforcement begins.
              Enterprises deploying AI agents in EU and California jurisdictions will face transparency
              and identity marking obligations. BridgetOS's provisional patent, first-mover position in
              recursive identity enforcement, and academic grounding at King's College London place it
              among the earliest purpose-built solutions in this space. The window to establish a
              protocol standard is measured in months, not years.
            </p>
          </div>
        </div>

        {/* Product screenshots */}
        <ProductScreenshots />

        {/* Competitive landscape */}
        <div className="mb-20">
          <SectionLabel>Competitive Landscape</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-8 leading-tight">
            Five tiers. BridgetOS stands alone<br />in the fifth.
          </h2>

          <div className="flex flex-col gap-3">
            {COMPETITIVE_TIERS.map(({ tier, label, players, gap, isBridgetOS }) => (
              <div
                key={tier}
                className="rounded-2xl p-5 flex gap-4 items-start"
                style={isBridgetOS ? {
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)',
                  border: '1px solid rgba(99,102,241,0.35)',
                } : {
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-xs font-mono text-gray-600 flex-shrink-0 mt-0.5 w-10">{tier}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold mb-1 ${isBridgetOS ? 'text-indigo-300' : 'text-gray-400'}`}>{label}</p>
                  <p className={`text-xs mb-1 ${isBridgetOS ? 'text-white font-semibold' : 'text-gray-600'}`}>{players}</p>
                  {gap && <p className="text-xs text-gray-600 leading-relaxed">{gap}</p>}
                  {isBridgetOS && (
                    <p className="text-xs text-indigo-400 mt-1">
                      Recursive identity enforcement · Behavioral signature verification · Identity licensing · Drift detection
                    </p>
                  )}
                </div>
                {isBridgetOS && (
                  <div className="flex-shrink-0 px-2.5 py-1 rounded-md bg-indigo-600/20 border border-indigo-500/30">
                    <span className="text-xs text-indigo-300 font-semibold whitespace-nowrap">Whitespace</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IP & defensibility */}
        <div className="mb-20">
          <SectionLabel>IP & Defensibility</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-8 leading-tight">
            The technical foundation is formally protected.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: FileText,
                title: 'Patent Pending',
                desc: 'Provisional patent filed under Holborn Rowe LLC. First-of-its-kind filing in recursive identity enforcement for autonomous AI agents. Full non-provisional filing in progress.',
              },
              {
                icon: Shield,
                title: 'Foundational Claim',
                desc: 'The approach draws from established frameworks in human identity development, operationalized as a tensor measurement system — a non-obvious contribution that supports broad foundational claims.',
              },
              {
                icon: TrendingUp,
                title: 'Academic Foundation',
                desc: 'Doctoral research at King\'s College London on adaptive cybersecurity education, recursive feedback architectures, and human–AI co-evolution. The product is the direct translation of that research.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-indigo-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business model */}
        <div className="mb-20">
          <SectionLabel>Business Model</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">
            The toll road model.
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-3xl">
            ARM designed the chip architecture that powers 95% of smartphones and licenses it to every
            manufacturer building on the standard. BridgetOS is the identity architecture for every AI agent —
            a licensable enforcement layer that becomes foundational infrastructure for the governed agentic AI stack.
            Gross margins exceed 90% at scale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Per-agent licensing',    desc: 'Metered identity enforcement per monitored agent across the operational lifetime.' },
              { label: 'Platform licensing',     desc: 'Enterprise agreements with AI agent platforms integrating BridgetOS as a governance layer.' },
              { label: 'Protocol licensing',     desc: 'Foundational IP licensing to governance, compliance, and security vendors building on the standard.' },
            ].map(({ label, desc }) => (
              <div key={label} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={14} className="text-indigo-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-white">{label}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparable rounds */}
        <div className="mb-20">
          <SectionLabel>Comparable Rounds</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-8 leading-tight">
            The funding landscape validates the category.
          </h2>

          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stage</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Raised</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">What they build</th>
                </tr>
              </thead>
              <tbody>
                {COMPARABLE_ROUNDS.map((row, i) => (
                  <tr key={row.company} className={i < COMPARABLE_ROUNDS.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="px-5 py-3.5 text-white text-xs font-medium">{row.company}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs hidden sm:table-cell">{row.stage}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-xs font-semibold text-indigo-400">{row.amount}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            AI pre-seed rounds now range from $500K to $3M, with AI infrastructure trending toward $2–3M.
            Startups with patents earn <span className="text-gray-500 font-medium">73% more capital</span> at early stages,
            and M&A deals involving patented startups command{' '}
            <span className="text-gray-500 font-medium">150% higher valuations.</span>
          </p>
        </div>

        {/* The ask */}
        <div className="mb-20">
          <SectionLabel>Current Round</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-8 leading-tight">
            Pre-seed. Seeking design partners<br />and aligned investors.
          </h2>

          <div className="glass rounded-2xl p-8 mb-6">
            <h3 className="text-sm font-semibold text-white mb-5">Milestone map</h3>
            <div className="flex flex-col gap-4">
              {[
                { milestone: 'Full non-provisional patent filing',              timing: 'Immediate priority' },
                { milestone: '3–5 design partners with live agent deployments', timing: 'Q2 2026'           },
                { milestone: 'Protocol v1.0 — first production integrations',   timing: 'Q3 2026'           },
                { milestone: 'First licensing revenue',                         timing: 'Aug 2026 (aligned with EU AI Act enforcement)' },
                { milestone: 'Seed round close',                                timing: 'Q3–Q4 2026'        },
              ].map(({ milestone, timing }) => (
                <div key={milestone} className="flex items-start gap-3">
                  <ChevronRight size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white">{milestone}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{timing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 100%)',
            border: '1px solid rgba(99,102,241,0.18)',
          }}>
            <p className="text-sm text-gray-300 leading-relaxed">
              BridgetOS is available to{' '}
              <span className="text-white font-semibold">design partners</span> with active autonomous agent
              deployments,{' '}
              <span className="text-white font-semibold">early adopters</span> in regulated industries
              facing AI Act compliance, and{' '}
              <span className="text-white font-semibold">investors</span> with a position in autonomous
              AI infrastructure or AI governance tooling.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 section-divider">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Get in Touch</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Ready to talk?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            For investor inquiries, design partner conversations, or to request the full pitch deck
            and technical white paper.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Investor Inquiry — BridgetOS`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors text-sm"
            >
              Investor Inquiry <ArrowRight size={15} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Design Partner Inquiry — BridgetOS`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-medium transition-all text-sm"
            >
              Design Partner Inquiry
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Full Deck Request — BridgetOS`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-medium transition-all text-sm"
            >
              Request Full Deck <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-700">
            Confidential — for intended recipients only. Patent pending under Holborn Rowe LLC.
            © 2026 Holborn Rowe LLC.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Root component ─────────────────────────────────────────────────────────────

export default function InvestorPage() {
  const [consented, setConsented] = useState(false);
  const [unlocked,  setUnlocked]  = useState(false);

  return (
    <>
      {!consented && <ConsentModal onAccept={() => setConsented(true)} />}
      {consented && !unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      {consented && unlocked && <InvestorBrief />}
    </>
  );
}
