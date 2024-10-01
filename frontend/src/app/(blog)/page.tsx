"use client";

import React, { useEffect, useState, useTransition } from "react";
import Toolbar from "@/components/layout/toolbar"; // Import the Toolbar component
import { useSidebarState } from "@/hooks/use-sidebar"; // Assuming we store sidebar state globally
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service.interface";
import { getPostsAction } from "../../actions/post.action";
import { toast } from "sonner";
import PostCard from "@/components/blog/post-card";

export default function BlogPage() {
  const [isPending, startTransition] = useTransition();

  const [searchQueryParams, setSearchQueryParams] = useState<PostParamsDto>({
    fsearch: undefined,
    communityId: undefined,
  });

  const [postList, setPostList] = useState<Post[]>([]);

  const fetchData = async (p: PostParamsDto) => {
    const resp = await getPostsAction(p);
    if (resp?.result) {
      setPostList(resp.result);
    }

    if (resp?.status == "error") {
      toast.error(resp.message);
    }
  };

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false); // For toggling search bar
  const { isSidebarOpen } = useSidebarState(); // Get the sidebar state (true/false)

  useEffect(() => {
    const isSearch =
      !searchQueryParams.fsearch || searchQueryParams.fsearch.length > 1;
    if (isSearch) {
      startTransition(async () => {
        await fetchData(searchQueryParams);
      });
    }
  }, [searchQueryParams]);

  return (
    <div>
      {/* Toolbar Component */}
      <Toolbar
        onFetchPostsData={() => {
          startTransition(async () => {
            await fetchData(searchQueryParams);
          });
        }}
        isSidebarOpen={isSidebarOpen}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        searchQueryParams={searchQueryParams}
        setSearchQueryParams={setSearchQueryParams}
      />

      {/* Main Content */}
      <section
        className={`space-y-6 p-6 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {postList.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            searchQuery={searchQueryParams.fsearch ?? ""}
          />
        ))}
      </section>
    </div>
  );
}
