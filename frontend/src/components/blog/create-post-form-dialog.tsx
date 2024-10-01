"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useEffect, useState } from "react";
import { type Community } from "@/interfaces/services/community.service.interface";
import { getCommunitiesAction } from "@/actions/community.action";
import { createPostAction } from "@/actions/post.action";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  communityId: z
    .string({ message: "Choose a community" })
    .regex(/^\d+$/, { message: "Community ID must be a number." })
    .refine((val) => val !== "0", { message: "Choose a community" }),
  detail: z
    .string()
    .min(3, { message: "Detail must be at least 3 characters" }),
});

interface ICreatePostFormDialog {
  onFetchPostsData: () => void;
}

export const CreatePostFormDialog = ({
  onFetchPostsData,
}: ICreatePostFormDialog) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [communityList, setCommunityList] = useState<Community[]>([]);

  const fetchData = async () => {
    const resp = await getCommunitiesAction();
    if (resp?.result) {
      setCommunityList(resp.result);
    }

    if (resp?.status == "error") {
      toast.error(resp.message);
    }
    return resp;
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchData();
    });
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityId: "0",
      title: "",
      detail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resp = await createPostAction({
      ...values,
      communityId: Number(values.communityId),
    });

    if (resp?.status === "success") {
      form.reset();
      toast.success(`Post has been posted successfully`);
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
        <Button>
          <span>Create</span> <Plus className="ml-1 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="flex items-start justify-start">
            <DialogTitle className="text-2xl">Create Post</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogClose asChild>
              <button>
                <X className="absolute right-4 top-4 h-5 w-5" />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="flex w-full flex-col gap-[0.7rem]">
            <Form {...form}>
              <FormField
                control={form.control}
                name="communityId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isSubmitting}
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-50 flex items-center justify-center justify-self-start border-primary font-semibold text-primary max-md:w-full"
                          onBlur={field.onBlur}
                          ref={field.ref}
                        >
                          <SelectValue placeholder="Choose a community" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-60">
                        <SelectGroup>
                          <SelectItem value={`0`}>
                            {"Choose a community"}
                          </SelectItem>
                          {communityList.map((v, index) => (
                            <SelectItem key={index} value={`${v.id}`}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="min-w-full"
                        disabled={isSubmitting}
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-[10rem] min-w-full"
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
              <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:justify-end">
                <DialogClose asChild>
                  <Button
                    className="w-full font-semibold sm:w-[6rem]"
                    variant={"outline"}
                    type="button"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  className="w-full font-semibold sm:w-[6rem]"
                  type="submit"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
