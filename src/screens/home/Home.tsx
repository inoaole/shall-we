import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { TodayCard } from '@/components/ui/Card';
import { PostFeed } from '@/components/ui/PostFeed';
import { Plus } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const completedDaysFor = (challengeId: string) =>
    state.posts.filter((p) => p.challengeId === challengeId).length;

  return (
    <div className="min-h-screen bg-bg-app px-5 pt-4 pb-10 space-y-6">
      <section>
        <h2 className="text-subtitle-16 text-ink mb-3">오늘의 챌린지</h2>
        {state.challenges.length > 0 ? (
          <div className="space-y-3">
            {state.challenges.map((c) => (
              <TodayCard
                key={c.id}
                title={c.title}
                durationDays={c.durationDays}
                completedDays={completedDaysFor(c.id)}
                onClick={() => navigate('/challenge')}
              />
            ))}
          </div>
        ) : (
          <button
            onClick={() => navigate('/create')}
            className="w-full bg-white rounded-xl border border-gray-soft p-8 flex flex-col items-center gap-4 active:scale-[0.99] transition-transform"
          >
            <div className="w-20 h-20 rounded-full bg-gray-soft flex items-center justify-center">
              <Plus size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <p className="text-subtitle-16 text-ink">챌린지 만들기</p>
          </button>
        )}
      </section>

      <PostFeed
        title="모두의 챌린지"
        posts={state.feed}
        viewMode={state.prefs.feedView}
        onToggleView={() => dispatch({ type: 'TOGGLE_FEED_VIEW' })}
        emptyMessage="아직 아무도 인증하지 않았어요"
      />
    </div>
  );
}
