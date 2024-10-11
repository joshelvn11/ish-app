import React, { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const ProjectContext = React.createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const { pb, authTokens } = useContext(AuthContext);
  const { toast } = useToast();
  let [projects, setProjects] = useState([]);
  let [currentProject, setCurrentProject] = useState(null);
  let [epicData, setEpicData] = useState(null);
  let [sprintData, setSprintData] = useState(null);
  let [itemData, setItemData] = useState(null);
  let [backlogFilterOptions, setBacklogFilterOptions] = useState({
    sortBy: "",
    sortOrder: "",
    filterType: {
      USER_STORY: true,
      TASK: true,
      DOCUMENTATION: true,
      BUG: true,
    },
    filterStatus: {
      TO_DO: true,
      IN_PROGRESS: true,
      REVIEW: true,
      DONE: true,
    },
    filterPriority: {
      OPTIONAL: true,
      BENEFICIAL: true,
      ESSENTIAL: true,
      CRITICAL: true,
    },
    filterSprint: "",
    hideEmptyEpics: false,
  });

  const getProjects = async () => {
    try {
      const response = await pb.collection("project").getFullList({
        filter: `owner = "${pb.authStore.model.id}"`
      });
      setProjects(response);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch projects. Please try again later.",
      });
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
            (obj) => obj.id === localStorage.getItem("currentProjectId")
          )
        );
      } else {
        // Use the first project if no local storage item available
        setCurrentProject(projects[0]);
        localStorage.setItem("currentProjectId", projects[0].id);
      }
    }
  };

  const getUserProjectSettings = async () => {
    try {
      const response = await pb.collection("user_project_settings").getFullList({
        filter: `owner = "${pb.authStore.model.id}"`
      });
      setProjects(response);
    } catch (error) {
      console.error("Error fetching user project settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch project settings. Please try again later.",
      });
    }
  };

  const updateUserProjectSettings = async () => {
    if (currentProject) {
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/user-settings/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            backlog_filter_options: backlogFilterOptions,
          }),
        }
      );
      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Problem saving filter options",
        });
      }
    }
  };

  const getEpicData = async () => {
    try {
      const response = await pb.collection("epic").getFullList({
        filter: `project = "${currentProject.id}"`
      });
      setEpicData(response);
    } catch (error) {
      console.error("Error fetching epic data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch epics. Please try again later.",
      });
    }
  };

  const deleteEpic = async (epicId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(
      `${apiUrl}/projects/${currentProject.id}/epics/${epicId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    //let data = await response.json();
    if (response.status === 204) {
      toast({ description: "Epic deleted successfully!" });
      // Refresh epic data
      getEpicData();
    } else {
      toast({ variant: "destructive", description: "Error deleting epic" });
    }
  };

  const getSprintData = async () => {
    if (currentProject) {
      try {
        const response = await pb.collection("sprint").getFullList({
          filter: `project = "${currentProject.id}"`
        });
        setSprintData(response);
      } catch (error) {
        console.error("Error fetching sprint data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch sprint data. Please try again later.",
        });
      }
    }
  };

  const getItemData = async () => {
    try {
      const response = await pb.collection("issue").getFullList({
        filter: `project = "${currentProject.id}"`
      });
      setItemData(response);
      console.log("Issues",response);
    } catch (error) {
      console.error("Error fetching issue data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch issues. Please try again later.",
      });
    }
  };

  useEffect(() => {
    // Load available projects
    getProjects();
  }, []);

  useEffect(() => {
    // Load projects every time the projects state array is updated (i.e when projects are loaded)
    if (projects.length > 0) {
      loadProject();
    }
  }, [projects]);

  useEffect(() => {
    if (currentProject) {
      // Load or reload the project task data whenever the current project changes
      setEpicData(null);
      setSprintData(null);
      setItemData(null);
      getUserProjectSettings();
      getEpicData();
      getSprintData();
      getItemData();
    }
  }, [currentProject]);

  useEffect(() => {
    updateUserProjectSettings();
  }, [backlogFilterOptions]);

  let contextData = {
    projects: projects,
    getProjects: getProjects,
    currentProject: currentProject,
    loadProject: loadProject,
    sprintData: sprintData,
    getSprintData: getSprintData,
    epicData: epicData,
    getEpicData: getEpicData,
    deleteEpic: deleteEpic,
    sprintData: sprintData,
    itemData: itemData,
    getItemData: getItemData,
    backlogFilterOptions: backlogFilterOptions,
    setBacklogFilterOptions: setBacklogFilterOptions,
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
