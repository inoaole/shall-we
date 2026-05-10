import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DotPagination } from '@/components/ui/DotPagination';

export default function Intro1() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white px-5 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <img src="/logo/symbol.png" alt="" className="w-24 h-24" />
        <div className="space-y-3">
          <h1 className="text-title-24 text-ink leading-relaxed">
            쉬었음 청년을 위한
            <br />
            AI 감정기록 챌린지 서비스
          </h1>
          <p className="text-body-14 text-gray">
            오늘의 마음을 기록하고, 작은 챌린지로 일상을 채워봐요.
          </p>
        </div>
      </div>
      <DotPagination current={1} total={2} className="mb-10" />
      <Button onClick={() => navigate('/onboarding/intro/2')}>다음</Button>
    </div>
  );
}
