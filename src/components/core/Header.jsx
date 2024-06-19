import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

function Header() {
  const { profile, logoutUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center w-full border-b">
      <div className="flex justify-between w-full p-3 max-w-7xl">
        <h1>ish.</h1>
        <nav className="flex gap-5">
          <Link to="/">Home</Link>
          {profile ? (
            <p onClick={logoutUser}>Logout</p>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {profile && <p>Hello {profile.first_name}!</p>}
        </nav>
      </div>
    </div>
  );
}

export default Header;
