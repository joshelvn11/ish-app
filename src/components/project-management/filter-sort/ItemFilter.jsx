import { useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
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

/**
 * ItemFilter Component
 *
 * This component provides a comprehensive interface for filtering and sorting project items.
 * It offers various options including sorting criteria, item type filters, status filters,
 * priority filters, sprint selection, and additional display options.
 *
 * The component utilizes dropdown menus and select inputs to present these options in an
 * organized and user-friendly manner. It interacts with the parent component through
 * props to update filter and sort settings.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.filterOptions - The current state of all filter and sort options.
 * @param {Function} props.setFilterOptions - Function to update the filter and sort options.
 */

ItemFilter.propTypes = {
  filterOptions: PropTypes.shape({
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    filterType: PropTypes.object,
    filterStatus: PropTypes.object,
    filterPriority: PropTypes.object,
    filterSprint: PropTypes.string,
    hideEmptyEpics: PropTypes.bool,
  }).isRequired,
  setFilterOptions: PropTypes.func.isRequired,
};

function ItemFilter(props) {
  // Access sprint data from the ProjectContext
  const { sprintData } = useContext(ProjectContext);

  /**
   * Updates the sorting criteria in the filter options.
   *
   * @param {string} value - The new sorting criteria.
   */
  const setSortBy = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      sortBy: value,
    }));
  };

  /**
   * Updates the sorting order in the filter options.
   *
   * @param {string} value - The new sorting order ('ASC' or 'DESC').
   */
  const setSortOrder = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      sortOrder: value,
    }));
  };

  /**
   * Toggles the filter for a specific item type.
   *
   * @param {string} itemType - The item type to toggle in the filter.
   */
  const setFilterType = (itemType) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterType: {
        ...prevState.filterType,
        [itemType]: !prevState.filterType[itemType],
      },
    }));
  };

  /**
   * Toggles the filter for a specific status.
   *
   * @param {string} status - The status to toggle in the filter.
   */
  const setFilterStatus = (status) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterStatus: {
        ...prevState.filterStatus,
        [status]: !prevState.filterStatus[status],
      },
    }));
  };

  /**
   * Toggles the filter for a specific priority.
   *
   * @param {string} priority - The priority to toggle in the filter.
   */
  const setFilterPriority = (priority) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterPriority: {
        ...prevState.filterPriority,
        [priority]: !prevState.filterPriority[priority],
      },
    }));
  };

  /**
   * Sets the filter for a specific sprint.
   *
   * @param {string} sprint - The sprint ID to filter by. Use 'NONE' to clear the filter.
   */
  const setFilterSprint = (sprint) => {
    sprint = sprint === "NONE" ? "" : sprint;
    props.setFilterOptions((prevState) => ({
      ...prevState,
      filterSprint: sprint,
    }));
  };

  /**
   * Toggles the visibility of empty epics in the filter options.
   */
  const toggleHideEmptyEpics = () => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      hideEmptyEpics: !props.filterOptions.hideEmptyEpics,
    }));
  };

  /**
   * Formats a date string into a more readable format.
   *
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date string (e.g., "15 March 2024").
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  /**
   * Prevents the dropdown menu from closing when interacting with certain elements.
   * This is useful for elements like switches that should not close the menu on interaction.
   *
   * @param {Event} e - The event object.
   */
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
