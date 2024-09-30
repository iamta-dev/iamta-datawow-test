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

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash } from "lucide-react";

const formSchema = z.object({
  postId: z
    .string()
    .min(3, { message: "Post ID must be at least 3 characters" }),
});

export const DeletePostForm = () => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postId: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(`${values.postId} has been posted successfully`);
  }

  // 3. Get the status
  const { isSubmitting, isValid } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-200">
          <Trash className="h-5 w-5 text-red-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Please confirm if you wish to delete the post
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete the post? <br /> Once deleted, it
              cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <div className="sr-only">
              <FormField
                control={form.control}
                name="postId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[350px]"
                        disabled={isSubmitting}
                        placeholder="postId"
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
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-2">
              <Button
                className="w-[350px]"
                variant={"destructive"}
                type="submit"
              >
                Delete
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
