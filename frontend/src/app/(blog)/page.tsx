"use client";

import React, { useState } from "react";
import PostCard from "@/components/blog/post-card";
import Toolbar from "@/components/blog/toolbar"; // Import the Toolbar component
import { useSidebarState } from "@/components/blog/useSidebarState"; // Assuming we store sidebar state globally

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // For handling search input
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false); // For toggling search bar
  const { isSidebarOpen } = useSidebarState(); // Get the sidebar state (true/false)

  // Sample posts data
  const posts = [
    {
      id: 1,
      author: "Wittawat",
      category: "History",
      title: "The Beginning of the End of the World",
      description:
        "Chuck Norris does not own a stove, oven, or microwave, because revenge is a dish best served cold.",
      comments: 32,
    },
    // Other sample posts...
  ];

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* Toolbar Component */}
      <Toolbar
        isSidebarOpen={isSidebarOpen}
        isSearchActive={isSearchActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsSearchActive={setIsSearchActive}
      />

      {/* Main Content */}
      <section
        className={`space-y-6 p-6 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} searchQuery={searchQuery} />
        ))}
      </section>
    </div>
  );
}
