import { useState } from "react";
import ProjectContext from "@/context/ProjectContext";
import { Card } from "@/components/ui/card";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ItemTable from "./ItemTable";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import EpicForm from "./forms/EpicForm";
import { useContext } from "react";
import PropTypes from "prop-types";

// Define prop types for the EpicCard component
EpicCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  priority: PropTypes.string,
  status: PropTypes.string,
  epicId: PropTypes.string.isRequired,
  filterOptions: PropTypes.object,
};

/**
 * EpicCard component represents a card that displays information about an epic.
 * It includes functionality to view, update, and delete the epic.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the epic.
 * @param {string} [props.description] - The description of the epic.
 * @param {string} [props.priority] - The priority of the epic.
 * @param {string} [props.status] - The status of the epic.
 * @param {string} props.epicId - The unique identifier of the epic.
 * @param {Object} [props.filterOptions] - The filter options for the item table.
 *
 * @returns {JSX.Element} The rendered EpicCard component.
 */
function EpicCard(props) {
  // Get the deleteEpic function from the ProjectContext
  const { deleteEpic } = useContext(ProjectContext);

  // State to manage the visibility of the card
  const [isHidden, setIsHidden] = useState(false);
  // State to manage the collapsible section
  const [isOpen, setIsOpen] = useState(true);
  // State to manage the detail dialog visibility
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  // State to manage the delete dialog visibility
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      {/* Card component to display the epic */}
      <Card className={`w-full ${isHidden ? "hidden" : ""}`}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="px-5 py-4 space-y-2"
        >
          <div className="flex items-center justify-between space-x-4">
            <h3 className="font-semibold">{props.title}</h3>
            <div className="flex items-center h-full">
              {/* Button to open the detail dialog */}
              <Button
                variant="ghost"
                onClick={() => setIsDetailDialogOpen(true)}
              >
                <EnterFullScreenIcon className="w-5 h-5" />
              </Button>
              {/* Button to open the delete dialog */}
              <Button
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
              {/* Collapsible trigger button */}
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          {/* Display priority and status badges if available */}
          {(props.status || props.priority) && (
            <div id="badge-wrapper" className="flex gap-2 pb-2">
              {props.priority && (
                <Badge
                  className={
                    props.priority &&
                    `bg-${props.priority.toLowerCase().replace(/\s+/g, "")}`
                  }
                >
                  {props.priority}
                </Badge>
              )}
              {props.status && (
                <Badge
                  className={
                    props.status &&
                    `bg-${props.status.toLowerCase().replace(/\s+/g, "")}`
                  }
                >
                  {props.status}
                </Badge>
              )}
            </div>
          )}
          {/* Display the description of the epic */}
          <p className="pb-3 text-sm">{props.description}</p>
          {/* Collapsible content to display the item table */}
          <CollapsibleContent className="space-y-2">
            <ItemTable
              groupId={props.epicId}
              filterOptions={props.filterOptions}
              hideParent={setIsHidden}
            ></ItemTable>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      {/* Dialog for updating the epic details */}
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
      {/* Dialog for confirming the deletion of the epic */}
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
