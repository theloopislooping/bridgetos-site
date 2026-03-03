import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'Our Values',
    subtitle: 'Respect. Clarity. Empowerment.',
    body: 'We believe everyone deserves to feel safe online — regardless of age, background, or digital experience. Our workshops are built on dignity, not fear.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    alt: 'Person using laptop confidently',
  },
  {
    title: 'Our Motivation',
    subtitle: 'Scams are evolving. Education hasn\'t.',
    body: 'Online scams cost Americans over $10 billion in 2023 alone — and the most targeted groups are often the least prepared. The digital literacy gap is a safety gap.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    alt: 'Community workshop setting',
  },
  {
    title: 'Our Project',
    subtitle: 'Free, trauma-aware workshops.',
    body: 'SonderSec is a nonprofit cybersecurity initiative delivering free, trauma-aware digital safety workshops to seniors, caregivers, and underserved communities across the U.S. and UK.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    alt: 'Group learning session',
  },
  {
    title: 'Our Mission',
    subtitle: '',
    body: 'To close the cybersecurity awareness gap for the most vulnerable by making digital defense simple, human, and effective.',
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80',
    alt: 'Diverse group of people together',
  },
]

export default function Home() {
  useEffect(() => { document.title = 'SonderSec — Digital Safety for Everyone'; }, []);
  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl overflow-hidden bg-charcoal-800 shadow-lg"
            >
              <div className="h-48 sm:h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-sage-700 p-6">
                <h2 className="text-white text-xl font-bold mb-1">
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="text-sage-200 text-sm font-medium mb-3">
                    {card.subtitle}
                  </p>
                )}
                <p className="text-sage-100 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/what-we-teach"
            className="inline-block px-8 py-3 border border-white text-white rounded hover:bg-white hover:text-charcoal-950 transition-colors text-sm font-medium"
          >
            See What We Teach
          </Link>
        </div>
      </div>
    </div>
  )
}
