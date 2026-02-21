import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// 🔥 CORS headers dùng chung
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 🔥 BẮT BUỘC phải có OPTIONS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// 🔥 API chính
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const { tracking_id, event_type, url } = body;

    const supabase = await createClient();

    const { data: project } = await supabase
      .from("projects")
      .select("id")
      .eq("tracking_id", tracking_id)
      .single();

    console.log("PROJECT:", project);

    if (!project) {
      return new Response(JSON.stringify({ error: "Invalid tracking_id" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { error } = await supabase.from("analytics_events").insert({
      project_id: project.id,
      event_type,
      url,
      created_at: new Date(),
    });

    if (error) {
      console.error("INSERT ERROR:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("API ERROR:", err);

    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
