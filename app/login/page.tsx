"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[300px] space-y-4 border p-6 rounded-xl">
        <h1 className="text-xl font-semibold">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
