/**
 * Quiz — PHQ-9 9문항 + 선호조사 5축 = 14 step 단일 컴포넌트 (D1+D2).
 *
 * - 단일 라우트 `/check/quiz` + 내부 step state (URL param X)
 * - 데이터 주도 (data/phq9-questions.ts + data/preference-axes.ts)
 * - 마지막 step에서 SET_PHQ9 + SET_PREFERENCE dispatch + replace navigate
 * - 답 안 한 채로 다음 비활성, 이전 시 답 유지
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { phq9Questions } from '@/data/phq9-questions';
import { preferenceAxes } from '@/data/preference-axes';
import { useApp } from '@/store/AppContext';
import { score, level } from '@/utils/phq9';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepPagination } from '@/components/ui/StepPagination';
import { RadioOption } from '@/components/ui/RadioOption';
import { PoleChoice } from '@/components/ui/PoleChoice';

const STEPS = [...phq9Questions, ...preferenceAxes]; // 9 + 5 = 14
const TOTAL = STEPS.length;

type AnswerMap = Record<string, number | string>;

export default function Quiz() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const step = STEPS[stepIdx];
  const value = answers[step.id];
  const canNext = value !== undefined;
  const isLast = stepIdx === TOTAL - 1;

  const handleAnswer = (v: number | string) => {
    setAnswers({ ...answers, [step.id]: v });
  };

  const handlePrev = () => {
    if (stepIdx === 0) {
      navigate(-1);
    } else {
      setStepIdx(stepIdx - 1);
    }
  };

  const handleNext = () => {
    if (!canNext) return;

    if (isLast) {
      // 14 step 완료 → dispatch + analyzing
      const phq9Answers = phq9Questions.map((q) => Number(answers[q.id]));
      const s = score(phq9Answers);
      dispatch({
        type: 'SET_PHQ9',
        payload: { answers: phq9Answers, score: s, level: level(s) },
      });
      const pref: Record<string, string> = {};
      preferenceAxes.forEach((a) => {
        pref[a.category!] = String(answers[a.id]);
      });
      dispatch({ type: 'SET_PREFERENCE', payload: pref });

      navigate('/check/analyzing', { replace: true });
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  // Layout: PHQ-9 step과 preference step이 시각적으로 다름
  const isPreference = step.type === 'preference';
  // Phase transition label (선호조사 첫 step에만 노출)
  const sectionLabel =
    isPreference && stepIdx === phq9Questions.length ? '챌린지 선호 조사' : null;

  return (
    <div className="min-h-screen flex flex-col bg-bg-gray">
      <header className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="text-2xl text-ink leading-none -ml-1 px-1 active:scale-90 transition-transform"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <StepPagination current={stepIdx + 1} total={TOTAL} />
        <span className="w-6" />
      </header>

      <div className="px-5 mb-10">
        <ProgressBar value={(stepIdx + 1) / TOTAL} />
      </div>

      <div className="px-5 flex-1 flex flex-col">
        {sectionLabel && (
          <p className="text-body-12 text-primary mb-3 font-semibold">{sectionLabel}</p>
        )}
        {isPreference ? (
          <h2 className="text-title-24 text-ink mb-10 text-center">{step.question}</h2>
        ) : (
          <h2 className="text-title-20 text-ink mb-8 whitespace-pre-line leading-relaxed">
            {step.question}
          </h2>
        )}

        <div className={isPreference ? '' : 'space-y-2.5'}>
          {isPreference ? (
            <PoleChoice
              left={{ label: String(step.options[0].label), value: String(step.options[0].value) }}
              right={{ label: String(step.options[1].label), value: String(step.options[1].value) }}
              value={value as string | undefined}
              onChange={handleAnswer}
            />
          ) : (
            step.options.map((opt) => (
              <RadioOption
                key={String(opt.value)}
                label={opt.label}
                selected={value === opt.value}
                onClick={() => handleAnswer(opt.value)}
              />
            ))
          )}
        </div>

        <div className="flex-1" />

        <div className="flex gap-2 pb-8 pt-6">
          <Button variant="secondary" size="pair-prev" onClick={handlePrev}>
            이전
          </Button>
          <Button size="pair-next" disabled={!canNext} onClick={handleNext}>
            {isLast ? '결과 보기' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
}
