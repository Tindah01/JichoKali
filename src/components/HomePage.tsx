import React from 'react';
import { Shield, AlertTriangle, Users, FileText, Phone, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onReportClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onReportClick }) => {
  const stats = [
    { label: 'Reports Submitted', value: '1,247', icon: FileText, color: 'text-blue-600 bg-blue-100' },
    { label: 'Cases Resolved', value: '89', icon: Users, color: 'text-green-600 bg-green-100' },
    { label: 'Active Cases', value: '156', icon: TrendingUp, color: 'text-orange-600 bg-orange-100' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Report Police Brutality Safely</h2>
            <p className="text-red-100 mb-4">
              Your voice matters. Report incidents anonymously and help build a safer Kenya for everyone.
            </p>
            <button
              onClick={onReportClick}
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Report an Incident
            </button>
          </div>
          <Shield className="w-16 h-16 text-red-200 ml-4" />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">Your Safety First</h3>
            <p className="text-sm text-amber-700">
              All reports are encrypted and can be submitted anonymously. Never report while in immediate danger. 
              Use our emergency contacts if you need immediate help.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Phone className="w-6 h-6 text-red-600" />
            <span className="font-medium text-gray-900">Emergency Contacts</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-900">Legal Resources</span>
          </button>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 font-medium">New legal aid partnership launched</p>
              <p className="text-xs text-gray-600">Free legal consultation now available - 2 days ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 font-medium">Platform security enhanced</p>
              <p className="text-xs text-gray-600">Additional privacy protections added - 1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;