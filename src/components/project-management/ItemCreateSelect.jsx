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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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
          <SelectItem value="EPIC">Epic</SelectItem>
          <SelectItem value="USERSTORY">User Story</SelectItem>
          <SelectItem value="TASK">Task</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create new {itemType === "EPIC" && <span>Epic</span>}{" "}
              {itemType === "USERSTORY" && <span>User Story</span>}{" "}
              {itemType === "TASK" && <span>Task</span>}
            </DialogTitle>
            <DialogDescription>
              {itemType === "EPIC" && <p>Creating epic</p>}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={closeDialog}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemCreateSelect;
