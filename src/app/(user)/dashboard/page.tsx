import UserDetailCard from "@/components/cards/UserDetailCard";
import ReferralLinkCard from "@/components/cards/ReferalLinkCard";
import { Button } from "@/components/ui/button";
import QuickActionsCard from "@/components/sections/QuickActionsCard";
import DashboardStats from "@/components/sections/DashboardStats";
import { getProfile } from "@/lib/actions/profile";
import { getUser } from "@/lib/actions/auth";
import { getReferralInfo } from "@/lib/actions/referral"; // your server action
import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { Suspense } from "react";
import DashboardStatsSkeleton from "@/components/cards/DashboardStatsSkeleton";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    return <div>Please log in to view your dashboard</div>;
  }

  const { data: profile, error } = await getProfile();
  const stats = await getDashboardStats();

  // Fetch referral info
  const referralInfo = await getReferralInfo(user.id);
  console.log(referralInfo);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Profile section */}
      {error ? (
        <div className="text-red-600 text-center p-4 border rounded max-w-md mx-auto w-[95%]">
          {error}
        </div>
      ) : (
        <UserDetailCard
          profile={profile}
          referredBy={referralInfo.referredBy}
        />
      )}

      {/* Referral Link section */}
      <ReferralLinkCard userId={user.id} />

      {/* Other dashboard sections */}
      <Link href="/fbr" className="w-[95%] max-w-md mx-auto">
        <Button className="w-full">Check Online FBR</Button>
      </Link>
      <QuickActionsCard />
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats
          totalDeposit={stats.totalDeposit}
          totalWithdraw={stats.totalWithdraw}
          totalProfit={stats.totalProfit}
          referralBonus={stats.referralBonus}
          totalTeam={stats.totalTeam}
          teamInvest={stats.teamInvest}
        />
      </Suspense>
    </div>
  );
}
