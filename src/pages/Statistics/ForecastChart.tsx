import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { format } from 'date-fns';
import { FinancialData } from '../../services/financialDataService';

interface ForecastChartProps {
  historicalData: FinancialData['cashFlowData'];
  forecastData: FinancialData['forecast'];
}

const ForecastChart: React.FC<ForecastChartProps> = ({
  historicalData,
  forecastData,
}) => {
  // Combine historical and forecast data
  const combinedData = [
    ...historicalData.slice(-60).map(item => ({
      date: item.date,
      balance: item.balance,
      type: 'historical',
    })),
    ...forecastData.map(item => ({
      date: item.date,
      balance: item.predictedBalance,
      upperBound: item.upperBound,
      lowerBound: item.lowerBound,
      type: 'forecast',
    })),
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Cash Flow Forecast (30 Days)
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM dd')}
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
              labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
              formatter={(value: number) =>
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(value)
              }
            />
            <Legend />
            
            {/* Historical data */}
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Historical Balance"
            />
            
            {/* Forecast data */}
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#16a34a"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Predicted Balance"
            />
            
            {/* Confidence interval */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#16a34a"
              fillOpacity={0.1}
              name="Confidence Interval"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="#16a34a"
              fillOpacity={0.1}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;