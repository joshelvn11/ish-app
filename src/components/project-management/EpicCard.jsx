import React, { useState } from "react";
import ProjectContext from "@/context/ProjectContext";
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
import { Badge } from "@/components/ui/badge";
import TaskTable from "./TaskTable";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import EpicForm from "./forms/EpicForm";
import { useContext } from "react";

function EpicCard(props) {
  const { deleteEpic } = useContext(ProjectContext);

  const [isOpen, setIsOpen] = useState(true);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
              <Button
                variant="ghost"
                onClick={() => setIsDetailDialogOpen(true)}
              >
                <EnterFullScreenIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
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
          {(props.status || props.priority) && (
            <div id="badge-wrapper" className="flex gap-2 pb-2">
              {props.priority === "OPTIONAL" && (
                <Badge className="bg-blue-500">OPTIONAL</Badge>
              )}
              {props.priority === "BENEFICIAL" && (
                <Badge className="bg-emerald-600">BENEFICIAL</Badge>
              )}
              {props.priority === "ESSENTIAL" && (
                <Badge className="bg-amber-500">ESSENTIAL</Badge>
              )}
              {props.priority === "CRITICAL" && (
                <Badge className="bg-red-600">CRITICAL</Badge>
              )}
              {props.status === "TO DO" && (
                <Badge className="bg-red-600">TO DO</Badge>
              )}
              {props.status === "IN PROGRESS" && (
                <Badge className="bg-amber-500">IN PROGRESS</Badge>
              )}
              {props.status === "REVIEW" && (
                <Badge className="bg-blue-500">REVIEW</Badge>
              )}
              {props.status === "DONE" && (
                <Badge className="bg-emerald-600">DONE</Badge>
              )}
            </div>
          )}
          <p className="pb-3 text-sm">{props.description}</p>
          <CollapsibleContent className="space-y-2">
            <TaskTable groupBy={"EPIC"} groupId={props.epicId}></TaskTable>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <Dialog
        id="epicDetailDialog"
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      >
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
      <Dialog
        id="epic-delete-dialog"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-3">Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This epic and all child items will be deleted permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                deleteEpic(props.epicId);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EpicCard;
