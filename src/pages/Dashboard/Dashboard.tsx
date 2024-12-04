import React, { useMemo } from 'react';
import ScoreCard from '../../components/Dashboard/ScoreCard';
import AlertsSection from '../../components/Dashboard/AlertsSection';
import CompanyNotes from '../../components/Dashboard/CompanyNotes';
import { useCompanies } from '../../context/CompaniesContext';
import { generateFinancialDataForCompany } from '../../services/financialDataService';

const Dashboard: React.FC = () => {
  const { selectedCompanyId, getCompanyById } = useCompanies();
  const selectedCompany = getCompanyById(selectedCompanyId);

  const financialData = useMemo(() => {
    if (!selectedCompany) return null;
    return generateFinancialDataForCompany(selectedCompany);
  }, [selectedCompany]);

  if (!selectedCompany || !financialData) {
    return <div>Aucune entreprise sélectionnée</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="Stabilité Financière"
          score={financialData.scores.stability}
          type="stability"
        />
        <ScoreCard
          title="Risque de Découvert"
          score={financialData.scores.overdraft}
          type="overdraft"
        />
        <ScoreCard
          title="Opportunité de Crédit"
          score={financialData.scores.creditLine}
          type="creditLine"
        />
      </div>

      <div>
        <AlertsSection alerts={financialData.alerts} />
      </div>

      <CompanyNotes companyId={selectedCompany.id} />
    </div>
  );
};

export default Dashboard;