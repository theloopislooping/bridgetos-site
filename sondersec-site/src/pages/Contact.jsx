import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: hook up to email service / form endpoint
    setSubmitted(true)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-2">
          SonderSec
        </h1>
        <p className="text-gray-600 mb-10">
          Have a question, want to host a workshop, or just want to say hello?
          Reach out below.
        </p>

        {submitted ? (
          <div className="bg-sage-50 border border-sage-300 rounded-lg p-6 text-sage-800">
            <p className="font-semibold text-lg mb-1">Thank you!</p>
            <p>
              Your message has been received. We'll get back to you as soon as
              possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-charcoal-900 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-charcoal-900 mb-1"
              >
                Email address <span className="text-gray-400">(Required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-charcoal-900 mb-1"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-charcoal-900 mb-1"
              >
                Message <span className="text-gray-400">(Required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-vertical"
              />
            </div>

            <p className="text-xs text-gray-400">
              Our{' '}
              <Link to="/privacy" className="underline hover:text-gray-600">
                privacy policy
              </Link>{' '}
              applies.
            </p>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-charcoal-900 text-white text-sm font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
