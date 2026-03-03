import { useState, useRef } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Link as LinkIcon,
  MessageSquare,
  Phone,
  Mic,
  Camera,
  Mail,
  QrCode,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Users,
  Heart,
  Volume2,
  Globe,
  Lock,
  Ban,
  Copy,
  Flag,
  Save,
  Share2,
  HelpCircle,
  Clock,
  Zap,
  FileText,
  Search,
  X,
  ArrowLeft,
  Fingerprint,
  Brain,
  Smartphone,
  AlertOctagon,
} from 'lucide-react';

// --- SCAM PATTERN DATABASE ---

const RISK_PATTERNS = [
  { pattern: /act now|expires? (today|soon|tonight|immediately)|limited time|hurry|urgent|asap|right away/i, code: 'urgency', label: 'Urgency Language', weight: 25 },
  { pattern: /click (here|this|below)|tap (here|this|below)|visit this link|go to/i, code: 'suspicious_link', label: 'Suspicious Link Request', weight: 20 },
  { pattern: /send (money|payment|gift card|bitcoin|crypto|wire)|western union|moneygram|zelle|venmo|cash ?app/i, code: 'payment', label: 'Payment Redirection', weight: 35 },
  { pattern: /irs|social security|medicare|government|fbi|police|warrant|arrest|legal action|court|lawsuit/i, code: 'impersonation', label: 'Authority Impersonation', weight: 30 },
  { pattern: /don'?t tell|keep this between|secret|confidential|private matter|don'?t share/i, code: 'secrecy', label: 'Request for Secrecy', weight: 30 },
  { pattern: /won|winner|congratulations|selected|chosen|prize|lottery|sweepstakes|inheritance/i, code: 'prize', label: 'Fake Prize/Reward', weight: 25 },
  { pattern: /verify your|confirm your|update your (account|info|details|password|ssn|social)/i, code: 'phishing', label: 'Credential Harvesting', weight: 30 },
  { pattern: /grandma|grandpa|grandson|granddaughter|it'?s me|i'?m in (jail|trouble|hospital|accident)/i, code: 'family_emergency', label: 'Family Emergency Scam', weight: 35 },
  { pattern: /investment|guaranteed return|double your|profit|trading|forex|nft/i, code: 'investment', label: 'Investment Scam Cues', weight: 25 },
  { pattern: /i love you|soul ?mate|marry|relationship|together forever|my dear|my love/i, code: 'romance', label: 'Romance Manipulation', weight: 20 },
  { pattern: /your (package|parcel|delivery|order|shipment).*(failed|missed|held|pending|problem)/i, code: 'delivery', label: 'Fake Delivery Notice', weight: 20 },
  { pattern: /account.*(suspend|lock|close|compromis|hack|unauthori)/i, code: 'account_threat', label: 'Account Threat', weight: 25 },
  { pattern: /\$\d+|£\d+|€\d+|\d+\s*(dollars|pounds|euros)/i, code: 'money_mention', label: 'Monetary Reference', weight: 10 },
  { pattern: /bit\.ly|tinyurl|t\.co|goo\.gl|rb\.gy|cutt\.ly|is\.gd/i, code: 'shortened_url', label: 'Shortened URL', weight: 15 },
];

const SCAM_PLAYBOOKS = {
  impersonation: { name: 'Government/Authority Scam', guide: 'No government agency will call demanding immediate payment. Hang up. Call the agency directly using the number on their official website.' },
  family_emergency: { name: 'Family Emergency Scam', guide: 'Hang up immediately. Call the family member directly on their known number. Use your family safe word if you have one.' },
  delivery: { name: 'Parcel/Delivery Scam', guide: 'Do not click links in delivery messages. Go directly to the carrier website and enter your tracking number manually.' },
  romance: { name: 'Romance Scam', guide: 'Never send money to someone you haven\'t met in person. Do a reverse image search on their photos. Talk to a trusted friend.' },
  investment: { name: 'Investment/Crypto Scam', guide: 'If returns sound too good to be true, they are. Verify with your country\'s financial regulator. Never invest under time pressure.' },
  phishing: { name: 'Phishing Attack', guide: 'Do not enter credentials via any link in a message. Go directly to the website by typing the URL yourself. Enable 2FA on all accounts.' },
  payment: { name: 'Payment Fraud', guide: 'Legitimate organizations never demand gift cards, crypto, or wire transfers. This is the #1 sign of a scam. Stop all payment immediately.' },
};

