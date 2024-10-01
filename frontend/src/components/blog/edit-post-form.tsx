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
import { Edit, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useEffect, useState } from "react";
import { type Community } from "@/interfaces/services/community.service.interface";
import { getCommunitiesAction } from "@/actions/community.action";
import { updatePostAction } from "@/actions/post.action"; // เพิ่มการเรียก action สำหรับการแก้ไขโพสต์
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface"; // ตรวจสอบข้อผิดพลาด
import { type Post } from "@/interfaces/services/post.service.interface";

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

interface IEditPostForm {
  postId: number;
  initialData: Post;
  onFetchPostsData: () => void;
}

export const EditPostForm = ({
  postId,
  initialData,
  onFetchPostsData,
}: IEditPostForm) => {
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
    values: {
      communityId: `${initialData.communityId}`,
      title: initialData.title,
      detail: initialData.detail,
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resp = await updatePostAction(postId, {
      ...values,
      communityId: Number(values.communityId),
    });

    if (resp?.status === "success") {
      form.reset();
      toast.success(`Post has been updated successfully`);
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
          <Edit className="h-5 w-5 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
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
                name="communityId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isSubmitting}
                      value={`${field.value}`}
                      name={field.name}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="flex w-[350px] items-center justify-center border-primary text-primary"
                          onBlur={field.onBlur}
                          ref={field.ref}
                        >
                          <SelectValue placeholder="Choose a community" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-[350px]">
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
                        className="w-[350px]"
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
                        className="w-[350px]"
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

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
