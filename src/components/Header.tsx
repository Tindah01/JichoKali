import React from 'react';
import { Shield, Phone } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">JichoKali</h1>
              <p className="text-green-100 text-sm">Tunza Usalama - Protect Safety</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span className="text-sm">999</span>
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-2 text-green-50">{title}</h2>
      </div>
    </header>
  );
};
