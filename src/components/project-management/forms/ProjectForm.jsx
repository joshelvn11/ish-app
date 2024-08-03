import { useState, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * ProjectForm Component
 *
 * This component provides a form for creating a new project. It includes fields for the project title and description,
 * and handles form validation and submission to the backend API.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.closeDialog - Function to close the dialog after project creation.
 */

ProjectForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};

function ProjectForm(props) {
  const { loadProject, getProjects } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  // State variables for form fields and validation errors
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);

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
    setValidationErrors(errors);
    return valid;
  };

  /**
   * Handles the form submission for creating a new project.
   * Validates the data and sends a POST request to the backend API.
   */
  const createProject = async () => {
    if (!validateData()) {
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(`${apiUrl}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    let data = await response.json();
    if (response.status === 201) {
      toast({ description: "Project created successfully" });
      // Refresh project data
      await getProjects();
      // Load the newly created project as the current project
      loadProject(data.id);
      // Close the dialog
      props.closeDialog();
    } else {
      toast({
        variant: "destructive",
        description: `Problem creating project: ${JSON.stringify(data)}`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Display validation errors if there are any */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <AlertTitle>Errors</AlertTitle>
          <AlertDescription>
            <ul>
              {/* Map through the validation errors and display each one */}
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      {/* Project title */}
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
      {/* Project description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Submit create button */}
      <Button
        onClick={() => {
          createProject();
        }}
        className="w-full"
      >
        Create
      </Button>
    </div>
  );
}

export default ProjectForm;
