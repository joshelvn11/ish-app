import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full flex justify-center border-b">
      <div className="w-full max-w-7xl flex justify-between p-3">
        <h1>ish.</h1>
        <nav className="flex gap-5">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
