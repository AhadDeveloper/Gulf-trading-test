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
