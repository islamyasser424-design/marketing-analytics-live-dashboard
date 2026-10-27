/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#184E77',
          blue: '#1E6091',
          accent: '#1A759F',
          cyan: '#168AAD',
          teal: '#34A0A4',
          sea: '#52B69A',
          mint: '#76C893',
          green: '#99D98C',
          pale: '#B5E48C',
          lime: '#D9ED92',
          lightBg: '#F4FAF6',
          darkBg: '#091522',
          darkCard: '#112233',
          darkBorder: '#1A334B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
}
