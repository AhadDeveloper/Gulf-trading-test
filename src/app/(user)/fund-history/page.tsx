import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/sections/StatusBadge";
import { getDepositHistory } from "@/lib/actions/deposit";

export default async function FundsHistory() {
  const deposits = await getDepositHistory();

  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Deposit History</CardTitle>
      </CardHeader>

      <CardContent>
        {deposits.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-sm text-gray-500 font-medium">
              No Deposit Records Found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {deposits.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 font-medium">Rs {item.amount}</td>
                    <td className="px-3 py-2">{item.payment_method}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={item.status} />
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
