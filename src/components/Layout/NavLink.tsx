import React, { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
};