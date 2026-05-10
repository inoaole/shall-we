import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, ChevronRight, Footprints } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PostFeed } from '@/components/ui/PostFeed';

export default function MyPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const nickname = state.user.nickname || '닉네임';

  const walkChallenge =
    state.challenges.find((c) => c.title.includes('산책')) ?? state.challenges[0];
  const walkCompleted = walkChallenge
    ? state.posts.filter((p) => p.challengeId === walkChallenge.id).length
    : 0;

  return (
    <div className="min-h-screen bg-bg-app px-5 pt-4 pb-10 space-y-5">
      {/* 닉네임 헤더 카드 */}
      <section className="bg-gradient-to-br from-bg-green-light to-bg-green-card rounded-xl border border-gray/15 p-5">
        <div className="flex items-start gap-3">
          <img src="/logo/symbol.png" alt="" className="w-12 h-12 shrink-0" />
          <div className="flex-1">
            <h1 className="text-title-20 text-ink">{nickname}님</h1>
            <p className="text-body-12 text-ink/60 mt-0.5">
              ShallWe와 함께 성장 중
            </p>
          </div>
        </div>
      </section>

      {/* 산책 진행률 카드 */}
      {walkChallenge && (
        <section className="bg-white rounded-xl border border-gray/15 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-bg-green-tint flex items-center justify-center">
              <Footprints size={20} className="text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-subtitle-16 text-ink">{walkChallenge.title}</p>
              <p className="text-body-12 text-gray mt-0.5">
                {walkCompleted}일 / {walkChallenge.durationDays}일
              </p>
            </div>
          </div>
          <ProgressBar value={walkCompleted / walkChallenge.durationDays} />
        </section>
      )}

      {/* 설정 카드 */}
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
