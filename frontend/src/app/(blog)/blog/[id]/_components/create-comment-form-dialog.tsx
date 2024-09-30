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

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  communityId: z
    .string()
    .min(3, { message: "Community ID must be at least 3 characters" }),
  detail: z
    .string()
    .min(3, { message: "Detail must be at least 3 characters" }),
});

export const CreateCommentFormDialog = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Comments</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogClose asChild>
              <button>
                <X className="absolute right-4 top-4 h-5 w-5" />
              </button>
            </DialogClose>
          </DialogHeader>
          <Form {...form}>
            <div className="my-4 flex flex-col items-center space-y-4">
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="md:w-[350px] max-sm:w-[calc(100vw-3rem)]"
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
          <DialogFooter>
            <div className="flex w-full flex-row items-end justify-end gap-5">
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={!isValid || isSubmitting} type="submit">
                Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
