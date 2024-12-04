import React, { useState } from 'react';
import { Client } from '../../types/client';

interface BalanceAnalysisProps {
  company: Client;
}

const BalanceAnalysis: React.FC<BalanceAnalysisProps> = ({ company }) => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const getYearlyData = (year: string) => {
    const yearFactor = {
      '2022': 0.85,
      '2023': 0.92,
      '2024': 1
    }[year] || 1;

    const baseData = {
      immobilisations: company.annualRevenue * 0.4 * yearFactor,
      stocks: company.annualRevenue * 0.15 * yearFactor,
      creancesClients: company.annualRevenue * 0.25 * yearFactor,
      tresorerie: company.financialMetrics.tresorerie * yearFactor,
      capitauxPropres: company.annualRevenue * 0.35 * yearFactor,
      dettesFinancieres: company.annualRevenue * 0.3 * yearFactor,
      dettesFournisseurs: company.annualRevenue * 0.2 * yearFactor,
      autresDettes: company.annualRevenue * 0.15 * yearFactor,
    };

    // Calcul des totaux
    const totalActif = baseData.immobilisations + baseData.stocks + 
                      baseData.creancesClients + baseData.tresorerie;
    const totalPassif = baseData.capitauxPropres + baseData.dettesFinancieres + 
                       baseData.dettesFournisseurs + baseData.autresDettes;

    // Calcul des ratios
    const ratios = {
      autonomieFinanciere: (baseData.capitauxPropres / totalPassif) * 100,
      endettement: (baseData.dettesFinancieres / baseData.capitauxPropres) * 100,
      liquiditeGenerale: (baseData.stocks + baseData.creancesClients + baseData.tresorerie) / 
                        (baseData.dettesFournisseurs + baseData.autresDettes),
      liquiditeReduite: (baseData.creancesClients + baseData.tresorerie) / 
                       (baseData.dettesFournisseurs + baseData.autresDettes),
      liquiditeImmediate: baseData.tresorerie / 
                         (baseData.dettesFournisseurs + baseData.autresDettes),
      bfr: (baseData.stocks + baseData.creancesClients) - 
           (baseData.dettesFournisseurs + baseData.autresDettes),
      tresorerie: baseData.tresorerie,
    };

    return { ...baseData, ratios };
  };

  const years = ['2022', '2023', '2024'];
  const yearlyData = years.reduce((acc, year) => ({
    ...acc,
    [year]: getYearlyData(year)
  }), {} as Record<string, ReturnType<typeof getYearlyData>>);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Analyse du Bilan
          </h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">Indicateur</th>
                {years.map(year => (
                  <th key={year} className="py-3 px-4 text-right">{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 font-semibold bg-gray-50">
                <td colSpan={4} className="py-3 px-4">Actif</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Immobilisations</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].immobilisations)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Stocks</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].stocks)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Créances clients</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].creancesClients)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Trésorerie</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].tresorerie)}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b border-gray-200 font-semibold bg-gray-50">
                <td colSpan={4} className="py-3 px-4">Passif</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Capitaux propres</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].capitauxPropres)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Dettes financières</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].dettesFinancieres)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Dettes fournisseurs</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].dettesFournisseurs)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Autres dettes</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].autresDettes)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Ratios Financiers
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">Ratio</th>
                {years.map(year => (
                  <th key={year} className="py-3 px-4 text-right">{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Autonomie financière (%)</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatRatio(yearlyData[year].ratios.autonomieFinanciere)}%
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Taux d'endettement (%)</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatRatio(yearlyData[year].ratios.endettement)}%
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Liquidité générale</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatRatio(yearlyData[year].ratios.liquiditeGenerale)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Liquidité réduite</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatRatio(yearlyData[year].ratios.liquiditeReduite)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Liquidité immédiate</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatRatio(yearlyData[year].ratios.liquiditeImmediate)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">BFR</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].ratios.bfr)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">Trésorerie nette</td>
                {years.map(year => (
                  <td key={year} className="py-3 px-4 text-right">
                    {formatCurrency(yearlyData[year].ratios.tresorerie)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BalanceAnalysis;