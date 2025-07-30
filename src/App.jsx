// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Импортируем наши страницы
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import CoinDetailPage from './pages/CoinDetailPage';

function App() {
  return (
    <BrowserRouter>
      {/* Навигационная панель */}
      <nav className="bg-gray-900 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
            Crypto<span className="text-blue-400">Tracker</span>
          </Link>
          <ul className="flex space-x-4 sm:space-x-6">
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
          </ul>
        </div>
      </nav>

      {/* Контейнер для страниц */}
      <div className="pt-0"> {/* Убираем padding-top, так как nav уже дает отступ */}
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