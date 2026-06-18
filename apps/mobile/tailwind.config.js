/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0084ff',
        'primary-container': '#319aff',
        surface: '#ffffff',
        'surface-low': '#f8fafc',
        'surface-high': '#eef2fb',
        'text-primary': '#111a3e',
        'text-secondary': '#44475e',
        success: '#15803d',
        warning: '#b45309',
        error: '#ba1a1a',
      },
      borderRadius: {
        xl: '24px',
      },
    },
  },
};
