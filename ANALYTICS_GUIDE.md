# OS LABS Analytics System - Complete Guide

## Overview

The analytics system uses Claude AI to analyze user behavior on your website and provide actionable insights. It tracks:

- **User Sessions**: Session duration, device type, referrer, language
- **Section Interactions**: Clicks, views, time spent, scroll depth for each section
- **Conversions**: Form submissions and CTA interactions
- **AI Analysis**: Claude generates insights and recommendations based on the data

## Architecture

### Database Schema

Four main tables store analytics data:

1. **analytics_events** - Individual user interactions (views, clicks, scrolls)
2. **analytics_sessions** - Session information (duration, device, referrer)
3. **section_analytics** - Aggregated metrics per section (views, clicks, bounce rate)
4. **ai_insights** - Stored AI analysis and recommendations

### Frontend Components

#### useAnalytics Hook (`lib/hooks/useAnalytics.ts`)

The main hook for tracking user interactions:

```typescript
const { trackEvent, trackSectionView, trackSectionClick, trackScroll, trackConversion } = useAnalytics()

// Track when user enters a section
trackSectionView('services')

// Track when user clicks on a CTA
trackSectionClick('services', 'explore-products')

// Track scroll depth
trackScroll('services', 75) // 75% depth

// Track form submission
trackConversion({ email: 'user@example.com', ... })
```

#### AnalyticsWrapper Component (`components/analytics-wrapper.tsx`)

Automatically tracks scroll depth and section views. Wrap any section:

```tsx
<AnalyticsWrapper sectionName="services">
  <Services />
</AnalyticsWrapper>
```

### Backend API Routes

#### POST `/api/analytics/track`

Track individual events from the client side.

**Request:**
```json
{
  "event_type": "click",
  "section_name": "services",
  "session_id": "session_123",
  "duration_ms": 5000,
  "scroll_depth": 75,
  "metadata": { "target": "cta-button" }
}
```

#### POST `/api/analytics/end-session`

End a session when user leaves the page.

**Request:**
```json
{
  "session_id": "session_123",
  "duration_ms": 120000
}
```

#### POST `/api/analytics/analyze`

Get AI-powered insights using Claude.

**Request:**
```json
{
  "period": "24h", // or "7d", "30d"
  "sectionName": "services" // optional
}
```

**Response:**
```json
{
  "metrics": { ... },
  "insight": "Claude analysis text...",
  "recommendations": "- Recommendation 1\n- Recommendation 2"
}
```

### Admin Dashboard (`app/admin/page.tsx`)

Access at `/admin` to view:
- Real-time metrics (sessions, avg duration, conversion rate)
- Charts (bar charts, pie charts)
- AI insights with recommendations
- Detailed section metrics

**Features:**
- Period selector (24h, 7d, 30d)
- Live data refresh
- Section-by-section breakdown
- AI recommendations based on data patterns

## Integration Guide

### Step 1: Setup Database Tables

```bash
pnpm node scripts/setup-analytics.js
```

This creates all necessary tables and indexes in Supabase.

### Step 2: Environment Variables

Ensure these are set (they should be auto-configured):

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 3: Add Tracking to Components

For new sections, use the AnalyticsWrapper:

```tsx
// In app/page.tsx
<AnalyticsWrapper sectionName="my-section">
  <MySection />
</AnalyticsWrapper>
```

For tracking specific clicks:

```tsx
'use client'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export function MyComponent() {
  const { trackSectionClick } = useAnalytics()
  
  return (
    <button onClick={() => trackSectionClick('my-section', 'my-button')}>
      Click me
    </button>
  )
}
```

### Step 4: View Dashboard

Visit `/admin` to see analytics and AI insights.

## Data Structure

### Session Tracking

Each user gets a unique `session_id` on first page load:

```
session_123456789_abc123
```

All events within a session are linked to this ID.

### Event Types

- **view**: User entered a section
- **click**: User clicked on an element (CTA, button)
- **scroll**: User scrolled in a section
- **conversion**: User submitted a form

### Scroll Depth

Percentage of section visible when scrolling:
- 25% = User saw 25% of the section
- 100% = User scrolled through the entire section

## Claude AI Integration

### How It Works

1. Fetch analytics data from database for the specified period
2. Calculate metrics (views, clicks, engagement, conversion rate)
3. Send metrics to Claude with context
4. Claude analyzes patterns and generates insights
5. Store insights in `ai_insights` table

