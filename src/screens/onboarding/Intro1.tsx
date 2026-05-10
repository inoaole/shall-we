import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DotPagination } from '@/components/ui/DotPagination';

export default function Intro1() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white px-5 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-body-14 text-primary font-medium mb-3">
          '쉬었음 청년'을 위한
        </p>
        <h1 className="text-title-24 text-ink leading-relaxed">
          AI 감정기록
          <br />
          챌린지 서비스
        </h1>
      </div>
      <DotPagination current={1} total={3} className="mb-10" />
      <Button onClick={() => navigate('/onboarding/intro/2')}>다음</Button>
    </div>
  );
}
