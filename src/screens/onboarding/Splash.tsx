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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bg-gray to-bg-green-tint px-5 relative overflow-hidden">
      {/* Subtle floating accent circles */}
      <div className="absolute top-20 left-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-32 right-10 w-32 h-32 rounded-full bg-yellow/10 blur-3xl" />

      <div className="relative flex flex-col items-center gap-4">
        <img
          src="/logo/symbol.png"
          alt=""
          className="w-24 h-24 drop-shadow-md animate-pulse"
        />
        <img src="/logo/wordmark.png" alt="Shall We" className="h-7 mt-2" />
      </div>
      <p className="absolute bottom-10 text-body-12 text-gray">ver 0.0.1</p>
    </div>
  );
}
