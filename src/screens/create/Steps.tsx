/**
 * Steps — 챌린지 만들기 5단계 wizard.
 *
 * D2: 단일 라우트 /create/new + 내부 step state.
 * Step 1 제목 / 2 기간 / 3 미션 / 4 기대효과 / 5 완료
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PeriodPill } from '@/components/ui/PeriodPill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BackHeader } from '@/components/layout/BackHeader';
import { uuid } from '@/utils/id';
import { notify } from '@/utils/notify';
import { Sparkles } from 'lucide-react';

const PERIODS = [3, 7, 14, 21, 28];
const TOTAL = 5;

interface FormData {
  title: string;
  days: number | null;
  mission: string;
  effect: string;
}

export default function Steps() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [customMode, setCustomMode] = useState(false);
  const [data, setData] = useState<FormData>({ title: '', days: null, mission: '', effect: '' });

  const canNext = (): boolean => {
    switch (step) {
      case 1: return data.title.trim().length > 0;
      case 2: return data.days !== null && data.days > 0;
      case 3: return data.mission.trim().length > 0;
      case 4: return true; // effect는 옵션
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step === 4) {
      // Save and show completion screen
      dispatch({
        type: 'ADD_CHALLENGE',
        payload: {
          id: uuid(),
          title: data.title.trim(),
          durationDays: data.days!,
          mission: data.mission.trim(),
          effect: data.effect.trim(),
          startedAt: new Date().toISOString(),
        },
      });
      notify.challengeAdded(data.title);
      setStep(5);
    } else if (step === 5) {
      navigate('/home');
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1) navigate(-1);
    else if (step === 5) navigate('/home');
    else setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-gray">
      {step < 5 && (
        <>
          <BackHeader title="챌린지 만들기" onBack={handlePrev} />
          <div className="px-5 mb-8">
            <ProgressBar value={step / TOTAL} />
          </div>
        </>
      )}

      <div className="px-5 flex-1 flex flex-col">
        {step === 1 && (
          <>
            <h2 className="text-title-24 text-ink mb-8">어떤 챌린지를<br />해볼까요?</h2>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="예) 아침 6시 기상"
              autoFocus
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-title-24 text-ink mb-2">며칠 동안<br />진행할까요?</h2>
            <p className="text-body-14 text-gray mb-8">가볍게 7일부터 시작해보는 건 어때요?</p>
            <div className="grid grid-cols-2 gap-2">
              {PERIODS.map((d) => (
                <PeriodPill
                  key={d}
                  label={`${d}일`}
                  selected={!customMode && data.days === d}
                  onClick={() => {
                    setCustomMode(false);
                    setData({ ...data, days: d });
                  }}
                />
              ))}
              <PeriodPill
                label="직접입력"
                selected={customMode}
                onClick={() => {
                  setCustomMode(true);
                  setData({ ...data, days: null });
                }}
              />
            </div>
            {customMode && (
              <div className="mt-3">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={365}
                  placeholder="1~365일"
                  value={data.days ?? ''}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setData({ ...data, days: isNaN(v) ? null : v });
                  }}
                  autoFocus
                />
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-title-24 text-ink mb-8">하루에 할당할<br />미션은 무엇인가요?</h2>
            <Input
              value={data.mission}
              onChange={(e) => setData({ ...data, mission: e.target.value })}
              placeholder="예) 아침 6시 기상"
              autoFocus
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-title-24 text-ink mb-2">이루고 싶은 것 /<br />기대 효과</h2>
            <p className="text-body-14 text-gray mb-8">이 챌린지를 통해 무엇을 얻고 싶나요?</p>
            <Input
              value={data.effect}
              onChange={(e) => setData({ ...data, effect: e.target.value })}
              placeholder="예) 상쾌한 아침을 시작하고 싶어요"
              autoFocus
            />
          </>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center pt-32 text-center px-2">
            <div className="w-20 h-20 rounded-full bg-bg-green-tint flex items-center justify-center mb-6">
              <Sparkles size={36} className="text-primary" />
            </div>
            <p className="text-title-20 text-ink mb-2 leading-relaxed">
              '{data.title}'<br />챌린지가 추가되었습니다!
            </p>
            <p className="text-body-14 text-gray mt-4 leading-relaxed">
              시작이 반이에요.<br />앞으로 멋지게 해낼 당신을 응원합니다!
            </p>
          </div>
        )}

        <div className="flex-1" />

        {step < 5 ? (
          <div className="flex gap-2 pb-8 pt-6">
            <Button variant="secondary" size="pair-prev" onClick={handlePrev}>이전</Button>
            <Button size="pair-next" disabled={!canNext()} onClick={handleNext}>
              {step === 4 ? '완료' : '다음'}
            </Button>
          </div>
        ) : (
          <div className="pb-8 pt-6">
            <Button onClick={() => navigate('/home')}>홈으로 이동</Button>
          </div>
        )}
      </div>
    </div>
  );
}
