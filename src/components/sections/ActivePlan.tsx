"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiPackage } from "react-icons/fi";

// example data (later replace with API data)
const activePlans: {
  id: number;
  name: string;
  amount: string;
  profit: string;
  status: "Active" | "Completed";
}[] = [];
// 👆 empty array = No Data
// add object(s) to simulate active plan

export default function ActivePlan() {
  const hasData = activePlans.length > 0;

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Active Plans</CardTitle>
      </CardHeader>

      <CardContent>
        {!hasData ? (
          /* NO DATA STATE */
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <FiPackage className="text-5xl text-gray-400" />
            <p className="text-sm text-gray-500 font-medium">No Data Found!</p>

            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          /* ACTIVE PLANS */
          <div className="space-y-3">
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                className="border rounded-xl p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {plan.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Invested: {plan.amount}
                  </p>
                  <p className="text-xs text-gray-500">Profit: {plan.profit}</p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
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
