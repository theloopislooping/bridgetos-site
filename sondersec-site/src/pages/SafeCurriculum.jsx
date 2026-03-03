import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ChevronRight,
  Heart,
  Phone,
  Monitor,
  Package,
  Landmark,
  Brain,
  BookOpen,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

// --- DATA ---

const FRAMEWORK_STEPS = [
  "Introduce the scam type",
  "Simulate the threat",
  "Explain behavioral red flags",
  "Offer cognitive tools",
  "Include printable handouts",
  "Embed symbolic reinforcement",
];

const MODULES = [
  {
    icon: <Landmark className="w-10 h-10" />,
    emoji: "🏥",
    title: "MODULE 1:",
    name: "The Medicare Mirage",
    threatType: "Medical Scams",
    accentColor: "bg-red-500",
    accentBorder: "border-red-500",
    accentText: "text-red-500",
    scenario: 'Caller impersonates Medicare rep, offers "free genetic test" or "urgent card replacement."',
    tools: [
      "Audio simulation of the scam",
      "Red flag script dissection",
      'Memory aid: "Real Medicare never asks for your number out loud"',
      "Printable: 3-question self-check quiz",
    ],
    symbolic: "Authority + Health Vulnerability Exploitation",
  },
  {
    icon: <Heart className="w-10 h-10" />,
    emoji: "👶",
    title: "MODULE 2:",
    name: "The Grandchild Gambit",
    threatType: "Emergency Impersonation Scam",
    accentColor: "bg-amber-500",
    accentBorder: "border-amber-500",
    accentText: "text-amber-500",
    scenario: '"Grandma, it\'s me! I\'m in jail/hurt, I need money fast."',
    tools: [
      "Side-by-side: real vs fake urgency",
      "Roleplay script for resistance",
      "Printable: Call Verification Checklist",
      "Emotional override vs logical re-centering",
    ],
    symbolic: "Weaponized Love",
  },
  {
    icon: <Monitor className="w-10 h-10" />,
    emoji: "💻",
    title: "MODULE 3:",
    name: "Tech Support Trap",
    threatType: "Tech Support/Remote Access Scams",
    accentColor: "bg-blue-500",
    accentBorder: "border-blue-500",
    accentText: "text-blue-500",
    scenario: 'Fake pop-up or call: "Your computer has a virus."',
    tools: [
      "Video overlay of simulated screen",
      'Breakdown of "panic language"',
      "Checklist: Never download under pressure",
      "Delay-response encoding technique",
    ],
    symbolic: "Urgency-as-Truth Illusion",
  },
  {
    icon: <Package className="w-10 h-10" />,
    emoji: "📦",
    title: "MODULE 4:",
    name: "Package Phantom",
    threatType: "Delivery Scams",
    accentColor: "bg-purple-500",
    accentBorder: "border-purple-500",
    accentText: "text-purple-500",
    scenario: 'SMS or email "missed delivery" with malicious link.',
    tools: [
      "Visual examples (Amazon/UPS/USPS mockups)",
      "Spot-the-difference game: legit vs fake",
      'Golden rule: "If it asks for info, it\'s a NO"',
      "Curiosity hijack prevention",
    ],
    symbolic: "Trust in Convenience",
  },
  {
    icon: <Landmark className="w-10 h-10" />,
    emoji: "🏛️",
    title: "MODULE 5:",
    name: "The Government Ghost",
    threatType: "IRS/Social Security/Immigration Scams",
    accentColor: "bg-emerald-500",
    accentBorder: "border-emerald-500",
    accentText: "text-emerald-500",
    scenario: '"There\'s a warrant for your arrest unless you pay now."',
    tools: [
      "Audio file of real scam example",
      '"Warrant? Warning?" script contrast',
      'Affirmation card: "You cannot be arrested by phone"',
      "System fear neutralization techniques",
    ],
    symbolic: "Fear of System as Leverage",
  },
];

