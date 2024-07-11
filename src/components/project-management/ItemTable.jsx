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
import ItemTableRow from "@/components/project-management/ItemTableRow";

function ItemTable(props) {
  // Get context properties
  const { currentProject, epicData, itemData, backlogFilterOptions } =
    useContext(ProjectContext);

  // Set state values
  let [filteredData, setFilteredData] = useState(null);

  // Use effect hook to collate and filter item data
  useEffect(() => {
    // Only run filterting when all required data is loaded
    if (currentProject && epicData && itemData) {
      let filteredItems;

      // Retrieve all the user stories matching the epic id
      filteredItems = itemData.filter((item) => item.epic === props.groupId);

      // Sort by status
      if (backlogFilterOptions.sortBy === "STATUS") {
        let statusOrder = ["TO DO", "IN PROGRESS", "REVIEW", "DONE"];
        if (backlogFilterOptions.sortOrder === "DESC") {
          // Reverse the order if DESC
          statusOrder = statusOrder.reverse();
        }
        filteredItems = filteredItems.sort((a, b) => {
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
      } else if (backlogFilterOptions.sortBy === "PRIORITY") {
        let priorityOrder = ["OPTIONAL", "BENEFICIAL", "ESSENTIAL", "CRITICAL"];
        if (backlogFilterOptions.sortOrder === "DESC") {
          // Reverse the order if DESC
          priorityOrder = priorityOrder.reverse();
        }
        filteredItems = filteredItems.sort((a, b) => {
          return (
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
          );
        });
      }

      setFilteredData(filteredItems);
    }
  }, [currentProject, epicData, itemData, backlogFilterOptions]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Type</TableHead>
          <TableHead className="w-[300px] max-w-[350px]">Title</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
          <TableHead className="w-[150px]">Priority</TableHead>
          <TableHead>Sprint</TableHead>
          <TableHead className="">Due Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData &&
          filteredData.map((item) => (
            <ItemTableRow
              key={item.id}
              id={item.id}
              type={item.item_type}
              name={item.name}
              epic={item.epic}
              description={item.description}
              status={item.status}
              priority={item.priority}
              sprint={item.sprint}
              duedate={item.due_date}
              userStory={item.user_story}
              acceptanceCriteria={item.acceptance_criteria}
              subtasks={item.subtasks}
            />
          ))}
      </TableBody>
    </Table>
  );
}

export default ItemTable;
