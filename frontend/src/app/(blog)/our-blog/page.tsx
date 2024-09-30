"use client";

import React, { useEffect, useState, useTransition } from "react";
import Toolbar from "@/components/blog-layout/toolbar"; // Import the Toolbar component
import { useSidebarState } from "@/hooks/use-sidebar"; // Assuming we store sidebar state globally
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service";
import { toast } from "sonner";
import PostCard from "@/components/blog/post-card";
import { getOwnerPostsAction } from "@/actions/post.action";

export default function OurBlogPage() {
  const [isPending, startTransition] = useTransition();

  const [searchQueryParams, setSearchQueryParams] = useState<PostParamsDto>({
    fsearch: undefined,
    communityId: undefined,
  });

  const [postList, setPostList] = useState<Post[]>([]);

  const fetchData = async (p: PostParamsDto) => {
    const resp = await getOwnerPostsAction(p);
    if (resp?.result) {
      setPostList(resp.result);
    }

    if (resp?.status == "error") {
      toast.error(resp.message);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>(""); // For handling search input
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false); // For toggling search bar
  const { isSidebarOpen } = useSidebarState(); // Get the sidebar state (true/false)

  useEffect(() => {
    startTransition(async () => {
      await fetchData(searchQueryParams);
    });
  }, [searchQueryParams]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setSearchQueryParams({
        ...searchQueryParams,
        fsearch: searchQuery,
      });
    } else {
      setSearchQueryParams({
        ...searchQueryParams,
        fsearch: undefined,
      });
    }
  }, [searchQuery]);

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
        {postList.map((post) => (
          <PostCard key={post.id} post={post} searchQuery={searchQuery} />
        ))}
      </section>
    </div>
  );
}
