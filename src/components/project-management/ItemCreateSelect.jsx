import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";

const createItem = (value) => {
  console.log("Creating item", value);
};

function ItemCreateSelect() {
  return (
    <Select value={""} onValueChange={createItem}>
      <SelectTrigger className="w-[120px] sm:w-[150px]" icon={PlusIcon}>
        <SelectValue placeholder="Create" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={0}>Epic</SelectItem>
        <SelectItem value={1}>User Story</SelectItem>
        <SelectItem value={2}>Task</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ItemCreateSelect;
