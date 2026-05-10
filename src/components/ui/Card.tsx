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

import { Plus, MoreHorizontal, type LucideIcon } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

const baseCard =
  'bg-white rounded-xl border border-gray/15 shadow-sm active:scale-[0.99] transition-transform';

// ───────────────────────────────────────────────────────────────────────────
// TodayCard — 오늘의 챌린지 (홈 / 다이어리에서 사용)
// design.md §5.3: 챌린지명 (Sub Title 16) / 기간 (Body 12) / 누적 완수일 (Body 14)
//
// v0.0.5: typography 환원 (Title 20 → Sub Title 16). rightSlot/onClick는
// 둘 중 하나만 사용 (중첩 button a11y 위반 방지). rightSlot이 있으면
// outer는 button이 아닌 div로 렌더, onClick만 있으면 button.
// ───────────────────────────────────────────────────────────────────────────

interface TodayCardProps {
  title: string;
  durationDays?: number;
  completedDays?: number;
  onClick?: () => void;
}

export function TodayCard({ title, durationDays, completedDays, onClick }: TodayCardProps) {
  const showProgress =
    durationDays !== undefined && completedDays !== undefined && durationDays > 0;
  const progressValue = showProgress ? completedDays / durationDays : 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-gray/15 shadow-sm bg-gradient-to-br from-bg-green-light to-bg-green-card active:scale-[0.99] transition-transform"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-1">
          <h3 className="text-subtitle-16 text-ink">{title}</h3>
          {durationDays !== undefined && (
            <p className="text-body-12 text-ink/60">{durationDays}일 챌린지</p>
          )}
        </div>
        <img src="/logo/symbol.png" alt="" className="w-10 h-10 shrink-0" />
      </div>
      {showProgress && (
        <div className="mt-3">
          <ProgressBar value={progressValue} />
        </div>
      )}
      {completedDays !== undefined && completedDays > 0 && (
        <div className="mt-3 flex justify-end">
          <span className="px-2.5 py-1 bg-gray-muted text-white text-body-12 rounded-md font-semibold">
            {completedDays}일 완수
          </span>
        </div>
      )}
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
      <button onClick={onClick} className="text-left w-full bg-white rounded-xl border border-gray/15 shadow-sm overflow-hidden active:scale-[0.99] transition-transform">
        {photoUrl ? (
          <div className="aspect-square bg-bg-gray overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-square bg-bg-gray flex items-center justify-center text-gray/40 text-body-12">
            no image
          </div>
        )}
        <div className="p-3 bg-bg-gray border-t border-gray-soft">
          <div className="flex items-center justify-between gap-2">
            <p className="text-subtitle-16 text-ink truncate">{title}</p>
            {isPrivate && <span className="text-body-12 text-gray shrink-0">🔒</span>}
          </div>
          <p className="text-body-12 text-gray mt-0.5 line-clamp-2 leading-snug">{body}</p>
        </div>
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${baseCard} w-full text-left p-3`}>
      <div className="flex items-start gap-3">
        <div className="w-[106px] h-[105px] shrink-0 rounded-[10px] bg-gray overflow-hidden">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-subtitle-16 text-ink truncate">{title}</p>
            {isPrivate && <span className="text-body-12 text-gray shrink-0">🔒</span>}
          </div>
          <p className="text-body-14 text-ink/75 line-clamp-3 whitespace-pre-line leading-relaxed">{body}</p>
        </div>
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// RecommendCard — 추천 챌린지
// ───────────────────────────────────────────────────────────────────────────

interface RecommendCardProps {
  action: string;
  mission: string;
  target: string;
  effect: string;
  durationDays: number;
  Icon: LucideIcon;
  onClick?: () => void;
}

export function RecommendCard({
  action,
  mission,
  target,
  effect,
  durationDays,
  Icon,
  onClick,
}: RecommendCardProps) {
  return (
    <button onClick={onClick} className={`${baseCard} text-left w-full p-5 space-y-4`}>
      {/* Header — ... + N일 pill (그린 보더) */}
      <div className="flex items-center justify-between">
        <MoreHorizontal size={18} className="text-gray" aria-hidden />
        <span className="px-2.5 py-0.5 bg-bg-green-tint border border-primary text-primary text-body-12 rounded-md font-semibold">
          {durationDays}일
        </span>
      </div>

      {/* Hero — 피치 원형 일러스트 */}
      <div className="flex items-center justify-center py-2">
        <div className="w-28 h-28 rounded-full bg-cat-peach flex items-center justify-center">
          <Icon size={44} strokeWidth={1.75} className="text-ink/70" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-title-20 text-ink leading-snug">{action}</h3>

      {/* Mission pill */}
      <div className="bg-bg-gray rounded-lg px-3 py-2">
        <p className="text-body-14 text-ink">미션 : {mission}</p>
      </div>

      {/* Target */}
      <p className="text-body-14 text-gray leading-relaxed">{target}</p>

      {/* Effect */}
      <p className="text-body-14 text-ink leading-relaxed">{effect}</p>
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
