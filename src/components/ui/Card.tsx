/**
 * Card variants — 4 separate components (D-S1.2).
 *
 * v0.0.2 design polish:
 *   - Subtraction default (Rams). Removed: TodayCard 그린 accent strip +
 *     Sparkles badge. RecommendCard "추천" yellow badge. AddCard 점선 border.
 *   - Unified surface treatment: bg-white + border + shadow-sm (calm, not loud)
 *   - Padding 16pt (p-4) per design.md spec, not 20pt
 *   - Typography: Sub Title 16 SemiBold for card titles, Title 20 only for
 *     primary content (TodayCard title)
 */

import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

const baseCard =
  'bg-white rounded-xl border border-gray/15 shadow-sm active:scale-[0.99] transition-transform';

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
    <button onClick={onClick} className={`${baseCard} w-full text-left p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <h3 className="text-title-20 text-ink">{title}</h3>
          {durationDays !== undefined && (
            <p className="text-body-12 text-gray">{durationDays}일 챌린지</p>
          )}
          {completedDays !== undefined && completedDays > 0 && (
            <p className="text-body-14 text-primary mt-2 font-medium">
              벌써 {completedDays}일 완수!
            </p>
          )}
        </div>
        {rightSlot}
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FeedCard — 모두의 챌린지 / 내 게시글
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
      <button onClick={onClick} className={`${baseCard} text-left w-full p-3`}>
        {photoUrl ? (
          <div className="aspect-square bg-bg-gray rounded-lg mb-2 overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-square bg-bg-gray rounded-lg mb-2 flex items-center justify-center text-gray/40 text-body-12">
            no image
          </div>
        )}
        <p className="text-subtitle-16 text-ink truncate">{title}</p>
        <p className="text-body-12 text-gray mt-0.5 line-clamp-2 leading-snug">{body}</p>
        {isPrivate && (
          <span className="text-body-12 text-gray mt-1 inline-block">🔒</span>
        )}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${baseCard} w-full text-left p-4`}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-subtitle-16 text-ink">{title}</p>
        {isPrivate && <span className="text-body-12 text-gray shrink-0">🔒</span>}
      </div>
      <p className="text-body-14 text-ink/75 line-clamp-3 whitespace-pre-line leading-relaxed">{body}</p>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// RecommendCard — 추천 챌린지
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
    <button onClick={onClick} className={`${baseCard} text-left w-full p-5`}>
      <p className="text-body-12 text-primary mb-1 font-semibold">{shortTitle}</p>
      <h3 className="text-title-20 text-ink mb-5">{action}</h3>
      <dl className="space-y-2.5 text-body-14">
        <div className="flex gap-3">
          <dt className="text-gray shrink-0 w-14">미션</dt>
          <dd className="text-ink flex-1">{mission}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="text-gray shrink-0 w-14">대상</dt>
          <dd className="text-ink/75 flex-1">{target}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="text-gray shrink-0 w-14">기대효과</dt>
          <dd className="text-ink flex-1">{effect}</dd>
        </div>
      </dl>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// AddCard — 챌린지 추가 진입
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
      className="w-full bg-bg-green-tint rounded-xl p-6 flex flex-col items-center gap-2 active:scale-[0.99] transition-transform"
    >
      <Plus size={28} className="text-primary" strokeWidth={2.25} />
      <p className="text-subtitle-16 text-primary">{label}</p>
      {caption && <p className="text-body-12 text-ink/60">{caption}</p>}
    </button>
  );
}
