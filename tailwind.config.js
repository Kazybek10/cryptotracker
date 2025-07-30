/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- Добавьте эту строку для включения темной темы по классу
  theme: {
    extend: {},
  },
  plugins: [],
}