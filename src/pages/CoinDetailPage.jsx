// src/pages/CoinDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinData(response.data);
      } catch (err) {
        console.error(`Ошибка при загрузке данных для монеты ${id}:`, err);
        setError(`Не удалось загрузить данные для монеты "${id}". Возможно, такой монеты нет или проблемы с API.`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoinDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Загрузка данных о {id}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-900 text-white dark:bg-red-950">
        <div className="text-center p-6 rounded-lg shadow-lg bg-red-800 dark:bg-red-900">
          <p className="text-2xl font-bold mb-4">Ошибка загрузки!</p>
          <p className="text-lg">{error}</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 dark:bg-red-700 dark:hover:bg-red-800">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white dark:bg-gray-950">
        <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 dark:bg-gray-850">
          <p className="text-2xl font-bold mb-4">Монета не найдена</p>
          <p className="text-lg text-gray-400">Проверьте ID монеты и попробуйте снова.</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8 dark:from-gray-950 dark:to-black">
      <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center mb-6 text-lg dark:text-blue-300 dark:hover:text-blue-200">
        ← Вернуться на главную
      </Link>

      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700 max-w-4xl mx-auto dark:bg-gray-850 dark:border-gray-750">
        <div className="flex items-center mb-6">
          <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 shadow-md" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white dark:text-gray-100">{coinData.name}</h1>
            <p className="text-gray-400 text-lg sm:text-xl">{coinData.symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner dark:bg-gray-800">
            <p className="text-gray-300 text-sm mb-1">Текущая цена (USD):</p>
            <p className="text-3xl font-bold text-green-400 dark:text-green-300">
              ${coinData.market_data.current_price.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner dark:bg-gray-800">
            <p className="text-gray-300 text-sm mb-1">Изменение за 24ч:</p>
            <p className={`text-3xl font-bold ${coinData.market_data.price_change_percentage_24h >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner dark:bg-gray-800">
            <p className="text-gray-300 text-sm mb-1">Рыночная капитализация (USD):</p>
            <p className="text-xl font-bold text-blue-400 dark:text-blue-300">
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner dark:bg-gray-800">
            <p className="text-gray-300 text-sm mb-1">Объем за 24ч (USD):</p>
            <p className="text-xl font-bold text-blue-400 dark:text-blue-300">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg shadow-inner mb-8 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-white dark:text-gray-100">График цены (заглушка)</h3>
          <div className="h-48 bg-gray-600 rounded-md flex items-center justify-center text-gray-400 dark:bg-gray-700">
            Здесь будет интерактивный график цены
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white dark:text-gray-100">О монете</h3>
          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: coinData.description.en.substring(0, 300) + '...' }}
          />
          <p className="text-sm text-gray-500 mt-2">
            Больше информации на <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline dark:text-blue-300">официальном сайте</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
          <div>
            <p><span className="font-semibold text-white dark:text-gray-100">Рейтинг CoinGecko:</span> #{coinData.coingecko_rank}</p>
            <p><span className="font-semibold text-white dark:text-gray-100">Хэш-алгоритм:</span> {coinData.hashing_algorithm || 'N/A'}</p>
          </div>
          <div>
            <p><span className="font-semibold text-white dark:text-gray-100">Последнее обновление:</span> {new Date(coinData.last_updated).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-12">
        Данные предоставлены <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline dark:text-blue-300">CoinGecko API</a>.
      </p>
    </div>
  );
};

export default CoinDetailPage;