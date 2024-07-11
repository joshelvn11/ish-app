import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrow } from "lucide-react";

function StatusSort() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <ArrowDownWideNarrow className="size-5" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
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

export default StatusSort;
