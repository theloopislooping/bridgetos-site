import React, { useState } from 'react';
import { ArrowRight, Building2, Zap, Eye, Send, CheckCircle } from 'lucide-react';
import { CONTACT_EMAIL } from '../../lib/constants.js';

// ── To enable the contact form, create a free account at formspree.io,
//    create a new form, and set VITE_FORMSPREE_ID in your Vercel environment variables.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? '';

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
  const [form, setForm]       = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors]   = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus('submitting');

    if (!FORMSPREE_ID) {
      // Fallback: open mailto with prefilled body
      const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\n\n${form.message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=BridgetOS%20Enquiry%20from%20${encodeURIComponent(form.name)}&body=${body}`;
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ name: form.name, email: form.email, company: form.company, message: form.message }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function input(key, label, required, opts = {}) {
    return (
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">
          {label}{required && <span className="text-indigo-400 ml-0.5">*</span>}
        </label>
        <input
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
    <section id="partnership" className="section-divider py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Enterprise & Partners</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Build defensible agents.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            BridgetOS is available to design partners, early adopters, and strategic
            collaborators deploying autonomous AI agents in contexts where behavioral integrity,
            action auditability, and governance enforcement are hard requirements.
          </p>
        </div>

        {/* Partner type cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
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

        {/* Contact form + CTA side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Contact form */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Get in touch</p>
            <h3 className="text-white font-bold text-lg mb-5">Send us a message</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <CheckCircle size={22} className="text-indigo-400" />
                </div>
                <p className="text-white font-semibold">Message received.</p>
                <p className="text-xs text-gray-500 text-center">We'll get back to you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  {input('name',    'Name',    true,  { placeholder: 'Your name' })}
                  {input('company', 'Company', false, { placeholder: 'Optional' })}
                </div>
                {input('email', 'Work email', true, { type: 'email', placeholder: 'you@company.com' })}

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    Message<span className="text-indigo-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about your agent deployment and what you're looking to govern..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border:     `1px solid ${errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400">
                    Something went wrong. Email us directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-red-300 hover:text-red-200">{CONTACT_EMAIL}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ background: status === 'submitting' ? 'rgba(99,102,241,0.5)' : '#4f46e5' }}
                >
                  {status === 'submitting' ? 'Sending…' : <><Send size={13} /> Send Message</>}
                </button>

                <p className="text-xs text-gray-700 text-center">
                  Or email directly:{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-500 hover:text-indigo-400 transition-colors">{CONTACT_EMAIL}</a>
                </p>
              </form>
            )}
          </div>

          {/* Right side — waitlist CTA */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Early Access</p>
              <h3 className="text-white font-bold text-lg mb-2">Join the waitlist</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Expected access Q3 2026. Design partners receive early access credentials,
                direct founder support, and a co-development seat on the roadmap.
              </p>
              <button onClick={onJoin}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors text-sm">
                Join the Waitlist <ArrowRight size={14} />
              </button>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">Investors</p>
              <h3 className="text-white font-bold text-base mb-2">Request the investor brief</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Full technical architecture, market analysis, financial model, and risk matrix.
                Gated — contact us to request access.
              </p>
              <a href="/investors.html"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-medium transition-all text-sm">
                Request Investor Brief
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
