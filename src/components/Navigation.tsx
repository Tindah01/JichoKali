import React from 'react';
import { Home, Plus, FileText, BookOpen, Phone, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'report', label: 'Report', icon: Plus },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'emergency', label: 'Emergency', icon: Phone },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;