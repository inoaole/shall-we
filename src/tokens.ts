/**
 * Single source of truth for design tokens (D5 from eng review).
 * Tailwind config (tailwind.config.ts) imports from here so any change
 * propagates everywhere — no duplication.
 *
 * Source: design.md §8
 *
 * Note: only `colors` uses `as const` (for ColorToken type derivation).
 * Other tokens use plain mutable objects so Tailwind v3's loose typing
 * accepts them without `[...spread]` cloning gymnastics.
 */

export const colors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  primary: '#4CAF7D',          // shallwe green — Figma 실제 화면 기준 (design system page는 #24D455로 드리프트)
  ink: '#232323',              // shallwe white (Figma name; actually dark gray)
  black: '#000000',
  gray: '#8A8C8F',             // Y Gray
  'gray-soft': '#D9D9D9',      // 보더/비활성 칩 (Figma 화면 빈도 높음)
  'gray-muted': '#444B47',     // 다크 그린-그레이, 다이어리/모달 CTA
  yellow: '#FFE183',           // shallwe yellow
  'cat-yellow': '#F9F8CF',     // 챌린지 카테고리 헤더 (노랑)
  'cat-blue': '#CDE0EE',       // 챌린지 카테고리 헤더 (블루)
  'cat-purple': '#F7DAFF',     // 챌린지 카테고리 헤더 (보라/핑크)
  'cat-peach': '#FFE6CB',      // 챌린지 카테고리 일러스트 BG (피치)
  gold: '#B38C45',             // Y Gold
  danger: '#E5484D',           // Radix red 9 — error/warning (design.md §9)
  'bg-gray': '#F8F9F7',
  'bg-app': '#F9FAFB',         // 메인 앱 배경 (Figma 홈 리스트/갤러리)
  'bg-green-tint': '#EDF7F2',  // 강조 섹션 (Figma 실측)
  'bg-green-light': '#EFFBE3', // TodayCard 그라디언트 시작
  'bg-green-card': '#D4EBD4',  // TodayCard 그라디언트 끝
  'ai-primary': '#00A63E',     // AI 감정 다이어리 메인 (별개 sub-system)
  'ai-deep': '#016630',        // AI 다이어리 다크 강조
  'ai-bg': '#F0FDF4',          // AI 다이어리 그라디언트 배경 시작
} as const;

export type ColorToken = keyof typeof colors;

export const typography: Record<string, [string, { lineHeight: string; fontWeight: string; letterSpacing?: string }]> = {
  'title-24':    ['24px', { lineHeight: '1.4', fontWeight: '700' }],
  'title-20':    ['20px', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '700' }],
  'subtitle-16': ['16px', { lineHeight: '1',   fontWeight: '600' }],
  'body-14':     ['14px', { lineHeight: '1.4', fontWeight: '400' }],
  'body-12':     ['12px', { lineHeight: '1',   fontWeight: '400' }],
};

export const radius = {
  none: '0',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export const fontFamily: Record<string, string[]> = {
  base: ['Roboto', 'Apple SD Gothic Neo', 'Pretendard', 'sans-serif'],
};

export const shadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0,0,0,0.06)',
  lg: '0 4px 16px rgba(0,0,0,0.08)',
};
