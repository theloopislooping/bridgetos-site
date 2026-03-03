import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight, Menu, X, ExternalLink } from 'lucide-react';

const NAV_GROUPS = [
  {
    group: 'Product',
    links: [
      { label: 'Problem',       href: '#problem'       },
      { label: 'How It Works',  href: '#how-it-works'  },
      { label: 'Threats',       href: '#threats'       },
      { label: 'Product',       href: '#product'       },
      { label: 'Console',       href: '#console'       },
      { label: 'Architecture',  href: '#architecture'  },
    ],
  },
  {
    group: 'Governance',
    links: [
      { label: 'Compliance',    href: '#compliance'    },
      { label: 'Comparison',    href: '#comparison'    },
      { label: 'Live Demo',     href: '#playground'    },
    ],
  },
  {
    group: 'Company',
    links: [
      { label: 'Roadmap',       href: '#roadmap'       },
      { label: 'White Paper',   href: '#whitepaper'    },
      { label: 'FAQ',           href: '#faq'           },
      { label: 'Pricing',       href: '#pricing'       },
      { label: 'Founder',       href: '#founder'       },
    ],
  },
  {
    group: 'Access',
    links: [
      { label: 'Technical Brief', href: '/technical.html',  external: true },
      { label: 'Drift Taxonomy',  href: '/taxonomy.html',   external: true },
      { label: 'Investors',       href: '/investors.html',  external: true },
    ],
  },
  {
    group: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '/privacy.html', external: true },
      { label: 'Terms of Service',  href: '/terms.html',   external: true },
    ],
  },
];

// Flat list of all anchor IDs for the IntersectionObserver
const ALL_IDS = NAV_GROUPS.flatMap(g =>
  g.links.filter(l => l.href.startsWith('#')).map(l => l.href.slice(1))
);

const SIDEBAR_W = 'w-56'; // 224px — keep in sync with md:ml-56 in App.jsx

// ── Scroll-spy hook ────────────────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState('');
  const ratios = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          ratios.current[e.target.id] = e.intersectionRatio;
        });
        // Pick section with the highest visible ratio
        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of Object.entries(ratios.current)) {
          if (ratio > bestRatio) { bestRatio = ratio; best = id; }
        }
        if (best) setActive(best);
      },
      {
        // Fire at many thresholds for smooth updates
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // rootMargin shrinks the detection zone to the top 60% of the viewport
        rootMargin: '0px 0px -40% 0px',
      }
    );

    ALL_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

// ── Sidebar content ────────────────────────────────────────────────────────────
function SidebarContent({ onJoin, onClose, active }) {
  const handleNav = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      onClose?.();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col h-full py-5">

      {/* Logo */}
      <div className="px-5 mb-6">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center transition-colors group-hover:bg-indigo-500 flex-shrink-0">
            <Shield size={14} className="text-white" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm">BridgetOS</span><span className="text-xs ml-0.5 font-light" style={{ color: 'rgba(45,212,191,0.55)' }}>∞</span>
        </a>
      </div>

      {/* Nav groups — scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-5 min-h-0">
        {NAV_GROUPS.map(({ group, links }) => (
          <div key={group}>
            <p
              className="text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5"
              style={{ color: group === 'Product' ? 'rgba(165,180,252,0.75)' : group === 'Governance' ? 'rgba(45,212,191,0.5)' : group === 'Company' ? 'rgba(251,191,36,0.6)' : group === 'Access' ? 'rgba(255,102,153,0.5)' : group === 'Legal' ? 'rgba(107,114,128,0.55)' : 'rgba(107,114,128,0.7)' }}
            >
              {group}
            </p>
            <div className="flex flex-col gap-0.5">
              {links.map(({ label, href, external }) => {
                const id = href.startsWith('#') ? href.slice(1) : null;
                const isActive = id && active === id;

                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    onClick={external ? undefined : (e) => handleNav(e, href)}
                    className="flex items-center justify-between py-1.5 rounded-lg text-sm transition-all duration-150 group relative"
                    style={{
                      paddingLeft:  isActive ? '10px' : '8px',
                      paddingRight: '8px',
                      color:        isActive ? '#e0e7ff' : undefined,
                      background:   isActive ? 'rgba(99,102,241,0.12)' : undefined,
                      borderLeft:   isActive ? '2px solid #6366f1' : '2px solid transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#d1d5db';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.background = '';
                      }
                    }}
                  >
                    <span className={isActive ? 'font-medium' : 'text-gray-500'}>{label}</span>
                    {external && (
                      <ExternalLink size={10} className="text-gray-700 group-hover:text-gray-500 flex-shrink-0" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-3 pt-4 mt-2 border-t border-white/5">
        <button
          onClick={() => { onClose?.(); onJoin(); }}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors duration-200"
        >
          Join Waitlist <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Nav({ onJoin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 h-screen ${SIDEBAR_W} z-50`}
        style={{
          background:   'rgba(4,5,14,0.97)',
          borderRight:  '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <SidebarContent onJoin={onJoin} active={active} />
      </aside>

      {/* ── Mobile: hamburger button ──────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        style={{ background: 'rgba(4,5,14,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile: drawer + backdrop ─────────────────── */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`md:hidden fixed left-0 top-0 h-screen ${SIDEBAR_W} z-50`}
            style={{
              background:  'rgba(4,5,14,0.99)',
              borderRight: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
            <SidebarContent onJoin={onJoin} onClose={() => setMobileOpen(false)} active={active} />
          </div>
        </>
      )}
    </>
  );
}
