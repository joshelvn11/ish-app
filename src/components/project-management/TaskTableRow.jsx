import React, { useState, useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import UserStoryForm from "@/components/project-management/forms/UserStoryForm";

function TaskTableRow(props) {
  // Get context data
  const { sprintData } = useContext(ProjectContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get initial state values from props
  let [type, setType] = useState(props.type);
  let [name, setName] = useState(props.name);
  let [status, setStatus] = useState(props.status);
  let [priority, setPriority] = useState(props.priority);
  let [sprint, setSprint] = useState(props.sprint);
  let [duedate, setDuedate] = useState(props.duedate);

  return (
    <>
      <TableRow>
        <TableCell>
          <Badge>{type.typeDisplay}</Badge>
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell>
          <Badge>{status}</Badge>
        </TableCell>
        <TableCell>
          <Badge>{priority}</Badge>
        </TableCell>
        <TableCell>
          <Select value={sprint ?? ""}>
            <SelectTrigger className="w-[120px] sm:w-[180px]">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              {sprintData &&
                sprintData.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>{duedate}</TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <EnterFullScreenIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost">
            <TrashIcon className="w-5 h-5" />
          </Button>
        </TableCell>
      </TableRow>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>{name}</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {type.type === "USERSTORY" && (
            <UserStoryForm
              create={false}
              id={props.id}
              name={props.name}
              epic={props.epic}
              description={props.description}
              duedate={duedate}
              status={status}
              priority={priority}
              sprint={sprint}
              userStory={props.userStory}
              acceptanceCriteria={props.acceptanceCriteria}
              subtasks={props.subtasks}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskTableRow;
