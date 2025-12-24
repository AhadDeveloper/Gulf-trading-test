"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/actions/auth";
import { createSupabaseClient } from "@/lib/supabase/client";

type Withdrawal = {
  id: string;
  created_at: string;
  amount: number;
  method: string;
  status: string;
};

export default function PayoutHistory() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      setLoading(true);
      const supabase = createSupabaseClient();
      const user = await getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("withdrawals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch withdrawals:", error);
        setWithdrawals([]);
      } else {
        setWithdrawals(data as Withdrawal[]);
      }

      setLoading(false);
    };

    fetchWithdrawals();
  }, []);

  if (loading) {
    return (
      <Card className="max-w-md mx-auto w-[90%]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Payout History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-6">
            Loading withdrawals...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Payout History</CardTitle>
      </CardHeader>

      <CardContent>
        {withdrawals.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-sm text-gray-500 font-medium">No Data Found!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2">Rs {item.amount}</td>
                    <td className="px-3 py-2">{item.method}</td>
                    <td className="px-3 py-2 capitalize">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
