import React from 'react';
import { ArrowRight, ChevronDown, BookOpen } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

const STATS = [
  { value: '4',      label: 'drift scoring dimensions'    },
  { value: '6',      label: 'HDIT monitoring vectors'     },
  { value: '4',      label: 'governance states enforced'  },
  { value: '<100ms', label: 'enforcement latency target'  },
];

export default function Hero({ onJoin }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden pt-16">
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 100% at 0% 50%, rgba(3,7,18,0.8) 0%, transparent 60%), radial-gradient(ellipse 40% 100% at 100% 50%, rgba(3,7,18,0.8) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide border"
          style={{ color: '#ff6699', borderColor: 'rgba(255,102,153,0.35)', background: 'rgba(255,102,153,0.08)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff6699' }} />
          Agentic AI Governance
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.0] mb-6">
          BridgetOS<span
            className="text-4xl md:text-6xl align-super ml-1"
            style={{ color: '#2dd4bf', opacity: 0.65, textShadow: '0 0 18px rgba(45,212,191,0.5)' }}
          >∞</span>
        </h1>

        <p className="text-2xl md:text-3xl text-white font-bold mb-3 tracking-tight max-w-2xl mx-auto leading-snug">
          Autonomous AI agents take actions.<br className="hidden sm:block" />
          Drifted agents take the wrong ones.
        </p>

        <p className="text-sm text-indigo-400/70 font-medium mb-8 tracking-wide max-w-xl mx-auto">
          The enforcement layer for recursive identity in agentic AI systems.
        </p>

        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          When an autonomous agent deviates from its verified behavioral baseline, it doesn't just
          produce incorrect output — it executes incorrect tool calls, writes incorrect data to
          memory, and makes incorrect downstream decisions. BridgetOS detects, classifies, and
          enforces before the action executes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
          <button onClick={onJoin}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 text-sm">
            Join the Waitlist <ArrowRight size={15} />
          </button>
          <a href="#whitepaper"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-medium transition-all duration-200 text-sm">
            Read White Paper <BookOpen size={15} />
          </a>
          <a href="/investors.html"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/6 hover:border-white/12 text-gray-600 hover:text-gray-400 font-medium transition-all duration-200 text-sm">
            Request Investor Brief
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-white">{value}</span>
              <span className="text-xs text-gray-600 tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-700">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
