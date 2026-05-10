import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { DotPagination } from '@/components/ui/DotPagination';
import { notify } from '@/utils/notify';

export default function Intro3() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleGoogle = () => {
    dispatch({
      type: 'SIGNUP',
      payload: { nickname: '데모유저', email: 'demo@shallwe.app' },
    });
    notify.demoMode();
    navigate('/check/quiz', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-5 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <img src="/logo/symbol.png" alt="" className="w-20 h-20 mb-6" />
        <h1 className="text-title-24 text-ink leading-relaxed">
          지금 시작해볼까요?
        </h1>
      </div>
      <DotPagination current={3} total={3} className="mb-8" />
      <div className="space-y-3">
        <Button onClick={() => navigate('/signup')}>가입하기</Button>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray/25" />
          <span className="text-body-12 text-gray">또는</span>
          <div className="flex-1 h-px bg-gray/25" />
        </div>
        <Button
          variant="social"
          leftIcon={<span className="font-bold text-lg">G</span>}
          onClick={handleGoogle}
        >
          구글로 계속
        </Button>
      </div>
    </div>
  );
}
