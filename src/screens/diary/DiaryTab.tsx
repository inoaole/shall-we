/**
 * DiaryTab — AI 다이어리 탭 홈.
 *
 * 구성: "오늘의 일기 쓰기" CTA + 이번 달 mood 캘린더 + 과거 entry 리스트.
 * 다이어리 entry가 없으면 캘린더는 표시하되 모든 셀이 'empty' 상태.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfMonth,
  subMonths,
  format,
} from 'date-fns';
import { useApp } from '@/store/AppContext';
import { Calendar as CalendarUI } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';
import { moodCellState, type MoodCellState } from '@/utils/diary';

const moodCellClass: Record<MoodCellState, string> = {
  positive: 'bg-primary text-white font-semibold',
  neutral: 'bg-bg-green-tint text-ink',
  negative: 'bg-yellow text-ink',
  empty: 'bg-white border border-gray/30 text-ink',
  future: 'bg-bg-gray text-gray/60',
  'other-month': 'bg-transparent text-gray/40',
};

const moodLabel: Record<MoodCellState, string> = {
  positive: '긍정',
  neutral: '중립',
  negative: '부정',
  empty: '기록 없음',
  future: '미래',
  'other-month': '다른 달',
};

export default function DiaryTab() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const today = new Date();

  const cells = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    return eachDayOfInterval({ start, end }).map((d) => ({
      day: d.getDate(),
      state: moodCellState(d, today, state.diaries, viewMonth.getMonth()),
      isToday: isSameDay(d, today),
      date: d,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMonth, state.diaries]);

  const recentDiaries = state.diaries.slice(0, 5);

  return (
    <div className="px-5 pt-4 pb-6 space-y-5">
      <Button onClick={() => navigate('/diary/write')}>오늘의 일기 쓰기</Button>

      <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-5">
        <h3 className="text-subtitle-16 text-ink mb-4">오늘의 기록</h3>
        <CalendarUI
          year={viewMonth.getFullYear()}
          month={viewMonth.getMonth()}
          cells={cells}
          renderCell={(c, onClick) => {
            const interactive = c.state === 'positive' || c.state === 'negative' || c.state === 'neutral';
            return (
              <button
                onClick={interactive ? onClick : undefined}
                disabled={!interactive}
                aria-label={`${c.day}일 ${moodLabel[c.state]}${c.isToday ? ', 오늘' : ''}`}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-body-14 transition-all ${
                  moodCellClass[c.state]
                } ${c.isToday ? 'ring-[1.5px] ring-primary ring-offset-1' : ''} ${
                  interactive ? 'active:scale-[0.95]' : 'cursor-default'
                }`}
              >
                {c.day}
              </button>
            );
          }}
          onPrev={() => setViewMonth(subMonths(viewMonth, 1))}
          onNext={() => setViewMonth(addMonths(viewMonth, 1))}
        />
        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray/10 text-body-12 text-gray">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-primary" /> 긍정적
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-bg-green-tint" /> 중립
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-yellow" /> 부정적
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-white border border-gray/30" /> 기록 없음
          </span>
        </div>
      </section>

      {recentDiaries.length > 0 && (
        <section>
          <h3 className="text-subtitle-16 text-ink mb-3">최근 기록</h3>
          <div className="space-y-2">
            {recentDiaries.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-xl border border-gray/15 p-4"
              >
                <p className="text-body-12 text-gray mb-1">
                  {format(new Date(d.date), 'yyyy.MM.dd')} · {moodLabel[d.mood]}
                </p>
                <p className="text-body-14 text-ink line-clamp-2 whitespace-pre-line">
                  {d.answers.q1}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
