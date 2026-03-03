import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  AlertTriangle,
  CheckCircle,
  Upload,
  Link as LinkIcon,
  MessageSquare,
  Phone,
  Mic,
  Camera,
  Mail,
  ChevronDown,
  Eye,
  EyeOff,
  Heart,
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
  AlertOctagon,
  Trash2,
  Download,
  History,
  ExternalLink,
  ChevronRight,
  PhoneCall,
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

// --- URL ANALYSIS ENGINE ---

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.click', '.buzz', '.tk', '.ml', '.ga', '.cf', '.gq',
  '.wang', '.club', '.work', '.date', '.loan', '.racing', '.win', '.bid',
  '.stream', '.download', '.accountant', '.science', '.party', '.cricket',
  '.faith', '.review', '.zip', '.mov',
];

const BRAND_TYPOSQUATS = [
  { brand: 'amazon', real: /^(www\.)?amazon\./i, fake: /amaz[0o]n|amzon|amazn|amaazon/i },
  { brand: 'paypal', real: /^(www\.)?paypal\./i, fake: /paypa[l1i]|paypai|payypal/i },
  { brand: 'google', real: /^(www\.|accounts\.)?google\./i, fake: /g[0o]{2}gle|googl[e3]|gogle|goolge/i },
  { brand: 'apple', real: /^(www\.)?apple\./i, fake: /app[l1]e|appie|aple|applle/i },
  { brand: 'microsoft', real: /^(www\.)?microsoft\./i, fake: /micr[0o]soft|microsft|mircosoft/i },
  { brand: 'netflix', real: /^(www\.)?netflix\./i, fake: /netf[l1]ix|netflx|netfiix/i },
  { brand: 'chase', real: /^(www\.)?chase\./i, fake: /ch[a@]se-|chas[e3]-/i },
  { brand: 'wellsfargo', real: /^(www\.)?wellsfargo\./i, fake: /wells?farg[0o]|we11sfargo/i },
  { brand: 'bankofamerica', real: /^(www\.)?bankofamerica\./i, fake: /bankofameric[a@]|b[0o]famerica/i },
];

const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'rb.gy', 'cutt.ly',
  'is.gd', 'ow.ly', 'buff.ly', 'short.io', 'rebrand.ly',
];

