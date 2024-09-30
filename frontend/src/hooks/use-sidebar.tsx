"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Default to sidebar open

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Check screen size on mount and set the sidebar state accordingly
    const handleResize = () => {
      if (window.innerWidth < 900) {
        // For tablet and mobile screens default to sidebar closed
        setIsSidebarOpen(false);
      } else {
        // For non-tablet screens, default to sidebar open
        setIsSidebarOpen(true);
      }
    };

    // Set sidebar state based on the initial window width
    handleResize();

    // Add a resize event listener to update sidebar state when window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
