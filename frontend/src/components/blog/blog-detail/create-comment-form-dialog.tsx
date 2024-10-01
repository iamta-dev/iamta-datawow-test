"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createCommentAction } from "@/actions/comment.action";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { useState } from "react";
const formSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be at least 3 characters" }),
});

interface ICreateCommentFormDialog {
  postId: number;
  onCommentCreated: () => void;
}

export const CreateCommentFormDialog = ({
  postId,
  onCommentCreated,
}: ICreateCommentFormDialog) => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resp = await createCommentAction({
      postId,
      ...values,
    });

    if (resp?.status === "success") {
      form.reset();
      toast.success("Comment has been posted successfully");
      setOpenDialog(false);
      onCommentCreated();
    } else {
      toast.error(`${resp?.message ?? BaseErrorEnum.UNEXPECTED}`);
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Comment</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="flex justify-start items-start">
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogClose asChild>
              <button>
                <X className="absolute right-4 top-4 h-5 w-5" />
              </button>
            </DialogClose>
          </DialogHeader>
          <Form {...form}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      // className="max-sm:w-[calc(100vw-3rem)] md:w-[350px]"
                      className="h-[8rem] min-w-full"
                      disabled={isSubmitting}
                      placeholder="What's on your mind..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <DialogFooter>
            <div className="mt-8 flex w-full flex-col gap-2 sm:mt-2 sm:flex-row sm:items-end sm:justify-end sm:gap-5">
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