function analyzeUrl(url) {
  const matches = [];
  let totalWeight = 0;

  let parsed;
  try {
    parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch {
    matches.push({ code: 'malformed_url', label: 'Malformed URL', weight: 20, matched: url.slice(0, 60) });
    return { matches, totalWeight: 20 };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();

  // IP-based URL
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    matches.push({ code: 'ip_url', label: 'IP-Based URL (no domain name)', weight: 30, matched: hostname });
    totalWeight += 30;
  }

  // Suspicious TLD
  const tld = '.' + hostname.split('.').pop();
  if (SUSPICIOUS_TLDS.includes(tld)) {
    matches.push({ code: 'suspicious_tld', label: `Suspicious TLD (${tld})`, weight: 20, matched: tld });
    totalWeight += 20;
  }

  // Typosquatting / brand impersonation
  for (const { brand, real, fake } of BRAND_TYPOSQUATS) {
    if (fake.test(hostname) && !real.test(hostname)) {
      matches.push({ code: 'typosquat', label: `Possible ${brand} Impersonation`, weight: 35, matched: hostname });
      totalWeight += 35;
      break;
    }
  }

  // Excessive subdomains (e.g., secure.login.bank.verify.example.com)
  const parts = hostname.split('.');
  if (parts.length > 3) {
    matches.push({ code: 'excessive_subdomains', label: 'Excessive Subdomains', weight: 15, matched: hostname });
    totalWeight += 15;
  }

  // Suspicious path keywords
  if (/\/(login|signin|verify|confirm|account|password|secure|update|billing|payment|bank|wallet)/i.test(pathname)) {
    const pathMatch = pathname.match(/(login|signin|verify|confirm|account|password|secure|update|billing|payment|bank|wallet)/i);
    matches.push({ code: 'suspicious_path', label: 'Suspicious Path Keywords', weight: 15, matched: `/${pathMatch[0]}` });
    totalWeight += 15;
  }

  // No HTTPS
  if (parsed.protocol === 'http:') {
    matches.push({ code: 'no_https', label: 'No HTTPS Encryption', weight: 10, matched: 'http://' });
    totalWeight += 10;
  }

  // URL shortener
  if (URL_SHORTENERS.some(s => hostname === s || hostname.endsWith('.' + s))) {
    matches.push({ code: 'url_shortener', label: 'URL Shortener (hides real destination)', weight: 20, matched: hostname });
    totalWeight += 20;
  }

  // @ symbol in URL (credential phishing trick)
  if (url.includes('@')) {
    matches.push({ code: 'at_in_url', label: 'Deceptive @ Symbol in URL', weight: 25, matched: '@' });
    totalWeight += 25;
  }

  // Very long URL (often used to hide real domain)
  if (url.length > 150) {
    matches.push({ code: 'long_url', label: 'Unusually Long URL', weight: 10, matched: `${url.length} characters` });
    totalWeight += 10;
  }

  return { matches, totalWeight };
}

// --- SCAM PLAYBOOKS (with step-by-step guidance) ---

const SCAM_PLAYBOOKS = {
  impersonation: {
    name: 'Government/Authority Scam',
    guide: 'No government agency will call demanding immediate payment. Hang up. Call the agency directly using the number on their official website.',
    steps: [
      'Hang up or stop responding immediately',
      'Do NOT provide any personal information (SSN, bank details, etc.)',
      'Look up the real agency phone number from their .gov website',
      'Call the agency directly and ask if they contacted you',
      'Report the attempt to the FTC',
    ],
    contacts: ['FTC: ReportFraud.ftc.gov', 'SSA OIG: 1-800-269-0271', 'IRS: 1-800-366-4484'],
  },
  family_emergency: {
    name: 'Family Emergency Scam',
    guide: 'Hang up immediately. Call the family member directly on their known number. Use your family safe word if you have one.',
    steps: [
      'Stay calm — scammers weaponize panic',
      'Hang up without giving any information',
      'Call the family member directly on their real number',
      'Ask your family safe word if you have one',
      'Alert other family members about the attempt',
    ],
    contacts: ['FBI IC3: ic3.gov', 'FTC: 1-877-382-4357', 'Local police non-emergency line'],
  },
  delivery: {
    name: 'Parcel/Delivery Scam',
    guide: 'Do not click links in delivery messages. Go directly to the carrier website and enter your tracking number manually.',
    steps: [
      'Do NOT click any link in the message',
      'Go to the carrier website directly (usps.com, ups.com, fedex.com)',
      'Enter your tracking number manually',
      'If you didn\'t order anything, it\'s almost certainly a scam',
      'Forward suspicious texts to 7726 (SPAM)',
    ],
    contacts: ['USPS: 1-800-275-8777', 'UPS: 1-800-742-5877', 'FedEx: 1-800-463-3339'],
  },
  romance: {
    name: 'Romance Scam',
    guide: 'Never send money to someone you haven\'t met in person. Do a reverse image search on their photos. Talk to a trusted friend.',
    steps: [
      'Stop all money transfers immediately',
      'Do a reverse image search on their profile photos',
      'Never send money, gift cards, or crypto to someone you haven\'t met',
      'Talk to a trusted friend or family member about the relationship',
      'Report the profile to the platform and to the FTC',
    ],
    contacts: ['FTC: ReportFraud.ftc.gov', 'FBI IC3: ic3.gov', 'AARP Fraud Helpline: 1-877-908-3360'],
  },
  investment: {
    name: 'Investment/Crypto Scam',
    guide: 'If returns sound too good to be true, they are. Verify with your country\'s financial regulator. Never invest under time pressure.',
    steps: [
      'Stop sending money immediately',
      'Verify the company with SEC (sec.gov) or FCA (fca.org.uk)',
      'Be suspicious of "guaranteed" returns or time pressure',
      'Never give remote access to your devices',
      'Document everything for your report',
    ],
    contacts: ['SEC: sec.gov/tcr', 'CFTC: cftc.gov/complaint', 'FCA (UK): 0800 111 6768'],
  },
  phishing: {
    name: 'Phishing Attack',
    guide: 'Do not enter credentials via any link in a message. Go directly to the website by typing the URL yourself. Enable 2FA on all accounts.',
    steps: [
      'Do NOT click links or download attachments',
      'Go to the website directly by typing the URL yourself',
      'Change your password if you already clicked',
      'Enable two-factor authentication (2FA) on all accounts',
      'Run a malware scan if you downloaded anything',
    ],
    contacts: ['Anti-Phishing Working Group: reportphishing@apwg.org', 'FTC: ReportFraud.ftc.gov', 'Google: safebrowsing.google.com/safebrowsing/report_phish/'],
  },
  payment: {
    name: 'Payment Fraud',
    guide: 'Legitimate organizations never demand gift cards, crypto, or wire transfers. This is the #1 sign of a scam. Stop all payment immediately.',
    steps: [
      'STOP all payments immediately',
      'Contact your bank or card issuer right away',
      'If you sent gift cards, contact the gift card company with the receipt',
      'File a report with the FTC and local police',
      'Monitor your accounts for unauthorized transactions',
    ],
    contacts: ['FTC: ReportFraud.ftc.gov', 'FBI IC3: ic3.gov', 'Your bank\'s fraud department'],
  },
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
  // URL analysis codes
  malformed_url: <AlertOctagon className="w-4 h-4" />,
  ip_url: <Globe className="w-4 h-4" />,
  suspicious_tld: <AlertTriangle className="w-4 h-4" />,
  typosquat: <Fingerprint className="w-4 h-4" />,
  excessive_subdomains: <LinkIcon className="w-4 h-4" />,
  suspicious_path: <Lock className="w-4 h-4" />,
  no_https: <EyeOff className="w-4 h-4" />,
  url_shortener: <LinkIcon className="w-4 h-4" />,
  at_in_url: <AlertOctagon className="w-4 h-4" />,
  long_url: <FileText className="w-4 h-4" />,
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

function analyzeUrlContent(url) {
  // Run URL-specific analysis
  const urlResult = analyzeUrl(url);
  // Also run text patterns on the URL string
  const textResult = analyzeContent(url);

  // Merge matches (URL results first, then text results that don't duplicate)
  const allMatches = [...urlResult.matches];
  if (textResult) {
    for (const m of textResult.matches) {
      if (!allMatches.some(existing => existing.code === m.code)) {
        allMatches.push(m);
      }
    }
  }

  const totalWeight = Math.min(urlResult.totalWeight + (textResult?.rawScore || 0), 100);
  const confidence = allMatches.length >= 3 ? 'high' : allMatches.length >= 2 ? 'medium' : 'low';

  let level, color, bgColor, borderColor, icon;
  if (totalWeight >= 60) {
    level = 'Likely Scam';
    color = 'text-red-500'; bgColor = 'bg-red-500'; borderColor = 'border-red-500';
    icon = <ShieldAlert className="w-8 h-8 text-red-500" />;
  } else if (totalWeight >= 30) {
    level = 'Suspicious';
    color = 'text-amber-500'; bgColor = 'bg-amber-500'; borderColor = 'border-amber-500';
    icon = <ShieldQuestion className="w-8 h-8 text-amber-500" />;
  } else if (totalWeight >= 10) {
    level = 'Unclear';
    color = 'text-blue-400'; bgColor = 'bg-blue-400'; borderColor = 'border-blue-400';
    icon = <Shield className="w-8 h-8 text-blue-400" />;
  } else {
    level = 'Likely Safe';
    color = 'text-emerald-500'; bgColor = 'bg-emerald-500'; borderColor = 'border-emerald-500';
    icon = <ShieldCheck className="w-8 h-8 text-emerald-500" />;
  }

  const playbookMatch = allMatches.find(m => SCAM_PLAYBOOKS[m.code]);
  const playbook = playbookMatch ? SCAM_PLAYBOOKS[playbookMatch.code] : null;
  const needsPaymentInterrupt = allMatches.some(m => m.code === 'payment');

  return { rawScore: totalWeight, confidence, level, color, bgColor, borderColor, icon, matches: allMatches, playbook, needsPaymentInterrupt };
}

// --- SCAN HISTORY ---

const HISTORY_KEY = 'sondersec_scan_history';

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { return []; }
}

function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

function deleteFromHistory(id) {
  const history = loadHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.filter(h => h.id !== id)));
}

