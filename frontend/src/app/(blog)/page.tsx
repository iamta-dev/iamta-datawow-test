// app/page.js
"use client";
import React, { useState } from "react";
import { Search, Menu, ArrowRight, Plus, MessageCircle } from "lucide-react"; // เพิ่มไอคอนจาก lucide-react

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // สำหรับ mobile menu toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // สำหรับ desktop sidebar toggle
  const [isSearchActive, setIsSearchActive] = useState(false); // สำหรับ search toggle
  const [searchQuery, setSearchQuery] = useState(""); // สำหรับเก็บข้อความค้นหา

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample posts data
  const posts = [
    {
      id: 1,
      author: "Wittawat",
      category: "History",
      title: "The Beginning of the End of the World",
      description:
        "Chuck Norris does not own a stove, oven, or microwave , because revenge is a dish best served cold. Chuck Norris has a mug of nails instead of coffee in the morning. Chuck Norris is the reason why Waldo is hiding. Mission Impossible was originally set in Chuck Norris’s house. If Chuck Norris were to travel to an alternate dimension in which there was another Chuck Norris and they both fought, they would both win.",
      comments: 32,
    },
    {
      id: 2,
      author: "Zach",
      category: "History",
      title: "The Big Short War",
      description:
        "Chuck Norris makes onions cry. When Christopher Columbus discovered America, he was greeted by Chuck Norris. Chuck Norris plays Jenga with Stonehenge. Chuck Norris has never blinked in his entire life. Never. When Chuck Norris gives you the finger, he’s telling you how many seconds you have left to live.",
      comments: 4,
    },
    {
      id: 3,
      author: "Nicholas",
      category: "Exercise",
      title: "The Mental Health Benefits of Exercise",
      description:
        "You already know that exercise is good for your body But this is also a long description and needs to be truncated after two lines.",
      comments: 32,
    },
    {
      id: 4,
      author: "Carl",
      category: "History",
      title: "What Makes a Man Betray His Country?",
      description:
        "The life of Adolf Tolkachev, Soviet dissident and CIA spy This too is a long description that should be truncated with an ellipsis.",
      comments: 12,
    },
  ];

  // Function to handle search and highlight matching text
  const handleSearch = (postTitle: string) => {
    if (!searchQuery) return postTitle; // If no search, return the title as is

    // Create a RegExp for the search query (case insensitive)
    const regex = new RegExp(`(${searchQuery})`, "gi");

    // Replace matched parts with highlighted <span> element
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
    <div className="relative min-h-screen bg-gray-100">
      {/* Header (Fixed at the top) */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-green-800 p-4 text-white md:px-6">
        <div className="flex items-center">
          {/* Button Menu สำหรับ Desktop */}
          <button className="mr-4 hidden md:block" onClick={toggleSidebar}>
            <Menu />
            {/* ไอคอนแสดง/ซ่อน Sidebar */}
          </button>
          <div className="text-xl font-bold">a Board</div>
        </div>
        <div className="md:hidden">
          {/* Mobile Menu Icon */}
          <button className="text-white" onClick={toggleMenu}>
            <Menu />
          </button>
        </div>
        <div className="hidden md:block">
          {/* Desktop Sign In Button */}
          <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            Sign In
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className={`fixed top-16 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"} left-0 right-0 z-30 bg-white shadow-md`}
      >
        <div className="flex items-center p-4">
          <div className="hidden flex-grow items-center space-x-4 md:flex">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow rounded-md border border-gray-300 p-2 focus:outline-none focus:ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            <select className="rounded-md border border-gray-300 p-2">
              <option>Community</option>
              <option>General</option>
              <option>Technology</option>
              <option>Health</option>
            </select>
            <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              <Plus />
            </button>
          </div>

          {!isSearchActive && (
            <div className="flex w-full items-center justify-between md:hidden">
              <button onClick={toggleSearch}>
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

          {isSearchActive && (
            <div className="flex w-full items-center justify-between md:hidden">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow rounded-md border border-gray-300 p-2 focus:outline-none focus:ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={toggleSearch} className="ml-2">
                <ArrowRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for Mobile - sliding from right */}
      <div
        className={`fixed right-0 top-0 z-30 h-full w-64 transform bg-green-800 text-white transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-6 text-xl font-bold">
          a Board
          <button className="text-white" onClick={toggleMenu}>
            <ArrowRight />
          </button>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">🏠</span> Home
            </li>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">📝</span> Our Blog
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed bottom-0 top-0 z-20 w-64 bg-green-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block`}
      >
        <div className="p-6 text-xl font-bold">a Board</div>
        <nav className="flex-grow">
          <ul>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">🏠</span> Home
            </li>
            <li className="flex items-center p-4 hover:bg-green-700">
              <span className="mr-2">📝</span> Our Blog
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content (Scrollable) */}
      <div
        className={`h-[calc(100vh-4rem)] overflow-auto pt-32 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`} // Toggle ml-64 เมื่อ sidebar เปิด
      >
        <section className="space-y-6 p-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-md bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2">
                    {/* Avatar Placeholder */}
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div>
                    <div className="font-bold">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.category}</div>
                  </div>
                </div>
              </div>
              <h2
                className="text-lg font-bold"
                dangerouslySetInnerHTML={{ __html: handleSearch(post.title) }} // Render title with highlights
              ></h2>
              <p className="line-clamp-2 text-gray-700">{post.description}</p>

              {/* Total Comments Section */}
              <div className="mt-6 flex items-center text-gray-500">
                <MessageCircle className="mr-2 h-5 w-5" />
                <div>{post.comments} Comments</div>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Overlay for mobile when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}
