/**
 * DiaryTab — AI 감정 다이어리 캘린더 메인 (Figma 40000682:1653).
 *
 * 별개 sub-design-system: Inter 폰트 + ai-* 컬러 토큰.
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
import { Sparkles, PenLine } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Calendar as CalendarUI } from '@/components/ui/Calendar';
import { moodCellState, type MoodCellState } from '@/utils/diary';

const moodCellClass: Record<MoodCellState, string> = {
  positive: 'bg-ai-primary text-white font-semibold',
  neutral: 'bg-ai-bg text-ai-deep',
  negative: 'bg-yellow text-ink',
  empty: 'bg-white border border-[#e5e7eb] text-[#1e2939]',
  future: 'bg-[#f9fafb] text-[#99a1af]',
  'other-month': 'bg-transparent text-[#99a1af]/60',
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
    <div
      className="min-h-screen font-['Inter',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 280px, #FFFFFF 100%)',
      }}
    >
      <div className="px-5 pt-4 pb-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-ai-primary flex items-center justify-center shadow-sm">
            <Sparkles size={18} className="text-white" strokeWidth={2.25} />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-ai-deep tracking-tight leading-tight">
              AI 감정 다이어리
            </h1>
            <p className="text-[12px] text-[#4a5565]">
              매일의 마음을 기록해보세요
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/diary/write')}
          className="w-full h-13 rounded-xl bg-ai-primary text-white text-[15px] font-semibold shadow-sm transition-all active:scale-[0.98] hover:brightness-105 inline-flex items-center justify-center gap-2"
        >
          <PenLine size={18} strokeWidth={2.25} />
          오늘의 일기 쓰기
        </button>

        <section className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-5">
          <h3 className="text-[16px] font-semibold text-ai-deep mb-4">
            이번 달의 마음
          </h3>
          <CalendarUI
            year={viewMonth.getFullYear()}
            month={viewMonth.getMonth()}
            cells={cells}
            renderCell={(c, onClick) => {
              const interactive =
                c.state === 'positive' ||
                c.state === 'negative' ||
                c.state === 'neutral';
              return (
                <button
                  onClick={interactive ? onClick : undefined}
                  disabled={!interactive}
                  aria-label={`${c.day}일 ${moodLabel[c.state]}${
                    c.isToday ? ', 오늘' : ''
                  }`}
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-[14px] transition-all ${
                    moodCellClass[c.state]
                  } ${
                    c.isToday
                      ? 'ring-[1.5px] ring-ai-primary ring-offset-1'
                      : ''
                  } ${
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
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-[#e5e7eb] text-[12px] text-[#4a5565]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-ai-primary" /> 긍정적
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-ai-bg border border-[#e5e7eb]" />{' '}
              중립
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-yellow" /> 부정적
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-white border border-[#e5e7eb]" />{' '}
              기록 없음
            </span>
          </div>
        </section>

        {recentDiaries.length > 0 && (
          <section>
            <h3 className="text-[16px] font-semibold text-ai-deep mb-3">
              최근 기록
            </h3>
            <div className="space-y-2">
              {recentDiaries.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border border-[#e5e7eb] p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        d.mood === 'positive'
                          ? 'bg-ai-primary'
                          : d.mood === 'negative'
                          ? 'bg-yellow'
                          : 'bg-[#99a1af]'
                      }`}
                      aria-hidden
                    />
                    <span className="text-[12px] text-[#4a5565]">
                      {format(new Date(d.date), 'yyyy.MM.dd')} ·{' '}
                      {moodLabel[d.mood]}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#1e2939] line-clamp-2 whitespace-pre-line leading-relaxed">
                    {d.answers.q1}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
