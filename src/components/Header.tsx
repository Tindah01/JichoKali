import React from 'react';
import { Shield, AlertTriangle, Settings } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
  onAdminToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin = false, onAdminToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">JichoKali Kenya</h1>
              <p className="text-sm text-gray-600">Report Police Brutality Safely</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {onAdminToggle && (
              <button
                onClick={onAdminToggle}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isAdmin
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{isAdmin ? 'Exit Admin' : 'Admin Login'}</span>
              </button>
            )}
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-800 font-medium">Anonymous & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;