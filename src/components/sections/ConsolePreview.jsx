import React, { useState, useEffect, useCallback } from 'react';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { src: '/screenshots/console-overview.png', label: 'Dashboard Overview'  },
  { src: '/screenshots/console-heatmap.png',  label: 'HDIT Heatmap'        },
  { src: '/screenshots/console-audit.png',    label: 'Immutable Audit Log' },
  { src: '/screenshots/console-agent.png',    label: 'Agent Detail Panel'  },
];

// Track which srcs have already failed so we don't flash on re-render
const _failed = new Set();

function SlideImage({ src, alt, active }) {
  const [failed, setFailed] = useState(() => _failed.has(src));

  if (failed) {
    // Placeholder so the container keeps its height
    return (
      <div style={{
        width: '100%', minHeight: '340px', background: 'rgba(10,12,26,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="text-xs text-gray-700 font-mono">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%', display: 'block',
        filter: 'blur(6px) brightness(0.45)',
        transform: 'scale(1.03)',
        minHeight: '340px',
        objectFit: 'cover',
        position: 'absolute', inset: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.45s ease',
      }}
      onError={() => { _failed.add(src); setFailed(true); }}
    />
  );
}

export default function ConsolePreview({ onJoin }) {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  // Auto-advance every 4s, pause on user interaction
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  const handleArrow = (fn) => {
    setPaused(true);
    fn();
    // Resume auto-advance after 8s of inactivity
    const t = setTimeout(() => setPaused(false), 8000);
    return () => clearTimeout(t);
  };

  return (
    <section id="console" className="section-divider py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            The Console
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Built. Running. Enforcing.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            BridgetOS is not a concept. The governance console is operational —
            live drift scoring, real-time heatmap, immutable audit log, and
            four-state enforcement across a monitored agent fleet.
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative rounded-2xl overflow-hidden" style={{
          border:    '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)',
        }}>

          {/* Slide images stacked — all rendered, only active is visible */}
          <div style={{ position: 'relative', minHeight: '340px' }}>
            {SLIDES.map((slide, i) => (
              <SlideImage
                key={slide.src}
                src={slide.src}
                alt={slide.label}
                active={i === current}
              />
            ))}
            {/* Spacer so container has height even before images load */}
            <div style={{ minHeight: '340px', width: '100%' }} />
          </div>

          {/* Frosted overlay + CTA */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ background: 'rgba(3,7,18,0.55)', backdropFilter: 'blur(2px)', zIndex: 2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
              <Lock size={20} className="text-indigo-400" />
            </div>
            <p className="text-white font-black text-xl mb-2 tracking-tight">
              Full access on request
            </p>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              Join the waitlist for a live console walkthrough.
              Investors and design partners receive full access credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onJoin}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
              >
                Join the Waitlist
              </button>
              <a
                href="/investors.html"
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all"
              >
                Investor Brief →
              </a>
            </div>
          </div>

          {/* Top chrome bar */}
          <div
            className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 gap-1.5"
            style={{ background: 'rgba(3,5,14,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-gray-600 font-mono">
              BridgetOS — {SLIDES[current].label}
            </span>
          </div>

          {/* Arrow buttons */}
          <button
            onClick={() => handleArrow(prev)}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'rgba(99,102,241,0.25)',
              border: '1px solid rgba(99,102,241,0.5)',
              color: '#fff',
              zIndex: 20,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleArrow(next)}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'rgba(99,102,241,0.25)',
              border: '1px solid rgba(99,102,241,0.5)',
              color: '#fff',
              zIndex: 20,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
            style={{ zIndex: 20 }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPaused(true); setCurrent(i); setTimeout(() => setPaused(false), 8000); }}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width:      i === current ? '20px' : '6px',
                  height:     '6px',
                  borderRadius: '3px',
                  background: i === current ? '#6366f1' : 'rgba(255,255,255,0.2)',
                  border:     'none',
                  padding:    0,
                  cursor:     'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { value: 'Live',      label: 'Real-time drift scoring',      teal: true  },
            { value: 'Instant',   label: 'WebSocket heatmap updates',    teal: true  },
            { value: 'Immutable', label: 'Append-only audit log',        teal: false },
            { value: 'Automatic', label: 'Enforcement — no human loop',  teal: false },
          ].map(({ value, label, teal }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <p className="text-sm font-bold mb-1" style={{ color: teal ? '#2dd4bf' : '#fff' }}>{value}</p>
              <p className="text-xs text-gray-600 leading-snug">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
