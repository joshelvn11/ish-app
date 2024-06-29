import React, { useState, useContext } from "react";
import ProjectContext from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ExclamationTriangleIcon,
  RocketIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function EpicForm(props) {
  const { currrentProject } = useContext(ProjectContext);

  let [create, setCreate] = useState(props.create);
  let [validationErrors, setValidationErrors] = useState([]);

  // Form data state
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [priority, setPriority] = useState("");
  let [status, setStatus] = useState("");

  const validateData = () => {
    let valid = true;
    setValidationErrors([]);
    let errors = [];
    if (name === "") {
      errors.push("Please enter a valid title");
      valid = false;
    }

    if (name.length > 256) {
      errors.push("Title may not be longer than 256 characters");
      valid = false;
    }
    setValidationErrors(errors);
    return valid;
  };

  const updateEpic = (e) => {
    e.preventDefault();
    validateData();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Errors</AlertTitle>
            <AlertDescription>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={updateEpic}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[150px]">
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPTIONAL">
                    <Badge className="bg-blue-500">OPTIONAL</Badge>
                  </SelectItem>
                  <SelectItem value="BENEFICIAL">
                    <Badge className="bg-emerald-600">BENEFICIAL</Badge>
                  </SelectItem>
                  <SelectItem value="ESSENTIAL">
                    <Badge className="bg-amber-500">ESSENTIAL</Badge>
                  </SelectItem>
                  <SelectItem value="CRITICAL">
                    <Badge className="bg-red-600">CRITICAL</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[150px]">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TO DO">
                    <Badge className="bg-red-600">TO DO</Badge>
                  </SelectItem>
                  <SelectItem value="IN PROGRESS">
                    <Badge className="bg-amber-500">IN PROGRESS</Badge>
                  </SelectItem>
                  <SelectItem value="REVIEW">
                    <Badge className="bg-blue-500">REVIEW</Badge>
                  </SelectItem>
                  <SelectItem value="DONE">
                    <Badge className="bg-emerald-600">DONE</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {create ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EpicForm;
