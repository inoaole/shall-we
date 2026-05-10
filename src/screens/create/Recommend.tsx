/**
 * Recommend — 챌린지 추천 horizontal carousel (embla).
 *
 * D-S3.2: card tap → immediate ADD_CHALLENGE (default days from rec data) → home.
 * Direct create는 하단 "직접 만들기" 카드 탭으로.
 */

import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { RecommendCard, AddCard } from '@/components/ui/Card';
import { uuid } from '@/utils/id';
import { notify } from '@/utils/notify';
import recommendations from '@/mocks/recommendations.json';

export default function Recommend() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Track selected slide for indicator
  if (embla) {
    embla.on('select', () => setSelectedIdx(embla.selectedScrollSnap()));
  }

  const handleStart = (rec: typeof recommendations[0]) => {
    dispatch({
      type: 'ADD_CHALLENGE',
      payload: {
        id: uuid(),
        title: rec.action,
        durationDays: rec.durationDays,
        mission: rec.mission,
        effect: rec.effect,
        startedAt: new Date().toISOString(),
      },
    });
    notify.challengeAdded(rec.action);
    navigate('/home');
  };

  return (
    <div className="min-h-screen pb-10 bg-bg-gray">
      <header className="px-5 pt-4 pb-3 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-ink leading-none -ml-1 px-1 active:scale-90 transition-transform"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="ml-2 text-title-20 text-ink">어떤 챌린지를 해볼까요?</h1>
      </header>

      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex-[0_0_85%] mr-3 first:ml-5 last:mr-5">
                <RecommendCard
                  shortTitle={rec.shortTitle}
                  action={rec.action}
                  mission={rec.mission}
                  target={rec.target}
                  effect={rec.effect}
                  onClick={() => handleStart(rec)}
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
    </div>
  );
}
