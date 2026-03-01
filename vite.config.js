import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Security headers applied to the dev server.
// In production these MUST be set at the CDN / reverse-proxy layer (nginx, Cloudflare, Vercel, etc.)
// because Vite's server.headers only run in `vite dev`, not in `vite preview` or a static host.
const SECURITY_HEADERS = {
  'X-Frame-Options':           'DENY',
  'X-Content-Type-Options':    'nosniff',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
  // CSP: allow self + Plausible analytics only. Adjust if you add other CDN assets.
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://plausible.io",  // unsafe-inline needed for the conditional analytics loader
    "style-src 'self' 'unsafe-inline'",   // unsafe-inline required by Tailwind's JIT
    "img-src 'self' data: https:",
    "connect-src 'self' http://localhost:8000 https://plausible.io",
    "font-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

export default defineConfig({
  plugins: [react()],
  server: {
    headers: SECURITY_HEADERS,
  },
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        investors: resolve(__dirname, 'investors.html'),
        technical: resolve(__dirname, 'technical.html'),
        privacy:   resolve(__dirname, 'privacy.html'),
        terms:     resolve(__dirname, 'terms.html'),
        '404':     resolve(__dirname, '404.html'),
      },
    },
  },
});
