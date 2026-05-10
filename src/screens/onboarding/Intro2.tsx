import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DotPagination } from '@/components/ui/DotPagination';

export default function Intro2() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white px-5 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-title-24 text-ink leading-relaxed">
          먼저 무기력 검사를
          <br />
          진행해요
        </h1>
      </div>
      <DotPagination current={2} total={3} className="mb-10" />
      <Button onClick={() => navigate('/onboarding/intro/3')}>다음</Button>
    </div>
  );
}
