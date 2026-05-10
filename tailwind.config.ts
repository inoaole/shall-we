import type { Config } from 'tailwindcss';
import { colors, typography, radius, fontFamily, shadow } from './src/tokens';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors,
    fontFamily,
    fontSize: typography,
    borderRadius: radius,
    boxShadow: shadow,
    /**
     * Custom breakpoints (v0.0.3): default targets iPhone 16/17 Pro Max (440pt),
     * `xs` for iPhone SE / smaller (≤375pt) for tighter padding.
     */
    screens: {
      xs: { max: '375px' },
    },
    extend: {
      maxWidth: { screen: '440px' },
      spacing: {
        '13': '52px',
      },
    },
  },
  plugins: [],
};

export default config;
