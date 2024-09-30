"use client";

import { Plus, Search, ArrowRight } from "lucide-react";
import { InputWithIcon } from "../ui/input-with-icon";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

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
              <InputWithIcon
                icon={Search}
                type="text"
                placeholder="Search"
                className="flex-grow rounded-md border border-gray-300 focus:outline-none focus:ring"
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
              <Select name={"communityId"}>
                <SelectTrigger className="flex items-center justify-center border-none border-primary text-black">
                  <SelectValue placeholder="Community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="community1">Community 1</SelectItem>
                    <SelectItem value="community2">Community 2</SelectItem>
                    <SelectItem value="community3">Community 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button>
                <span>Create</span> <Plus className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Desktop View - always shows input, select, and Plus button */}
        <div className="hidden w-full items-center justify-between md:flex">
          <InputWithIcon
            icon={Search}
            type="text"
            placeholder="Search"
            className="flex-grow rounded-md border border-gray-300 focus:outline-none focus:ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="ml-4 flex items-center space-x-4">
            <Select name={"communityId"}>
              <SelectTrigger className="flex items-center justify-center border-none border-primary text-black">
                <SelectValue placeholder="Community" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectItem value="community1">Community 1</SelectItem>
                  <SelectItem value="community2">Community 2</SelectItem>
                  <SelectItem value="community3">Community 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button>
              <span>Create</span> <Plus className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