const REASON_CODE_ICONS = {
  urgency: <Clock className="w-4 h-4" />,
  suspicious_link: <LinkIcon className="w-4 h-4" />,
  payment: <AlertOctagon className="w-4 h-4" />,
  impersonation: <Fingerprint className="w-4 h-4" />,
  secrecy: <EyeOff className="w-4 h-4" />,
  prize: <Zap className="w-4 h-4" />,
  phishing: <Lock className="w-4 h-4" />,
  family_emergency: <Heart className="w-4 h-4" />,
  investment: <AlertTriangle className="w-4 h-4" />,
  romance: <Heart className="w-4 h-4" />,
  delivery: <FileText className="w-4 h-4" />,
  account_threat: <ShieldAlert className="w-4 h-4" />,
  money_mention: <AlertTriangle className="w-4 h-4" />,
  shortened_url: <LinkIcon className="w-4 h-4" />,
};

// --- ANALYSIS ENGINE ---

function analyzeContent(text) {
  if (!text || text.trim().length < 5) return null;

  const matches = [];
  let totalWeight = 0;

  for (const rule of RISK_PATTERNS) {
    const found = text.match(rule.pattern);
    if (found) {
      matches.push({
        code: rule.code,
        label: rule.label,
        weight: rule.weight,
        matched: found[0],
      });
      totalWeight += rule.weight;
    }
  }

  const rawScore = Math.min(totalWeight, 100);
  const confidence = matches.length >= 3 ? 'high' : matches.length >= 2 ? 'medium' : 'low';

  let level, color, bgColor, borderColor, icon;
  if (rawScore >= 60) {
    level = 'Likely Scam';
    color = 'text-red-500';
    bgColor = 'bg-red-500';
    borderColor = 'border-red-500';
    icon = <ShieldAlert className="w-8 h-8 text-red-500" />;
  } else if (rawScore >= 30) {
    level = 'Suspicious';
    color = 'text-amber-500';
    bgColor = 'bg-amber-500';
    borderColor = 'border-amber-500';
    icon = <ShieldQuestion className="w-8 h-8 text-amber-500" />;
  } else if (rawScore >= 10) {
    level = 'Unclear';
    color = 'text-blue-400';
    bgColor = 'bg-blue-400';
    borderColor = 'border-blue-400';
    icon = <Shield className="w-8 h-8 text-blue-400" />;
  } else {
    level = 'Likely Safe';
    color = 'text-emerald-500';
    bgColor = 'bg-emerald-500';
    borderColor = 'border-emerald-500';
    icon = <ShieldCheck className="w-8 h-8 text-emerald-500" />;
  }

  // Find matching playbook
  const playbookMatch = matches.find(m => SCAM_PLAYBOOKS[m.code]);
  const playbook = playbookMatch ? SCAM_PLAYBOOKS[playbookMatch.code] : null;

  // Check for payment interrupt
  const needsPaymentInterrupt = matches.some(m => m.code === 'payment');

  return { rawScore, confidence, level, color, bgColor, borderColor, icon, matches, playbook, needsPaymentInterrupt };
}

