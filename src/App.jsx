// src/App.jsx
// Импортируем React и его хуки - useState для хранения состояния, useEffect для выполнения действий после рендера
import React, { useState, useEffect } from 'react';
// Импортируем штуки для роутинга - чтобы страницы переключались
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Импортируем наши страницы, чтобы их можно было показывать
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import CoinDetailPage from './pages/CoinDetailPage';

function App() {
  // Создаем состояние для нашей темы.
  // Сначала пытаемся взять тему из localStorage (чтобы сайт запомнил выбор).
  // Если там ничего нет, то смотрим, какая тема у пользователя в системе (светлая/темная).
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode'); // Пробуем загрузить из памяти браузера
    if (savedMode !== null) {
      return JSON.parse(savedMode); // Если нашли, используем то, что там
    }
    // Если не нашли, смотрим, что там в настройках операционной системы у пользователя
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Этот хук (useEffect) будет запускаться каждый раз, когда меняется darkMode.
  // Он добавляет или убирает класс 'dark' с самого главного HTML-элемента (<html>).
  // Tailwind потом смотрит на этот класс и применяет нужные стили.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Добавляем класс 'dark'
    } else {
      document.documentElement.classList.remove('dark'); // Убираем класс 'dark'
    }
    // И сохраняем текущий выбор в localStorage, чтобы при следующем заходе тема сохранилась
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]); // Зависимость: запускаемся, когда меняется darkMode

  // Функция, которая просто меняет состояние darkMode на противоположное
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // prevMode - это предыдущее значение darkMode
  };

  return (
    <BrowserRouter> {/* Оборачиваем все приложение в BrowserRouter, чтобы роутинг работал */}
      {/* Навигационная панель - тут будут базовые стили и стили для темной темы */}
      {/* bg-gray-900 - фон в светлой теме, dark:bg-gray-950 - фон в темной теме */}
      <nav className="bg-gray-900 p-4 shadow-lg dark:bg-gray-950">
        <div className="container mx-auto flex justify-between items-center">
          {/* Логотип/Название сайта, которое ведет на главную */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
            Crypto<span className="text-blue-400">Tracker</span>
          </Link>
          {/* Список ссылок в навигации */}
          <ul className="flex items-center space-x-4 sm:space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Избранное
              </Link>
            </li>
            <li>
              {/* Вот наша кнопка переключения темы! */}
              <button
                onClick={toggleDarkMode} // При клике вызываем функцию toggleDarkMode
                className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                aria-label="Переключить темную тему" // Это для доступности, чтобы программы чтения экрана понимали, что это за кнопка
              >
                {/* В зависимости от темы показываем иконку солнца или луны */}
                {darkMode ? (
                  // Иконка луны для темной темы (это SVG-код, можно найти в интернете)
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 0010.586 10.586z"></path></svg>
                ) : (
                  // Иконка солнца для светлой темы (тоже SVG)
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm5.586-1.586a1 1 0 010 1.414.5.5 0 00-.707.707 1 1 0 01-1.414 0 .5.5 0 00-.707-.707 1 1 0 010-1.414zM10 18a8 8 0 100-16 8 8 0 000 16zM10 4a6 6 0 110 12 6 6 0 010-12z"></path></svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Здесь будут отображаться наши страницы (HomePage, FavoritesPage, CoinDetailPage) */}
      <div className="pt-0"> {/* pt-0 убирает верхний отступ, чтобы навигация не съезжала */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/coin/:id" element={<CoinDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

