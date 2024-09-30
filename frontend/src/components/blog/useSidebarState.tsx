"use client";

import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

// Define the type for the sidebar context
interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the sidebar context with a default value of `null`
const SidebarContext = createContext<SidebarContextProps | null>(null);

// Create a provider component with children as props
export function SidebarProvider({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Default to sidebar open

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebarState() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarState must be used within a SidebarProvider");
  }
  return context;
}
