import { generateText } from 'ai'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { period = '24h', sectionName } = await request.json()

    // Fetch analytics data based on period
    const periodMs =
      period === '24h'
        ? 24 * 60 * 60 * 1000
        : period === '7d'
          ? 7 * 24 * 60 * 60 * 1000
          : 30 * 24 * 60 * 60 * 1000

    const startTime = new Date(Date.now() - periodMs)

    // Get events data
    let query = supabase
      .from('analytics_events')
      .select('*')
      .gte('timestamp', startTime.toISOString())

    if (sectionName) {
      query = query.eq('section_name', sectionName)
    }

    const { data: events, error: eventsError } = await query

    if (eventsError) {
      throw new Error(`Failed to fetch events: ${eventsError.message}`)
    }

    // Get session data
    let sessionQuery = supabase
      .from('analytics_sessions')
      .select('*')
      .gte('started_at', startTime.toISOString())

    const { data: sessions, error: sessionsError } = await sessionQuery

    if (sessionsError) {
      throw new Error(`Failed to fetch sessions: ${sessionsError.message}`)
    }

    // Calculate metrics
    const metrics = calculateMetrics(events || [], sessions || [])

    // Generate AI insights
    const analysisPrompt = generateAnalysisPrompt(metrics, period, sectionName)

    const result = await generateText({
      model: 'anthropic/claude-opus-4.5',
      system: `You are a data analyst specializing in user behavior analytics. 
               Provide concise, actionable insights based on the provided metrics.
               Focus on: user engagement patterns, popular sections, conversion opportunities,
               and specific recommendations to improve user experience.`,
      prompt: analysisPrompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    const insight = result.text

    // Save insights to database
    const { error: insertError } = await supabase.from('ai_insights').insert({
      analysis_type: sectionName ? 'section_analysis' : 'overall_analysis',
      section_name: sectionName || null,
      insight_text: insight,
      recommendation: generateRecommendations(metrics),
      confidence_score: 0.85,
      data_period: period,
    })

    if (insertError) {
      console.error('Failed to save insights:', insertError)
    }

    return NextResponse.json({
      success: true,
      metrics,
      insight,
      recommendations: generateRecommendations(metrics),
    })
  } catch (error) {
    console.error('[API] Analysis error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    )
  }
}

function calculateMetrics(
  events: any[],
  sessions: any[]
) {
  const sectionMetrics: Record<
    string,
    {
      views: number
      clicks: number
      avgDuration: number
      scrollEvents: number
      maxScrollDepth: number
    }
  > = {}

  // Group events by section
  events.forEach((event) => {
    const section = event.section_name || 'unknown'
    if (!sectionMetrics[section]) {
      sectionMetrics[section] = {
        views: 0,
        clicks: 0,
        avgDuration: 0,
        scrollEvents: 0,
        maxScrollDepth: 0,
      }
    }

    const metrics = sectionMetrics[section]
    switch (event.event_type) {
      case 'view':
        metrics.views++
        break
      case 'click':
        metrics.clicks++
        metrics.avgDuration = (metrics.avgDuration + (event.duration_ms || 0)) / 2
        break
      case 'scroll':
        metrics.scrollEvents++
        metrics.maxScrollDepth = Math.max(metrics.maxScrollDepth, event.scroll_depth || 0)
        break
    }
  })

  const totalSessions = sessions.length
  const avgSessionDuration =
    sessions.reduce((sum, s) => sum + (s.duration_ms || 0), 0) / (totalSessions || 1)

  const conversionEvents = events.filter((e) => e.event_type === 'conversion')
  const conversionRate = totalSessions > 0 ? (conversionEvents.length / totalSessions) * 100 : 0

  return {
    sectionMetrics,
    totalSessions,
    avgSessionDuration,
    totalEvents: events.length,
    conversionRate,
    topSections: Object.entries(sectionMetrics)
      .sort(([, a], [, b]) => b.clicks - a.clicks)
      .slice(0, 3)
      .map(([name, metrics]) => ({ name, ...metrics })),
  }
}

function generateAnalysisPrompt(metrics: any, period: string, sectionName?: string): string {
  const topSections = metrics.topSections.map((s: any) => `${s.name}: ${s.clicks} clicks`).join(', ')

  return `
Analyze the following user analytics data from the OS LABS website for the ${period} period:

Key Metrics:
- Total Sessions: ${metrics.totalSessions}
- Average Session Duration: ${(metrics.avgSessionDuration / 1000).toFixed(2)} seconds
- Total Events: ${metrics.totalEvents}
- Conversion Rate: ${metrics.conversionRate.toFixed(2)}%
- Top Sections (by clicks): ${topSections}

Section Details:
${Object.entries(metrics.sectionMetrics)
  .map(
    ([section, data]: [string, any]) =>
      `${section}: ${data.views} views, ${data.clicks} clicks, ${(data.avgDuration / 1000).toFixed(2)}s avg time, ${data.maxScrollDepth.toFixed(0)}% scroll depth`
  )
  .join('\n')}

${sectionName ? `Focus specifically on the "${sectionName}" section.` : ''}

Please provide:
1. Key findings about user engagement patterns
2. Which sections are most popular and why
3. Areas that need improvement
4. Specific actionable recommendations
  `
}

function generateRecommendations(metrics: any): string {
  const recommendations: string[] = []

  // Check top sections
  const topSection = metrics.topSections[0]
  if (topSection) {
    recommendations.push(`Increase content/CTAs in "${topSection.name}" - it's your most engaged section`)
  }

  // Check conversion rate
  if (metrics.conversionRate < 5) {
    recommendations.push('Add more prominent CTAs to improve conversion rate')
  }

  // Check session duration
  if (metrics.avgSessionDuration < 30000) {
    recommendations.push('Consider adding more engaging content to increase session duration')
  }

  // Check for sections with low engagement
  const lowEngagementSections = Object.entries(metrics.sectionMetrics)
    .filter(([, data]: [string, any]) => data.clicks < 5)
    .map(([name]) => name)

  if (lowEngagementSections.length > 0) {
    recommendations.push(
      `Improve "${lowEngagementSections[0]}" section - it has lower engagement than others`
    )
  }

  return recommendations.join('\n')
}
