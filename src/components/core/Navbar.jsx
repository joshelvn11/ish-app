import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, Home, IterationCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
import UiContext from "@/context/UiContext";
import AuthContext from "@/context/AuthContext";

/**
 * Navbar Component
 *
 * This component renders the navigation bar of the application. It includes links to different
 * sections such as Dashboard, Backlog, and Sprints. The navbar is responsive and can be toggled
 * open or closed on smaller screens.
 *
 * The component uses the UiContext to control the state of the navbar (open/closed) and the
 * AuthContext to determine if the user is authenticated.
 */
function Navbar() {
  // Get the current location object from the router
  const location = useLocation();
  // State variable to store the current path
  const [path, setPath] = useState(location.pathname);
  // Extract navbarOpen and setNavbarOpen from UiContext
  const { navbarOpen, setNavbarOpen } = useContext(UiContext);
  // Extract user from AuthContext
  const { user } = useContext(AuthContext);

  /**
   * useEffect hook to update the path state whenever the location changes.
   * It also closes the navbar on mobile devices (screen width < 768px).
   */
  useEffect(() => {
    setPath(location.pathname); // Update the path state whenever the location changes
    window.innerWidth < 768 && setNavbarOpen(false); // Close the nav bar on mobile devices
  }, [location]);

  // Render the navbar only if the user is authenticated
  if (user) {
    return (
      <div
        className={`${
          navbarOpen ? "" : "hidden "
        }h-full px-1 py-3 border-r w-full md:w-48 fixed md:relative bg-background`}
      >
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Link to the Dashboard */}
            <Link
              to="/"
              onClick={() => setPath(location.pathname)}
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-primary hover:text-primary ${
                path == "/" ? "bg-muted" : null
              }`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            {/* Link to the Backlog */}
            <Link
              to="/backlog"
              onClick={() => setPath(location.pathname)}
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-primary hover:text-primary ${
                path == "/backlog" ? "bg-muted" : null
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Backlog{" "}
            </Link>
            {/* Link to the Sprints */}
            <Link
              to="/sprints"
              onClick={() => setPath(location.pathname)}
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-primary hover:text-primary ${
                path == "/sprints" ? "bg-muted" : null
              }`}
            >
              <IterationCcw className="w-4 h-4" />
              Sprints{" "}
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
