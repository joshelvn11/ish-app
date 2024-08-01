import { useState, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ExclamationTriangleIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * SprintForm Component
 *
 * This component provides a form for creating and updating sprints within a project.
 * It includes fields for title, description, start date, and end date, and handles form validation
 * and submission to the backend API.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.create - Indicates whether the form is in create mode.
 * @param {number} props.id - The ID of the sprint being updated (if in update mode).
 * @param {Function} props.closeDialog - Function to close the dialog after sprint creation or update.
 * @param {Function} props.fetchItemData - Function to fetch item data after updating the sprint.
 */

SprintForm.propTypes = {
  create: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  closeDialog: PropTypes.func.isRequired,
  fetchItemData: PropTypes.func.isRequired,
};

function SprintForm(props) {
  const { getSprintData, currentProject } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [create, setCreate] = useState(props.create);
  let [validationErrors, setValidationErrors] = useState([]);
  let [sprintId, setSprintId] = useState(props.id);

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);

  /**
   * Formats a date object into a string in the format 'YYYY-MM-DD'.
   *
   * @param {Date} date - The date object to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date) => {
    if (date) {
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  /**
   * Validates the form data.
   *
   * @returns {boolean} - Returns true if the data is valid, otherwise false.
   */
  const validateData = () => {
    let valid = true;
    setValidationErrors([]);
    let errors = [];
    if (name === "") {
      errors.push("Please enter a valid title");
      valid = false;
    }

    if (name.length > 50) {
      errors.push("Title may not be longer than 50 characters");
      valid = false;
    }

    if (!startDate || !endDate) {
      errors.push("Both start date and end date must be provided");
      valid = false;
    }

    if (startDate && endDate && endDate <= startDate) {
      errors.push("End date must be after start date");
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  /**
   * Handles the form submission for creating a new sprint.
   * Validates the data and sends a POST request to the backend API.
   */
  const createSprint = async () => {
    if (!validateData()) {
      return;
    }

    // Make API request
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(
      `${apiUrl}/projects/${currentProject.id}/sprints/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          project: currentProject.id,
          name: name,
          description: description,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
        }),
      }
    );
    let data = await response.json();
    if (response.status === 201) {
      // Refresh the sprint data
      getSprintData();
      // Display success message
      toast({ description: "Sprint created successfully" });
      // Set the sprint id to the newly created id
      setSprintId(data.id);
      // Set to update mode
      setCreate(false);
      // Close the dialog
      props.closeDialog();
    } else {
      toast({
        variant: "destructive",
        description: `Problem creating sprint: ${JSON.stringify(data)}`,
      });
    }
  };

  /**
   * Updates the start date of the sprint.
   *
   * @param {Date} value - The new start date value.
   */
  const updateStartDate = async (value) => {
    // !TODO
  };

  /**
   * Updates the end date of the sprint.
   *
   * @param {Date} value - The new end date value.
   */
  const updateEndDate = async (value) => {
    // !TODO
  };

  return (
    <div className="space-y-4">
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <AlertTitle>Errors</AlertTitle>
          <AlertDescription>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Title</Label>
        <Input
          id="name"
          type="text"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              {startDate ? format(startDate, "PPP") : <span>Select start</span>}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                updateStartDate(date);
              }}
              disabled={(date) => date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p>to</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                updateEndDate(date);
              }}
              disabled={(date) => date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        onClick={() => {
          createSprint();
        }}
        className="w-full"
      >
        Create
      </Button>
    </div>
  );
}

export default SprintForm;
