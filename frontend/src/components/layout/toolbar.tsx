"use client";

import { Search, ArrowRight } from "lucide-react";
import { InputWithIcon } from "../ui/input-with-icon";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Community } from "@/interfaces/services/community.service.interface";
import { startTransition, useEffect, useState } from "react";
import { CreatePostFormDialog } from "../blog/create-post-form-dialog";
import { getCommunitiesAction } from "@/actions/community.action";
import { toast } from "sonner";
import { type PostParamsDto } from "@/interfaces/services/post.service.interface";

interface IToolbar {
  onFetchPostsData: () => void;
  isSidebarOpen: boolean; // Sidebar state
  isSearchActive: boolean; // Search bar state for mobile
  searchQueryParams: PostParamsDto;
  setSearchQueryParams: (v: PostParamsDto) => void;
  setIsSearchActive: (isActive: boolean) => void; // Function to toggle search bar
}

export default function Toolbar({
  onFetchPostsData,
  isSidebarOpen,
  isSearchActive,
  searchQueryParams,
  setSearchQueryParams,
  setIsSearchActive,
}: IToolbar) {
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

  return (
    <div
      className={`fixed left-0 right-0 top-16 z-10 bg-grey-100 transition-all ${
        isSidebarOpen ? "md:ml-64" : "md:ml-0"
      }`}
    >
      <div className="flex items-center p-4">
        {/* Mobile View - controlled by isSearchActive */}
        <div className="block w-full md:hidden">
          {isSearchActive ? (
            <div className="flex w-full items-center justify-between">
              <InputWithIcon
                icon={Search}
                type="text"
                placeholder="Search"
                className="flex-grow rounded-md border border-gray-300 bg-grey-100"
                value={searchQueryParams?.fsearch ?? ""}
                onChange={(e) =>
                  setSearchQueryParams({
                    ...searchQueryParams,
                    fsearch: e.target.value,
                  })
                }
              />
              <button onClick={() => setIsSearchActive(false)} className="ml-2">
                <ArrowRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between">
              <button onClick={() => setIsSearchActive(true)}>
                <Search className="h-6 w-6 text-gray-600" />
              </button>
              <div className=" flex flex-row">
                <Select
                  name={"communityId"}
                  defaultValue={searchQueryParams?.communityId ?? "ALL"}
                  onValueChange={(value) => {
                    setSearchQueryParams({
                      ...searchQueryParams,
                      communityId: value != "ALL" ? value : undefined,
                    });
                  }}
                >
                  <SelectTrigger className="flex min-w-32 font-semibold bg-grey-100 items-center justify-center border-none border-primary text-black">
                    <SelectValue placeholder="Community" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="font-medium" value={"ALL"}>
                        {"Community"}
                      </SelectItem>
                      {communityList.map((v, index) => (
                        <SelectItem key={index} value={`${v.id}`}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <CreatePostFormDialog onFetchPostsData={onFetchPostsData} />
              </div>
            </div>
          )}
        </div>

        {/* Desktop View - always shows input, select, and Plus button */}
        <div className="hidden w-full items-center justify-between md:flex">
          <InputWithIcon
            icon={Search}
            type="text"
            placeholder="Search"
            className="flex-grow rounded-md border border-gray-300 bg-grey-100 text-lg"
            value={searchQueryParams?.fsearch}
            onChange={(e) =>
              setSearchQueryParams({
                ...searchQueryParams,
                fsearch: e.target.value,
              })
            }
          />
          <div className="ml-2 flex items-center space-x-2">
            <Select
              name={"communityId"}
              defaultValue={searchQueryParams?.communityId ?? "ALL"}
              onValueChange={(value) => {
                setSearchQueryParams({
                  ...searchQueryParams,
                  communityId: value != "ALL" ? value : undefined,
                });
              }}
            >
              <SelectTrigger className="flex w-[9rem] items-center justify-center border-none border-primary bg-grey-100 font-semibold text-black">
                <SelectValue placeholder="Community" />
              </SelectTrigger>
              <SelectContent className="w-[10rem]">
                <SelectGroup>
                  <SelectItem className="font-medium" value={"ALL"}>
                    {"Community"}
                  </SelectItem>
                  {communityList.map((v, index) => (
                    <SelectItem key={index} value={`${v.id}`}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <CreatePostFormDialog onFetchPostsData={onFetchPostsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