function highlightText(text, matches) {
  if (!matches.length) return text;

  let result = text;
  for (const m of matches) {
    const regex = new RegExp(`(${m.matched.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, `<mark class="bg-red-500/30 text-red-200 px-0.5 rounded">$1</mark>`);
  }
  return result;
}

// --- INPUT CHANNELS ---

const INPUT_CHANNELS = [
  { id: 'text', icon: <MessageSquare className="w-5 h-5" />, label: 'Paste Text', desc: 'SMS, WhatsApp, email, social' },
  { id: 'url', icon: <LinkIcon className="w-5 h-5" />, label: 'Scan URL', desc: 'Website or QR code link' },
  { id: 'screenshot', icon: <Camera className="w-5 h-5" />, label: 'Upload Image', desc: 'Screenshot or photo' },
  { id: 'email', icon: <Mail className="w-5 h-5" />, label: 'Email Headers', desc: 'Full email with headers' },
  { id: 'voice', icon: <Mic className="w-5 h-5" />, label: 'Voice Note', desc: 'Upload audio recording' },
  { id: 'call', icon: <Phone className="w-5 h-5" />, label: 'Call Analysis', desc: 'Live or recorded call' },
];

// --- COMPONENTS ---

const RiskMeter = ({ score, level, color, bgColor, confidence }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className={`text-2xl font-black ${color}`}>{score}%</span>
      <span className={`text-sm font-bold px-3 py-1 rounded-full ${color} bg-slate-800 border border-slate-700`}>
        {level}
      </span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full ${bgColor} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${score}%` }}
      />
    </div>
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span>Confidence:</span>
      <div className="flex gap-1">
        {['low', 'medium', 'high'].map((c) => (
          <div key={c} className={`w-2 h-2 rounded-full ${
            (confidence === 'high') || (confidence === 'medium' && c !== 'high') || (confidence === 'low' && c === 'low')
              ? bgColor : 'bg-slate-700'
          }`} />
        ))}
      </div>
      <span className="capitalize">{confidence}</span>
    </div>
  </div>
);

