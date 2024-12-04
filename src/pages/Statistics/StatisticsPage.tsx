import React, { useState } from 'react';
import { useCompanies } from '../../context/CompaniesContext';
import { generateFinancialDataForCompany } from '../../services/financialDataService';
import { calculateStatistics } from '../../services/statisticsService';
import StatisticsMetricsCard from './StatisticsMetricsCard';
import ForecastChart from './ForecastChart';
import CashFlowChart from '../../components/Dashboard/CashFlowChart';
import YearlyCashFlowTable from '../../components/Dashboard/YearlyCashFlowTable';
import CashFlowHistogram from './CashFlowHistogram';

const StatisticsPage: React.FC = () => {
  const { selectedCompanyId, getCompanyById } = useCompanies();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  const selectedCompany = getCompanyById(selectedCompanyId);
  const financialData = selectedCompany ? generateFinancialDataForCompany(selectedCompany) : null;
  
  if (!selectedCompany || !financialData) {
    return <div>Aucune entreprise sélectionnée</div>;
  }

  const filteredData = selectedYear === 'all' 
    ? financialData.cashFlowData 
    : financialData.cashFlowData.filter(d => 
        new Date(d.date).getFullYear() === Number(selectedYear)
      );

  const statistics = calculateStatistics(filteredData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analyse des flux</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Métriques statistiques</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatisticsMetricsCard
            title="Analyse des Crédits"
            metrics={statistics.credits}
            type="credits"
          />
          <StatisticsMetricsCard
            title="Analyse des Débits"
            metrics={statistics.debits}
            type="debits"
          />
          <StatisticsMetricsCard
            title="Analyse des Soldes"
            metrics={statistics.balance}
            type="balance"
          />
        </div>
      </div>

      <CashFlowChart data={financialData.cashFlowData} />

      <YearlyCashFlowTable data={financialData.cashFlowData} />

      <CashFlowHistogram data={financialData.cashFlowData} />

      <ForecastChart
        historicalData={financialData.cashFlowData}
        forecastData={financialData.forecast}
      />
    </div>
  );
};

export default StatisticsPage;