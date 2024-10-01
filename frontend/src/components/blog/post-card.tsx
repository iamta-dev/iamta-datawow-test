"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { DeletePostForm } from "./delete-post-form";
import { EditPostForm } from "./edit-post-form";
import { useRouter } from "next/navigation";
import { type Post } from "@/interfaces/services/post.service.interface";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  onFetchPostsData: () => void;
  post: Post; // Post object passed to the component
  searchQuery: string;
}

export default function PostCard({
  onFetchPostsData,
  post,
  searchQuery,
}: PostCardProps) {
  const router = useRouter();

  // Function to handle search and highlight matching text
  const handleSearch = (postTitle: string, searchQuery: string): string => {
    if (!searchQuery || searchQuery.length < 2) return postTitle; // If no search query, return the original title

    // Regular expression to match the search query (case insensitive)
    const regex = new RegExp(`(${searchQuery})`, "gi");

    // Replace matched query with highlighted text
    return postTitle.replace(
      regex,
      (match) => `<span class="bg-yellow-300">${match}</span>`,
    );
  };

  return (
    <article
      key={post.id}
      className="relative rounded-md bg-white p-4 shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center justify-start gap-2">
            {/* Avatar Placeholder */}
            <Avatar>
              <AvatarImage src={post.user?.pictureUrl} alt="Post Profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="cursor-text font-semibold text-grey-300">
              {post.user?.fullName}
            </div>
          </div>
          <Badge variant={"grey"}>{post.community?.name}</Badge>
        </div>

        {/* Edit and Trash Icons */}
        <div
          className="absolute right-2 top-2 space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <EditPostForm
            postId={post.id}
            initialData={post}
            onFetchPostsData={onFetchPostsData}
          />
          <DeletePostForm
            postId={post.id}
            initialData={post}
            onFetchPostsData={onFetchPostsData}
          />
        </div>
      </div>
      {/* Post title with search highlighting */}
      <h2
        className="cursor-pointer text-lg font-semibold"
        onClick={() => router.push(`/blog/${post.id}`)}
        dangerouslySetInnerHTML={{
          __html: handleSearch(post.title, searchQuery),
        }}
      ></h2>
      <p
        className="line-clamp-2 cursor-pointer text-gray-700"
        onClick={() => router.push(`/blog/${post.id}`)}
      >
        {post.detail}
      </p>

      {/* Comments section */}
      <div
        className="mt-6 flex cursor-pointer items-center text-gray-500"
        onClick={() => router.push(`/blog/${post.id}`)}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        <div>{post.comments?.length ?? 0} Comments</div>
      </div>
    </article>
  );
}
