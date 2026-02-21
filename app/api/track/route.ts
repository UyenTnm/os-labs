import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    console.log("🔥 BODY:", body);

    const {
      tracking_id,
      event_type,
      url,
      session_id,
      visitor_id,
      section_name,
      scroll_depth,
      timestamp,
    } = body;

    if (!tracking_id || !event_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders },
      );
    }

    // STEP 1: check project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("tracking_id", tracking_id)
      .single();

    console.log("🔥 PROJECT:", project);
    console.log("🔥 PROJECT ERROR:", projectError);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 400, headers: corsHeaders },
      );
    }

    // STEP 2: insert event
    const { data, error } = await supabase.from("analytics_events").insert({
      project_id: project.id,
      event_type,
      url,
      session_id,
      visitor_id,
      section_name,
      scroll_depth,
      created_at: timestamp || new Date(),
    });

    console.log("🔥 INSERT DATA:", data);
    console.log("🔥 INSERT ERROR:", error);
    // app/api/track/route.ts

    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: corsHeaders },
      );
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}
