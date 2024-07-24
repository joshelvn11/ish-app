import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * LoginForm Component
 *
 * This component renders a login form that allows users to enter their username and password
 * to log in to their account. It utilizes various UI components such as Card, Input, Button,
 * and Alert to create a structured and user-friendly interface.
 *
 * The component uses the AuthContext to handle user authentication and displays appropriate
 * error or success messages based on the login attempt.
 *
 */
const LoginForm = () => {
  // State variables to store the username and password input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Destructure loginUser, loginError, and loginMessage from AuthContext
  let { loginUser, loginError, loginMessage } = useContext(AuthContext);

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Display an error alert if loginError is true */}
        {loginError && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Incorrect login credentials</AlertDescription>
          </Alert>
        )}
        {/* Display a message alert if loginMessage is present */}
        {loginMessage && (
          <Alert className="mb-5">
            <RocketIcon className="w-4 h-4" />
            <AlertTitle>{loginMessage && loginMessage.title}</AlertTitle>
            <AlertDescription>
              {loginMessage && loginMessage.message}
            </AlertDescription>
          </Alert>
        )}
        {/* Form to handle user login */}
        <form onSubmit={loginUser}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <CardFooter className="flex justify-center pt-4 pb-0 text-sm font-light text-gray-700">
          <Link to="/signup">Sign up for an account</Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
