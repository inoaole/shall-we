import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MoodSlider } from '@/components/ui/MoodSlider';
import { diaryPrompts } from '@/data/diary-prompts';

export default function DiaryWrite() {
  const navigate = useNavigate();
  const [moodScore, setMoodScore] = useState(50);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });

  const allAnswered =
    answers.q1.trim().length > 0 &&
    answers.q2.trim().length > 0 &&
    answers.q3.trim().length > 0;

  const handleAnalyze = () => {
    if (!allAnswered) return;
    navigate('/diary/analyzing', { state: { answers, moodScore } });
  };

  return (
    <div
      className="min-h-screen pb-10 font-['Inter',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 200px, #FFFFFF 100%)',
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
          AI 감정 다이어리
        </h1>
      </header>

      <div className="px-5 pt-2 space-y-5">
        <div>
          <h2 className="text-[22px] font-semibold text-ai-deep tracking-tight">
            오늘의 기록
          </h2>
          <p className="text-[13px] text-[#4a5565] mt-1">
            오늘 하루를 천천히 돌아볼 시간이에요.
          </p>
        </div>

        <div
          className="rounded-2xl p-5 border border-white/60 shadow-sm"
          style={{
            background:
              'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
          }}
        >
          <p className="text-[14px] text-ai-deep font-medium mb-4">
            오늘 하루는 어떤 감정이었나요?
          </p>
          <MoodSlider value={moodScore} onChange={setMoodScore} />
        </div>

        {diaryPrompts.map((p) => (
          <div key={p.id} className="space-y-2">
            <label
              htmlFor={p.id}
              className="text-[14px] font-medium text-ai-deep block"
            >
              {p.label}
            </label>
            <textarea
              id={p.id}
              value={answers[p.id]}
              onChange={(e) =>
                setAnswers({ ...answers, [p.id]: e.target.value })
              }
              placeholder={p.placeholder}
              rows={4}
              className="w-full bg-white rounded-xl border border-[#e5e7eb] p-3 text-[14px] text-[#1e2939] placeholder:text-[#99a1af] resize-none focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 outline-none transition-colors font-['Inter',sans-serif]"
            />
          </div>
        ))}

        <div className="pt-2">
          <button
            disabled={!allAnswered}
            onClick={handleAnalyze}
            className="w-full h-13 rounded-xl bg-ai-primary text-white text-[15px] font-semibold shadow-sm transition-all active:scale-[0.98] hover:brightness-105 disabled:bg-[#e5e7eb] disabled:text-[#99a1af] disabled:shadow-none disabled:active:scale-100"
          >
            AI 감정 분석 보기
          </button>
        </div>
      </div>
    </div>
  );
}
