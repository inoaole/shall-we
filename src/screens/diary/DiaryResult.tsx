import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, ThumbsDown, Sparkles } from 'lucide-react';
import { useApp, type DiaryEntry } from '@/store/AppContext';
import { format } from 'date-fns';

type ResultNavState = {
  entry: DiaryEntry;
};

type Toast =
  | { kind: 'saved'; date: Date }
  | { kind: 'feedback' };

export default function DiaryResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useApp();
  const data = location.state as ResultNavState | null;

  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!data) {
      navigate('/diary', { replace: true });
      return;
    }
    dispatch({ type: 'ADD_DIARY', payload: data.entry });
    setSaved(true);
    const t: Toast = { kind: 'saved', date: new Date(data.entry.date) };
    setToast(t);
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [data, dispatch, navigate]);

  if (!data) return null;
  const { entry } = data;

  const handleFeedback = (value: boolean) => {
    if (helpful !== null) return;
    setHelpful(value);
    if (saved) {
      dispatch({ type: 'RATE_DIARY', payload: { id: entry.id, helpful: value } });
    }
    setToast({ kind: 'feedback' });
    setTimeout(() => setToast(null), 2200);
  };

  const handleRecommend = () => {
    navigate('/diary/recommend', { state: { entry } });
  };

  const toastText =
    toast?.kind === 'saved'
      ? `${format(toast.date, 'M월 d일')}의 일기가 추가되었습니다`
      : toast?.kind === 'feedback'
      ? '더 따뜻하게 마음을 알아주는 AI가 될게요'
      : '';

  return (
    <div
      className="min-h-screen pb-10 font-['Inter',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 240px, #FFFFFF 100%)',
      }}
    >
      <header className="h-14 px-5 flex items-center sticky top-0 z-20 bg-transparent">
        <button
          onClick={() => navigate('/diary')}
          className="p-1 -ml-1 active:scale-90 transition-transform"
          aria-label="닫기"
        >
          <ChevronLeft size={24} strokeWidth={2} className="text-ai-deep" />
        </button>
        <h1 className="text-[18px] font-semibold text-ai-deep ml-1">
          AI 감정 분석
        </h1>
      </header>

      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-30 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 max-w-[360px] w-[90%] animate-[ai-toast_0.25s_ease-out]">
          <p className="text-[13px] text-ai-deep text-center font-medium">
            {toastText}
          </p>
        </div>
      )}

      <div className="px-5 pt-2 space-y-4">
        <div
          className="rounded-2xl p-5 border border-white/60 shadow-sm"
          style={{
            background:
              'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #FFFFFF 100%)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-ai-primary flex items-center justify-center">
              <Sparkles size={16} className="text-white" strokeWidth={2.25} />
            </div>
            <h2 className="text-[16px] font-semibold text-ai-deep">
              AI의 따뜻한 응원
            </h2>
          </div>
          <p className="text-[14px] leading-[1.6] text-[#1e2939] whitespace-pre-line">
            {entry.aiFeedback}
          </p>

          <div className="flex gap-2 mt-5">
            <button
              onClick={() => handleFeedback(true)}
              disabled={helpful !== null}
              className={`flex-1 h-11 rounded-xl text-[13px] font-medium inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] disabled:active:scale-100 ${
                helpful === true
                  ? 'bg-ai-primary text-white border border-ai-primary'
                  : 'bg-white text-[#364153] border border-[#e5e7eb] hover:border-ai-primary/40'
              }`}
              aria-pressed={helpful === true}
            >
              <Heart
                size={14}
                strokeWidth={2}
                fill={helpful === true ? 'currentColor' : 'none'}
              />
              도움됐어요
            </button>
            <button
              onClick={() => handleFeedback(false)}
              disabled={helpful !== null}
              className={`flex-1 h-11 rounded-xl text-[13px] font-medium inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] disabled:active:scale-100 ${
                helpful === false
                  ? 'bg-[#364153] text-white border border-[#364153]'
                  : 'bg-white text-[#364153] border border-[#e5e7eb] hover:border-ai-deep/30'
              }`}
              aria-pressed={helpful === false}
            >
              <ThumbsDown size={14} strokeWidth={2} />
              공감안돼요
            </button>
          </div>
        </div>

        <button
          onClick={handleRecommend}
          className="w-full h-13 rounded-xl border-[1.5px] border-ai-deep bg-white text-ai-deep text-[15px] font-semibold transition-all active:scale-[0.98] hover:bg-ai-bg"
        >
          감정 분석에 맞는 챌린지 추천받기
        </button>
      </div>

      <style>{`
        @keyframes ai-toast {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
