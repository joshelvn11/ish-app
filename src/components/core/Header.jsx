import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import ProfileWidget from "./ProfileWidget";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import UiContext from "@/context/UiContext";
import ProjectSwitcher from "./ProjectSwitcher";

/**
 * Header Component
 *
 * This component renders the header section of the application. It includes the application title,
 * navigation links, and user-specific widgets such as the profile widget and project switcher.
 * The header is responsive and includes a toggle button for the navigation menu on smaller screens.
 */
function Header() {
  // Extract profile and user information from AuthContext
  const { profile, user } = useContext(AuthContext);
  // Extract setNavbarOpen function from UiContext to control the navbar state
  const { setNavbarOpen } = useContext(UiContext);

  /**
   * Toggles the state of the navigation menu.
   * This function inverts the current state of the navbar (open/closed).
   */
  const toggleMenu = () => {
    setNavbarOpen((prevNavbarOpen) => !prevNavbarOpen);
  };

  // Render the header only if the user is authenticated
  if (user) {
    return (
      <div className="flex justify-center w-full border-b">
        <div className="flex items-center justify-between w-full p-3 md:px-9">
          <div className="flex items-center h-full gap-3">
            {/* Button to toggle the navigation menu on smaller screens */}
            <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
              <MenuIcon />
            </Button>
            {/* Application title */}
            <h1 className="text-xl font-semibold">ish.</h1>
          </div>
          <nav className="flex items-center gap-5">
            {/* Display profile widget and project switcher if profile exists, otherwise show login link */}
            {profile ? (
              <>
                <ProjectSwitcher />
                <ProfileWidget className="mr-3" />
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
