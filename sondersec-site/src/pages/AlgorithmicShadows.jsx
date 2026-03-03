import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Users,
  Lock,
  Eye,
  Menu,
  X,
  ChevronRight,
  Mic,
  Video,
  UserX,
  MessageSquare,
  Target,
  RefreshCw,
  PauseCircle,
  CheckCircle,
  HelpCircle,
  Anchor,
  Brain,
  Globe,
  Wifi,
  Heart,
  BarChart3,
  Search,
  ShieldCheck,
  Radio,
  Smartphone,
  Ban,
  Phone,
  BookOpen,
  Fingerprint,
} from 'lucide-react';

// --- DATA & CONTENT ---

const CHAPTERS = [
  { id: 'cover', title: 'Cover: Algorithmic Shadows' },
  { id: 'ch1', title: 'Ch 1: Why AI Safety Isn\'t Equal' },
  { id: 'ch1b', title: 'Part I: The Unequal Landscape' },
  { id: 'ch2', title: 'Ch 2: How AI Deceives' },
  { id: 'ch3', title: 'Ch 3: What Makes a Group Vulnerable?' },
  { id: 'ch4', title: 'Ch 4: The Exploitation Loop' },
  { id: 'ch5', title: 'Ch 5: Digital Resilience' },
  { id: 'deep-dive', title: 'Deep Dive: The Error Gap' },
  { id: 'defense', title: 'Defense Toolkit' },
];

const DECEPTION_TOOLS = [
  {
    icon: <Mic className="w-8 h-8 text-amber-400" />,
    title: "Voice Cloning",
    desc: "AI can replicate a voice with less than a minute of audio. Used for fake emergency calls from 'family' or impersonating officials.",
    why: "We evolved to trust voices. Emotional response hits before logic."
  },
  {
    icon: <Video className="w-8 h-8 text-amber-400" />,
    title: "Deepfake Images & Videos",
    desc: "Generating content showing people doing things they never did. Fake news, endorsements, or non-consensual content.",
    why: "The brain processes images 60,000x faster than text. Seeing is believing."
  },
  {
    icon: <UserX className="w-8 h-8 text-amber-400" />,
    title: "Synthetic Identities",
    desc: "Entire fake people with photos, histories, and personalities. They build trust over weeks or months.",
    why: "Trust is built slowly. AI plays the long game automatically."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-amber-400" />,
    title: "Perfect Messages",
    desc: "Polite, grammatically perfect, dialect-matched messages. No more obvious typos.",
    why: "We were taught to distrust sloppy messages. AI sounds professional."
  },
  {
    icon: <Target className="w-8 h-8 text-amber-400" />,
    title: "Algorithmic Profiling",
    desc: "Predicting fears and desires based on massive data analysis to target you specifically.",
    why: "Personalization lowers skepticism. It feels 'meant for you'."
  }
];

const EXPLOIT_VECTORS = [
  {
    title: "Cognitive Vectors",
    icon: <Brain className="w-6 h-6 text-amber-400" />,
    points: [
      "Difficulty processing fast, complex, or abstract info",
      "Trouble recognizing contradiction/irony in AI",
      "Easily overloaded by jargon or multitasking"
    ]
  },
  {
    title: "Linguistic Vectors",
    icon: <Globe className="w-6 h-6 text-amber-400" />,
    points: [
      "Limited English proficiency",
      "Use of non-standard dialects",
      "Reliance on others to interpret tech"
    ]
  },
  {
    title: "Social Vectors",
    icon: <Users className="w-6 h-6 text-amber-400" />,
    points: [
      "High trust in authority (which can be faked)",
      "Isolation/Loneliness (susceptible to parasocial AI)",
      "Cultural norms of politeness making it hard to say 'no'"
    ]
  },
  {
    title: "Infrastructural Vectors",
    icon: <Wifi className="w-6 h-6 text-amber-400" />,
    points: [
      "Shared, outdated, or low-end devices",
      "Lack of regular broadband/data",
      "Limited access to safety tools (managers, antivirus)"
    ]
  },
  {
    title: "Psychological Vectors",
    icon: <Heart className="w-6 h-6 text-amber-400" />,
    points: [
      "Trauma histories increasing fear/urgency response",
      "Learned helplessness ('I'm not tech-savvy')",
      "Fear of losing benefits or stability"
    ]
  }
];

