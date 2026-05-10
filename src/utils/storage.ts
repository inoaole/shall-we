/**
 * sessionStorage helper with quota-safe write.
 *
 * D-S2.1: STORAGE_KEY versioning — when state shape changes (new actions,
 * new fields), bump the version suffix. Old data is then ignored on hydrate
 * (returns null), which forces a clean reset rather than crashing on
 * undefined fields.
 */

import { notify } from './notify';

const VERSION = 'v1';
export const STORAGE_KEY = `shallwe.app.${VERSION}`;

export function readStorage<T>(key: string = STORAGE_KEY): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
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
