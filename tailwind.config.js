// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Тут Tailwind будет искать классы в твоих файлах, чтобы сгенерировать нужный CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Вот это важно! Говорим Tailwind'у, что тёмная тема будет включаться,
  // когда на элементе <html> будет класс 'dark'.
  darkMode: 'class', // Теперь Tailwind будет генерировать стили типа dark:bg-gray-800

  theme: {
    extend: {
      // Здесь можно добавить свои кастомные цвета, шрифты и т.д.
      // Пока что оставим пустым, но знать полезно!
    },
  },
  plugins: [], // Тут подключаются всякие полезные плагины для Tailwind
}
