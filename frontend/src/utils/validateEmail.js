// Lightweight email validator used by Register / EditProfile / CreateUserModal.
// Returns { valid: boolean, normalized?: string, error?: string }.
//
// Intentionally simple — no fancy disposable-domain checks. The backend is the
// real source of truth (it enforces uniqueness and the 'email' validation rule).

const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Email is required.' };
  }
  const normalized = input.trim().toLowerCase();
  if (!RE.test(normalized)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true, normalized };
}
