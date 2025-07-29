// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Убедись, что BrowserRouter импортирован!

// Импортируем наши страницы
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import CoinDetailPage from './pages/CoinDetailPage';

function App() {
  return (
    // *** ВЕСЬ КОНТЕНТ ДОЛЖЕН БЫТЬ ОБЕРНУТ В <BrowserRouter> ***
    <BrowserRouter>
      <div>
        <h1>ПРОВЕРКА!!!</h1> {/* Оставь это для проверки */}
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link> {/* Эти Link должны быть внутри BrowserRouter */}
            </li>
            <li>
              <Link to="/favorites">Избранное</Link>
            </li>
            <li>
              <Link to="/coin/bitcoin">Страница Bitcoin (пример)</Link>
            </li>
          </ul>
        </nav>

        <Routes> {/* Routes также должен быть внутри BrowserRouter */}
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/coin/:id" element={<CoinDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;