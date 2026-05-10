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
  primary: '#24D455',          // shallwe green
  ink: '#232323',              // shallwe white (Figma name; actually dark gray)
  black: '#000000',
  gray: '#8A8C8F',             // Y Gray
  yellow: '#FFE183',           // shallwe yellow
  gold: '#B38C45',             // Y Gold
  danger: '#E5484D',           // Radix red 9 — error/warning (design.md §9)
  'bg-gray': '#F8F9F7',
  'bg-green-tint': '#EDF9E1',
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
