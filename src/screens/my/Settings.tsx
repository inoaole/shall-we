import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { clearStorage } from '@/utils/storage';
import { notify } from '@/utils/notify';
import { BackHeader } from '@/components/layout/BackHeader';

interface RowProps {
  label: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}

function Row({ label, onClick, trailing }: RowProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="w-full px-5 py-4 flex items-center gap-3 active:bg-bg-gray transition-colors disabled:active:bg-transparent text-left"
    >
      <span className="flex-1 text-body-14 text-ink">{label}</span>
      {trailing ?? (onClick && <ChevronRight size={18} className="text-gray" />)}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-body-12 text-gray uppercase tracking-wide px-5 pt-4 pb-1 font-medium">
        {title}
      </h2>
      <div className="bg-white rounded-xl border border-gray/15 mx-5 divide-y divide-gray/10 overflow-hidden">
        {children}
      </div>
    </section>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleLogout = () => {
    if (!confirm('로그아웃 하시겠어요?')) return;
    clearStorage();
    dispatch({ type: 'RESET' });
    navigate('/', { replace: true });
  };

  const handleWithdraw = () => {
    if (!confirm('정말 회원탈퇴 하시겠어요? 모든 데이터가 삭제됩니다.')) return;
    clearStorage();
    dispatch({ type: 'RESET' });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg-gray pb-10">
      <BackHeader title="설정" sticky />

      <Section title="알림">
        <Row label="알림 설정" onClick={() => notify.error('알림 설정은 아직 준비 중이에요.')} />
      </Section>

      <Section title="앱">
        <Row label="이용약관" onClick={() => notify.error('이용약관은 아직 준비 중이에요.')} />
        <Row label="개인정보 처리방침" onClick={() => notify.error('개인정보 처리방침은 아직 준비 중이에요.')} />
        <Row label="버전" trailing={<span className="text-body-12 text-gray">ver 0.2.0</span>} />
      </Section>

      <Section title="계정">
        <Row label="로그아웃" onClick={handleLogout} />
        <Row label="회원탈퇴" onClick={handleWithdraw} />
      </Section>
    </div>
  );
}
