import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { levelMessage, SUICIDE_PREVENTION } from '@/data/result-messages';

const levelColor: Record<string, string> = {
  '없음': 'text-primary',
  '낮음': 'text-primary',
  '중간': 'text-gold',
  '높음': 'text-gold',
};

export default function Result() {
  const navigate = useNavigate();
  const { state } = useApp();

  const lvl = state.phq9?.level ?? '낮음';
  const score9 = state.phq9?.answers[8] ?? 0;
  const showSuicideInfo = SUICIDE_PREVENTION.enabled && score9 >= 1;

  return (
    <div className="min-h-screen flex flex-col px-5 pt-12 pb-10 bg-bg-gray">
      <div className="text-center mb-6">
        <p className="text-body-14 text-gray">결과 분석 완료</p>
      </div>

      <div className="text-center mb-12">
        <p className="text-title-20 text-ink leading-relaxed">
          당신의 무기력 정도는
        </p>
        <p className="text-title-24 text-ink mt-2">
          <span className={levelColor[lvl]}>{lvl}</span> 입니다
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray/15 shadow-sm p-6">
        <p className="text-body-14 text-ink text-center whitespace-pre-line leading-relaxed">
          {levelMessage[lvl]}
        </p>
      </div>

      {showSuicideInfo && (
        <div className="mt-4 p-4 bg-white rounded-xl border-[1.5px] border-primary/30">
          <p className="text-body-14 text-ink mb-3">{SUICIDE_PREVENTION.message}</p>
          <a
            href={`tel:${SUICIDE_PREVENTION.hotline}`}
            className="inline-flex items-center gap-2 text-subtitle-16 text-primary"
          >
            <Phone size={16} />
            {SUICIDE_PREVENTION.hotline} {SUICIDE_PREVENTION.hotlineLabel}
          </a>
          <p className="text-body-12 text-gray mt-1">{SUICIDE_PREVENTION.caption}</p>
        </div>
      )}

      <div className="flex-1" />

      <div className="space-y-3">
        <Button variant="secondary" onClick={() => navigate('/home')}>
          다른 사람들의 챌린지를 구경하고 올래요
        </Button>
        <Button onClick={() => navigate('/create')}>챌린지 시작</Button>
      </div>
    </div>
  );
}
