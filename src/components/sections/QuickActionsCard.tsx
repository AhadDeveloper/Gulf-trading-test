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

type ActionType = "internal" | "external" | "download";

const actions = [
  {
    id: 1,
    label: "Join Our Channel",
    icon: <FaWhatsapp />,
    type: "external",
    href: "https://chat.whatsapp.com/CGDC2OrmgEZDTKhP1VsXbl",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    id: 2,
    label: "Join Our Group",
    icon: <FiUsers />,
    type: "external",
    href: "https://chat.whatsapp.com/CGDC2OrmgEZDTKhP1VsXbl",
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    id: 3,
    label: "Deposit History",
    icon: <FiClock />,
    type: "internal",
    href: "/deposit-transactions",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    id: 4,
    label: "Withdraw History",
    icon: <FiRepeat />,
    type: "internal",
    href: "/withdraw-history",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    id: 5,
    label: "Transaction History",
    icon: <FiRepeat />,
    type: "internal",
    href: "/transactions",
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: 6,
    label: "My Team",
    icon: <FiUserCheck />,
    type: "internal",
    href: "/my-team",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    id: 7,
    label: "App Download",
    icon: <FiDownload />,
    type: "download",
    href: "/app/gulftrading.apk", // or PWA/store link
    color: "bg-gray-800 hover:bg-gray-900",
  },
  {
    id: 8,
    label: "Admin WhatsApp",
    icon: <FaWhatsapp />,
    type: "external",
    href: "https://api.whatsapp.com/send/?phone=923370620738&text=hi",
    color: "bg-green-500 hover:bg-green-600",
  },
];

export default function QuickActionsCard() {
  return (
    <Card className="max-w-md mx-auto w-[95%]">
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const button = (
              <Button
                className={`w-full h-16 flex flex-col items-center justify-center gap-2 text-white ${action.color}`}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            );

            // INTERNAL (Next.js pages)
            if (action.type === "internal") {
              return (
                <Link key={action.id} href={action.href}>
                  {button}
                </Link>
              );
            }

            // EXTERNAL (WhatsApp, Telegram, etc.)
            if (action.type === "external") {
              return (
                <a
                  key={action.id}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {button}
                </a>
              );
            }

            // APP DOWNLOAD
            if (action.type === "download") {
              return (
                <a key={action.id} href={action.href} download>
                  {button}
                </a>
              );
            }

            return null;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
