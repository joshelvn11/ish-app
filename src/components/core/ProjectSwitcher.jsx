import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "@/context/ProjectContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";

function ProjectSwitcher() {
  const { projects, loadProject, currentProject } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);

  const updateProjectContext = (value) => {
    loadProject(value);
  };

  useEffect(() => {
    // Set the selected project every time the current project in the project context changes
    setSelectedProject(currentProject);
  }, [currentProject]);

  return (
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
  );
}

export default ProjectSwitcher;
