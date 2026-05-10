import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Loading } from '@/components/ui/Loading';

const ANALYZING_MS = 1500;

export default function Analyzing() {
  const navigate = useNavigate();
  const { state } = useApp();
  const nickname = state.user.nickname || 'oo';

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/check/result', { replace: true });
    }, ANALYZING_MS);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-gray gap-8 px-5">
      <img src="/logo/symbol.png" alt="" className="w-20 h-20" />
      <p className="text-title-20 text-ink text-center">
        {nickname}님의 마음을<br />읽고 있어요!
      </p>
      <Loading />
    </div>
  );
}
