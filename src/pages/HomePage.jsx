// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.error("Error loading coins:", err);
        setError("Failed to load cryptocurrency data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  //Code for loading, error and data
  if (loading) {
    return <div className="p-6 text-center text-xl">Loading data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Trending Coins Feed</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map(coin => (
          <div key={coin.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
            <h3 className="text-lg font-semibold">{coin.name}</h3>
            <p className="text-gray-700">${coin.current_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-gray-500">Data provided by the CoinGecko API..</p>
    </div>
  );
};

export default HomePage;