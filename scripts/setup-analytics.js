import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupAnalyticsTables() {
  try {
    console.log('Setting up analytics tables...')

    // Create analytics_events table
    const { error: eventsError } = await supabase.from('analytics_events').select('*').limit(0)
    if (eventsError?.code === 'PGRST116') {
      console.log('Creating analytics_events table...')
      const createEventsSQL = `
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
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
        CREATE INDEX IF NOT EXISTS idx_analytics_events_section ON analytics_events(section_name);
        CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
        CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
      `
      await supabase.rpc('exec', { sql: createEventsSQL })
    }

    // Create analytics_sessions table
    const { error: sessionsError } = await supabase.from('analytics_sessions').select('*').limit(0)
    if (sessionsError?.code === 'PGRST116') {
      console.log('Creating analytics_sessions table...')
      const createSessionsSQL = `
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
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started ON analytics_sessions(started_at);
      `
      await supabase.rpc('exec', { sql: createSessionsSQL })
    }

    // Create section_analytics table
    const { error: sectionError } = await supabase.from('section_analytics').select('*').limit(0)
    if (sectionError?.code === 'PGRST116') {
      console.log('Creating section_analytics table...')
      const createSectionSQL = `
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
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_section_analytics_name ON section_analytics(section_name);
      `
      await supabase.rpc('exec', { sql: createSectionSQL })
    }

    // Create ai_insights table
    const { error: insightsError } = await supabase.from('ai_insights').select('*').limit(0)
    if (insightsError?.code === 'PGRST116') {
      console.log('Creating ai_insights table...')
      const createInsightsSQL = `
        CREATE TABLE IF NOT EXISTS ai_insights (
          id BIGSERIAL PRIMARY KEY,
          analysis_type VARCHAR(100),
          section_name VARCHAR(100),
          insight_text TEXT,
          recommendation TEXT,
          confidence_score DECIMAL(3, 2),
          data_period VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_ai_insights_created ON ai_insights(created_at);
        CREATE INDEX IF NOT EXISTS idx_ai_insights_section ON ai_insights(section_name);
      `
      await supabase.rpc('exec', { sql: createInsightsSQL })
    }

    console.log('Analytics tables setup complete!')
  } catch (error) {
    console.error('Error setting up analytics tables:', error)
    process.exit(1)
  }
}

setupAnalyticsTables()
