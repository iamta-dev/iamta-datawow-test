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
import { useSidebarState } from "@/hooks/use-sidebar";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  communityId: z
    .string()
    .min(3, { message: "Community ID must be at least 3 characters" }),
  detail: z
    .string()
    .min(3, { message: "Detail must be at least 3 characters" }),
});

interface Props {
  hideCommentForm: () => void;
}

export const CreateCommentForm = ({ hideCommentForm }: Props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarState();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityId: "",
      title: "",
      detail: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(`${values.title} has been posted successfully`);
    // toast.error(`${values.title} has been posted successfully`);
  }

  // 3. Get the status
  const { isSubmitting, isValid } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <Form {...form}>
        <div className="my-4 flex w-full flex-col items-center space-y-4">
          <FormField
            control={form.control}
            name="detail"
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
          Post
        </Button>
      </div>
    </form>
  );
};
