"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Event = {
  id: string;
  event_type: string;
  created_at: string;
};

export function EventsChart({ events }: { events: Event[] }) {
  // 🔥 group theo time (giờ / phút)
  const map: Record<string, { time: string; views: number; clicks: number }> =
    {};

  events.forEach((e) => {
    const date = new Date(e.created_at);

    // 👉 format theo phút (có thể đổi theo ngày)
    const key = `${date.getHours()}:${date.getMinutes()}`;

    if (!map[key]) {
      map[key] = {
        time: key,
        views: 0,
        clicks: 0,
      };
    }

    if (e.event_type === "page_view") {
      map[key].views += 1;
    }

    if (e.event_type === "click") {
      map[key].clicks += 1;
    }
  });

  const data = Object.values(map);

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold mb-4">Traffic</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="views" />
          <Line type="monotone" dataKey="clicks" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
