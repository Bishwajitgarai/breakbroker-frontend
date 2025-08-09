// components/Layout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LogOut, User } from "lucide-react";
import { TokenRefresher } from "./refreshToken";
import { logout } from "@/features/user/userSlice";
import { AppDispatch } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      <TokenRefresher />
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        {/* Logo / Title */}
        <div className="text-2xl font-bold text-blue-700 select-none cursor-default">
          BreakBroker
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Account Icon */}
          <button
            type="button"
            aria-label="Account"
            title="Account"
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={() => router.push("/profile")}
          >
            <User size={24} />
          </button>

          {/* Logout Icon */}
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 transition"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-6">
        {children}
      </main>
    </>
  );
}
