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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createCommentAction } from "@/actions/comment.action"; 
import { useSidebarState } from "@/hooks/use-sidebar";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

const formSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be at least 3 characters" }), 
});

interface Props {
  postId: number; 
  hideCommentForm: () => void;
  onCommentCreated: () => void;
}

export const CreateCommentForm = ({ postId, hideCommentForm, onCommentCreated }: Props) => {
  const { isSidebarOpen } = useSidebarState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resp = await createCommentAction({ postId, ...values }); 
    if (resp?.status === "success") {
      form.reset();
      toast.success("Comment has been posted successfully");
      onCommentCreated();
    } else {
      toast.error(`${resp?.message ?? BaseErrorEnum.UNEXPECTED}`);
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <Form {...form}>
        <div className="my-4 flex w-full flex-col items-center space-y-4">
          <FormField
            control={form.control}
            name="comment" 
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className={
                      isSidebarOpen
                        ? "w-[calc(100vw-22rem)]"
                        : "w-[calc(100vw-6rem)]"
                    }
                    disabled={isSubmitting}
                    placeholder="What's on your mind..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
      <div className="flex w-full flex-row items-end justify-end gap-5">
        <Button variant={"outline"} type="button" onClick={hideCommentForm}>
          Cancel
        </Button>

        <Button disabled={!isValid || isSubmitting} type="submit">
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
};
