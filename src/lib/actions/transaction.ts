"use server";

import { createSupabaseServerClient } from "../supabase/server";
import { getUser } from "./auth";

export async function getAllTransactions() {
  const supabase = await createSupabaseServerClient();

  const user = await getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("id, type, amount, method, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
