import React, { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Client } from '../../types/client';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from '../../context/CompaniesContext';
import ConfirmationModal from '../../components/Companies/ConfirmationModal';

interface CompaniesTableProps {
  companies: Client[];
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ companies }) => {
  const navigate = useNavigate();
  const { setSelectedCompanyId } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCompany, setSelectedCompany] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.siren.includes(searchTerm)
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortField === 'annualRevenue') {
      return sortDirection === 'asc'
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    return sortDirection === 'asc'
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = sortedCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: keyof Client) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCompanyClick = (company: Client) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedCompany) {
      setSelectedCompanyId(selectedCompany.id);
      setIsModalOpen(false);
      navigate('/');
    }
  };

  const handleCancel = () => {
    setSelectedCompany(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, sector, or SIREN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    <span>Company Name</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">SIREN</th>
                <th className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleSort('sector')}
                    className="flex items-center space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    <span>Sector</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('annualRevenue')}
                    className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    <span>Annual Revenue</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Services</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{company.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600">{company.siren}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {company.sector}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(company.annualRevenue)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {company.bankServices.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredCompanies.length)} of{' '}
            {filteredCompanies.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {selectedCompany && (
        <ConfirmationModal
          isOpen={isModalOpen}
          company={selectedCompany}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default CompaniesTable;