import React, { useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProjectSwitcher() {
  const { projects } = useContext(ProjectContext);
  return (
    <Select>
      <SelectTrigger className="w-[120px] sm:w-[180px]">
        <SelectValue placeholder="Project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProjectSwitcher;
