import React from 'react';
import { FinancialMetrics } from '../../types/client';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FinancialMetricsSectionProps {
  metrics: FinancialMetrics;
  annualRevenue: number;
}

const FinancialMetricsSection: React.FC<FinancialMetricsSectionProps> = ({ metrics, annualRevenue }) => {
  const getYearlyData = (year: number) => {
    const yearFactor = {
      2022: 0.85,
      2023: 0.92,
      2024: 1
    }[year] || 1;

    return {
      annualRevenue: annualRevenue * yearFactor,
      ...Object.entries(metrics).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value * yearFactor
      }), {})
    };
  };

  const years = [2022, 2023, 2024];
  const yearlyData = years.map(year => getYearlyData(year));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const metrics_order = [
    { key: 'annualRevenue', label: 'PNB Bancaire' },
    { key: 'margeCommerciale', label: 'Marge Commerciale' },
    { key: 'productionExercice', label: 'Production de l\'Exercice' },
    { key: 'valeurAjoutee', label: 'Valeur Ajoutée' },
    { key: 'ebe', label: 'EBE' },
    { key: 'resultatExploitation', label: 'Résultat d\'Exploitation' },
    { key: 'resultatNet', label: 'Résultat Net' },
    { key: 'capaciteAutofinancement', label: 'Capacité d\'Autofinancement' },
    { key: 'bfr', label: 'BFR' },
    { key: 'tresorerie', label: 'Trésorerie' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Soldes Intermédiaires de Gestion (SIG)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">Indicateur</th>
              {years.map(year => (
                <th key={year} className="py-3 px-4 text-right">{year}</th>
              ))}
              <th className="py-3 px-4 text-right">Évolution N/N-1</th>
            </tr>
          </thead>
          <tbody>
            {metrics_order.map(({ key, label }) => (
              <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{label}</td>
                {yearlyData.map((data, index) => (
                  <td key={index} className="py-3 px-4 text-right">
                    {formatCurrency(data[key as keyof typeof data])}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end">
                    {yearlyData[2][key as keyof typeof data] > yearlyData[1][key as keyof typeof data] ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={
                      yearlyData[2][key as keyof typeof data] > yearlyData[1][key as keyof typeof data]
                        ? 'text-green-600'
                        : 'text-red-600'
                    }>
                      {calculateGrowth(
                        yearlyData[2][key as keyof typeof data],
                        yearlyData[1][key as keyof typeof data]
                      )}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialMetricsSection;