import React from 'react';
import CompaniesTable from './CompaniesTable';
import { useCompanies } from '../../context/CompaniesContext';

const CompaniesPage: React.FC = () => {
  const { companies } = useCompanies();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Companies Database</h1>
      </div>
      <CompaniesTable companies={companies} />
    </div>
  );
};

export default CompaniesPage;