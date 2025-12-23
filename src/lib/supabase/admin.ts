import { createClient } from "@supabase/supabase-js";

// Use your Supabase URL and Service Role Key from Supabase settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const createSupabaseAdminClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};
