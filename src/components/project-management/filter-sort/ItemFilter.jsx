import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, Check } from "lucide-react";

function ItemFilter(props) {
  const setSortBy = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      sortBy: value,
    }));
  };

  const setSortOrder = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      sortOrder: value,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <ListFilter className="mr-2 size-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortBy("");
                }}
              >
                None{" "}
                {props.filterOptions.sortBy === "" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortBy("STATUS");
                }}
              >
                Status{" "}
                {props.filterOptions.sortBy === "STATUS" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortBy("PRIORITY");
                }}
              >
                Priority{" "}
                {props.filterOptions.sortBy === "PRIORITY" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sort order</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortOrder("");
                }}
              >
                None{" "}
                {props.filterOptions.sortOrder === "" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortOrder("ASC");
                }}
              >
                Ascending{" "}
                {props.filterOptions.sortOrder === "ASC" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSortOrder("DESC");
                }}
              >
                Descending{" "}
                {props.filterOptions.sortOrder === "DESC" && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Type</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>User Story</DropdownMenuItem>
              <DropdownMenuItem>Task</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ItemFilter;
