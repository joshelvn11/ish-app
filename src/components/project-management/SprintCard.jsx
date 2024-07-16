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
import ItemTable from "./ItemTable";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import { useContext } from "react";

function SprintCard(props) {
  const [isOpen, setIsOpen] = useState(true);

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
          <p className="pb-3 text-sm">{props.description}</p>
          <CollapsibleContent className="space-y-2">
            <ItemTable
              groupId={props.epicId}
              filterOptions={props.filterOptions}
            ></ItemTable>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </>
  );
}

export default SprintCard;
