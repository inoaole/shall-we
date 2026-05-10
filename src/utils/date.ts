/**
 * Calendar cell state computation for diary screen.
 *
 * Tested in tests/date.test.ts (D6).
 *
 * Note: Uses local time (browser TZ). 자정 직후 인증한 경우 기기 timezone 기준
 * 으로 처리. KST 명시가 필요하면 date-fns-tz 도입 검토 (D-S3.2 timezone note).
 */

import { isSameDay, startOfDay } from 'date-fns';

export type CellState = 'done' | 'missed' | 'future' | 'today-empty' | 'other-month';

interface PostLike {
  date: string; // ISO date string
}

export function cellState(
  cellDate: Date,
  today: Date,
  posts: PostLike[],
  currentMonth: number, // 0-11
): CellState {
  if (cellDate.getMonth() !== currentMonth) return 'other-month';

  const today0 = startOfDay(today).getTime();
  const cell0 = startOfDay(cellDate).getTime();

  const hasPost = posts.some((p) => isSameDay(new Date(p.date), cellDate));

  if (cell0 > today0) return 'future';
  if (hasPost) return 'done';
  if (cell0 === today0) return 'today-empty';
  return 'missed';
}
