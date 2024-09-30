// app/components/Sidebar.tsx
import { ArrowRight } from "lucide-react";
import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean; // Determines if the sidebar is open or closed
  toggleSidebar: () => void; // Function to toggle the sidebar state
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
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
        <nav className="flex-grow">
          <ul>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">🏠</span> Home
            </li>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">📝</span> Our Blog
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed bottom-0 top-0 z-20 w-64 bg-green-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block`}
      >
        <div className="p-6 text-xl font-bold">a Board</div>
        <nav className="flex-grow">
          <ul>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">🏠</span> Home
            </li>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">📝</span> Our Blog
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
