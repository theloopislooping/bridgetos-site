// Safe accessor for runtime environment variables.
//
// VITE_API_URL must be set in .env (or build environment) for the waitlist
// form to function. If absent the form renders a graceful degraded state
// rather than throwing or silently failing.

export const API_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * Returns true when VITE_API_URL is configured and non-empty.
 * Use this before attempting any fetch to the waitlist endpoint.
 */
export function isApiConfigured() {
  return typeof API_URL === 'string' && API_URL.trim().length > 0;
}
