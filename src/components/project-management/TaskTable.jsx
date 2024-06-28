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
          allData.map((us) => (
            <TableRow>
              <TableCell className="font-medium">{us.name}</TableCell>
              <TableCell>
                <Badge>{us.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge>{us.type}</Badge>
              </TableCell>
              <TableCell>{us.sprint}</TableCell>
              <TableCell>{us.due_date}</TableCell>
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
