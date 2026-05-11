import { supabase } from "@/lib/supabase";

interface AuthCookies {
  get: (name: string) => { value: string } | undefined;
}

export async function getAuthenticatedUser(cookies: AuthCookies) {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return null;

  try {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}
