"use client";

import { useParams, useRouter } from "next/navigation";
import { Plan } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  depositSchema,
  DepositFormValues,
} from "@/lib/validations/depositSchema";
import { createDeposit } from "@/lib/actions/deposit";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const plans: Plan[] = [
  { id: 1, name: "Gulf-01", price: 465, daily: 77, total: 2695 },
  { id: 2, name: "Gulf-02", price: 1165, daily: 194, total: 6790 },
  { id: 3, name: "Gulf-03", price: 2465, daily: 410, total: 14350 },
  { id: 4, name: "Gulf-04", price: 4465, daily: 744, total: 26040 },
  { id: 5, name: "Gulf-05", price: 5865, daily: 977, total: 34195 },
  { id: 6, name: "Gulf-06", price: 10365, daily: 1727, total: 60445 },
  { id: 7, name: "Gulf-07", price: 18065, daily: 3010, total: 105350 },
  { id: 8, name: "Gulf-08", price: 26565, daily: 4427, total: 154945 },
  { id: 9, name: "Gulf-09", price: 52565, daily: 8760, total: 306600 },
  { id: 10, name: "Gulf-10", price: 102565, daily: 17094, total: 598290 },
  { id: 11, name: "Gulf-11", price: 153565, daily: 25594, total: 895790 },
  { id: 12, name: "Gulf-12", price: 273565, daily: 45594, total: 1595790 },
];

export default function InvestPage() {
  const params = useParams();
  const router = useRouter();

  const planId = Number(params.id);
  const plan = plans.find((p) => p.id === planId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
  });

  if (!plan) return <p>Plan not found</p>;

  const onSubmit = async (values: DepositFormValues) => {
    try {
      await createDeposit({
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
        paymentMethod: values.paymentMethod,
        mobileNumber: values.mobileNumber,
        transactionId: values.transactionId,
      });

      toast.success("Deposit submitted successfully");

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Failed to submit deposit");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 rounded-xl border bg-white shadow-sm p-6 w-[90%]">
      <h2 className="text-xl font-semibold mb-1">{plan.name} Package</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Amount: <span className="font-medium">Rs {plan.price}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <select
            {...register("mobileNumber")}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Number</option>
            <option value="03001234567">03001234567</option>
            <option value="03109876543">03109876543</option>
          </select>
          {errors.mobileNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>
          <select
            {...register("paymentMethod")}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="JazzCash">JazzCash</option>
            <option value="Easypaisa">Easypaisa</option>
          </select>
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Transaction ID
          </label>
          <input
            {...register("transactionId")}
            placeholder="Enter transaction ID"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.transactionId && (
            <p className="text-xs text-red-500 mt-1">
              {errors.transactionId.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "Submit Deposit"}
        </button>
      </form>
    </div>
  );
}
