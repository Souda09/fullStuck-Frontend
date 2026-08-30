/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0F172A', 800: '#1E293B' },
        teal: { 500: '#0D9488', 400: '#14B8A6' },
      },
    },
  },
  plugins: [],
};