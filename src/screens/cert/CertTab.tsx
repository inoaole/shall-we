import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { TodayCard, AddCard } from '@/components/ui/Card';

export default function CertTab() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="px-5 pt-4 space-y-4">
      <h2 className="text-subtitle-16 text-ink">오늘의 챌린지</h2>
      {state.challenges.length === 0 ? (
        <p className="text-body-14 text-gray">진행 중인 챌린지가 없어요.</p>
      ) : (
        <div className="space-y-3">
          {state.challenges.map((c) => {
            const completedDays = state.posts.filter((p) => p.challengeId === c.id).length;
            return (
              <TodayCard
                key={c.id}
                title={c.title}
                durationDays={c.durationDays}
                completedDays={completedDays}
                onClick={() => navigate('/cert/upload')}
              />
            );
          })}
        </div>
      )}

      <AddCard
        label="챌린지 추가"
        caption="새로운 챌린지를 시작해보세요"
        onClick={() => navigate('/create')}
      />
    </div>
  );
}
