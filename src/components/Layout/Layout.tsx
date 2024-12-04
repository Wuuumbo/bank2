import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useCompanies } from '../../context/CompaniesContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedCompanyId, getCompanyById } = useCompanies();
  const selectedCompany = getCompanyById(selectedCompanyId);

  if (!selectedCompany) {
    return <div>Aucune entreprise sélectionnée</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header client={selectedCompany} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;