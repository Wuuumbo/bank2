import { FinancialData } from './financialDataService';

export interface StatisticalMetrics {
  credits: {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
    q1: number;
    q3: number;
    skewness: number;
    kurtosis: number;
  };
  debits: {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
    q1: number;
    q3: number;
    skewness: number;
    kurtosis: number;
  };
  balance: {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
    q1: number;
    q3: number;
    volatility: number;
    daysPositive: number;
    daysNegative: number;
  };
}

const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const calculateStdDev = (values: number[], mean: number): number => {
  if (values.length <= 1) return 0;
  const squareDiffs = values.map(value => Math.pow(value - mean, 2));
  return Math.sqrt(calculateMean(squareDiffs));
};

const calculateQuantile = (values: number[], q: number): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

const calculateSkewness = (values: number[], mean: number, stdDev: number): number => {
  if (values.length <= 2 || stdDev === 0) return 0;
  const n = values.length;
  const cubedDiffs = values.map(value => Math.pow((value - mean) / stdDev, 3));
  return (n / ((n - 1) * (n - 2))) * cubedDiffs.reduce((sum, val) => sum + val, 0);
};

const calculateKurtosis = (values: number[], mean: number, stdDev: number): number => {
  if (values.length <= 3 || stdDev === 0) return 0;
  const n = values.length;
  const fourthPowerDiffs = values.map(value => Math.pow((value - mean) / stdDev, 4));
  return (n * (n + 1) * fourthPowerDiffs.reduce((sum, val) => sum + val, 0)) / 
         ((n - 1) * (n - 2) * (n - 3)) - (3 * (n - 1) * (n - 1)) / ((n - 2) * (n - 3));
};

const calculateVolatility = (values: number[]): number => {
  if (values.length <= 1) return 0;
  const returns = values.slice(1).map((value, index) => {
    const prevValue = values[index];
    return prevValue !== 0 ? (value - prevValue) / Math.abs(prevValue) : 0;
  });
  const returnsMean = calculateMean(returns);
  const returnsStdDev = calculateStdDev(returns, returnsMean);
  return returnsStdDev * Math.sqrt(365);
};

export const calculateStatistics = (data: FinancialData['cashFlowData']): StatisticalMetrics => {
  const credits = data.map(d => d.credits);
  const debits = data.map(d => d.debits);
  const balances = data.map(d => d.balance);

  const creditsMean = calculateMean(credits);
  const debitsMean = calculateMean(debits);
  const balanceMean = calculateMean(balances);

  const creditsStdDev = calculateStdDev(credits, creditsMean);
  const debitsStdDev = calculateStdDev(debits, debitsMean);
  const balanceStdDev = calculateStdDev(balances, balanceMean);

  return {
    credits: {
      mean: creditsMean,
      median: calculateMedian(credits),
      stdDev: creditsStdDev,
      min: Math.min(...(credits.length ? credits : [0])),
      max: Math.max(...(credits.length ? credits : [0])),
      q1: calculateQuantile(credits, 0.25),
      q3: calculateQuantile(credits, 0.75),
      skewness: calculateSkewness(credits, creditsMean, creditsStdDev),
      kurtosis: calculateKurtosis(credits, creditsMean, creditsStdDev),
    },
    debits: {
      mean: debitsMean,
      median: calculateMedian(debits),
      stdDev: debitsStdDev,
      min: Math.min(...(debits.length ? debits : [0])),
      max: Math.max(...(debits.length ? debits : [0])),
      q1: calculateQuantile(debits, 0.25),
      q3: calculateQuantile(debits, 0.75),
      skewness: calculateSkewness(debits, debitsMean, debitsStdDev),
      kurtosis: calculateKurtosis(debits, debitsMean, debitsStdDev),
    },
    balance: {
      mean: balanceMean,
      median: calculateMedian(balances),
      stdDev: balanceStdDev,
      min: Math.min(...(balances.length ? balances : [0])),
      max: Math.max(...(balances.length ? balances : [0])),
      q1: calculateQuantile(balances, 0.25),
      q3: calculateQuantile(balances, 0.75),
      volatility: calculateVolatility(balances),
      daysPositive: balances.filter(b => b > 0).length,
      daysNegative: balances.filter(b => b <= 0).length,
    },
  };
};