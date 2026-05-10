import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, ChevronRight, User } from 'lucide-react';
import { useApp } from '@/store/AppContext';
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

  // Profile stats
  const totalCerts = state.posts.length;
  const activeChallengeCount = state.challenges.length;

  return (
    <div className="px-5 pt-4 space-y-5">
      {/* Profile card — 닉네임 + 통계 */}
      <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-bg-green-tint flex items-center justify-center">
            <User size={22} className="text-primary" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h1 className="text-title-20 text-ink">{nickname}님</h1>
            <p className="text-body-12 text-gray mt-0.5">
              ShallWe와 함께 성장 중
            </p>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray/10">
          <div className="text-center">
            <p className="text-title-20 text-primary">{totalCerts}</p>
            <p className="text-body-12 text-gray mt-1">총 인증</p>
          </div>
          <div className="text-center">
            <p className="text-title-20 text-primary">{activeChallengeCount}</p>
            <p className="text-body-12 text-gray mt-1">진행 중 챌린지</p>
          </div>
        </div>
      </section>

      {/* 오늘의 챌린지 (있을 때만) */}
      {activeChallenge && (
        <section>
          <h2 className="text-subtitle-16 text-ink mb-3">오늘의 챌린지</h2>
          <TodayCard
            title={activeChallenge.title}
            durationDays={activeChallenge.durationDays}
            completedDays={completedDays}
            onClick={() => navigate('/challenge')}
          />
        </section>
      )}

      {/* 설정 — outlined row (다른 카드와 톤 분리) */}
      <button
        onClick={() => navigate('/settings')}
        className="w-full bg-white rounded-xl border border-gray/15 p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
      >
        <SettingsIcon size={20} className="text-ink" strokeWidth={1.75} />
        <span className="flex-1 text-left text-body-14 text-ink">설정</span>
        <ChevronRight size={18} className="text-gray" />
      </button>

      {/* 내 게시글 */}
      <PostFeed
        title="내 게시글"
        posts={state.posts}
        viewMode={state.prefs.feedView}
        onToggleView={() => dispatch({ type: 'TOGGLE_FEED_VIEW' })}
        emptyMessage="아직 인증한 챌린지가 없어요"
        emptyAction={
          state.challenges.length > 0
            ? { label: '지금 인증하러 가기', onClick: () => navigate('/cert/upload') }
            : { label: '챌린지 시작하기', onClick: () => navigate('/create') }
        }
      />
    </div>
  );
}
