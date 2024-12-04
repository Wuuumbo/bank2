import React from 'react';
import { Building2, TrendingUp, Users } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientOverviewProps {
  client: Client;
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ client }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{client.name}</h2>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {client.sector}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <Building2 className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Annual Revenue</p>
            <p className="text-lg font-semibold">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(client.annualRevenue)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Bank Services</p>
            <p className="text-lg font-semibold">{client.bankServices.length}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Users className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Client Since</p>
            <p className="text-lg font-semibold">2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;