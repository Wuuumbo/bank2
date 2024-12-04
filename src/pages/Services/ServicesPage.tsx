import React, { useState } from 'react';
import { useCompanies } from '../../context/CompaniesContext';
import { Shield, Briefcase, PiggyBank, HeartPulse, BarChart } from 'lucide-react';
import ServiceDetailsModal from '../../components/Services/ServiceDetailsModal';

const ServicesPage: React.FC = () => {
  const { selectedCompanyId, getCompanyById } = useCompanies();
  const selectedCompany = getCompanyById(selectedCompanyId);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  if (!selectedCompany) {
    return <div>No company selected</div>;
  }

  const serviceCategories = [
    {
      title: 'Financement',
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      services: [
        'Crédit d\'investissement',
        'Crédit-bail',
        'Affacturage',
        'Financement du poste client'
      ],
      active: selectedCompany.bankServices.some(s => 
        ['Credit Line', 'Leasing', 'Equipment Financing'].includes(s)
      ),
      details: {
        description: 'Solutions de financement adaptées aux besoins de développement et d\'investissement de votre entreprise.',
        advantages: [
          'Financement sur mesure',
          'Taux préférentiels',
          'Accompagnement personnalisé',
          'Flexibilité des remboursements'
        ],
        requirements: [
          'Minimum 2 ans d\'existence',
          'Bilan financier sain',
          'Capacité de remboursement démontrée',
          'Documentation financière à jour'
        ],
        pricing: [
          'Taux à partir de 2,5% selon profil',
          'Frais de dossier : 0,5% du montant',
          'Assurance facultative',
          'Pas de frais de remboursement anticipé'
        ]
      }
    },
    {
      title: 'Banque au quotidien',
      icon: <PiggyBank className="w-8 h-8 text-green-600" />,
      services: [
        'Compte courant',
        'Moyens de paiement',
        'Cartes bancaires',
        'Services en ligne'
      ],
      active: selectedCompany.bankServices.some(s => 
        ['Current Account', 'Business Card', 'POS Terminal'].includes(s)
      ),
      details: {
        description: 'Services bancaires essentiels pour la gestion quotidienne de votre activité professionnelle.',
        advantages: [
          'Gestion en temps réel',
          'Services disponibles 24/7',
          'Support client dédié',
          'Solutions digitales avancées'
        ],
        requirements: [
          'Immatriculation de l\'entreprise',
          'Justificatifs d\'identité',
          'Statuts de l\'entreprise',
          'Attestation de pouvoir'
        ],
        pricing: [
          'Forfait à partir de 20€/mois',
          'Carte Business : 50€/an',
          'Services en ligne inclus',
          'Options supplémentaires à la carte'
        ]
      }
    },
    {
      title: 'Trésorerie et placements',
      icon: <BarChart className="w-8 h-8 text-purple-600" />,
      services: [
        'Placements financiers',
        'Épargne entreprise',
        'Gestion de trésorerie',
        'Solutions de placement'
      ],
      active: selectedCompany.bankServices.includes('Investment Account'),
      details: {
        description: 'Solutions d\'optimisation de votre trésorerie et de vos placements financiers.',
        advantages: [
          'Rendements optimisés',
          'Gestion personnalisée',
          'Conseil expert',
          'Diversification des placements'
        ],
        requirements: [
          'Trésorerie minimum de 50k€',
          'Situation financière stable',
          'Prévisions de trésorerie',
          'Plan d\'investissement défini'
        ],
        pricing: [
          'Frais de gestion : 0,3% à 0,8%',
          'Commission sur performance',
          'Droits d\'entrée négociables',
          'Reporting trimestriel inclus'
        ]
      }
    },
    {
      title: 'Prévoyance et assurance',
      icon: <HeartPulse className="w-8 h-8 text-red-600" />,
      services: [
        'Assurance des biens',
        'Assurance responsabilité',
        'Protection des salariés',
        'Assurance-crédit'
      ],
      active: false,
      details: {
        description: 'Protection complète pour votre entreprise, vos employés et vos activités.',
        advantages: [
          'Couverture sur mesure',
          'Gestion simplifiée des sinistres',
          'Assistance 24/7',
          'Tarifs préférentiels'
        ],
        requirements: [
          'Évaluation des risques',
          'Conformité réglementaire',
          'État des lieux détaillé',
          'Historique des sinistres'
        ],
        pricing: [
          'Sur devis selon activité',
          'Remises pour package complet',
          'Paiement mensuel possible',
          'Franchise modulable'
        ]
      }
    },
    {
      title: 'Opérations et gestion des risques',
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      services: [
        'Change et couverture',
        'Garanties internationales',
        'Gestion des risques',
        'Solutions de trading'
      ],
      active: selectedCompany.bankServices.includes('Fleet Management'),
      details: {
        description: 'Solutions avancées pour la gestion des risques financiers et opérationnels.',
        advantages: [
          'Expertise internationale',
          'Solutions personnalisées',
          'Suivi en temps réel',
          'Support multilingue'
        ],
        requirements: [
          'Volume d\'opérations minimum',
          'Expérience internationale',
          'Documentation conforme',
          'Analyse de risque validée'
        ],
        pricing: [
          'Commission selon volume',
          'Frais fixes mensuels',
          'Tarification dégressive',
          'Services premium en option'
        ]
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Services Bancaires</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((category) => (
          <div
            key={category.title}
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105 ${
              category.active ? 'border-l-4 border-green-500' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <div className="flex items-center space-x-4 mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold text-gray-800">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {category.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center space-x-2"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      category.active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                  <span className="text-gray-600">{service}</span>
                </div>
              ))}
            </div>

            {category.active ? (
              <div className="mt-4 text-sm text-green-600 font-medium">
                Services actifs
              </div>
            ) : (
              <div className="mt-4 text-sm text-gray-500">
                Services non souscrits
              </div>
            )}
          </div>
        ))}
      </div>

      <ServiceDetailsModal
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
      />
    </div>
  );
};

export default ServicesPage;