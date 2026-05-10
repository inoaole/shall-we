import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { TodayCard } from '@/components/ui/Card';
import { PostFeed } from '@/components/ui/PostFeed';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const activeChallenge = state.challenges[0];
  const completedDays = activeChallenge
    ? state.posts.filter((p) => p.challengeId === activeChallenge.id).length
    : 0;

  return (
    <div className="px-5 pt-4 space-y-6">
      {activeChallenge ? (
        <section>
          <h2 className="text-subtitle-16 text-ink mb-3">오늘의 챌린지</h2>
          <TodayCard
            title={activeChallenge.title}
            durationDays={activeChallenge.durationDays}
            completedDays={completedDays}
            onClick={() => navigate('/challenge')}
          />
        </section>
      ) : (
        <section>
          <EmptyState
            icon={<Plus size={28} />}
            message="아직 시작한 챌린지가 없어요"
            action={{ label: '챌린지 추가하기', onClick: () => navigate('/create') }}
          />
        </section>
      )}

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
