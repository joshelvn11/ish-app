import React, { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";

const ProjectContext = React.createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  let [projects, setProjects] = useState([]);
  let [currentProject, setCurrentProject] = useState(null);

  const getProjects = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(`${apiUrl}/projects/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setProjects(data);
    }
  };

  const loadProject = (id) => {
    if (id) {
      // Load the project using the id if one is supplied
      setCurrentProject(projects.find((obj) => obj.id === id));
      // Save the id to local storage
      localStorage.setItem("currentProjectId", id);
    } else {
      if (localStorage.getItem("currentProjectId")) {
        // Load the project from local storage if available
        setCurrentProject(
          projects.find(
            (obj) => obj.id === Number(localStorage.getItem("currentProjectId"))
          )
        );
      } else {
        // Use the first project if no local storage item available
        setCurrentProject(projects[0]);
        localStorage.setItem("currentProjectId", projects[0].id);
      }
    }
  };

  let contextData = {
    projects: projects,
    currentProject: currentProject,
    loadProject: loadProject,
  };

  useEffect(() => {
    // Get Projects everytime auth tokens are refreshed
    getProjects();
  }, [authTokens]);

  useEffect(() => {
    // Load projects every time the projects state array is updated
    if (projects.length > 0) {
      loadProject();
    }
  }, [projects]);

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
