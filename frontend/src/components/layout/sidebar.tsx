"use client";

import { ArrowRight, Home, SquarePen } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link"; // Import Link from Next.js
import { type UserJwtPayload } from "@/lib/user-jwt";
import { getProfileAction } from "@/actions/profile.action";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { deleteSession } from "@/actions/session.action";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const router = useRouter();
  const pathname = usePathname();

  const { isSidebarOpen, toggleSidebar } = useSidebarState(); // Access sidebar state and toggle function

  const [profile, setProfile] = useState<UserJwtPayload | null>(null);
  useEffect(() => {
    void getProfileAction().then((res) => {
      setProfile(res);
    });
  }, []);

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
        className={cn(
          `fixed right-0 top-0 z-50 h-full w-64 transform bg-green-500 text-white transition-transform md:hidden`,
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6 text-xl font-bold">
          <button className="text-white" onClick={toggleSidebar}>
            <ArrowRight />
          </button>

          <div>
            {/* Mobile Sign In Button */}
            {profile ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => {
                        void deleteSession();
                      }}
                      className="flex cursor-pointer flex-row items-center justify-center gap-2"
                    >
                      <label
                        htmlFor="Profile Name"
                        className="font-medium text-white"
                      >
                        {profile.fullName}
                      </label>
                      <Avatar className={"h-10 w-10"}>
                        <AvatarImage
                          src={profile.pictureUrl}
                          alt={profile.fullName}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>click logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                onClick={() => router.push("/auth/login")}
                className="font-semibold"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4 p-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={twMerge(
                    "block rounded-md p-2 text-gray-400 hover:bg-green-300",
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
                    "block rounded-md p-2 text-green-500 hover:bg-green-100",
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
