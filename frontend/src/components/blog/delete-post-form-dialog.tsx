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
import { useState } from "react";

interface IDeletePostForm {
  postId: number;
  initialData: Post;
  onFetchPostsData: () => void;
}

export const DeletePostFormDialog = ({
  postId,
  onFetchPostsData,
}: IDeletePostForm) => {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm();

  async function onSubmit() {
    const resp = await deletePostAction(postId);
    if (resp?.status === "success") {
      toast.success(`Post has been deleted successfully`);
      setOpenDialog(false);
      onFetchPostsData();
    } else {
      toast.error(`${resp?.message ?? BaseErrorEnum.UNEXPECTED}`);
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-200">
          <Trash className="h-5 w-5 text-red-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-xl md:w-[25rem]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-center md:text-2xl">
              Please confirm if you wish to <br /> delete the post
            </DialogTitle>
            <DialogDescription className="text-center max-md:text-xs">
              Are you sure you want to delete the post? <br /> Once deleted, it
              cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
              <Button
                className="w-full font-semibold sm:w-[10rem]"
                variant={"destructive"}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>

              <DialogClose asChild>
                <Button
                  className="w-full font-semibold sm:w-[10rem]"
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
