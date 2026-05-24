"use server";

import { supabase } from "@/lib/supabase";
import { SCHOOLS } from "@/lib/schools";

interface JoinResult {
  success: boolean;
  position?: number;
  alreadyJoined?: boolean;
  error?: string;
}

export async function joinWaitlist(
  email: string,
  school: string
): Promise<JoinResult> {
  if (!email || !school) {
    return { success: false, error: "Email and school are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Check if already on waitlist
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id, created_at")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (existing) {
    // Get their position
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", existing.created_at);

    return { success: true, alreadyJoined: true, position: count ?? 1 };
  }

  const { error } = await supabase.from("waitlist").insert({
    email: email.toLowerCase().trim(),
    school,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Get their position
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return { success: true, position: count ?? 1 };
}

export async function getSchoolCounts(): Promise<
  { school: string; count: number }[]
> {
  const { data, error } = await supabase
    .from("waitlist")
    .select("school");

  if (error || !data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.school] = (counts[row.school] ?? 0) + 1;
  }

  const merged = SCHOOLS.map((school) => ({
    school,
    count: counts[school] ?? 0,
  }));

  return merged.sort((a, b) => b.count - a.count);
}

export async function getTotalCount(): Promise<number> {
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}
