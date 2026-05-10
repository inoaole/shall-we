import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { TodayCard } from '@/components/ui/Card';

export default function CertTab() {
  const navigate = useNavigate();
  const { state } = useApp();

  const hasChallenges = state.challenges.length > 0;

  return (
    <div className="min-h-screen bg-bg-app px-5 pt-4 pb-10 space-y-5">
      <h2 className="text-subtitle-16 text-ink">오늘의 챌린지</h2>

      {!hasChallenges ? (
        <button
          onClick={() => navigate('/create')}
          className="w-full bg-white rounded-xl border border-gray-soft p-8 flex flex-col items-center gap-4 active:scale-[0.99] transition-transform"
        >
          <div className="w-20 h-20 rounded-full bg-gray-soft flex items-center justify-center">
            <Plus size={36} className="text-white" strokeWidth={2.5} />
          </div>
          <p className="text-subtitle-16 text-ink">챌린지 만들기</p>
        </button>
      ) : (
        <div className="space-y-3">
          {state.challenges.map((c) => {
            const completedDays = state.posts.filter((p) => p.challengeId === c.id).length;
            return (
              <TodayCard
                key={c.id}
                title={c.title}
                durationDays={c.durationDays}
                completedDays={completedDays}
                onClick={() => navigate('/cert/upload')}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
