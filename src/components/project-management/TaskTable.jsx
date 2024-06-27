import React from "react";
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

function TaskTable(props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Sprint</TableHead>
          <TableHead className="">Due Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.userStories &&
          props.userStories.map((us) => (
            <TableRow>
              <TableCell className="font-medium">{us.name}</TableCell>
              <TableCell>User Story</TableCell>
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
