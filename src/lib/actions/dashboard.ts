"use server";

import { createSupabaseServerClient } from "../supabase/server";

export async function getDashboardStats() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;

  /* ---------------- TOTAL DEPOSIT ---------------- */
  const { data: deposits } = await supabase
    .from("deposits")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "approved");

  const totalDeposit =
    deposits?.reduce((sum, d) => sum + Number(d.amount), 0) ?? 0;

  /* ---------------- TOTAL WITHDRAW ---------------- */
  const { data: withdrawals } = await supabase
    .from("withdrawals")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "approved");

  const totalWithdraw =
    withdrawals?.reduce((sum, w) => sum + Number(w.amount), 0) ?? 0;

  /* ---------------- TOTAL PROFIT ---------------- */
  const { data: profits } = await supabase
    .from("profits")
    .select("amount")
    .eq("user_id", userId);

  const totalProfit =
    profits?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;

  /* ---------------- REFERRAL BONUS ---------------- */
  const { data: bonuses } = await supabase
    .from("referral_bonuses")
    .select("amount")
    .eq("user_id", userId);

  const referralBonus =
    bonuses?.reduce((sum, b) => sum + Number(b.amount), 0) ?? 0;

  /* ---------------- TOTAL TEAM ---------------- */
  const { count: totalTeam } = await supabase
    .from("referrals")
    .select("id", { count: "exact", head: true })
    .eq("referrer_id", userId);

  /* ---------------- TEAM INVEST ---------------- */
  // get referred user ids
  const { data: teamMembers } = await supabase
    .from("referrals")
    .select("referred_id")
    .eq("referrer_id", userId);

  const teamIds = teamMembers?.map((m) => m.referred_id) ?? [];

  let teamInvest = 0;

  if (teamIds.length > 0) {
    const { data: teamDeposits } = await supabase
      .from("deposits")
      .select("amount")
      .in("user_id", teamIds)
      .eq("status", "approved");

    teamInvest =
      teamDeposits?.reduce((sum, d) => sum + Number(d.amount), 0) ?? 0;
  }

  return {
    totalDeposit,
    totalWithdraw,
    totalProfit,
    referralBonus,
    totalTeam: totalTeam ?? 0,
    teamInvest,
  };
}
