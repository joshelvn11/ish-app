import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ProjectContext from "@/context/ProjectContext";
import EpicCard from "@/components/project-management/EpicCard";
import { Skeleton } from "@/components/ui/skeleton";
import ItemsToolBar from "@/components/project-management/ItemsToolBar";

function BacklogPage() {
  const { authTokens } = useContext(AuthContext);
  const { currentProject, epicData, userStoryData } =
    useContext(ProjectContext);

  return (
    <div
      id="backlog-page"
      className="flex flex-col items-start justify-center w-full h-full"
    >
      <ItemsToolBar></ItemsToolBar>
      <div className="flex flex-col w-full h-full gap-3 p-3 overflow-y-auto">
        {epicData && userStoryData ? (
          <>
            {epicData.map((obj) => (
              <EpicCard
                key={obj.id}
                epicId={obj.id}
                title={obj.name}
                description={obj.description}
              ></EpicCard>
            ))}{" "}
            <EpicCard
              key={0}
              epicId={null}
              title={"No Epic"}
              description={"Items without an epic"}
            ></EpicCard>{" "}
          </>
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
