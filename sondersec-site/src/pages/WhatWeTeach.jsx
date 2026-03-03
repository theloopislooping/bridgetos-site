import { useEffect } from 'react'

const workshops = [
  {
    number: 1,
    title: 'Recognizing Phishing & Scam Messages',
    description:
      'Learn how to spot fake emails, texts, and calls designed to steal your personal information. We break down real examples so you know exactly what to look for.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    alt: 'Phishing email on screen',
  },
  {
    number: 2,
    title: 'Password Safety & Account Protection',
    description:
      'Understand how to create strong passwords, use password managers, and enable two-factor authentication to keep your accounts safe.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    alt: 'Digital security lock',
  },
  {
    number: 3,
    title: 'Social Media & Privacy Settings',
    description:
      'Protect your personal information on Facebook, Instagram, and other platforms. Learn what to share, what to hide, and how to lock down your profiles.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    alt: 'Social media on phone',
  },
  {
    number: 4,
    title: 'What to Do After a Scam',
    description:
      'If you or someone you know has been scammed, this workshop covers recovery steps, reporting fraud, emotional support resources, and how to prevent it from happening again.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    alt: 'Person getting support',
  },
  {
    number: 5,
    title: 'Banking & Payment App Fraud',
    description:
      'Zelle, PayPal, Venmo — payment apps make life easier, but scammers know how to exploit them. Learn the most common payment scams and how to protect your money.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    alt: 'Mobile payment app',
  },
  {
    number: 6,
    title: 'Fake Charities & Donation Scams',
    description:
      'Not every cause asking for money is real. Learn how to verify charities, spot fraudulent donation requests, and give safely — especially after disasters or holidays.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
    alt: 'Donation jar',
  },
]

export default function WhatWeTeach() {
  useEffect(() => { document.title = 'What We Teach — SonderSec'; }, []);
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-4">
          What We Teach
        </h1>
        <p className="text-gray-600 max-w-2xl mb-12">
          Our workshops are designed for real people facing real threats. Every
          session is free, jargon-free, and built with empathy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <div
              key={w.number}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={w.image}
                  alt={w.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-sage-600 font-semibold uppercase tracking-wider">
                  Workshop {w.number}
                </span>
                <h3 className="text-lg font-bold text-charcoal-900 mt-1 mb-2">
                  {w.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {w.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