const LOOP_STEPS = [
  {
    step: 1,
    title: "Input Capture",
    desc: "The system gathers data (social posts, voice samples, history). It builds a profile of how to talk to you. It's silent.",
    icon: <Eye className="w-6 h-6" />
  },
  {
    step: 2,
    title: "Synthetic Mimicry",
    desc: "AI generates something familiar: a trusted voice, a relevant offer, a perfect logo. Trust starts to bypass logic.",
    icon: <RefreshCw className="w-6 h-6" />
  },
  {
    step: 3,
    title: "Trust Hijack",
    desc: "Pressure tactics applied: Urgency, Authority, Scarcity, or Flattery. 'If this were fake, it wouldn't feel this real.'",
    icon: <Lock className="w-6 h-6" />
  },
  {
    step: 4,
    title: "Behavior Extraction",
    desc: "The conversion moment. You send money, click a link, or share info. The harm becomes real.",
    icon: <Users className="w-6 h-6" />
  },
  {
    step: 5,
    title: "Silencing or Repeat",
    desc: "The attacker ghosts you, sells your data, or loops you again. The loop continues until broken.",
    icon: <AlertTriangle className="w-6 h-6" />
  }
];

const ENTRY_POINTS = [
  { group: "Seniors", entry: "Voice mimicry + urgency", break: "External verification (calling real number)" },
  { group: "Neurodivergent", entry: "Empathy mimicry + logic consistency", break: "Written confirmation request" },
  { group: "Immigrants", entry: "Legal-sounding documentation + urgency", break: "Community trusted nodes" },
  { group: "Women", entry: "Emotional bonding + identity targeting", break: "Image/video authenticity checks" },
  { group: "Students", entry: "FOMO + reward triggers", break: "Peer reality-check" },
  { group: "Rural Users", entry: "Isolation + timing-based urgency", break: "Offline verification (calling utility directly)" },
  { group: "Gig Workers", entry: "Platform language + job logic", break: "Independent employment validation" },
];

const STRATEGIES = [
  {
    title: "Pause Before Acting",
    icon: <PauseCircle className="w-6 h-6 text-emerald-400" />,
    content: "Scams depend on speed. Say 'I'll call you back' or wait 10 minutes. If it's real, it'll still be there."
  },
  {
    title: "Verify From Outside",
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    content: "Never use the link/number provided. Use a known number (back of card) or bookmark. Real orgs let you verify."
  },
  {
    title: "Safe Word",
    icon: <Anchor className="w-6 h-6 text-emerald-400" />,
    content: "Establish a phrase only family knows. If 'grandson' calls in trouble, ask for the phrase. Sounds dramatic, but works."
  },
  {
    title: "Don't Trust Polish",
    icon: <UserX className="w-6 h-6 text-emerald-400" />,
    content: "Typos are gone. Don't fall for flattery, perfect grammar, or 'official' tones. Polished language is not proof."
  },
  {
    title: "Human Anchor",
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    content: "Pick one person to double-check things with. 'If I get something weird, I'm bringing it to you.' Resilience is relational."
  },
  {
    title: "Trust Discomfort",
    icon: <HelpCircle className="w-6 h-6 text-emerald-400" />,
    content: "AI is trained to feel familiar. Your gut isn't. If it feels off, don't explain it away. Stop."
  }
];

const ERROR_GAP_DATA = [
  { demographic: "White Males", rate: 0.8, level: "LOW", color: "bg-emerald-500", barWidth: "w-[3%]" },
  { demographic: "White Females", rate: 2.5, level: "MED", color: "bg-yellow-500", barWidth: "w-[7%]" },
  { demographic: "Black Males", rate: 8.0, level: "HIGH", color: "bg-orange-500", barWidth: "w-[24%]" },
  { demographic: "Black Females", rate: 34.0, level: "CRITICAL", color: "bg-red-600", barWidth: "w-full" },
];

const DEEP_DIVE_FACTORS = [
  {
    title: "Training Data Imbalance",
    desc: "AI models are trained on datasets that over-represent lighter-skinned faces. The system literally has less practice recognizing darker skin tones.",
    icon: <BarChart3 className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Lighting & Contrast Assumptions",
    desc: "Camera sensors and image processing pipelines were historically calibrated for lighter skin. AI inherits these hardware biases as 'ground truth.'",
    icon: <Eye className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Benchmark Gaps",
    desc: "Performance testing often uses datasets that don't reflect demographic diversity. A model can pass industry benchmarks while failing real-world populations.",
    icon: <Target className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Feedback Loop Absence",
    desc: "Affected communities are rarely at the table when error reports are filed. Without feedback, the system never learns it's wrong.",
    icon: <RefreshCw className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Intersectional Compounding",
    desc: "Race + gender compound error rates. Being a Black woman isn't just 'Black' + 'woman' — the error rate multiplies at the intersection, not just adds.",
    icon: <Users className="w-6 h-6 text-amber-400" />
  },
];

