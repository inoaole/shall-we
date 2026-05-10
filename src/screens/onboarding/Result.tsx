import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { levelMessage, SUICIDE_PREVENTION } from '@/data/result-messages';

const levelStyle: Record<string, { bg: string; text: string; ring: string }> = {
  '없음': { bg: 'bg-bg-green-tint', text: 'text-primary',  ring: 'ring-primary/30' },
  '낮음': { bg: 'bg-bg-green-tint', text: 'text-primary',  ring: 'ring-primary/30' },
  '중간': { bg: 'bg-yellow/40',     text: 'text-gold',     ring: 'ring-gold/30' },
  '높음': { bg: 'bg-yellow/60',     text: 'text-gold',     ring: 'ring-gold/40' },
};

export default function Result() {
  const navigate = useNavigate();
  const { state } = useApp();

  const lvl = state.phq9?.level ?? '낮음';
  const score9 = state.phq9?.answers[8] ?? 0;
  const showSuicideInfo = SUICIDE_PREVENTION.enabled && score9 >= 1;
  const lvlStyle = levelStyle[lvl];

  return (
    <div className="min-h-screen flex flex-col px-5 pt-10 pb-10 bg-bg-gray">
      <p className="text-body-12 text-primary text-center font-semibold tracking-wide">
        ✓ 결과 분석 완료
      </p>

      <div className="mt-10 mb-10 text-center space-y-4">
        <p className="text-body-14 text-gray">당신의 무기력 정도는</p>
        <div
          className={`mx-auto inline-flex items-baseline gap-2 px-7 py-4 rounded-2xl ${lvlStyle.bg} ring-1 ${lvlStyle.ring} shadow-sm`}
        >
          <span className={`text-[40px] leading-none font-bold ${lvlStyle.text}`}>{lvl}</span>
          <span className="text-subtitle-16 text-ink">입니다</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-subtitle-16 text-ink text-center whitespace-pre-line leading-relaxed">
          {levelMessage[lvl]}
        </p>
      </div>

      {showSuicideInfo && (
        <div className="mt-8 p-4 bg-white rounded-xl border-[1.5px] border-primary/30 shadow-sm">
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
