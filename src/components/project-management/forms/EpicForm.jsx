import { useState, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

/**
 * EpicForm Component
 *
 * This component provides a form for creating and updating epics within a project.
 * It includes fields for title, description, priority, and status, and handles form validation
 * and submission to the backend API.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.create - Indicates whether the form is in create mode.
 * @param {number} props.epicId - The ID of the epic being updated (if in update mode).
 * @param {string} props.title - The initial title of the epic.
 * @param {string} props.description - The initial description of the epic.
 * @param {string} props.priority - The initial priority of the epic.
 * @param {string} props.status - The initial status of the epic.
 */

EpicForm.propTypes = {
  create: PropTypes.bool.isRequired,
  epicId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  status: PropTypes.string,
};

function EpicForm(props) {
  const { currentProject, getEpicData } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [create, setCreate] = useState(props.create);
  let [validationErrors, setValidationErrors] = useState([]);
  let [epicId, setEpicId] = useState(props.epicId);

  // Form data state
  let [name, setName] = useState(props.title);
  let [description, setDescription] = useState(props.description);
  let [priority, setPriority] = useState(props.priority);
  let [status, setStatus] = useState(props.status);

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

    if (name.length > 256) {
      errors.push("Title may not be longer than 256 characters");
      valid = false;
    }
    setValidationErrors(errors);
    return valid;
  };

  /**
   * Handles the form submission for creating or updating an epic.
   *
   * @param {Event} e - The event object.
   */
  const updateEpic = async (e) => {
    e.preventDefault();
    if (!validateData()) {
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    if (create) {
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/epics/`,
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
            priority: priority,
            status: status,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 201) {
        toast({ description: "Epic created successfully!" });
        // Set the new epic id to the id returned in the response
        setEpicId(data.id);
        // Refresh epic data
        getEpicData();
        // Set to update mode
        setCreate(false);
      } else {
        console.log(data);
        toast({ variant: "destructive", description: "Error creating epic" });
      }
    } else {
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/epics/${epicId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            project: currentProject.id,
            name: name,
            description: description,
            priority: priority,
            status: status,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Epic updated successfully!" });
        // Refresh epic data
        getEpicData();
      } else {
        console.log(data);
        toast({ variant: "destructive", description: "Error updating epic" });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* Display validation errors if any */}
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
        {/* Form to create or update an epic */}
        <form onSubmit={updateEpic}>
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Input field for the epic title */}
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
              {/* Textarea for the epic description */}
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              {/* Select dropdown for the epic priority */}
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[150px]">
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPTIONAL">
                    <Badge className="bg-blue-500">OPTIONAL</Badge>
                  </SelectItem>
                  <SelectItem value="BENEFICIAL">
                    <Badge className="bg-emerald-600">BENEFICIAL</Badge>
                  </SelectItem>
                  <SelectItem value="ESSENTIAL">
                    <Badge className="bg-amber-500">ESSENTIAL</Badge>
                  </SelectItem>
                  <SelectItem value="CRITICAL">
                    <Badge className="bg-red-600">CRITICAL</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              {/* Select dropdown for the epic status */}
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[150px]">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TO DO">
                    <Badge className="bg-red-600">TO DO</Badge>
                  </SelectItem>
                  <SelectItem value="IN PROGRESS">
                    <Badge className="bg-amber-500">IN PROGRESS</Badge>
                  </SelectItem>
                  <SelectItem value="REVIEW">
                    <Badge className="bg-blue-500">REVIEW</Badge>
                  </SelectItem>
                  <SelectItem value="DONE">
                    <Badge className="bg-emerald-600">DONE</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Submit button to create or update the epic */}
            <Button type="submit" className="w-full">
              {create ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EpicForm;
