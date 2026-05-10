/**
 * Card variants — 4 separate components (D-S1.2: each variant is its own component
 * since the data shape differs, but co-located in the same file for discoverability).
 */

import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

const baseCard = 'bg-white rounded-lg p-4 shadow-md';

// ───────────────────────────────────────────────────────────────────────────
// TodayCard — 오늘의 챌린지 (홈 / 다이어리에서 사용)
// ───────────────────────────────────────────────────────────────────────────

interface TodayCardProps {
  title: string;
  durationDays?: number;
  completedDays?: number;
  rightSlot?: ReactNode;
  onClick?: () => void;
}

export function TodayCard({ title, durationDays, completedDays, rightSlot, onClick }: TodayCardProps) {
  return (
    <button onClick={onClick} className={`${baseCard} w-full text-left active:scale-[0.99] transition-transform`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-subtitle-16 text-ink">{title}</h3>
          {durationDays !== undefined && (
            <p className="text-body-12 text-gray mt-1">{durationDays}일</p>
          )}
          {completedDays !== undefined && (
            <p className="text-body-14 text-primary mt-2">벌써 {completedDays}일 완수!</p>
          )}
        </div>
        {rightSlot}
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FeedCard — 모두의 챌린지 / 내 게시글 카드
// ───────────────────────────────────────────────────────────────────────────

interface FeedCardProps {
  title: string;
  body: string;
  photoUrl?: string;
  isPrivate?: boolean;
  onClick?: () => void;
  layout?: 'list' | 'grid';
}

export function FeedCard({ title, body, photoUrl, isPrivate, onClick, layout = 'list' }: FeedCardProps) {
  if (layout === 'grid') {
    return (
      <button onClick={onClick} className={`${baseCard} text-left w-full active:scale-[0.99] transition-transform`}>
        {photoUrl && (
          <div className="aspect-square bg-bg-gray rounded-md mb-2 overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <p className="text-subtitle-16 text-ink truncate">{title}</p>
        <p className="text-body-12 text-gray mt-1 line-clamp-2">{body}</p>
        {isPrivate && <span className="text-body-12 text-gray mt-1 inline-block">🔒 비공개</span>}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${baseCard} w-full text-left active:scale-[0.99] transition-transform`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-subtitle-16 text-ink">{title}</p>
        {isPrivate && <span className="text-body-12 text-gray">🔒</span>}
      </div>
      <p className="text-body-14 text-ink mt-2 line-clamp-3 whitespace-pre-line">{body}</p>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// RecommendCard — 추천 챌린지 (캐러셀에서 사용)
// ───────────────────────────────────────────────────────────────────────────

interface RecommendCardProps {
  shortTitle: string;
  action: string;
  mission: string;
  target: string;
  effect: string;
  onClick?: () => void;
}

export function RecommendCard({ shortTitle, action, mission, target, effect, onClick }: RecommendCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${baseCard} text-left w-full active:scale-[0.99] transition-transform space-y-2`}
    >
      <p className="text-subtitle-16 text-gray">{shortTitle}</p>
      <h3 className="text-title-20 text-ink">{action}</h3>
      <p className="text-body-14 text-ink"><span className="text-gray">미션:</span> {mission}</p>
      <p className="text-body-14 text-gray">{target}</p>
      <p className="text-body-14 text-ink"><span className="text-gray">기대효과:</span> {effect}</p>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// AddCard — 챌린지 추가 진입 카드 (인증 탭, 추천 하단)
// ───────────────────────────────────────────────────────────────────────────

interface AddCardProps {
  label?: string;
  caption?: string;
  onClick?: () => void;
}

export function AddCard({ label = '챌린지 추가', caption, onClick }: AddCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-bg-green-tint rounded-lg p-6 flex flex-col items-center gap-2 active:scale-[0.99] transition-transform"
    >
      <Plus size={28} className="text-primary" strokeWidth={2} />
      <p className="text-subtitle-16 text-ink">{label}</p>
      {caption && <p className="text-body-12 text-gray">{caption}</p>}
    </button>
  );
}
