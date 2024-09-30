import { ArrowRight } from "lucide-react";
import { useSidebarState } from "@/components/blog/useSidebarState";
import React from "react";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarState(); // Access sidebar state and toggle function

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
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                📝 Our Blog
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                👤 Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed bottom-0 top-16 z-30 w-64 bg-green-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block`}
      >
        {/* Adjusted the top position to account for the header */}
        <nav className="flex-grow">
          <ul className="space-y-4 p-4">
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                📝 Our Blog
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md p-2 hover:bg-green-700">
                👤 Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
