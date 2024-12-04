import React from 'react';
import { useCompanies } from '../../context/CompaniesContext';
import FinancialMetricsSection from '../../components/Dashboard/FinancialMetricsSection';
import BalanceAnalysis from './BalanceAnalysis';

const FinancialPage: React.FC = () => {
  const { selectedCompanyId, getCompanyById } = useCompanies();
  const selectedCompany = getCompanyById(selectedCompanyId);

  if (!selectedCompany) {
    return <div>No company selected</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Financial Analysis</h1>
      
      <FinancialMetricsSection 
        metrics={selectedCompany.financialMetrics}
        annualRevenue={selectedCompany.annualRevenue}
      />

      <BalanceAnalysis company={selectedCompany} />
    </div>
  );
};

export default FinancialPage;