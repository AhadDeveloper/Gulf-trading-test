"use client";

import TradingImg from "@/assets/trading.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiUser, FiLock, FiHome } from "react-icons/fi";
import { IconInput } from "@/components/ui/IconInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/validations/authSchema";
import { signup } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useEffect } from "react";

// -------------------- Component --------------------
export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setValue("referredBy", ref);
  });

  const onSubmit = async (data: SignupFormData) => {
    const payload = {
      ...data,
      username: data.username.trim(),
      phone: data.phone.trim(),
      referredBy: data.referredBy?.trim(),
    };
    console.log(payload);
    const response = await signup(payload);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-85 sm:max-w-md md:max-w-lg border-2 border-gray-300 p-6 rounded-xl bg-white shadow-md flex flex-col items-center gap-5">
      <Link href="/">
        <FiHome className="text-green-600 w-10 h-10" />
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src={TradingImg} alt="Trading Image" width={32} height={32} />
        </Link>
        <h2 className="text-xl font-bold uppercase">Gulf Trading</h2>
      </div>

      <h1 className="text-lg font-bold mt-2">Register Account</h1>

      <form
        className="w-full flex flex-col gap-3 mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Refer By */}
        <div className="space-y-1">
          <label className="block font-semibold text-sm">Refer By</label>
          <div className="flex items-center gap-2 h-10 w-full rounded-md bg-gray-100 px-2 border border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Referral code"
              className="w-full bg-transparent text-sm outline-none"
              {...register("referredBy")}
            />
          </div>
          {errors.referredBy && (
            <p className="text-xs text-red-500">{errors.referredBy.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="block font-semibold text-sm">Username</label>
          <IconInput
            Icon={FiUser}
            placeholder="Enter Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block font-semibold text-sm">Phone number</label>
          <IconInput
            Icon={FiPhone}
            placeholder="Enter Phone number"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block font-semibold text-sm">Password</label>
          <IconInput
            Icon={FiLock}
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-10 font-bold bg-green-600 text-white rounded-md mt-4 cursor-pointer hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-1 text-sm mt-2">
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-600 hover:underline">
          Login now
        </Link>
      </div>
    </div>
  );
}
