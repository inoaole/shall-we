/**
 * inferMood + moodCellState (D5 keyword-based mock).
 */

import { describe, it, expect } from 'vitest';
import { inferMood, moodCellState } from '@/utils/diary';
import type { DiaryEntry } from '@/store/AppContext';

describe('inferMood', () => {
  it('부정 키워드가 더 많으면 negative', () => {
    expect(
      inferMood({
        q1: '오늘 너무 힘들었어요',
        q2: '며칠째 무기력하고 우울해요',
        q3: '특별히 감사할 일은 없어요',
      }),
    ).toBe('negative');
  });

  it('긍정 키워드가 더 많으면 positive', () => {
    expect(
      inferMood({
        q1: '오늘 좋은 일이 있었어요. 정말 행복했어요',
        q2: '요즘 기쁜 일이 많아요',
        q3: '친구가 응원해줘서 감사했어요',
      }),
    ).toBe('positive');
  });

  it('빈 답이면 neutral', () => {
    expect(inferMood({ q1: '', q2: '', q3: '' })).toBe('neutral');
  });

  it('긍/부 키워드 동수면 neutral', () => {
    // "힘들" 1, "감사" 1
    expect(
      inferMood({
        q1: '힘들었지만',
        q2: '',
        q3: '감사한 마음이 들어요',
      }),
    ).toBe('neutral');
  });
});

describe('moodCellState', () => {
  const today = new Date(2026, 4, 10); // 2026-05-10

  it('다른 달은 other-month', () => {
    const cellPrevMonth = new Date(2026, 3, 30);
    expect(moodCellState(cellPrevMonth, today, [], 4)).toBe('other-month');
  });

  it('미래는 future', () => {
    const tomorrow = new Date(2026, 4, 11);
    expect(moodCellState(tomorrow, today, [], 4)).toBe('future');
  });

  it('entry 없으면 empty', () => {
    expect(moodCellState(today, today, [], 4)).toBe('empty');
  });

  it('entry 있으면 그 entry의 mood', () => {
    const entry: DiaryEntry = {
      id: '1',
      date: today.toISOString(),
      answers: { q1: 'a', q2: 'b', q3: 'c' },
      mood: 'positive',
      aiFeedback: '',
      recommendedChallenge: '',
      helpful: null,
    };
    expect(moodCellState(today, today, [entry], 4)).toBe('positive');
  });
});
