"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Trash } from "lucide-react";
import { deletePostAction } from "@/actions/post.action"; // เพิ่ม action สำหรับลบโพสต์
import { type Post } from "@/interfaces/services/post.service.interface";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

interface IDeletePostForm {
  postId: number;
  initialData: Post;
  onFetchPostsData: () => void;
}

export const DeletePostForm = ({
  postId,
  onFetchPostsData,
}: IDeletePostForm) => {
  const form = useForm();

  async function onSubmit() {
    const resp = await deletePostAction(postId);
    if (resp?.status === "success") {
      toast.success(`Post has been deleted successfully`);
      onFetchPostsData();
    } else {
      toast.error(`${resp?.message ?? BaseErrorEnum.UNEXPECTED}`);
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-200">
          <Trash className="h-5 w-5 text-red-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              Please confirm if you wish to delete the post
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete the post? <br /> Once deleted, it
              cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-2">
              <Button
                className="w-[350px]"
                variant={"destructive"}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>

              <DialogClose asChild>
                <Button
                  className="w-[350px]"
                  variant={"secondary"}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
