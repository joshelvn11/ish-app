import React, { useState, useEffect } from "react";
import PocketBase from 'pocketbase';
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const pb = new PocketBase(API_URL)

  let [profile, setProfile] = useState([]);
  let [loginError, setLoginError] = useState(null);
  let [loginMessage, setLoginMessage] = useState(null);
  let [signUpErrors, setSignUpErrors] = useState(null);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();

    try {
      const authData = await pb.collection('users')
          .authWithPassword(e.target.username.value, e.target.password.value)

      const profileData = await pb.collection('users').getOne(authData.record.id)

      // Save user ID to local storage
      localStorage.setItem("userId", authData.record.id);

      setProfile(profileData);

        navigate("/");
        setLoginError(null);
        setLoginMessage(null);
        console.log(pb)
    } catch (error) {
      setLoginError(error);
      console.error("Login error:", error);
    }
  };

  let signUpUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
      }),
    });

    let data = await response.json();

    if (response.status == 201) {
      setLoginMessage({
        title: "Thanks for signing up!",
        message: "Log into your account using your new credentials",
      });
      navigate("/login");
      setSignUpErrors(null);
    } else if (response.status == 400) {
      setSignUpErrors(data);
    }
  };

  let logoutUser = (e) => {
    e && e.preventDefault();
    pb.authStore.clear();
    setProfile(null);
    localStorage.removeItem("currentProjectId");
    navigate("/login");
  };

  const getUserProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      pb.collection('users').getOne(userId).then((profileData) => {
        setProfile(profileData);
      }).catch((error) => {
        console.error("Error fetching user profile:", error);
      });
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])


  let contextData = {
    API_URL: API_URL,
    pb: pb,
    profile: profile,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loginError: loginError,
    loginMessage: loginMessage,
    setLoginMessage: setLoginMessage,
    signUpUser: signUpUser,
    signUpErrors: signUpErrors,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
