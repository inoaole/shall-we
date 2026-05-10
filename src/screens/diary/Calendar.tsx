import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMonths, eachDayOfInterval, endOfMonth, isSameDay, startOfMonth, subMonths } from 'date-fns';
import { useApp } from '@/store/AppContext';
import { Calendar as CalendarUI } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { cellState } from '@/utils/date';

export default function Diary() {
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
    <div className="px-5 pt-4 space-y-5">
      {activeChallenge ? (
        <>
          {/* Progress card */}
          <section className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-title-20 text-ink mb-2">{activeChallenge.title}</h2>
            <p className="text-body-14 text-ink mb-3">
              <span className="text-title-20 text-primary">{completedDays}</span>
              <span className="text-gray">일 / {activeChallenge.durationDays}일</span>
            </p>
            <ProgressBar value={completedDays / activeChallenge.durationDays} />
            <p className="text-body-12 text-gray mt-3">
              {completedDays > 0 ? `완수 - ${completedDays}일차` : '오늘부터 시작!'}
            </p>
          </section>

          {/* Calendar */}
          <section className="bg-white rounded-xl shadow-md p-5">
            <h3 className="text-subtitle-16 text-ink mb-4">이번 달 완수 현황</h3>
            <CalendarUI
              year={viewMonth.getFullYear()}
              month={viewMonth.getMonth()}
              cells={cells}
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
          message="아직 진행 중인 챌린지가 없어요"
          action={{ label: '챌린지 시작하기', onClick: () => navigate('/create') }}
        />
      )}
    </div>
  );
}
