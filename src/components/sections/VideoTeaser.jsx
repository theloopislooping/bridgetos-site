import React from 'react';
import { Play, Lock } from 'lucide-react';

export default function VideoTeaser({ onJoin }) {
  return (
    <section className="section-divider py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          onClick={onJoin}
          style={{
            background: 'rgba(6,8,20,0.8)',
            border: '1px solid rgba(99,102,241,0.18)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            aspectRatio: '16/7',
          }}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Fake scanlines for terminal feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
          }} />

          {/* Chrome bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 gap-1.5"
            style={{ background: 'rgba(3,5,14,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <span className="ml-3 text-xs text-gray-600 font-mono">BridgetOS — Console Walkthrough</span>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(99,102,241,0.18)',
                border: '1px solid rgba(99,102,241,0.35)',
                boxShadow: '0 0 40px rgba(99,102,241,0.2)',
              }}
            >
              <Lock size={20} className="text-indigo-400 group-hover:hidden" />
              <Play size={20} className="text-indigo-300 hidden group-hover:block" fill="currentColor" />
            </div>
            <p className="text-white font-black text-lg mb-1.5 tracking-tight">
              3-minute console walkthrough
            </p>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-4">
              Live drift scoring · governance FSM in action · enforcement blocking · HDIT heatmap
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-500/25 bg-indigo-600/15">
              <Lock size={11} className="text-indigo-400" />
              <span className="text-xs text-indigo-300 font-medium">Available to waitlist members — join for access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
