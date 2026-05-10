/**
 * RecommendDialog — 추천 챌린지 추가 확인 팝업 (Figma 40000625:206 정합).
 *
 * 구성: 옐로 hero + 기간 pill + center 로고 → "[shortTitle] 챌린지를 추가할까요?"
 *      → 미션 pill → 대상/효과 → 아니요/확인.
 */

import { Button } from '@/components/ui/Button';
import { recIcon } from '@/utils/rec-icon';

interface Recommendation {
  id: string;
  shortTitle: string;
  action: string;
  mission: string;
  target: string;
  effect: string;
  durationDays: number;
  icon?: string;
}

interface Props {
  rec: Recommendation;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RecommendDialog({ rec, onConfirm, onCancel }: Props) {
  const Icon = recIcon(rec.icon);
  return (
    <div className="p-6">
      {/* Hero — 옐로 + 기간 pill + 카테고리 아이콘 */}
      <div className="relative bg-yellow/35 rounded-2xl h-36 mb-6 flex items-center justify-center">
        <span className="absolute top-3 right-3 px-3 py-1 bg-white/85 text-ink text-body-12 rounded-md font-semibold">
          {rec.durationDays}일
        </span>
        <Icon size={48} strokeWidth={1.75} className="text-ink/70" />
      </div>

      {/* Title */}
      <p className="text-title-20 text-ink text-center font-semibold">
        [{rec.shortTitle}]
      </p>
      <p className="text-title-20 text-ink text-center mb-5">
        챌린지를 추가할까요?
      </p>

      {/* Mission pill */}
      <div className="bg-bg-gray rounded-xl px-4 py-3 mb-5">
        <p className="text-body-14 text-ink">
          미션 : {rec.mission}
        </p>
      </div>

      {/* Target + Effect */}
      <div className="space-y-3 mb-6">
        <p className="text-body-14 text-ink leading-relaxed">{rec.target}</p>
        <p className="text-body-14 text-ink leading-relaxed">{rec.effect}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" size="pair-prev" onClick={onCancel}>
          아니요
        </Button>
        <Button size="pair-next" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </div>
  );
}
