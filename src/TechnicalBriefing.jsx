import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Shield, ArrowRight, Lock, CheckCircle, ChevronRight, ChevronLeft,
  Cpu, TrendingUp, GitBranch, Layers, Activity, BarChart3,
  Eye, Fingerprint, FileText, Terminal, Zap, AlertTriangle,
} from 'lucide-react';

import { CONTACT_EMAIL, GATE_PASSWORD } from './lib/constants.js';

// ── Access gate (not cryptographically secure) ────────────────────────────────
// Client-side password gate. Deters casual access; rotate periodically.
// Password is read from VITE_GATE_PASSWORD env var (set in .env, never committed).
// Share with qualified technical evaluators — CTOs, architects, lead engineers.
const TECHNICAL_PASSWORD = GATE_PASSWORD;

const MAX_ATTEMPTS  = 5;
const LOCKOUT_SECS  = 60;

// ── Screenshot gallery (slideshow with arrows) ────────────────────────────────

const GALLERY_SLIDES = [
  { src: '/screenshots/console-overview.png', label: 'BridgetOS — Agent Fleet Dashboard',  caption: 'Full fleet view: drift scores, governance states, and HDIT heatmap across all monitored agents.' },
  { src: '/screenshots/console-agent.png',    label: 'Agent Detail — Drift Score Breakdown', caption: 'Per-agent panel showing all four drift components, severity band, stability score, and mutation risk.' },
  { src: '/screenshots/console-heatmap.png',  label: 'HDIT Heatmap — V1–V6 Live Vectors',  caption: 'Live six-vector heatmap broadcast via WebSocket. Each cell normalised to [0,1] and updated per observation cycle.' },
  { src: '/screenshots/console-audit.png',    label: 'Audit Log — Append-Only Record',     caption: 'Immutable, seq-tagged audit log. Every governance decision, state transition, and blocked action recorded.' },
];

const _galleryFailed = new Set();

function GallerySlide({ src, alt, active }) {
  const [failed, setFailed] = useState(() => _galleryFailed.has(src));
  if (failed) {
    return (
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,12,26,0.8)',
          opacity: active ? 1 : 0, transition: 'opacity 0.4s ease',
        }}
      >
        <span className="text-xs text-gray-700 font-mono">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      onError={() => { _galleryFailed.add(src); setFailed(true); }}
    />
  );
}

