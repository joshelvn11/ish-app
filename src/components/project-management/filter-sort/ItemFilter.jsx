import React, { useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ListFilter, Check, IterationCcw, Settings } from "lucide-react";

function ItemFilter(props) {
  const { sprintData } = useContext(ProjectContext);

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

  const setFilterType = (itemType) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterType: {
        ...prevState.filterType,
        [itemType]: !prevState.filterType[itemType],
      },
    }));
  };

  const setFilterStatus = (status) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterStatus: {
        ...prevState.filterStatus,
        [status]: !prevState.filterStatus[status],
      },
    }));
  };

  const setFilterPriority = (priority) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterPriority: {
        ...prevState.filterPriority,
        [priority]: !prevState.filterPriority[priority],
      },
    }));
  };

  const setFilterSprint = (sprint) => {
    // Set sprint value to "" if it is equal to "NONE"
    sprint = sprint === "NONE" ? "" : sprint;
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterSprint: sprint,
    }));
  };

  const toggleHideEmptyEpics = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      hideEmptyEpics: !props.filterOptions.hideEmptyEpics,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const preventMenuClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            <ListFilter className="mr-2 size-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sorting</DropdownMenuLabel>
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
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterType("USER_STORY");
                  }}
                >
                  User Story
                  {props.filterOptions.filterType.USER_STORY === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterType("TASK");
                  }}
                >
                  Task
                  {props.filterOptions.filterType.TASK === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterType("DOCUMENTATION");
                  }}
                >
                  Doc
                  {props.filterOptions.filterType.DOCUMENTATION === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterType("BUG");
                  }}
                >
                  Bug
                  {props.filterOptions.filterType.BUG === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterStatus("TO_DO");
                  }}
                >
                  To Do
                  {props.filterOptions.filterStatus.TO_DO === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterStatus("IN_PROGRESS");
                  }}
                >
                  In Progress
                  {props.filterOptions.filterStatus.IN_PROGRESS === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterStatus("REVIEW");
                  }}
                >
                  Review
                  {props.filterOptions.filterStatus.REVIEW === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterStatus("DONE");
                  }}
                >
                  Done
                  {props.filterOptions.filterStatus.DONE === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterPriority("OPTIONAL");
                  }}
                >
                  Optional
                  {props.filterOptions.filterPriority.OPTIONAL === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterPriority("BENEFICIAL");
                  }}
                >
                  Beneficial
                  {props.filterOptions.filterPriority.BENEFICIAL === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterPriority("ESSENTIAL");
                  }}
                >
                  Essential
                  {props.filterOptions.filterPriority.ESSENTIAL === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterPriority("CRITICAL");
                  }}
                >
                  Critical
                  {props.filterOptions.filterPriority.CRITICAL === true && (
                    <Check className="size-4" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <Select
        value={props.filterOptions.filterSprint}
        onValueChange={(value) => {
          setFilterSprint(value);
        }}
      >
        <SelectTrigger className="w-[350px]">
          <div className="flex items-center justify-start gap-3">
            <IterationCcw className="w-4 h-4" />{" "}
            <SelectValue placeholder="Select Sprint" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NONE">None</SelectItem>
          {sprintData &&
            sprintData.map((sprint) => (
              <SelectItem key={sprint.id} value={sprint.id}>
                {sprint.name}{" "}
                <span className="text-xs text-gray-500">
                  ({formatDate(sprint.start_date)} to{" "}
                  {formatDate(sprint.end_date)})
                </span>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            <Settings className="mr-2 size-4" />
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px]">
          <DropdownMenuItem
            className="flex justify-between"
            onClick={preventMenuClose}
          >
            <div>Hide Empty Epics</div>
            <Switch
              checked={props.filterOptions.hideEmptyEpics}
              onCheckedChange={toggleHideEmptyEpics}
            ></Switch>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ItemFilter;
