"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Example types for transactions
interface WithdrawTransaction {
  id: number;
  date: string;
  amount: string;
  status: string;
}

// Example data (replace with API)
const exampleActivePlans: string[] = []; // empty = no active plan
const exampleWithdrawTransactions: WithdrawTransaction[] = []; // empty = no transactions

export default function WithdrawPage() {
  const router = useRouter();

  const [activePlans, setActivePlans] = useState<string[]>([]);
  const [withdrawTransactions, setWithdrawTransactions] = useState<
    WithdrawTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // prevent double run in dev
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        // Replace with your API calls
        const plans = exampleActivePlans;
        const transactions = exampleWithdrawTransactions;

        // Check active plans
        if (plans.length === 0) {
          toast.error("You need to activate a plan first!");
          router.replace("/dashboard");
          return;
        }

        // Check transactions
        if (transactions.length === 0) {
          toast.error("You don’t have any withdraw transactions yet!");
          router.replace("/dashboard");
          return;
        }

        // Only set state if data exists
        setActivePlans(plans);
        setWithdrawTransactions(transactions);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data.");
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // While loading or redirecting, render nothing
  if (loading) return null;

  return (
    <div className="max-w-md mx-auto w-[90%] py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Withdraw Transactions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{tx.date}</td>
                    <td className="px-3 py-2">{tx.amount}</td>
                    <td className="px-3 py-2">{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
