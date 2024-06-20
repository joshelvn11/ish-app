import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, Home, Dumbbell } from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname); // Update the path state whenever the location changes
  }, [location]);

  return (
    <div className="w-48 h-full px-1 py-3 border-r">
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
            <Dumbbell className="w-4 h-4" />
            Sprints{" "}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
