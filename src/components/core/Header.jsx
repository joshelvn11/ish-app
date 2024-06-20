import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import ProfileWidget from "./ProfileWidget";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import UiContext from "@/context/UiContext";

function Header() {
  const { profile } = useContext(AuthContext);
  const { setNavbarOpen } = useContext(UiContext);

  const toggleMenu = () => {
    // Invert the navbar open state
    setNavbarOpen((prevNavbarOpen) => !prevNavbarOpen);
  };

  return (
    <div className="flex justify-center w-full border-b">
      <div className="flex items-center justify-between w-full p-3 md:px-9">
        <div className="flex items-center h-full gap-3">
          <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
            <MenuIcon />
          </Button>
          <h1 className="font-playwrite">ish.</h1>
        </div>
        <nav className="flex items-center gap-5">
          {profile ? (
            <ProfileWidget className="mr-3" />
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
