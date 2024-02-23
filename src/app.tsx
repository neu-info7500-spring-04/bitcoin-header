import React, { useEffect, useState } from 'react';
import { fetchBitcoinPrice } from './btc-api';

const App: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74'; // Replace 'YOUR_API_KEY' with your actual API key
  useEffect(() => {

    fetchBitcoinPrice(apiKey)
      .then((price: any) => {
        setBitcoinPrice(price);
      })
      .catch((error: any) => {
        console.error('Failed to fetch Bitcoin price:', error);
      });
  }, []);

  return (
    <div>
      <h1>Bitcoin Price</h1>
      {bitcoinPrice !== null ? (
        <p>${bitcoinPrice.toFixed(2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
