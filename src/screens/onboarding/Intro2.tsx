import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DotPagination } from '@/components/ui/DotPagination';

export default function Intro2() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white px-5 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <img src="/logo/symbol.png" alt="" className="w-24 h-24" />
        <h1 className="text-title-24 text-ink leading-relaxed">
          먼저 무기력 검사를
          <br />
          진행해요
        </h1>
      </div>
      <DotPagination current={2} total={2} className="mb-10" />
      <Button onClick={() => navigate('/signup')}>다음</Button>
    </div>
  );
}
