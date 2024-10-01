"use client";

import { ArrowRight, Home, FileText, SquarePen } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar";
import React from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link"; // Import Link from Next.js

// Define the menu as an object with path, label, and icon
const menuItems = [
  {
    path: "/",
    label: "Home",
    icon: <Home className="mr-2 inline-block h-5 w-5" />,
  },
  {
    path: "/our-blog",
    label: "Our Blog",
    icon: <SquarePen className="mr-2 inline-block h-5 w-5" />,
  },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarState(); // Access sidebar state and toggle function
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden" // Dark overlay for mobile sidebar
          onClick={toggleSidebar} // Close sidebar when clicking outside
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-green-500 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-start justify-start p-6 text-xl font-bold">
          <button className="text-white" onClick={toggleSidebar}>
            <ArrowRight />
          </button>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4 p-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={twMerge(
                    "block rounded-md p-2 hover:bg-green-300 text-gray-400",
                    pathname === item.path && "font-bold text-white",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed bottom-0 top-16 z-30 w-64 bg-grey-100 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block`}
      >
        <nav className="flex-grow">
          <ul className="space-y-4 p-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={twMerge(
                    "block rounded-md p-2 hover:bg-green-100 text-green-500",
                    pathname === item.path && "font-bold",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
