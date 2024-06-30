import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import TaskTable from "./TaskTable";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import EpicForm from "./forms/EpicForm";

function EpicCard(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Card className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="px-5 py-4 space-y-2"
        >
          <div className="flex items-center justify-between space-x-4">
            <h3 className="font-semibold">{props.title}</h3>
            <div className="flex items-center h-full">
              <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
                <EnterFullScreenIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost">
                <TrashIcon className="w-5 h-5" />
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <p className="pb-3 text-sm">{props.description}</p>
          <CollapsibleContent className="space-y-2">
            <TaskTable groupBy={"EPIC"} groupId={props.epicId}></TaskTable>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>Update Epic</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EpicForm
            create={false}
            epicId={props.epicId}
            title={props.title}
            description={props.description}
            priority={props.priority}
            status={props.status}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EpicCard;
