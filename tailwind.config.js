/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    transitions: {
      short: '100ms',
      medium: '350ms',
      long: '1s',
    },
    borderWidth: {
      DEFAULT: '3px',
      1: '1px',
      2: '3px',
    },
    boxShadow: {
      DEFAULT: '0 2px 0 0 rgba(0 0 0 / 0.15)',
      lg: '0 7px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    custom: {
      divider: {
        verticalLength: '3rem',
        horizontalLength: '5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#358cd5',
          50: '#f2f7fd',
          100: '#e4eefa',
          200: '#c3dcf4',
          300: '#8ebfeb',
          400: '#519edf',
          500: '#358cd5',
          600: '#1c67ad',
          700: '#18528c',
          800: '#174675',
          900: '#193d61',
          950: '#102641',
        },
        secondary: {
          DEFAULT: '#b051fb',
          50: '#faf5ff',
          100: '#f4e7ff',
          200: '#ebd4ff',
          300: '#dcb2ff',
          400: '#c681ff',
          500: '#b051fb',
          600: '#9c2fee',
          700: '#871ed2',
          800: '#721eab',
          900: '#5d1a89',
          950: '#400566',
        },
        bg: {
          DEFAULT: 'rgba(var(--bg) / <alpha-value>)',
        },
      },
      backgroundColor: {
        DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
      },
      transitionDuration: {
        DEFAULT: '100ms',
        long: '350ms',
      },
      textColor: {
        DEFAULT: 'var(--color-text)',
        contrast: 'var(--color-text-contrast)',
        muted: 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
};
