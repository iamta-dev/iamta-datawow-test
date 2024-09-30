import { ArrowRight } from "lucide-react";
import { useSidebarState } from "@/components/blog/useSidebarState";
import React from "react";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarState(); // Access sidebar state and toggle function

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 z-30 h-full w-64 transform bg-green-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-6 text-xl font-bold">
          a Board
          <button className="text-white" onClick={toggleSidebar}>
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed bottom-0 top-0 z-20 w-64 bg-green-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block`}
      >
        <div className="p-6 text-xl font-bold">a Board</div>
      </aside>
    </>
  );
}
