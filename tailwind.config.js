/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        'surface-hover': '#1A1A1A',
        border: '#262626',
        foreground: '#FAFAFA',
        'foreground-secondary': '#A1A1A1',
        'foreground-muted': '#525252',
        accent: '#D97757',
        'accent-hover': '#C96A4C',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#FAFAFA',
            '--tw-prose-headings': '#FAFAFA',
            '--tw-prose-links': '#D97757',
            '--tw-prose-bold': '#FAFAFA',
            '--tw-prose-counters': '#A1A1A1',
            '--tw-prose-bullets': '#A1A1A1',
            '--tw-prose-hr': '#262626',
            '--tw-prose-quotes': '#FAFAFA',
            '--tw-prose-quote-borders': '#D97757',
            '--tw-prose-captions': '#A1A1A1',
            '--tw-prose-code': '#FAFAFA',
            '--tw-prose-pre-code': '#FAFAFA',
            '--tw-prose-pre-bg': '#141414',
            '--tw-prose-th-borders': '#262626',
            '--tw-prose-td-borders': '#262626',
            maxWidth: '680px',
            lineHeight: '1.75',
          },
        },
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}