// app/layout.tsx
"use client";
import Header from "@/components/blog/header";
import Sidebar from "@/components/blog/sidebar";
import React from "react";
import { SidebarProvider } from "@/components/blog/useSidebarState"; // Import SidebarProvider

interface LayoutProps {
  children: React.ReactNode; // The content of the page will be passed as children
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen bg-gray-100">
        {/* Header Component */}
        <Header />

        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div className="h-[calc(100vh-4rem)] overflow-auto pt-32 transition-all">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
