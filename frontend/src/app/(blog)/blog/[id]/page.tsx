"use client";

import { useSidebarState } from "@/hooks/use-sidebar";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateCommentFormDialog } from "./_components/create-comment-form-dialog";
import { CreateCommentForm } from "./_components/create-comment-form";
import { Button } from "@/components/ui/button";

export default function BlogIdPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { isSidebarOpen, toggleSidebar } = useSidebarState(); // Get the sidebar state (true/false)

  const [isMenuOpen, setIsMenuOpen] = useState(false); // สำหรับ mobile menu toggle
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false); // For desktop comment form toggle
  const [isModalOpen, setIsModalOpen] = useState(false); // For mobile modal toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const post = {
    id: 1,
    author: "Wittawat",
    category: "History",
    title: "The Beginning of the End of the World",
    description:
      "The afterlife sitcom The Good Place comes to its culmination...",
    comments: 32,
  };

  // Function to toggle the form for desktop
  const showCommentForm = () => {
    setIsCommentFormVisible(true);
  };

  const hideCommentForm = () => {
    setIsCommentFormVisible(false);
  };

  // Function to toggle the modal for mobile
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        {/* Post Section */}
        <article key={post.id} className="rounded-md bg-white p-6 shadow-md">
          {/* Author Info */}
          <div className="mb-4 flex items-center">
            <div className="mr-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-lg font-bold">{post.author}</span>
                <span className="ml-2 text-sm text-gray-500">5mo. ago</span>
              </div>
              <div className="text-sm text-gray-500">{post.category}</div>
            </div>
          </div>

          {/* Post Content */}
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="mt-4 text-gray-700">{post.description}</p>

          {/* Total Comments Section */}
          <div className="mt-6 flex items-center text-gray-500">
            <MessageCircle className="mr-2 h-5 w-5" />
            <div>{post.comments} Comments</div>
          </div>

          {/* Add Comments Button (Only show if form is not visible on Desktop) */}
          {!isCommentFormVisible && (
            <div className="mt-6">
              {/* Desktop button */}
              <div className="hidden md:block">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setIsCommentFormVisible(true);
                  }}
                >
                  Add Comment
                </Button>
              </div>

              {/* Mobile button (shows modal) */}
              <div className="md:hidden">
                <CreateCommentFormDialog />
              </div>
            </div>
          )}

          {/* Desktop Comment Form */}
          {isCommentFormVisible && (
            // <div className="mt-6">
            //   <textarea
            //     className="mb-4 w-full rounded border border-gray-300 p-2"
            //     placeholder="Write your comment..."
            //   />
            //   <div className="flex space-x-4">
            //     <button
            //       className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            //       onClick={hideCommentForm}
            //     >
            //       Cancel
            //     </button>
            //     <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            //       Post
            //     </button>
            //   </div>
            // </div>

            <CreateCommentForm hideCommentForm={hideCommentForm} />
          )}

          {/* Comments */}
          <div className="mt-8 p-6">
            {[
              {
                author: "Wittawat98",
                timeAgo: "12h ago",
                content: "Lorem ipsum dolor sit amet consectetur.",
              },
              {
                author: "Hawaii51",
                timeAgo: "1mo. ago",
                content: "Lorem ipsum dolor sit amet consectetur.",
              },
              {
                author: "Helo_re",
                timeAgo: "3mo. ago",
                content: "Lorem ipsum dolor sit amet consectetur.",
              },
            ].map((comment, idx) => (
              <div key={idx} className="mb-4 flex items-start">
                <div className="mr-4">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">{comment.author}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Modal for Mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-lg rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Add Comments</h3>
            <textarea
              className="mb-4 w-full rounded border border-gray-300 p-2"
              placeholder="Write your comment..."
            />
            <div className="flex justify-end space-x-4">
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
