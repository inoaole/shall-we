/**
 * UUID generator with fallback (D-S3.7).
 * crypto.randomUUID is not supported on Safari < 15.4 / Android Chrome < 92.
 */

export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random suffix. Not RFC 4122 but unique enough for prototype.
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
