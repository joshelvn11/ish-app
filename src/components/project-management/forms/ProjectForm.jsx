import React, { useState, useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function ProjectForm(props) {
  const { loadProject, getProjects } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");

  const createProject = async () => {
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
        description: "Problem creating project",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="space-y-4">
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
      </div>
    </div>
  );
}

export default ProjectForm;
