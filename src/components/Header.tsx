import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const Header = () => {
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
          <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-800 font-medium">Anonymous & Secure</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;