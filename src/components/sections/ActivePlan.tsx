"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiPackage } from "react-icons/fi";
import { getUser } from "@/lib/actions/auth";
import { createSupabaseClient } from "@/lib/supabase/client";

type ActivePlanType = {
  id: string;
  plan_name: string;
  amount: number;
  profit: number;
  status: "Active" | "Completed";
  start_date: string;
  end_date: string;
};

export default function ActivePlan() {
  const [plans, setPlans] = useState<ActivePlanType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivePlans = async () => {
      setLoading(true);

      const supabase = createSupabaseClient();
      const user = await getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "Active")
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Failed to fetch active plans:", error);
        setPlans([]);
      } else {
        setPlans(data as ActivePlanType[]);
      }

      setLoading(false);
    };

    fetchActivePlans();
  }, []);

  if (loading) {
    return (
      <Card className="max-w-md mx-auto w-[90%]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            My Active Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-6">
            Loading active plans...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Active Plans</CardTitle>
      </CardHeader>

      <CardContent>
        {plans.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <FiPackage className="text-5xl text-gray-400" />
            <p className="text-sm text-gray-500 font-medium">
              No Active Plans!
            </p>

            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border rounded-xl p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {plan.plan_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Invested: Rs {plan.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    Profit: Rs {plan.profit}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(plan.start_date).toLocaleDateString()} -{" "}
                    {new Date(plan.end_date).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    plan.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
