'use client';

import React, { useState } from "react";
import { Plus, Search, ArrowRight } from "lucide-react";
import PostCard from "@/components/blog/post-card";
import { useSidebarState } from "@/components/blog/useSidebarState"; // Assuming we store sidebar state globally

export default function HomePage() {
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

  // Function to handle search and highlight matching text
  const handleSearch = (postTitle: string, searchQuery: string): string => {
    if (!searchQuery) return postTitle; // If no search query, return the original title

    // Regular expression to match the search query (case insensitive)
    const regex = new RegExp(`(${searchQuery})`, "gi");

    // Replace matched query with highlighted text
    return postTitle.replace(
      regex,
      (match) => `<span class="bg-yellow-300">${match}</span>`,
    );
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* Toolbar (Fixed below the Header, specific to this page) */}
      <div
        className={`fixed left-0 right-0 top-16 z-10 bg-white shadow-md transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <div className="flex items-center p-4">
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
      </div>

      {/* Main Content */}
      <section
        className={`space-y-6 p-6 pt-32 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} handleSearch={handleSearch} />
        ))}
      </section>
    </div>
  );
}
