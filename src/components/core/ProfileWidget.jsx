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
      <DropdownMenuTrigger asChild>
        <div className="bg-gray-500 rounded-full size-9"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div>
            <div>
              {profile.first_name} {profile.last_name}
            </div>
            <div className="font-light text-gray-600">{profile.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={preventMenuClose}
        >
          <div>Darkmode</div>
          <Switch checked={darkmode} onCheckedChange={setDarkmode}></Switch>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
