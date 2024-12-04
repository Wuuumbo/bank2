import React from 'react';
import { Building2, TrendingUp, Users } from 'lucide-react';
import { Client } from '../../types/client';

interface HeaderProps {
  client: Client;
}

const Header: React.FC<HeaderProps> = ({ client }) => {
  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800">{client.name}</h2>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
              {client.sector}
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">PNB Bancaire</p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(client.annualRevenue)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Services Bancaires</p>
                <p className="text-sm font-semibold">{client.bankServices.length}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Client Depuis</p>
                <p className="text-sm font-semibold">2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;