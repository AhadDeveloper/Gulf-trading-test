"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

// Example data; replace with your API data
const referralBonuses: {
  id: number;
  date: string;
  amount: string;
  status: string;
}[] = []; // Empty = No Data

export default function ReferralBonusPage() {
  const hasData = referralBonuses.length > 0;

  return (
    <Card className="max-w-md mx-auto w-[90%] my-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bonus History</CardTitle>
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
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {referralBonuses.map((bonus) => (
                  <tr key={bonus.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{bonus.date}</td>
                    <td className="px-3 py-2">{bonus.amount}</td>
                    <td className="px-3 py-2">{bonus.status}</td>
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
