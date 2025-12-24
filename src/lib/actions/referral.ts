"use server";

import { createSupabaseAdminClient } from "../supabase/admin";

export const getReferralInfo = async (userId: string) => {
  const supabase = createSupabaseAdminClient();

  // Get referral code of current user
  const { data: codeData, error: codeError } = await supabase
    .from("referral_codes")
    .select("code")
    .eq("user_id", userId)
    .maybeSingle();

  if (codeError) {
    console.error("Referral code error:", codeError);
    return { referralCode: null, referredBy: null };
  }

  // Get referrer
  const { data: refData, error: refError } = await supabase
    .from("referrals")
    .select("referrer_id")
    .eq("referred_id", userId)
    .maybeSingle();

  if (refError) {
    console.error("Referral data error:", refError);
    return { referralCode: codeData?.code || null, referredBy: null };
  }

  let referredBy: string | null = null;

  if (refData?.referrer_id) {
    const { data: refProfile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", refData.referrer_id)
      .maybeSingle();

    if (profileError) {
      console.error("Referrer profile error:", profileError);
    } else if (refProfile) {
      referredBy = refProfile.username;
    }
  }

  return {
    referralCode: codeData?.code || null,
    referredBy,
  };
};

export const getMyTeam = async (userId: string) => {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("referrals")
    .select(
      `
      created_at,
      referred:profiles!referrals_referred_id_fkey (
        id,
        username
      )
    `
    )
    .eq("referrer_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get team error:", error);
    return [];
  }

  return data;
};

export const getDashboardStats = async (userId: string) => {
  const supabase = createSupabaseAdminClient();

  /* 🔹 Total Team Count */
  const { count: totalTeam } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("referrer_id", userId);

  /* 🔹 Referral Bonus (safe even if table empty later) */
  const { data: bonusData } = await supabase
    .from("referral_bonuses")
    .select("bonus_amount")
    .eq("referrer_id", userId);

  const referralBonus =
    bonusData?.reduce((sum, b) => sum + Number(b.bonus_amount), 0) ?? 0;

  return {
    totalTeam: totalTeam ?? 0,
    referralBonus,
    teamInvest: 0, // later
  };
};
