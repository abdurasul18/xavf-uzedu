/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#19191F',
        secondary: "#F2F3F5",
        danger: "#FF2D55",
        success: '#34C771',
        blue: '#007AFF',
        'grey': {
          50: '#F6F7F9',
          100: '#EDEDF1',
          200: '#D7D9E0',
          300: "#B3B8C6",
          400: "#8A92A6",
          500: '#6B758C',
          800: '#414655',
          900: '#363944',
          950: "#24252D"
        },
        'blue': {
          50: "#EFF9FF",
          100: '#DEF1FF',
          500: '#00AAFF',

        },
        green: {
          500: '#43C073',
        },
        error: "#FF2727"
      },
      screens: {
        '2xl': '1360px',
      }
    },

  },
  plugins: [],
}