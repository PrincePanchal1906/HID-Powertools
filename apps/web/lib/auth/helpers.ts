import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/auth";
import { canAccessAdmin } from "./permissions";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
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
