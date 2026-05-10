/**
 * Recommend — 챌린지 추천 horizontal carousel (embla).
 *
 * 카드 탭 → RecommendDialog (Figma 40000625:206 정합) → 확인 시 ADD_CHALLENGE → home.
 * 아니요 / Esc / backdrop → 다이얼로그 닫고 carousel 유지.
 * Direct create는 하단 "직접 만들기" 카드 탭으로.
 */

import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { RecommendCard, AddCard } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { BackHeader } from '@/components/layout/BackHeader';
import { uuid } from '@/utils/id';
import { notify } from '@/utils/notify';
import recommendations from '@/mocks/recommendations.json';
import { RecommendDialog } from './RecommendDialog';
import { recIcon } from '@/utils/rec-icon';

type Recommendation = (typeof recommendations)[number];

export default function Recommend() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [pendingRec, setPendingRec] = useState<Recommendation | null>(null);

  // Track selected slide for indicator
  if (embla) {
    embla.on('select', () => setSelectedIdx(embla.selectedScrollSnap()));
  }

  const handleConfirm = () => {
    if (!pendingRec) return;
    dispatch({
      type: 'ADD_CHALLENGE',
      payload: {
        id: uuid(),
        title: pendingRec.action,
        durationDays: pendingRec.durationDays,
        mission: pendingRec.mission,
        effect: pendingRec.effect,
        startedAt: new Date().toISOString(),
      },
    });
    notify.challengeAdded(pendingRec.action);
    setPendingRec(null);
    navigate('/home');
  };

  return (
    <div className="min-h-screen pb-10 bg-bg-gray">
      <BackHeader title="어떤 챌린지를 해볼까요?" />

      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex-[0_0_85%] mr-3 first:ml-5 last:mr-5">
                <RecommendCard
                  action={rec.action}
                  mission={rec.mission}
                  target={rec.target}
                  effect={rec.effect}
                  durationDays={rec.durationDays}
                  Icon={recIcon(rec.icon)}
                  onClick={() => setPendingRec(rec)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Page indicator */}
        <div className="flex justify-center gap-1.5 mt-4">
          {recommendations.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIdx ? 'w-6 bg-primary' : 'w-1.5 bg-gray/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-5 mt-8">
        <AddCard
          label="챌린지 직접 만들기"
          caption="나만의 목표를 세워보세요!"
          onClick={() => navigate('/create/new')}
        />
      </div>

      <Modal
        open={pendingRec !== null}
        onClose={() => setPendingRec(null)}
        ariaLabel="챌린지 추가 확인"
      >
        {pendingRec && (
          <RecommendDialog
            rec={pendingRec}
            onConfirm={handleConfirm}
            onCancel={() => setPendingRec(null)}
          />
        )}
      </Modal>
    </div>
  );
}
