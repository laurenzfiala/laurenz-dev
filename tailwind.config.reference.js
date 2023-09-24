/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    spacing: {
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.675rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '3rem',
      12: '4rem',
      14: '5rem',
    },
    borderRadius: {
      none: '0',
      DEFAULT: '.25rem',
      lg: '.75rem',
      full: '9999px',
    },
    container: ({ theme }) => ({
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
      padding: {
        DEFAULT: theme('spacing.2'),
      },
    }),
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    transitions: {
      short: '100ms',
      medium: '350ms',
      long: '1s',
    },
    borderColor: {
      DEFAULT: 'var(--color-border)',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    extend: {
      width: {
        px: '1px',
      },
      maxWidth: {
        px: '1px',
      },
      backgroundColor: ({ theme }) => ({
        border: theme('borderColor.DEFAULT'),
        body: 'var(--bg-color-body)',
      }),
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        text: 'var(--color-text)',
        'text-subtle': 'var(--color-text-subtle)',
      },
    },
  },
  plugins: [require('tailwindcss-touch')()],
};
