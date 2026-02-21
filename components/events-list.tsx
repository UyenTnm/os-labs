"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { EventsChart } from "./events-chart";

type Event = {
  id: string;
  event_type: string;
  url: string;
  created_at: string;
  visitor_id?: string;
  session_id?: string;
};

export function EventsList({
  initialEvents,
  projectId,
}: {
  initialEvents: Event[];
  projectId: string;
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filter, setFilter] = useState("all");

  const supabase = createClient();

  // REALTIME
  useEffect(() => {
    const channel = supabase
      .channel("events-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "analytics_events",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          console.log(" New event:", payload.new);

          setEvents((prev) => [payload.new as Event, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  // STATS
  const totalEvents = events.length;

  const totalViews = events.filter((e) => e.event_type === "page_view").length;

  const totalClicks = events.filter((e) => e.event_type === "click").length;

  const uniqueUsers = new Set(events.map((e) => e.visitor_id).filter(Boolean))
    .size;

  const totalSessions = new Set(events.map((e) => e.session_id).filter(Boolean))
    .size;

  // FILTER
  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.event_type === filter);

  return (
    <div className="space-y-6">
      <EventsChart events={events} />
      {/* STATS */}
      <div className="grid grid-cols-5 gap-5">
        <div className="border p-4 rounded-lg">
          <div className="text-sm ">Total Events</div>
          <div className="text-2xl font-bold">{totalEvents}</div>
        </div>

        <div className="border p-4 rounded">
          <div className="text-sm">Users</div>
          <div className="text-xl font-bold">{uniqueUsers}</div>
        </div>

        <div className="border p-4 rounded">
          <div className="text-sm">Sessions</div>
          <div className="text-xl font-bold">{totalSessions}</div>
        </div>

        <div className="border p-4 rounded-lg">
          <div className="text-sm ">Views</div>
          <div className="text-2xl font-bold">{totalViews}</div>
        </div>

        <div className="border p-4 rounded-lg">
          <div className="text-sm ">Clicks</div>
          <div className="text-2xl font-bold">{totalClicks}</div>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        <button
          className={filter === "all" ? "bg-black text-white px-3 py-1" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={
            filter === "page_view" ? "bg-black text-white px-3 py-1" : ""
          }
          onClick={() => setFilter("page_view")}
        >
          Views
        </button>

        <button
          className={filter === "click" ? "bg-black text-white px-3 py-1" : ""}
          onClick={() => setFilter("click")}
        >
          Clicks
        </button>
      </div>

      {/* EVENTS LIST */}
      <div className="space-y-2">
        {filteredEvents.map((e) => (
          <div key={e.id} className="border p-3 rounded flex justify-between">
            <div>
              <div className="font-medium">{e.event_type}</div>
              <div className="text-sm text-gray-500">{e.url}</div>
            </div>

            <div className="text-xs text-gray-400">
              {new Date(e.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
