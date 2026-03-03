import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => { document.title = 'About Us — SonderSec'; }, []);
  return (
    <div className="min-h-screen">
      {/* Hero / Intro */}
      <section className="bg-charcoal-900 text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h1>
            <p className="text-gray-300 leading-relaxed mb-4">
              SonderSec is a nonprofit cybersecurity initiative focused on
              delivering accessible, trauma-informed digital safety education to
              the communities most targeted by online threats — including
              seniors, low-income households, immigrants, and domestic abuse
              survivors.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our training programs are culturally aware, jargon-free, and built
              on respect — not fear. We meet people where they are, with
              real-world knowledge they can use immediately.
            </p>
            <p className="text-white font-semibold text-lg mt-6">
              We don&apos;t just raise awareness. We build recognition.
            </p>
            <p className="text-gray-400 mt-3 italic">
              Because recognizing a threat — financial, emotional, or digital —
              is the first step in protecting yourself from it.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1516733968668-dbdce39c0571?auto=format&fit=crop&w=800&q=80"
              alt="Elderly woman with caregiver"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-charcoal-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">What We Cover</h2>
          <ul className="space-y-3 text-gray-300 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-sage-400 mt-1 shrink-0">&#10003;</span>
              Social Security &amp; Medicare scams
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage-400 mt-1 shrink-0">&#10003;</span>
              Fake tech support
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage-400 mt-1 shrink-0">&#10003;</span>
              Romance fraud
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage-400 mt-1 shrink-0">&#10003;</span>
              Identity theft targeting low-income populations
            </li>
          </ul>
          <p className="text-gray-400 mt-8 leading-relaxed">
            We meet people where they are — without condescension, fear tactics,
            or digital gatekeeping.
          </p>
          <div className="mt-8 border-l-4 border-sage-600 pl-6">
            <p className="text-gray-300 leading-relaxed">
              SonderSec is structured as a 501(c)(3) nonprofit and actively
              developing scalable, accessible tools for long-term community
              impact. Our training models are designed to adapt — not expire.
            </p>
          </div>
        </div>
      </section>

      {/* Our Project */}
      <section className="bg-charcoal-900 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Project</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              SonderSec is more than awareness — it&apos;s a direct response to
              the growing gap between digital threats and digital literacy.
            </p>
            <p className="text-white font-semibold mb-4">
              Our project is simple: Equip the most vulnerable with the tools to
              defend themselves online.
            </p>
            <ul className="space-y-3 text-gray-300 text-sm leading-relaxed mb-6">
              <li className="flex items-start gap-3">
                <span className="text-sage-400 mt-0.5 shrink-0">&#8226;</span>
                Scam detection and prevention for seniors and caregivers
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-400 mt-0.5 shrink-0">&#8226;</span>
                Real-world training based on active threats (not outdated advice)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-400 mt-0.5 shrink-0">&#8226;</span>
                Clear, accessible language — no jargon, no shame
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-400 mt-0.5 shrink-0">&#8226;</span>
                Trauma-aware teaching that respects lived experience
              </li>
            </ul>
            <p className="text-gray-400 leading-relaxed mb-4">
              We offer free or grant-supported cybersecurity workshops to senior
              centers, community spaces, and support networks across the U.S.
              and UK.
            </p>
            <p className="text-gray-300 italic leading-relaxed">
              This isn&apos;t a startup. This isn&apos;t an app. This is real
              education for people who&apos;ve been left out of the
              conversation.
            </p>
            <Link
              to="/what-we-teach"
              className="inline-block mt-6 px-6 py-2.5 border border-white text-white text-sm rounded hover:bg-white hover:text-charcoal-950 transition-colors"
            >
              Read More
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
              alt="Community workshop"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
