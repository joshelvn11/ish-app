import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ProjectContext from "@/context/ProjectContext";
import EpicCard from "@/components/project-management/EpicCard";
import { Skeleton } from "@/components/ui/skeleton";

function BacklogPage() {
  const { authTokens } = useContext(AuthContext);
  const { currentProject, epicData, userStoryData } =
    useContext(ProjectContext);

  return (
    <div
      id="backlog-page"
      className="flex items-start justify-center w-full h-full"
    >
      <div className="flex flex-col w-full h-full gap-3">
        {epicData && userStoryData ? (
          epicData.map((obj) => (
            <EpicCard
              key={obj.id}
              epicId={obj.id}
              title={obj.name}
              description={obj.description}
              userStories={userStoryData.filter((us) => us.epic === obj.id)}
            ></EpicCard>
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[200px] rounded-xl" />
            <Skeleton className="w-full h-[200px] rounded-xl opacity-75" />
            <Skeleton className="w-full h-[200px] rounded-xl opacity-50" />
            <Skeleton className="w-full h-[200px] rounded-xl opacity-25" />
          </>
        )}
      </div>
    </div>
  );
}

export default BacklogPage;
