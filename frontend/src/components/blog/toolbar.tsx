"use client";

import { Plus, Search, ArrowRight } from "lucide-react";

interface ToolbarProps {
  isSidebarOpen: boolean; // Sidebar state
  isSearchActive: boolean; // Search bar state for mobile
  searchQuery: string; // The current search query
  setSearchQuery: (query: string) => void; // Function to update search query
  setIsSearchActive: (isActive: boolean) => void; // Function to toggle search bar
}

export default function Toolbar({
  isSidebarOpen,
  isSearchActive,
  searchQuery,
  setSearchQuery,
  setIsSearchActive,
}: ToolbarProps) {
  return (
    <div
      className={`fixed left-0 right-0 top-16 z-10 bg-white shadow-md transition-all ${
        isSidebarOpen ? "md:ml-64" : "md:ml-0"
      }`}
    >
      <div className="flex items-center p-4">
        {/* Mobile View - controlled by isSearchActive */}
        <div className="block w-full md:hidden">
          {isSearchActive ? (
            <div className="flex w-full items-center justify-between">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow rounded-md border border-gray-300 p-2 focus:outline-none focus:ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearchActive(false)} className="ml-2">
                <ArrowRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between">
              <button onClick={() => setIsSearchActive(true)}>
                <Search className="h-6 w-6 text-gray-600" />
              </button>
              <select className="ml-2 rounded-md border border-gray-300 p-2">
                <option>Community</option>
              </select>
              <button className="ml-2 rounded bg-green-500 px-4 py-2 text-white">
                <Plus className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop View - always shows input, select, and Plus button */}
        <div className="hidden w-full items-center justify-between md:flex">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow rounded-md border border-gray-300 p-2 focus:outline-none focus:ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="ml-4 flex items-center space-x-4">
            <select className="rounded-md border border-gray-300 p-2">
              <option>Community</option>
            </select>
            <button className="rounded bg-green-500 px-4 py-2 text-white">
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
