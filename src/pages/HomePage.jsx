// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Импортируем Link для перехода на страницу детализации

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        setCoins(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке монет:", err);
        setError("Не удалось загрузить данные о криптовалютах. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Индикатор загрузки
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Загрузка данных о криптовалютах...</p>
        </div>
      </div>
    );
  }

  // Сообщение об ошибке
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-900 text-white">
        <div className="text-center p-6 rounded-lg shadow-lg bg-red-800">
          <p className="text-2xl font-bold mb-4">Ошибка загрузки!</p>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 sm:mb-12 leading-tight">
        Лента популярных <span className="text-blue-400">криптовалют</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {coins.map(coin => (
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

      <p className="text-center text-gray-500 text-sm mt-12">
        Данные предоставлены <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoinGecko API</a>.
      </p>
    </div>
  );
};

export default HomePage;
