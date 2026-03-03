import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/what-we-teach', label: 'What We Teach' },
    { to: '/algorithmic-shadows', label: 'Algorithmic Shadows' },
    { to: '/safe-curriculum', label: 'S.A.F.E.' },
    { to: '/scam-detector', label: 'Scam Detector' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About Us' },
  ]

  return (
    <nav className="bg-charcoal-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white text-xl font-bold tracking-tight">
            SonderSec
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm whitespace-nowrap transition-colors ${
                  pathname === to
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-charcoal-950 border-t border-white/10 px-4 pb-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm ${
                pathname === to ? 'text-white font-medium' : 'text-gray-400'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
