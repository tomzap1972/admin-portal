"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/users": "User Management",
  "/content": "Content Management",
  "/config": "App Configuration",
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin Portal";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
      </div>
    </header>
  );
}
