import React, { useState } from 'react';
import { format } from 'date-fns';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface CashFlowData {
  date: string;
  credits: number;
  debits: number;
  balance: number;
}

interface YearlyCashFlowTableProps {
  data: CashFlowData[];
}

const YearlyCashFlowTable: React.FC<YearlyCashFlowTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'date' | 'credits' | 'debits' | 'balance'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const itemsPerPage = 10;

  const filteredData = data.filter(item => {
    const itemYear = new Date(item.date).getFullYear().toString();
    return itemYear === selectedYear;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return sortDirection === 'asc'
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField];
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: typeof sortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Yearly Cash Flow Details
        </h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  <span>Date</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('credits')}
                  className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  <span>Credits</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('debits')}
                  className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  <span>Debits</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('balance')}
                  className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  <span>Balance</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.date}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4 text-sm text-gray-600">
                  {format(new Date(item.date), 'dd MMM yyyy')}
                </td>
                <td className="py-3 px-4 text-right text-sm text-green-600 font-medium">
                  {formatCurrency(item.credits)}
                </td>
                <td className="py-3 px-4 text-right text-sm text-red-600 font-medium">
                  {formatCurrency(item.debits)}
                </td>
                <td className="py-3 px-4 text-right text-sm font-medium">
                  <span
                    className={item.balance >= 0 ? 'text-green-600' : 'text-red-600'}
                  >
                    {formatCurrency(item.balance)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
          {sortedData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearlyCashFlowTable;