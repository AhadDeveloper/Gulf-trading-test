import UserDetailCard from "@/components/cards/UserDetailCard";
import ReferralLinkCard from "@/components/cards/ReferalLinkCard";
import { Button } from "@/components/ui/button";
import QuickActionsCard from "@/components/sections/QuickActionsCard";
import DashboardStats from "@/components/sections/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <UserDetailCard />
      <ReferralLinkCard />
      <Button className="w-[95%] max-w-md mx-auto">Check Online FBR</Button>
      <QuickActionsCard />
      <DashboardStats />
    </div>
  );
}
