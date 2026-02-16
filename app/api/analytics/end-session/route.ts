import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { session_id, duration_ms } = body

    const { error } = await supabase
      .from('analytics_sessions')
      .update({
        ended_at: new Date(),
        duration_ms,
      })
      .eq('id', session_id)

    if (error) {
      console.error('[API] Session end error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
