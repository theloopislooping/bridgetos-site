/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f0',
          100: '#e6edde',
          200: '#cddbbf',
          300: '#a8c092',
          400: '#85a66b',
          500: '#6b8f52',
          600: '#556f41',
          700: '#435635',
          800: '#38472d',
          900: '#2f3c27',
        },
        charcoal: {
          800: '#2a2a2a',
          900: '#1e1e1e',
          950: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
}
