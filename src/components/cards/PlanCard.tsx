"use client";

import Link from "next/link";
import { Plan } from "@/types";

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col gap-3">
      <h3 className="text-lg font-bold text-center">{plan.name}</h3>

      <p className="text-center text-2xl font-extrabold text-green-600">
        Rs {plan.price}
      </p>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          Daily Profit: <span className="font-medium">Rs {plan.daily}</span>
        </p>
        <p>
          Total Profit: <span className="font-medium">Rs {plan.total}</span>
        </p>
        <p>
          Plan Valid: <span className="font-medium">35 Days</span>
        </p>
        <p>
          Direct Refer Level 1: <span className="font-medium">12%</span>
        </p>
        <p>
          Direct Refer Level 2: <span className="font-medium">3%</span>
        </p>
      </div>

      {/* Pass plan id to dynamic invest page */}
      <Link
        href={`/deposit/${plan.id}`}
        className="mt-4 text-center py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
      >
        Invest
      </Link>
    </div>
  );
}
