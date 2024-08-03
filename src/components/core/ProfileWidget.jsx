import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

/**
 * ProfileWidget Component
 *
 * This component renders a profile widget that includes user information and a dropdown menu
 * with various options such as viewing the profile, billing, settings, and logging out. It also
 * includes a dark mode toggle switch.
 *
 * The component uses the AuthContext to access the user's profile information and handle logout functionality.
 * It also manages the dark mode state using local storage and updates the theme accordingly.
 */
export default function ProfileWidget() {
  // Extract profile and logoutUser from AuthContext
  const { profile, logoutUser } = useContext(AuthContext);
  // State variable to store the dark mode state, initialized based on local storage
  const [darkmode, setDarkmode] = useState(
    localStorage.theme == "dark" ? true : false
  );

  /**
   * useEffect hook to update the theme based on the dark mode state.
   * It adds or removes the "dark" class from the document's root element and updates local storage.
   */
  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);

  /**
   * Prevents the dropdown menu from closing when interacting with certain elements.
   * This function stops the default event and propagation.
   */
  const preventMenuClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      {/* Trigger for the dropdown menu, using a div as a child */}
      <DropdownMenuTrigger asChild>
        <div className="bg-gray-500 rounded-full size-9"></div>
      </DropdownMenuTrigger>
      {/* Content of the dropdown menu */}
      <DropdownMenuContent className="w-56">
        {/* Label displaying the user's name and email */}
        <DropdownMenuLabel>
          <div>
            <div>
              {profile.first_name} {profile.last_name}
            </div>
            <div className="font-light text-gray-600">{profile.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Group of menu items */}
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Menu item for dark mode toggle */}
        <DropdownMenuItem
          className="flex justify-between"
          onClick={preventMenuClose}
        >
          <div>Darkmode</div>
          <Switch checked={darkmode} onCheckedChange={setDarkmode}></Switch>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Menu item for logging out */}
        <DropdownMenuItem onClick={logoutUser}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
