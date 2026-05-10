/**
 * Mock AI 응원 메시지 + 추천 챌린지 (mood별).
 *
 * 향후 LLM 연동 시 `src/utils/ai.ts`로 옮기고 본 파일은 fallback / seed
 * 데이터로 보존. 추천 챌린지는 다른 mock과 일관되게 짧은 행동 단위.
 */

import type { Mood } from '@/store/AppContext';

export const moodMessages: Record<Mood, string[]> = {
  negative: [
    '힘든 하루였나요? 그럴 수 있어요. 완벽하지 않아도 괜찮아요. 오늘 느낀 감정을 인정하는 것만으로도 충분해요.',
    '지친 하루를 보낸 당신, 정말 고생했어요. 모든 감정에는 이유가 있어요. 오늘은 자신에게 조금 더 너그러워져도 괜찮아요.',
    '오늘은 잠시 멈춰서 숨을 골라봐요. 모든 걸 다 해내지 않아도 돼요. 작은 것 하나라도 끝낸 자신을 칭찬해보세요.',
  ],
  neutral: [
    '평범한 하루도 충분히 의미 있어요. 매일이 특별할 필요는 없어요. 오늘 하루를 잘 보낸 것만으로도 잘하고 있어요.',
    '담담한 하루를 보냈군요. 그런 날도 필요해요. 큰 변화가 없는 시간 속에서도 당신은 분명 자라고 있어요.',
    '오늘의 기록을 남긴 것 자체가 좋은 습관의 시작이에요. 작은 기록이 쌓여 큰 변화를 만들어요.',
  ],
  positive: [
    '좋은 하루를 보냈네요. 그 마음을 오래 기억해두세요. 작은 기쁨을 알아채는 당신은 분명 더 좋은 날들을 만들 거예요.',
    '오늘의 따뜻한 감정이 느껴져요. 이런 날들을 더 많이 만들어가요. 감사할 줄 아는 마음은 다음 행복으로 이어져요.',
    '뿌듯한 하루였군요. 자신을 칭찬해주세요. 오늘 느낀 긍정의 에너지를 내일에도 이어가봐요.',
  ],
};

export const recommendByMood: Record<Mood, string> = {
  negative: '좋아하는 영상 보며 차 한잔 마시기',
  neutral: '10분 산책하기',
  positive: '오늘의 좋은 일을 한 줄로 적기',
};

/**
 * Pick a mood message. Deterministic per (mood, dateSeed) so the same diary
 * entry shows the same feedback when revisited.
 */
export function pickFeedback(mood: Mood, dateSeed: string): string {
  const arr = moodMessages[mood];
  let hash = 0;
  for (let i = 0; i < dateSeed.length; i++) hash = (hash * 31 + dateSeed.charCodeAt(i)) | 0;
  return arr[Math.abs(hash) % arr.length];
}
