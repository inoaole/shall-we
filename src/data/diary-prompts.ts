/**
 * AI 다이어리 작성 화면 3 질문 (Figma 참조).
 */

export const diaryPrompts = [
  {
    id: 'q1',
    label: '1. 오늘 어떤 일이 있었나요? 그때 감정은 어떠셨나요?',
    placeholder:
      '예) 프로젝트 발표를 했어요. 처음엔 떨렸지만 끝나고 나니 뿌듯했어요.',
  },
  {
    id: 'q2',
    label: '2. 그런 생각이 든 지는 얼마나 되셨나요?',
    placeholder:
      '예) 일주일 전부터 계속 무기력한 느낌이 들어요. 아침에 일어나기가 힘들어요.',
  },
  {
    id: 'q3',
    label: '3. 오늘 감사했던 일을 적어볼까요?',
    placeholder:
      '예) 친구가 먼저 연락해준 것, 맛있는 점심을 먹은 것, 날씨가 좋았던 것',
  },
] as const;

export type DiaryPromptId = (typeof diaryPrompts)[number]['id'];
