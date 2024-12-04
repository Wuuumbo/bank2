import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface CashFlowChartProps {
  data: Array<{
    date: string;
    balance: number;
    credits: number;
    debits: number;
  }>;
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');
  const [selectedMetrics, setSelectedMetrics] = useState({
    variation: true,
    credits: true,
    debits: true,
    balance: true
  });
  
  const getFilteredData = () => {
    let filteredData = data;
    
    // Filter by year
    if (selectedPeriod !== 'all') {
      filteredData = filteredData.filter(item => {
        const itemYear = new Date(item.date).getFullYear();
        return itemYear === Number(selectedPeriod);
      });
    }
    
    // Filter by quarter
    if (selectedQuarter !== 'all') {
      filteredData = filteredData.filter(item => {
        const date = new Date(item.date);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `T${quarter}` === selectedQuarter;
      });
    }
    
    return filteredData;
  };

  const filteredData = getFilteredData();
  
  // Calculate daily balance variations
  const variationsData = filteredData.map((item, index) => {
    const variation = index > 0 ? item.balance - filteredData[index - 1].balance : 0;
    return {
      date: item.date,
      variation,
      credits: item.credits,
      debits: item.debits,
      balance: item.balance
    };
  });

  const toggleMetric = (metric: keyof typeof selectedMetrics) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Variations de Trésorerie
          </h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les années</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les trimestres</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => toggleMetric('variation')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMetrics.variation
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Variations
          </button>
          <button
            onClick={() => toggleMetric('credits')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMetrics.credits
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Crédits
          </button>
          <button
            onClick={() => toggleMetric('debits')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMetrics.debits
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Débits
          </button>
          <button
            onClick={() => toggleMetric('balance')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMetrics.balance
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Soldes
          </button>
        </div>
      </div>

      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={variationsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'dd MMM yyyy')}
            />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  notation: 'compact',
                }).format(value)
              }
            />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'dd MMM yyyy')}
              formatter={(value: number) =>
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(value)
              }
            />
            <Legend />
            {selectedMetrics.variation && (
              <Line
                type="monotone"
                dataKey="variation"
                stroke="#2563eb"
                name="Variation Journalière"
                strokeWidth={2}
              />
            )}
            {selectedMetrics.credits && (
              <Line
                type="monotone"
                dataKey="credits"
                stroke="#16a34a"
                name="Crédits"
                strokeWidth={2}
              />
            )}
            {selectedMetrics.debits && (
              <Line
                type="monotone"
                dataKey="debits"
                stroke="#dc2626"
                name="Débits"
                strokeWidth={2}
              />
            )}
            {selectedMetrics.balance && (
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#9333ea"
                name="Soldes"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;