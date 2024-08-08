import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;

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

    try {
      const response = await fetch(`${API_URL}/token/`, {
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
    } catch (error) {
      console.error("Login error:", error);
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        setLoginError("Network error. Please check your internet connection.");
      } else {
        setLoginError("An unexpected error occurred. Please try again later.");
      }
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
    localStorage.removeItem("authTokens");
    localStorage.removeItem("currentProjectId");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  const updateToken = async () => {
    const response = await fetch(`${API_URL}/token/refresh/`, {
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
    let response = await fetch(`${API_URL}/profile`, {
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
    API_URL: API_URL,
    authTokens: authTokens,
    user: user,
    profile: profile,
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

      const REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
