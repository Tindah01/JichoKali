import React, { useState } from 'react';
import { FileText, Calendar, MapPin, Clock, Eye, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Report {
  id: number;
  title: string;
  date: string;
  location: string;
  status: string;
  severity: string;
}

interface MyReportsProps {
  reports: Report[];
}

const MyReports: React.FC<MyReportsProps> = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'under review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'investigating':
        return <Eye className="w-5 h-5 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedReport) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedReport(null)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← Back to Reports
          </button>
          <span className="text-sm text-gray-500">Report #{selectedReport.id}</span>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{selectedReport.title}</h2>
            <div className="flex items-center space-x-2">
              {getStatusIcon(selectedReport.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                {selectedReport.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{selectedReport.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{selectedReport.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedReport.severity)}`}>
              {selectedReport.severity} Severity
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Case Updates</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Report submitted successfully</p>
                  <p className="text-xs text-gray-600">{selectedReport.date}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Case assigned to investigator</p>
                  <p className="text-xs text-gray-600">2 days ago</p>
                </div>
              </div>
              {selectedReport.status.toLowerCase() === 'investigating' && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900 font-medium">Investigation in progress</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Case Reference</h3>
              <p className="text-sm text-amber-700">
                Keep this reference number for your records: <strong>KE-{selectedReport.id}-2024</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">My Reports</h2>
        <p className="text-gray-600">Track the status of your submitted reports</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven't submitted any reports yet. When you do, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(report.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{report.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{report.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                  {report.severity} Severity
                </span>
                <span className="text-xs text-gray-500">Case #KE-{report.id}-2024</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-800 mb-2">
          If you need assistance with your case or have questions about the process, contact our support team.
        </p>
        <button className="text-sm text-blue-700 font-medium hover:text-blue-800">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default MyReports;