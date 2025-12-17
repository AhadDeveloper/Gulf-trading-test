"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Example data; replace with your API data
const payouts: {
  id: number;
  date: string;
  amount: string;
  method: string;
  status: string;
}[] = [];
// Empty = No data; Add objects to simulate payout history

export default function PayoutHistory() {
  const hasData = payouts.length > 0;

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Payout History</CardTitle>
      </CardHeader>

      <CardContent>
        {!hasData ? (
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
                {payouts.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{item.date}</td>
                    <td className="px-3 py-2">{item.amount}</td>
                    <td className="px-3 py-2">{item.method}</td>
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
