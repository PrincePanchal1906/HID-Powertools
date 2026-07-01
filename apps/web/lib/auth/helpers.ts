import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/auth";
import { canAccessAdmin } from "./permissions";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return data.user;
  } catch (err) {
    console.error('getCurrentUser failed:', err);
    return null;
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile as Profile | null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || !canAccessAdmin(profile.role) || !profile.is_active) {
    redirect("/");
  }
  return profile;
}
