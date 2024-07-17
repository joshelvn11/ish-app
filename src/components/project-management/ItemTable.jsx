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
      if (props.filterOptions.sortBy === "STATUS") {
        let statusOrder = ["TO DO", "IN PROGRESS", "REVIEW", "DONE"];
        if (props.filterOptions.sortOrder === "DESC") {
          // Reverse the order if DESC
          statusOrder = statusOrder.reverse();
        }
        filteredItems = filteredItems.sort((a, b) => {
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
      } else if (props.filterOptions.sortBy === "PRIORITY") {
        let priorityOrder = ["OPTIONAL", "BENEFICIAL", "ESSENTIAL", "CRITICAL"];
        if (props.filterOptions.sortOrder === "DESC") {
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

      // Filter status
      if (props.filterOptions.filterSprint != "") {
        filteredItems = filteredItems.filter(
          (item) => item.sprint === props.filterOptions.filterSprint
        );
      }

      // Remove item types
      if (props.filterOptions.filterType.USER_STORY === false) {
        filteredItems = filteredItems.filter(
          (item) => item.item_type !== "USER STORY"
        );
      }
      if (props.filterOptions.filterType.TASK === false) {
        filteredItems = filteredItems.filter(
          (item) => item.item_type !== "TASK"
        );
      }
      if (props.filterOptions.filterType.DOCUMENTATION === false) {
        filteredItems = filteredItems.filter(
          (item) => item.item_type !== "DOCUMENTATION"
        );
      }
      if (props.filterOptions.filterType.BUG === false) {
        filteredItems = filteredItems.filter(
          (item) => item.item_type !== "BUG"
        );
      }

      // Remove item statuses
      if (props.filterOptions.filterStatus.TO_DO === false) {
        filteredItems = filteredItems.filter((item) => item.status !== "TO DO");
      }
      if (props.filterOptions.filterStatus.IN_PROGRESS === false) {
        filteredItems = filteredItems.filter(
          (item) => item.status !== "IN PROGRESS"
        );
      }
      if (props.filterOptions.filterStatus.REVIEW === false) {
        filteredItems = filteredItems.filter(
          (item) => item.status !== "REVIEW"
        );
      }
      if (props.filterOptions.filterStatus.DONE === false) {
        filteredItems = filteredItems.filter((item) => item.status !== "DONE");
      }

      // Remove item priorities
      if (props.filterOptions.filterPriority.OPTIONAL === false) {
        filteredItems = filteredItems.filter(
          (item) => item.priority !== "OPTIONAL"
        );
      }
      if (props.filterOptions.filterPriority.BENEFICIAL === false) {
        filteredItems = filteredItems.filter(
          (item) => item.priority !== "BENEFICIAL"
        );
      }
      if (props.filterOptions.filterPriority.ESSENTIAL === false) {
        filteredItems = filteredItems.filter(
          (item) => item.priority !== "ESSENTIAL"
        );
      }
      if (props.filterOptions.filterPriority.CRITICAL === false) {
        filteredItems = filteredItems.filter(
          (item) => item.priority !== "CRITICAL"
        );
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
