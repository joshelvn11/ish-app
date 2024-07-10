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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ItemForm from "@/components/project-management/forms/ItemForm";
import { useEffect } from "react";

function ItemTableRow(props) {
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
      `${apiUrl}/projects/${currentProject.id}/items/${id}/`,
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
      setName(data.name);
      setEpic(data.epic);
      setDescription(data.description);
      setStatus(data.status);
      setPriority(data.priority);
      setSprint(data.sprint);
      setDuedate(data.due_date);
      setUserStory(data.user_story);
      setAcceptanceCriteria(data.acceptance_criteria);
      setSubtasks(data.subtasks);
      toast({ description: "Item data updated successfully" });
    } else {
      toast({
        variant: "destructive",
        description: `Problem fetching data: ${JSON.stringify(data)}`,
      });
    }
  };

  // Callback function to close dialog
  const closeDialog = () => {
    console.log("Closing dialog");
    setIsDialogOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const deleteItem = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(
      `${apiUrl}/projects/${currentProject.id}/items/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    if (response.status === 204) {
      toast({
        description: `Item deleted successfully`,
      });
    } else {
      toast({
        variant: "destructive",
        description: `Problem deleting item: ${JSON.stringify(data)}`,
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Badge>{type}</Badge>
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell>
          <Badge
            className={
              status && `bg-${status.toLowerCase().replace(/\s+/g, "")}`
            }
          >
            {status}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            className={
              priority && `bg-${priority.toLowerCase().replace(/\s+/g, "")}`
            }
          >
            {priority}
          </Badge>
        </TableCell>
        <TableCell>
          {sprint &&
            sprintData &&
            sprintData.find((item) => item.id == sprint).name}
        </TableCell>
        <TableCell>{duedate && formatDate(duedate)}</TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <EnterFullScreenIcon className="w-5 h-5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="ghost">
                <TrashIcon className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteItem();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

          <ItemForm
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
            closeDialog={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ItemTableRow;
