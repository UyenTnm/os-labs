import { createClient } from "@/lib/supabase/server";
import { EventsList } from "@/components/events-list";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  const { data: events } = await supabase
    .from("analytics_events")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{project?.name}</h1>

      {/* 🔥 REALTIME COMPONENT */}
      <EventsList initialEvents={events || []} projectId={id} />
    </div>
  );
}
