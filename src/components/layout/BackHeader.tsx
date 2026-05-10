/**
 * BackHeader — 모달/온보딩/Wizard 화면용 공용 헤더.
 *
 * v0.0.5 cleanup: 8 화면에서 inline copy-paste 되어있던 ← 버튼 + 타이틀
 * 패턴을 단일 컴포넌트로 추출. design.md §5.7 헤더 spec 일치.
 */

import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  onBack?: () => void;
  /** 흰 배경 + 보더 + sticky (탭 화면 외) */
  sticky?: boolean;
  rightSlot?: React.ReactNode;
}

export function BackHeader({ title, onBack, sticky = false, rightSlot }: Props) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <header
      className={`h-14 px-5 flex items-center gap-2 ${
        sticky ? 'bg-white border-b border-gray/10 sticky top-0 z-10' : ''
      }`}
    >
      <button
        onClick={handleBack}
        className="p-1 -ml-1 active:scale-90 transition-transform"
        aria-label="뒤로가기"
      >
        <ChevronLeft size={24} strokeWidth={2} className="text-ink" />
      </button>
      {title && <h1 className="text-title-20 text-ink">{title}</h1>}
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </header>
  );
}
