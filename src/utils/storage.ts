/**
 * sessionStorage helper with quota-safe write + version migration.
 *
 * STORAGE_KEY versioning — when state shape changes, bump the version. On
 * read, transparently migrate previous-version data to current shape so users
 * don't lose onboarding/challenge state across releases.
 *
 * v2 → v3: added `diaries: DiaryEntry[]`. Migration injects empty diaries.
 */

import { notify } from './notify';

const VERSION = 'v3';
export const STORAGE_KEY = `shallwe.app.${VERSION}`;
const PREV_KEYS = ['shallwe.app.v2'];

/**
 * Read current-version data. If absent, walk previous-version keys, migrate
 * the first match into the current key shape, and return it. Migrations are
 * additive only (new fields default to empty / null).
 */
export function readStorage<T>(key: string = STORAGE_KEY): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;

    for (const prevKey of PREV_KEYS) {
      const prev = sessionStorage.getItem(prevKey);
      if (!prev) continue;
      const parsed = JSON.parse(prev) as Record<string, unknown>;
      const migrated = { diaries: [], ...parsed }; // additive defaults; actual fields preserved
      sessionStorage.setItem(key, JSON.stringify(migrated));
      sessionStorage.removeItem(prevKey);
      return migrated as T;
    }

    return null;
  } catch {
    return null;
  }
}

export function writeStorage<T>(value: T, key: string = STORAGE_KEY): boolean {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) {
      notify.storageQuota();
    }
    return false;
  }
}

export function clearStorage(key: string = STORAGE_KEY): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}
