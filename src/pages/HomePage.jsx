import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const HomePage = () => {
  const { profile, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <p>You are logged in to the homepage!</p>
      <p>
        Name: {profile.first_name} {profile.last_name}
      </p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default HomePage;
