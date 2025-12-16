"use client";

import TradingImg from "@/assets/trading.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiUser, FiLock, FiHome } from "react-icons/fi";
import { IconInput } from "@/components/ui/IconInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// -------------------- Zod Schema --------------------
const signupSchema = z.object({
  referBy: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type inferred from Zod
type SignupFormData = z.infer<typeof signupSchema>;

// -------------------- Component --------------------
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Data:", data);
    // TODO: send data to backend / API
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
              {...register("referBy")}
            />
          </div>
          {errors.referBy && (
            <p className="text-xs text-red-500">{errors.referBy.message}</p>
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
