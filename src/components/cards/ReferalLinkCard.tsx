"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function ReferralLinkCard() {
  const referralLink = "https://gulftrading.xyz/register/ahad005";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-[90%] max-w-md mx-auto">
      <CardContent className="space-y-4">
        {/* Link box */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <p className="text-sm text-gray-700 truncate flex-1">
            {referralLink}
          </p>

          <Button
            size="icon"
            variant="secondary"
            onClick={handleCopy}
            className="shrink-0 cursor-pointer"
          >
            {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
          </Button>
        </div>

        {/* Helper text */}
        {/* <p className="text-xs text-gray-500">
          Share this link and earn referral bonuses when users join.
        </p> */}
      </CardContent>
    </Card>
  );
}
