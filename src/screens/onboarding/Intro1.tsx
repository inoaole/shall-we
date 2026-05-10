import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function Intro1() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col px-5 pt-12 pb-10 bg-gradient-to-b from-bg-gray to-bg-green-tint">
      <div className="flex flex-col items-center text-center gap-8 mt-12">
        <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
          <img src="/logo/symbol.png" alt="" className="w-20 h-20" />
        </div>
        <div className="space-y-2">
          <p className="text-body-14 text-primary font-medium">'쉬었음 청년'을 위한</p>
          <h1 className="text-title-24 text-ink leading-relaxed">
            AI 감정기록<br />챌린지 서비스
          </h1>
        </div>
        <img src="/logo/wordmark.png" alt="Shall We" className="h-6 mt-2" />
      </div>
      <div className="flex-1" />
      <Button onClick={() => navigate('/onboarding/intro/2')}>다음</Button>
    </div>
  );
}
