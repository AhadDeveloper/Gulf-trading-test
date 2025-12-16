"use client";

import TradingImg from "@/assets/trading.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiLock, FiHome } from "react-icons/fi";
import { IconInput } from "@/components/ui/IconInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// -------------------- Zod Schema --------------------
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type inferred from Zod
type LoginFormData = z.infer<typeof loginSchema>;

// -------------------- Component --------------------
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // TODO: call login API
  };

  return (
    <div className="w-full max-w-85 sm:max-w-md md:max-w-lg border-2 border-gray-300 px-6 py-6 rounded-xl bg-white shadow-md flex flex-col items-center gap-4">
      <Link href="/">
        <FiHome className="text-green-600 w-10 h-10" />
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src={TradingImg} alt="Trading Image" width={32} height={32} />
        </Link>
        <h2 className="text-xl font-bold uppercase">Gulf Trading</h2>
      </div>

      <h1 className="text-lg font-bold mt-2">Welcome Back</h1>

      <form
        className="w-full flex flex-col gap-3 mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        {/* Remember me */}
        <div className="flex items-center gap-2 text-sm mt-1">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-10 font-bold bg-green-600 text-white rounded-md mt-4 cursor-pointer hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login Now"}
        </button>
      </form>

      <div className="flex gap-1 text-sm mt-2">
        <p>Don&apos;t have an account?</p>
        <Link href="/signup" className="text-blue-600 hover:underline">
          Signup now
        </Link>
      </div>
    </div>
  );
}
