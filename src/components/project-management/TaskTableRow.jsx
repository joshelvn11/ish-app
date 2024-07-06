import React, { useState, useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
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
import { useToast } from "@/components/ui/use-toast";
import UserStoryForm from "@/components/project-management/forms/UserStoryForm";

function TaskTableRow(props) {
  // Get context data
  const { sprintData, currentProject } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);

  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get initial state values from props
  let [id, setId] = useState(props.id);
  let [type, setType] = useState(props.type);
  let [name, setName] = useState(props.name);
  let [epic, setEpic] = useState(props.epic);
  let [description, setDescription] = useState(props.description);
  let [status, setStatus] = useState(props.status);
  let [priority, setPriority] = useState(props.priority);
  let [sprint, setSprint] = useState(props.sprint);
  let [duedate, setDuedate] = useState(props.duedate);
  let [userStory, setUserStory] = useState(props.userStory);
  let [acceptanceCriteria, setAcceptanceCriteria] = useState(
    props.acceptanceCriteria
  );
  let [subtasks, setSubtasks] = useState(props.subtasks);

  // Callback function to update data
  const fetchItemData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(
      `${apiUrl}/projects/${currentProject.id}/user-stories/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      console.log("Data updated successfully", data);
      setName(data.name);
      setEpic(data.epic);
      setDescription(data.description);
      setStatus(data.status);
      setPriority(data.priority);
      setSprint(data.sprint);
      setDuedate(data.due_date);
      setUserStory(data.user_story);
      setAcceptanceCriteria(data.acceptanceCriteria);
      setSubtasks(data.subtasks);
      toast({ description: "Item data updated successfully" });
    } else {
      toast({
        variant: "destructive",
        description: `Problem fetching data: ${JSON.stringify(data)}`,
      });
    }
  };

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
              id={id}
              name={name}
              epic={epic}
              description={description}
              duedate={duedate}
              status={status}
              priority={priority}
              sprint={sprint}
              userStory={userStory}
              acceptanceCriteria={acceptanceCriteria}
              subtasks={subtasks}
              fetchItemData={fetchItemData}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskTableRow;
