import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const HomePage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let response = await fetch(`${apiUrl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setProfile(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
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
