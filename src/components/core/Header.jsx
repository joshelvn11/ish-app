import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import ProfileWidget from "./ProfileWidget";

function Header() {
  const { profile, logoutUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center w-full border-b">
      <div className="flex items-center justify-between w-full p-3 px-9">
        <h1 className="font-playwrite">ish.</h1>
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
