/**
 * Quiz — PHQ-9 9문항 (자동 진행) + 챌린지 선호조사 5축 (단일 화면).
 *
 * - PHQ-9: 1문항씩, 선택 250ms 후 자동 진행. 하단 CTA 없음 (헤더 ← 만).
 * - 선호조사: 5축을 한 화면에 노출, 모두 답하면 "결과 보기" 활성.
 * - 단일 라우트 `/check/quiz` + 내부 phase state.
 */

import { useState, useRef, useEffect } from 'react';
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
import { BackHeader } from '@/components/layout/BackHeader';

const PHQ9_TOTAL = phq9Questions.length;
const ADVANCE_MS = 250;

type Phase = 'phq9' | 'preference';

export default function Quiz() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [phase, setPhase] = useState<Phase>('phq9');
  const [phq9Idx, setPhq9Idx] = useState(0);
  const [phq9Map, setPhq9Map] = useState<Record<string, number>>({});
  const [prefMap, setPrefMap] = useState<Record<string, string>>({});
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  const handlePhq9Answer = (v: number) => {
    const q = phq9Questions[phq9Idx];
    setPhq9Map((m) => ({ ...m, [q.id]: v }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      if (phq9Idx === PHQ9_TOTAL - 1) {
        setPhase('preference');
      } else {
        setPhq9Idx((i) => i + 1);
      }
    }, ADVANCE_MS);
  };

  const handlePrefAnswer = (axisId: string, v: string) => {
    setPrefMap((m) => ({ ...m, [axisId]: v }));
  };

  const handlePrev = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (phase === 'preference') {
      setPhase('phq9');
      return;
    }
    if (phq9Idx === 0) {
      navigate(-1);
    } else {
      setPhq9Idx((i) => i - 1);
    }
  };

  const handleSubmit = () => {
    const answers = phq9Questions.map((q) => Number(phq9Map[q.id]));
    const s = score(answers);
    dispatch({
      type: 'SET_PHQ9',
      payload: { answers, score: s, level: level(s) },
    });
    const pref: Record<string, string> = {};
    preferenceAxes.forEach((a) => {
      pref[a.category!] = String(prefMap[a.id]);
    });
    dispatch({ type: 'SET_PREFERENCE', payload: pref });
    navigate('/check/analyzing', { replace: true });
  };

  if (phase === 'phq9') {
    const q = phq9Questions[phq9Idx];
    const value = phq9Map[q.id];
    const stepNumber = phq9Idx + 1;
    return (
      <div className="min-h-screen flex flex-col bg-bg-gray">
        <BackHeader
          onBack={handlePrev}
          rightSlot={<StepPagination current={stepNumber} total={PHQ9_TOTAL} />}
          sticky
        />
        <div className="px-5 pt-2 pb-8">
          <ProgressBar value={stepNumber / PHQ9_TOTAL} />
        </div>
        <div className="px-5 flex-1 flex flex-col">
          <h2 className="text-title-20 text-ink mb-10 whitespace-pre-line leading-relaxed">
            {q.question}
          </h2>
          <div className="space-y-2.5">
            {q.options.map((opt) => (
              <RadioOption
                key={String(opt.value)}
                label={opt.label}
                selected={value === opt.value}
                onClick={() => handlePhq9Answer(Number(opt.value))}
              />
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex gap-2 pt-6 pb-8">
            <Button variant="secondary" size="pair-prev" onClick={handlePrev}>
              이전
            </Button>
            <div className="flex-[2]" />
          </div>
        </div>
      </div>
    );
  }

  const allAnswered = preferenceAxes.every((a) => prefMap[a.id] !== undefined);
  return (
    <div className="min-h-screen flex flex-col bg-bg-gray">
      <BackHeader onBack={handlePrev} title="챌린지 선호 조사" sticky />
      <div className="px-5 pt-2 pb-8 flex-1 flex flex-col">
        <p className="text-body-14 text-gray mb-6">
          끌리는 쪽을 골라주세요.
        </p>
        <div className="space-y-4">
          {preferenceAxes.map((axis) => (
            <div
              key={axis.id}
              className="bg-white rounded-xl border border-gray/15 p-5"
            >
              <p className="text-body-12 text-gray mb-3 font-medium">
                {axis.category}
              </p>
              <PoleChoice
                left={{
                  label: String(axis.options[0].label),
                  value: String(axis.options[0].value),
                }}
                right={{
                  label: String(axis.options[1].label),
                  value: String(axis.options[1].value),
                }}
                value={prefMap[axis.id]}
                onChange={(v) => handlePrefAnswer(axis.id, v)}
              />
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 pt-8">
          <Button variant="secondary" size="pair-prev" onClick={handlePrev}>
            이전
          </Button>
          <Button size="pair-next" disabled={!allAnswered} onClick={handleSubmit}>
            결과 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