const EXPANSION_MODULES = [
  {
    emoji: "💕",
    title: "Crypto Romance",
    desc: "Elder-targeted dating apps and investment traps",
  },
  {
    emoji: "⛪",
    title: "The Church Check",
    desc: "Religious or charity-based manipulation tactics",
  },
  {
    emoji: "🎁",
    title: "Gift Card Ghoul",
    desc: "Fake payments and emotional blackmail schemes",
  },
];

// --- COMPONENTS ---

const ModuleCard = ({ mod, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border-t-4 ${mod.accentBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      <div className="p-7">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-4xl" role="img" aria-label={mod.name}>{mod.emoji}</span>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{mod.title}</div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{mod.name}</h3>
          </div>
        </div>

        {/* Threat badge */}
        <span className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold ${mod.accentColor} mb-4`}>
          {mod.threatType}
        </span>

        {/* Scenario */}
        <div className={`bg-slate-50 p-4 rounded-xl border-l-4 ${mod.accentBorder} mb-5`}>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scenario</div>
          <p className="text-slate-700 text-sm leading-relaxed">{mod.scenario}</p>
        </div>

        {/* Tools toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full text-left text-sm font-semibold ${mod.accentText} flex items-center gap-1 mb-3 hover:opacity-80 transition-opacity`}
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          {expanded ? 'Hide' : 'Show'} Cognitive Tools
        </button>

        {expanded && (
          <ul className="space-y-2 mb-5 animate-fade-in">
            {mod.tools.map((tool, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${mod.accentText}`} />
                {tool}
              </li>
            ))}
          </ul>
        )}

        {/* Symbolic tag */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-3 text-center text-sm font-semibold">
          Symbolic Pattern: {mod.symbolic}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function SafeCurriculum() {
  useEffect(() => { document.title = 'S.A.F.E. Curriculum — SonderSec'; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 font-sans">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <header className="bg-gradient-to-br from-slate-800 to-slate-700 text-white px-6 md:px-12 py-12 md:py-16 text-center relative overflow-hidden">
            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-12 w-2 h-2 bg-white rounded-full" />
              <div className="absolute top-20 right-24 w-3 h-3 bg-white rounded-full" />
              <div className="absolute bottom-16 left-1/3 w-2 h-2 bg-white rounded-full" />
              <div className="absolute bottom-8 right-1/4 w-2.5 h-2.5 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="w-10 h-10 text-amber-400" />
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">S.A.F.E.</h1>
              </div>
              <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
                Self Awareness for Fraud Elimination
              </p>

              {/* Framework box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Brain className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-semibold">BridgetOS Module Framework Logic</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FRAMEWORK_STEPS.map((step, idx) => (
                    <div key={idx} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left text-sm">
                      <span className="font-bold text-amber-400 mr-2">{idx + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Modules Grid */}
          <div className="px-6 md:px-12 py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {MODULES.map((mod, idx) => (
                <ModuleCard key={idx} mod={mod} index={idx} />
              ))}
            </div>
          </div>

          {/* Expansion Section */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-6 md:px-12 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Future Expansion Modules</h2>
              </div>
              <p className="text-blue-100 text-sm">Coming soon to the S.A.F.E. curriculum</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {EXPANSION_MODULES.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-blue-100 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-slate-800 text-white px-6 md:px-12 py-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold">S.A.F.E. v1.0 Curriculum &mdash; SonderSec {new Date().getFullYear()}</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mx-auto">
              Developed in parallel with PhD research as a pilot curriculum to address the most common cyber-threats faced by older adults. S.A.F.E. leverages behavioral cybersecurity, symbolic encoding, and AI simulation tools to deliver accessible and repeatable learning outcomes for vulnerable populations.
            </p>
            <Link to="/" className="inline-block text-sm text-slate-400 hover:text-white transition-colors">
              &larr; Back to SonderSec
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
}
