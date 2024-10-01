"use client";

import React, { startTransition, useEffect, useState } from "react";
import Toolbar from "@/components/layout/toolbar"; // Import the Toolbar component
import { useSidebarState } from "@/hooks/use-sidebar"; // Assuming we store sidebar state globally
import {
  type PostParamsDto,
  type Post,
} from "@/interfaces/services/post.service.interface";
import { toast } from "sonner";
import PostCard from "@/components/blog/post-card";
import { getMyPostsAction } from "@/actions/post.action";
import { cn } from "@/lib/utils";

export default function OurBlogPage() {
  const [searchQueryParams, setSearchQueryParams] = useState<PostParamsDto>({
    fsearch: undefined,
    communityId: undefined,
  });

  const [postList, setPostList] = useState<Post[]>([]);

  const fetchData = async (p: PostParamsDto) => {
    const resp = await getMyPostsAction(p);
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
        className={cn(
          `min-h-screen bg-grey-100 p-6 transition-all`,
          isSidebarOpen ? "md:ml-64" : "md:ml-0",
        )}
      >
        {postList.length > 0 &&
          postList.map((post, index) => (
            <PostCard
              className={
                index == 0
                  ? "rounded-t-md"
                  : postList.length - 1 == index
                    ? "rounded-b-md"
                    : "border-b border-t border-grey-100"
              }
              post={post}
              searchQuery={searchQueryParams.fsearch ?? ""}
              onFetchPostsData={() => {
                startTransition(async () => {
                  await fetchData(searchQueryParams);
                });
              }}
            />
          ))}
      </section>
    </div>
  );
}
