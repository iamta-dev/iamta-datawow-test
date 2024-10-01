"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { deleteCommentAction } from "@/actions/comment.action";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { useState } from "react";
const formSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be at least 3 characters" }),
});

interface IDeleteCommentFormDialog {
  commentId: number;
  onCommentDeleted: () => void;
}

export const DeleteCommentFormDialog = ({
  commentId,
  onCommentDeleted,
}: IDeleteCommentFormDialog) => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit() {
    const resp = await deleteCommentAction(commentId);

    if (resp?.status === "success") {
      form.reset();
      toast.success("Comment has been deleted successfully");
      setOpenDialog(false);
      onCommentDeleted();
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
              Please confirm if you wish to <br /> delete the comment
            </DialogTitle>
            <DialogDescription className="text-center max-md:text-xs">
              Are you sure you want to delete the comment? <br /> Once deleted, it
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
