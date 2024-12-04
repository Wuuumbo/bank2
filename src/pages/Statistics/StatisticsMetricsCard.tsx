import React from 'react';
import { StatisticalMetrics } from '../../services/statisticsService';

interface StatisticsMetricsCardProps {
  title: string;
  metrics: StatisticalMetrics['credits'] | StatisticalMetrics['debits'] | StatisticalMetrics['balance'];
  type: 'credits' | 'debits' | 'balance';
}

const StatisticsMetricsCard: React.FC<StatisticsMetricsCardProps> = ({
  title,
  metrics,
  type,
}) => {
  const formatValue = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return '€0';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return '0.00';
    return value.toFixed(2);
  };

  const formatDays = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return '0 jours';
    return `${value} jours`;
  };

  const renderMetricItem = (label: string, value: number | undefined, formatter: (val: number | undefined) => string) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{formatter(value)}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {renderMetricItem('Moyenne', metrics.mean, formatValue)}
          {renderMetricItem('Médiane', metrics.median, formatValue)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderMetricItem('Écart-type', metrics.stdDev, formatValue)}
          {renderMetricItem('Asymétrie', metrics.skewness, formatRatio)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderMetricItem('Minimum', metrics.min, formatValue)}
          {renderMetricItem('Maximum', metrics.max, formatValue)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {renderMetricItem('Q1 (25%)', metrics.q1, formatValue)}
          {renderMetricItem('Q3 (75%)', metrics.q3, formatValue)}
        </div>

        {type === 'balance' && 'volatility' in metrics && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {renderMetricItem('Volatilité', metrics.volatility, formatRatio)}
              {renderMetricItem('Kurtosis', metrics.kurtosis, formatRatio)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {renderMetricItem('Jours positifs', metrics.daysPositive, formatDays)}
              {renderMetricItem('Jours négatifs', metrics.daysNegative, formatDays)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsMetricsCard;