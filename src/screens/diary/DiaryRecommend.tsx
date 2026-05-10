import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';
import type { DiaryEntry } from '@/store/AppContext';

type RecommendNavState = {
  entry: DiaryEntry;
};

export default function DiaryRecommend() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as RecommendNavState | null;

  if (!data) {
    navigate('/diary', { replace: true });
    return null;
  }
  const { entry } = data;

  return (
    <div
      className="min-h-screen pb-10 font-['Inter',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 240px, #FFFFFF 100%)',
      }}
    >
      <header className="h-14 px-5 flex items-center sticky top-0 z-10 bg-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 active:scale-90 transition-transform"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} strokeWidth={2} className="text-ai-deep" />
        </button>
        <h1 className="text-[18px] font-semibold text-ai-deep ml-1">
          챌린지 추천
        </h1>
      </header>

      <div className="px-5 pt-2 space-y-5">
        <div
          className="rounded-2xl p-6 border border-white/60 shadow-sm"
          style={{
            background:
              'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 60%, #FFFFFF 100%)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-ai-primary flex items-center justify-center">
              <Sparkles size={16} className="text-white" strokeWidth={2.25} />
            </div>
            <span className="text-[13px] font-medium text-ai-deep">
              오늘의 챌린지
            </span>
          </div>
          <h2 className="text-[20px] font-semibold text-[#1e2939] leading-snug mb-3">
            {entry.recommendedChallenge}
          </h2>
          <p className="text-[13px] text-[#4a5565] leading-relaxed">
            오늘의 감정에 맞춰 가볍게 시작해볼 수 있는 챌린지예요. 천천히, 무리하지 않아도 괜찮아요.
          </p>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full h-13 rounded-xl bg-ai-primary text-white text-[15px] font-semibold shadow-sm transition-all active:scale-[0.98] hover:brightness-105"
        >
          홈으로 돌아가기
        </button>

        <button
          onClick={() => navigate('/create')}
          className="w-full h-13 rounded-xl border-[1.5px] border-ai-deep bg-white text-ai-deep text-[15px] font-semibold transition-all active:scale-[0.98] hover:bg-ai-bg"
        >
          다른 챌린지 둘러보기
        </button>
      </div>
    </div>
  );
}
