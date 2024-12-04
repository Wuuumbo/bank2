import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface Note {
  id: string;
  content: string;
}

interface CompanyNotesProps {
  companyId: string;
}

const SECTIONS = [
  { id: 'activity', title: 'Description de l\'activité et chiffres clés' },
  { id: 'market', title: 'Économie et marché' },
  { id: 'clients', title: 'Clients' },
  { id: 'suppliers', title: 'Fournisseurs' },
  { id: 'competition', title: 'Concurrence' },
  { id: 'realestate', title: 'Immobilier' },
  { id: 'workforce', title: 'Effectif' },
  { id: 'strategy', title: 'Stratégie de l\'entreprise' },
];

const CompanyNotes: React.FC<CompanyNotesProps> = ({ companyId }) => {
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const savedNotes = localStorage.getItem(`companyNotes_${companyId}`);
    return savedNotes ? JSON.parse(savedNotes) : 
      SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: '' }), {});
  });

  const handleNoteChange = (sectionId: string, content: string) => {
    const updatedNotes = { ...notes, [sectionId]: content };
    setNotes(updatedNotes);
    localStorage.setItem(`companyNotes_${companyId}`, JSON.stringify(updatedNotes));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">Notes d'analyse</h3>
      
      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {section.title}
            </label>
            <textarea
              value={notes[section.id]}
              onChange={(e) => handleNoteChange(section.id, e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Saisissez vos notes sur ${section.title.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyNotes;