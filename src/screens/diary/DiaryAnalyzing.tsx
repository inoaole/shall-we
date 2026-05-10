import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { moodFromScore } from '@/components/ui/MoodSlider';
import { pickFeedback, recommendByMood } from '@/data/ai-feedback';
import type { DiaryEntry, Mood } from '@/store/AppContext';

type AnalyzeNavState = {
  answers: { q1: string; q2: string; q3: string };
  moodScore: number;
};

const ANALYZING_MS = 2400;

export default function DiaryAnalyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as AnalyzeNavState | null;

  useEffect(() => {
    if (!data) {
      navigate('/diary/write', { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      const dateIso = new Date().toISOString();
      const mood: Mood = moodFromScore(data.moodScore);
      const newEntry: DiaryEntry = {
        id: crypto.randomUUID(),
        date: dateIso,
        answers: data.answers,
        mood,
        aiFeedback: pickFeedback(mood, dateIso),
        recommendedChallenge: recommendByMood[mood],
        helpful: null,
      };
      navigate('/diary/result', { replace: true, state: { entry: newEntry } });
    }, ANALYZING_MS);
    return () => clearTimeout(timer);
  }, [data, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 font-['Inter',sans-serif]"
      style={{
        background:
          'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 60%, #FFFFFF 100%)',
      }}
    >
      <div className="w-16 h-16 rounded-full bg-ai-primary flex items-center justify-center mb-8 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>

      <p className="text-[20px] font-semibold text-ai-deep text-center mb-2 tracking-tight">
        마음을 읽고 있어요
      </p>
      <p className="text-[14px] text-gray-500 text-center mb-8">
        따뜻한 피드백을 준비할게요
      </p>

      <div className="flex items-center gap-2" aria-hidden>
        <span
          className="w-2.5 h-2.5 rounded-full bg-ai-primary inline-block"
          style={{ animation: 'ai-bounce 1.2s infinite ease-in-out' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-ai-primary inline-block"
          style={{ animation: 'ai-bounce 1.2s infinite ease-in-out 0.2s' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-ai-primary inline-block"
          style={{ animation: 'ai-bounce 1.2s infinite ease-in-out 0.4s' }}
        />
      </div>

      <style>{`
        @keyframes ai-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
