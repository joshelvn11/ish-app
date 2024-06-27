import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ProjectContext from "@/context/ProjectContext";
import EpicCard from "@/components/project-management/EpicCard";
import { Skeleton } from "@/components/ui/skeleton";

function BacklogPage() {
  const { authTokens } = useContext(AuthContext);
  const { currentProject } = useContext(ProjectContext);

  let [epicData, setEpicData] = useState(null);
  let [userStoryData, setUserStoryData] = useState(null);

  const getEpicData = async () => {
    if (currentProject) {
      // Attempt to get epic data if current project is not falsey
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/epics/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        setEpicData(data);
      }
    }
  };

  useEffect(() => {
    getEpicData();
  }, [currentProject]);

  return (
    <div
      id="backlog-page"
      className="flex items-start justify-center w-full h-full"
    >
      <div className="flex flex-col w-full h-full gap-3">
        {epicData ? (
          epicData.map((obj, index) => (
            <EpicCard
              key={index}
              title={obj.name}
              description={obj.description}
            ></EpicCard>
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[100px] rounded-xl" />
            <Skeleton className="w-full h-[100px] rounded-xl opacity-75" />
            <Skeleton className="w-full h-[100px] rounded-xl opacity-50" />
            <Skeleton className="w-full h-[100px] rounded-xl opacity-25" />
          </>
        )}
      </div>
    </div>
  );
}

export default BacklogPage;
