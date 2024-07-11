import React, { useState, useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ProjectForm(props) {
  const { loadProject, getProjects } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);

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
