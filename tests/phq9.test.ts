import { describe, it, expect } from 'vitest';
import { score, level } from '@/utils/phq9';

describe('score()', () => {
  it('합산이 맞음', () => {
    expect(score([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0);
    expect(score([1, 2, 1, 0, 2, 1, 1, 1, 0])).toBe(9);
    expect(score([3, 3, 3, 3, 3, 3, 3, 3, 3])).toBe(27);
  });
});

describe('level() — 4단계 경계값', () => {
  it('없음: 0-4점', () => {
    expect(level(0)).toBe('없음');
    expect(level(2)).toBe('없음');
    expect(level(4)).toBe('없음');
  });
  it('낮음: 5-9점', () => {
    expect(level(5)).toBe('낮음');
    expect(level(7)).toBe('낮음');
    expect(level(9)).toBe('낮음');
  });
  it('중간: 10-14점', () => {
    expect(level(10)).toBe('중간');
    expect(level(12)).toBe('중간');
    expect(level(14)).toBe('중간');
  });
  it('높음: 15+점', () => {
    expect(level(15)).toBe('높음');
    expect(level(20)).toBe('높음');
    expect(level(27)).toBe('높음');
  });
});
