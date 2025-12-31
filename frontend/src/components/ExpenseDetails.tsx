import React, { useState } from 'react';

interface Expense {
  date: string;
  category: string;
  description: string;
  amountEur: string;
  amountCad: string;
}

interface ExpenseDetailsProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ onAddExpense }) => {
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amountEur, setAmountEur] = useState<string>('');
  const [amountCad, setAmountCad] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({ date, category, description, amountEur, amountCad });
    setDate('');
    setCategory('');
    setDescription('');
    setAmountEur('');
    setAmountCad('');
  };

  return (
    <div>
      <h2>Détails des Dépenses</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Catégorie" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="number" value={amountEur} onChange={(e) => setAmountEur(e.target.value)} placeholder="Montant (EUR)" />
        <input type="number" value={amountCad} onChange={(e) => setAmountCad(e.target.value)} placeholder="Montant (CAD)" />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ExpenseDetails;
