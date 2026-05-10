import { describe, it, expect } from 'vitest';
import { cellState } from '@/utils/date';

const today = new Date('2026-05-10T12:00:00');
const month = today.getMonth(); // 4 (May)
const posts = [
  { date: '2026-05-08T10:00:00' },
  { date: '2026-05-09T08:00:00' },
];

describe('cellState', () => {
  it('완수 — 지난 날짜 + post 있음', () => {
    expect(cellState(new Date('2026-05-08'), today, posts, month)).toBe('done');
    expect(cellState(new Date('2026-05-09'), today, posts, month)).toBe('done');
  });

  it('미완수 — 지난 날짜 + post 없음', () => {
    expect(cellState(new Date('2026-05-05'), today, posts, month)).toBe('missed');
    expect(cellState(new Date('2026-05-07'), today, posts, month)).toBe('missed');
  });

  it('미래 — 오늘 이후 날짜', () => {
    expect(cellState(new Date('2026-05-11'), today, posts, month)).toBe('future');
    expect(cellState(new Date('2026-05-31'), today, posts, month)).toBe('future');
  });

  it('today-empty — 오늘인데 인증 안 함', () => {
    expect(cellState(new Date('2026-05-10'), today, posts, month)).toBe('today-empty');
  });

  it('today done — 오늘 인증 완료', () => {
    const postsWithToday = [...posts, { date: '2026-05-10T15:00:00' }];
    expect(cellState(new Date('2026-05-10'), today, postsWithToday, month)).toBe('done');
  });

  it('other-month — 다른 달 (이전/다음)', () => {
    expect(cellState(new Date('2026-04-30'), today, posts, month)).toBe('other-month');
    expect(cellState(new Date('2026-06-01'), today, posts, month)).toBe('other-month');
  });
});
