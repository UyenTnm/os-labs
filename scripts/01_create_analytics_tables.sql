-- Analytics Tables for OS LABS

-- Create events table to track user interactions
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  section_name VARCHAR(100),
  user_id TEXT,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_ms INTEGER,
  scroll_depth DECIMAL(5, 2),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table to track user sessions
CREATE TABLE IF NOT EXISTS analytics_sessions (
  id TEXT PRIMARY KEY,
  user_agent TEXT,
  referrer TEXT,
  language VARCHAR(10),
  viewport_width INTEGER,
  viewport_height INTEGER,
  device_type VARCHAR(50),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_ms INTEGER,
  total_events INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create section_analytics table for aggregated data
CREATE TABLE IF NOT EXISTS section_analytics (
  id BIGSERIAL PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL UNIQUE,
  total_views INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  avg_time_spent_ms INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5, 2) DEFAULT 0,
  conversion_rate DECIMAL(5, 2) DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_insights table to store Claude analysis
CREATE TABLE IF NOT EXISTS ai_insights (
  id BIGSERIAL PRIMARY KEY,
  analysis_type VARCHAR(100),
  section_name VARCHAR(100),
  insight_text TEXT,
  recommendation TEXT,
  confidence_score DECIMAL(3, 2),
  data_period VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_section ON analytics_events(section_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started ON analytics_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_section_analytics_name ON section_analytics(section_name);
CREATE INDEX IF NOT EXISTS idx_ai_insights_created ON ai_insights(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_insights_section ON ai_insights(section_name);

-- Add RLS (Row Level Security) policies
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Allow public to insert events (for tracking)
CREATE POLICY "Allow public to insert events"
  ON analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to insert sessions
CREATE POLICY "Allow public to insert sessions"
  ON analytics_sessions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read section analytics
CREATE POLICY "Allow public to read section analytics"
  ON section_analytics
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to read insights
CREATE POLICY "Allow authenticated to read insights"
  ON ai_insights
  FOR SELECT
  TO authenticated
  USING (true);

-- Create stored procedures for aggregation
CREATE OR REPLACE FUNCTION refresh_section_analytics()
RETURNS void AS $$
BEGIN
  -- Update section analytics from events
  INSERT INTO section_analytics (section_name, total_views, total_clicks, unique_visitors, last_updated)
  SELECT 
    section_name,
    COUNT(*) FILTER (WHERE event_type = 'view'),
    COUNT(*) FILTER (WHERE event_type = 'click'),
    COUNT(DISTINCT session_id),
    NOW()
  FROM analytics_events
  WHERE timestamp > NOW() - INTERVAL '24 hours'
  GROUP BY section_name
  ON CONFLICT (section_name)
  DO UPDATE SET
    total_views = EXCLUDED.total_views,
    total_clicks = EXCLUDED.total_clicks,
    unique_visitors = EXCLUDED.unique_visitors,
    last_updated = NOW();
END;
$$ LANGUAGE plpgsql;
