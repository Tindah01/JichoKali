import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

if (supabaseUrl === 'https://your-project-id.supabase.co' || 
    supabaseAnonKey === 'your-actual-anon-key-here') {
  console.warn('⚠️  Using placeholder Supabase credentials. Please update your .env file with actual values.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  county: string;
  coordinates?: { x: number; y: number };
  date_occurred: string;
  time_occurred?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';
  reporter_id?: string;
  is_anonymous: boolean;
  officer_details?: string;
  witnesses?: string;
  injuries: boolean;
  medical_attention: boolean;
  evidence_files: string[];
  assigned_officer?: string;
  created_at: string;
  updated_at: string;
}

export interface CrimeStatistics {
  id: string;
  county: string;
  subcounty?: string;
  coordinates?: { x: number; y: number };
  total_reports: number;
  critical_cases: number;
  resolved_cases: number;
  month_year: string;
  created_at: string;
}

export interface PoliceStation {
  id: string;
  name: string;
  county: string;
  address: string;
  phone: string;
  coordinates: { x: number; y: number };
  services: string[];
  rating: number;
  hours: string;
  created_at: string;
}

// Database functions
export const reportService = {
  // Get all reports (admin only)
  async getAllReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Report[];
  },

  // Get user's reports
  async getUserReports(userId: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('reporter_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Report[];
  },

  // Create new report
  async createReport(report: Partial<Report>) {
    const { data, error } = await supabase
      .from('reports')
      .insert([report])
      .select()
      .single();
    
    if (error) throw error;
    return data as Report;
  },

  // Update report status (admin only)
  async updateReportStatus(id: string, status: Report['status'], assignedOfficer?: string) {
    const updateData: any = { status, updated_at: new Date().toISOString() };
    if (assignedOfficer) updateData.assigned_officer = assignedOfficer;

    const { data, error } = await supabase
      .from('reports')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Report;
  }
};

export const analyticsService = {
  // Get crime statistics by county
  async getCrimeStatistics() {
    const { data, error } = await supabase
      .from('crime_statistics')
      .select('*')
      .order('total_reports', { ascending: false });
    
    if (error) throw error;
    return data as CrimeStatistics[];
  },

  // Get reports by county for heatmap
  async getReportsByCounty() {
    const { data, error } = await supabase
      .from('reports')
      .select('county, severity, status, created_at')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Group by county
    const countyStats = data.reduce((acc: any, report) => {
      if (!acc[report.county]) {
        acc[report.county] = {
          county: report.county,
          total: 0,
          critical: 0,
          resolved: 0,
          recent: 0
        };
      }
      
      acc[report.county].total++;
      if (report.severity === 'critical') acc[report.county].critical++;
      if (report.status === 'resolved') acc[report.county].resolved++;
      
      // Count reports from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (new Date(report.created_at) > thirtyDaysAgo) {
        acc[report.county].recent++;
      }
      
      return acc;
    }, {});
    
    return Object.values(countyStats);
  },

  // Get monthly trends
  async getMonthlyTrends() {
    const { data, error } = await supabase
      .from('reports')
      .select('created_at, severity, status')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    // Group by month
    const monthlyData = data.reduce((acc: any, report) => {
      const month = new Date(report.created_at).toISOString().slice(0, 7); // YYYY-MM
      
      if (!acc[month]) {
        acc[month] = { month, total: 0, critical: 0, resolved: 0 };
      }
      
      acc[month].total++;
      if (report.severity === 'critical') acc[month].critical++;
      if (report.status === 'resolved') acc[month].resolved++;
      
      return acc;
    }, {});
    
    return Object.values(monthlyData);
  },

  // Get hotspot areas (areas with highest crime rates)
  async getHotspots() {
    const { data, error } = await supabase
      .rpc('get_crime_hotspots');
    
    if (error) {
      // Fallback to manual calculation if RPC doesn't exist
      return this.getReportsByCounty();
    }
    
    return data;
  }
};

export const policeStationService = {
  // Get all police stations
  async getAllStations() {
    const { data, error } = await supabase
      .from('police_stations')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as PoliceStation[];
  },

  // Get stations by county
  async getStationsByCounty(county: string) {
    const { data, error } = await supabase
      .from('police_stations')
      .select('*')
      .eq('county', county)
      .order('name');
    
    if (error) throw error;
    return data as PoliceStation[];
  },

  // Find nearest stations (requires coordinates)
  async getNearestStations(lat: number, lng: number, limit: number = 10) {
    // This would use PostGIS functions in a real implementation
    // For now, we'll get all stations and calculate distance client-side
    const stations = await this.getAllStations();
    
    const stationsWithDistance = stations.map(station => ({
      ...station,
      distance: calculateDistance(lat, lng, station.coordinates.x, station.coordinates.y)
    })).sort((a, b) => a.distance - b.distance);
    
    return stationsWithDistance.slice(0, limit);
  }
};

// Utility function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}