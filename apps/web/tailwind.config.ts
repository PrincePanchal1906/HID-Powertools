import type { Config } from 'tailwindcss'
import { sharedConfig } from '@hid/config/tailwind'

const config: Config = {
  ...sharedConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      colors: {
        brand: '#C0001A',
      },
      animation: {
        'tool': 'toolEntrance 1.1s cubic-bezier(0.22,1,0.36,1) both',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        toolEntrance: {
          '0%':   { opacity: '0', transform: 'translateX(100px) scale(0.85) rotate(8deg)' },
          '55%':  { opacity: '1', transform: 'translateX(-12px) scale(1.04) rotate(-1deg)' },
          '75%':  { transform: 'translateX(5px) scale(0.98) rotate(0.5deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1) rotate(0deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}

export default config
