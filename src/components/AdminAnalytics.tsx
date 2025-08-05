import React, { useState, useEffect } from 'react';
import { BarChart3, MapPin, TrendingUp, AlertTriangle, Users, Calendar, Filter, Download } from 'lucide-react';
import { analyticsService, CrimeStatistics } from '../lib/supabase';

const AdminAnalytics = () => {
  const [crimeStats, setCrimeStats] = useState<any[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<any[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedCounty, setSelectedCounty] = useState('all');

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeframe, selectedCounty]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Load all analytics data
      const [countyData, trendsData, hotspotsData] = await Promise.all([
        analyticsService.getReportsByCounty(),
        analyticsService.getMonthlyTrends(),
        analyticsService.getHotspots()
      ]);

      setCrimeStats(countyData);
      setMonthlyTrends(trendsData);
      setHotspots(hotspotsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopCounties = () => {
    return crimeStats
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const getCriticalHotspots = () => {
    return crimeStats
      .filter(stat => stat.critical > 0)
      .sort((a, b) => b.critical - a.critical)
      .slice(0, 5);
  };

  const getResolutionRate = (county: any) => {
    if (county.total === 0) return 0;
    return Math.round((county.resolved / county.total) * 100);
  };

  const getTotalStats = () => {
    return crimeStats.reduce((acc, county) => ({
      total: acc.total + county.total,
      critical: acc.critical + county.critical,
      resolved: acc.resolved + county.resolved,
      recent: acc.recent + county.recent
    }), { total: 0, critical: 0, resolved: 0, recent: 0 });
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600">Loading analytics data...</span>
          </div>
        </div>
      </div>
    );
  }

  const totalStats = getTotalStats();
  const topCounties = getTopCounties();
  const criticalHotspots = getCriticalHotspots();

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Crime Analytics Dashboard</h2>
              <p className="text-gray-600">Track police brutality patterns across Kenya</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              <Download className="w-4 h-4 inline mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* National Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900">{totalStats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Nationwide incidents</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Cases</p>
              <p className="text-3xl font-bold text-red-600">{totalStats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Requiring urgent attention</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Cases</p>
              <p className="text-3xl font-bold text-green-600">{totalStats.resolved}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {totalStats.total > 0 ? Math.round((totalStats.resolved / totalStats.total) * 100) : 0}% resolution rate
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Reports</p>
              <p className="text-3xl font-bold text-orange-600">{totalStats.recent}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Crime Hotspots Map */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-red-600" />
          <span>Crime Hotspots by County</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heatmap Visualization */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">High-Risk Areas</h4>
            {topCounties.slice(0, 8).map((county, index) => {
              const intensity = (county.total / topCounties[0].total) * 100;
              return (
                <div key={county.county} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{county.county}</span>
                      <span className="text-sm text-gray-600">{county.total} reports</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          intensity > 80 ? 'bg-red-600' :
                          intensity > 60 ? 'bg-orange-500' :
                          intensity > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${intensity}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    intensity > 80 ? 'bg-red-100 text-red-800' :
                    intensity > 60 ? 'bg-orange-100 text-orange-800' :
                    intensity > 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {Math.round(intensity)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Critical Cases by County */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Critical Cases Distribution</h4>
            {criticalHotspots.map((county, index) => (
              <div key={county.county} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <h5 className="font-medium text-red-900">{county.county}</h5>
                  <p className="text-sm text-red-700">
                    {county.critical} critical cases • {getResolutionRate(county)}% resolved
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">{county.critical}</span>
                  <p className="text-xs text-red-600">critical</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* County Breakdown Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed County Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Reports</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critical Cases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCounties.map((county) => {
                const resolutionRate = getResolutionRate(county);
                const riskLevel = county.critical > 5 ? 'High' : county.critical > 2 ? 'Medium' : 'Low';
                
                return (
                  <tr key={county.county} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{county.county}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {county.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        county.critical > 5 ? 'bg-red-100 text-red-800' :
                        county.critical > 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {county.critical}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {county.resolved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              resolutionRate > 70 ? 'bg-green-500' :
                              resolutionRate > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${resolutionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{resolutionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {county.recent} (30 days)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {riskLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold text-amber-900 mb-3 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Recommendations Based on Data</span>
        </h3>
        <div className="space-y-2 text-sm text-amber-800">
          <p>• <strong>Immediate Attention:</strong> {criticalHotspots[0]?.county} has the highest number of critical cases ({criticalHotspots[0]?.critical})</p>
          <p>• <strong>Resource Allocation:</strong> Focus oversight efforts on the top 3 counties: {topCounties.slice(0, 3).map(c => c.county).join(', ')}</p>
          <p>• <strong>Resolution Improvement:</strong> Counties with low resolution rates need additional support and follow-up</p>
          <p>• <strong>Prevention Programs:</strong> Implement community policing programs in high-risk areas</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;