"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import BudgetSummary from '@/components/BudgetSummary';
import IncomeDetails from '@/components/IncomeDetails';
import ExpenseDetails from '@/components/ExpenseDetails';
import Savings from '@/components/Savings';
import CurrencyConversion from '@/components/CurrencyConversion';
import CapitalDetails from '@/components/CapitalDetails';
import { saveBudgetItem, getBudgetItems, getAllBudgetItems } from '../utils/db';

export default function Home() {

  const [budget, setBudget] = useState<{
    income: { eur: number; cad: number };
    expenses: { eur: number; cad: number };
    savings: { eur: number; cad: number };
  }>({
    income: { eur: 0, cad: 0 },
    expenses: { eur: 0, cad: 0 },
    savings: { eur: 0, cad: 0 },
  });

  const [totalDebit, setTotalDebit] = useState<{ eur: number; cad: number }>({ eur: 0, cad: 0 });
  const [totalCredit, setTotalCredit] = useState<{ eur: number; cad: number }>({ eur: 0, cad: 0 });

  useEffect(() => {
    axios.get('/api/budget-items')
      .then(response => {
        // Process the response data to update the budget state
      })
      .catch(error => {
        console.error('Error fetching budget items:', error);
      });
  }, []);


  const handleAddIncome = (income: { date: string; description: string; amountEur: string; amountCad: string }) => {
    axios.post('/api/add-budget-item', {
      ...income,
      type: 'income'
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      income: {
        eur: prevBudget.income.eur + parseFloat(income.amountEur),
        cad: prevBudget.income.cad + parseFloat(income.amountCad),
      },
    }));
    setTotalCredit((prevTotal) => ({
      eur: prevTotal.eur + parseFloat(income.amountEur),
      cad: prevTotal.cad + parseFloat(income.amountCad),
    }));
  };

  const handleAddExpense = (expense: { date: string; category: string; description: string; amountEur: string; amountCad: string }) => {
    axios.post('/api/add-budget-item', {
      ...expense,
      type: 'expense'
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      expenses: {
        eur: prevBudget.expenses.eur + parseFloat(expense.amountEur),
        cad: prevBudget.expenses.cad + parseFloat(expense.amountCad),
      },
    }));
    setTotalDebit((prevTotal) => ({
      eur: prevTotal.eur + parseFloat(expense.amountEur),
      cad: prevTotal.cad + parseFloat(expense.amountCad),
    }));
  };

  const handleAddSavings = (savings: { date: string; description: string; amountEur: string; amountCad: string }) => {
    axios.post('/api/add-budget-item', {
      ...savings,
      type: 'savings'
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      savings: {
        eur: prevBudget.savings.eur + parseFloat(savings.amountEur),
        cad: prevBudget.savings.cad + parseFloat(savings.amountCad),
      },
    }));
    setTotalCredit((prevTotal) => ({
      eur: prevTotal.eur + parseFloat(savings.amountEur),
      cad: prevTotal.cad + parseFloat(savings.amountCad),
    }));
  };

  const handleAddCapital = (capital: { date: string; description: string; amountEur: string; amountCad: string }) => {
    axios.post('/api/add-budget-item', {
      ...capital,
      type: 'capital'
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      capital: {
        eur: prevBudget.capital.eur + parseFloat(capital.amountEur),
        cad: prevBudget.capital.cad + parseFloat(capital.amountCad),
      },
    }));
    setTotalCredit((prevTotal) => ({
      eur: prevTotal.eur + parseFloat(capital.amountEur),
      cad: prevTotal.cad + parseFloat(capital.amountCad),
    }));
  };

  const handleUpdateRate = (rate: { date: string; rate: string }) => {
    // Mettre à jour le taux de change si nécessaire
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>Suivi de Budget</h1>
        <BudgetSummary budget={budget} totalDebit={totalDebit} totalCredit={totalCredit} />
        <IncomeDetails onAddIncome={handleAddIncome} />
        <ExpenseDetails onAddExpense={handleAddExpense} />
        <Savings onAddSavings={handleAddSavings} />
        <CapitalDetails onAddCapital={handleAddCapital} />
        <CurrencyConversion onUpdateRate={handleUpdateRate} />
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
