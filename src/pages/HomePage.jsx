// src/pages/HomePage.jsx
// Не забываем импортировать нужные хуки и axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link нужен, чтобы переходить на другие страницы

const HomePage = () => {
  // Состояния для данных, загрузки и ошибок - это стандарт
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect - чтобы загрузить данные, когда компонент первый раз показывается
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // Начинаем загрузку, ставим loading в true
        setLoading(true);
        // Делаем запрос к CoinGecko API
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        setCoins(response.data); // Сохраняем полученные монеты
      } catch (err) {
        console.error("Ой, что-то пошло не так при загрузке монет:", err);
        setError("Не удалось загрузить данные о криптовалютах. Попробуйте позже."); // Показываем ошибку пользователю
      } finally {
        setLoading(false); // Загрузка закончилась, ставим loading в false
      }
    };

    fetchCoins(); // Вызываем функцию загрузки
  }, []); // Пустой массив зависимостей означает, что этот код запустится только один раз при загрузке страницы

  // Если данные загружаются, показываем спиннер
  if (loading) {
    return (
      // bg-gray-900 - фон в светлой теме, dark:bg-gray-950 - фон в темной теме
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Загрузка данных о криптовалютах...</p>
        </div>
      </div>
    );
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-900 text-white dark:bg-red-950">
        <div className="text-center p-6 rounded-lg shadow-lg bg-red-800 dark:bg-red-900">
          <p className="text-2xl font-bold mb-4">Ой-ой, ошибка загрузки!</p>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()} // Кнопка для перезагрузки страницы
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Если все загрузилось и нет ошибок, показываем список монет
  return (
    // Основной контейнер страницы. Градиентный фон, отступы, текст белый.
    // dark:from-gray-950 dark:to-black - это стили для темной темы
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8 dark:from-gray-950 dark:to-black">
      {/* Заголовок страницы */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 sm:mb-12 leading-tight">
        Лента популярных <span className="text-blue-400 dark:text-blue-300">криптовалют</span>
      </h1>

      {/* Сетка для карточек монет. Адаптивная, gap - это отступы между элементами сетки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {coins.map(coin => (
          // Каждая карточка - это ссылка на страницу детализации монеты
          <Link to={`/coin/${coin.id}`} key={coin.id} className="block">
            {/* Сама карточка монеты. Фон, отступы, скругленные углы, тень.
                hover:shadow-xl transform hover:-translate-y-1 - это для красивого эффекта при наведении */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 border border-gray-700 dark:bg-gray-850 dark:border-gray-750">
              <div className="flex items-center mb-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 shadow-md" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white dark:text-gray-100">{coin.name}</h2>
                  <p className="text-gray-400 text-sm sm:text-base">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-300 text-sm sm:text-base">Текущая цена:</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-green-400 dark:text-green-300">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                {/* Изменение цены за 24 часа. Цвет зависит от того, выросла цена или упала */}
                <div className={`text-right ${coin.price_change_percentage_24h >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
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

      {/* Футер с информацией об источнике данных */}
      <p className="text-center text-gray-500 text-sm mt-12">
        Данные предоставлены <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline dark:text-blue-300">CoinGecko API</a>.
      </p>
    </div>
  );
};

export default HomePage;
