"use server";

import { createSupabaseServerClient } from "../supabase/server";
import { getUser } from "./auth";

type DepositInput = {
  planId: number;
  planName: string;
  amount: number;
  paymentMethod: string;
  mobileNumber: string;
  transactionId: string;
};

export const createDeposit = async (input: DepositInput) => {
  const supabase = await createSupabaseServerClient();

  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase.from("deposits").insert({
    user_id: user.id,
    plan_id: input.planId,
    plan_name: input.planName,
    amount: input.amount,
    payment_method: input.paymentMethod,
    mobile_number: input.mobileNumber,
    transaction_id: input.transactionId,
  });

  if (error) {
    console.error("Deposit error:", error);
    throw new Error("Failed to submit deposit");
  }

  return { success: true };
};

export async function getDepositHistory() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("deposits")
    .select("id, amount, payment_method, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch deposit history");
  }

  return data ?? [];
}

export const approveDeposit = async (depositId: string) => {
  const supabase = await createSupabaseServerClient();

  // 1️⃣ Fetch the deposit
  const { data: deposit, error: fetchError } = await supabase
    .from("deposits")
    .select("*")
    .eq("id", depositId)
    .single();

  if (fetchError || !deposit) throw new Error("Deposit not found");

  // 2️⃣ Update deposit status
  const { error: updateError } = await supabase
    .from("deposits")
    .update({ status: "completed", approved_at: new Date() })
    .eq("id", depositId);

  if (updateError) throw new Error("Failed to approve deposit");

  // 3️⃣ Insert transaction
  const { error: transactionError } = await supabase
    .from("transactions")
    .insert({
      user_id: deposit.user_id,
      type: "deposit",
      amount: deposit.amount,
      status: "completed",
      deposit_id: deposit.id,
      created_at: new Date(),
    });

  if (transactionError) throw new Error("Failed to create transaction");

  // 4️⃣ Insert user plan
  const planDurationDays = 30; // example, can be dynamic based on plan
  const startDate = new Date();
  const endDate = new Date(Date.now() + planDurationDays * 24 * 60 * 60 * 1000);

  const { error: planError } = await supabase.from("user_plans").insert({
    user_id: deposit.user_id,
    plan_id: deposit.plan_id,
    plan_name: deposit.plan_name,
    deposit_id: deposit.id,
    start_date: startDate,
    end_date: endDate,
    status: "active",
  });

  if (planError) throw new Error("Failed to create user plan");

  return { success: true };
};

export const rejectDeposit = async (depositId: string, reason?: string) => {
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("deposits")
    .update({
      status: "rejected",
      rejection_reason: reason || "Admin rejected",
      approved_at: new Date(),
    })
    .eq("id", depositId);
};
