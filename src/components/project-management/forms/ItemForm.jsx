import React, { useState, useContext, useEffect, useRef } from "react";
import ProjectContext from "@/context/ProjectContext";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExclamationTriangleIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pencil } from "lucide-react";

function ItemForm(props) {
  const { currentProject, getItemData, epicData, sprintData } =
    useContext(ProjectContext);
  const { authTokens } = useContext(AuthContext);
  const { toast } = useToast();

  let [create, setCreate] = useState(props.create);
  let [validationErrors, setValidationErrors] = useState([]);
  let [userStoryId, setUserStoryId] = useState(props.id);

  // Form data state
  let [name, setName] = useState(props.name ?? "");
  let [epic, setEpic] = useState(props.epic ?? null);
  let [description, setDescription] = useState(props.description ?? "");
  let [editingDescription, setEditingDescription] = useState(false);
  let [userStory, setUserStory] = useState(props.userStory);
  let [editingUserStory, setEditingUserStory] = useState(false);
  let [acceptanceCriteria, setAcceptanceCriteria] = useState(
    props.acceptanceCriteria ?? []
  );
  let [newAcceptanceCriteria, setNewAcceptanceCriteria] = useState("");
  let [creatingAcceptanceCriteria, setCreatingAcceptanceCriteria] =
    useState(false);
  let [editingAcceptanceCriteria, setEditingAcceptanceCriteria] =
    useState(null);
  let acceptanceCriteriaInputRef = useRef(null);
  let [subtasks, setSubtasks] = useState(props.subtasks ?? []);
  let [newSubstask, setNewSubtask] = useState("");
  let [creatingSubtasks, setCreatingSubtasks] = useState(false);
  let [editingSubtask, setEditingSubtask] = useState(null);
  let subtaskInputRef = useRef(null);
  let [duedate, setDuedate] = useState(props.duedate);
  let [priority, setPriority] = useState(props.priority ?? "");
  let [status, setStatus] = useState(props.status ?? "");
  let [sprint, setSprint] = useState(props.sprint ?? "");

  const formatDate = (date) => {
    if (date) {
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  const saveDescription = async () => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            description: description,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Description updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: "Problem updating description",
        });
      }
    }
  };

  const updateUserStory = async () => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            user_story: userStory,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "User Story updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating user story: ${JSON.stringify(data)}`,
        });
      }
    }
  };

  const updateEpic = async (value) => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            epic: value,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Epic updated" });
        setEpic(value);
        getItemData();
      } else {
        toast({
          variant: "destructive",
          description: "Problem updating epic",
        });
      }
    } else {
      setEpic(value);
    }
  };

  const updatePriority = async (value) => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            priority: value,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Priority updated" });
        setPriority(value);
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating priority: ${JSON.stringify(data)}`,
        });
      }
    } else {
      setPriority(value);
    }
  };

  const updateDueDate = async (value) => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            due_date: formatDate(value),
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Due date updated" });
        setDuedate(value);
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating due date: ${JSON.stringify(data)}`,
        });
      }
    } else {
      setDuedate(value);
    }
  };

  const updateStatus = async (value) => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            status: value,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Status updated" });
        setStatus(value);
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating status: ${JSON.stringify(data)}`,
        });
      }
    } else {
      setStatus(value);
    }
  };

  const updateSprint = async (value) => {
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            sprint: value,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Sprint updated" });
        setSprint(value);
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating spint: ${JSON.stringify(data)}`,
        });
      }
    } else {
      setSprint(value);
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

    // Create new array of acceptance criteria
    const newAcceptanceCriteriaArray = [...acceptanceCriteria, object];

    // Attempt to update the value on the server
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            acceptance_criteria: newAcceptanceCriteriaArray,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Acceptance criteria updated" });
        setAcceptanceCriteria([...acceptanceCriteria, object]);
        // Reset variables
        setCreatingAcceptanceCriteria(false);
        setNewAcceptanceCriteria("");
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating acceptance criteria: ${JSON.stringify(
            data
          )}`,
        });
      }
    } else {
      setAcceptanceCriteria([...acceptanceCriteria, object]);
      setNewAcceptanceCriteria("");
    }
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

    // Create an updated array
    const updatedSubstasksArray = [...subtasks, object];

    // Attempt to update the value on the server
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            subtasks: updatedSubstasksArray,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Subtasks updated" });
        setSubtasks(updatedSubstasksArray);
        // Reset variables
        setCreatingSubtasks(false);
        setNewSubtask("");
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating subtasks: ${JSON.stringify(data)}`,
        });
      }
    } else {
      setSubtasks(updatedSubstasksArray);
      setNewSubtask("");
    }
  };

  const updateAcceptanceCriteriaDone = async (id) => {
    const updatedAcceptanceCriteria = acceptanceCriteria.map((item) =>
      item.id === id ? { ...item, ["done"]: !item.done } : item
    );
    setAcceptanceCriteria(updatedAcceptanceCriteria);
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            acceptance_criteria: updatedAcceptanceCriteria,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Acceptance criteria updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating acceptance criteria: ${JSON.stringify(
            data
          )}`,
        });
      }
    }
  };

  const updateAcceptanceCriteriaItem = async () => {
    const inputValue = acceptanceCriteriaInputRef.current.value;

    const updatedAcceptanceCriteria = acceptanceCriteria.map((item) =>
      item.id === editingAcceptanceCriteria
        ? { ...item, ["criteria"]: inputValue }
        : item
    );

    setEditingAcceptanceCriteria(null);

    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            acceptance_criteria: updatedAcceptanceCriteria,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Acceptance criteria updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating acceptance criteria: ${JSON.stringify(
            data
          )}`,
        });
      }
    }

    setAcceptanceCriteria(updatedAcceptanceCriteria);
  };

  const deleteAcceptanceCriteriaItem = async (id) => {
    const updatedAcceptanceCriteria = acceptanceCriteria.filter(
      (item) => item.id !== id
    );

    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            acceptance_criteria: updatedAcceptanceCriteria,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Acceptance criteria updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating acceptance criteria: ${JSON.stringify(
            data
          )}`,
        });
      }
    }

    setAcceptanceCriteria(updatedAcceptanceCriteria);
  };

  const updateSubtaskItem = async () => {
    const inputValue = subtaskInputRef.current.value;

    const updatedSubtasks = subtasks.map((item) =>
      item.id === editingSubtask ? { ...item, ["task"]: inputValue } : item
    );

    setEditingSubtask(null);

    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            subtasks: updatedSubtasks,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Subtask updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating subtask: ${JSON.stringify(data)}`,
        });
      }
    }

    setSubtasks(updatedSubtasks);
  };

  const deleteSubtaskItem = async (id) => {
    const updatedSubtasks = subtasks.filter((item) => item.id !== id);

    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            subtasks: updatedSubtasks,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating deleting subtask: ${JSON.stringify(
            data
          )}`,
        });
      }
    }

    setSubtasks(updatedSubtasks);
  };

  const updateSubtaskDone = async (id) => {
    const updatedSubtasks = subtasks.map((item) =>
      item.id === id ? { ...item, ["done"]: !item.done } : item
    );
    setSubtasks(updatedSubtasks);
    if (!create) {
      // Only attempt update if not in create mode
      const apiUrl = import.meta.env.VITE_API_URL;
      let response = await fetch(
        `${apiUrl}/projects/${currentProject.id}/items/${userStoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            subtasks: updatedSubtasks,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        toast({ description: "Subtasks updated" });
        props.fetchItemData();
      } else {
        toast({
          variant: "destructive",
          description: `Problem updating subtasks: ${JSON.stringify(data)}`,
        });
      }
    }
  };

  const createUserStory = async (name) => {
    // Make API request
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(
      `${apiUrl}/projects/${currentProject.id}/items/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          project: currentProject.id,
          name: name,
          epic: epic,
          sprint: sprint,
          description: description,
          user_story: userStory,
          acceptance_criteria: acceptanceCriteria,
          subtasks: subtasks,
          due_date: formatDate(duedate),
          priority: priority,
          status: status,
        }),
      }
    );
    let data = await response.json();
    if (response.status === 201) {
      toast({ description: "User story created successfully" });
      // Set the user story id to the newly created id
      setUserStoryId(data.id);
      // Refresh user story data
      getItemData();
      // Set to update mode
      setCreate(false);
      // Close the dialog
      props.closeDialog();
    } else {
      toast({
        variant: "destructive",
        description: `Problem creating user story: ${JSON.stringify(data)}`,
      });
    }
  };

  return (
    <div
      id="user-story-form-container"
      className="max-h-[75vh] space-y-4 overflow-y-scroll px-2"
    >
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
          <div className="flex flex-wrap gap-2">
            <Select value={priority} onValueChange={updatePriority}>
              <SelectTrigger className="w-[120px] sm:w-[150px]">
                <SelectValue placeholder="Select priority..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPTIONAL">
                  <Badge className="bg-optional">OPTIONAL</Badge>
                </SelectItem>
                <SelectItem value="BENEFICIAL">
                  <Badge className="bg-beneficial">BENEFICIAL</Badge>
                </SelectItem>
                <SelectItem value="ESSENTIAL">
                  <Badge className="bg-essential">ESSENTIAL</Badge>
                </SelectItem>
                <SelectItem value="CRITICAL">
                  <Badge className="bg-critical">CRITICAL</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={updateStatus}>
              <SelectTrigger className="w-[120px] sm:w-[150px]">
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TO DO">
                  <Badge className="bg-todo">TO DO</Badge>
                </SelectItem>
                <SelectItem value="IN PROGRESS">
                  <Badge className="bg-inprogress">IN PROGRESS</Badge>
                </SelectItem>
                <SelectItem value="REVIEW">
                  <Badge className="bg-review">REVIEW</Badge>
                </SelectItem>
                <SelectItem value="DONE">
                  <Badge className="bg-done">DONE</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !duedate && "text-muted-foreground"
                  )}
                >
                  {duedate ? (
                    format(duedate, "PPP")
                  ) : (
                    <span>Select due date</span>
                  )}
                  <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={duedate}
                  onSelect={(date) => {
                    updateDueDate(date);
                  }}
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              value={epic ?? ""}
              onValueChange={updateEpic}
              className="w-full sm:w-full"
            >
              <SelectTrigger className="w-[120px] sm:w-[150px]">
                <SelectValue placeholder="Select epic..." />
              </SelectTrigger>
              <SelectContent>
                {epicData &&
                  epicData.map((epic) => (
                    <SelectItem value={epic.id} key={epic.id}>
                      {epic.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              value={sprint ?? ""}
              onValueChange={updateSprint}
              className="w-full sm:w-full"
            >
              <SelectTrigger className="w-[120px] sm:w-[150px]">
                <SelectValue placeholder="Select sprint..." />
              </SelectTrigger>
              <SelectContent>
                {sprintData &&
                  sprintData.map((sprint) => (
                    <SelectItem value={sprint.id} key={sprint.id}>
                      {sprint.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">
              <Label className="text-md" htmlFor="description">
                Description
              </Label>
              <Button
                size="sm"
                onClick={() => {
                  setEditingDescription(!editingDescription);
                  editingDescription && saveDescription();
                }}
              >
                {editingDescription ? "Save" : "Edit"}
              </Button>
            </div>
            <Textarea
              id="description"
              type="text"
              value={description}
              readOnly={!editingDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">
              <Label className="text-md" htmlFor="userstory">
                User Story
              </Label>
              <Button
                size="sm"
                onClick={() => {
                  setEditingUserStory(!editingUserStory);
                  editingUserStory && updateUserStory();
                }}
              >
                {editingUserStory ? "Save" : "Edit"}
              </Button>
            </div>
            <Textarea
              id="userstory"
              type="text"
              value={userStory}
              readOnly={!editingUserStory}
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
                <div
                  key={item.id}
                  className="relative flex items-center space-x-2 group"
                >
                  <Checkbox
                    id={item.id}
                    checked={item.done}
                    onClick={() => {
                      updateAcceptanceCriteriaDone(item.id);
                    }}
                  />
                  <div className="relative w-full">
                    <Input
                      defaultValue={item.criteria}
                      htmlFor={item.id}
                      readOnly={!(editingAcceptanceCriteria === item.id)}
                      ref={
                        editingAcceptanceCriteria === item.id
                          ? acceptanceCriteriaInputRef
                          : null
                      }
                      className={`${
                        item.done && "line-through text-gray-500"
                      } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    />
                    <div className="absolute transform -translate-y-1/2 right-0.5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!(editingAcceptanceCriteria === item.id) && (
                        <>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setEditingAcceptanceCriteria(item.id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              deleteAcceptanceCriteriaItem(item.id);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      {editingAcceptanceCriteria === item.id && (
                        <Button
                          variant=""
                          size="sm"
                          onClick={updateAcceptanceCriteriaItem}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
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
                <div
                  key={item.id}
                  className="relative flex items-center space-x-2 group"
                >
                  <Checkbox
                    id={item.id}
                    checked={item.done}
                    onClick={() => {
                      updateSubtaskDone(item.id);
                    }}
                  />
                  <div className="relative w-full">
                    <Input
                      defaultValue={item.task}
                      htmlFor={item.id}
                      readOnly={!(editingSubtask === item.id)}
                      ref={editingSubtask === item.id ? subtaskInputRef : null}
                      className={`${
                        item.done && "line-through text-gray-500"
                      } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    />
                    <div className="absolute transform -translate-y-1/2 right-0.5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!(editingSubtask === item.id) && (
                        <>
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => {
                              setEditingSubtask(item.id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              deleteSubtaskItem(item.id);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      {editingSubtask === item.id && (
                        <Button
                          variant=""
                          size="sm"
                          onClick={updateSubtaskItem}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
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
          {create && ( // Only show the create button when in create mode
            <Button onClick={() => createUserStory(name)} className="w-full">
              Create User Story
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemForm;