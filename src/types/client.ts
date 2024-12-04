export interface Client {
  id: string;
  name: string;
  siren: string;
  sector: string;
  annualRevenue: number;
  bankServices: string[];
  financialMetrics: FinancialMetrics;
}

export interface FinancialMetrics {
  margeCommerciale: number;
  productionExercice: number;
  valeurAjoutee: number;
  ebe: number; // Excédent Brut d'Exploitation
  resultatExploitation: number;
  resultatNet: number;
  capaciteAutofinancement: number;
  bfr: number; // Besoin en Fonds de Roulement
  tresorerie: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
}

export interface ClientFinancialData {
  averageBalance: number;
  overdraftDays: number;
  creditFlow: number;
  debitFlow: number;
  stabilityScore: number;
  overdraftScore: number;
  creditLineScore: number;
}