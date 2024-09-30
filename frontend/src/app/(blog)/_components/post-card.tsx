"use client";

import { MessageCircle } from "lucide-react";
import { DeletePostForm } from "./delete-post-form";
import { EditPostForm } from "./edit-post-form";
import { useRouter } from "next/navigation";
import { type Post as PostModel } from "@/interfaces/services/post";

interface PostCardProps {
  post: PostModel; // Post object passed to the component
  searchQuery: string;
}

export default function PostCard({ post, searchQuery }: PostCardProps) {
  const router = useRouter();

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

  return (
    <article
      key={post.id}
      className="relative rounded-md bg-white p-4 shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2">
            {/* Avatar Placeholder */}
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div>
            <div className="cursor-text font-bold">{post.user?.fullName}</div>
            <div className="cursor-text text-sm text-gray-500">
              {post.community?.name}
            </div>
          </div>
        </div>

        {/* Edit and Trash Icons */}
        <div
          className="absolute right-2 top-2 space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <EditPostForm />
          <DeletePostForm />
        </div>
      </div>
      {/* Post title with search highlighting */}
      <h2
        className="cursor-pointer text-lg font-bold"
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
