import React, { useState, useEffect } from 'react';
import api from '@/lib/auth';

interface Expense {
  date: string;
  category: string;
  description: string;
  amountEur: string;
  amountCad: string;
}

interface Category {
  id: number;
  mnemo: string;
  value: string;
  order: number;
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch expense categories from API
    api.get('/parameters/EXPENSE_CATEGORY')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching expense categories:', error);
      });
  }, []);

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
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.value}>
              {cat.value}
            </option>
          ))}
        </select>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={amountEur} onChange={(e) => setAmountEur(e.target.value)} placeholder="Montant (EUR)" step="0.01" required />
        <input type="number" value={amountCad} onChange={(e) => setAmountCad(e.target.value)} placeholder="Montant (CAD)" step="0.01" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ExpenseDetails;
