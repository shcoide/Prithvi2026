/**
 * Server-side registration gate.
 * Set REGISTRATION_OPEN=true in .env.local to open registrations.
 * Set REGISTRATION_OPEN=false (or remove it) to close them.
 */
export const REGISTRATION_OPEN =
    process.env.REGISTRATION_OPEN === 'true';
