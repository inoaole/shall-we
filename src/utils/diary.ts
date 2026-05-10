/**
 * Diary helpers — mock AI mood inference + cell state for mood calendar.
 *
 * Production version would call an LLM. Prototype uses Korean keyword
 * counts: more negative keyword hits than positive → 'negative'.
 */

import { isSameDay, startOfDay } from 'date-fns';
import type { DiaryEntry, Mood } from '@/store/AppContext';

const NEGATIVE_KEYWORDS = [
  '힘들', '무기력', '슬프', '슬펐', '우울', '지쳐', '지쳤', '불안', '불행',
  '안돼', '못해', '못하', '망', '실패', '두려', '외롭', '외로',
  '짜증', '화나', '괴로', '눈물', '울었', '죽고', '포기', '의미없',
];

const POSITIVE_KEYWORDS = [
  '감사', '고마', '좋', '행복', '기쁘', '기뻤', '뿌듯', '즐거', '즐겁',
  '재밌', '재미', '웃', '편안', '평안', '설레', '설렘', '뿌듯', '성취',
  '사랑', '응원', '희망', '괜찮', '나아',
];

export function inferMood(answers: { q1: string; q2: string; q3: string }): Mood {
  const text = `${answers.q1} ${answers.q2} ${answers.q3}`.toLowerCase();
  if (text.trim().length === 0) return 'neutral';

  const neg = NEGATIVE_KEYWORDS.filter((k) => text.includes(k)).length;
  const pos = POSITIVE_KEYWORDS.filter((k) => text.includes(k)).length;

  if (neg > pos) return 'negative';
  if (pos > neg) return 'positive';
  return 'neutral';
}

/* Mood calendar cell ─────────────────────────────────────────────── */

export type MoodCellState = Mood | 'empty' | 'future' | 'other-month';

export function moodCellState(
  cellDate: Date,
  today: Date,
  diaries: DiaryEntry[],
  currentMonth: number,
): MoodCellState {
  if (cellDate.getMonth() !== currentMonth) return 'other-month';

  const today0 = startOfDay(today).getTime();
  const cell0 = startOfDay(cellDate).getTime();
  if (cell0 > today0) return 'future';

  const entry = diaries.find((d) => isSameDay(new Date(d.date), cellDate));
  if (!entry) return 'empty';
  return entry.mood;
}
