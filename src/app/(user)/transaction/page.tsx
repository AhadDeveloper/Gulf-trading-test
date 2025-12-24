"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTransactions } from "@/lib/actions/transaction";

type Transaction = {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  method: string;
  status: "pending" | "completed" | "rejected";
  created_at: string;
};

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions().then((data) => {
      setTransactions(data as Transaction[]);
      setLoading(false);
    });
  }, []);

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          All Transactions
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-gray-500 text-center py-6">
            Loading transactions...
          </p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No Data Found!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>

                    <td
                      className={`px-3 py-2 font-medium ${
                        item.type === "deposit"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.type}
                    </td>

                    <td className="px-3 py-2">Rs {item.amount}</td>

                    <td className="px-3 py-2">{item.method}</td>

                    <td
                      className={`px-3 py-2 font-medium ${
                        item.status === "completed"
                          ? "text-green-600"
                          : item.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
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
