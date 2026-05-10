import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { notify } from '@/utils/notify';

export default function Intro2() {
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
    <div className="min-h-screen flex flex-col px-5 pt-12 pb-10 bg-gradient-to-b from-bg-gray to-bg-green-tint">
      <div className="flex flex-col items-center text-center gap-8 mt-12">
        <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
          <img src="/logo/symbol.png" alt="" className="w-20 h-20" />
        </div>
        <h1 className="text-title-24 text-ink leading-relaxed">
          먼저 무기력 검사를<br />진행해요
        </h1>
        <img src="/logo/wordmark.png" alt="Shall We" className="h-6 mt-2" />
      </div>
      <div className="flex-1" />
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
