import React, { useState, Suspense, lazy, useCallback } from 'react';
import { Shield, Plus, Phone, BookOpen, User, Home, FileText, AlertTriangle, MapPin, Upload, Calendar, Clock, Users } from './utils/icons';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';

// Lazy load components for better code splitting
const ReportIncident = lazy(() => import('./components/ReportIncident'));
const MyReports = lazy(() => import('./components/MyReports'));
const Resources = lazy(() => import('./components/Resources'));
const EmergencyContacts = lazy(() => import('./components/EmergencyContacts'));
const Profile = lazy(() => import('./components/Profile'));

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

  const addReport = useCallback((report: any) => {
    const newReport = {
      ...report,
      id: reports.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    setReports([newReport, ...reports]);
    setActiveTab('reports');
  }, [reports.length]);

  const handleReportClick = useCallback(() => setActiveTab('report'), []);
  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  // Loading component for suspense fallback
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onReportClick={handleReportClick} />;
      case 'report':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ReportIncident onSubmit={addReport} />
          </Suspense>
        );
      case 'reports':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MyReports reports={reports} />
          </Suspense>
        );
      case 'resources':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Resources />
          </Suspense>
        );
      case 'emergency':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <EmergencyContacts />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        );
      default:
        return <HomePage onReportClick={handleReportClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;