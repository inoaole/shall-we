import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';

const SPLASH_MS = 2000;

export default function Splash() {
  const navigate = useNavigate();
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!state.user.nickname) {
        navigate('/onboarding/intro/1', { replace: true });
      } else if (!state.phq9) {
        navigate('/check/quiz', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }, SPLASH_MS);
    return () => clearTimeout(timer);
  }, [navigate, state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-5 relative">
      <div className="flex flex-col items-center gap-6">
        <img
          src="/logo/symbol.png"
          alt=""
          className="w-24 h-24 animate-pulse"
        />
        <h1
          className="text-title-24 text-white"
          style={{
            WebkitTextStroke: '1.5px white',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.02em',
          }}
        >
          Shall We
        </h1>
      </div>
      <p className="absolute bottom-10 text-body-12 text-white/80">ver 0.3.0</p>
    </div>
  );
}
