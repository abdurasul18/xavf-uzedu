/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        main : '#19191F',
        secondary : "#F2F3F5",
        danger : "#FF2D55",
        success : '#34C771',
        blue : '#007AFF',
      },
      screens : {
        '2xl': '1360px',
      }
    },
    
  },
  plugins: [],
}