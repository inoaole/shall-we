/**
 * DiaryWrite — AI 다이어리 작성 흐름.
 *
 * Phase state pattern (D1, Quiz와 동일):
 *   write     → 3 textarea 답 입력 + "AI 감정 분석 보기"
 *   analyzing → 1.5초 "마음을 읽고 있어요" → 1.5초 "따뜻한 피드백을 준비할게요"
 *   result    → AI 감정 분석 + 응원 + 추천 챌린지 + 도움됨/공감안됨 + 홈으로
 *
 * 결과 화면에서 "홈으로 돌아가기" 시점에 ADD_DIARY dispatch (작성 중 이탈 = 미저장).
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, type DiaryEntry, type Mood } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { BackHeader } from '@/components/layout/BackHeader';
import { MoodSlider, moodFromScore } from '@/components/ui/MoodSlider';
import { diaryPrompts } from '@/data/diary-prompts';
import { pickFeedback, recommendByMood } from '@/data/ai-feedback';

type Phase = 'write' | 'analyzing' | 'result';

const ANALYZING_STAGE_MS = 1500;
const moodLabelKo: Record<Mood, string> = {
  positive: '긍정적',
  neutral: '담담함',
  negative: '힘듦',
};

export default function DiaryWrite() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [phase, setPhase] = useState<Phase>('write');
  const [moodScore, setMoodScore] = useState(50);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [analyzingStage, setAnalyzingStage] = useState<0 | 1>(0);
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const stage1Timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stage2Timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (stage1Timer.current) clearTimeout(stage1Timer.current);
      if (stage2Timer.current) clearTimeout(stage2Timer.current);
    },
    [],
  );

  const allAnswered =
    answers.q1.trim().length > 0 && answers.q2.trim().length > 0 && answers.q3.trim().length > 0;

  const handleAnalyze = () => {
    if (!allAnswered) return;
    setPhase('analyzing');
    setAnalyzingStage(0);

    stage1Timer.current = setTimeout(() => {
      setAnalyzingStage(1);
      stage2Timer.current = setTimeout(() => {
        const dateIso = new Date().toISOString();
        const mood: Mood = moodFromScore(moodScore);
        const newEntry: DiaryEntry = {
          id: crypto.randomUUID(),
          date: dateIso,
          answers,
          mood,
          aiFeedback: pickFeedback(mood, dateIso),
          recommendedChallenge: recommendByMood[mood],
          helpful: null,
        };
        setEntry(newEntry);
        setPhase('result');
      }, ANALYZING_STAGE_MS);
    }, ANALYZING_STAGE_MS);
  };

  const handleHome = () => {
    if (entry) {
      dispatch({ type: 'ADD_DIARY', payload: { ...entry, helpful } });
    }
    navigate('/home');
  };

  const handleRecommend = () => {
    if (entry) {
      dispatch({ type: 'ADD_DIARY', payload: { ...entry, helpful } });
    }
    navigate('/create');
  };

  /* ─── write ─── */
  if (phase === 'write') {
    return (
      <div className="min-h-screen bg-bg-gray pb-10">
        <BackHeader title="AI 다이어리" onBack={() => navigate(-1)} sticky />
        <div className="px-5 pt-6 space-y-6">
          <div>
            <h1 className="text-title-20 text-ink">오늘의 기록</h1>
          </div>

          {/* Mood slider — Figma 40000663:1050 */}
          <div className="bg-white rounded-2xl border border-gray/15 shadow-sm p-5">
            <p className="text-body-14 text-ink font-medium mb-4">
              오늘 하루는 어떤 감정이었나요?
            </p>
            <MoodSlider value={moodScore} onChange={setMoodScore} />
          </div>

          {diaryPrompts.map((p) => (
            <div key={p.id} className="space-y-2">
              <label htmlFor={p.id} className="text-body-14 text-ink font-medium block">
                {p.label}
              </label>
              <textarea
                id={p.id}
                value={answers[p.id]}
                onChange={(e) => setAnswers({ ...answers, [p.id]: e.target.value })}
                placeholder={p.placeholder}
                rows={4}
                className="w-full bg-white rounded-xl border border-gray/20 p-3 text-body-14 text-ink placeholder:text-gray resize-none focus:border-primary outline-none transition-colors"
              />
            </div>
          ))}
          <div className="pt-2">
            <Button disabled={!allAnswered} onClick={handleAnalyze}>
              AI 감정 분석 보기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── analyzing ─── */
  if (phase === 'analyzing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-gray px-5">
        <img src="/logo/symbol.png" alt="" className="w-20 h-20 mb-6 animate-pulse" />
        <p className="text-title-20 text-ink text-center transition-opacity duration-300">
          {analyzingStage === 0 ? '마음을 읽고 있어요' : '따뜻한 피드백을 준비할게요'}
        </p>
      </div>
    );
  }

  /* ─── result ─── */
  if (!entry) return null;
  return (
    <div className="min-h-screen bg-bg-gray pb-10">
      <BackHeader title="AI 감정 분석" onBack={handleHome} sticky />
      <div className="px-5 pt-4 space-y-5">
        <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-5">
          <p className="text-body-12 text-primary font-medium mb-2">오늘의 감정</p>
          <h2 className="text-title-20 text-ink">{moodLabelKo[entry.mood]}</h2>
        </section>

        <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-5 space-y-3">
          <h3 className="text-subtitle-16 text-ink">AI의 따뜻한 응원</h3>
          <p className="text-body-14 text-ink leading-relaxed whitespace-pre-line">
            {entry.aiFeedback}
          </p>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setHelpful(true)}
              className={`flex-1 h-11 rounded-lg border-[1.5px] text-body-14 transition-all active:scale-[0.97] ${
                helpful === true
                  ? 'bg-bg-green-tint border-primary text-primary'
                  : 'bg-white border-gray/25 text-ink'
              }`}
            >
              도움이 됐어요
            </button>
            <button
              onClick={() => setHelpful(false)}
              className={`flex-1 h-11 rounded-lg border-[1.5px] text-body-14 transition-all active:scale-[0.97] ${
                helpful === false
                  ? 'bg-bg-gray border-gray text-ink'
                  : 'bg-white border-gray/25 text-ink'
              }`}
            >
              공감이 안 돼요
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray/15 shadow-sm p-5 space-y-3">
          <h3 className="text-subtitle-16 text-ink">오늘의 챌린지 추천</h3>
          <p className="text-body-14 text-ink">{entry.recommendedChallenge}</p>
          <Button variant="secondary" onClick={handleRecommend}>
            감정 분석에 맞는 챌린지 추천받기
          </Button>
        </section>

        <Button onClick={handleHome}>홈으로 돌아가기</Button>
      </div>
    </div>
  );
}
