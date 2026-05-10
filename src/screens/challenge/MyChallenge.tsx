/**
 * MyChallenge — 챌린지 진행현황 (Figma 40000611:5419).
 *
 * 상단 그라디언트 카드(완수 N일차) + 이번 달 완수 현황 7x4 그리드 + 오늘 챌린지 카드.
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
} from 'date-fns';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackHeader } from '@/components/layout/BackHeader';
import { cellState, type CellState } from '@/utils/date';

const cellClass: Record<CellState, string> = {
  'done': 'bg-primary text-white font-semibold',
  'missed': 'bg-white border border-gray/30 text-ink',
  'future': 'bg-bg-app text-gray',
  'today-empty': 'bg-bg-app text-gray',
  'other-month': 'bg-transparent text-gray/40',
};

export default function MyChallenge() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const today = new Date();

  const activeChallenge = state.challenges[0];
  const completedDays = activeChallenge
    ? state.posts.filter((p) => p.challengeId === activeChallenge.id).length
    : 0;

  const cells = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    return eachDayOfInterval({ start, end }).map((d) => ({
      day: d.getDate(),
      state: cellState(d, today, state.posts, viewMonth.getMonth()),
      isToday: isSameDay(d, today),
      date: d,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMonth, state.posts]);

  // 첫 주 padding (월요일 시작)
  const firstWeekday = startOfMonth(viewMonth).getDay(); // 0=일
  const monStartOffset = (firstWeekday + 6) % 7; // 월요일=0
  const padCells = Array.from({ length: monStartOffset });

  const handleCellClick = (date: Date) => {
    const post = state.posts.find((p) => isSameDay(new Date(p.date), date));
    if (post) navigate(`/post/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-bg-app pb-10">
      <BackHeader title="내 챌린지" sticky />
      <div className="px-5 pt-4 space-y-5">
        {activeChallenge ? (
          <>
            {/* Gradient progress card */}
            <section className="bg-gradient-to-br from-bg-green-light to-bg-green-card rounded-xl border border-gray/15 p-5">
              <div className="flex items-start gap-3 mb-4">
                <img src="/logo/symbol.png" alt="" className="w-12 h-12 shrink-0" />
                <div className="flex-1">
                  <h2 className="text-title-20 text-ink">{activeChallenge.title}</h2>
                  <p className="text-body-12 text-ink/60 mt-0.5">
                    {activeChallenge.durationDays}일 챌린지
                  </p>
                </div>
                {completedDays > 0 && (
                  <span className="px-2.5 py-1 bg-gray-muted text-white text-body-12 rounded-md font-semibold whitespace-nowrap">
                    완수 {completedDays}일차
                  </span>
                )}
              </div>
              <p className="flex justify-between items-baseline mb-2">
                <span>
                  <span className="text-title-20 text-primary font-semibold">
                    {completedDays}일
                  </span>
                  <span className="text-body-14 text-ink/60">
                    /{activeChallenge.durationDays}일
                  </span>
                </span>
              </p>
              <ProgressBar value={completedDays / activeChallenge.durationDays} />
            </section>

            {/* Calendar — 이번 달 완수 현황 */}
            <section className="bg-white rounded-xl border border-gray/15 p-5">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setViewMonth(subMonths(viewMonth, 1))}
                  className="text-2xl text-ink px-2 leading-none active:scale-90 transition-transform"
                  aria-label="이전 달"
                >
                  ‹
                </button>
                <h3 className="text-subtitle-16 text-ink">
                  이번 달 완수 현황
                </h3>
                <button
                  onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                  className="text-2xl text-ink px-2 leading-none active:scale-90 transition-transform"
                  aria-label="다음 달"
                >
                  ›
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-body-12 text-center text-gray mb-2 font-medium">
                {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                {padCells.map((_, i) => (
                  <div key={`pad-${i}`} className="w-10 h-10" />
                ))}
                {cells.map((c) => {
                  const interactive = c.state === 'done';
                  return (
                    <button
                      key={c.date.toISOString()}
                      onClick={() => handleCellClick(c.date)}
                      disabled={!interactive}
                      aria-label={`${c.day}일`}
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-body-14 transition-all ${
                        cellClass[c.state]
                      } ${
                        c.isToday ? 'ring-[1.5px] ring-primary ring-offset-1' : ''
                      } ${interactive ? 'active:scale-[0.95]' : 'cursor-default'}`}
                    >
                      {c.day}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Today challenge + 인증하기 */}
            <section className="bg-white rounded-xl border border-gray/15 p-5 space-y-3">
              <h3 className="text-subtitle-16 text-ink">오늘 챌린지</h3>
              <p className="text-body-14 text-ink">{activeChallenge.title}</p>
              <Button onClick={() => navigate('/cert/upload')}>인증하기</Button>
            </section>
          </>
        ) : (
          <EmptyState
            message="아직 시작한 챌린지가 없어요"
            action={{ label: '챌린지 시작하기', onClick: () => navigate('/create') }}
          />
        )}
      </div>
    </div>
  );
}
