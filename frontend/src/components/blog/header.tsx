"use client";

import { Menu } from "lucide-react";
import { useSidebarState } from "@/components/blog/useSidebarState";
import { useEffect, useState } from "react";
import { type UserJwtPayload } from "@/lib/user-jwt";
import { getProfileAction } from "@/app/_action/profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteSession } from "@/lib/session";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const { toggleSidebar } = useSidebarState(); // Access sidebar state and toggle function
  const [profile, setProfile] = useState<UserJwtPayload | null>(null);
  useEffect(() => {
    void getProfileAction().then((res) => {
      setProfile(res);
    });
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between bg-green-800 p-4 text-white md:px-6">
      <div className="flex items-center">
        {/* Desktop Menu Button */}
        <button className="mr-4 hidden md:block" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className="text-xl font-bold">a Board</div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-white" onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      <div className="hidden md:block">
        {/* Desktop Sign In Button */}
        {profile ? (
          <div
            onClick={() => {
              void deleteSession();
            }}
            className="flex cursor-pointer flex-row items-center justify-center gap-2"
          >
            <label htmlFor="Profile Name" className="text-white">
              {profile.username}
            </label>
            <Avatar className={"h-10 w-10"}>
              <AvatarImage src={profile.pictureUrl} alt={profile.fullName} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
        )}
      </div>
    </header>
  );
}
