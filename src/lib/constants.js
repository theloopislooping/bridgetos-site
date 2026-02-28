// Shared site-wide constants.
// Import from here — never hardcode in components.

export const CONTACT_EMAIL = 'wendi.soto@bridgetos.com';

export const GATE_PASSWORD = import.meta.env.VITE_GATE_PASSWORD ?? 'BOS2026';

export const ROLE_OPTIONS = [
  'Founder / CEO',
  'CTO / VP Engineering',
  'Product Manager',
  'Compliance / Legal',
  'Investor / VC',
  'Security / Governance',
  'Researcher / Academic',
  'Other',
];
