import { Client } from '../types/client';
import { subDays, addDays, startOfYear, addYears } from 'date-fns';
import regression from 'regression';

export interface FinancialData {
  cashFlowData: Array<{
    date: string;
    balance: number;
    credits: number;
    debits: number;
  }>;
  scores: {
    stability: number;
    overdraft: number;
    creditLine: number;
  };
  alerts: Array<{
    id: string;
    type: 'danger' | 'warning' | 'info';
    message: string;
    date: string;
  }>;
  forecast: Array<{
    date: string;
    predictedBalance: number;
    upperBound: number;
    lowerBound: number;
  }>;
}

const generateNormalDistribution = (mean: number, stdDev: number): number => {
  // Box-Muller transform pour générer des nombres aléatoires suivant une loi normale
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + stdDev * z;
};

const generateYearlyDataForCompany = (company: Client): FinancialData['cashFlowData'] => {
  const data: FinancialData['cashFlowData'] = [];
  const years = [2022, 2023, 2024];
  const monthlyRevenue = company.annualRevenue / 12;
  
  years.forEach(year => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearGrowthFactor = {
      2022: 0.85,
      2023: 0.92,
      2024: 1
    }[year] || 1;

    // Paramètres de la distribution normale pour chaque année
    const meanBalance = monthlyRevenue * 0.2 * yearGrowthFactor;
    const stdDevBalance = meanBalance * 0.3; // 30% de la moyenne pour la volatilité
    
    const meanCredits = (monthlyRevenue / 30) * yearGrowthFactor;
    const stdDevCredits = meanCredits * 0.2;
    
    const meanDebits = (monthlyRevenue / 30) * 0.95 * yearGrowthFactor;
    const stdDevDebits = meanDebits * 0.2;

    // Générer 365 jours de données pour chaque année
    for (let day = 0; day < 365; day++) {
      const date = addDays(yearStart, day);
      
      // Générer les crédits et débits selon une distribution normale
      const credits = Math.max(0, generateNormalDistribution(meanCredits, stdDevCredits));
      const debits = Math.max(0, generateNormalDistribution(meanDebits, stdDevDebits));
      
      // Le solde suit également une distribution normale mais tient compte des flux
      const previousBalance = data.length > 0 ? data[data.length - 1].balance : meanBalance;
      const targetBalance = generateNormalDistribution(meanBalance, stdDevBalance);
      const balance = (previousBalance + credits - debits + targetBalance) / 2;

      data.push({
        date: date.toISOString(),
        balance,
        credits,
        debits,
      });
    }
  });

  return data;
};

const generateForecast = (historicalData: FinancialData['cashFlowData'], days: number = 30): FinancialData['forecast'] => {
  const regressionData = historicalData.map((item, index) => [index, item.balance]);
  const result = regression.linear(regressionData);
  
  const residuals = historicalData.map((item, index) => {
    const predicted = result.predict(index)[1];
    return item.balance - predicted;
  });
  
  const stdDev = Math.sqrt(
    residuals.reduce((sum, residual) => sum + residual * residual, 0) / residuals.length
  );
  
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(lastDate, i + 1);
    const predictedValue = result.predict(historicalData.length + i)[1];
    const confidenceInterval = 1.96 * stdDev;
    
    return {
      date: date.toISOString(),
      predictedBalance: predictedValue,
      upperBound: predictedValue + confidenceInterval,
      lowerBound: predictedValue - confidenceInterval,
    };
  });
};

const generateScoresForCompany = (company: Client, cashFlowData: FinancialData['cashFlowData']): FinancialData['scores'] => {
  const balanceVolatility = calculateBalanceVolatility(cashFlowData);
  const stabilityScore = Math.max(1, Math.min(10, 10 - (balanceVolatility * 10)));
  
  const daysInOverdraft = cashFlowData.filter(day => day.balance < 0).length;
  const overdraftScore = Math.max(1, Math.min(10, 10 - (daysInOverdraft / 36.5)));
  
  const balanceUtilization = Math.abs(Math.min(...cashFlowData.map(d => d.balance))) / (company.annualRevenue / 12);
  const creditLineScore = Math.max(1, Math.min(10, 5 + (balanceUtilization * 5)));

  return {
    stability: Number(stabilityScore.toFixed(1)),
    overdraft: Number(overdraftScore.toFixed(1)),
    creditLine: Number(creditLineScore.toFixed(1)),
  };
};

const calculateBalanceVolatility = (cashFlowData: FinancialData['cashFlowData']): number => {
  const balances = cashFlowData.map(d => d.balance);
  const mean = balances.reduce((sum, val) => sum + val, 0) / balances.length;
  const variance = balances.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / balances.length;
  return Math.sqrt(variance) / Math.abs(mean);
};

const generateAlertsForCompany = (
  company: Client,
  cashFlowData: FinancialData['cashFlowData']
): FinancialData['alerts'] => {
  const alerts: FinancialData['alerts'] = [];
  const recentData = cashFlowData.slice(-30);
  
  const recentOverdrafts = recentData.filter(d => d.balance < 0).length;
  if (recentOverdrafts > 5) {
    alerts.push({
      id: '1',
      type: 'danger',
      message: `${recentOverdrafts} jours de découvert sur les 30 derniers jours`,
      date: '2 heures',
    });
  }

  const volatility = calculateBalanceVolatility(recentData);
  if (volatility > 0.2) {
    alerts.push({
      id: '2',
      type: 'warning',
      message: 'Forte volatilité détectée - Ligne de crédit recommandée',
      date: '5 heures',
    });
  }

  if (!company.bankServices.includes('Credit Line') && volatility > 0.15) {
    alerts.push({
      id: '3',
      type: 'info',
      message: 'Ligne de crédit recommandée selon les flux de trésorerie',
      date: '1 jour',
    });
  }

  return alerts;
};

export const generateFinancialDataForCompany = (company: Client): FinancialData => {
  const cashFlowData = generateYearlyDataForCompany(company);
  return {
    cashFlowData,
    scores: generateScoresForCompany(company, cashFlowData),
    alerts: generateAlertsForCompany(company, cashFlowData),
    forecast: generateForecast(cashFlowData),
  };
};