// Email validation: syntax + common throwaway-domain blocklist
//
// We can't truly verify "this mailbox exists" from the browser — that requires
// either DNS/MX lookups (backend) or sending a confirmation email. What we CAN
// do here:
//   1. Strict syntactic check (covers ~99% of real-world emails)
//   2. Reject obvious throwaway / typo domains
//   3. Catch common typos in popular providers ("gmial.com" -> suggest "gmail.com")
//
// For a real production app, after these checks you'd POST the address to your
// backend, which would do an MX-record lookup (and ideally a confirmation email).

// RFC 5322-compatible enough for any realistic email.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'temp-mail.org',
  '10minutemail.com', 'trashmail.com', 'yopmail.com', 'throwaway.email',
  'sharklasers.com', 'maildrop.cc', 'mintemail.com', 'getnada.com',
  'fakeinbox.com', 'mailcatch.com', 'mvrht.com', 'tempr.email',
  'dispostable.com', 'inboxbear.com', 'spamgourmet.com',
]);

// Maps a common typo to its correction so we can suggest "did you mean...?"
const TYPO_FIXES = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotnail.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yhaoo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
};

/**
 * Validate an email address.
 * @param {string} raw
 * @returns {{ valid: boolean, error?: string, suggestion?: string, normalized?: string }}
 */
export function validateEmail(raw) {
  if (!raw || typeof raw !== 'string') {
    return { valid: false, error: 'Email is required.' };
  }
  const email = raw.trim().toLowerCase();

  if (email.length > 254) {
    return { valid: false, error: 'Email is too long.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { valid: false, error: 'Email format looks invalid.' };
  }

  const [local, domain] = email.split('@');
  if (local.length > 64) {
    return { valid: false, error: 'Email username part is too long.' };
  }
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) {
    return { valid: false, error: 'Email username has invalid dots.' };
  }
  // Domain must contain a real TLD (at least 2 chars)
  const parts = domain.split('.');
  if (parts.some((p) => p.length === 0) || parts[parts.length - 1].length < 2) {
    return { valid: false, error: 'Email domain looks invalid.' };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: 'Disposable email addresses are not allowed.' };
  }

  if (TYPO_FIXES[domain]) {
    const fixed = `${local}@${TYPO_FIXES[domain]}`;
    return {
      valid: false,
      error: `Did you mean ${fixed}?`,
      suggestion: fixed,
    };
  }

  return { valid: true, normalized: email };
}
