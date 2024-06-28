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
import { Button } from "@/components/ui/button";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

function TaskTable(props) {
  // Get context properties
  const { currentProject, epicData, userStoryData, filterOptions } =
    useContext(ProjectContext);

  // Set state values
  let [allData, setAllData] = useState(null);

  // Use effect hook to collate and filter task and user story data
  useEffect(() => {
    // Only run filterting when all required data is loaded
    if (currentProject && epicData && userStoryData) {
      let userStories;

      // Filter data by grouping propery
      if (props.groupBy == "EPIC") {
        // Retrieve all the user stories matching the epic id
        userStories = userStoryData.filter((us) => us.epic === props.groupId);
        console.log("User stories: ", userStories);

        // Add the type property to user stories
        userStories = userStories.map((us) => {
          return { ...us, type: "User Story" };
        });
      }

      // Update state only if the filtered data has changed
      setAllData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(userStories)) {
          return userStories;
        }
        return prevData;
      });
    }
  }, [currentProject, epicData, userStoryData]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Sprint</TableHead>
          <TableHead className="">Due Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allData &&
          allData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell>
                <Badge>{data.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge>{data.type}</Badge>
              </TableCell>
              <TableCell>{data.sprint}</TableCell>
              <TableCell>{data.due_date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost">
                  <EnterFullScreenIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost">
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default TaskTable;
