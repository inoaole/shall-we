/**
 * EmptyState — 빈 상태 카드. 차가운 "no items" 안티패턴 회피 (Krug warmth).
 *
 * v0.0.5: Home / PostFeed / Diary 중복 추출 → 공용.
 * v0.2.2: 기본 아이콘 (Sparkles, bg-green-tint 원형) + 패딩/타이포 폴리시.
 */

import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  message: string;
  action?: { label: string; onClick: () => void };
  icon?: ReactNode;
}

export function EmptyState({ message, action, icon }: Props) {
  const iconNode = icon ?? <Sparkles size={24} className="text-primary" strokeWidth={1.75} />;
  return (
    <div className="bg-white rounded-xl border border-gray/15 p-8 text-center">
      <div className="mb-4 flex justify-center">
        <div className="w-12 h-12 rounded-full bg-bg-green-tint flex items-center justify-center">
          {iconNode}
        </div>
      </div>
      <p className="text-body-14 text-ink/75 mb-4 leading-relaxed">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-subtitle-16 text-primary active:scale-95 transition-transform"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
