import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { levelMessage } from '@/data/result-messages';

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

  return (
    <div className="min-h-screen flex flex-col px-5 pt-16 pb-10 bg-bg-gray">
      <div className="text-center mb-10">
        <p className="text-title-20 text-ink leading-relaxed">
          결과 분석 완료!
        </p>
        <p className="text-title-20 text-ink leading-relaxed mt-2">
          무기력정도는 <span className={`${levelColor[lvl]} font-bold`}>{lvl}</span>
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray/15 shadow-sm p-6">
        <p className="text-body-14 text-ink text-center whitespace-pre-line leading-relaxed">
          {levelMessage[lvl]}
        </p>
      </div>

      <div className="flex-1" />

      <div className="space-y-3">
        <Button onClick={() => navigate('/create')}>챌린지 시작</Button>
        <Button variant="secondary" onClick={() => navigate('/home')}>
          다른 사람들 챌린지 구경
        </Button>
      </div>
    </div>
  );
}
