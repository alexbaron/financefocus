import React from 'react';

interface Budget {
  income: { eur: number; cad: number };
  expenses: { eur: number; cad: number };
  savings: { eur: number; cad: number };
  capital: { eur: number; cad: number };
}

interface Total {
  eur: number;
  cad: number;
}

interface BudgetSummaryProps {
  budget: Budget;
  totalDebit: Total;
  totalCredit: Total;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget, totalDebit, totalCredit }) => {
  const calculateBalance = (credit: number, debit: number): number => credit - debit;

  return (
    <div>
      <h2>Résumé du Budget</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Budget Mensuel (EUR)</th>
            <th>Budget Mensuel (CAD)</th>
            <th>Total Débit (EUR)</th>
            <th>Total Débit (CAD)</th>
            <th>Total Crédit (EUR)</th>
            <th>Total Crédit (CAD)</th>
            <th>Solde (EUR)</th>
            <th>Solde (CAD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revenus</td>
            <td>{budget.income.eur}</td>
            <td>{budget.income.cad}</td>
            <td>{totalDebit.eur}</td>
            <td>{totalDebit.cad}</td>
            <td>{totalCredit.eur}</td>
            <td>{totalCredit.cad}</td>
            <td>{calculateBalance(totalCredit.eur, totalDebit.eur)}</td>
            <td>{calculateBalance(totalCredit.cad, totalDebit.cad)}</td>
          </tr>
          <tr>
            <td>Capitaux</td>
            <td>{budget.capital && budget.capital.eur}</td>
            <td>{budget.capital && budget.capital.cad}</td>
            <td>{totalDebit.eur}</td>
            <td>{totalDebit.cad}</td>
            <td>{totalCredit.eur}</td>
            <td>{totalCredit.cad}</td>
            <td>{calculateBalance(totalCredit.eur, totalDebit.eur)}</td>
            <td>{calculateBalance(totalCredit.cad, totalDebit.cad)}</td>
          </tr>
          {/* Ajoutez d'autres catégories ici */}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetSummary;
