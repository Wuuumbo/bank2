import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Client } from '../types/client';

const mockCompanies: Client[] = [
  {
    id: '1',
    name: 'Tech Solutions SA',
    siren: '123456789',
    sector: 'Technology',
    annualRevenue: 1500000,
    bankServices: ['Current Account', 'Credit Line', 'Business Card'],
    financialMetrics: {
      margeCommerciale: 850000,
      productionExercice: 1500000,
      valeurAjoutee: 980000,
      ebe: 420000,
      resultatExploitation: 380000,
      resultatNet: 285000,
      capaciteAutofinancement: 350000,
      bfr: 180000,
      tresorerie: 290000
    }
  },
  {
    id: '2',
    name: 'Green Energy SARL',
    siren: '987654321',
    sector: 'Energy',
    annualRevenue: 2800000,
    bankServices: ['Current Account', 'Investment Account'],
    financialMetrics: {
      margeCommerciale: 1680000,
      productionExercice: 2800000,
      valeurAjoutee: 1950000,
      ebe: 890000,
      resultatExploitation: 820000,
      resultatNet: 615000,
      capaciteAutofinancement: 750000,
      bfr: 420000,
      tresorerie: 580000
    }
  },
  {
    id: '3',
    name: 'Construction Plus',
    siren: '456789123',
    sector: 'Construction',
    annualRevenue: 4200000,
    bankServices: ['Current Account', 'Credit Line', 'Leasing'],
    financialMetrics: {
      margeCommerciale: 2520000,
      productionExercice: 4200000,
      valeurAjoutee: 2940000,
      ebe: 1260000,
      resultatExploitation: 1180000,
      resultatNet: 885000,
      capaciteAutofinancement: 1050000,
      bfr: 840000,
      tresorerie: 720000
    }
  },
  {
    id: '4',
    name: 'Digital Marketing Pro',
    siren: '789123456',
    sector: 'Marketing',
    annualRevenue: 980000,
    bankServices: ['Current Account', 'Business Card'],
    financialMetrics: {
      margeCommerciale: 588000,
      productionExercice: 980000,
      valeurAjoutee: 686000,
      ebe: 294000,
      resultatExploitation: 245000,
      resultatNet: 186000,
      capaciteAutofinancement: 225000,
      bfr: 147000,
      tresorerie: 196000
    }
  },
  {
    id: '5',
    name: 'Food Services Express',
    siren: '321654987',
    sector: 'Food & Beverage',
    annualRevenue: 3100000,
    bankServices: ['Current Account', 'Credit Line', 'POS Terminal'],
    financialMetrics: {
      margeCommerciale: 1860000,
      productionExercice: 3100000,
      valeurAjoutee: 2170000,
      ebe: 930000,
      resultatExploitation: 868000,
      resultatNet: 651000,
      capaciteAutofinancement: 775000,
      bfr: 465000,
      tresorerie: 620000
    }
  },
  {
    id: '6',
    name: 'Logistics Pro SARL',
    siren: '147258369',
    sector: 'Logistics',
    annualRevenue: 5200000,
    bankServices: ['Current Account', 'Credit Line', 'Fleet Management'],
    financialMetrics: {
      margeCommerciale: 3120000,
      productionExercice: 5200000,
      valeurAjoutee: 3640000,
      ebe: 1560000,
      resultatExploitation: 1430000,
      resultatNet: 1072500,
      capaciteAutofinancement: 1300000,
      bfr: 1040000,
      tresorerie: 890000
    }
  },
  {
    id: '7',
    name: 'Healthcare Solutions',
    siren: '258369147',
    sector: 'Healthcare',
    annualRevenue: 3800000,
    bankServices: ['Current Account', 'Investment Account', 'Credit Line'],
    financialMetrics: {
      margeCommerciale: 2280000,
      productionExercice: 3800000,
      valeurAjoutee: 2660000,
      ebe: 1140000,
      resultatExploitation: 1045000,
      resultatNet: 783750,
      capaciteAutofinancement: 950000,
      bfr: 760000,
      tresorerie: 650000
    }
  },
  {
    id: '8',
    name: 'Retail Innovations',
    siren: '369147258',
    sector: 'Retail',
    annualRevenue: 2900000,
    bankServices: ['Current Account', 'POS Terminal', 'Credit Line'],
    financialMetrics: {
      margeCommerciale: 1740000,
      productionExercice: 2900000,
      valeurAjoutee: 2030000,
      ebe: 870000,
      resultatExploitation: 797500,
      resultatNet: 598125,
      capaciteAutofinancement: 725000,
      bfr: 580000,
      tresorerie: 495000
    }
  },
  {
    id: '9',
    name: 'Manufacturing Elite',
    siren: '741852963',
    sector: 'Manufacturing',
    annualRevenue: 6500000,
    bankServices: ['Current Account', 'Credit Line', 'Investment Account', 'Leasing'],
    financialMetrics: {
      margeCommerciale: 3900000,
      productionExercice: 6500000,
      valeurAjoutee: 4550000,
      ebe: 1950000,
      resultatExploitation: 1787500,
      resultatNet: 1340625,
      capaciteAutofinancement: 1625000,
      bfr: 1300000,
      tresorerie: 1112500
    }
  },
  {
    id: '10',
    name: 'AgriTech Solutions',
    siren: '963852741',
    sector: 'Agriculture',
    annualRevenue: 4100000,
    bankServices: ['Current Account', 'Credit Line', 'Equipment Financing'],
    financialMetrics: {
      margeCommerciale: 2460000,
      productionExercice: 4100000,
      valeurAjoutee: 2870000,
      ebe: 1230000,
      resultatExploitation: 1127500,
      resultatNet: 845625,
      capaciteAutofinancement: 1025000,
      bfr: 820000,
      tresorerie: 702500
    }
  },
  {
    id: '11',
    name: 'EcoConstruct',
    siren: '852963741',
    sector: 'Construction',
    annualRevenue: 3600000,
    bankServices: ['Current Account', 'Credit Line', 'Leasing'],
    financialMetrics: {
      margeCommerciale: 2160000,
      productionExercice: 3600000,
      valeurAjoutee: 2520000,
      ebe: 1080000,
      resultatExploitation: 990000,
      resultatNet: 742500,
      capaciteAutofinancement: 900000,
      bfr: 720000,
      tresorerie: 616000
    }
  },
  {
    id: '12',
    name: 'Smart Electronics',
    siren: '159753456',
    sector: 'Electronics',
    annualRevenue: 2400000,
    bankServices: ['Current Account', 'Credit Line'],
    financialMetrics: {
      margeCommerciale: 1440000,
      productionExercice: 2400000,
      valeurAjoutee: 1680000,
      ebe: 720000,
      resultatExploitation: 660000,
      resultatNet: 495000,
      capaciteAutofinancement: 600000,
      bfr: 480000,
      tresorerie: 410000
    }
  },
  {
    id: '13',
    name: 'Urban Transport',
    siren: '357159852',
    sector: 'Transportation',
    annualRevenue: 5800000,
    bankServices: ['Current Account', 'Fleet Management', 'Credit Line'],
    financialMetrics: {
      margeCommerciale: 3480000,
      productionExercice: 5800000,
      valeurAjoutee: 4060000,
      ebe: 1740000,
      resultatExploitation: 1595000,
      resultatNet: 1196250,
      capaciteAutofinancement: 1450000,
      bfr: 1160000,
      tresorerie: 992000
    }
  }
];

interface CompaniesContextType {
  companies: Client[];
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  getCompanyById: (id: string) => Client | undefined;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export const CompaniesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies] = useState<Client[]>(mockCompanies);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0].id);

  const getCompanyById = (id: string) => {
    return companies.find(company => company.id === id);
  };

  return (
    <CompaniesContext.Provider value={{ 
      companies, 
      selectedCompanyId, 
      setSelectedCompanyId, 
      getCompanyById 
    }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};