const DEFENSE_STEPS = [
  {
    title: "Recognize the Pattern",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    checks: [
      "Is this message creating urgency? ('Expires today!', 'Act now!')",
      "Is it in a language I wouldn't expect from this sender?",
      "Am I being asked to click, call, or send something?",
      "Does it reference money, benefits, legal status, or account access?"
    ]
  },
  {
    title: "Do NOT Interact",
    icon: <Ban className="w-6 h-6 text-red-400" />,
    checks: [
      "Do not click any links in the message",
      "Do not call any number listed in the message",
      "Do not reply — even to say 'stop' or 'unsubscribe'",
      "Do not forward it to others without context"
    ]
  },
  {
    title: "Verify Independently",
    icon: <Phone className="w-6 h-6 text-emerald-400" />,
    checks: [
      "Look up the real organization number yourself (Google it, check a bill)",
      "Call them directly using a number you already trust",
      "Ask: 'Did you send me a message at [time]?'",
      "If they say no — you just stopped an attack"
    ]
  },
  {
    title: "Report & Protect",
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    checks: [
      "Forward phishing texts to 7726 (SPAM) on most carriers",
      "Report to FTC at ReportFraud.ftc.gov",
      "Block the sender number",
      "Tell one person you trust what happened — resilience is relational"
    ]
  }
];

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 border-l-4 border-amber-500 pl-4 py-2">
    <h2 className="text-3xl font-bold text-slate-100">{title}</h2>
    {subtitle && <p className="text-slate-400 mt-2 text-lg">{subtitle}</p>}
  </div>
);

const BlockQuote = ({ children }) => (
  <blockquote className="my-8 p-6 bg-slate-800 rounded-r-lg border-l-4 border-amber-500 italic text-xl text-slate-200 shadow-lg">
    "{children}"
  </blockquote>
);

// --- CHAPTER RENDERERS ---

