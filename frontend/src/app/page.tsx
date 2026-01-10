"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/auth';
import styles from "./page.module.css";
import BudgetSummary from '@/components/BudgetSummary';
import IncomeDetails from '@/components/IncomeDetails';
import ExpenseDetails from '@/components/ExpenseDetails';
import Savings from '@/components/Savings';
import CurrencyConversion from '@/components/CurrencyConversion';
import CapitalDetails from '@/components/CapitalDetails';
import BudgetItemsList from '@/components/BudgetItemsList';
import ExchangeRateDisplay from '@/components/ExchangeRateDisplay';

import { useAuth } from '@/contexts/AuthContext';

interface BudgetItem {
  id: number;
  type: string;
  description: string;
  amountEur: number;
  amountCad: number;
  category?: string;
  date: string;
}

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [budget, setBudget] = useState<{
    income: { eur: number; cad: number };
    expenses: { eur: number; cad: number };
    savings: { eur: number; cad: number };
    capital: { eur: number; cad: number };
  }>({
    income: { eur: 0, cad: 0 },
    expenses: { eur: 0, cad: 0 },
    savings: { eur: 0, cad: 0 },
    capital: { eur: 0, cad: 0 },
  });

  const [totalDebit, setTotalDebit] = useState<{ eur: number; cad: number }>({ eur: 0, cad: 0 });
  const [totalCredit, setTotalCredit] = useState<{ eur: number; cad: number }>({ eur: 0, cad: 0 });
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user) {
      loadBudgetItems();
    }
  }, [user, loading]);

  const loadBudgetItems = () => {
    api.get('/budget-items')
      .then(response => {
        const items = response.data;
        setBudgetItems(items);
        
        const newBudget = {
          income: { eur: 0, cad: 0 },
          expenses: { eur: 0, cad: 0 },
          savings: { eur: 0, cad: 0 },
          capital: { eur: 0, cad: 0 },
        };
        const newTotalDebit = { eur: 0, cad: 0 };
        const newTotalCredit = { eur: 0, cad: 0 };

        items.forEach((item: BudgetItem) => {
          const amountEur = item.amountEur;
          const amountCad = item.amountCad;

          switch (item.type) {
            case 'income':
              newBudget.income.eur += amountEur;
              newBudget.income.cad += amountCad;
              newTotalCredit.eur += amountEur;
              newTotalCredit.cad += amountCad;
              break;
            case 'expense':
              newBudget.expenses.eur += amountEur;
              newBudget.expenses.cad += amountCad;
              newTotalDebit.eur += amountEur;
              newTotalDebit.cad += amountCad;
              break;
            case 'savings':
              newBudget.savings.eur += amountEur;
              newBudget.savings.cad += amountCad;
              newTotalCredit.eur += amountEur;
              newTotalCredit.cad += amountCad;
              break;
            case 'capital':
              newBudget.capital.eur += amountEur;
              newBudget.capital.cad += amountCad;
              newTotalCredit.eur += amountEur;
              newTotalCredit.cad += amountCad;
              break;
          }
        });

        setBudget(newBudget);
        setTotalDebit(newTotalDebit);
        setTotalCredit(newTotalCredit);
      })
      .catch(error => {
        console.error('Error fetching budget items:', error);
      });
  };


  const handleAddIncome = async (income: { date: string; description: string; amountEur: string; amountCad: string; category?: string }) => {
    try {
      await api.post('/budget-items', {
        type: 'income',
        date: income.date,
        description: income.description,
        amountEur: income.amountEur,
        amountCad: income.amountCad,
        category: income.category,
      });
      
      loadBudgetItems();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleAddExpense = async (expense: { date: string; category: string; description: string; amountEur: string; amountCad: string }) => {
    try {
      await api.post('/budget-items', {
        type: 'expense',
        date: expense.date,
        category: expense.category,
        description: expense.description,
        amountEur: expense.amountEur,
        amountCad: expense.amountCad,
      });

      loadBudgetItems();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleAddSavings = async (savings: { date: string; description: string; amountEur: string; amountCad: string }) => {
    try {
      await api.post('/budget-items', {
        type: 'savings',
        date: savings.date,
        description: savings.description,
        amountEur: savings.amountEur,
        amountCad: savings.amountCad,
      });

      loadBudgetItems();
    } catch (error) {
      console.error('Error adding savings:', error);
    }
  };

  const handleAddCapital = async (capital: { date: string; description: string; amountEur: string; amountCad: string }) => {
    try {
      await api.post('/budget-items', {
        type: 'capital',
        date: capital.date,
        description: capital.description,
        amountEur: capital.amountEur,
        amountCad: capital.amountCad,
      });

      loadBudgetItems();
    } catch (error) {
      console.error('Error adding capital:', error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      return;
    }

    try {
      await api.delete(`/budget-items/${id}`);
      loadBudgetItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Erreur lors de la suppression de la transaction');
    }
  };

  const handleUpdateRate = (_rate: { date: string; rate: string }) => {
    // Mettre à jour le taux de change si nécessaire
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.page}>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FinanceFocus</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <div className="mb-6">
          <ExchangeRateDisplay />
        </div>
        <h1>Suivi de Budget</h1>
        <BudgetSummary budget={budget} totalDebit={totalDebit} totalCredit={totalCredit} />
        <IncomeDetails onAddIncome={handleAddIncome} />
        <ExpenseDetails onAddExpense={handleAddExpense} />
        <Savings onAddSavings={handleAddSavings} />
        <CapitalDetails onAddCapital={handleAddCapital} />
        <CurrencyConversion onUpdateRate={handleUpdateRate} />
        <BudgetItemsList items={budgetItems} onDelete={handleDeleteItem} />
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
