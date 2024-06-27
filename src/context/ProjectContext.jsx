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

  let contextData = {
    projects: projects,
  };

  useEffect(() => {
    getProjects();
  }, [authTokens]);

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
