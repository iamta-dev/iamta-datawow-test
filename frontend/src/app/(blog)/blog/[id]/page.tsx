"use client";

import { useSidebarState } from "@/components/blog/useSidebarState";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogIdPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { isSidebarOpen } = useSidebarState(); // Get the sidebar state (true/false)

  return (
    <div>
      {/* Toolbar (Fixed below the Header) */}
      <div
        className={`fixed top-16 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"} left-0 right-0 z-30 bg-white`}
      >
        <div className="flex items-center justify-start p-4">
          {/* Back Button Icon */}
          <button
            aria-label="Go back"
            onClick={() => router.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 hover:bg-green-500"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section
        className={`space-y-6 p-6 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <div>My Post: {params.id}</div>
      </section>
    </div>
  );
}
