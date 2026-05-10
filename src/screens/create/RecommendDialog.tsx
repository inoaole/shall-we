/**
 * RecommendDialog — 추천 챌린지 추가 확인 팝업.
 * Figma 40000684:2386 (yellow) / 40000684:2403 (purple) 정합.
 *
 * category prop이 헤더 색을 구동: yellow / blue / purple / peach.
 */

import { Button } from '@/components/ui/Button';
import { recIcon } from '@/utils/rec-icon';

export type DialogCategory = 'yellow' | 'blue' | 'purple' | 'peach';

interface Recommendation {
  id: string;
  shortTitle: string;
  action: string;
  mission: string;
  target: string;
  effect: string;
  durationDays: number;
  icon?: string;
  category?: DialogCategory;
}

interface Props {
  rec: Recommendation;
  category?: DialogCategory;
  onConfirm: () => void;
  onCancel: () => void;
}

const headerBg: Record<DialogCategory, string> = {
  yellow: 'bg-cat-yellow',
  blue: 'bg-cat-blue',
  purple: 'bg-cat-purple',
  peach: 'bg-cat-peach',
};

export function RecommendDialog({ rec, category, onConfirm, onCancel }: Props) {
  const Icon = recIcon(rec.icon);
  const cat = category ?? rec.category ?? 'yellow';

  return (
    <div className="overflow-hidden">
      {/* Hero — 카테고리 색 헤더 + 기간 pill + 아이콘 */}
      <div className={`relative ${headerBg[cat]} h-36 flex items-center justify-center`}>
        <span className="absolute top-3 right-3 px-3 py-1 bg-white/85 text-ink text-body-12 rounded-md font-semibold">
          {rec.durationDays}일
        </span>
        <Icon size={48} strokeWidth={1.75} className="text-ink/70" />
      </div>

      <div className="p-6">
        {/* Title */}
        <p className="text-title-20 text-ink text-center font-semibold">
          [{rec.shortTitle}]
        </p>
        <p className="text-title-20 text-ink text-center mb-5">
          챌린지를 추가할까요?
        </p>

        {/* Mission pill */}
        <div className="bg-bg-gray rounded-xl px-4 py-3 mb-5">
          <p className="text-body-14 text-ink">미션 : {rec.mission}</p>
        </div>

        {/* Target + Effect */}
        <div className="space-y-3 mb-6">
          <p className="text-body-14 text-ink leading-relaxed">{rec.target}</p>
          <p className="text-body-14 text-ink leading-relaxed">{rec.effect}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-[1] h-13 rounded-lg bg-gray-soft text-ink text-subtitle-16 active:scale-[0.97] transition-all"
          >
            아니요
          </button>
          <Button
            size="pair-next"
            onClick={onConfirm}
            className="!bg-gray-muted !text-white"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
