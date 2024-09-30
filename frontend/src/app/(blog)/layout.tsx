import Header from "@/components/blog-layout/header";
import Sidebar from "@/components/blog-layout/sidebar";
import React, { type PropsWithChildren } from "react";
import { SidebarProvider } from "@/hooks/use-sidebar"; // Import SidebarProvider

export default function Layout({ children }: PropsWithChildren) {
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
