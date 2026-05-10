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
  danger?: boolean;
}

function Row({ label, onClick, trailing, danger }: RowProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="w-full bg-gray-soft/60 rounded-md px-4 py-3.5 flex items-center gap-2 active:bg-gray-soft transition-colors disabled:active:bg-gray-soft/60 text-left"
    >
      <span className={`flex-1 text-body-14 ${danger ? 'text-danger' : 'text-ink'}`}>
        {label}
      </span>
      {trailing ?? (onClick && <ChevronRight size={16} className={danger ? 'text-danger' : 'text-gray'} />)}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-[14px] text-ink font-semibold px-1">{title}</h2>
      <div className="space-y-2">{children}</div>
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
    <div className="min-h-screen bg-bg-app pb-10">
      <BackHeader title="설정" sticky />

      <div className="px-5 pt-4 space-y-6">
        <Section title="알림">
          <Row label="알림 설정" onClick={() => notify.error('알림 설정은 아직 준비 중이에요.')} />
        </Section>

        <Section title="앱">
          <Row label="이용약관" onClick={() => notify.error('이용약관은 아직 준비 중이에요.')} />
          <Row label="개인정보 처리방침" onClick={() => notify.error('개인정보 처리방침은 아직 준비 중이에요.')} />
        </Section>

        <Section title="계정">
          <Row label="로그아웃" onClick={handleLogout} />
          <Row label="회원탈퇴" onClick={handleWithdraw} danger />
        </Section>
      </div>
    </div>
  );
}
