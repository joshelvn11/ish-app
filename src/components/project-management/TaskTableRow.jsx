import React, { useState, useContext } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EnterFullScreenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

function TaskTableRow(props) {
  // Get context data
  const { sprintData } = useContext(ProjectContext);

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
      <TableCell>
        <Select value={sprint ? sprint : ""}>
          <SelectTrigger className="w-[120px] sm:w-[180px]">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprintData &&
              sprintData.map((sprint) => (
                <SelectItem key={sprint.id} value={sprint.id}>
                  {sprint.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </TableCell>
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
