"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

import {
  FiUsers,
  FiDownload,
  FiClock,
  FiRepeat,
  FiUserCheck,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const actions = [
  {
    id: 1,
    label: "Join Our Channel",
    icon: <FaTelegramPlane />,
    href: "#",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: 2,
    label: "Join Our Group",
    icon: <FiUsers />,
    href: "#",
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    id: 3,
    label: "Deposit History",
    icon: <FiClock />,
    href: "/deposit-transactions",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    id: 4,
    label: "Withdraw History",
    icon: <FiRepeat />,
    href: "/withdraw-history",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    id: 5,
    label: "Transaction History",
    icon: <FiRepeat />,
    href: "/transactions",
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: 6,
    label: "My Team",
    icon: <FiUserCheck />,
    href: "/my-team",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    id: 7,
    label: "App Download",
    icon: <FiDownload />,
    href: "#",
    color: "bg-gray-800 hover:bg-gray-900",
  },
  {
    id: 8,
    label: "Admin WhatsApp",
    icon: <FaWhatsapp />,
    href: "https://wa.me/923001234567",
    color: "bg-green-500 hover:bg-green-600",
  },
];

export default function QuickActionsCard() {
  return (
    <Card className="max-w-md mx-auto w-[90%]">
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link key={action.id} href={action.href}>
              <Button
                className={`w-full h-16 flex flex-col items-center justify-center gap-2 text-white ${action.color}`}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
