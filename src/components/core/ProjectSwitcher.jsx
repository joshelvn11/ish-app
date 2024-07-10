import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "@/context/ProjectContext";
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
import { PlusIcon } from "@radix-ui/react-icons";
import ProjectForm from "@/components/project-management/forms/ProjectForm";

function ProjectSwitcher() {
  const { projects, loadProject, currentProject } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateProjectContext = (value) => {
    if (value === 0) {
      // Value for creating project
      setIsDialogOpen(true);
    } else {
      loadProject(value);
    }
  };

  // Callback function to close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    // Set the selected project every time the current project in the project context changes
    setSelectedProject(currentProject);
  }, [currentProject]);

  return (
    <>
      <Select
        value={selectedProject ? selectedProject.id : ""}
        onValueChange={updateProjectContext}
      >
        <SelectTrigger className="w-[120px] sm:w-[180px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
          <SelectItem key={0} value={0}>
            <div className="flex items-center h-full gap-1">
              <PlusIcon />
              <p>Create project</p>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>Create new project</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ProjectForm closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectSwitcher;
