/**
 * Card variants — 4 separate components (D-S1.2: each variant is its own component
 * since the data shape differs, but co-located in the same file for discoverability).
 *
 * S1 polish notes:
 *   - Stronger shadow + 1.5px border for definition (was bordering invisible
 *     against bg-bg-gray page)
 *   - TodayCard: green-tint background variant for "오늘 진행 중" emphasis
 *   - RecommendCard: yellow "추천" badge per design.md §5.3
 *   - All cards: active:scale press feedback
 */

import { Plus, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

const baseCard = 'bg-white rounded-xl shadow-md border border-gray/10 active:scale-[0.99] transition-transform';

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
    <button onClick={onClick} className={`${baseCard} w-full text-left p-5 relative overflow-hidden`}>
      {/* Left accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="flex-1 space-y-2">
          <h3 className="text-title-20 text-ink">{title}</h3>
          {durationDays !== undefined && (
            <p className="text-body-12 text-gray">{durationDays}일 챌린지</p>
          )}
          {completedDays !== undefined && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg-green-tint text-primary text-body-12 font-semibold">
              <Sparkles size={12} />
              벌써 {completedDays}일 완수!
            </div>
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
        <p className="text-body-12 text-gray mt-1 line-clamp-2">{body}</p>
        {isPrivate && (
          <span className="text-body-12 text-gray mt-1.5 inline-block">🔒 비공개</span>
        )}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${baseCard} w-full text-left p-5`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-subtitle-16 text-ink">{title}</p>
        {isPrivate && <span className="text-body-12 text-gray shrink-0">🔒 비공개</span>}
      </div>
      <p className="text-body-14 text-ink/80 line-clamp-3 whitespace-pre-line leading-relaxed">{body}</p>
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
    <button onClick={onClick} className={`${baseCard} text-left w-full p-5 relative`}>
      {/* "추천" badge — design.md §5.3 */}
      <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-yellow text-gold text-body-12 font-semibold">
        추천
      </span>
      <p className="text-body-12 text-gray mb-1">{shortTitle}</p>
      <h3 className="text-title-20 text-ink mb-4 pr-12">{action}</h3>
      <div className="space-y-2 text-body-14">
        <p className="text-ink"><span className="text-gray">미션</span>  {mission}</p>
        <p className="text-gray italic">{target}</p>
        <p className="text-ink"><span className="text-gray">기대효과</span>  {effect}</p>
      </div>
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
      className="w-full bg-bg-green-tint border-[1.5px] border-dashed border-primary/40 rounded-xl p-7 flex flex-col items-center gap-2 active:scale-[0.99] transition-transform"
    >
      <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
        <Plus size={24} className="text-primary" strokeWidth={2.25} />
      </div>
      <p className="text-subtitle-16 text-ink">{label}</p>
      {caption && <p className="text-body-12 text-gray">{caption}</p>}
    </button>
  );
}
