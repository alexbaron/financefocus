import React from 'react';

interface BudgetItem {
  id: number;
  type: string;
  description: string;
  amountEur: number;
  amountCad: number;
  category?: string;
  date: string;
}

interface BudgetItemsListProps {
  items: BudgetItem[];
  onDelete: (id: number) => void;
}

const BudgetItemsList: React.FC<BudgetItemsListProps> = ({ items, onDelete }) => {
  const getTypeLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      income: 'Revenu',
      expense: 'Dépense',
      savings: 'Épargne',
      capital: 'Capital',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      income: 'bg-green-100 text-green-800',
      expense: 'bg-red-100 text-red-800',
      savings: 'bg-blue-100 text-blue-800',
      capital: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Historique des transactions</h2>
        <p className="text-gray-500">Aucune transaction pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Historique des transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant EUR
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant CAD
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {parseFloat(item.amountEur.toString()).toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {parseFloat(item.amountCad.toString()).toFixed(2)} $
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Supprimer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetItemsList;
