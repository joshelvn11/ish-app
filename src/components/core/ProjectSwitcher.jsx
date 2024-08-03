import { useContext, useEffect, useState } from "react";
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
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import ProjectForm from "@/components/project-management/forms/ProjectForm";

/**
 * ProjectSwitcher Component
 *
 * This component provides a dropdown menu for selecting a project from a list of projects.
 * It also includes functionality to open a dialog for creating a new project.
 *
 * @component
 */
function ProjectSwitcher() {
  // Extracting projects, loadProject function, and currentProject from ProjectContext
  const { projects, loadProject, currentProject } = useContext(ProjectContext);

  // State to manage the selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // State to manage the visibility of the dialog for creating a new project
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Updates the project context based on the selected value.
   * If the value is 0, it opens the dialog for creating a new project.
   * Otherwise, it loads the selected project.
   *
   * @param {number} value - The ID of the selected project or 0 for creating a new project.
   */
  const updateProjectContext = (value) => {
    if (value === 0) {
      // Value for creating project
      setIsDialogOpen(true);
    } else {
      loadProject(value);
    }
  };

  /**
   * Callback function to close the dialog.
   */
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  /**
   * useEffect hook to set the selected project when the current project in the projecc context changes
   */
  useEffect(() => {
    setSelectedProject(currentProject);
  }, [currentProject]);

  return (
    <>
      {/* Dropdown for selecting a project */}
      <Select
        value={selectedProject ? selectedProject.id : ""}
        onValueChange={updateProjectContext}
      >
        {/* Trigger for the dropdown */}
        <SelectTrigger className="w-[120px] sm:w-[180px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        {/* Content of the dropdown */}
        <SelectContent>
          {/* List of projects */}
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
          {/* Option to create a new project */}
          <SelectItem key={0} value={0}>
            <div className="flex items-center h-full gap-1">
              <PlusIcon />
              <p>Create project</p>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {/* Dialog for creating a new project */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p>Create new project</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {/* Form for creating a new project */}
          <ProjectForm closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectSwitcher;
