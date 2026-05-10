/**
 * EmptyState — 빈 상태용 공용 카드.
 *
 * v0.0.5 cleanup: Home / PostFeed / Diary에서 동일 패턴(`bg-white rounded-xl
 * shadow-md p-8 text-center`) 3번 중복 → 단일 컴포넌트로 추출.
 */

import type { ReactNode } from 'react';

interface Props {
  message: string;
  action?: { label: string; onClick: () => void };
  icon?: ReactNode;
}

export function EmptyState({ message, action, icon }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray/15 p-8 text-center">
      {icon && <div className="mb-3 flex justify-center text-gray/60">{icon}</div>}
      <p className="text-body-14 text-gray mb-4">{message}</p>
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
