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

export default function TermsOfService() {
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
        <span className="text-gray-400 text-sm">Terms of Service</span>
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
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <P>
            By accessing or using the BridgetOS website (<span className="text-gray-300">bridgetos.com</span>) or
            any associated services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree,
            please do not use the site or services.
          </P>
          <P>
            These Terms apply to all visitors, waitlist registrants, design partners, and anyone who accesses
            any part of the BridgetOS platform. BridgetOS is operated by Holborn Rowe LLC.
          </P>
        </Section>

        <Section title="2. Description of Service">
          <P>
            BridgetOS is an AI governance platform that monitors behavioral drift in autonomous AI agents,
            enforces governance policies, and maintains verifiable agent identity. The platform is currently
            in pre-launch. Access is limited to waitlist registrants and approved design partners.
          </P>
          <P>
            We reserve the right to modify, suspend, or discontinue any part of the service at any time
            without notice.
          </P>
        </Section>

        <Section title="3. Waitlist & Early Access">
          <P>
            Joining the waitlist does not guarantee access to the platform. We will contact waitlist
            registrants when early access is available, subject to capacity and eligibility. We reserve
            the right to prioritise or restrict access at our discretion.
          </P>
          <P>
            By submitting your details to the waitlist, you consent to receive product updates and
            early access communications from BridgetOS. You may unsubscribe at any time by contacting
            us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{CONTACT_EMAIL}</a>.
          </P>
        </Section>

        <Section title="4. Acceptable Use">
          <P>You agree not to:</P>
          <Ul items={[
            'Use the platform for any unlawful purpose or in violation of any applicable laws or regulations',
            'Attempt to gain unauthorised access to any part of the platform or its underlying infrastructure',
            'Reverse engineer, decompile, or disassemble any part of the platform',
            'Use the platform to process data in violation of any third-party rights',
            'Interfere with or disrupt the integrity or performance of the service',
            'Use automated tools to scrape, crawl, or extract data from the platform without permission',
            'Resell, sublicense, or commercially exploit access to the platform without a written agreement',
          ]} />
        </Section>

        <Section title="5. Intellectual Property">
          <P>
            All content, software, algorithms, data structures, and materials on the BridgetOS platform —
            including the drift scoring architecture, HDIT vector framework, governance state machine,
            and Identity Vector methodology — are the intellectual property of BridgetOS and its operator.
            All rights reserved.
          </P>
          <P>
            Nothing in these Terms grants you any licence or right to use any BridgetOS intellectual property
            except as expressly permitted in a separate written agreement.
          </P>
        </Section>

        <Section title="6. Confidentiality (Design Partners)">
          <P>
            Design partners and pilot users may receive access to non-public features, architecture
            documentation, and performance data. Such information is confidential and must not be
            disclosed to third parties without prior written consent from BridgetOS. This obligation
            survives termination of access.
          </P>
        </Section>

        <Section title="7. Data & Privacy">
          <P>
            Your use of BridgetOS is subject to our{' '}
            <a href="/privacy.html" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>,
            which is incorporated into these Terms by reference. By using the service, you consent to the
            data practices described therein.
          </P>
        </Section>

        <Section title="8. Disclaimers">
          <P>
            The BridgetOS platform is provided "as is" and "as available" without warranties of any kind,
            express or implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </P>
          <P>
            BridgetOS does not warrant that the service will be uninterrupted, error-free, or free of
            harmful components. You use the service at your own risk.
          </P>
          <P>
            BridgetOS is an AI governance tool — it is designed to assist human oversight of AI agents,
            not to replace it. We make no guarantee that the platform will detect all instances of agent
            drift or prevent all governance failures.
          </P>
        </Section>

        <Section title="9. Limitation of Liability">
          <P>
            To the fullest extent permitted by applicable law, BridgetOS and its operator shall not be
            liable for any indirect, incidental, special, consequential, or punitive damages arising
            from your use of or inability to use the service, even if advised of the possibility of such damages.
          </P>
          <P>
            In no event shall our total liability to you exceed the greater of (a) the amount you have
            paid to BridgetOS in the 12 months preceding the claim, or (b) £100 / $100.
          </P>
        </Section>

        <Section title="10. Indemnification">
          <P>
            You agree to indemnify and hold harmless BridgetOS and its operator from any claims, damages,
            losses, or expenses (including reasonable legal fees) arising from your use of the service,
            your violation of these Terms, or your violation of any third-party rights.
          </P>
        </Section>

        <Section title="11. Governing Law & Jurisdiction">
          <P>
            These Terms are governed by the laws of England and Wales. Any disputes arising under these
            Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </P>
          <P>
            For users based in the United States, to the extent permitted by law, disputes may also be
            resolved under the laws of the state of Delaware.
          </P>
        </Section>

        <Section title="12. Changes to These Terms">
          <P>
            We may update these Terms from time to time. Material changes will be communicated to
            registered users by email. Continued use of the service after changes take effect constitutes
            acceptance of the revised Terms.
          </P>
        </Section>

        <Section title="13. Contact">
          <P>
            For questions about these Terms, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">{CONTACT_EMAIL}</a>.
          </P>
        </Section>

        {/* Footer */}
        <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs text-gray-600">© {new Date().getFullYear()} BridgetOS / Holborn Rowe LLC. All rights reserved.</span>
          <a href="/" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <ArrowLeft size={11} /> Back to bridgetos.com
          </a>
        </div>

      </div>
    </div>
  );
}
