import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ProjectContext from "@/context/ProjectContext";
import EpicCard from "@/components/project-management/EpicCard";
import { Skeleton } from "@/components/ui/skeleton";
import ItemsToolBar from "@/components/project-management/ItemsToolBar";

function SprintPage() {
  const { authTokens } = useContext(AuthContext);
  const {
    sprintData,
    epicData,
    itemData,
    backlogFilterOptions,
    setBacklogFilterOptions,
  } = useContext(ProjectContext);

  return (
    <div
      id="sprint-page"
      className="flex flex-col items-start justify-center w-full h-full"
    >
      <ItemsToolBar
        filterOptions={backlogFilterOptions}
        setFilterOptions={setBacklogFilterOptions}
      ></ItemsToolBar>
      <div className="flex flex-col w-full h-full gap-3 p-3 overflow-y-auto">
        {epicData && itemData ? (
          <>
            {epicData.map((obj) => (
              <EpicCard
                key={obj.id}
                epicId={obj.id}
                title={obj.name}
                description={obj.description}
                priority={obj.priority}
                status={obj.status}
                filterOptions={backlogFilterOptions}
              ></EpicCard>
            ))}{" "}
            {itemData && itemData.some((item) => item.epic == null) && (
              <EpicCard
                key={0}
                epicId={null}
                title={"No Epic"}
                description={"Items without an epic"}
                filterOptions={backlogFilterOptions}
              ></EpicCard>
            )}
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
