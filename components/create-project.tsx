"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function CreateProject() {
  const supabase = createClient();
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const trackingId = "trk_" + Math.random().toString(36).substring(2, 9);

    const { error } = await supabase.from("projects").insert({
      name,
      tracking_id: trackingId,
      user_id: user?.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project created!");
    location.reload();
  };

  return (
    <div className="space-y-2">
      <input
        placeholder="Project name"
        className="border p-2"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate} className="border px-3 py-1">
        Create Project
      </button>
    </div>
  );
}
