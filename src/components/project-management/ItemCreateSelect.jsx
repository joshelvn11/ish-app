import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import EpicForm from "./forms/EpicForm";

const createItem = (value) => {
  console.log("Creating item", value);
};

function ItemCreateSelect() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemType, setItemType] = useState(null);

  const handleValueChange = (value) => {
    setIsDialogOpen(true);
    setItemType(value);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Select value={""} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[120px] sm:w-[150px]" icon={PlusIcon}>
          <SelectValue placeholder="Create" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EPIC" className="cursor-pointer">
            Epic
          </SelectItem>
          <SelectItem value="USERSTORY" className="cursor-pointer">
            User Story
          </SelectItem>
          <SelectItem value="TASK" className="cursor-pointer">
            Task
          </SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>
                Create new {itemType === "EPIC" && <span>Epic</span>}{" "}
                {itemType === "USERSTORY" && <span>User Story</span>}{" "}
                {itemType === "TASK" && <span>Task</span>}
              </p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {itemType === "EPIC" && <EpicForm create={true} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemCreateSelect;
