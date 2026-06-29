import type { Config } from 'tailwindcss'

export const sharedConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          alt:     'var(--color-surface-alt)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted:   'var(--color-text-muted)',
        },
        border:  'var(--color-border)',
        footer:  'var(--color-footer)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':        'marquee 25s linear infinite',
        'marquee-ribbon': 'marquee-ribbon 30s linear infinite',
        'float':          'float 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'marquee-ribbon': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-12px)'  },
        },
      },
      screens: {
        xs: '475px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'primary-sm': '0 4px 14px 0 var(--color-primary)',
        'primary-md': '0 8px 30px 0 var(--color-primary)',
      },
    },
  },
  plugins: [],
}
