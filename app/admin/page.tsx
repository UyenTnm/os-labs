import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { CreateProject } from "@/components/create-project";

export default async function AdminPage() {
  const supabase = await createClient();

  // 🔥 1. Check session trước
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);

  if (!session) {
    redirect("/login");
  }

  // 🔥 2. Fetch project sau khi đã login
  const { data: projects } = await supabase.from("projects").select("*");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <LogoutButton />

      <CreateProject />

      <div>
        <h2 className="font-bold">Your Projects</h2>

        {projects?.length === 0 && <p>No projects yet</p>}

        {projects?.map((p) => (
          <div key={p.id} className="border p-2 mt-2">
            <div>{p.name}</div>
            <div className="text-sm text-gray-500">{p.tracking_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
