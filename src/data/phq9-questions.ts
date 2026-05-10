/**
 * PHQ-9 자가진단 9문항 + 4지선다.
 * Source: wireframe.md §5 verbatim.
 *
 * Quiz 컴포넌트가 preferenceAxes와 합쳐 14 step으로 처리 (D1+D2).
 */

export interface QuizStep {
  id: string;
  type: 'phq9' | 'preference';
  category?: string;       // preference만: 활동 / 관계 / 방식 / 취미 / 시간
  question: string;        // 본문
  options: { label: string; value: number | string }[];
}

const SCORE_OPTIONS = [
  { label: '전혀 그렇지 않다',   value: 0 },
  { label: '며칠 그랬다',        value: 1 },
  { label: '자주 그랬다',        value: 2 },
  { label: '거의 매일 그랬다',   value: 3 },
];

export const phq9Questions: QuizStep[] = [
  {
    id: 'phq9-1',
    type: 'phq9',
    question: '기분이 가라앉거나, 우울하거나,\n희망이 없다고 느꼈다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-2',
    type: 'phq9',
    question: '평소 하던 일에 대한 흥미가 없어지거나\n즐거움을 느끼지 못했다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-3',
    type: 'phq9',
    question: '잠들기가 어렵거나 자주 깼다 /\n혹은 너무 많이 잤다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-4',
    type: 'phq9',
    question: '평소보다 식욕이 줄었다 /\n혹은 평소보다 많이 먹었다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-5',
    type: 'phq9',
    question:
      '다른 사람들이 눈치 챌 정도로 평소보다\n말과 행동이 느려졌다 / 혹은 너무\n안절부절 못해서 가만히 앉아 있을 수 없었다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-6',
    type: 'phq9',
    question: '피곤하고 기운이 없었다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-7',
    type: 'phq9',
    question:
      '내가 잘못 했거나, 실패했다는 생각이 들었다 /\n혹은 자신과 가족을 실망시켰다고 생각했다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-8',
    type: 'phq9',
    question: '신문을 읽거나 TV를 보는 것과 같은\n일상적인 일에도 집중 할 수 없었다.',
    options: SCORE_OPTIONS,
  },
  {
    id: 'phq9-9',
    type: 'phq9',
    question: '차라리 죽는 것이 더 낫겠다고 생각했다 /\n혹은 자해할 생각을 했다.',
    options: SCORE_OPTIONS,
  },
];
