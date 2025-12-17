"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FiCopy } from "react-icons/fi";

export default function ReferralLinkPage() {
  const referralUrl = "https://gulftrading.xyz/register/ahad005";

  const referralData = {
    level1: { team: 0, commission: "Rs0", investment: "Rs0" },
    level2: { team: 0, commission: "Rs0", investment: "Rs0" },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success("Referral link copied!");
  };

  return (
    <div className="max-w-md mx-auto w-[90%] py-6 flex flex-col gap-6">
      {/* Referral Link Card */}
      <Card className="bg-green-50 border-green-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-800">
            Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-md border border-gray-200">
            <p className="break-all text-sm sm:text-base font-medium text-gray-800">
              {referralUrl}
            </p>
            <Button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <FiCopy className="text-lg" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level 1 Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Level 1</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Team</p>
            <p className="font-medium">{referralData.level1.team}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission</p>
            <p className="font-medium">{referralData.level1.commission}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Investment</p>
            <p className="font-medium">{referralData.level1.investment}</p>
          </div>
        </CardContent>
      </Card>

      {/* Level 2 Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Level 2</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Team</p>
            <p className="font-medium">{referralData.level2.team}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission</p>
            <p className="font-medium">{referralData.level2.commission}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Investment</p>
            <p className="font-medium">{referralData.level2.investment}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
