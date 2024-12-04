import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface GaussianDistributionChartProps {
  data: Array<{
    date: string;
    balance: number;
    credits: number;
    debits: number;
  }>;
}

const GaussianDistributionChart: React.FC<GaussianDistributionChartProps> = ({ data }) => {
  // Calculer la moyenne et l'écart-type des soldes
  const balances = data.map(d => d.balance);
  const mean = balances.reduce((sum, val) => sum + val, 0) / balances.length;
  const variance = balances.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / balances.length;
  const stdDev = Math.sqrt(variance);

  // Générer les points de la courbe gaussienne
  const generateGaussianPoints = () => {
    const points = [];
    const min = Math.min(...balances);
    const max = Math.max(...balances);
    const step = (max - min) / 100;

    for (let x = min; x <= max; x += step) {
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
      points.push({
        value: x,
        density: y,
      });
    }

    return points;
  };

  const gaussianData = generateGaussianPoints();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Distribution Normale des Soldes
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={gaussianData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="value"
              tickFormatter={(value) =>
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  notation: 'compact',
                }).format(value)
              }
            />
            <YAxis
              tickFormatter={(value) =>
                Number(value).toFixed(6)
              }
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                name === 'density' 
                  ? Number(value).toFixed(6)
                  : new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(value),
                name === 'density' ? 'Densité' : 'Valeur'
              ]}
            />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#2563eb"
              fill="#93c5fd"
              fillOpacity={0.6}
              name="Distribution"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Moyenne</p>
          <p className="text-lg font-semibold">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(mean)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Écart-type</p>
          <p className="text-lg font-semibold">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(stdDev)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GaussianDistributionChart;