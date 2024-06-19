import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="w-full flex justify-center border-b">
      <div className="w-full max-w-7xl flex justify-between p-3">
        <h1>ish.</h1>
        <nav className="flex gap-5">
          <Link to="/">Home</Link>
          {user ? (
            <p onClick={logoutUser}>Logout</p>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {user && <p>Hello {user.username}!</p>}
        </nav>
      </div>
    </div>
  );
}

export default Header;