### Example Insights Claude Provides

- "The Services section is your most engaged area with 45 clicks from 32 sessions"
- "Portfolio has low scroll depth (28%) - consider adding more visual content"
- "Conversion rate is 2.5% - adding more CTAs above the fold could improve this"
- "Users spend an average of 42 seconds on the site - content is engaging"

### Customizing AI Analysis

Edit the prompt in `/api/analytics/analyze/route.ts`:

```typescript
const analysisPrompt = generateAnalysisPrompt(metrics, period, sectionName)

function generateAnalysisPrompt(metrics, period, sectionName) {
  // Customize the prompt here
}
```

## Monitoring & Maintenance

### Check Session Activity

```sql
SELECT COUNT(*) as active_sessions
FROM analytics_sessions
WHERE ended_at IS NULL;
```

### View Recent Events

```sql
SELECT * FROM analytics_events
ORDER BY timestamp DESC
LIMIT 100;
```

### Aggregate Data

The system calculates aggregated metrics automatically:

```sql
SELECT section_name, total_views, total_clicks, avg_time_spent_ms
FROM section_analytics;
```

## Privacy & Security

### Row Level Security (RLS)

- Public can insert analytics events (required for tracking)
- Public can read aggregated section analytics
- Only authenticated users can read AI insights

### Data Retention

Consider archiving old data periodically:

```sql
DELETE FROM analytics_events
WHERE timestamp < NOW() - INTERVAL '90 days';
```

## Performance Optimization

### Indexes

The system includes indexes on:
- `session_id` - Fast session lookups
- `section_name` - Fast section filtering
- `timestamp` - Fast date range queries
- `event_type` - Fast event type filtering

### Query Optimization

For large datasets, use the analysis API with time period filters:

```typescript
// This auto-filters data by time period
await fetch('/api/analytics/analyze', {
  method: 'POST',
  body: JSON.stringify({ period: '24h' })
})
```

## Troubleshooting

### Events Not Tracking

1. Check browser console for errors
2. Verify Supabase credentials in env vars
3. Check RLS policies allow public inserts
4. Verify `session_id` is being created

### AI Analysis Takes Long Time

1. Claude can take 10-30 seconds to analyze
2. Caching is not implemented - each request hits Claude
3. Consider adding Redis caching for frequent queries

### Dashboard Shows No Data

1. Verify events are being inserted (check Supabase dashboard)
2. Ensure time period filter captures data
3. Check that sections in wrappers match database records

## Future Enhancements

- [ ] Cache AI insights for 1-6 hours
- [ ] Add custom event tracking API
- [ ] Implement cohort analysis
- [ ] Add A/B testing framework
- [ ] Funnel analysis for conversion tracking
- [ ] Export data to CSV/PDF
- [ ] Slack integration for daily insights
- [ ] Real-time alerts for high bounce rates
- [ ] ML-based anomaly detection
- [ ] Multi-region support

## Code Examples

### Track Custom Events

```typescript
const { trackEvent } = useAnalytics()

trackEvent({
  event_type: 'click',
  section_name: 'services',
  metadata: {
    service_id: 'web-design',
    plan: 'pro'
  }
})
```

### Get Section Analytics

```typescript
// In an API route
const { data } = await supabase
  .from('section_analytics')
  .select('*')
  .eq('section_name', 'services')

console.log(data[0].total_clicks)
```

### Query Raw Events

```typescript
const { data: events } = await supabase
  .from('analytics_events')
  .select('*')
  .eq('section_name', 'hero')
  .eq('event_type', 'click')
  .gte('timestamp', '2024-01-15')
```

## API Reference

### useAnalytics Hook

```typescript
interface UseAnalyticsReturn {
  trackEvent(event: AnalyticsEvent): Promise<void>
  trackSectionView(section: string): void
  trackSectionClick(section: string, target?: string): void
  trackScroll(section: string, depth: number): void
  trackConversion(formData: Record<string, any>): void
}
```

### AnalyticsEvent Schema

```typescript
interface AnalyticsEvent {
  event_type: 'view' | 'click' | 'scroll' | 'conversion'
  section_name: string
  duration_ms?: number
  scroll_depth?: number
  metadata?: Record<string, any>
}
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the database schema
3. Check API response logs
4. Verify Supabase connection status
