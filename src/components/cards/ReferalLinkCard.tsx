"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiCopy, FiCheck } from "react-icons/fi";
import { getReferralInfo } from "@/lib/actions/referral";

interface ReferralLinkCardProps {
  userId: string;
}

export default function ReferralLinkCard({ userId }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReferral() {
      const data = await getReferralInfo(userId);
      if (data?.referralCode) {
        setReferralLink(
          `${window.location.origin}/signup?ref=${data.referralCode}`
        );
      }
    }
    fetchReferral();
  }, [userId]);

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy referral link:", err);
    }
  };

  return (
    <Card className="w-[95%] max-w-md mx-auto">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <p className="text-sm text-gray-700 truncate flex-1">
            {referralLink || "Loading..."}
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
      </CardContent>
    </Card>
  );
}
