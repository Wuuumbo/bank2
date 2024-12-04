import React from 'react';
import { X } from 'lucide-react';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    title: string;
    icon: React.ReactNode;
    services: string[];
    active: boolean;
    details: {
      description: string;
      advantages: string[];
      requirements: string[];
      pricing: string[];
    };
  };
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            {category.icon}
            <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600">{category.details.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Services inclus</h4>
            <ul className="list-disc list-inside space-y-1">
              {category.services.map((service, index) => (
                <li key={index} className="text-gray-600">{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Avantages</h4>
            <ul className="list-disc list-inside space-y-1">
              {category.details.advantages.map((advantage, index) => (
                <li key={index} className="text-gray-600">{advantage}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Conditions d'éligibilité</h4>
            <ul className="list-disc list-inside space-y-1">
              {category.details.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-600">{requirement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Tarification</h4>
            <ul className="list-disc list-inside space-y-1">
              {category.details.pricing.map((price, index) => (
                <li key={index} className="text-gray-600">{price}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              category.active 
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {category.active ? 'Services actifs' : 'Services non souscrits'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;