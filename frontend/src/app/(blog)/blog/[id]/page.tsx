"use client";

import { useSidebarState } from "@/hooks/use-sidebar";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { CreateCommentFormDialog } from "../../../../components/blog/blog-detail/create-comment-form-dialog";
import { CreateCommentForm } from "../../../../components/blog/blog-detail/create-comment-form";
import { Button } from "@/components/ui/button";
import { type Post } from "@/interfaces/services/post.service.interface";
import { getPostByIdAction } from "../../../../actions/post.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";
import { formatTimeAgo } from "@/lib/date-format";
import { DeleteCommentFormDialog } from "@/components/blog/blog-detail/delete-comment-form-dialog";
import { UserJwtPayload } from "@/lib/user-jwt";
import { getProfileAction } from "@/actions/profile.action";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [profile, setProfile] = useState<UserJwtPayload | null>(null);
  const [post, setPost] = useState<Post | undefined>(undefined);

  const fetchData = async (id: number) => {
    const resp = await getPostByIdAction(id);
    if (resp?.result) {
      setPost(resp.result);
    }

    if (resp?.status == "error") {
      toast.error(resp.message);
    }
    return resp;
  };

  const { isSidebarOpen } = useSidebarState(); // Get the sidebar state (true/false)

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false); // For desktop comment form toggle

  const hideCommentForm = () => {
    setIsCommentFormVisible(false);
  };

  useEffect(() => {
    // high priority not use startTransition
    void getProfileAction().then((res) => {
      setProfile(res);
    });
    startTransition(async () => {
      const postId = Number(params.id);
      if (!isNaN(postId)) {
        await fetchData(postId);
      }
    });
  }, []);

  return (
    <div>
      {/* Toolbar (Fixed below the Header) */}
      <div
        className={`fixed top-16 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"} left-0 right-0 z-30`}
      >
        <div className="flex items-center justify-start p-4">
          {/* Back Button Icon */}
          <button
            aria-label="Go back"
            onClick={() => router.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 hover:bg-green-500"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section
        className={`space-y-6 bg-white pr-6 pt-6 transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Post Section */}
        <article key={post?.id} className="rounded-md bg-white p-6">
          {/* Author Info */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-start gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={post?.user?.pictureUrl} alt="Post Profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="font-semibold text-black">
                {post?.user?.fullName}
              </div>
              <div className="text-sm text-gray-500">
                {post?.createdAt ? formatTimeAgo(post.createdAt) : ""}
              </div>
            </div>
            <Badge className="my-2" variant={"grey"}>
              {post?.community?.name}
            </Badge>
          </div>

          {/* Post Content */}
          <h2 className="text-3xl font-bold md:text-4xl">{post?.title}</h2>
          <p className="mt-4 text-sm text-gray-700 sm:text-base">
            {post?.detail}
          </p>

          {/* Total Comments Section */}
          <div className="mt-6 flex items-center text-gray-500">
            <MessageCircle className="mr-2 h-5 w-5" />
            <div>{post?.comments?.length ?? 0} Comments</div>
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
                <CreateCommentFormDialog
                  postId={Number(params.id)}
                  onCommentCreated={() => {
                    startTransition(async () => {
                      await fetchData(Number(params.id));
                    });
                  }}
                />
              </div>
            </div>
          )}

          {/* Desktop Comment Form */}
          {isCommentFormVisible && (
            <CreateCommentForm
              hideCommentForm={hideCommentForm}
              postId={Number(params.id)}
              onCommentCreated={() => {
                hideCommentForm();
                startTransition(async () => {
                  await fetchData(Number(params.id));
                });
              }}
            />
          )}

          {/* Comments */}
          <div className="pt-6 sm:p-6">
            {post?.comments?.map((comment, idx) => (
              <div key={idx} className="mb-4 flex items-start">
                <div className="mr-4">
                  {/* Avatar */}
                  <Avatar>
                    <AvatarImage
                      src={comment?.user?.pictureUrl}
                      alt="Comment Profile"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">{comment.user?.fullName}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {comment?.createdAt
                        ? formatTimeAgo(comment.createdAt)
                        : ""}
                    </span>
                    {profile && profile?.id == comment.user?.id && (
                      <div className="ml-2">
                        <DeleteCommentFormDialog
                          commentId={comment.id}
                          onCommentDeleted={() => {
                            // TODO: fix to fetch comments only
                            startTransition(async () => {
                              await fetchData(Number(params.id));
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 sm:text-base">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
