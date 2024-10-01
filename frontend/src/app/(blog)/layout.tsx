import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import React, { type PropsWithChildren } from "react";
import { SidebarProvider } from "@/hooks/use-sidebar"; // Import SidebarProvider

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        {/* Header Component */}
        <Header />

        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div className="h-[calc(100vh)] overflow-auto pt-32 transition-all bg-white">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
