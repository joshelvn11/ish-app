import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [profile, setProfile] = useState([]);
  let [loginError, setLoginError] = useState(null);
  let [loginMessage, setLoginMessage] = useState(null);
  let [signUpErrors, setSignUpErrors] = useState(null);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    if (response.status == 200) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      navigate("/");
      setLoginError(null);
      setLoginMessage(null);
    } else if (response.status == 401) {
      setLoginError(data.detail);
    }
  };

  let signUpUser = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/register/`, {
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
    localStorage.removeItem("authTokens");
    localStorage.removeItem("currentProjectId");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  const updateToken = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

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
    if (response.status === 200) {
      setProfile(data);
    } else if (data.code === "token_not_valid") {
      updateToken();
    }
  };

  let contextData = {
    authTokens: authTokens,
    user: user,
    profile: profile,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loginError: loginError,
    loginMessage: loginMessage,
    setLoginMessage: setLoginMessage,
    signUpUser: signUpUser,
    signUpErrors: signUpErrors,
  };

  useEffect(() => {
    if (authTokens) {
      // If auth tokens are present attempt to get profile data
      // and set up token refresh interval
      getProfile();

      const REFRESH_INTERVAL = 1000 * 60 * 1; // 4 minutes
      let interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    } else {
      // If tokens are null reset auth data
      setUser(null);
      setProfile([]);
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
