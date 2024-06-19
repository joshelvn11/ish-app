import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const HomePage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
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
