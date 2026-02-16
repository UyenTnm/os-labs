import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { event_type, section_name, session_id, duration_ms, scroll_depth, metadata } = body

    const { data, error } = await supabase.from('analytics_events').insert({
      event_type,
      section_name,
      session_id,
      duration_ms,
      scroll_depth,
      metadata,
      timestamp: new Date(),
    })

    if (error) {
      console.error('[API] Analytics tracking error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
