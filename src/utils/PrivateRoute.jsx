import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { pb } = useContext(AuthContext);

  return !pb.authStore.isValid ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
