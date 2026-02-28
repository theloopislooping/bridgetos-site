import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Mail } from 'lucide-react';
import { CONTACT_EMAIL, ROLE_OPTIONS } from '../../lib/constants.js';
import { API_URL, isApiConfigured } from '../../lib/env.js';

export default function WaitlistModal({ onClose }) {
  const [form, setForm]     = useState({ firstName: '', lastName: '', email: '', company: '', role: '', useCase: '', referral: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error | duplicate
  const [errors, setErrors] = useState({});
  const firstRef            = useRef(null);

  useEffect(() => {
    firstRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus('submitting');
    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setStatus(data.alreadyRegistered ? 'duplicate' : 'success');
    } catch {
      setStatus('error');
    }
  }

  function field(key, label, required, opts = {}) {
    return (
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">
          {label}{required && <span className="text-indigo-400 ml-0.5">*</span>}
        </label>
        <input
          ref={key === 'firstName' ? firstRef : undefined}
          type={opts.type || 'text'}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={opts.placeholder || ''}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border:     `1px solid ${errors[key] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
          }}
        />
        {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10,12,26,0.98)',
          border:     '1px solid rgba(99,102,241,0.25)',
          boxShadow:  '0 24px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Early Access</span>
            </div>
            <h2 className="text-lg font-black text-white tracking-tight">Join the Waitlist</h2>
            <p className="text-xs text-gray-500 mt-1">
              Expected access: <span className="text-gray-300 font-medium">Q3 2026</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-600 hover:text-gray-400 transition-colors mt-0.5">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* API not configured — graceful degraded state */}
          {!isApiConfigured() && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-400 mb-3">Waitlist temporarily unavailable.</p>
              <p className="text-xs text-gray-600">
                To register your interest, email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <button onClick={onClose} className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
                Close
              </button>
            </div>
          )}

          {isApiConfigured() && status === 'success' && (
            <div className="py-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">You're on the list.</h3>
                <p className="text-sm text-gray-400">We'll be in touch before Q3 2026.</p>
              </div>
              <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">What happens next</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    'Check your email — confirmation on its way.',
                    "We'll reach out directly to schedule a console walkthrough.",
                    'Design partners receive early access credentials and a co-development seat.',
                    'Questions? Email us any time.',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-indigo-500 font-mono text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href="https://www.linkedin.com/company/bridgetos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2.5 rounded-xl border border-white/8 hover:border-white/15 text-gray-400 hover:text-white text-xs font-medium transition-all"
                >
                  Follow on LinkedIn
                </a>
                <button onClick={onClose} className="flex-1 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
                  Done
                </button>
              </div>
            </div>
          )}

          {isApiConfigured() && status === 'duplicate' && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">You're already registered.</h3>
              <p className="text-sm text-gray-400">We have your details. We'll reach out before Q3 2026.</p>
              <button onClick={onClose} className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
                Close
              </button>
            </div>
          )}

          {isApiConfigured() && (status === 'idle' || status === 'submitting' || status === 'error') && (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {field('firstName', 'First name', true)}
                {field('lastName',  'Last name',  true)}
              </div>
              {field('email',   'Work email',  true,  { type: 'email', placeholder: 'you@company.com' })}
              {field('company', 'Company',     false, { placeholder: 'Optional' })}

              {/* Role dropdown */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <option value="" style={{ background: '#0a0c1a' }}>Select your role</option>
                  {ROLE_OPTIONS.map(r => (
                    <option key={r} value={r} style={{ background: '#0a0c1a' }}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Use case */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  What are you looking to govern? <span className="text-gray-700">(optional)</span>
                </label>
                <textarea
                  value={form.useCase}
                  onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}
                  placeholder="e.g. autonomous finance agents, multi-agent orchestration..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              {/* Attribution */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  How did you hear about us? <span className="text-gray-700">(optional)</span>
                </label>
                <select
                  value={form.referral}
                  onChange={e => setForm(f => ({ ...f, referral: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <option value="" style={{ background: '#0a0c1a' }}>Select one</option>
                  {['LinkedIn', 'Twitter / X', 'Word of mouth', 'Conference / Event', 'Academic / Research', 'Search', 'Press / Media', 'Other'].map(r => (
                    <option key={r} value={r} style={{ background: '#0a0c1a' }}>{r}</option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-400">
                  Something went wrong. Please try again or email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-red-300 hover:text-red-200 transition-colors">{CONTACT_EMAIL}</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors mt-1"
                style={{ background: status === 'submitting' ? 'rgba(99,102,241,0.5)' : '#4f46e5' }}
              >
                {status === 'submitting' ? 'Submitting…' : 'Join the Waitlist →'}
              </button>

              <p className="text-xs text-gray-700 text-center leading-relaxed">
                Expected access Q3 2026. We'll contact you before then.
                No spam. Unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
