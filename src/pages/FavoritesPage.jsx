// src/pages/FavoritesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  // TODO: Здесь будет логика для получения избранных монет
  const favoriteCoins = []; // Пока что пустой массив для демонстрации

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8">
      <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center mb-6 text-lg">
        ← Вернуться на главную
      </Link>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 sm:mb-12 leading-tight">
        Мои <span className="text-purple-400">Избранные</span> монеты
      </h1>

      {favoriteCoins.length === 0 ? (
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-lg mx-auto">
          <p className="text-2xl font-semibold mb-4 text-gray-400">
            У вас пока нет избранных монет.
          </p>
          <p className="text-lg text-gray-500 mb-6">
            Добавьте монеты в избранное с главной страницы, чтобы они появились здесь!
          </p>
          <Link to="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Начать добавлять монеты
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Здесь будет код для отображения избранных монет, аналогичный HomePage */}
          {favoriteCoins.map(coin => (
            <Link to={`/coin/${coin.id}`} key={coin.id} className="block">
              <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 border border-gray-700">
                <div className="flex items-center mb-4">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 shadow-md" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight">{coin.name}</h2>
                    <p className="text-gray-400 text-sm sm:text-base">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">Текущая цена:</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-green-400">
                      ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className={`text-right ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <p className="text-sm sm:text-base">24ч:</p>
                    <p className="text-lg sm:text-xl font-semibold">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;