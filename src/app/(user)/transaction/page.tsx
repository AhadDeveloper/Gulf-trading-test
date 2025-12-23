"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Example transaction data (replace with your API fetch)
const initialTransactions: {
  id: number;
  date: string;
  type: string;
  amount: string;
  status: string;
}[] = [];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const hasData = transactions.length > 0;

  // Simulate reload (replace with API fetch)
  const handleReload = () => {
    console.log("Reload transaction data");
    // Example: fetch data from API and setTransactions(response)
  };

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Transaction History
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!hasData ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-sm text-gray-500 font-medium">No Data Found!</p>
            <Button onClick={handleReload} size="sm" variant="outline">
              Reload
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{item.date}</td>
                    <td className="px-3 py-2">{item.type}</td>
                    <td className="px-3 py-2">{item.amount}</td>
                    <td className="px-3 py-2">{item.status}</td>
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
