import React, { useState, useContext, useEffect } from "react";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ExclamationTriangleIcon,
  PlusCircledIcon,
  RocketIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

function UserStoryForm(props) {
  const { currentProject, getEpicData } = useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [create, setCreate] = useState(props.create);
  let [validationErrors, setValidationErrors] = useState([]);
  let [epicId, setEpicId] = useState(props.epicId);

  // Form data state
  let [name, setName] = useState(props.title ?? "");
  let [description, setDescription] = useState(props.description ?? "");
  let [userStory, setUserStory] = useState(null);
  let [acceptanceCriteria, setAcceptanceCriteria] = useState([]);
  let [newAcceptanceCriteria, setNewAcceptanceCriteria] = useState("");
  let [creatingAcceptanceCriteria, setCreatingAcceptanceCriteria] =
    useState(false);
  let [subtasks, setSubtasks] = useState([]);
  let [newSubstask, setNewSubtask] = useState("");
  let [creatingSubtasks, setCreatingSubtasks] = useState(false);
  let [priority, setPriority] = useState(props.priority);
  let [status, setStatus] = useState(props.status);

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

  const updateEpic = async (e) => {
    e.preventDefault();
    if (!validateData()) {
      return;
    }

    if (create) {
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/epics/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            project: currentProject.id,
            name: name,
            description: description,
            priority: priority,
            status: status,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 201) {
        toast({ description: "Epic created successfully!" });
        // Set the new epic id to the id returned in the respinse
        setEpicId(data.id);
        // Refresh epic data
        getEpicData();
        // Set to update mode
        setCreate(false);
      } else {
        console.log(data);
        toast({ variant: "destructive", description: "Error creating epic" });
      }
    } else {
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/epics/${epicId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            project: currentProject.id,
            name: name,
            description: description,
            priority: priority,
            status: status,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Epic updated successfully!" });
        // Refresh epic data
        getEpicData();
      } else {
        console.log(data);
        toast({ variant: "destructive", description: "Error updating epic" });
      }
    }
  };

  const saveNewAcceptanceCriteria = async () => {
    // Create a new acceptance criteria ID
    const generateRandomId = () => {
      // Generate random id
      let newId = Math.floor(100000 + Math.random() * 900000);
      // Check if the new id is unqiue
      if (acceptanceCriteria.some((item) => item.id === newId)) {
        // If not recrusively call the function
        generateRandomId();
      } else {
        // If it is unqiue return the id
        return newId;
      }
    };

    const id = generateRandomId();

    // Create new acceptance criteria JSON object
    const object = { id: id, criteria: newAcceptanceCriteria, done: false };

    // Append the new acceptance criteria to the acceptance criteria state array
    setAcceptanceCriteria([...acceptanceCriteria, object]);

    // Reset variables
    setCreatingAcceptanceCriteria(false);
    setNewAcceptanceCriteria("");
  };

  const saveNewSubtask = async () => {
    // Create a new subtask ID
    const generateRandomId = () => {
      // Generate random id
      let newId = Math.floor(100000 + Math.random() * 900000);
      // Check if the new id is unqiue
      if (subtasks.some((item) => item.id === newId)) {
        // If not recrusively call the function
        generateRandomId();
      } else {
        // If it is unqiue return the id
        return newId;
      }
    };

    const id = generateRandomId();

    // Create new subtask JSON object
    const object = { id: id, task: newSubstask, done: false };

    // Append the new substask to the acceptance subtask array
    setSubtasks([...subtasks, object]);

    // Reset variables
    setCreatingSubtasks(false);
    setNewSubtask("");
  };

  const updateAcceptanceCriteriaDone = async (id) => {
    setAcceptanceCriteria(
      acceptanceCriteria.map((item) =>
        item.id === id ? { ...item, ["done"]: !item.done } : item
      )
    );
  };

  const updateSubtaskDone = async (id) => {
    setNewSubtask(
      subtasks.map((item) =>
        item.id === id ? { ...item, ["done"]: !item.done } : item
      )
    );
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
              <Label className="text-md" htmlFor="name">
                Title
              </Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
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
            <div className="space-y-2">
              <Label className="text-md" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-md" htmlFor="userstory">
                User Story
              </Label>
              <Textarea
                id="userstory"
                type="text"
                value={userStory}
                onChange={(e) => setUserStory(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between w-full">
                <Label className="text-md" htmlFor="acceptance-criteria">
                  Acceptance Criteria
                </Label>
                <Button
                  size="sm"
                  onClick={() => {
                    setCreatingAcceptanceCriteria(true);
                  }}
                >
                  Add
                </Button>
              </div>
              {acceptanceCriteria &&
                acceptanceCriteria.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={item.done}
                      onClick={() => {
                        updateAcceptanceCriteriaDone(item.id);
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className={`${
                        item.done && "line-through text-gray-500"
                      } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    >
                      {item.criteria}
                    </label>
                  </div>
                ))}
              {creatingAcceptanceCriteria && (
                <div className="relative">
                  <Input
                    value={newAcceptanceCriteria}
                    onChange={(e) => setNewAcceptanceCriteria(e.target.value)}
                  ></Input>
                  <Button
                    onClick={saveNewAcceptanceCriteria}
                    variant="ghost"
                    size="sm"
                    className="absolute transform -translate-y-1/2 right-0.5 top-1/2"
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
            <div id="subtasks-wrapper" className="space-y-2">
              <div className="flex items-center justify-between w-full">
                <Label className="text-md" htmlFor="subtasks">
                  Subtasks
                </Label>
                <Button
                  size="sm"
                  onClick={() => {
                    setCreatingSubtasks(true);
                  }}
                >
                  Add
                </Button>
              </div>
              {subtasks &&
                subtasks.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={item.done}
                      onClick={() => {
                        updateSubtaskDone(item.id);
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className={`${
                        item.done && "line-through text-gray-500"
                      } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    >
                      {item.task}
                    </label>
                  </div>
                ))}
              {creatingSubtasks && (
                <div className="relative">
                  <Input
                    value={newSubstask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                  ></Input>
                  <Button
                    onClick={saveNewSubtask}
                    variant="ghost"
                    size="sm"
                    className="absolute transform -translate-y-1/2 right-0.5 top-1/2"
                  >
                    Save
                  </Button>
                </div>
              )}
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

export default UserStoryForm;