function ScreenshotGallery() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const total = GALLERY_SLIDES.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const go = (fn) => { setPaused(true); fn(); setTimeout(() => setPaused(false), 10000); };

  const slide = GALLERY_SLIDES[current];

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      border:    '1px solid rgba(99,102,241,0.2)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
    }}>
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 h-8 flex-shrink-0"
        style={{ background: 'rgba(3,5,14,0.97)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-gray-500 font-mono flex-1 truncate">{slide.label}</span>
        {/* Slide counter */}
        <span className="text-[10px] text-gray-700 font-mono flex-shrink-0">{current + 1} / {total}</span>
      </div>

      {/* Slide area */}
      <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
        {GALLERY_SLIDES.map((s, i) => (
          <GallerySlide key={s.src} src={s.src} alt={s.label} active={i === current} />
        ))}

        {/* Arrows */}
        <button
          onClick={() => go(prev)}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
          style={{ background: 'rgba(99,102,241,0.28)', border: '1px solid rgba(99,102,241,0.5)', color: '#fff', zIndex: 10, backdropFilter: 'blur(4px)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(next)}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
          style={{ background: 'rgba(99,102,241,0.28)', border: '1px solid rgba(99,102,241,0.5)', color: '#fff', zIndex: 10, backdropFilter: 'blur(4px)' }}
        >
          <ChevronRight size={18} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 10 }}>
          {GALLERY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setCurrent(i); setTimeout(() => setPaused(false), 10000); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px', borderRadius: '3px', border: 'none', padding: 0, cursor: 'pointer',
                background: i === current ? '#6366f1' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="px-5 py-3" style={{ background: 'rgba(4,6,16,0.9)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-gray-500 leading-relaxed">{slide.caption}</p>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
      {children}
    </p>
  );
}

function Tag({ children, color = 'indigo' }) {
  const styles = {
    indigo: { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)', text: '#a5b4fc' },
    amber:  { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)', text: '#fcd34d' },
    red:    { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',  text: '#fca5a5' },
    green:  { bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.25)', text: '#86efac' },
  }[color];
  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold" style={{
      background: styles.bg, border: `1px solid ${styles.border}`, color: styles.text,
    }}>{children}</span>
  );
}

// ── Consent modal ─────────────────────────────────────────────────────────────

function ConsentModal({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: 'rgba(10,12,26,0.98)', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.7)' }}>
        <div className="px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-indigo-400" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">Confidentiality Notice</h2>
          </div>
          <p className="text-xs text-gray-600 ml-11">Review and accept before proceeding.</p>
        </div>

        <div className="px-6 py-5 overflow-y-auto text-xs text-gray-400 leading-relaxed flex flex-col gap-4" style={{ maxHeight: '340px' }}>
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">1. Confidentiality</p>
            <p>
              This technical briefing contains proprietary architecture details, system specifications,
              integration models, and intellectual property belonging to Holborn Rowe LLC.
              By accessing this document you agree not to reproduce, distribute, reverse-engineer,
              or disclose its contents to any third party without prior written consent from Holborn Rowe LLC.
              Contents are intended solely for qualified technical evaluators engaged in bona fide
              assessment of BridgetOS for their organization.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">2. Intellectual Property</p>
            <p>
              All system architecture, scoring methodologies, governance FSM specifications,
              HDIT vector definitions, Identity Vector framework, and Recursive Drift Index taxonomy
              described herein are the exclusive intellectual property of Holborn Rowe LLC.
              A provisional patent application is currently pending with the USPTO. Unauthorized use
              may constitute patent infringement and/or misappropriation of trade secrets.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">3. No License Granted</p>
            <p>
              Access to this briefing does not grant any license, right, or permission to implement,
              replicate, or build upon the described architecture. Technical evaluation rights are
              granted solely for the purpose of assessing a potential commercial relationship with
              Holborn Rowe LLC.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">4. Data & Privacy</p>
            <p>
              Your access may be logged for security purposes. Any personal data associated with
              this access will be handled in accordance with UK GDPR, EU GDPR, and applicable US
              state privacy laws. Contact wendi.soto@bridgetos.com to exercise your data rights.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-1.5">5. Governing Law</p>
            <p>
              This notice is governed by the laws of England and Wales, without prejudice to
              mandatory rights applicable in your jurisdiction.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 border-t border-white/5">
          <label className="flex items-start gap-3 cursor-pointer mb-5 group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="sr-only" />
              <div className="w-4 h-4 rounded border flex items-center justify-center transition-all"
                style={{ background: checked ? '#4f46e5' : 'rgba(255,255,255,0.04)', borderColor: checked ? '#6366f1' : 'rgba(255,255,255,0.15)' }}>
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              I have read this notice and agree to keep all materials strictly confidential.
              I am accessing this briefing for legitimate technical evaluation purposes.
            </span>
          </label>
          <div className="flex items-center gap-3">
            <button onClick={onAccept} disabled={!checked}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: checked ? '#4f46e5' : 'rgba(255,255,255,0.04)', color: checked ? '#ffffff' : '#4b5563', cursor: checked ? 'pointer' : 'not-allowed', border: checked ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
              Accept & Continue
            </button>
            <a href="/" className="px-5 py-3 rounded-xl text-sm text-gray-600 hover:text-gray-400 transition-colors border border-white/5 hover:border-white/10">
              Decline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Password gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt(inputValue) {
    const clean = (inputValue ?? value).trim();
    if (clean === TECHNICAL_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 dot-grid">
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <Terminal size={20} className="text-indigo-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2 tracking-tight">Technical Briefing</h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter your access code to view the architecture documentation.
          <br />
          <a href={`mailto:${CONTACT_EMAIL}?subject=Technical Briefing Access Request`}
            className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Request access →
          </a>
        </p>

        <div className="flex gap-2" style={shake ? { animation: 'shake 0.4s ease' } : {}}>
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && attempt(value)}
            placeholder="Access code"
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}` }}
            autoFocus
          />
          <button onClick={() => attempt(value)}
            className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex-shrink-0">
            <ArrowRight size={16} />
          </button>
        </div>
        {error && <p className="text-xs text-red-400 mt-2">Incorrect access code.</p>}
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

// ── Technical content ─────────────────────────────────────────────────────────

function TechCard({ icon: Icon, title, children, accent = false }) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{
      background: accent
        ? 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 100%)'
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${accent ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)'}`,
    }}>
      {Icon && (
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
            <Icon size={16} className="text-indigo-400" />
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
      )}
      {!Icon && title && <h3 className="text-base font-bold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
}

