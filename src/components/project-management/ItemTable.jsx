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
  const { currentProject, epicData, itemData, filterOptions } =
    useContext(ProjectContext);

  // Set state values
  let [filteredData, setFilteredData] = useState(null);

  // Use effect hook to collate and filter item data
  useEffect(() => {
    // Only run filterting when all required data is loaded
    if (currentProject && epicData && itemData) {
      console.log("Reloading item data");

      let filteredItems;

      // Filter data by grouping propery
      if (props.groupBy == "EPIC") {
        // Retrieve all the user stories matching the epic id
        filteredItems = itemData.filter((item) => item.epic === props.groupId);
      }
      setFilteredData(filteredItems);
    }
  }, [currentProject, epicData, itemData]);

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
          filteredData.map((item, index) => (
            <ItemTableRow
              key={index}
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
