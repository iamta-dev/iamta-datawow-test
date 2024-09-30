"use client";

import { ArrowRight, Home, FileText } from "lucide-react";
import { useSidebarState } from "@/components/blog/useSidebarState";
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
    icon: <FileText className="mr-2 inline-block h-5 w-5" />,
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
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-green-800 text-white transition-transform ${
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
                    "block rounded-md p-2 hover:bg-green-400", // Change hover color to bg-green-400
                    pathname === item.path && "bg-green-400 hover:bg-green-400", // Active menu style
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
        className={`fixed bottom-0 top-16 z-30 w-64 bg-green-800 text-white transition-transform ${
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
                    "block rounded-md p-2 hover:bg-green-400", // Change hover color to bg-green-400
                    pathname === item.path && "bg-green-400 hover:bg-green-400", // Active menu style
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
