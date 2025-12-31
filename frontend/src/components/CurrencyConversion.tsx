import React, { useState } from 'react';

interface Rate {
  date: string;
  rate: string;
}

interface CurrencyConversionProps {
  onUpdateRate: (rate: Rate) => void;
}

const CurrencyConversion: React.FC<CurrencyConversionProps> = ({ onUpdateRate }) => {
  const [date, setDate] = useState<string>('');
  const [rate, setRate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRate({ date, rate });
    setDate('');
    setRate('');
  };

  return (
    <div>
      <h2>Conversion de Devises</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Taux de Change (EUR/CAD)" />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default CurrencyConversion;
