import React from 'react';
import { Building2, LayoutDashboard, Search, Settings, BarChart2, BanknoteIcon, Wallet } from 'lucide-react';
import { NavLink } from './NavLink';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">CASHMETRICS</h1>
      </div>
      
      <nav className="px-4 space-y-1">
        <NavLink to="/companies" icon={<Building2 className="w-5 h-5" />}>
          Entreprises
        </NavLink>
        <NavLink to="/" icon={<LayoutDashboard className="w-5 h-5" />}>
          Analyse économique
        </NavLink>
        <NavLink to="/financial" icon={<BanknoteIcon className="w-5 h-5" />}>
          Financier
        </NavLink>
        <NavLink to="/services" icon={<Wallet className="w-5 h-5" />}>
          Services
        </NavLink>
        <NavLink to="/statistics" icon={<BarChart2 className="w-5 h-5" />}>
          Analyse des flux
        </NavLink>
        <NavLink to="/search" icon={<Search className="w-5 h-5" />}>
          Recherche
        </NavLink>
        <NavLink to="/settings" icon={<Settings className="w-5 h-5" />}>
          Paramètres
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;