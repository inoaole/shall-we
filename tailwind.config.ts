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
    extend: {
      maxWidth: { screen: '440px' },
      spacing: {
        '13': '52px', // Primary Button height
      },
    },
  },
  plugins: [],
};

export default config;
