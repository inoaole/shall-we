import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import { TodayCard } from '@/components/ui/Card';
import { PostFeed } from '@/components/ui/PostFeed';

export default function MyPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const nickname = state.user.nickname || '닉네임';
  const activeChallenge = state.challenges[0];
  const completedDays = activeChallenge
    ? state.posts.filter((p) => p.challengeId === activeChallenge.id).length
    : 0;

  return (
    <div className="px-5 pt-4 space-y-5">
      {/* Greeting */}
      <h1 className="text-title-24 text-ink">{nickname}님</h1>

      {/* App section — 진행 중 챌린지 */}
      {activeChallenge && (
        <section>
          <h2 className="text-subtitle-16 text-ink mb-3">앱</h2>
          <TodayCard
            title={activeChallenge.title}
            durationDays={activeChallenge.durationDays}
            completedDays={completedDays}
            onClick={() => navigate('/diary')}
          />
        </section>
      )}

      {/* Settings row */}
      <button
        onClick={() => navigate('/settings')}
        className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
      >
        <SettingsIcon size={20} className="text-ink" />
        <span className="flex-1 text-left text-subtitle-16 text-ink">설정</span>
        <ChevronRight size={20} className="text-gray" />
      </button>

      {/* My posts feed */}
      <PostFeed
        title="내 게시글"
        posts={state.posts}
        viewMode={state.prefs.feedView}
        onToggleView={() => dispatch({ type: 'TOGGLE_FEED_VIEW' })}
        emptyMessage="아직 인증한 챌린지가 없어요"
        emptyAction={
          state.challenges.length > 0
            ? { label: '지금 인증하러 가기 →', onClick: () => navigate('/cert/upload') }
            : { label: '챌린지 시작하기 →', onClick: () => navigate('/create') }
        }
      />
    </div>
  );
}
