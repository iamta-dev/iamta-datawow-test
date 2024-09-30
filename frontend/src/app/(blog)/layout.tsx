// app/layout.tsx
"use client";
import Header from "@/components/blog/header";
import Sidebar from "@/components/blog/sidebar";
import React, { useState, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // The content of the page will be passed as children
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // For controlling mobile menu
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // For controlling desktop sidebar

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle sidebar visibility (for desktop)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header Component */}
      <Header toggleSidebar={toggleSidebar} toggleMenu={toggleMenu} />

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content (children will be replaced by the specific page content) */}
      <div
        className={`h-[calc(100vh-4rem)] overflow-auto pt-32 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {children}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}
