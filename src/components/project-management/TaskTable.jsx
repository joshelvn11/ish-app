import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "@/context/ProjectContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskTableRow from "@/components/project-management/TaskTableRow";

function TaskTable(props) {
  // Get context properties
  const { currentProject, epicData, userStoryData, taskData, filterOptions } =
    useContext(ProjectContext);

  // Set state values
  let [allData, setAllData] = useState(null);

  // Use effect hook to collate and filter item data
  useEffect(() => {
    // Only run filterting when all required data is loaded
    if (currentProject && epicData && userStoryData && taskData) {
      let userStories;
      let tasks;

      // Filter data by grouping propery
      if (props.groupBy == "EPIC") {
        // Retrieve all the user stories matching the epic id
        userStories = userStoryData.filter((us) => us.epic === props.groupId);

        // Add the type property to user stories
        userStories = userStories.map((us) => {
          return {
            ...us,
            type: {
              type: "USERSTORY",
              typeDisplay: "User Story",
            },
          };
        });

        // Retrieve all the tasks matching the epic id
        tasks = taskData.filter((task) => task.epic === props.groupId);

        // Add the type property to tasks
        tasks = tasks.map((task) => {
          return {
            ...task,
            type: {
              type: "task",
              typeDisplay: "Task",
            },
          };
        });
      }

      // Update state only if the filtered data has changed
      //   setAllData((prevData) => {
      //     if (JSON.stringify(prevData) !== JSON.stringify(userStories)) {
      //       return userStories;
      //     }
      //     return prevData;
      //   });

      // Collate the data based on filter options
      let collatedData = [];

      if (true) {
        collatedData = [...collatedData, ...userStories];
      }

      if (true) {
        collatedData = [...collatedData, ...tasks];
      }
      setAllData(collatedData);
    }
  }, [currentProject, epicData, userStoryData]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead className="w-[300px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Sprint</TableHead>
          <TableHead className="">Due Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allData &&
          allData.map((data, index) => (
            <TaskTableRow
              key={index}
              id={data.id}
              type={data.type}
              name={data.name}
              epic={data.epic}
              description={data.description}
              status={data.status}
              priority={data.priority}
              sprint={data.sprint}
              duedate={data.due_date}
              userStory={data.user_story}
              acceptanceCriteria={data.acceptance_criteria}
              subtasks={data.subtasks}
            />
          ))}
      </TableBody>
    </Table>
  );
}

export default TaskTable;
