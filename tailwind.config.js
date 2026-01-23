/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fb': {
          'blue': '#1877f2',
          'green': '#42b72a',
          'light': '#f0f2f5',
          'dark': '#18191a',
          'dark-card': '#242526',
          'gray': '#606770',
          'border': '#dddfe2',
        }
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'fb': '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
      }
    },
  },
  plugins: [],
}
