import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SonderSec. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/imprint" className="hover:text-gray-300 transition-colors">
            Imprint
          </Link>
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
