import React, { useMemo, useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CashFlowHistogramProps {
  data: Array<{
    date: string;
    balance: number;
    credits: number;
    debits: number;
  }>;
}

const CashFlowHistogram: React.FC<CashFlowHistogramProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredData = useMemo(() => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.date).getFullYear() === Number(selectedYear));
  }, [data, selectedYear]);

  const histogramData = useMemo(() => {
    const balances = filteredData.map(d => d.balance);
    const min = Math.min(...balances);
    const max = Math.max(...balances);
    
    // Calculer le nombre de classes selon la règle de Sturges
    const n = balances.length;
    const numberOfBins = Math.ceil(1 + 3.322 * Math.log10(n));
    const binWidth = (max - min) / numberOfBins;

    // Créer les classes
    const bins = Array.from({ length: numberOfBins }, (_, i) => ({
      start: min + i * binWidth,
      end: min + (i + 1) * binWidth,
      count: 0,
    }));

    // Compter les occurrences
    balances.forEach(balance => {
      const binIndex = Math.min(
        Math.floor((balance - min) / binWidth),
        numberOfBins - 1
      );
      bins[binIndex].count++;
    });

    // Calculer la moyenne et l'écart-type pour la courbe normale
    const mean = balances.reduce((sum, val) => sum + val, 0) / n;
    const variance = balances.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    // Générer les points pour la courbe normale
    return bins.map(bin => {
      const x = (bin.start + bin.end) / 2;
      const normalValue = (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(x - mean, 2) / (2 * variance)) * n * binWidth;

      return {
        range: `${new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          notation: 'compact',
        }).format(bin.start)} - ${new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          notation: 'compact',
        }).format(bin.end)}`,
        frequency: bin.count,
        normalDistribution: normalValue,
        centerValue: x,
      };
    });
  }, [filteredData]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Histogramme des flux de trésorerie
        </h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Toutes les années</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toFixed(2),
                name === 'frequency' ? 'Fréquence' : 'Distribution normale'
              ]}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="frequency"
              fill="#8884d8"
              name="Fréquence"
              opacity={0.8}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="normalDistribution"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Distribution normale"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        L'histogramme montre la distribution des soldes de trésorerie, avec une courbe de distribution normale superposée pour comparaison.
        {selectedYear !== 'all' ? ` Données pour l'année ${selectedYear}.` : ' Données pour toutes les années.'}
      </p>
    </div>
  );
};

export default CashFlowHistogram;