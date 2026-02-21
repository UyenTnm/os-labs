"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function CreateProject() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) {
      alert("Please enter project name");
      return;
    }

    setLoading(true);

    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not authenticated");
      setLoading(false);
      return;
    } 

    // better tracking id
    const trackingId = "trk_" + crypto.randomUUID().slice(0, 8);

    const { error } = await supabase.from("projects").insert({
      name,
      tracking_id: trackingId,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project created!");

    // clear input
    setName("");

    // reload nhẹ (optional)
    window.location.reload();
  };

  return (
    <div className="space-y-2">
      <input
        placeholder="Project name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="border px-3 py-1"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}
