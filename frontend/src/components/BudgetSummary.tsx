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

  const formatNumber = (value: number | undefined): string => {
    return (value || 0).toFixed(2);
  };

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
            <td>{formatNumber(budget.income?.eur)}</td>
            <td>{formatNumber(budget.income?.cad)}</td>
            <td>{formatNumber(totalDebit?.eur)}</td>
            <td>{formatNumber(totalDebit?.cad)}</td>
            <td>{formatNumber(totalCredit?.eur)}</td>
            <td>{formatNumber(totalCredit?.cad)}</td>
            <td>{formatNumber(calculateBalance(totalCredit?.eur || 0, totalDebit?.eur || 0))}</td>
            <td>{formatNumber(calculateBalance(totalCredit?.cad || 0, totalDebit?.cad || 0))}</td>
          </tr>
          <tr>
            <td>Capitaux</td>
            <td>{formatNumber(budget.capital?.eur)}</td>
            <td>{formatNumber(budget.capital?.cad)}</td>
            <td>{formatNumber(totalDebit?.eur)}</td>
            <td>{formatNumber(totalDebit?.cad)}</td>
            <td>{formatNumber(totalCredit?.eur)}</td>
            <td>{formatNumber(totalCredit?.cad)}</td>
            <td>{formatNumber(calculateBalance(totalCredit?.eur || 0, totalDebit?.eur || 0))}</td>
            <td>{formatNumber(calculateBalance(totalCredit?.cad || 0, totalDebit?.cad || 0))}</td>
          </tr>
          {/* Ajoutez d'autres catégories ici */}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetSummary;
