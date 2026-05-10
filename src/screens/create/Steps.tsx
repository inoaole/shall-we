/**
 * Steps — 챌린지 만들기 5단계 wizard.
 *
 * D2: 단일 라우트 /create/new + 내부 step state.
 * Step 1 제목 / 2 기간 (드롭다운 v2) / 3 미션 / 4 기대효과 / 5 완료 모달
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BackHeader } from '@/components/layout/BackHeader';
import { uuid } from '@/utils/id';
import { notify } from '@/utils/notify';
import { ChevronDown } from 'lucide-react';

const PERIOD_OPTIONS: Array<{ label: string; value: number | 'custom' }> = [
  { label: '직접입력', value: 'custom' },
  { label: '3일', value: 3 },
  { label: '7일', value: 7 },
  { label: '21일', value: 21 },
  { label: '28일', value: 28 },
];
const TOTAL = 4;

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
  const [periodOpen, setPeriodOpen] = useState(false);
  const [periodLabel, setPeriodLabel] = useState<string | null>(null);
  const [customMode, setCustomMode] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<FormData>({ title: '', days: null, mission: '', effect: '' });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!periodOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPeriodOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [periodOpen]);

  const canNext = (): boolean => {
    switch (step) {
      case 1: return data.title.trim().length > 0;
      case 2: return data.days !== null && data.days > 0;
      case 3: return data.mission.trim().length > 0;
      case 4: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step === 4) {
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
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  const selectPeriod = (opt: (typeof PERIOD_OPTIONS)[number]) => {
    if (opt.value === 'custom') {
      setCustomMode(true);
      setPeriodLabel('직접입력');
      setData({ ...data, days: null });
    } else {
      setCustomMode(false);
      setPeriodLabel(opt.label);
      setData({ ...data, days: opt.value });
    }
    setPeriodOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-app">
      <BackHeader title="챌린지 만들기" onBack={handlePrev} sticky />
      <div className="px-5 mb-8">
        <ProgressBar value={step / TOTAL} />
      </div>

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

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setPeriodOpen((v) => !v)}
                aria-expanded={periodOpen}
                className="w-full h-12 px-4 rounded-md bg-white border-[1.5px] border-gray/25 flex items-center justify-between text-subtitle-16 text-ink active:scale-[0.99] transition-transform"
              >
                <span className={periodLabel ? 'text-ink' : 'text-gray/70'}>
                  {periodLabel ?? '선택'}
                </span>
                <ChevronDown size={18} className="text-gray" />
              </button>

              {periodOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-gray/25 rounded-md shadow-md z-10 overflow-hidden">
                  {PERIOD_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => selectPeriod(opt)}
                      className="w-full h-12 px-4 flex items-center text-body-14 text-ink hover:bg-bg-gray transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
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
            <textarea
              value={data.effect}
              onChange={(e) => setData({ ...data, effect: e.target.value })}
              placeholder="예) 상쾌한 아침을 시작하고 싶어요"
              autoFocus
              rows={6}
              className="w-full px-4 py-3 rounded-md bg-bg-gray border-[1.5px] border-gray-soft text-body-14 text-ink placeholder:text-gray/70 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </>
        )}

        <div className="flex-1" />

        <div className="flex gap-2 pb-8 pt-6">
          <Button variant="secondary" size="pair-prev" onClick={handlePrev}>이전</Button>
          <Button size="pair-next" disabled={!canNext()} onClick={handleNext}>
            {step === 4 ? '완료' : '다음'}
          </Button>
        </div>
      </div>

      {done && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ backgroundColor: '#969494' }}
          role="presentation"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-6"
            role="dialog"
            aria-modal="true"
            aria-label="챌린지 추가 완료"
          >
            <p className="text-title-20 text-ink text-center leading-relaxed mb-6">
              [{data.title}]<br />챌린지가 추가되었습니다!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="w-full h-13 rounded-lg bg-gray-muted text-white text-subtitle-16 active:scale-[0.97] transition-all"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
