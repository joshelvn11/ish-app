import React, { useState } from "react";
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

function TaskTableRow(props) {
  // Get initial state values from props
  let [type, setType] = useState(props.type);
  let [name, setName] = useState(props.name);
  let [status, setStatus] = useState(props.status);
  let [priority, setPriority] = useState(props.priority);
  let [sprint, setSprint] = useState(props.sprint);
  let [dueDate, setDueDate] = useState(props.dueDate);

  return (
    <TableRow>
      <TableCell>
        <Badge>{type.typeDisplay}</Badge>
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <Badge>{status}</Badge>
      </TableCell>
      <TableCell>
        <Badge>{priority}</Badge>
      </TableCell>
      <TableCell>{sprint}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost">
          <EnterFullScreenIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TaskTableRow;
