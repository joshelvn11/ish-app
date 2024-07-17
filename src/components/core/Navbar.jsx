import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, Home, IterationCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
import UiContext from "@/context/UiContext";
import AuthContext from "@/context/AuthContext";

function Navbar() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const { navbarOpen, setNavbarOpen } = useContext(UiContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setPath(location.pathname); // Update the path state whenever the location changes
    window.innerWidth < 768 && setNavbarOpen(false); // Close the nav bar on mobile devices
  }, [location]);

  if (user) {
    return (
      <div
        className={`${
          navbarOpen ? "" : "hidden "
        }h-full px-1 py-3 border-r w-full md:w-48 fixed md:relative bg-background`}
      >
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
