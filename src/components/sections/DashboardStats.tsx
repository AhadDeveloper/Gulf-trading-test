"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiTrendingUp,
  FiGift,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";

type Props = {
  totalDeposit: number;
  totalWithdraw: number;
  totalProfit: number;
  referralBonus: number;
  totalTeam: number;
  teamInvest: number;
};

export default function DashboardStats({
  totalDeposit,
  totalWithdraw,
  totalProfit,
  referralBonus,
  totalTeam,
  teamInvest,
}: Props) {
  const stats = [
    {
      id: 1,
      title: "Total Deposit",
      value: `Rs ${totalDeposit}`,
      icon: <FiArrowDownCircle />,
      color: "text-green-600",
    },
    {
      id: 2,
      title: "Total Withdraw",
      value: `Rs ${totalWithdraw}`,
      icon: <FiArrowUpCircle />,
      color: "text-red-500",
    },
    {
      id: 3,
      title: "Total Profit",
      value: `Rs ${totalProfit}`,
      icon: <FiTrendingUp />,
      color: "text-blue-600",
    },
    {
      id: 4,
      title: "Refer Bonus",
      value: `Rs ${referralBonus}`,
      icon: <FiGift />,
      color: "text-purple-600",
    },
    {
      id: 5,
      title: "Total Team",
      value: totalTeam.toString(),
      icon: <FiUsers />,
      color: "text-indigo-600",
    },
    {
      id: 6,
      title: "Team Invest",
      value: `Rs ${teamInvest}`,
      icon: <FiBriefcase />,
      color: "text-yellow-600",
    },
  ];

  return (
    <Card className="max-w-md mx-auto w-[95%]">
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-gray-50 p-4 flex flex-col items-center text-center gap-2"
            >
              <div className={`text-4xl ${item.color}`}>{item.icon}</div>
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-base font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
