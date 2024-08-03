import { useState, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

/**
 * ItemTableRow Component
 *
 * This component represents a row in the item table. It displays various details about an item such as type, name, status, priority, sprint, and due date.
 * It also provides functionalities to edit and delete the item.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - The ID of the item.
 * @param {string} props.type - The type of the item.
 * @param {string} props.name - The name of the item.
 * @param {string} [props.epic] - The epic associated with the item.
 * @param {string} [props.description] - The description of the item.
 * @param {string} props.status - The status of the item.
 * @param {string} props.priority - The priority of the item.
 * @param {number} [props.sprint] - The sprint associated with the item.
 * @param {string} [props.duedate] - The due date of the item.
 * @param {string} [props.userStory] - The user story associated with the item.
 * @param {string} [props.acceptanceCriteria] - The acceptance criteria of the item.
 * @param {Array} [props.subtasks] - The subtasks associated with the item.
 */
ItemTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  epic: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  sprint: PropTypes.number,
  duedate: PropTypes.string,
  userStory: PropTypes.string,
  acceptanceCriteria: PropTypes.string,
  subtasks: PropTypes.arrayOf(PropTypes.object),
};

function ItemTableRow(props) {
  // Get context data
  const { sprintData, currentProject, getItemData } =
    useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);

  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get initial state values from props
  let [id] = useState(props.id);
  let [type] = useState(props.type);
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

  /**
   * Fetches the item data from the backend API and updates the state.
   * Displays a toast notification based on the success or failure of the fetch operation.
   */
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

  /**
   * Closes the dialog for editing item details.
   */
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  /**
   * Formats a date string into a more readable format.
   *
   * @param {string} dateString - The date string to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  /**
   * Deletes the item by sending a DELETE request to the backend API.
   * Displays a toast notification based on the success or failure of the delete operation.
   */
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
      getItemData();
      toast({
        description: `Item deleted successfully`,
      });
    } else {
      toast({
        variant: "destructive",
        description: `Problem deleting item`,
      });
    }
  };

  return (
    <>
      <TableRow>
        {/* Display item type */}
        <TableCell className="min-w-[150px]">
          <Badge>{type}</Badge>
        </TableCell>
        {/* Display item name */}
        <TableCell className="font-medium min-w-[200px]">{name}</TableCell>
        {/* Display item status with dynamic background color */}
        <TableCell className="min-w-[120px]">
          <Badge
            className={
              status && `bg-${status.toLowerCase().replace(/\s+/g, "")}`
            }
          >
            {status}
          </Badge>
        </TableCell>
        {/* Display item priority with dynamic background color */}
        <TableCell className="min-w-[120px]">
          <Badge
            className={
              priority && `bg-${priority.toLowerCase().replace(/\s+/g, "")}`
            }
          >
            {priority}
          </Badge>
        </TableCell>
        {/* Display sprint name if available */}
        <TableCell className="min-w-[120px]">
          {sprint &&
            sprintData &&
            sprintData.find((item) => item.id == sprint).name}
        </TableCell>
        {/* Display formatted due date if available */}
        <TableCell className="min-w-[120px]">
          {duedate && formatDate(duedate)}
        </TableCell>
        {/* Display action buttons for editing and deleting item */}
        <TableCell className="text-right min-w-[120px]">
          <Button
            variant="ghost"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <EnterFullScreenIcon className="w-5 h-5" />
          </Button>
          {/* Alert dialog for confirming item deletion */}
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
      {/* Dialog for editing item details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>{name}</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {/* Item form for editing item details */}
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