function exportHistory() {
  const history = loadHistory();
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sondersec-scan-history-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- EMERGENCY CONTACTS ---

const EMERGENCY_CONTACTS = [
  { label: 'FTC Fraud Report', value: 'ReportFraud.ftc.gov', type: 'web' },
  { label: 'FBI Internet Crime (IC3)', value: 'ic3.gov', type: 'web' },
  { label: 'AARP Fraud Helpline', value: '1-877-908-3360', type: 'phone' },
  { label: 'Identity Theft (FTC)', value: 'IdentityTheft.gov', type: 'web' },
  { label: 'Spam Texts', value: 'Forward to 7726', type: 'info' },
  { label: 'Action Fraud (UK)', value: '0300 123 2040', type: 'phone' },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightText(text, matches) {
  if (!matches.length) return escapeHtml(text);

  let result = escapeHtml(text);
  for (const m of matches) {
    const escaped = escapeHtml(m.matched);
    const regex = new RegExp(`(${escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
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
  useEffect(() => { document.title = 'Scam Detector — SonderSec'; }, []);
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
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(() => loadHistory());
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
    setShowHistory(false);

    // Simulate analysis delay
    setTimeout(() => {
      const analysis = activeChannel === 'url'
        ? analyzeUrlContent(text)
        : analyzeContent(text);
      setResult(analysis);
      setAnalyzing(false);

      // Save to history (unless privacy mode)
      if (analysis && !privacyMode) {
        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          timestamp: new Date().toISOString(),
          channel: activeChannel,
          input: text.slice(0, 120) + (text.length > 120 ? '...' : ''),
          level: analysis.level,
          score: analysis.rawScore,
          matchCount: analysis.matches.length,
        };
        saveToHistory(entry);
        setHistory(loadHistory());
      }

      if (analysis?.needsPaymentInterrupt) {
        setShowInterrupt(true);
      }
    }, 1500);
  };

  const handleDeleteHistory = (id) => {
    deleteFromHistory(id);
    setHistory(loadHistory());
  };

  const handleClearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  const handleExportHistory = () => {
    exportHistory();
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
    <div className={`min-h-screen bg-slate-950 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white ${elderMode ? 'text-lg' : ''}`}>

      {/* Payment Interrupt Overlay */}
      {showInterrupt && !interruptDismissed && (
        <PaymentInterrupt onDismiss={() => { setShowInterrupt(false); setInterruptDismissed(true); }} />
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-charcoal-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
              SonderSec
            </Link>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-white text-sm">Scam Detector</span>
            </div>
          </div>

          {/* Mode Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setElderMode(!elderMode)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                elderMode ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'border-white/15 text-gray-500 hover:text-gray-300'
              }`}
              title="Elder / Accessibility Mode"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Safety Mode</span>
            </button>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                privacyMode ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'border-white/15 text-gray-500 hover:text-gray-300'
              }`}
              title="Private Scan Mode"
            >
              {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">Private</span>
            </button>
            <button
              onClick={() => setPlainLanguage(!plainLanguage)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                plainLanguage ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : 'border-white/15 text-gray-500 hover:text-gray-300'
              }`}
              title="Plain Language Mode"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Simple</span>
            </button>
            <button
              onClick={() => { setShowHistory(!showHistory); setResult(null); }}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                showHistory ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'border-white/15 text-gray-500 hover:text-gray-300'
              }`}
              title="Scan History"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
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

        {/* Scan History Panel */}
        {showHistory && !result && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className={`${headingSize} font-bold text-white flex items-center gap-2`}>
                <History className="w-6 h-6 text-indigo-400" />
                {plainLanguage ? 'Your past checks' : 'Scan History'}
              </h2>
              <div className="flex gap-2">
                {history.length > 0 && (
                  <>
                    <button onClick={handleExportHistory} className="p-2 rounded-lg border border-white/15 text-gray-400 hover:text-white transition-colors" title="Export">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={handleClearHistory} className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors" title="Clear all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {history.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl border border-white/10 p-12 text-center">
                <Shield className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">{plainLanguage ? 'No checks yet.' : 'No scans recorded yet.'}</p>
                <p className="text-slate-600 text-xs mt-1">Scans in Private mode are not saved.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-slate-900 rounded-xl border border-white/10 p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      entry.level === 'Likely Scam' ? 'bg-red-500' :
                      entry.level === 'Suspicious' ? 'bg-amber-500' :
                      entry.level === 'Unclear' ? 'bg-blue-400' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          entry.level === 'Likely Scam' ? 'bg-red-500/20 text-red-400' :
                          entry.level === 'Suspicious' ? 'bg-amber-500/20 text-amber-400' :
                          entry.level === 'Unclear' ? 'bg-blue-400/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {entry.score}% — {entry.level}
                        </span>
                        <span className="text-xs text-slate-600">{entry.matchCount} flag{entry.matchCount !== 1 ? 's' : ''}</span>
                        <span className="text-xs text-slate-700 uppercase">{entry.channel}</span>
                      </div>
                      <p className="text-sm text-slate-400 truncate">{entry.input}</p>
                      <p className="text-xs text-slate-600 mt-1">{new Date(entry.timestamp).toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleDeleteHistory(entry.id)} className="p-1.5 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0" title="Delete">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowHistory(false)}
              className="w-full py-3 bg-slate-900 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors text-sm"
            >
              {plainLanguage ? 'Back to scanner' : 'Return to Scanner'}
            </button>
          </div>
        )}

        {!result && !showHistory ? (
          <>
            {/* Hero Intro */}
            <div className="text-center py-6">
              <h2 className={`${elderMode ? 'text-4xl' : 'text-3xl md:text-4xl'} font-black text-white tracking-tight mb-3`}>
                {plainLanguage ? 'Check if something is a scam' : 'Analyze Suspicious Content'}
              </h2>
              <p className={`text-gray-400 max-w-2xl mx-auto ${textSize}`}>
                {plainLanguage
                  ? 'Paste a message, link, or email you received. We\'ll check it for scam patterns and tell you what to watch out for.'
                  : 'Submit messages, URLs, or emails for pattern-based threat analysis. All processing happens locally — nothing leaves your device.'}
              </p>
            </div>

            {/* Input Channel Selector */}
            <div>
              <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-white mb-3`}>
                {plainLanguage ? 'How did you receive it?' : 'Evidence Channel'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INPUT_CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      activeChannel === ch.id
                        ? 'bg-indigo-500/10 border-indigo-500/30 shadow-lg shadow-indigo-900/10'
                        : 'bg-slate-900 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`mb-2 ${activeChannel === ch.id ? 'text-indigo-400' : 'text-slate-500'}`}>
                      {ch.icon}
                    </div>
                    <div className={`font-semibold text-white ${elderMode ? 'text-base' : 'text-sm'}`}>{ch.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{ch.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
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
                    className={`w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none resize-none transition-colors ${elderMode ? 'text-lg h-48' : 'text-sm h-36'}`}
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
                    className={`w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none transition-colors ${elderMode ? 'text-lg' : 'text-sm'}`}
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
                    className={`w-full border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-indigo-500/50 transition-colors ${elderMode ? 'py-12' : ''}`}
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
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none resize-none h-24"
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
                      ? 'bg-indigo-500 text-slate-900 hover:bg-indigo-400 shadow-lg shadow-indigo-900/30'
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
            <div className={`bg-slate-900 rounded-2xl border ${result.borderColor}/30 p-6 md:p-8 shadow-lg`}
              style={{ boxShadow: result.rawScore >= 60 ? '0 0 40px rgba(239,68,68,0.08)' : result.rawScore >= 30 ? '0 0 40px rgba(245,158,11,0.08)' : 'none' }}
            >
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
              <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
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
            <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setShowExplain(!showExplain)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-400" />
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
              <div className={`rounded-2xl border p-6 space-y-5 ${
                result.rawScore >= 60 ? 'bg-red-950/30 border-red-500/30' : 'bg-amber-950/30 border-amber-500/30'
              }`}>
                <div>
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

                {/* Step-by-step checklist */}
                {result.playbook.steps && (
                  <div>
                    <h4 className={`font-bold text-white mb-3 flex items-center gap-2 ${elderMode ? 'text-lg' : 'text-base'}`}>
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                      {plainLanguage ? 'Do this right now:' : 'Step-by-Step Action Plan'}
                    </h4>
                    <div className="space-y-2">
                      {result.playbook.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold`}>
                            {idx + 1}
                          </span>
                          <span className={`text-slate-200 ${textSize}`}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Playbook-specific contacts */}
                {result.playbook.contacts && (
                  <div>
                    <h4 className={`font-bold text-white mb-2 flex items-center gap-2 ${elderMode ? 'text-lg' : 'text-base'}`}>
                      <PhoneCall className="w-4 h-4 text-indigo-400" />
                      {plainLanguage ? 'Who to call:' : 'Report To'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.playbook.contacts.map((contact, idx) => (
                        <span key={idx} className={`px-3 py-1.5 bg-slate-800/50 rounded-lg text-slate-300 border border-slate-700 ${elderMode ? 'text-base' : 'text-xs'}`}>
                          {contact}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Emergency Contacts (always shown for high-risk) */}
            {result.rawScore >= 30 && (
              <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
                <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${elderMode ? 'text-xl' : 'text-lg'}`}>
                  <PhoneCall className="w-5 h-5 text-indigo-400" />
                  {plainLanguage ? 'Important numbers & websites' : 'Emergency Resources'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EMERGENCY_CONTACTS.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      {c.type === 'phone' ? <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" /> :
                       c.type === 'web' ? <ExternalLink className="w-4 h-4 text-indigo-400 flex-shrink-0" /> :
                       <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                      <div>
                        <div className={`font-semibold text-white ${elderMode ? 'text-base' : 'text-sm'}`}>{c.label}</div>
                        <div className={`text-slate-400 ${elderMode ? 'text-base' : 'text-xs'}`}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
              <h3 className={`font-bold text-white mb-4 ${elderMode ? 'text-xl' : 'text-lg'}`}>
                {plainLanguage ? 'What to do next' : 'Actions'}
              </h3>
              {/* Primary actions */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/25 transition-colors ${elderMode ? 'py-4 text-base' : 'text-sm'}`}>
                  <Ban className="w-4 h-4" /> Block Sender
                </button>
                <button className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/25 transition-colors ${elderMode ? 'py-4 text-base' : 'text-sm'}`}>
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
              {/* Secondary actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Copy className="w-4 h-4" />, label: copied ? 'Copied!' : 'Copy Report', action: copyReport },
                  { icon: <Save className="w-4 h-4" />, label: 'Save Evidence' },
                  { icon: <Share2 className="w-4 h-4" />, label: elderMode ? 'SHARE' : 'Share' },
                  { icon: <HelpCircle className="w-4 h-4" />, label: plainLanguage ? 'Help' : 'Recovery' },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.action}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors ${elderMode ? 'p-4' : ''}`}
                  >
                    {btn.icon}
                    <span className={`font-medium ${elderMode ? 'text-sm' : 'text-xs'}`}>{btn.label}</span>
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
              <div className="bg-slate-900 rounded-2xl border border-white/10 p-6 text-center">
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
        {!result && !showHistory && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: <Brain className="w-6 h-6 text-indigo-400" />, title: 'Multi-Signal Analysis', desc: 'Checks urgency, impersonation, payment cues, link reputation, and emotional manipulation patterns.' },
              { icon: <Shield className="w-6 h-6 text-emerald-400" />, title: 'Scam Playbooks', desc: 'Auto-matches to known scam types and provides tailored defense guides for each threat.' },
              { icon: <Heart className="w-6 h-6 text-amber-400" />, title: 'Built for Everyone', desc: 'Safety mode for elders, plain language, privacy-first, and multilingual support.' },
            ].map((feat, idx) => (
              <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                <div className="mb-3">{feat.icon}</div>
                <h4 className="font-bold text-white text-sm mb-1">{feat.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-charcoal-950 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SonderSec. Pattern-based analysis for educational purposes.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/safe-curriculum" className="hover:text-gray-300 transition-colors">S.A.F.E.</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
