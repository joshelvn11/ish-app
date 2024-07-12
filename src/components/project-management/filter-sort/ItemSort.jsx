import React, { useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrow, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function ItemSort(props) {
  const { backlogFilterOptions, setBacklogFilterOptions } =
    useContext(ProjectContext);

  const handleValueChange = (value) => {
    props.setFilterOptions((prevState) => ({
      ...prevState,
      sortBy: value,
    }));
  };

  return (
    <Select
      value={props.filterOptions.sortBy}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <ArrowDownWideNarrow className="size-4" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="flex gap-2">
          <ArrowDownUp className="size-5" /> Ascending
        </SelectItem>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          <SelectItem value="STATUS">Status</SelectItem>
          <SelectItem value="PRIORITY">Priority</SelectItem>
          <SelectItem value="DUEDATE">Due Date</SelectItem>
          <SelectItem value="TYPE">Type</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ItemSort;
