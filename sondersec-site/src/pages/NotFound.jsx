import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => { document.title = 'Page Not Found — SonderSec'; }, []);

  return (
    <div className="bg-charcoal-900 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 border border-white text-white rounded hover:bg-white hover:text-charcoal-950 transition-colors text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
