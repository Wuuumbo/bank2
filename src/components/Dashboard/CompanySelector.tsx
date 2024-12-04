import React from 'react';
import { Building2 } from 'lucide-react';
import { Client } from '../../types/client';

interface CompanySelectorProps {
  companies: Client[];
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  selectedCompanyId,
  onCompanyChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center space-x-4">
        <Building2 className="w-6 h-6 text-blue-600" />
        <select
          value={selectedCompanyId}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name} - {company.sector}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompanySelector;