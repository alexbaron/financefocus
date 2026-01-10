import React, { useEffect, useState } from 'react';
import api from '@/lib/auth';

interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  effectiveDate: string;
}

const ExchangeRateDisplay: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      const response = await api.get('/exchange-rate/latest');
      setExchangeRate(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError('Impossible de charger le taux de change');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Chargement du taux de change...</span>
        </div>
      </div>
    );
  }

  if (error || !exchangeRate) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-500">{error || 'Taux de change non disponible'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Taux de change</h3>
          <p className="text-lg font-bold text-gray-900">
            1 {exchangeRate.fromCurrency} = {exchangeRate.rate.toFixed(4)} {exchangeRate.toCurrency}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Mis à jour le {new Date(exchangeRate.effectiveDate).toLocaleDateString('fr-FR')}
          </p>
          <button
            onClick={fetchExchangeRate}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            🔄 Actualiser
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 Conversion rapide: 100 EUR ≈ {(100 * exchangeRate.rate).toFixed(2)} CAD
        </p>
      </div>
    </div>
  );
};

export default ExchangeRateDisplay;
