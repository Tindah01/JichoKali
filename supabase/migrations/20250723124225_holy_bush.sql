/*
  # Police Brutality Reporting Database Schema

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `county` (text)
      - `coordinates` (point - lat/lng)
      - `date_occurred` (date)
      - `time_occurred` (time)
      - `severity` (enum: low, medium, high, critical)
      - `status` (enum: submitted, under_review, investigating, resolved, closed)
      - `reporter_id` (uuid, foreign key to auth.users)
      - `is_anonymous` (boolean)
      - `officer_details` (text)
      - `witnesses` (text)
      - `injuries` (boolean)
      - `medical_attention` (boolean)
      - `evidence_files` (jsonb array)
      - `assigned_officer` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `crime_statistics`
      - `id` (uuid, primary key)
      - `county` (text)
      - `subcounty` (text)
      - `coordinates` (point)
      - `total_reports` (integer)
      - `critical_cases` (integer)
      - `resolved_cases` (integer)
      - `month_year` (text)
      - `created_at` (timestamptz)

    - `police_stations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `county` (text)
      - `address` (text)
      - `phone` (text)
      - `coordinates` (point)
      - `services` (text array)
      - `rating` (decimal)
      - `hours` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
    - Protect sensitive data while allowing analytics

  3. Indexes
    - Location-based indexes for geographic queries
    - Date indexes for time-based analytics
    - Status and severity indexes for filtering
</*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE severity_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE report_status AS ENUM ('submitted', 'under_review', 'investigating', 'resolved', 'closed');

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  county text NOT NULL,
  coordinates point,
  date_occurred date NOT NULL,
  time_occurred time,
  severity severity_level NOT NULL DEFAULT 'medium',
  status report_status NOT NULL DEFAULT 'submitted',
  reporter_id uuid REFERENCES auth.users(id),
  is_anonymous boolean NOT NULL DEFAULT true,
  officer_details text,
  witnesses text,
  injuries boolean DEFAULT false,
  medical_attention boolean DEFAULT false,
  evidence_files jsonb DEFAULT '[]'::jsonb,
  assigned_officer text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crime statistics table for analytics
CREATE TABLE IF NOT EXISTS crime_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  county text NOT NULL,
  subcounty text,
  coordinates point,
  total_reports integer DEFAULT 0,
  critical_cases integer DEFAULT 0,
  resolved_cases integer DEFAULT 0,
  month_year text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Police stations table
CREATE TABLE IF NOT EXISTS police_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  county text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  coordinates point NOT NULL,
  services text[] DEFAULT '{}',
  rating decimal(2,1) DEFAULT 0.0,
  hours text DEFAULT '24/7',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE crime_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE police_stations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reports
CREATE POLICY "Users can view their own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid() OR is_anonymous = true);

CREATE POLICY "Users can insert their own reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid() OR reporter_id IS NULL);

CREATE POLICY "Admins can view all reports"
  ON reports
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for crime statistics (admin only)
CREATE POLICY "Admins can manage crime statistics"
  ON crime_statistics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for police stations (public read, admin write)
CREATE POLICY "Anyone can view police stations"
  ON police_stations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage police stations"
  ON police_stations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reports_county ON reports(county);
CREATE INDEX IF NOT EXISTS idx_reports_date ON reports(date_occurred);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_severity ON reports(severity);
CREATE INDEX IF NOT EXISTS idx_reports_coordinates ON reports USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_crime_stats_county ON crime_statistics(county);
CREATE INDEX IF NOT EXISTS idx_crime_stats_month ON crime_statistics(month_year);
CREATE INDEX IF NOT EXISTS idx_police_stations_county ON police_stations(county);
CREATE INDEX IF NOT EXISTS idx_police_stations_coordinates ON police_stations USING GIST(coordinates);

-- Function to update crime statistics
CREATE OR REPLACE FUNCTION update_crime_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update monthly statistics when a new report is added
  INSERT INTO crime_statistics (county, total_reports, critical_cases, resolved_cases, month_year)
  VALUES (
    NEW.county,
    1,
    CASE WHEN NEW.severity = 'critical' THEN 1 ELSE 0 END,
    CASE WHEN NEW.status = 'resolved' THEN 1 ELSE 0 END,
    TO_CHAR(NEW.created_at, 'YYYY-MM')
  )
  ON CONFLICT (county, month_year) DO UPDATE SET
    total_reports = crime_statistics.total_reports + 1,
    critical_cases = crime_statistics.critical_cases + CASE WHEN NEW.severity = 'critical' THEN 1 ELSE 0 END,
    resolved_cases = crime_statistics.resolved_cases + CASE WHEN NEW.status = 'resolved' THEN 1 ELSE 0 END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic statistics updates
CREATE TRIGGER update_crime_stats_trigger
  AFTER INSERT OR UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_crime_statistics();

-- Insert sample police stations data
INSERT INTO police_stations (name, county, address, phone, coordinates, services, rating) VALUES
('Central Police Station', 'Nairobi', 'University Way, Nairobi CBD', '+254 20 222 2222', point(-1.2864, 36.8172), ARRAY['Emergency Response', 'Criminal Investigation', 'Traffic Police'], 4.2),
('Kilimani Police Station', 'Nairobi', 'Argwings Kodhek Road, Kilimani', '+254 20 271 4673', point(-1.2921, 36.7856), ARRAY['Emergency Response', 'Community Policing', 'Crime Prevention'], 3.8),
('Westlands Police Station', 'Nairobi', 'Waiyaki Way, Westlands', '+254 20 374 4020', point(-1.2676, 36.8108), ARRAY['Emergency Response', 'Traffic Police', 'Criminal Investigation'], 4.0),
('Mombasa Central Police Station', 'Mombasa', 'Nkrumah Road, Mombasa', '+254 41 222 1234', point(-4.0435, 39.6682), ARRAY['Emergency Response', 'Port Security', 'Criminal Investigation'], 3.9),
('Kisumu Central Police Station', 'Kisumu', 'Oginga Odinga Street, Kisumu', '+254 57 202 3456', point(-0.0917, 34.7680), ARRAY['Emergency Response', 'Lake Patrol', 'Traffic Police'], 3.7),
('Eldoret Police Station', 'Uasin Gishu', 'Uganda Road, Eldoret', '+254 53 206 2345', point(0.5143, 35.2697), ARRAY['Emergency Response', 'Highway Patrol', 'Criminal Investigation'], 3.6),
('Nakuru Police Station', 'Nakuru', 'Kenyatta Avenue, Nakuru', '+254 51 221 2345', point(-0.3031, 36.0800), ARRAY['Emergency Response', 'Tourist Police', 'Traffic Police'], 3.8);