const CoverView = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in px-4">
    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-900/50 mb-4">
      <Shield className="w-12 h-12 text-slate-900" />
    </div>
    <h1 className="text-4xl md:text-6xl font-black text-slate-100 tracking-tighter">
      ALGORITHMIC <br/><span className="text-amber-500">SHADOWS</span>
    </h1>
    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
      AI Safety for the Overlooked. A guide to power, trust, and harm in the age of synthetic media.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={onStart}
        className="group px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
      >
        Start Reading
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const Chapter1 = () => (
  <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
    <SectionHeader title="Why AI Safety Isn't Equal" subtitle="Systemic Context & Threat Modeling" />

    <p className="text-lg leading-relaxed text-slate-300">
      You've probably heard: <strong>"AI is coming for all of us."</strong>
    </p>
    <p className="text-lg leading-relaxed text-slate-300">
      But here's the truth: not everyone is standing on the same ground. Some people get a suspicious text and think, <em>"Let me Google this."</em> Others think, <em>"If I don't respond, will I lose my benefits? Will they deport me? Will my power get shut off?"</em>
    </p>

    <BlockQuote>
      It's about power, trust, and harm — and who's left exposed when artificial intelligence enters the room.
    </BlockQuote>

    <h3 className="text-2xl font-bold text-amber-400 mt-8">The Gap No One Talks About</h3>
    <p className="text-slate-300">
      AI doesn't affect everyone equally. It targets pressure points based on language, race, disability, and status. These aren't just "diversity categories." They are vulnerabilities where systems—and the people who abuse them—can exploit.
    </p>

    <div className="bg-slate-800 p-6 rounded-lg mt-6 border border-slate-700">
      <h4 className="text-xl font-semibold text-white mb-4">Who This Guide Is For</h4>
      <ul className="space-y-3">
        {[
          "The grandparent unsure if a call is fake",
          "The immigrant receiving official-looking texts",
          "The autistic teen bonding with a manipulative chatbot",
          "The gig worker locked out by a machine",
          "The woman targeted by non-consensual deepfakes"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-300">
            <span className="mt-1.5 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>

    <p className="text-center font-bold text-xl text-slate-200 mt-12">
      If safety isn't inclusive, it isn't safety.
    </p>
  </div>
);

const Chapter2 = () => (
  <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
    <SectionHeader title="How AI Deceives" subtitle="The New Age of Manipulation" />

    <p className="text-lg text-slate-300">
      AI doesn't usually harm people by "going rogue." It harms people by sounding reasonable, familiar, helpful, or official. It doesn't invent new lies; <strong>it perfects old ones.</strong>
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {DECEPTION_TOOLS.map((tool, idx) => (
        <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
              {tool.icon}
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{tool.title}</h3>
          </div>
          <p className="text-slate-300 mb-4 text-sm">{tool.desc}</p>
          <div className="bg-slate-900/50 p-3 rounded text-xs text-amber-200/80 border-l-2 border-amber-500">
            <strong>Why it works:</strong> {tool.why}
          </div>
        </div>
      ))}
    </div>

    <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-lg mt-8 text-center">
      <h4 className="text-amber-400 font-bold text-lg mb-2">Automation Makes Harm Scalable</h4>
      <p className="text-slate-300">
        Before AI, deception required effort. Now it requires infrastructure. One scammer can operate nonstop, targeting thousands simultaneously.
      </p>
    </div>
  </div>
);

const Chapter3 = () => (
  <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
    <SectionHeader title="What Makes a Group Vulnerable?" subtitle="Understanding Exploit Vectors" />

    <p className="text-lg text-slate-300 leading-relaxed">
      Not all harm is random. AI systems don't attack blindly — they follow patterns. And certain patterns light up more often than others.
    </p>

    <div className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-amber-500">
        <h4 className="font-bold text-xl text-white mb-2">Defining "Vulnerability"</h4>
        <p className="text-slate-300">
            Being vulnerable doesn't mean being weak. It means having <strong>exploit points</strong> — areas where a person's behavior, identity, or context makes them more susceptible to manipulation. In AI, we call these <strong>Exploit Vectors</strong>.
        </p>
    </div>

    <h3 className="text-2xl font-bold text-white mt-8 mb-4">Common Exploit Vectors</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPLOIT_VECTORS.map((vector, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 p-5 rounded-lg hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-md">
                        {vector.icon}
                    </div>
                    <h4 className="font-bold text-amber-50 text-sm">{vector.title}</h4>
                </div>
                <ul className="space-y-2">
                    {vector.points.map((point, pIdx) => (
                        <li key={pIdx} className="text-slate-400 text-xs flex items-start gap-2">
                            <span className="text-amber-500/50 mt-0.5">•</span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>

    <div className="flex flex-col md:flex-row gap-6 mt-12 bg-slate-800 p-6 rounded-xl">
        <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-4">Why This Matters</h4>
            <p className="text-slate-300 text-sm mb-4">
                AI doesn't have to target marginalized people on purpose. It just has to follow signals.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
                <li>Typing slower → <span className="text-amber-400">Flagged for simplified content</span></li>
                <li>Repeating questions → <span className="text-amber-400">Redirected to chatbot loops</span></li>
                <li>Emotional language → <span className="text-amber-400">Escalated to urgency workflows</span></li>
            </ul>
        </div>
        <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-600 pt-6 md:pt-0 md:pl-6">
            <h4 className="text-xl font-bold text-white mb-4">Reframing Safety</h4>
            <p className="text-slate-300 text-sm mb-4">
                Traditional advice assumes users have time, literacy, and safety nets. This leaves large populations unprotected.
            </p>
            <div className="bg-slate-900 p-4 rounded text-center">
                <p className="text-xs text-slate-500 line-through mb-1">"Don't click suspicious links."</p>
                <p className="font-bold text-emerald-400">"Let's build systems that recognize your learning pattern, not your vulnerability."</p>
            </div>
        </div>
    </div>
  </div>
);

const Chapter4 = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-fade-in">
      <SectionHeader title="The Exploitation Loop" subtitle="Inside the Machine" />

      {/* Interactive Loop Visualizer */}
      <div className="bg-slate-900 rounded-2xl p-4 md:p-8 border border-slate-700 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Steps Navigation */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 min-w-[150px] scrollbar-thin scrollbar-thumb-slate-700">
            {LOOP_STEPS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all whitespace-nowrap md:whitespace-normal ${
                  activeStep === idx
                    ? 'bg-amber-500 text-slate-900 font-bold shadow-lg scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <span className="text-sm font-mono opacity-60">0{s.step}</span>
                <span className="hidden md:inline">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-600 flex flex-col justify-center min-h-[300px] animate-fade-in relative">
            <div className="absolute top-4 right-4 text-slate-600">
              {LOOP_STEPS[activeStep].icon}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              <span className="text-amber-500">0{activeStep + 1}.</span> {LOOP_STEPS[activeStep].title}
            </h3>
            <p className="text-xl text-slate-300 leading-relaxed mt-4">
              {LOOP_STEPS[activeStep].desc}
            </p>

            <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
               <span className="text-sm text-slate-500 uppercase tracking-widest">Stage {activeStep + 1} of 5</span>
               {activeStep < 4 ? (
                 <button
                   onClick={() => setActiveStep(prev => prev + 1)}
                   className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                 >
                   Next Stage <ChevronRight size={16} />
                 </button>
               ) : (
                 <button
                   onClick={() => setActiveStep(0)}
                   className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                 >
                   Restart Loop <RefreshCw size={16} />
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Points Table */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Loop Entry Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENTRY_POINTS.map((item, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 p-4 rounded-lg hover:border-amber-500/30 transition-colors">
              <div className="text-amber-400 font-bold uppercase text-xs tracking-wider mb-2">{item.group}</div>
              <div className="mb-3">
                <span className="text-slate-500 text-xs uppercase">Hook:</span>
                <p className="text-slate-200 font-medium leading-tight">{item.entry}</p>
              </div>
              <div>
                <span className="text-slate-500 text-xs uppercase">Breaker:</span>
                <p className="text-emerald-400/90 text-sm leading-tight">{item.break}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-lg text-center">
        <h4 className="text-red-200 font-bold text-xl mb-4">Loop Interruption Script</h4>
        <p className="text-lg text-slate-200 italic mb-4">
          "I'm stepping out of the loop. I will not act on this immediately. I will verify it using someone or something I already trust."
        </p>
      </div>
    </div>
  );
};

const Chapter5 = () => (
  <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
    <SectionHeader title="Digital Resilience" subtitle="Shared Strategies for Survival" />

    <p className="text-lg text-slate-300 mb-6">
      These are not technical fixes. They are human techniques for surviving in a synthetic environment.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {STRATEGIES.map((strat, idx) => (
        <div key={idx} className="bg-slate-800 p-6 rounded-xl border-l-4 border-emerald-500 shadow-md hover:bg-slate-800/80 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            {strat.icon}
            <h3 className="font-bold text-lg text-white">{strat.title}</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{strat.content}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 p-8 bg-slate-100 rounded-xl text-center shadow-2xl">
      <h3 className="text-2xl font-black text-slate-900 mb-2">THE GOLDEN RULE</h3>
      <div className="h-1 w-24 bg-amber-500 mx-auto my-4"></div>
      <p className="text-3xl font-serif text-slate-800 italic">
        "Scammers rush. Real people wait."
      </p>
    </div>
  </div>
);

// --- NEW CHAPTER RENDERERS ---

const Chapter1b = ({ onNavigate }) => {
  const [scamRevealed, setScamRevealed] = useState(false);

  return (
    <div className="space-y-10 max-w-4xl mx-auto animate-fade-in">
      <SectionHeader title="The Unequal Landscape" subtitle="The Data You Need to See" />

      <p className="text-lg text-slate-300 leading-relaxed">
        We cannot talk about safety until we talk about <strong>the Gap</strong>. Below is a visualization of how AI "sees" different people — based on facial recognition error rates from NIST research.
      </p>

      {/* Data Visualization: The Error Gap */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">The Error Gap</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6">How likely is AI to misidentify you?</p>

        <div className="space-y-4">
          {ERROR_GAP_DATA.map((row, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-200 font-medium text-sm">{row.demographic}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  row.level === 'LOW' ? 'bg-emerald-500/20 text-emerald-400' :
                  row.level === 'MED' ? 'bg-yellow-500/20 text-yellow-400' :
                  row.level === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {row.rate}% — {row.level}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${row.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.max((row.rate / 34) * 100, 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-sm text-slate-200">
            <strong className="text-red-400">THE TAKEAWAY:</strong> If you are in the red zone, "standard" advice like "Just use facial ID verification" puts you at risk of being locked out of your bank account or falsely flagged by police.
          </p>
        </div>
      </div>

      {/* Live Intercept: Scam Simulation */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
          <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Live Intercept: The "Help" Scam</span>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-slate-400 text-sm">How real-world data is weaponized against people right now.</p>

          {/* Simulated phone message */}
          <div className="max-w-sm mx-auto">
            <div className="bg-slate-800 rounded-2xl border border-slate-600 overflow-hidden">
              {/* Phone header */}
              <div className="px-4 py-2 bg-slate-700 flex items-center justify-between">
                <Smartphone className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400">10:42 AM</span>
              </div>
              {/* Message */}
              <div className="p-4">
                <div className="text-xs text-slate-500 mb-2 font-mono">From: GOV-Relief-Funds</div>
                <div className="bg-slate-700 rounded-xl rounded-tl-none p-4 text-sm text-slate-200 leading-relaxed">
                  H0la! Su estado de cuenta muestra que usted califica para $500 en ayuda energ&eacute;tica. Haga clic aqu&iacute; para reclamar antes de que expire: <span className="text-blue-400 underline cursor-not-allowed">[link]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis toggle */}
          <button
            onClick={() => setScamRevealed(!scamRevealed)}
            className="w-full py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 font-semibold hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {scamRevealed ? 'Hide Analysis' : 'Reveal Why This Works'}
          </button>

          {scamRevealed && (
            <div className="space-y-3 animate-fade-in">
              {[
                { label: "Language Targeting", desc: "Targets Spanish speakers — a population often overlooked by mainstream English-first safety guides." },
                { label: "Economic Pressure", desc: "References energy assistance — targeting people worried about utility bills and basic needs." },
                { label: "Urgency", desc: "'Before it expires' — creates a fear of missing out on help you desperately need." },
                { label: "Authority Mimicry", desc: "'GOV-Relief-Funds' — the sender name mimics a government entity to bypass skepticism." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800 p-4 rounded-lg border-l-2 border-amber-500">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-amber-400 font-bold text-sm">{item.label}:</span>
                    <span className="text-slate-300 text-sm ml-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Choice Point */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl">
        <div className="text-center mb-6">
          <Fingerprint className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">Choose Your Path</h3>
          <p className="text-slate-400 mt-2">You're the reader. How do you want to proceed?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('deep-dive')}
            className="group p-6 bg-slate-800 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-all text-left hover:shadow-lg hover:shadow-amber-900/10"
          >
            <Search className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-bold text-white mb-2">Deep Dive</h4>
            <p className="text-slate-400 text-sm">Explain why the AI error rate is so high for darker skin tones.</p>
            <span className="mt-3 text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore <ChevronRight size={12} />
            </span>
          </button>

          <button
            onClick={() => onNavigate('defense')}
            className="group p-6 bg-slate-800 rounded-xl border border-slate-600 hover:border-emerald-500/50 transition-all text-left hover:shadow-lg hover:shadow-emerald-900/10"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="font-bold text-white mb-2">Defense Mode</h4>
            <p className="text-slate-400 text-sm">Show me the toolkit to stop that text scam above.</p>
            <span className="mt-3 text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Defend <ChevronRight size={12} />
            </span>
          </button>

          <button
            onClick={() => onNavigate('ch2')}
            className="group p-6 bg-slate-800 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-all text-left hover:shadow-lg hover:shadow-amber-900/10"
          >
            <Mic className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-bold text-white mb-2">Next Chapter</h4>
            <p className="text-slate-400 text-sm">Move to Voice Cloning & Audio Scams.</p>
            <span className="mt-3 text-xs text-amber-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Continue <ChevronRight size={12} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DeepDiveChapter = ({ onNavigate }) => (
  <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
    <SectionHeader title="Deep Dive: The Error Gap" subtitle="Why AI Fails Darker Skin Tones" />

    <p className="text-lg text-slate-300 leading-relaxed">
      The 34% misidentification rate for Black women isn't a bug that slipped through. It's the predictable result of how these systems were built, tested, and deployed.
    </p>

    <BlockQuote>
      The algorithm doesn't have to be racist. It just has to be trained on a racist dataset.
    </BlockQuote>

    {/* Error rate reminder */}
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-amber-400" />
        Recall: The Numbers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ERROR_GAP_DATA.map((row, idx) => (
          <div key={idx} className={`p-3 rounded-lg border text-center ${
            row.level === 'LOW' ? 'border-emerald-500/30 bg-emerald-500/5' :
            row.level === 'MED' ? 'border-yellow-500/30 bg-yellow-500/5' :
            row.level === 'HIGH' ? 'border-orange-500/30 bg-orange-500/5' :
            'border-red-500/30 bg-red-500/5'
          }`}>
            <div className="text-2xl font-black text-white">{row.rate}%</div>
            <div className="text-xs text-slate-400 mt-1">{row.demographic}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Contributing Factors */}
    <h3 className="text-2xl font-bold text-white mt-10">Five Contributing Factors</h3>
    <div className="space-y-4">
      {DEEP_DIVE_FACTORS.map((factor, idx) => (
        <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex gap-5 items-start hover:border-amber-500/30 transition-colors">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 flex-shrink-0">
            {factor.icon}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{idx + 1}. {factor.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{factor.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* So what? */}
    <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl mt-8">
      <h4 className="text-amber-400 font-bold text-lg mb-3">What This Means For You</h4>
      <ul className="space-y-2">
        {[
          "If you're in a high-error demographic, facial verification systems may lock you out of legitimate services.",
          "False positives in law enforcement databases can lead to wrongful stops, detentions, or worse.",
          "'Just verify your identity with a selfie' is not neutral advice — it's riskier for some people.",
          "Advocating for better AI means demanding diverse training data and independent audits.",
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
            <span className="mt-1.5 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Navigation choices */}
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={() => onNavigate('defense')}
        className="flex-1 py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
      >
        <ShieldCheck className="w-5 h-5" /> Defense Toolkit
      </button>
      <button
        onClick={() => onNavigate('ch2')}
        className="flex-1 py-4 px-6 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-semibold hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2"
      >
        <Mic className="w-5 h-5" /> Voice Cloning & Audio Scams
      </button>
    </div>
  </div>
);

const DefenseChapter = ({ onNavigate }) => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (idx) => {
    setCompletedSteps(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto animate-fade-in">
      <SectionHeader title="Defense Toolkit" subtitle="How to Stop the Scam You Just Saw" />

      <p className="text-lg text-slate-300 leading-relaxed">
        You saw the scam. Now here's the step-by-step playbook to neutralize it — and any message like it.
      </p>

      {/* Reminder of the scam */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex items-start gap-4">
        <Smartphone className="w-8 h-8 text-slate-500 flex-shrink-0 mt-1" />
        <div>
          <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Threat Recalled</span>
          <p className="text-slate-300 text-sm mt-1 italic">
            "H0la! Su estado de cuenta muestra que usted califica para $500 en ayuda energ&eacute;tica. Haga clic aqu&iacute; para reclamar antes de que expire: [link]"
          </p>
        </div>
      </div>

      {/* Interactive Defense Steps */}
      <div className="space-y-6">
        {DEFENSE_STEPS.map((step, idx) => (
          <div key={idx} className={`bg-slate-900 rounded-xl border transition-all ${
            completedSteps.includes(idx)
              ? 'border-emerald-500/50 shadow-lg shadow-emerald-900/10'
              : 'border-slate-700'
          }`}>
            {/* Step Header */}
            <button
              onClick={() => toggleStep(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg transition-colors ${
                  completedSteps.includes(idx) ? 'bg-emerald-500/20' : 'bg-slate-800'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Step {idx + 1}</span>
                  <h4 className="text-lg font-bold text-white">{step.title}</h4>
                </div>
              </div>
              {completedSteps.includes(idx) && (
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              )}
            </button>

            {/* Checklist */}
            <div className="px-6 pb-5">
              <ul className="space-y-2">
                {step.checks.map((check, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                      completedSteps.includes(idx) ? 'border-emerald-500 bg-emerald-500/20' : 'border-slate-600'
                    }`}>
                      {completedSteps.includes(idx) && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <span className={completedSteps.includes(idx) ? 'text-slate-400' : 'text-slate-300'}>
                      {check}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          {DEFENSE_STEPS.map((_, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${
              completedSteps.includes(idx) ? 'bg-emerald-500' : 'bg-slate-600'
            }`} />
          ))}
        </div>
        <p className="text-slate-400 text-sm">
          {completedSteps.length === DEFENSE_STEPS.length
            ? 'All steps reviewed. You now have a complete defense playbook.'
            : `${completedSteps.length} of ${DEFENSE_STEPS.length} steps reviewed. Click each step to mark it.`
          }
        </p>
      </div>

      {/* Quick Reference Card */}
      <div className="bg-slate-100 rounded-xl p-8 text-center shadow-2xl">
        <BookOpen className="w-8 h-8 text-slate-900 mx-auto mb-3" />
        <h3 className="text-xl font-black text-slate-900 mb-2">QUICK REFERENCE</h3>
        <div className="h-1 w-16 bg-amber-500 mx-auto my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
          <div className="bg-white p-3 rounded-lg border">
            <span className="text-xs font-bold text-red-600 uppercase">Never</span>
            <p className="text-sm text-slate-700 mt-1">Click links in unexpected messages</p>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <span className="text-xs font-bold text-emerald-600 uppercase">Always</span>
            <p className="text-sm text-slate-700 mt-1">Look up real numbers yourself</p>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <span className="text-xs font-bold text-red-600 uppercase">Never</span>
            <p className="text-sm text-slate-700 mt-1">Act under time pressure</p>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <span className="text-xs font-bold text-emerald-600 uppercase">Always</span>
            <p className="text-sm text-slate-700 mt-1">Tell one trusted person</p>
          </div>
        </div>
      </div>

      {/* Navigation choices */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={() => onNavigate('deep-dive')}
          className="flex-1 py-4 px-6 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 font-semibold hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" /> Deep Dive: Error Gap
        </button>
        <button
          onClick={() => onNavigate('ch2')}
          className="flex-1 py-4 px-6 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-semibold hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2"
        >
          <Mic className="w-5 h-5" /> Voice Cloning & Audio Scams
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function AlgorithmicShadows() {
  useEffect(() => { document.title = 'Algorithmic Shadows — SonderSec'; }, []);
  const [activeChapter, setActiveChapter] = useState('cover');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (id) => {
    setActiveChapter(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderChapter = () => {
    switch(activeChapter) {
      case 'cover': return <CoverView onStart={() => handleNav('ch1')} />;
      case 'ch1': return <Chapter1 />;
      case 'ch1b': return <Chapter1b onNavigate={handleNav} />;
      case 'ch2': return <Chapter2 />;
      case 'ch3': return <Chapter3 />;
      case 'ch4': return <Chapter4 />;
      case 'ch5': return <Chapter5 />;
      case 'deep-dive': return <DeepDiveChapter onNavigate={handleNav} />;
      case 'defense': return <DefenseChapter onNavigate={handleNav} />;
      default: return <CoverView onStart={() => handleNav('ch1')} />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-amber-500 selection:text-slate-900">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-amber-500 tracking-wider">ALGORITHMIC SHADOWS</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-200">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex pt-16 lg:pt-0 min-h-screen">

        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300 z-40 flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-0
        `}>
          <div className="p-6 border-b border-slate-800 hidden lg:block">
            <h1 className="font-bold text-slate-100 text-lg leading-tight">
              Algorithmic<br/>
              <span className="text-amber-500">Shadows</span>
            </h1>
            <p className="text-xs text-slate-500 mt-2">Interactive Guide v1.0</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => handleNav(chap.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-2
                  ${activeChapter === chap.id
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                `}
              >
                {activeChapter === chap.id && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                {chap.title}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-600 text-center space-y-2">
            <Link to="/" className="block hover:text-slate-300 transition-colors">&larr; Back to SonderSec</Link>
            <p>&copy; {new Date().getFullYear()} SonderSec AI Safety Guide</p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
          {renderChapter()}

          {/* Navigation Footer */}
          {activeChapter !== 'cover' && (
            <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-sm text-slate-500">
              <button
                className="hover:text-amber-500 flex items-center gap-1"
                onClick={() => {
                   const currIdx = CHAPTERS.findIndex(c => c.id === activeChapter);
                   if (currIdx > 0) handleNav(CHAPTERS[currIdx - 1].id);
                }}
              >
                <ChevronRight className="rotate-180 w-4 h-4" /> Previous
              </button>
              <button
                 className="hover:text-amber-500 flex items-center gap-1"
                 onClick={() => {
                   const currIdx = CHAPTERS.findIndex(c => c.id === activeChapter);
                   if (currIdx < CHAPTERS.length - 1) handleNav(CHAPTERS[currIdx + 1].id);
                }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

      </div>

    </div>
  );
}
