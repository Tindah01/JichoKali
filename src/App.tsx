import React, { useState } from 'react';
import { Shield, Plus, Phone, BookOpen, User, Home, FileText, AlertTriangle, MapPin, Upload, Calendar, Clock, Users } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ReportIncident from './components/ReportIncident';
import MyReports from './components/MyReports';
import Resources from './components/Resources';
import EmergencyContacts from './components/EmergencyContacts';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Excessive Force During Traffic Stop',
      date: '2024-01-15',
      location: 'Nairobi CBD',
      status: 'Under Review',
      severity: 'High'
    },
    {
      id: 2,
      title: 'Unlawful Detention',
      date: '2024-01-12',
      location: 'Mombasa',
      status: 'Investigating',
      severity: 'Medium'
    }
  ]);

  const addReport = (report: any) => {
    const newReport = {
      ...report,
      id: reports.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    setReports([newReport, ...reports]);
    setActiveTab('reports');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onReportClick={() => setActiveTab('report')} />;
      case 'report':
        return <ReportIncident onSubmit={addReport} />;
      case 'reports':
        return <MyReports reports={reports} />;
      case 'resources':
        return <Resources />;
      case 'emergency':
        return <EmergencyContacts />;
      case 'profile':
        return <Profile />;
      default:
        return <HomePage onReportClick={() => setActiveTab('report')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;