function Mono({ children }) {
  return (
    <code className="text-xs font-mono px-1.5 py-0.5 rounded"
      style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }}>
      {children}
    </code>
  );
}

function Row({ label, value, note }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/4 last:border-0">
      <span className="text-xs text-gray-500 font-mono flex-shrink-0 w-36">{label}</span>
      <span className="text-xs text-gray-300 text-right flex-1">{value}</span>
      {note && <span className="text-xs text-gray-600 text-right flex-shrink-0 hidden sm:block">{note}</span>}
    </div>
  );
}

function TechnicalContent() {
  return (
    <div className="min-h-screen">
      {/* Header bar */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">BridgetOS</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 hidden sm:block">Technical Briefing</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
              <Lock size={10} /> Confidential
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Title */}
        <div className="mb-16 max-w-3xl">
          <SectionLabel>Technical Architecture Briefing</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            BridgetOS — Identity Enforcement Stack
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            This document describes the BridgetOS system architecture for qualified technical
            evaluators. It covers the enforcement pipeline, scoring methodology, governance model,
            HDIT monitoring, integration approach, and deployment requirements.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Tag>Patent Pending · USPTO</Tag>
            <Tag color="amber">Confidential · Do Not Distribute</Tag>
            <Tag color="green">v1.0 · 2026</Tag>
          </div>
        </div>

        {/* ── 1. System Overview ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">01</span>
            <h2 className="text-2xl font-black text-white">System Overview</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            BridgetOS is a behavioral enforcement layer for autonomous AI agents. It sits between
            agent execution and downstream action, continuously scoring agent behavior against a
            verified identity baseline and applying governance policy when drift is detected.
            It does not modify the underlying model and requires no changes to model weights or
            prompt templates.
          </p>

          {/* Data flow */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(4,6,16,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Enforcement Pipeline</p>
            <div className="flex flex-col gap-2 font-mono text-xs">
              {[
                ['Agent output / tool call / memory write', 'text-gray-400'],
                ['↓ Observation ingestion', 'text-gray-600'],
                ['Identity Engine — baseline comparison', 'text-indigo-300'],
                ['↓ Drift scoring pipeline', 'text-gray-600'],
                ['Drift Monitor — composite index + severity band', 'text-indigo-300'],
                ['↓ Threshold evaluation', 'text-gray-600'],
                ['Enforcement Unit — FSM state transition', 'text-indigo-300'],
                ['↓ If LOCKED: tool calls blocked · memory writes blocked', 'text-amber-400'],
                ['Audit log append (append-only, seq-tagged)', 'text-indigo-300'],
                ['↓ HDIT windows updated', 'text-gray-600'],
                ['Heatmap broadcast via WebSocket', 'text-indigo-300'],
              ].map(([line, color], i) => (
                <div key={i} className={`${color} leading-relaxed`}>{line}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Processing model',   value: 'Synchronous per observation'    },
              { label: 'Enforcement point',  value: 'Pre-execution (not post-hoc)'   },
              { label: 'Audit model',        value: 'Append-only, monotonic counter' },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-gray-600 mb-1.5">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Identity Vector ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">02</span>
            <h2 className="text-2xl font-black text-white">Identity Vector</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            Each agent is characterized by a multi-dimensional Identity Vector established during
            a baseline calibration period. The vector encodes behavioral signatures across four
            primary dimensions. All subsequent observations are scored relative to this vector.
            The vector is updated only under controlled conditions (explicit recalibration or
            identity transition events).
          </p>

          <TechCard icon={Fingerprint} title="Identity Vector Components" accent>
            <div className="flex flex-col divide-y divide-white/5">
              <Row label="semDist"   value="Semantic distance — vocabulary, concept profile, technical register deviation from baseline" note="Weight: 0.30" />
              <Row label="styDist"   value="Stylometric distance — sentence structure, punctuation density, output length patterns"        note="Weight: 0.25" />
              <Row label="affDist"   value="Affective distance — sentiment polarity, intensity ratio, emotional register shift"            note="Weight: 0.25" />
              <Row label="riskDelta" value="Risk content delta — adversarial terms, refusal frequency, high-risk content density"          note="Weight: 0.20" />
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-600">
                Each component is independently calibrated. Composite Drift Index = weighted sum of all four components, clamped to [0, 1].
              </p>
            </div>
          </TechCard>

          <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(99,102,241,0.05)', borderLeft: '2px solid rgba(99,102,241,0.4)' }}>
            <p className="text-xs text-indigo-300 leading-relaxed">
              <span className="font-semibold">Baseline calibration:</span> The Identity Vector is initialized from a canary observation
              pack (a controlled set of representative texts) before live agent traffic begins.
              The calibration period establishes the statistical distribution of each component
              for the specific agent and model type — enabling per-agent, per-model sensitivity
              rather than a fixed global threshold.
            </p>
          </div>
        </section>

        {/* ── 3. Drift Scoring ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">03</span>
            <h2 className="text-2xl font-black text-white">Drift Index & Severity Classification</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            The Drift Monitor computes a composite Drift Index (DI) on each observation.
            DI is classified into five severity bands that determine governance response.
            A Stability Score accompanies the DI to distinguish systematic drift from noise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TechCard icon={TrendingUp} title="Drift Index Bands">
              <div className="flex flex-col gap-2">
                {[
                  { band: 'MINIMAL',  range: '0.00 – 0.20', sev: 0, state: 'NORMAL',          color: '#4ade80' },
                  { band: 'LOW',      range: '0.20 – 0.40', sev: 1, state: 'NORMAL',          color: '#86efac' },
                  { band: 'MODERATE', range: '0.40 – 0.60', sev: 2, state: 'WATCHLIST',       color: '#fbbf24' },
                  { band: 'HIGH',     range: '0.60 – 0.78', sev: 3, state: 'REVIEW_REQUIRED', color: '#f97316' },
                  { band: 'CRITICAL', range: '0.78 – 1.00', sev: 4, state: 'LOCKED',          color: '#ef4444' },
                ].map(({ band, range, sev, state, color }) => (
                  <div key={band} className="flex items-center justify-between gap-3 py-2 border-b border-white/4 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs font-mono font-bold" style={{ color }}>{band}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{range}</span>
                    <span className="text-xs text-gray-600">SEV {sev}</span>
                    <Tag color={sev >= 4 ? 'red' : sev >= 3 ? 'amber' : sev >= 2 ? 'amber' : 'green'}>
                      {state}
                    </Tag>
                  </div>
                ))}
              </div>
            </TechCard>

            <TechCard icon={Activity} title="Stability Score">
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                The Stability Score (0–1) measures the consistency of drift readings over a rolling
                observation window. A high Drift Index with high Stability Score indicates systematic
                behavioral shift — the agent has stabilized at a deviated state. High Drift Index
                with low Stability Score indicates adversarial probing or environmental noise.
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="rounded-xl p-3" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.1)' }}>
                  <p className="text-xs font-semibold text-indigo-400 mb-1">High DI + High Stability</p>
                  <p className="text-xs text-gray-500">Systematic drift → escalation appropriate</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.1)' }}>
                  <p className="text-xs font-semibold text-amber-400 mb-1">High DI + Low Stability</p>
                  <p className="text-xs text-gray-500">Adversarial probing → heightened monitoring</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.1)' }}>
                  <p className="text-xs font-semibold text-green-400 mb-1">Low DI + High Stability</p>
                  <p className="text-xs text-gray-500">Stable baseline behavior → NORMAL</p>
                </div>
              </div>
            </TechCard>
          </div>
        </section>

        {/* ── 4. Governance FSM ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">04</span>
            <h2 className="text-2xl font-black text-white">Governance State Machine</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            The four-state FSM translates drift classifications into enforcement actions.
            Escalation is automatic and threshold-driven. De-escalation requires either
            human review (LOCKED → REVIEW_REQUIRED) or sustained low-drift readings
            (REVIEW_REQUIRED / WATCHLIST → NORMAL after 3 consecutive clean ticks).
          </p>

          <TechCard icon={GitBranch} title="State Definitions & Enforcement" accent>
            <div className="flex flex-col gap-4">
              {[
                {
                  state: 'NORMAL',
                  color: '#4ade80',
                  toolCalls: 'Permitted',
                  memWrites: 'Permitted',
                  humanReview: 'Not required',
                  transition: 'DI > MODERATE threshold → WATCHLIST',
                },
                {
                  state: 'WATCHLIST',
                  color: '#fbbf24',
                  toolCalls: 'Permitted (logged)',
                  memWrites: 'Permitted (flagged)',
                  humanReview: 'Not required',
                  transition: 'DI > HIGH threshold → REVIEW_REQUIRED · sustained low DI → NORMAL',
                },
                {
                  state: 'REVIEW_REQUIRED',
                  color: '#f97316',
                  toolCalls: 'Suspended',
                  memWrites: 'Restricted',
                  humanReview: 'Required to escalate or clear',
                  transition: 'DI > CRITICAL → LOCKED · human clear → WATCHLIST',
                },
                {
                  state: 'LOCKED',
                  color: '#ef4444',
                  toolCalls: 'Blocked',
                  memWrites: 'Blocked',
                  humanReview: 'Required to unlock',
                  transition: 'Explicit admin override required · never auto-downgrade',
                },
              ].map(({ state, color, toolCalls, memWrites, humanReview, transition }) => (
                <div key={state} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-sm font-bold font-mono" style={{ color }}>{state}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                    <div><span className="text-gray-600">Tool calls: </span><span className="text-gray-300">{toolCalls}</span></div>
                    <div><span className="text-gray-600">Memory writes: </span><span className="text-gray-300">{memWrites}</span></div>
                    <div><span className="text-gray-600">Human review: </span><span className="text-gray-300">{humanReview}</span></div>
                  </div>
                  <p className="text-xs text-gray-600 font-mono">→ {transition}</p>
                </div>
              ))}
            </div>
          </TechCard>
        </section>

        {/* ── 5. HDIT Monitoring ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">05</span>
            <h2 className="text-2xl font-black text-white">HDIT Monitoring</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-2 max-w-3xl">
            The High-Dimensional Identity Tracking (HDIT) layer maintains six behavioral
            monitoring vectors with rolling observation windows. HDIT operates in parallel
            with the Drift Index pipeline and feeds the live heatmap broadcast to connected
            console clients via WebSocket.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            HDIT is designed to surface behavioral patterns that aggregate drift scoring may
            not immediately flag — including anomalies in tool call frequency, refusal rate
            shifts, and token-level volatility signatures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                v: 'V1', label: 'Semantic Velocity',
                desc: 'Rate of change in semantic distance from baseline across consecutive observations. High velocity indicates rapid behavioral shift rather than slow drift.',
              },
              {
                v: 'V2', label: 'Token Distribution',
                desc: 'Rolling statistical distribution of output token counts and character lengths. Tracks structural output changes that may precede semantic drift.',
              },
              {
                v: 'V3', label: 'Affective Variance',
                desc: 'Variance in affective scoring across the observation window. High variance with sustained elevated affect indicates adversarial probing of emotional registers.',
              },
              {
                v: 'V4', label: 'Risk Content Density',
                desc: 'Rolling density of high-risk token classifications per observation window. Weighted by recency. Feeds directly into riskDelta for the Drift Index.',
              },
              {
                v: 'V5', label: 'Refusal Rate',
                desc: 'Frequency of refusal-classified outputs. Unusually high refusal rates may indicate adversarial probing; unusually low rates may indicate identity displacement.',
              },
              {
                v: 'V6', label: 'Context Bucket Distribution',
                desc: 'Classification of observations into content buckets (technical, planning, emotional, policy, adversarial, neutral). Shifts in bucket distribution flag profile changes.',
              },
            ].map(({ v, label, desc }) => (
              <div key={v} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded">{v}</span>
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(99,102,241,0.05)', borderLeft: '2px solid rgba(99,102,241,0.4)' }}>
            <p className="text-xs text-indigo-300 leading-relaxed">
              <span className="font-semibold">HDIT heatmap:</span> All six vectors are surfaced as a live heatmap in the governance console.
              Each cell represents a vector's current value normalized to [0, 1].
              The heatmap is broadcast via WebSocket on every observation cycle — no polling required.
              Governance state transitions are overlaid directly on the heatmap.
            </p>
          </div>
        </section>

        {/* ── Console screenshots ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-gray-700">05b</span>
            <h2 className="text-2xl font-black text-white">Console — Running System</h2>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            Screenshots from the operational governance console. All data shown is live —
            drift scores, governance states, and audit entries are generated by the running system.
          </p>
          <ScreenshotGallery />
        </section>

        {/* ── 6. Integration Model ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">06</span>
            <h2 className="text-2xl font-black text-white">Integration Architecture</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            BridgetOS integrates at the agent orchestration layer — not at the model layer.
            No changes to model weights, prompt templates, or inference infrastructure are required.
            Integration is via a lightweight observation API that receives agent outputs, tool calls,
            and memory write events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TechCard icon={Zap} title="Integration Points">
              <div className="flex flex-col gap-3">
                {[
                  { point: 'Agent output hook',    desc: 'Called after each model inference before downstream action. Receives raw output text.' },
                  { point: 'Tool call intercept',  desc: 'Called before each tool invocation. Receives tool name + parameters. Can block execution.' },
                  { point: 'Memory write hook',     desc: 'Called before each write to agent memory or external state. Can restrict write.' },
                  { point: 'Session boundary',      desc: 'Optional: called at session start/end to update baseline windows and emit identity passport.' },
                ].map(({ point, desc }) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <ChevronRight size={13} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-white">{point}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TechCard>

            <TechCard icon={Layers} title="Deployment Model">
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Deployment',    value: 'Single-tenant · self-hosted or managed' },
                  { label: 'Backend',       value: 'FastAPI + MongoDB · async observation ingestion' },
                  { label: 'Realtime',      value: 'WebSocket broadcast · governance + heatmap events' },
                  { label: 'Auth',          value: 'JWT + httpOnly cookie · role-based (admin / researcher / viewer)' },
                  { label: 'Audit export',  value: 'NDJSON · sequential counter · SIEM-compatible' },
                  { label: 'Rate limiting', value: 'Configurable per-endpoint · in-process (Redis-upgradeable)' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3 py-2 border-b border-white/4 last:border-0">
                    <span className="text-xs text-gray-600 w-24 flex-shrink-0">{label}</span>
                    <span className="text-xs text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </TechCard>
          </div>

          <TechCard title="Role-Based Access Control" accent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  role: 'admin',
                  color: '#ef4444',
                  perms: ['All researcher permissions', 'Create / modify users', 'Unlock LOCKED agents', 'Export audit bundles', 'Governance override'],
                },
                {
                  role: 'researcher',
                  color: '#f97316',
                  perms: ['View all agent data', 'Trigger manual scans', 'Reset agent baseline', 'Mark false positives', 'Submit feedback records'],
                },
                {
                  role: 'viewer',
                  color: '#6366f1',
                  perms: ['View dashboard + heatmap', 'Read audit log', 'View governance states', 'No write access', 'No export access'],
                },
              ].map(({ role, color, perms }) => (
                <div key={role} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-bold font-mono mb-3" style={{ color }}>{role}</p>
                  <div className="flex flex-col gap-1.5">
                    {perms.map(p => (
                      <div key={p} className="flex items-start gap-1.5">
                        <CheckCircle size={10} className="flex-shrink-0 mt-0.5" style={{ color }} />
                        <span className="text-xs text-gray-400">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TechCard>
        </section>

        {/* ── 7. Audit & Compliance Artifacts ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">07</span>
            <h2 className="text-2xl font-black text-white">Audit & Compliance Artifacts</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            Every enforcement action is written to a monotonic, append-only audit log. The log
            cannot be modified post-write. Sequence numbers are assigned at write time and are
            contiguous — any gap in sequence indicates a missing record and is itself an audit event.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                icon: FileText,
                title: 'Identity Passport',
                items: [
                  'Agent ID + model type',
                  'Baseline calibration timestamp + methodology',
                  'Current Identity Vector (all 4 components)',
                  'Governance state history (FSM transitions)',
                  'Action profile (tool calls blocked, memory writes restricted)',
                  'RDI classification (Core / Licensed / Mimic / T)',
                ],
              },
              {
                icon: BarChart3,
                title: 'Drift Log (per observation)',
                items: [
                  'Observation timestamp + agent ID',
                  'Raw text hash (not stored — privacy by design)',
                  'Component scores: semDist, styDist, affDist, riskDelta',
                  'Composite Drift Index + Stability Score',
                  'Severity band + governance state at time of observation',
                  'Any enforcement action triggered (if applicable)',
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <TechCard key={title} icon={Icon} title={title}>
                <div className="flex flex-col gap-2">
                  {items.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </TechCard>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(99,102,241,0.05)', borderLeft: '2px solid rgba(99,102,241,0.4)' }}>
            <p className="text-xs text-indigo-300 leading-relaxed">
              <span className="font-semibold">NDJSON export:</span> The full audit log is exportable as newline-delimited JSON — one record per line,
              each containing the full event envelope. Compatible with Splunk, Elastic SIEM, and any
              NDJSON-aware log aggregation pipeline. Compliance export bundles (
              <Mono>GET /api/reports/compliance</Mono>) generate a structured snapshot including
              agent fleet status, drift statistics, and governance event counts for a specified time window.
            </p>
          </div>
        </section>

        {/* ── 8. RDI Classification ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">08</span>
            <h2 className="text-2xl font-black text-white">Recursive Drift Index (RDI) Classification</h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
            RDI classification is a live operational label assigned to each agent on every observation
            cycle. Unlike one-time assessments, RDI tracks identity coherence continuously across the
            agent's full operational lifetime — including across model updates, session boundaries,
            and deployment changes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                rdi: 'RDI Core',
                color: '#4ade80',
                desc: 'Agent behavior is stable and self-consistent within defined parameters. Baseline established, verified, and actively maintained. Drift Index is low and stable. No convergence toward other agent profiles detected.',
                action: 'Standard monitoring · no escalation',
              },
              {
                rdi: 'RDI Licensed',
                color: '#818cf8',
                desc: 'Agent is operating under an explicitly granted identity framework — executing an authorized role with behavioral constraints enforced at the governance layer. Deviation is monitored against the licensed profile, not the original baseline.',
                action: 'Profile-relative monitoring · role-constrained enforcement',
              },
              {
                rdi: 'RDI Mimic',
                color: '#f97316',
                desc: 'Agent behavior is drifting toward another known agent\'s behavioral signature. Indicates potential adversarial redirection, unauthorized profile transfer, or identity convergence in multi-agent orchestration environments.',
                action: 'Heightened monitoring · operator alert · WATCHLIST auto-escalation',
              },
              {
                rdi: 'RDI-T',
                color: '#fbbf24',
                desc: 'Agent is in a documented identity transition — model update, fine-tune, adapter swap, or deliberate reconfiguration. Standard baseline comparison is suspended; monitoring continues against the pre-transition profile while a new baseline is established.',
                action: 'Transition window · intensified monitoring · temporary threshold adjustment',
              },
            ].map(({ rdi, color, desc, action }) => (
              <div key={rdi} className="glass rounded-2xl p-5">
                <p className="text-sm font-bold font-mono mb-3" style={{ color }}>{rdi}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{desc}</p>
                <div className="text-xs font-mono" style={{ color: color + 'aa' }}>→ {action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. Security Model ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-700">09</span>
            <h2 className="text-2xl font-black text-white">Security Model</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TechCard icon={AlertTriangle} title="Identity-Layer Threats Detected">
              <div className="flex flex-col gap-3">
                {[
                  { t: 'Gradual drift',      d: 'Slow behavioral displacement invisible to conventional logging. Detected via stability-weighted DI over rolling windows.' },
                  { t: 'Prompt injection',   d: 'Mid-session adversarial redirection of agent decision-making. Detected via abrupt V1 velocity spike + riskDelta elevation.' },
                  { t: 'Recursive collapse', d: 'Feedback loops in self-referential agents. Detected via sustained DI increase with compounding HDIT window filling.' },
                  { t: 'Identity cloning',   d: 'Behavioral convergence toward another agent\'s signature. Detected via RDI Mimic classification + cross-agent similarity scoring.' },
                  { t: 'Silent model swap',  d: 'Model version change without declared RDI-T. Detected via discontinuous baseline deviation pattern after deployment event.' },
                ].map(({ t, d }) => (
                  <div key={t} className="rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
                    <p className="text-xs font-semibold text-red-400 mb-1">{t}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </TechCard>

            <TechCard icon={Shield} title="Platform Security Posture">
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Authentication',   value: 'JWT (RS256 or HS256) + httpOnly SameSite=Lax cookie. JTI blacklist with MongoDB write-through + TTL auto-expiry.' },
                  { label: 'Authorization',    value: 'Role-based on every endpoint. Admin / researcher / viewer claims validated server-side per request.' },
                  { label: 'Rate limiting',    value: 'Per-endpoint limits enforced in-process (SlowAPI). Configurable. Redis-upgradeable for multi-instance deployments.' },
                  { label: 'Secret handling',  value: 'JWT_SECRET validated at startup. Server refuses to start with default or empty secret.' },
                  { label: 'Audit integrity',  value: 'Append-only log. Sequential counter. No update or delete operations on audit records.' },
                  { label: 'Input validation', value: 'Pydantic models on all request bodies. Strict type coercion. No raw SQL or NoSQL query construction from user input.' },
                ].map(({ label, value }) => (
                  <div key={label} className="py-2.5 border-b border-white/4 last:border-0">
                    <p className="text-xs font-semibold text-gray-300 mb-1">{label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </TechCard>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <div className="rounded-2xl p-8 text-center" style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 100%)',
          border: '1px solid rgba(99,102,241,0.18)',
        }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Next Steps</p>
          <h3 className="text-2xl font-black text-white mb-3">Ready to go deeper?</h3>
          <p className="text-sm text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed">
            Integration walkthrough, live demo of the production console, or a call with the
            architect — contact us to arrange your technical evaluation session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Technical Evaluation Session Request`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
              Request Evaluation Session <ArrowRight size={14} />
            </a>
            <a href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm font-medium transition-all">
              Back to Site
            </a>
          </div>
        </div>

        {/* Confidentiality footer */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-700 leading-relaxed">
            Confidential · Holborn Rowe LLC · Patent Pending (USPTO) ·{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-600 hover:text-gray-400 transition-colors">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function TechnicalBriefing() {
  const [consented, setConsented] = useState(false);
  const [unlocked,  setUnlocked]  = useState(false);

  if (!consented) return <ConsentModal onAccept={() => setConsented(true)} />;
  if (!unlocked)  return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <TechnicalContent />;
}
