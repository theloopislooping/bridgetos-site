import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { CONTACT_EMAIL } from './lib/constants.js';

const LAST_UPDATED = '1 March 2026';

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-white font-bold text-lg mb-4 pb-2" style={{ borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
        {title}
      </h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

function P({ children }) {
  return <p>{children}</p>;
}

function Ul({ items }) {
  return (
    <ul className="space-y-1.5 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(99,102,241,0.7)' }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ background: '#030712', color: '#e5e7eb' }}>

      {/* Header bar */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4"
        style={{ background: 'rgba(3,7,18,0.95)', borderBottom: '1px solid rgba(99,102,241,0.15)', backdropFilter: 'blur(8px)' }}>
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <Shield size={14} className="text-white" />
        </div>
        <span className="font-bold text-white text-sm tracking-tight">BridgetOS</span>
        <span className="text-gray-600 text-sm mx-1">·</span>
        <span className="text-gray-400 text-sm">Privacy Policy</span>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          <ArrowLeft size={12} /> Back to site
        </a>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Title */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <Section title="1. Who We Are">
          <P>
            BridgetOS is an AI governance platform developed and operated by its founder. For the purposes of this
            policy, "BridgetOS", "we", "us", and "our" refer to the BridgetOS product and its operator.
          </P>
          <P>
            For data protection enquiries, contact us at: <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{CONTACT_EMAIL}</a>
          </P>
        </Section>

        <Section title="2. Data We Collect">
          <P>We collect only the data necessary to operate the waitlist and communicate with prospective users.</P>
          <P><strong className="text-white">Waitlist submissions:</strong></P>
          <Ul items={[
            'Your name (if provided)',
            'Your email address',
            'Your company name (if provided)',
            'The timestamp of your submission',
          ]} />
          <P className="mt-3"><strong className="text-white">Usage data (analytics):</strong></P>
          <P>
            We use <a href="https://plausible.io" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">Plausible Analytics</a> to
            understand site traffic. Plausible is a privacy-first analytics tool — it does not use cookies, does not
            collect personal data, and does not track users across sites. Analytics are only loaded on the production
            domain (<span className="text-gray-300">bridgetos.com</span>), never on localhost or staging environments.
          </P>
          <P><strong className="text-white">We do not collect:</strong></P>
          <Ul items={[
            'Cookies (beyond any set by the browser for session state)',
            'IP addresses stored against your identity',
            'Payment information (no billing is active at this stage)',
            'Any data from AI agents you operate — BridgetOS monitors your agents, not your personal data',
          ]} />
        </Section>

        <Section title="3. How We Use Your Data">
          <P>Waitlist data is used solely to:</P>
          <Ul items={[
            'Notify you when early access or beta access is available',
            'Send product updates you have opted into',
            'Respond to direct enquiries',
          ]} />
          <P>We do not sell, rent, or share your personal data with third parties for marketing purposes.</P>
        </Section>

        <Section title="4. Legal Basis for Processing (UK & EU GDPR)">
          <P>
            Where you are located in the United Kingdom or European Economic Area, we process your personal data
            under the following legal bases:
          </P>
          <Ul items={[
            'Legitimate interests — to operate the waitlist and communicate product updates to people who have expressed interest',
            'Consent — where you have explicitly opted in to communications',
            'Contract — where you enter into a design partner or pilot agreement with us',
          ]} />
        </Section>

        <Section title="5. Data Retention">
          <P>
            Waitlist data is retained for as long as you remain on the waitlist or until you request removal.
            If BridgetOS does not launch a product within 24 months of your submission, we will delete all
            waitlist data and notify subscribers.
          </P>
        </Section>

        <Section title="6. Your Rights">
          <P>
            Under UK GDPR, EU GDPR, and applicable US state privacy laws (including CCPA for California residents),
            you have the right to:
          </P>
          <Ul items={[
            'Access — request a copy of the personal data we hold about you',
            'Rectification — correct inaccurate data',
            'Erasure — request deletion of your data ("right to be forgotten")',
            'Restriction — ask us to limit how we use your data',
            'Portability — receive your data in a machine-readable format',
            'Object — opt out of processing based on legitimate interests',
            'Withdraw consent — at any time, where processing is consent-based',
          ]} />
          <P>
            To exercise any of these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{CONTACT_EMAIL}</a>. We
            will respond within 30 days.
          </P>
          <P>
            California residents may also submit requests under CCPA at the same address.
          </P>
        </Section>

        <Section title="7. International Data Transfers">
          <P>
            BridgetOS is hosted on Vercel infrastructure (United States). If you are based in the UK or EEA,
            your data may be transferred to and processed in the US. Vercel maintains appropriate data transfer
            safeguards. We do not transfer personal data to any other third parties outside your jurisdiction
            without appropriate protections in place.
          </P>
        </Section>

        <Section title="8. Third-Party Services">
          <P>We use the following third-party services to operate the site:</P>
          <Ul items={[
            'Vercel — hosting and deployment (United States)',
            'Plausible Analytics — privacy-first analytics, no cookies, no personal data (European Union)',
          ]} />
          <P>No advertising networks, tracking pixels, or data brokers are used.</P>
        </Section>

        <Section title="9. Security">
          <P>
            We take reasonable technical and organisational measures to protect your data, including HTTPS
            encryption in transit, access controls, and minimal data collection. As a pre-launch company, we
            are working toward SOC 2 and ISO 27001 certification (targeted Q4 2026 onwards).
          </P>
        </Section>

        <Section title="10. Changes to This Policy">
          <P>
            We may update this policy from time to time. Material changes will be communicated to waitlist
            subscribers by email. The "last updated" date at the top of this page reflects the most recent revision.
          </P>
        </Section>

        <Section title="11. Contact & Complaints">
          <P>
            For any privacy-related questions, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{CONTACT_EMAIL}</a>.
          </P>
          <P>
            If you are in the UK and are unsatisfied with our response, you have the right to lodge a complaint
            with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Information Commissioner's Office (ICO)</a>.
          </P>
          <P>
            If you are in the EU, you may contact your local supervisory authority.
          </P>
        </Section>

        {/* Footer */}
        <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs text-gray-600">© {new Date().getFullYear()} BridgetOS. All rights reserved.</span>
          <a href="/" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <ArrowLeft size={11} /> Back to bridgetos.com
          </a>
        </div>

      </div>
    </div>
  );
}
