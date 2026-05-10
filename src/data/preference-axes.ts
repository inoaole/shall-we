/**
 * 챌린지 선호도 5축 (질문 10/10).
 * 양극 2지선다 (Pole Choice).
 * Source: wireframe.md §6.
 */

import type { QuizStep } from './phq9-questions';

export const preferenceAxes: QuizStep[] = [
  {
    id: 'pref-활동',
    type: 'preference',
    category: '활동',
    question: '활동',
    options: [
      { label: '정적인',   value: '정적인' },
      { label: '역동적인', value: '역동적인' },
    ],
  },
  {
    id: 'pref-관계',
    type: 'preference',
    category: '관계',
    question: '관계',
    options: [
      { label: '혼자', value: '혼자' },
      { label: '함께', value: '함께' },
    ],
  },
  {
    id: 'pref-방식',
    type: 'preference',
    category: '방식',
    question: '방식',
    options: [
      { label: '성취중심', value: '성취중심' },
      { label: '루틴중심', value: '루틴중심' },
    ],
  },
  {
    id: 'pref-취미',
    type: 'preference',
    category: '취미',
    question: '취미',
    options: [
      { label: '창작',     value: '창작' },
      { label: '자기계발', value: '자기계발' },
    ],
  },
  {
    id: 'pref-시간',
    type: 'preference',
    category: '시간',
    question: '시간',
    options: [
      { label: '짧게', value: '짧게' },
      { label: '길게', value: '길게' },
    ],
  },
];
