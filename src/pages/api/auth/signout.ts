
import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  cookies.delete("sb-access-token", { path: "/admin" });
  cookies.delete("sb-refresh-token", { path: "/admin" });

  if (accessToken && refreshToken) {
    await supabase.auth.signOut();
  }

  return redirect("/admin/auth");
};
