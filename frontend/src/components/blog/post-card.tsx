import { MessageCircle } from "lucide-react";

interface Post {
  id: number;
  author: string;
  category: string;
  title: string;
  description: string;
  comments: number;
}

interface PostCardProps {
  post: Post; // Post object passed to the component
  searchQuery: string;
}

export default function PostCard({ post, searchQuery }: PostCardProps) {
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
    <article key={post.id} className="rounded-md bg-white p-4 shadow-md">
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
      {/* Post title with search highlighting */}
      <h2
        className="text-lg font-bold"
        dangerouslySetInnerHTML={{
          __html: handleSearch(post.title, searchQuery),
        }}
      ></h2>
      <p className="line-clamp-2 text-gray-700">{post.description}</p>

      {/* Comments section */}
      <div className="mt-6 flex items-center text-gray-500">
        <MessageCircle className="mr-2 h-5 w-5" />
        <div>{post.comments} Comments</div>
      </div>
    </article>
  );
}
