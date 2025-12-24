"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import TradingImg from "../../assets/trading.jpeg";
import { logout } from "@/lib/actions/auth";

import {
  FiHome,
  FiCreditCard,
  FiGrid,
  FiRepeat,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const protectedLinks = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
  { id: 2, name: "Deposit", href: "/deposit", icon: <FiCreditCard /> },
  { id: 3, name: "My Plans", href: "/invest-history", icon: <FiGrid /> },
  {
    id: 4,
    name: "Deposit Transactions",
    href: "/fund-history",
    icon: <FiRepeat />,
  },
  {
    id: 5,
    name: "All Transactions",
    href: "/transaction",
    icon: <FiDollarSign />,
  },
  { id: 6, name: "Withdraw", href: "/withdraw", icon: <FiCreditCard /> },
  {
    id: 7,
    name: "Withdraw History",
    href: "/payout-history",
    icon: <FiRepeat />,
  },
  {
    id: 8,
    name: "Invite Referral",
    href: "/referral",
    icon: <FiUsers />,
  },
  { id: 9, name: "Settings", href: "/profile", icon: <FiSettings /> },
  {
    id: 10,
    name: "Referral Bonus Transaction",
    href: "/referral-bonus",
    icon: <FiDollarSign />,
  },
];

export default function ProtectedNavbar() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const logoutHandler = () => {
    startTransition(async () => {
      await logout();
      router.push("/login"); // redirect after logout
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/dashboard">
          <div className="flex items-center gap-3">
            <Image
              src={TradingImg}
              alt="Trading Logo"
              width={40}
              height={40}
              className="rounded-md w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-lg md:text-xl font-bold uppercase tracking-wide">
              Gulf Trading
            </h1>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Dashboard Button (Desktop Only) */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
                 bg-green-600 text-white hover:bg-green-700 transition
                 text-sm font-medium"
          >
            <FiHome className="text-lg" />
            Dashboard
          </Link>

          {/* Menu Button (All Screens) */}
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <nav
        className={`absolute left-0 top-full w-full bg-white shadow-xl border-t transition-all duration-300
  ${
    open
      ? "max-h-[80vh] opacity-100 overflow-y-auto"
      : "max-h-0 opacity-0 overflow-hidden"
  }`}
      >
        <ul className="flex flex-col gap-4 py-3">
          {protectedLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-6 py-3 text-base font-medium
          hover:bg-green-50 hover:text-green-600 transition rounded-lg mx-4"
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
          <li
            className="mx-4 rounded-lg hover:bg-green-50 hover:text-green-600 transition"
            key="11"
          >
            <button
              onClick={logoutHandler}
              disabled={isPending}
              className="flex w-full items-center gap-3 px-6 py-3 text-base font-medium text-left cursor-pointer"
            >
              <span className="text-xl">
                <FiLogOut />
              </span>
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
