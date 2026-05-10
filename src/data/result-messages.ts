/**
 * Result screen 단계별 메시지 (D-S2.3: 외부 분리).
 *
 * 디자인 변경 / 카피 수정 시 컴포넌트 코드 건드리지 않고 여기만 수정.
 */

import type { Level } from '@/store/AppContext';

export const levelMessage: Record<Level, string> = {
  '없음': '잘 지내고 계시네요!\n오늘도 가벼운 마음으로 시작해봐요.',
  '낮음': 'ShallWe와 함께\n조금씩 극복해나가요!',
  '중간': 'ShallWe와 함께\n조금씩 극복해나가요!',
  '높음': '오늘은 천천히, 작은 챌린지부터\n시작해도 충분해요.',
};

/** PHQ-9 9번(자해 관련) 1점 이상 시 노출 */
export const SUICIDE_PREVENTION = {
  enabled: true,
  message: '힘들 때는 혼자 견디지 마세요.',
  hotline: '1393',
  hotlineLabel: '자살예방상담전화',
  caption: '24시간 무료 상담',
};
