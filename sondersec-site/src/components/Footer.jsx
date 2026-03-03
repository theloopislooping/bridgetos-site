export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SonderSec. All rights reserved.</p>
      </div>
    </footer>
  )
}
