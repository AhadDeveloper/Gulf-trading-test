"use client";

import { Profile } from "@/types";
import Link from "next/link";

interface UserDetailCardProps {
  profile?: Profile | null;
  referredBy?: string | null; // <-- Add this
}

export default function UserDetailCard({
  profile,
  referredBy,
}: UserDetailCardProps) {
  if (!profile) {
    return (
      <div className="max-w-md mx-auto p-4 text-center text-gray-600 border rounded">
        Profile data not available
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200 w-[95%] sm:w-full">
      {/* Welcome & Balance */}
      <div className="mb-6 text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Welcome! <span className="text-green-600">{profile.username}</span>
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Rs <span>0.0</span>
        </p>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Current Balance
        </p>
      </div>

      {/* Referrer */}
      <div className="mb-6 text-center">
        <p className="text-sm sm:text-base text-gray-500">
          Ref By{" "}
          <span className="font-medium text-gray-700">
            {referredBy || "N/A"}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <Link
          href="/deposit" // the page you want to open
          className="flex-1 bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition text-center"
        >
          Deposit Plans
        </Link>
        <Link
          href="/withdraw"
          className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition text-center"
        >
          Withdraw Profit
        </Link>
        <Link
          href="/invest-history"
          className="flex-1 bg-yellow-500 text-white font-medium py-3 rounded-lg hover:bg-yellow-600 transition text-center"
        >
          My Profit Plans
        </Link>
      </div>
    </div>
  );
}