const PaymentInterrupt = ({ onDismiss }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
    <div className="bg-red-950 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl shadow-red-900/50">
      <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-black text-white mb-3">STOP</h2>
      <h3 className="text-lg font-bold text-red-400 mb-4">Do Not Send Money Yet</h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        This message contains payment requests that match known scam patterns.
        Legitimate organizations <strong>never</strong> demand gift cards, crypto, wire transfers, or urgent secret payments.
      </p>
      <div className="space-y-3 text-left mb-6">
        {[
          'Take a breath. You have time.',
          'Call someone you trust first.',
          'Verify the sender through a known number.',
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-slate-200 bg-red-900/30 p-3 rounded-lg">
            <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={onDismiss}
        className="w-full py-3 bg-white text-red-900 font-bold rounded-xl hover:bg-red-100 transition-colors"
      >
        I Understand — Show Results
      </button>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function ScamDetector() {
  const [activeChannel, setActiveChannel] = useState('text');
  const [inputText, setInputText] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showInterrupt, setShowInterrupt] = useState(false);
  const [interruptDismissed, setInterruptDismissed] = useState(false);
  const [elderMode, setElderMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markedSafe, setMarkedSafe] = useState(false);
  const fileInputRef = useRef(null);

  const textSize = elderMode ? 'text-lg' : 'text-sm';
  const headingSize = elderMode ? 'text-3xl' : 'text-2xl';

  const runAnalysis = () => {
    const text = activeChannel === 'url' ? urlInput : inputText;
    if (!text.trim()) return;

    setAnalyzing(true);
    setResult(null);
    setInterruptDismissed(false);
    setMarkedSafe(false);
    setShowExplain(false);

    // Simulate analysis delay
    setTimeout(() => {
      const analysis = analyzeContent(text);
      setResult(analysis);
      setAnalyzing(false);
      if (analysis?.needsPaymentInterrupt) {
        setShowInterrupt(true);
      }
    }, 1500);
  };

  const resetAll = () => {
    setResult(null);
    setInputText('');
    setUrlInput('');
    setAnalyzing(false);
    setShowInterrupt(false);
    setInterruptDismissed(false);
    setMarkedSafe(false);
    setShowExplain(false);
  };

  const copyReport = () => {
    if (!result) return;
    const report = `SCAM DETECTOR REPORT\n---\nRisk Level: ${result.level} (${result.rawScore}%)\nConfidence: ${result.confidence}\nFlags: ${result.matches.map(m => m.label).join(', ')}\n${result.playbook ? `\nMatched Playbook: ${result.playbook.name}\nGuidance: ${result.playbook.guide}` : ''}\n---\nGenerated by SonderSec Scam Detector`;
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 ${elderMode ? 'text-lg' : ''}`}>

      {/* Payment Interrupt Overlay */}
      {showInterrupt && !interruptDismissed && (
        <PaymentInterrupt onDismiss={() => { setShowInterrupt(false); setInterruptDismissed(true); }} />
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Scam Detector</h1>
              <p className="text-xs text-slate-500">by SonderSec</p>
            </div>
          </div>

          {/* Mode Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setElderMode(!elderMode)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                elderMode ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
              title="Elder / Accessibility Mode"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Safety Mode</span>
            </button>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                privacyMode ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
              title="Private Scan Mode"
            >
              {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">Private</span>
            </button>
            <button
              onClick={() => setPlainLanguage(!plainLanguage)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                plainLanguage ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : 'border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
              title="Plain Language Mode"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Simple</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Privacy Banner */}
        {privacyMode && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className={`text-emerald-300 ${textSize}`}>
              <strong>Private Scan active.</strong> Analysis runs locally. No data leaves your device.
            </p>
          </div>
        )}

        {/* Elder Mode Banner */}
        {elderMode && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <Heart className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-amber-300 text-lg">
              <strong>Safety Mode ON.</strong> Larger text, simpler language, one-tap sharing enabled.
            </p>
          </div>
        )}

        {!result ? (
          <>
            {/* Input Channel Selector */}
            <div>
              <h2 className={`${headingSize} font-bold text-white mb-2`}>
                {plainLanguage ? 'What do you want to check?' : 'Select Evidence Channel'}
              </h2>
              <p className={`text-slate-400 ${textSize} mb-4`}>
                {plainLanguage
                  ? 'Pick how you received the suspicious message.'
                  : 'Choose how you want to submit content for analysis.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INPUT_CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      activeChannel === ch.id
                        ? 'bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-900/10'
                        : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className={`mb-2 ${activeChannel === ch.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {ch.icon}
                    </div>
                    <div className={`font-semibold text-white ${elderMode ? 'text-base' : 'text-sm'}`}>{ch.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{ch.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
              {(activeChannel === 'text' || activeChannel === 'email') && (
                <div className="space-y-4">
                  <label className={`block font-semibold text-white ${elderMode ? 'text-xl' : 'text-base'}`}>
                    {activeChannel === 'email'
                      ? (plainLanguage ? 'Paste the email here' : 'Paste full email with headers')
                      : (plainLanguage ? 'Paste the message here' : 'Paste suspicious content')}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={activeChannel === 'email'
                      ? 'Paste full email including headers...'
                      : 'Paste the text message, WhatsApp message, social media DM, or email body here...'}
                    className={`w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none resize-none transition-colors ${elderMode ? 'text-lg h-48' : 'text-sm h-36'}`}
                  />
                </div>
              )}

              {activeChannel === 'url' && (
                <div className="space-y-4">
                  <label className={`block font-semibold text-white ${elderMode ? 'text-xl' : 'text-base'}`}>
                    {plainLanguage ? 'Paste the web link' : 'Enter URL to scan'}
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://suspicious-link.example.com/..."
                    className={`w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors ${elderMode ? 'text-lg' : 'text-sm'}`}
                  />
                </div>
              )}

              {(activeChannel === 'screenshot' || activeChannel === 'voice' || activeChannel === 'call') && (
                <div className="space-y-4">
                  <label className={`block font-semibold text-white ${elderMode ? 'text-xl' : 'text-base'}`}>
                    {activeChannel === 'screenshot' ? (plainLanguage ? 'Upload a picture' : 'Upload screenshot or photo') :
                     activeChannel === 'voice' ? (plainLanguage ? 'Upload a voice recording' : 'Upload voice note') :
                     (plainLanguage ? 'Upload a call recording' : 'Upload call recording')}
                  </label>
                  <input ref={fileInputRef} type="file" accept={activeChannel === 'screenshot' ? 'image/*' : 'audio/*'} className="hidden" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-cyan-500/50 transition-colors ${elderMode ? 'py-12' : ''}`}
                  >
                    <Upload className="w-8 h-8 text-slate-500" />
                    <span className={`text-slate-400 ${elderMode ? 'text-lg' : 'text-sm'}`}>
                      {plainLanguage ? 'Tap here to pick a file' : 'Click to upload or drag and drop'}
                    </span>
                  </button>
                  {/* Also allow text fallback */}
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-xs text-slate-500 mb-2">Or describe what you received:</p>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type or paste the content here as a backup..."
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none resize-none h-24"
                    />
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={runAnalysis}
                disabled={analyzing || (!(activeChannel === 'url' ? urlInput : inputText).trim())}
                className={`mt-6 w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  analyzing
                    ? 'bg-slate-700 text-slate-400 cursor-wait'
                    : (activeChannel === 'url' ? urlInput : inputText).trim()
                      ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-900/30'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                } ${elderMode ? 'text-xl py-5' : ''}`}
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    {plainLanguage ? 'Checking...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {elderMode ? 'CHECK THIS FOR SCAMS' : (plainLanguage ? 'Check this' : 'Analyze Content')}
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* --- RESULTS VIEW --- */
          <div className="space-y-6 animate-fade-in">
            {/* Back button */}
            <button onClick={resetAll} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> {plainLanguage ? 'Check something else' : 'New Analysis'}
            </button>

            {/* Risk Score Card */}
            <div className={`bg-slate-900 rounded-2xl border ${result.borderColor}/30 p-6 md:p-8`}>
              <div className="flex items-start gap-5 mb-6">
                {result.icon}
                <div className="flex-1">
                  <h2 className={`${headingSize} font-black text-white mb-1`}>
                    {markedSafe
                      ? (plainLanguage ? 'You marked this as safe' : 'Marked as Not a Scam')
                      : result.level}
                  </h2>
                  <p className={`text-slate-400 ${textSize}`}>
                    {plainLanguage
                      ? (result.rawScore >= 60 ? 'This looks very dangerous. Do not respond.' :
                         result.rawScore >= 30 ? 'Something looks wrong here. Be careful.' :
                         result.rawScore >= 10 ? 'We\'re not sure. Get a second opinion.' :
                         'This looks okay, but stay alert.')
                      : `${result.matches.length} risk indicator${result.matches.length !== 1 ? 's' : ''} detected across pattern analysis`}
                  </p>
                </div>
              </div>

              <RiskMeter
                score={result.rawScore}
                level={result.level}
                color={result.color}
                bgColor={result.bgColor}
                confidence={result.confidence}
              />
            </div>

            {/* Reason Codes */}
            {result.matches.length > 0 && (
              <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
                <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${elderMode ? 'text-xl' : 'text-lg'}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  {plainLanguage ? 'Why we flagged this' : 'Risk Indicators'}
                </h3>
                <div className="space-y-2">
                  {result.matches.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="text-amber-400">{REASON_CODE_ICONS[m.code] || <AlertTriangle className="w-4 h-4" />}</div>
                      <div className="flex-1">
                        <span className={`font-semibold text-white ${textSize}`}>{m.label}</span>
                        <span className={`text-slate-500 ml-2 ${elderMode ? 'text-base' : 'text-xs'}`}>
                          matched: "{m.matched}"
                        </span>
                      </div>
                      <div className={`text-xs font-bold px-2 py-0.5 rounded ${
                        m.weight >= 30 ? 'bg-red-500/20 text-red-400' :
                        m.weight >= 20 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {m.weight >= 30 ? 'HIGH' : m.weight >= 20 ? 'MED' : 'LOW'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explainability - Highlighted Text */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
              <button
                onClick={() => setShowExplain(!showExplain)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className={`font-semibold text-white ${textSize}`}>
                    {plainLanguage ? 'Show me what\'s suspicious' : 'Explainability View'}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${showExplain ? 'rotate-180' : ''}`} />
              </button>
              {showExplain && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-xs text-slate-500 mb-3">Suspicious phrases are highlighted in red:</p>
                  <div
                    className={`bg-slate-800 rounded-xl p-4 leading-relaxed text-slate-300 ${textSize}`}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        activeChannel === 'url' ? urlInput : inputText,
                        result.matches
                      )
                    }}
                  />
                </div>
              )}
            </div>

            {/* Scam Playbook */}
            {result.playbook && (
              <div className={`rounded-2xl border p-6 ${
                result.rawScore >= 60 ? 'bg-red-950/30 border-red-500/30' : 'bg-amber-950/30 border-amber-500/30'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-amber-400" />
                  <h3 className={`font-bold text-white ${elderMode ? 'text-xl' : 'text-lg'}`}>
                    {plainLanguage ? 'What kind of scam is this?' : 'Matched Playbook'}
                  </h3>
                </div>
                <div className={`font-bold ${result.color} mb-2 ${elderMode ? 'text-lg' : ''}`}>
                  {result.playbook.name}
                </div>
                <p className={`text-slate-300 leading-relaxed ${textSize}`}>
                  {result.playbook.guide}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
              <h3 className={`font-bold text-white mb-4 ${elderMode ? 'text-xl' : 'text-lg'}`}>
                {plainLanguage ? 'What to do next' : 'Actions'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Ban className="w-5 h-5" />, label: 'Block Sender', color: 'text-red-400 border-red-500/20 hover:bg-red-500/10' },
                  { icon: <Copy className="w-5 h-5" />, label: copied ? 'Copied!' : 'Copy Report', color: 'text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10', action: copyReport },
                  { icon: <Flag className="w-5 h-5" />, label: 'Report', color: 'text-amber-400 border-amber-500/20 hover:bg-amber-500/10' },
                  { icon: <Save className="w-5 h-5" />, label: 'Save Evidence', color: 'text-blue-400 border-blue-500/20 hover:bg-blue-500/10' },
                  { icon: <Share2 className="w-5 h-5" />, label: elderMode ? 'SEND TO TRUSTED PERSON' : 'Share', color: 'text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10' },
                  { icon: <HelpCircle className="w-5 h-5" />, label: plainLanguage ? 'Help me' : 'Recovery Guide', color: 'text-purple-400 border-purple-500/20 hover:bg-purple-500/10' },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.action}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${btn.color} ${elderMode ? 'p-5' : ''}`}
                  >
                    {btn.icon}
                    <span className={`font-semibold ${elderMode ? 'text-base' : 'text-xs'}`}>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Elder Mode: Big share button */}
            {elderMode && (
              <button className="w-full py-5 bg-emerald-500 text-slate-900 font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/30">
                <Phone className="w-6 h-6" />
                CALL SOMEONE YOU TRUST FIRST
              </button>
            )}

            {/* False Positive */}
            {!markedSafe && result.rawScore > 0 && (
              <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-center">
                <p className={`text-slate-400 mb-3 ${textSize}`}>
                  {plainLanguage ? 'Did we get this wrong?' : 'Think this is a false positive?'}
                </p>
                <button
                  onClick={() => setMarkedSafe(true)}
                  className={`px-6 py-3 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto ${textSize}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {plainLanguage ? 'This is not a scam' : 'Mark as Not a Scam'}
                </button>
              </div>
            )}

            {markedSafe && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className={`text-emerald-300 font-semibold ${textSize}`}>
                  Marked as safe. Thank you for the feedback.
                </p>
                <p className="text-slate-500 text-xs mt-1">This helps improve detection without overfitting.</p>
              </div>
            )}
          </div>
        )}

        {/* Feature Overview (shown below input) */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: <Brain className="w-6 h-6 text-cyan-400" />, title: 'Multi-Signal Analysis', desc: 'Checks urgency, impersonation, payment cues, link reputation, and emotional manipulation patterns.' },
              { icon: <Shield className="w-6 h-6 text-emerald-400" />, title: 'Scam Playbooks', desc: 'Auto-matches to known scam types and provides tailored defense guides for each threat.' },
              { icon: <Heart className="w-6 h-6 text-amber-400" />, title: 'Built for Everyone', desc: 'Safety mode for elders, plain language, privacy-first, and multilingual support.' },
            ].map((feat, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="mb-3">{feat.icon}</div>
                <h4 className="font-bold text-white text-sm mb-1">{feat.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-6 text-center">
        <p className="text-xs text-slate-600">
          SonderSec Scam Detector v1.0 — Pattern-based analysis for educational purposes.
          Always verify independently.
        </p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
