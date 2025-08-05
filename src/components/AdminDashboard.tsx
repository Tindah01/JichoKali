import React, { useState } from 'react';
import { Shield, Users, FileText, TrendingUp, MapPin, Calendar, Filter, Search, Eye, Download, AlertTriangle, BarChart3 } from 'lucide-react';
import AdminAnalytics from './AdminAnalytics';

interface CaseData {
  id: number;
  title: string;
  reporterName: string;
  reporterId: string;
  date: string;
  location: string;
  status: string;
  severity: string;
  description: string;
  evidence: string[];
  assignedOfficer?: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from your backend
  const cases: CaseData[] = [
    {
      id: 1,
      title: 'Excessive Force During Traffic Stop',
      reporterName: 'Anonymous User',
      reporterId: 'ANON-001',
      date: '2024-01-15',
      location: 'Nairobi CBD, Kenya',
      status: 'Under Review',
      severity: 'High',
      description: 'Officer used excessive force during routine traffic stop...',
      evidence: ['photo1.jpg', 'video1.mp4'],
      assignedOfficer: 'Inspector Jane Doe'
    },
    {
      id: 2,
      title: 'Unlawful Detention',
      reporterName: 'John Kamau',
      reporterId: 'USER-002',
      date: '2024-01-12',
      location: 'Mombasa, Kenya',
      status: 'Investigating',
      severity: 'Medium',
      description: 'Detained without proper cause for 6 hours...',
      evidence: ['document1.pdf'],
      assignedOfficer: 'Detective Mike Smith'
    },
    {
      id: 3,
      title: 'Police Harassment',
      reporterName: 'Mary Wanjiku',
      reporterId: 'USER-003',
      date: '2024-01-10',
      location: 'Kisumu, Kenya',
      status: 'Resolved',
      severity: 'Low',
      description: 'Verbal harassment and intimidation...',
      evidence: ['audio1.mp3'],
      assignedOfficer: 'Sergeant Paul Ochieng'
    },
    {
      id: 4,
      title: 'Brutality During Arrest',
      reporterName: 'Anonymous User',
      reporterId: 'ANON-004',
      date: '2024-01-08',
      location: 'Nakuru, Kenya',
      status: 'Closed',
      severity: 'Critical',
      description: 'Severe physical assault during arrest...',
      evidence: ['photo2.jpg', 'medical_report.pdf'],
      assignedOfficer: 'Captain Sarah Mwangi'
    }
  ];

  const stats = {
    totalCases: cases.length,
    activeCases: cases.filter(c => ['Under Review', 'Investigating'].includes(c.status)).length,
    resolvedCases: cases.filter(c => c.status === 'Resolved').length,
    criticalCases: cases.filter(c => c.severity === 'Critical').length,
    anonymousReports: cases.filter(c => c.reporterName.includes('Anonymous')).length,
    thisMonth: cases.filter(c => new Date(c.date).getMonth() === new Date().getMonth()).length
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesStatus = filterStatus === 'all' || case_.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'cases', label: 'All Cases', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
  ];

  if (selectedCase) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedCase(null)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← Back to Cases
          </button>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Update Status
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCase.title}</h2>
              <p className="text-gray-600">Case #{selectedCase.id} • Reported by {selectedCase.reporterName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCase.status)}`}>
                {selectedCase.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedCase.severity)}`}>
                {selectedCase.severity}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Case Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date Reported:</span>
                  <span className="font-medium">{selectedCase.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedCase.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reporter ID:</span>
                  <span className="font-medium">{selectedCase.reporterId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned Officer:</span>
                  <span className="font-medium">{selectedCase.assignedOfficer}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence</h3>
              <div className="space-y-2">
                {selectedCase.evidence.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{item}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedCase.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage police brutality reports</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCases}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.activeCases}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.resolvedCases}</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Cases</p>
                  <p className="text-3xl font-bold text-red-600">{stats.criticalCases}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Anonymous Reports</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.anonymousReports}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.thisMonth}</p>
                </div>
                <Calendar className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Recent Cases */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cases</h3>
            <div className="space-y-3">
              {cases.slice(0, 3).map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{case_.title}</h4>
                    <p className="text-sm text-gray-600">{case_.location} • {case_.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                      {case_.status}
                    </span>
                    <button
                      onClick={() => setSelectedCase(case_)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cases Tab */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="under review">Under Review</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Export All
              </button>
            </div>
          </div>

          {/* Cases List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCases.map((case_) => (
                    <tr key={case_.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                          <div className="text-sm text-gray-500">{case_.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{case_.reporterName}</div>
                        <div className="text-sm text-gray-500">{case_.reporterId}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{case_.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                          {case_.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(case_.severity)}`}>
                          {case_.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedCase(case_)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && <AdminAnalytics />}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Reports by User Type</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Anonymous Users</span>
                  <span className="font-bold text-purple-600">{stats.anonymousReports}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Registered Users</span>
                  <span className="font-bold text-blue-600">{stats.totalCases - stats.anonymousReports}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Top Reporters</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>John Kamau</span>
                  <span className="font-bold">3 reports</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Mary Wanjiku</span>
                  <span className="font-bold">2 reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Trends</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Cases by Location</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Nairobi</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Mombasa</span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Kisumu</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Other</span>
                  <span className="font-bold">10%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Resolution Rate</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span>Resolved Cases</span>
                  <span className="font-bold text-green-600">25%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span>In Progress</span>
                  <span className="font-bold text-yellow-600">50%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Pending</span>
                  <span className="font-bold text-gray-600">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;