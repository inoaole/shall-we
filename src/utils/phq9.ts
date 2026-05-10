/**
 * PHQ-9 scoring utilities.
 *
 * 9 questions × 4-point scale (0-3) → total 0-27.
 * Cutoffs: 없음 (0-4), 낮음 (5-9), 중간 (10-14), 높음 (15+)
 *
 * Tested in tests/phq9.test.ts (D6).
 */

import type { Level } from '@/store/AppContext';

export function score(answers: number[]): number {
  return answers.reduce((sum, v) => sum + v, 0);
}

export function level(s: number): Level {
  if (s <= 4) return '없음';
  if (s <= 9) return '낮음';
  if (s <= 14) return '중간';
  return '높음';
}

export const LEVELS: Level[] = ['없음', '낮음', '중간', '높음'];
