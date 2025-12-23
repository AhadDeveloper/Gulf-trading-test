"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "../supabase/server";
import { SignupFormData, LoginFormData } from "../validations/authSchema";

function resolveUsername(value: string) {
  return value.trim().toLowerCase().split("@")[0];
}

export const signup = async (data: SignupFormData) => {
  const supabase = await createSupabaseServerClient();

  const username = resolveUsername(data.username);
  const email = data.username.includes("@")
    ? data.username
    : `${username}@gmail.com`;

  /* 1️⃣ Create auth user */
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: data.password,
    options: {
      data: { name: data.username },
    },
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Signup failed" };
  }

  const userId = authData.user.id;

  /* 2️⃣ Create profile */
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    username,
    phone: data.phone,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  console.log("Ahad1..............................................");

  /* 3️⃣ Create referral code (always) */
  const { error: codeError } = await supabase.from("referral_codes").insert({
    user_id: userId,
    code: username, // permanent referral code
  });

  if (codeError) {
    console.log("Ahad2...................................................");
    return { error: codeError.message };
  }

  /* 4️⃣ Handle referral (optional) */
  if (data.referredBy) {
    const refCode = data.referredBy.trim().toLowerCase();

    const { data: referrer, error: referrerError } = await supabase
      .from("referral_codes")
      .select("user_id")
      .eq("code", refCode)
      .maybeSingle();

    if (!referrerError && referrer && referrer.user_id !== userId) {
      await supabase.from("referrals").insert({
        referrer_id: referrer.user_id,
        referred_id: userId,
      });
    }
  }

  revalidatePath("/", "layout");
  return { success: true };
};

export const login = async (data: LoginFormData) => {
  const supabase = await createSupabaseServerClient();

  const username = resolveUsername(data.username);
  const email = data.username.includes("@")
    ? data.username
    : `${username}@gmail.com`;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: data.password,
  });

  if (error) {
    return { error: "Invalid username or password" };
  }

  revalidatePath("/", "layout");
  return { success: true };
};

export const logout = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return { success: true };
};

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
