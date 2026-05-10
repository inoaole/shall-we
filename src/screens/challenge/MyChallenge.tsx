/**
 * MyChallenge — 기존 다이어리 탭 컨텐츠 (진행 카드 + 캘린더 + 오늘 챌린지).
 *
 * v0.1.4에서 다이어리 탭이 AI 다이어리 작성 흐름으로 전환되면서, 챌린지
 * 진행 현황은 별도 라우트(/challenge)로 분리. 홈에서 "내 챌린지"로 진입.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMonths, eachDayOfInterval, endOfMonth, isSameDay, startOfMonth, subMonths } from 'date-fns';
import { useApp } from '@/store/AppContext';
import { Calendar as CalendarUI, CalendarCell } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackHeader } from '@/components/layout/BackHeader';
import { cellState } from '@/utils/date';

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

  const handleCellClick = (date: Date) => {
    const post = state.posts.find((p) => isSameDay(new Date(p.date), date));
    if (post) navigate(`/post/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-bg-gray pb-10">
      <BackHeader title="내 챌린지" sticky />
      <div className="px-5 pt-4 space-y-5">
        {activeChallenge ? (
          <>
            {/* Progress card — logo + 챌린지 이름 + 진행 (Figma 40000611:5571) */}
            <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-6 flex flex-col items-center text-center">
              <img src="/logo/symbol.png" alt="" className="w-14 h-14 mb-3" />
              <span className="inline-block px-2.5 py-0.5 bg-bg-green-tint text-primary text-body-12 rounded-full mb-2 font-medium">
                {activeChallenge.durationDays}일 챌린지
              </span>
              <h2 className="text-title-20 text-ink mb-5">{activeChallenge.title}</h2>
              <p className="text-body-14 mb-3 self-stretch flex justify-between items-baseline">
                <span>
                  <span className="text-title-20 text-primary font-semibold">{completedDays}일</span>
                  <span className="text-gray"> / {activeChallenge.durationDays}일</span>
                </span>
                <span className="text-body-12 text-gray">
                  {completedDays > 0 ? `완수 ${completedDays}일차` : '시작 전'}
                </span>
              </p>
              <div className="w-full">
                <ProgressBar value={completedDays / activeChallenge.durationDays} />
              </div>
            </section>

            {/* Calendar */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-subtitle-16 text-ink mb-4">이번 달 완수 현황</h3>
              <CalendarUI
                year={viewMonth.getFullYear()}
                month={viewMonth.getMonth()}
                cells={cells}
                renderCell={(c, onClick) => (
                  <CalendarCell day={c.day} state={c.state} isToday={c.isToday} onClick={onClick} />
                )}
                onCellClick={handleCellClick}
                onPrev={() => setViewMonth(subMonths(viewMonth, 1))}
                onNext={() => setViewMonth(addMonths(viewMonth, 1))}
              />
              <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray/10 text-body-12 text-gray">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-primary" /> 완수
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-white border-[1.5px] border-gray/25" /> 미완수
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-gray/10" /> 미래
                </span>
              </div>
            </section>

            {/* Today challenge + 인증하기 */}
            <section className="bg-white rounded-xl shadow-md p-5 space-y-3">
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
