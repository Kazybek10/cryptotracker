// src/App.jsx
import React, { useState, useEffect } from 'react'; // Импортируем useState и useEffect
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Импортируем наши страницы
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import CoinDetailPage from './pages/CoinDetailPage';

function App() {
  // Состояние для отслеживания текущей темы (true = темная, false = светлая)
  const [darkMode, setDarkMode] = useState(() => {
    // Проверяем предпочтения пользователя из localStorage или системы
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // useEffect для применения класса 'dark' к элементу <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Сохраняем предпочтение пользователя в localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Функция для переключения темы
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <BrowserRouter>
      {/* Навигационная панель - стили для светлой и темной темы */}
      <nav className="bg-gray-900 p-4 shadow-lg dark:bg-gray-950">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
            Crypto<span className="text-blue-400">Tracker</span>
          </Link>
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
              {/* Кнопка переключения темы */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                aria-label="Переключить темную тему"
              >
                {darkMode ? (
                  // Иконка луны для темной темы
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 0010.586 10.586z"></path></svg>
                ) : (
                  // Иконка солнца для светлой темы
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm5.586-1.586a1 1 0 010 1.414.5.5 0 00-.707.707 1 1 0 01-1.414 0 .5.5 0 00-.707-.707 1 1 0 010-1.414zM10 18a8 8 0 100-16 8 8 0 000 16zM10 4a6 6 0 110 12 6 6 0 010-12z"></path></svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Контейнер для страниц */}
      <div className="pt-0">
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
