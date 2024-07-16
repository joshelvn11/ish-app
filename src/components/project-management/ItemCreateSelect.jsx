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
import EpicForm from "@/components/project-management/forms/EpicForm";
import SprintForm from "@/components/project-management/forms/SprintForm";
import ItemForm from "@/components/project-management/forms/ItemForm";

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
          <SelectItem value="SPRINT" className="cursor-pointer">
            Sprint
          </SelectItem>
          <SelectItem value="USER STORY" className="cursor-pointer">
            User Story
          </SelectItem>
          <SelectItem value="TASK" className="cursor-pointer">
            Task
          </SelectItem>
          <SelectItem value="DOCUMENTATION" className="cursor-pointer">
            Documentation
          </SelectItem>
          <SelectItem value="BUG" className="cursor-pointer">
            Bug
          </SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>
                Create new {itemType === "EPIC" && <span>Epic</span>}{" "}
                {itemType === "SPRINT" && <span>Sprint</span>}{" "}
                {itemType === "USER STORY" && <span>User Story</span>}{" "}
                {itemType === "TASK" && <span>Task</span>}
                {itemType === "DOCUMENTATION" && <span>Documentation</span>}
                {itemType === "BUG" && <span>Bug</span>}
              </p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {itemType === "EPIC" && (
            <EpicForm create={true} closeDialog={closeDialog} />
          )}
          {itemType === "SPRINT" && (
            <SprintForm create={true} closeDialog={closeDialog} />
          )}
          {(itemType === "USER STORY" ||
            itemType === "TASK" ||
            itemType === "BUG" ||
            itemType === "DOCUMENTATION") && (
            <ItemForm
              create={true}
              itemType={itemType}
              closeDialog={closeDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemCreateSelect;
