import React, { useState } from 'react';

interface Capital {
  date: string;
  description: string;
  amountEur: string;
  amountCad: string;
}

interface CapitalDetailsProps {
  onAddCapital: (capital: Capital) => void;
}

const CapitalDetails: React.FC<CapitalDetailsProps> = ({ onAddCapital }) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amountEur, setAmountEur] = useState<string>('');
  const [amountCad, setAmountCad] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCapital({ date, description, amountEur, amountCad });
    setDate('');
    setDescription('');
    setAmountEur('');
    setAmountCad('');
  };

  return (
    <div>
      <h2>Détails des Capitaux</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="number" value={amountEur} onChange={(e) => setAmountEur(e.target.value)} placeholder="Montant (EUR)" />
        <input type="number" value={amountCad} onChange={(e) => setAmountCad(e.target.value)} placeholder="Montant (CAD)" />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CapitalDetails;
